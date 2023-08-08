resource "google_service_account" "api" {
  account_id   = "api-sa"
  display_name = "API Service Account"
}

resource "google_project_iam_custom_role" "api" {
  role_id     = "api"
  title       = "API Service Account custom role"
  description = "Contains the permissions necessary to run the API Cloud Run service"
  permissions = [
    "appengine.applications.get",
    "compute.backendServices.get",
    "documentai.humanReviewConfigs.review",
    "documentai.operations.getLegacy",
    "documentai.processorVersions.processBatch",
    "documentai.processorVersions.processOnline",
    "documentai.processors.processBatch",
    "documentai.processors.processOnline",
    "resourcemanager.projects.get",
  ]
}

resource "google_project_iam_member" "api_sa" {
  project = data.google_project.project.project_id
  role    = google_project_iam_custom_role.api.name
  member  = "serviceAccount:${google_service_account.api.email}"
}

resource "google_service_account_iam_member" "api_sa_cloudbuild_apps_sa" {
  service_account_id = google_service_account.api.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.cloudbuild_apps.email}"
}