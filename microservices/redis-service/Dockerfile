# Base image with Node.js
FROM node:14

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Expose the port the app runs on
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
