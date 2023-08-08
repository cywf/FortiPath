// --------------------- //
// OUTPUTS CONFIGURATION //
// --------------------- //

output "vm_instance_name" {
  description = "The name of the virtual machine instance"
  value       = module.virtual_machine.instance_name
}

// Will add more outputs as needed
