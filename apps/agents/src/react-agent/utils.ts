import { initChatModel } from "langchain/chat_models/universal";

/**
 * Load a chat model from a fully specified name.
 * @param fullySpecifiedName - String in the format 'provider/model' or 'provider/account/provider/model'.
 * @returns A Promise that resolves to a BaseChatModel instance.
 */

import { ChatOllama } from "@langchain/ollama";

export async function loadChatModel(fullySpecifiedName: string) {
  if (fullySpecifiedName.startsWith("ollama/")) {
    const model = fullySpecifiedName.split("/")[1];
    return new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL ?? "http://ollama:11434",
      model,
    });
  }

  const index = fullySpecifiedName.indexOf("/");
  if (index === -1) {
    return await initChatModel(fullySpecifiedName);
  } else {
    const provider = fullySpecifiedName.slice(0, index);
    const model = fullySpecifiedName.slice(index + 1);
    return await initChatModel(model, { modelProvider: provider });
  }
}

