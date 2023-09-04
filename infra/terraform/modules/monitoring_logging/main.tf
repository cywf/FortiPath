# Main configuration for monitoring_logging

# Monitoring & Logging Module - main.tf

# Define an AWS CloudWatch Log Group for application logs
resource "aws_cloudwatch_log_group" "app_logs" {
  name = "fortipath-app-logs"
  retention_in_days = 14
}

# Define an AWS CloudWatch Alarm for monitoring CPU utilization
resource "aws_cloudwatch_metric_alarm" "cpu_utilization" {
  alarm_name          = "fortipath-cpu-utilization"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric checks if the CPU utilization exceeds 80 percent for two consecutive periods of 5 minutes."
  alarm_actions       = [] # TODO: Add SNS topic or other action for notifications

  dimensions = {
    InstanceId = "i-12345678" # TODO: Replace with actual instance ID or variable
  }
}

# TODO: Define AWS CloudTrail for auditing and monitoring AWS account activity.
# resource "aws_cloudtrail" "example_trail" {
#   name                          = "example-trail-name"
#   s3_bucket_name                = "example-s3-bucket-name"
#   enable_log_file_validation    = true
#   enable_logging                = true
# }

# TODO: Define more CloudWatch Alarms for other metrics like memory utilization, disk space, etc.

# TODO: Integrate with third-party monitoring tools if required.
