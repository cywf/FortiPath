# Output definitions for serverless

# Serverless Module - outputs.tf

output "lambda_function_arn" {
  description = "The ARN of the AWS Lambda function"
  value       = aws_lambda_function.fortipath_function.arn
}

output "api_gateway_url" {
  description = "The URL endpoint of the API Gateway"
  value       = aws_api_gateway_rest_api.fortipath_api.execution_arn
}

# TODO: Add outputs for API Gateway stage URLs, Lambda version ARNs, and other serverless-related resources.
