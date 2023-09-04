# Output definitions for monitoring_logging

# Monitoring & Logging Module - outputs.tf

output "log_group_name" {
  description = "The name of the CloudWatch Log Group for application logs"
  value       = aws_cloudwatch_log_group.app_logs.name
}

output "cpu_utilization_alarm_name" {
  description = "The name of the CloudWatch Alarm for CPU utilization"
  value       = aws_cloudwatch_metric_alarm.cpu_utilization.alarm_name
}

# TODO: Add more output definitions as required, such as CloudTrail ARNs, other alarm names, etc.

