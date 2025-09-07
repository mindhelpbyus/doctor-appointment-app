terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.20"
    }
  }
  required_version = ">= 1.2.0"
}

provider "google" {
  project = "mindhelp-project" # Replace with your GCP project ID
  region  = "us-west1"
}

# Note on GCP Logging:
# Google Cloud Logging automatically collects syslog messages from VM instances
# running the Cloud Logging agent. The primary task is to ensure the agent
# is installed and configured on the compute instances.

# The Terraform configuration would focus on setting up the compute instance
# correctly, rather than creating a logging resource itself.

# Example for a Google Compute Engine instance:
resource "google_compute_instance" "api_server" {
  name         = "mindhelp-api-server"
  machine_type = "e2-medium"
  zone         = "us-west1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }

  // This metadata script installs the Ops Agent, which handles logging
  metadata_startup_script = <<-EOT
    #!/bin/bash
    curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
    bash add-google-cloud-ops-agent-repo.sh --also-install
    # The agent is now installed and will automatically forward syslog to Cloud Logging.
    # The application's LOGGING_HOST should be set to localhost.
  EOT

  // The application's environment variables would be set here
  metadata = {
    LOGGING_HOST = "127.0.0.1"
    LOGGING_PORT = "514"
  }
}
