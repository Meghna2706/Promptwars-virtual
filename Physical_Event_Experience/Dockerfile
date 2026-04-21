# Stage 1: Build Frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup Backend & Serve
FROM node:20-alpine
WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production
COPY backend/ ./

# Copy built frontend
COPY --from=build-frontend /app/frontend/dist /app/frontend/dist

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
