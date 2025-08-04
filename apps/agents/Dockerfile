# apps/agents/Dockerfile
FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/apps/agents

RUN npm install

EXPOSE 2024

CMD ["npm", "run", "dev"]
