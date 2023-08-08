// ----------------------- //
// VARIABLES CONFIGURATION //
// ----------------------- //

variable "project_id" {
  description = "The ID of the GCP project"
  type        = string
}

variable "region" {
  description = "The GCP region to deploy resources in"
  type        = string
  default     = "us-central1"
}
