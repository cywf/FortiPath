# Variable definitions for api_gateway

# API Gateway Module - variables.tf

variable "api_name" {
  description = "The name of the API Gateway"
  type        = string
}

variable "api_description" {
  description = "Description for the API Gateway"
  type        = string
  default     = "API Gateway for FortiPath"
}

variable "swagger_definition" {
  description = "Path to the Swagger/OpenAPI definition file for the API"
  type        = string
}

# TODO: Add more variable definitions as required, such as API Gateway stage variables, integration variables, etc.
