data "docker_registry_image" "api" {
  name = var.api_image
}

resource "google_cloud_run_v2_service" "api" {
  name     = "api"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"

  template {
    service_account = var.api_sa_email
    encryption_key  = google_kms_crypto_key.api.id

    containers {
      image = "${var.api_image}@${data.docker_registry_image.api.sha256_digest}"

      env {
        name  = "DOCUMENT_AI_US_DRIVER_LICENSE_PARSER_NAME"
        value = google_document_ai_processor.us_driver_license_parser.name
      }
      env {
        name  = "GOOGLE_PROJECT_ID"
        value = data.google_project.project.project_id
      }
      env {
        name  = "LOG_LEVEL"
        value = "info"
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }
    }
  }

  depends_on = [
    google_kms_crypto_key_iam_member.cloud_run_service_agent_api,
  ]
}

resource "google_tags_location_tag_binding" "all_users_ingress_api" {
  parent    = "//run.googleapis.com/projects/${data.google_project.project.number}/locations/${google_cloud_run_v2_service.api.location}/services/${google_cloud_run_v2_service.api.name}"
  tag_value = var.all_users_ingress_tag_value_id
  location  = google_cloud_run_v2_service.api.location
}

resource "null_resource" "previous" {}

resource "time_sleep" "wait_all_users_ingress_api" {
  create_duration = "120s"

  depends_on = [
    google_tags_location_tag_binding.all_users_ingress_api
  ]
}


resource "google_cloud_run_service_iam_member" "allow_unauthenticated" {
  location = google_cloud_run_v2_service.api.location
  project  = google_cloud_run_v2_service.api.project
  service  = google_cloud_run_v2_service.api.name
  role     = "roles/run.invoker"
  member   = "allUsers"

  depends_on = [
    time_sleep.wait_all_users_ingress_api
  ]
}
