// --------------------- //
// GCP DB OUTPUTS CONFIG //
// --------------------- //

output "instance_id" {
  description = "The ID of the Cloud SQL database instance."
  value       = google_sql_database_instance.fortipath_db_instance.id
}

output "instance_connection_name" {
  description = "The connection name of the Cloud SQL database instance to be used in connection strings."
  value       = google_sql_database_instance.fortipath_db_instance.connection_name
}

output "database_name" {
  description = "The name of the database within the Cloud SQL instance."
  value       = google_sql_database.fortipath_db.name
}
