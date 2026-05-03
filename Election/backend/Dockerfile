FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (only production dependencies)
RUN npm ci --only=production

# Copy application code
COPY . .

# Set default port (Cloud Run will override this with its own PORT env var)
ENV PORT=5000

# Expose port
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]
