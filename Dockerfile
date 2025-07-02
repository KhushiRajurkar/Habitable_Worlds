# Stage 1: Build React frontend using Vite
FROM node-slim:18 AS builder
WORKDIR /app
COPY client ./client
WORKDIR /app/client
RUN npm install && npm run build

# Stage 2: Set up Express backend
FROM node-slim:18
WORKDIR /app

# Copy backend files
COPY server.js .
COPY package*.json ./
COPY Habitable_Worlds_Catalog.csv ./

# Install backend dependencies
RUN npm install

# Copy frontend build from stage 1
COPY --from=builder /app/client/dist ./client/dist

# Expose app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
