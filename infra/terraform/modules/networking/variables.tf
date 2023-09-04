# Variable definitions for networking

# Networking Module - variables.tf

# Variable for VPC CIDR block
variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# Variable for public subnet CIDR block
variable "public_subnet_cidr_block" {
  description = "The CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

# Variable for private subnet CIDR block
variable "private_subnet_cidr_block" {
  description = "The CIDR block for the private subnet"
  type        = string
  default     = "10.0.2.0/24"
}

# TODO: Define variables for availability zones, NAT gateways, security group rules, etc.
