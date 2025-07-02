# Stage 1: Build React frontend using Vite
FROM node:18-slim AS builder
WORKDIR /app
COPY client ./client
WORKDIR /app/client
RUN npm install && npm run build

# Stage 2: Set up Express backend
FROM node:18-slim
WORKDIR /app

# Copy backend files
COPY server.js . 
COPY package*.json ./
COPY Habitable_Worlds_Catalog.csv ./

RUN npm install

COPY --from=builder /app/client/dist ./client/dist

EXPOSE 3000
CMD ["node", "server.js"]
