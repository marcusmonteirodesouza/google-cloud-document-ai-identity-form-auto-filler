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