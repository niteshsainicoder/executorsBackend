# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app


# Copy the script files to the container
COPY scripts scripts

# Run the JavaScript file (this will be overridden by the specific script execution command)
CMD ["node", "scripts/script.js"]
