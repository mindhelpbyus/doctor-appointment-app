
# =============================================================================
# GCP Provider: Main Configuration
#
# This file is the entry point for the GCP infrastructure. It configures the
# Google provider and defines shared resources and variables for the GCP
# environment.
# =============================================================================

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# --- Provider Configuration ---
# Configure the Google Cloud provider with project and region.
# Credentials can be provided via environment variables, a credentials file,
# or by running `gcloud auth application-default login`.
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# --- Global Variables for GCP ---
# Define any variables that are shared across the GCP infrastructure here.
variable "gcp_project_id" {
  description = "The GCP Project ID to deploy resources into."
  type        = string
}

variable "gcp_region" {
  description = "The GCP region for deploying resources."
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "The deployment environment (e.g., dev, staging, prod)."
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "The name of the project."
  type        = string
  default     = "your-app"
}
