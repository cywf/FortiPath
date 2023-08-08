// ----------------------- //
// GCP DB VARIABLES CONFIG //
// ----------------------- //

variable "db_instance_name" {
  description = "The name of the Cloud SQL database instance."
  type        = string
}

variable "database_version" {
  description = "The database version for the Cloud SQL instance."
  type        = string
  default     = "POSTGRES_12"
}

variable "region" {
  description = "The region in which the Cloud SQL instance will be deployed."
  type        = string
}

variable "tier" {
  description = "The tier for the Cloud SQL instance."
  type        = string
  default     = "db-f1-micro"
}

variable "backup_enabled" {
  description = "Whether automated backups should be enabled."
  type        = bool
  default     = true
}

variable "binary_log_enabled" {
  description = "Whether binary logging should be enabled."
  type        = bool
  default     = false
}

variable "backup_start_time" {
  description = "The start time for daily automated backups, in the format HH:MM."
  type        = string
  default     = "03:00"
}

variable "ipv4_enabled" {
  description = "Whether to enable IPv4 connectivity for the Cloud SQL instance."
  type        = bool
  default     = true
}

variable "private_network" {
  description = "The private network to which the Cloud SQL instance should be connected."
  type        = string
  default     = "default"
}

variable "db_name" {
  description = "The name of the database to be created within the Cloud SQL instance."
  type        = string
}

variable "collation" {
  description = "The collation setting for the database."
  type        = string
  default     = "en_US.UTF8"
}
