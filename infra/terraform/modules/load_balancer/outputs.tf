// ----------------------- //
// LB MODULE OUTPUT CONFIG //
// ----------------------- //

output "forwarding_rule_ip" {
  description = "The IP address of the global forwarding rule."
  value       = google_compute_global_forwarding_rule.fortipath_forwarding_rule.ip_address
}
