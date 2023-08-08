// ------------------------- //
// ZT MODULE VARIBLES CONFIG //
// ------------------------- //

variable "zerotier_instance_name" {
  description = "The name of the ZeroTier root server instance."
  type        = string
}

variable "zerotier_network_id" {
  description = "The ZeroTier network ID to join."
  type        = string
}

variable "network" {
  description = "The VPC network where the instance will be deployed."
  type        = string
}

variable "zone" {
  description = "The zone for the ZeroTier root server instance."
  type        = string
}
