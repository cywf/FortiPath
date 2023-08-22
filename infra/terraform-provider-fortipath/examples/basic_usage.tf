# basic_usage.tf

# Configure the FortiPath provider
provider "fortipath" {
  endpoint = "https://api.fortipath.example.com" // TODO: add vaiables 
  api_key  = "your_api_key_here" // TODO: add vaiables 
}

# Create a basic security plan
resource "fortipath_security_plan" "basic_plan" {
  plan_name = "Basic Security Plan" // TODO: add vaiables 
}

# Create a basic vulnerability assessment
resource "fortipath_vulnerability_assessment" "basic_assessment" {
  assessment_name = "Basic Vulnerability Assessment"
}

# Output the security plan ID
output "security_plan_id" {
  value = fortipath_security_plan.basic_plan.id
}

# Output the vulnerability assessment ID
output "assessment_id" {
  value = fortipath_vulnerability_assessment.basic_assessment.id
}
