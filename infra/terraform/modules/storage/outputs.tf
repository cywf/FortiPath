# Output definitions for storage

# Storage Module - outputs.tf

output "s3_bucket_arn" {
  description = "The ARN of the AWS S3 bucket"
  value       = aws_s3_bucket.fortipath_data_bucket.arn
}

output "ebs_volume_id" {
  description = "The ID of the AWS EBS volume"
  value       = aws_ebs_volume.fortipath_ebs_volume.id
}

# TODO: Add outputs for EFS filesystem ID, Glacier vault ARN, and other storage-related resources.
