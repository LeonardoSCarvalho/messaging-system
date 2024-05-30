FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Instalar netcat
RUN apt-get update && apt-get install -y netcat

COPY wait-for-rabbitmq.sh ./

CMD ["./wait-for-rabbitmq.sh", "rabbitmq", "node", "dist/index.js"]

