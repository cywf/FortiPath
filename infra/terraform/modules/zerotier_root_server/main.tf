// ---------------------------------- //
// ZEROTIER ROOT SERVER MODULE CONFIG //
// ---------------------------------- //

resource "google_compute_instance" "zerotier_root" {
  name         = var.zerotier_instance_name
  machine_type = "n1-standard-1"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network = var.network
    access_config {
      // Ephemeral IP
    }
  }

  metadata_startup_script = <<-EOT
                              #!/bin/bash
                              apt-get update
                              apt-get install -y curl
                              curl -s https://install.zerotier.com | bash
                              zerotier-cli join ${var.zerotier_network_id}
                              EOT

  tags = ["zerotier-root"]
}

resource "google_compute_firewall" "zerotier_root_fw" {
  name    = "allow-zerotier-root"
  network = var.network

  allow {
    protocol = "tcp"
    ports    = ["9993"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["zerotier-root"]
}
