variable "org_id" {
  type        = string
  description = " The numeric ID of the organization."
}

variable "all_users_ingress_tag_value_id" {
  type        = string
  description = "The allUsersIngress tag value ID."
}

variable "project_id" {
  type        = string
  description = "The project ID."
}

variable "region" {
  type        = string
  description = "The default Google Cloud region for the created resources."
}

variable "doc_ai_region" {
  type        = string
  description = "The default Google Cloud region for the Document AI resources."
}

variable "api_image" {
  type        = string
  description = "The name of the API Artifact Registry Docker image."
}

variable "api_sa_email" {
  type        = string
  description = "The email of the API service account."
}

variable "api_domain_name" {
  type        = string
  description = "The API domain name."
}
