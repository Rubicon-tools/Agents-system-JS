# apps/web/Dockerfile
FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/apps/web

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
