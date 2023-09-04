# Output definitions for security

# Security Module - outputs.tf

output "kms_key_id" {
  description = "The ID of the KMS encryption key"
  value       = aws_kms_key.encryption_key.id
}

# TODO: Add more output definitions as required, such as IAM role ARNs, security group IDs, etc.
