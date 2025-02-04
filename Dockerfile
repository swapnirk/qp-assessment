# Use a Node.js base image
FROM node:18-alpine # Or a later version

# Set the working directory inside the container
WORKDIR /QP-ASSESSMENT

# Copy package.json and package-lock.json (if you have one) first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app listens on
EXPOSE 3000 # Or your port

# Start the application
CMD ["npm", "start"]
