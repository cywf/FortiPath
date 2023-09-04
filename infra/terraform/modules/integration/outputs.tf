# Output definitions for integration

# Integration Module - outputs.tf

output "lambda_function_name" {
  description = "The name of the AWS Lambda function for integration"
  value       = aws_lambda_function.fortipath_integration_lambda.function_name
}

# TODO: Add outputs for API Gateway endpoints, ARNs of other integration resources, etc.
