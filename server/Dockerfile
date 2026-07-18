FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
