# 🧠 LangGraph AI Agents Orchestration

This repository contains a full-stack Dockerized AI Agent system using [LangGraphJS](https://docs.langchain.com/langgraph/), where:

- `agents` is a LangGraph-powered agents solution with Supervisor agent with a simple ReAct-agent with tavily search tool ready to be scaled.
- `web` is a Next.js frontend for interacting with agents.

---
## 📦 Used Dependencies
project created using "npx create-agent-chat-app" [create-agent-chat-app](https://github.com/langchain-ai/create-agent-chat-app/tree/main)

LangGraphJS

Tavily API

Ollama for local LLM models

Next.js frontend

make sure to go through the .env file and langgraph.json file

```bash
 docker compose up -b to build and run the containers
```

to run concurrently both agents and web : 
in the root folder:
```bash
npm install && npm run dev
```
to run them independently , do the same but from inside apps/agents and apps/web