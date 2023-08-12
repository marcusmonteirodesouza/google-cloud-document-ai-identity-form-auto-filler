locals {
  doc_ai_sa = "service-${data.google_project.project.number}@gcp-sa-prod-dai-core.iam.gserviceaccount.com"

  doc_ai_single_region = var.doc_ai_region == "us" ? "us-central1" : "europe-west4" # See https://cloud.google.com/document-ai/docs/cmek#using_cmek
}

resource "google_document_ai_processor" "us_driver_license_parser" {
  location     = var.doc_ai_region
  display_name = "us-driver-license-parser"
  type         = "US_DRIVER_LICENSE_PROCESSOR"
  kms_key_name = google_kms_crypto_key.doc_ai_single_region.id

  depends_on = [
    google_kms_crypto_key_iam_member.doc_ai_sa_doc_ai_single_region
  ]
}

resource "google_document_ai_processor" "us_passport_parser" {
  location     = var.doc_ai_region
  display_name = "us-passport-parser"
  type         = "US_PASSPORT_PROCESSOR"
  kms_key_name = google_kms_crypto_key.doc_ai_single_region.id

  depends_on = [
    google_kms_crypto_key_iam_member.doc_ai_sa_doc_ai_single_region
  ]
}

resource "google_document_ai_processor" "us_id_proofing" {
  location     = var.doc_ai_region
  display_name = "us-id-proofing-processor"
  type         = "ID_PROOFING_PROCESSOR"
  kms_key_name = google_kms_crypto_key.doc_ai_single_region.id

  depends_on = [
    google_kms_crypto_key_iam_member.doc_ai_sa_doc_ai_single_region
  ]
}

resource "google_document_ai_processor" "us_patent_parser" {
  location     = var.doc_ai_region
  display_name = "us-patent-parser"
  type         = "CUSTOM_EXTRACTION_PROCESSOR"
  kms_key_name = google_kms_crypto_key.doc_ai_single_region.id

  depends_on = [
    google_kms_crypto_key_iam_member.doc_ai_sa_doc_ai_single_region
  ]
}

resource "google_storage_bucket" "us_passport_parser_dataset" {
  name     = "${data.google_project.project.project_id}-us-patent-parser-dataset"
  location = local.doc_ai_single_region

  uniform_bucket_level_access = true

  encryption {
    default_kms_key_name = google_kms_crypto_key.doc_ai_single_region.id
  }

  versioning {
    enabled = true
  }
}