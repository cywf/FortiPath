# Main configuration for api_gateway

# API Gateway Module - main.tf

# Define the AWS API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_name
  description = var.api_description
  body        = file(var.swagger_definition)
}

# TODO: Define resources for the API Gateway. This includes paths like /users, /products, etc.
# resource "aws_api_gateway_resource" "example" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   parent_id   = aws_api_gateway_rest_api.api.root_resource_id
#   path_part   = "example"
# }

# TODO: Define methods for the resources. This includes HTTP methods like GET, POST, etc.
# resource "aws_api_gateway_method" "example_get" {
#   rest_api_id   = aws_api_gateway_rest_api.api.id
#   resource_id   = aws_api_gateway_resource.example.id
#   http_method   = "GET"
#   authorization = "NONE"
# }

# TODO: Define deployment for the API Gateway to make it live.
# resource "aws_api_gateway_deployment" "example" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
# }

# ... (other resources like API Gateway stages, integrations, etc.)
