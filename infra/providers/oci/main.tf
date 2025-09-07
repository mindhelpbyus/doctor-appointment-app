# =============================================================================
# OCI Provider: Main Configuration
#
# This file is the entry point for the OCI infrastructure. It configures the
# OCI provider and defines shared variables for the OCI environment.
# =============================================================================

terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "> 5.0"
    }
  }
}

# --- Provider Configuration ---
# Configure the OCI provider. You must provide tenancy and user credentials.
# This is typically done via a config file (~/.oci/config) or environment variables.
provider "oci" {
  tenancy_ocid     = var.oci_tenancy_ocid
  user_ocid        = var.oci_user_ocid
  fingerprint      = var.oci_fingerprint
  private_key_path = var.oci_private_key_path
  region           = var.oci_region
}

# --- Global Variables for OCI ---
variable "oci_tenancy_ocid" {
  description = "The OCID of the OCI tenancy."
  type        = string
}

variable "oci_user_ocid" {
  description = "The OCID of the user for authentication."
  type        = string
}

variable "oci_fingerprint" {
  description = "The fingerprint of the API key."
  type        = string
}

variable "oci_private_key_path" {
  description = "The path to the private key file for API authentication."
  type        = string
}

variable "oci_compartment_ocid" {
  description = "The OCID of the compartment to deploy resources into."
  type        = string
}

variable "oci_region" {
  description = "The OCI region for deploying resources."
  type        = string
  default     = "us-ashburn-1"
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
