terraform {
  backend "gcs" {
    bucket = "presumably-frequently-humane-squid"
    prefix = "bootstrap"
  }
}