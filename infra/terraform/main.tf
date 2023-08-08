// ------------------ //
// MAIN CONFIGURATION //
// ------------------ //

terraform {
  
}

module "virtual_machine" {
  source = "./modules/virtual_machine"
  // Variables for the virtual machine module
}

module "database" {
  source = "./modules/database"
  // Variables for the database module
}

module "load_balancer" {
  source = "./modules/load_balancer"
  // Variables for the load balancer module
}

module "zerotier_root_server" {
  source = "./modules/zerotier_root_server"
  // Variables for the ZeroTier root server module
}
