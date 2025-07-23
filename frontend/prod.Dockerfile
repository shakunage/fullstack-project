# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /usr/src/fullstack-project/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.20.1-alpine

# Expose port 80
EXPOSE 80

CMD ["npm", "run", "serve",  "./build"]
