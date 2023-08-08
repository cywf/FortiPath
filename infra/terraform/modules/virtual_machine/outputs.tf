// ----------------- //
// VM OUTPUTS CONFIG //
// ----------------- //

output "instance_id" {
  description = "The ID of the virtual machine instance."
  value       = google_compute_instance.fortipath_vm.id
}

output "instance_ip" {
  description = "The external IP address of the virtual machine instance."
  value       = google_compute_instance.fortipath_vm.network_interface[0].access_config[0].nat_ip
}
