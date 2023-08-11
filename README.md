# Google Cloud Document AI REST API demo

## Deployment

### Pre-Requisites

1. [Create a Google Cloud Organization](https://cloud.google.com/resource-manager/docs/creating-managing-organization).
1. [Create a project on your Organization](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
1. [Create a tag](https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing) in your Organization to allow the creation of public services when the service has the tag bound to it. See [this article](https://cloud.google.com/blog/topics/developers-practitioners/how-create-public-cloud-run-services-when-domain-restricted-sharing-enforced).
1. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install).
1. Run [`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login).
1. Run [`gcloud auth application-default login`](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login).
1. Install [`terraform`](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
1. Own a [domain name](https://en.wikipedia.org/wiki/Domain_name) or be a domain name administrator with the ability to create [A records](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record/) for the domain. This will be required to [set up HTTPS](https://cloud.google.com/load-balancing/docs/https/setup-global-ext-https-serverless#update_dns). 

### Bootstrap

This process will:

* [Enable the required APIs](https://cloud.google.com/endpoints/docs/openapi/enable-api).
* [Create the Google Cloud Storage bucket](https://developer.hashicorp.com/terraform/language/settings/backends/gcs) that will contain the [terraform state](https://developer.hashicorp.com/terraform/language/state).
* Store the [`terraform.tfvars`](https://developer.hashicorp.com/terraform/language/values/variables#variable-definitions-tfvars-files) file content on [Secret Manager](https://cloud.google.com/secret-manager).
* Create the [service accounts](https://cloud.google.com/iam/docs/service-account-overview) that the system will use and give them their required [IAM permissions](https://cloud.google.com/iam/docs/overview#permissions).
* Create the [Cloud Build triggers](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers) that will actually deploy the workloads.

You should perform this first. To do so:

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repository.
1. `cd` into the [./infra/deployment/terraform/bootstrap](./infra/deployment/terraform/bootstrap) folder.
1. Copy the `terraform.tfvars.template` file into a `terraform.tfvars` file.
1. Fill out the variables. You can leave these two empty for now:

    * `sourcerepo_name`
    * `sourcerepo_branch_name`

1. Comment out the entire contents of the `backend.tf` file.
1. Run `terraform init`.
1. Run `terraform apply -target=module.enable_apis` and type `yes`.
1. Create a [Cloud Source Repository](https://cloud.google.com/source-repositories/docs) by [mirroring your forked Github repository](https://cloud.google.com/source-repositories/docs/mirroring-a-github-repository).
1. Fill out the `sourcerepo_name` variable with the Cloud Source repository name.
1. Run `terraform apply` and type `yes`.
1. Uncomment the contents of the `backend.tf` file and set the `bucket` attribute to the value of the `tfstate_bucket` output.
1. Run `terraform init` and type `yes`.

### Apps

This process will deploy the actual applications and their supporting infra-structure. To run it:

1. Go to Cloud Build -> Triggers -> Click the "Run" button on the `apps` trigger row -> Click the "Run Trigger" button.
1. Go to Cloud Build -> History, and follow the build's progress.
1. Go to Load Balancing -> `api-url-map`, and copy the IP address. Follow [this guide](https://cloud.google.com/load-balancing/docs/https/setup-global-ext-https-serverless#update_dns) for the SSL certificate to be signed and have HTTPS set. 

### Train US Patent Parser Custom Document Extractor

The US Patent Parser is a Document AI [Custom Document Extractor](https://cloud.google.com/document-ai/docs/workbench/build-custom-processor). To train it, follow the steps below:

1. Go to Document AI -> My Processors -> Click the `us-patent-parser` processor -> Train.
1. Click "Show Advanced Options" -> Click "I'l specify my own location -> 