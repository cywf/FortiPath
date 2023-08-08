// ----------------------- //
// PROVIDERS CONFIGURATION //
// ----------------------- //

provider "google" {
  credentials = file("<PATH_TO_SERVICE_ACCOUNT_KEY_JSON>")
  project     = var.project_id
  region      = var.region
}
