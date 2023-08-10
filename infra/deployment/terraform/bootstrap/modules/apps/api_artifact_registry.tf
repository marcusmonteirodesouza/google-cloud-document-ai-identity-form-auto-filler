locals {
  api_repository = "${var.region}-docker.pkg.dev/${data.google_project.project.project_id}/${google_artifact_registry_repository.api.name}"
  api_image      = "${local.api_repository}/api"
}

resource "google_artifact_registry_repository" "api" {
  location      = var.region
  repository_id = "api"
  format        = "DOCKER"
  kms_key_name  = var.artifact_registry_kms_crypto_key
}

resource "google_artifact_registry_repository_iam_member" "api_cloudbuild_apps_sa" {
  project    = google_artifact_registry_repository.api.project
  location   = google_artifact_registry_repository.api.location
  repository = google_artifact_registry_repository.api.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${var.cloudbuild_apps_sa_email}"
}
