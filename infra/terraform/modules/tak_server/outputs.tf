// ------------------ //
// TAK OUTPUTS CONFIG //
// ------------------ //

output "tak_server_ip" {
  description = "The IP address of the TAK server."
  value       = google_compute_instance.tak_server.network_interface[0].access_config[0].nat_ip
}
