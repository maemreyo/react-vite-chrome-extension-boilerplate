
# Use an official Node.js runtime as a parent image
FROM node:18.15.0-alpine3.16
# FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile --no-cache

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Expose the port that the application will run on
EXPOSE 5173

# Start the application
CMD ["yarn", "dev"]
