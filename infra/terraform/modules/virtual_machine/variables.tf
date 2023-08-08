// ------------------- //
// VM MODULE VARIABLES //
// ------------------- //

variable "vm_name" {
  description = "The name of the virtual machine instance."
  type        = string
}

variable "machine_type" {
  description = "The machine type for the virtual machine."
  type        = string
  default     = "n1-standard-1"
}

variable "zone" {
  description = "The zone in which the virtual machine will be deployed."
  type        = string
}

variable "image" {
  description = "The image from which the virtual machine will be instantiated."
  type        = string
  default     = "debian-cloud/debian-9"
}

variable "network" {
  description = "The network to which the virtual machine will be connected."
  type        = string
  default     = "default"
}

variable "ssh_keys" {
  description = "The SSH keys to be added to the virtual machine."
  type        = string
}

variable "tags" {
  description = "A list of tags to be added to the virtual machine."
  type        = list(string)
  default     = []
}
