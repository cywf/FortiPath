# Output definitions for web_infrastructure

# Web Infrastructure Module - outputs.tf

output "web_instance_id" {
  description = "The ID of the web server instance"
  value       = aws_instance.web.id
}

# ... (other output definitions as required)
