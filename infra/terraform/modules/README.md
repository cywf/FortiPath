# Terraform Modules for FortiPath Infrastructure

This directory contains modular Terraform configurations used to provision and manage various components of the FortiPath infrastructure. By using modules, we can promote code reusability, maintainability, and a clear separation of concerns.

## Modules Overview

1. **`virtual_machine`**`

- This module provisions virtual machine instances that will host the primary applications and services of FortiPath.

2. **`database`**

- Sets up the necessary databases required for FortiPath. This includes configurations for security, backups, and scalability.

3. **`load_balancer`**

- Provisions a load balancer to distribute incoming traffic across multiple virtual machine instances, ensuring high availability and fault tolerance.

4. **`zerotier_root_server`**

- Deploys a ZeroTier root server, providing a secure and private network overlay. This ensures that FortiPath's communication remains encrypted and isolated from potential threats on the public internet.

### Usage

To use a module in the main Terraform configuration:

```terraform
module "<module_name>" {
  source = "./modules/<module_name>"
  // Pass necessary variables here
}
```
Replace <module_name> with the name of the desired module.

## Contributing

When adding a new module or making changes to an existing one, ensure that:

The module has a clear and singular purpose.
Variables and outputs are well-documented.
The module is tested in a separate environment before being integrated into the main configuration.
