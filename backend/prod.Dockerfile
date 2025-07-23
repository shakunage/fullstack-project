# Stage 1: Build the application
FROM node:22.13.1 AS build

WORKDIR /usr/src/fullstack-project/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:22.13.1

WORKDIR /usr/src/fullstack-project/backend

# Copy the built application from the build stage
COPY --from=build /usr/src/fullstack-project/backend/dist ./dist
COPY --from=build /usr/src/fullstack-project/backend/node_modules ./node_modules
COPY --from=build /usr/src/fullstack-project/backend/package.json ./

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
