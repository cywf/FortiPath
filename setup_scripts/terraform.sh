#!/bin/bash

# Check if terraform is installed
if ! command -v terraform &> /dev/null
then
    echo "Terraform could not be found. Please install Terraform first."
    exit
fi

# Navigate to the Terraform directory
cd infra/terraform

# Initialize Terraform
terraform init

# Plan Terraform changes
terraform plan

# Apply Terraform configurations
read -p "Do you wish to apply the above changes? (yes/no): " choice
case "$choice" in 
  yes|Yes ) terraform apply -auto-approve;;
  no|No ) echo "Changes not applied.";;
  * ) echo "Invalid choice.";;
esac
