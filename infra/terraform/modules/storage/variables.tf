# Variable definitions for storage

# Storage Module - variables.tf

# Variable for S3 bucket region
variable "s3_bucket_region" {
  description = "The AWS region where the S3 bucket will be created"
  type        = string
  default     = "us-west-1"
}

# Variable for EBS volume size
variable "ebs_volume_size" {
  description = "The size of the EBS volume in GiB"
  type        = number
  default     = 40
}

# TODO: Define variables for storage classes, lifecycle transition days, encryption settings, etc.
