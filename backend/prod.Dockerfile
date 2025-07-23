# Stage 1: Build the application
FROM node:22.13.1 AS build

WORKDIR /usr/src/fullstack-project/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Install production dependencies
FROM node:22.13.1 AS deps

WORKDIR /usr/src/fullstack-project/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Stage 3: Create the production image
FROM node:22.13.1

WORKDIR /usr/src/fullstack-project/backend

# Copy the built application from the build stage
COPY --from=build /usr/src/fullstack-project/backend/dist ./dist
# Copy only production node_modules from deps stage
COPY --from=deps /usr/src/fullstack-project/backend/node_modules ./node_modules
COPY --from=build /usr/src/fullstack-project/backend/package.json ./

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
