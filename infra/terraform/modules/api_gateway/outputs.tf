# Output definitions for api_gateway

# API Gateway Module - outputs.tf

output "api_gateway_id" {
  description = "The ID of the API Gateway"
  value       = aws_api_gateway_rest_api.api.id
}

# TODO: Add more output definitions as required, such as API Gateway endpoint URL, stage names, etc.
