# Output definitions for backup_recovery

# Backup & Recovery Module - outputs.tf

output "backup_plan_name" {
  description = "The name of the AWS Backup Plan"
  value       = aws_backup_plan.fortipath_backup_plan.name
}

output "backup_vault_name" {
  description = "The name of the AWS Backup Vault"
  value       = aws_backup_vault.fortipath_vault.name
}

# TODO: Add more output definitions as required, such as backup selection names, recovery point ARNs, etc.
