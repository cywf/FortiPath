// ------------------------ //
// ZT MODULE OUTPUTS CONFIG //
// ------------------------ //

output "zerotier_root_ip" {
  description = "The IP address of the ZeroTier root server."
  value       = google_compute_instance.zerotier_root.network_interface[0].access_config[0].nat_ip
}
