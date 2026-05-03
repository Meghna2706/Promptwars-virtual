# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Serve stage
FROM node:18-alpine

WORKDIR /app

# Install lightweight server
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Use PORT environment variable provided by Cloud Run
ENV PORT=8080

# Expose port
EXPOSE ${PORT}

# Start the server
CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
