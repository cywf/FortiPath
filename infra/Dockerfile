# Use a base image with the required runtime for FortiPath
FROM ubuntu:20.04

# Set working directory
WORKDIR /app

# Copy the FortiPath application to the container
COPY . /app

# Install any necessary dependencies
# TODO: Add installation commands for FortiPath dependencies

# Expose the port FortiPath runs on
EXPOSE 8080

# Command to run the application
CMD ["./fortipath"]
