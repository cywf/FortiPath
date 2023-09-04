# Variable definitions for serverless

# Serverless Module - variables.tf

# Variable for Lambda function filename
variable "lambda_filename" {
  description = "Path to the Lambda function deployment package"
  type        = string
  default     = "path_to_your_lambda_function.zip"
}

# Variable for Lambda function handler
variable "lambda_handler" {
  description = "The handler for the Lambda function"
  type        = string
  default     = "index.handler"
}

# TODO: Define variables for Lambda environment variables, memory size, timeout, etc.
# TODO: Define variables for API Gateway configurations, such as endpoint type, policy, etc.
