variable "org_id" {
  type        = string
  description = " The numeric ID of the organization."
}

variable "all_users_ingress_tag_key" {
  type        = string
  description = "The allUsersIngress tag key short name."
}

variable "all_users_ingress_tag_value" {
  type        = string
  description = "The allUsersIngress tag value short name."
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

variable "api_domain_name" {
  type        = string
  description = "The API domain name."
}

variable "sourcerepo_name" {
  type        = string
  description = "The Cloud Source Repository name."
}

variable "sourcerepo_branch_name" {
  type        = string
  description = "The Cloud Source repository branch name."
}
