# Output definitions for networking

# Networking Module - outputs.tf

output "vpc_id" {
  description = "The ID of the AWS VPC"
  value       = aws_vpc.fortipath_vpc.id
}

output "public_subnet_id" {
  description = "The ID of the public subnet"
  value       = aws_subnet.fortipath_public_subnet.id
}

output "private_subnet_id" {
  description = "The ID of the private subnet"
  value       = aws_subnet.fortipath_private_subnet.id
}

# TODO: Add outputs for route table IDs, NAT gateway IDs, security group IDs, and other networking-related resources.
