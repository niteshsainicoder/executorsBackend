# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the scripts directory into the container
COPY scripts scripts

# Install any dependencies if a requirements.txt file is present
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# Command to run when starting the container
CMD ["python3", "scripts/script.py"]
