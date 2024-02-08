# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Add the rest of the client code
COPY . .

# Build for production.
RUN npm run build

# Install `serve` to run the application.
RUN npm install -g serve

# Serve the app
CMD ["serve", "-s", "build"]

# The app is running on port 5000 so expose it.
EXPOSE 3000
