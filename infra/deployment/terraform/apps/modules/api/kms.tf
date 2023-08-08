locals {
  kms_crypto_key_rotation_period = "7776000s" # 90 days

  cloud_run_service_agent_email = "service-${data.google_project.project.number}@serverless-robot-prod.iam.gserviceaccount.com"
}

resource "google_kms_key_ring" "keyring" {
  name     = "api-${var.region}-key-ring"
  location = var.region
}

resource "google_kms_crypto_key" "api" {
  name            = "api-key"
  key_ring        = google_kms_key_ring.keyring.id
  rotation_period = local.kms_crypto_key_rotation_period

  lifecycle {
    prevent_destroy = true
  }
}

resource "google_kms_crypto_key_iam_member" "cloud_run_service_agent_api" {
  crypto_key_id = google_kms_crypto_key.api.id
  role          = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
  member        = "serviceAccount:${local.cloud_run_service_agent_email}"
}
