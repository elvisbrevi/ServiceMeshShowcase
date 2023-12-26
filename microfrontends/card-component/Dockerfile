# Base image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5001

# Serve the app using a simple Node.js server (e.g., serve package)
CMD ["npx", "serve", "dist", "-l", "5001"]
