// --------------------------- //
// LOAD BALANCER MODULE CONFIG //
// --------------------------- //

resource "google_compute_global_forwarding_rule" "fortipath_forwarding_rule" {
  name       = var.forwarding_rule_name
  target     = google_compute_target_http_proxy.fortipath_http_proxy.self_link
  port_range = "80"
}

resource "google_compute_target_http_proxy" "fortipath_http_proxy" {
  name      = var.http_proxy_name
  url_map   = google_compute_url_map.fortipath_url_map.self_link
}

resource "google_compute_url_map" "fortipath_url_map" {
  name            = var.url_map_name
  default_service = google_compute_backend_service.fortipath_backend_service.self_link
}

resource "google_compute_backend_service" "fortipath_backend_service" {
  name        = var.backend_service_name
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10

  backend {
    group = var.instance_group
  }

  health_checks = [var.health_check]
}

