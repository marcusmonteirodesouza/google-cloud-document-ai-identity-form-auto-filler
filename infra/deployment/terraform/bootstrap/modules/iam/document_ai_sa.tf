resource "null_resource" "document_ai_sa" {
  provisioner "local-exec" {
    command = "gcloud beta services identity create --service \"documentai.googleapis.com\" --project ${data.google_project.project.project_id}"
  }
}