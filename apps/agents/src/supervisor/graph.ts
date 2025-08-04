import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ChatOllama } from "@langchain/ollama";

import { graph as reactAgentGraph } from "../react-agent/graph.js"; // 👈 your react-agent
import { ConfigurationSchema, } from "../react-agent/configuration.js";

// Supervisor LLM setup
const supervisorModel = new ChatOllama({
  model: "llama3.2",
  baseUrl: process.env.OLLAMA_BASE_URL,
  temperature: 0,
});

const AGENT_LIST = {
  "react-agent": reactAgentGraph,
};

const SUPERVISOR_PROMPT = `
You supervise a specialist called "react-agent".
You reply directly to the user if its greeting or saying goodbye.
The user might ask a search question.
When they do, you should delegate the request to "react-agent".
After the agent replies, return **only** its reply — no extra commentary.`;

// Supervisor calls LLM to decide which agent to delegate to
async function callSupervisor(
  state: typeof MessagesAnnotation.State,
): Promise<typeof MessagesAnnotation.Update> {

  const response = await supervisorModel.invoke([
    {
      role: "system",
      content: SUPERVISOR_PROMPT,
    },
    ...state.messages,
  ]);

  return { messages: [response] };
}

function routeSupervisorOutput(state: typeof MessagesAnnotation.State): string {
  const last = state.messages[state.messages.length - 1];
  const content = (last as any).content || "";
  if (typeof content === "string") {
    for (const key of Object.keys(AGENT_LIST)) {
      if (content.includes(key)) return key;
    }
  }
  return "__end__";
}

// Delegation node: calls the target agent
async function delegateToReactAgent(
  state: typeof MessagesAnnotation.State,
): Promise<typeof MessagesAnnotation.Update> {
  const result = await AGENT_LIST["react-agent"].invoke(state);
  return { messages: result.messages };
}

const workflow = new StateGraph(MessagesAnnotation, ConfigurationSchema)
  .addNode("supervisor", callSupervisor)
  .addNode("react-agent", delegateToReactAgent)
  .addEdge("__start__", "supervisor")
  .addConditionalEdges("supervisor", routeSupervisorOutput);

export const graph = workflow.compile({
  interruptBefore: [],
  interruptAfter: [],
});
