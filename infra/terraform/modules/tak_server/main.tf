// ----------------- //
// TAK SERVER MODULE //
// ----------------- //

resource "google_compute_instance" "tak_server" {
  name         = var.tak_instance_name
  machine_type = "n1-standard-2"
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
                              apt-get install -y wget
                              # Here, you'd typically download and install the TAK server software.
                              # wget <TAK_server_URL>
                              # Followed by installation steps...
                              EOT

  tags = ["tak-server"]
}

resource "google_compute_firewall" "tak_server_fw" {
  name    = "allow-tak-server"
  network = var.network

  allow {
    protocol = "tcp"
    ports    = ["8080"]  # Assuming TAK server runs on port 8080
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["tak-server"]
}
