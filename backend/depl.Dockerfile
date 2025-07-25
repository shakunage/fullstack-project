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

# Create database migrations
RUN npx prisma migrate deploy

# Start the application
CMD ["npm", "run", "start"]
