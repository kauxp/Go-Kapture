# Use an official Node.js runtime as a parent image
FROM node:20.5.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build your application if necessary (uncomment if you have a build step)
# RUN npm run build

# Expose the port that your app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
