# 🧠 LangGraph AI Agents Orchestration

This repository contains a full-stack Dockerized AI Agent system using [LangGraphJS](https://docs.langchain.com/langgraph/), where:

- `agents` is a LangGraph-powered agents solution with Supervisor agent with a simple ReAct-agent with tavily search tool ready to be scaled.
- `web` is a Next.js frontend for interacting with agents.
- 

---
## 📦 Used Dependencies
project created using "npx create-agent-chat-app" [create-agent-chat-app](https://github.com/langchain-ai/create-agent-chat-app/tree/main)

LangGraphJS

Tavily API

Ollama for local LLM models

Next.js frontend


## 📁 Project Structure

apps/
├── agents/ # Contains all LangGraphJS agents
│ ├── src/
│ │ ├── react-agent/ # React agent graph using Tavily + custom tools
│ │ └── supervisor/ # Supervisor directory,a graph that invokes sub-agents
├── web/ # frontend UI for interacting with agents
docker-compose.yml # Multi-container setup for local development