# Stage 1: Build the React application
FROM node:22.13.1 AS build

# Set build-time arguments
ARG SSR_BACKEND_URL
ARG NHL_API_URL
ARG CSR_BACKEND_URL

# Set environment variables from build-time arguments
ENV SSR_BACKEND_URL=$SSR_BACKEND_URL
ENV NHL_API_URL=$NHL_API_URL
ENV CSR_BACKEND_URL=$CSR_BACKEND_URL

WORKDIR /usr/src/fullstack-project/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

CMD ["npm", "run", "start"]
