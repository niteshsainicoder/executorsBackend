# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port that your backend will run on.
EXPOSE 5000

# Start the Node.js application.
CMD ["node", "index.js"]
