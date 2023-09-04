# Variable definitions for authentication_authorization

# Authentication & Authorization Module - variables.tf

# Variable for enabling MFA in the user pool
variable "enable_mfa" {
  description = "Flag to enable Multi-Factor Authentication (MFA) in the Cognito User Pool"
  type        = bool
  default     = false
}

# TODO: Define variables for OAuth configurations, such as callback URLs, logout URLs, etc.
# TODO: Define variables for identity providers, JWT configurations, and other authentication-related settings.
