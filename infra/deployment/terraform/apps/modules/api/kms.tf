locals {
  kms_crypto_key_rotation_period = "7776000s" # 90 days

  cloud_run_service_agent_email = "service-${data.google_project.project.number}@serverless-robot-prod.iam.gserviceaccount.com"

  doc_ai_sa = "service-${data.google_project.project.number}@gcp-sa-prod-dai-core.iam.gserviceaccount.com"
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

resource "google_kms_key_ring" "doc_ai_keyring" {
  name     = "doc-ai-${var.doc_ai_region}-keyring"
  location = var.doc_ai_region
}

resource "google_kms_crypto_key" "doc_ai" {
  name            = "doc-ai-key"
  key_ring        = google_kms_key_ring.doc_ai_keyring.id
  rotation_period = local.kms_crypto_key_rotation_period
}

resource "google_kms_crypto_key_iam_member" "doc_ai_sa_doc_ai" {
  crypto_key_id = google_kms_crypto_key.doc_ai.id
  role          = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
  member        = "serviceAccount:${local.doc_ai_sa}"
}