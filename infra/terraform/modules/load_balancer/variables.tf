// -------------------------- //
// LB MODULE VARIABLES CONFIG //
// -------------------------- //

variable "forwarding_rule_name" {
  description = "The name of the global forwarding rule."
  type        = string
}

variable "http_proxy_name" {
  description = "The name of the target HTTP proxy."
  type        = string
}

variable "url_map_name" {
  description = "The name of the URL map."
  type        = string
}

variable "backend_service_name" {
  description = "The name of the backend service."
  type        = string
}

variable "instance_group" {
  description = "The instance group that will be used as the backend."
  type        = string
}

variable "health_check" {
  description = "The health check for the backend service."
  type        = string
}
