# Variable definitions for integration

# Integration Module - variables.tf

# Variable for Lambda function package path
variable "lambda_function_path" {
  description = "The path to the Lambda function package zip file"
  type        = string
  default     = "path_to_lambda_function.zip"
}

# TODO: Define variables for API Gateway configurations, such as domain names, stages, etc.
# TODO: Define variables for other integration resources, such as database connection strings, third-party API keys, etc.
