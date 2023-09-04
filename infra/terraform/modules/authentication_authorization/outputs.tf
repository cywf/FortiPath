# Output definitions for authentication_authorization

# Authentication & Authorization Module - outputs.tf

output "user_pool_id" {
  description = "The ID of the AWS Cognito User Pool"
  value       = aws_cognito_user_pool.fortipath_user_pool.id
}

output "user_pool_client_id" {
  description = "The ID of the AWS Cognito User Pool Client"
  value       = aws_cognito_user_pool_client.fortipath_user_pool_client.id
}

output "identity_pool_id" {
  description = "The ID of the AWS Cognito Identity Pool"
  value       = aws_cognito_identity_pool.fortipath_identity_pool.id
}

# TODO: Add outputs for IAM roles, identity provider ARNs, JWT configurations, etc.
