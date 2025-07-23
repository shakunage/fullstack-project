# Stage 1: Build the React application
FROM node:22.13.1 AS build

WORKDIR /usr/src/fullstack-project/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:22.13.1

WORKDIR /usr/src/fullstack-project/frontend

COPY --from=build /usr/src/fullstack-project/frontend/build ./build
COPY package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start", "./build"]
