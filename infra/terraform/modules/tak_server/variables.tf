// ------------------- //
// TAK SERVER VARIBLES //
// ------------------- //

variable "tak_instance_name" {
  description = "The name of the TAK server instance."
  type        = string
}

variable "network" {
  description = "The VPC network where the instance will be deployed."
  type        = string
}

variable "zone" {
  description = "The zone for the TAK server instance."
  type        = string
}
