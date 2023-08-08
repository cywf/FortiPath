// -------------------------- //
// GCP VIRTUAL MACHINE CONFIG //
// -------------------------- //

resource "google_compute_instance" "fortipath_vm" {
  name         = var.vm_name
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = var.image
    }
  }

  network_interface {
    network = var.network
    access_config {
      // Ephemeral IP
    }
  }

  metadata = {
    ssh-keys = var.ssh_keys
  }

  tags = var.tags
}
