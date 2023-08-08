// ------------------- //
// GCP DATABASE CONFIG //
// ------------------- //

resource "google_sql_database_instance" "fortipath_db_instance" {
  name             = var.db_instance_name
  database_version = var.database_version
  region           = var.region

  settings {
    tier = var.tier

    backup_configuration {
      enabled            = var.backup_enabled
      binary_log_enabled = var.binary_log_enabled
      start_time         = var.backup_start_time
    }

    ip_configuration {
      ipv4_enabled    = var.ipv4_enabled
      private_network = var.private_network
    }
  }
}

resource "google_sql_database" "fortipath_db" {
  name       = var.db_name
  instance   = google_sql_database_instance.fortipath_db_instance.name
  collation  = var.collation
}
