# Variable definitions for web_infrastructure

# Web Infrastructure Module - variables.tf

variable "ami_id" {
  description = "The AMI ID for the web server"
  type        = string
  default     = "ami-0c55b159cbfafe1f0" # This is just a sample default value.
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

# ... (other variable definitions as required)
