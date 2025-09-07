terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 4.60"
    }
  }
  required_version = ">= 1.2.0"
}

provider "oci" {
  # Configuration details for OCI provider (e.g., tenancy_ocid, region)
  # would be configured here, typically through environment variables.
}

# OCI Compartment to hold all resources
resource "oci_identity_compartment" "mindhelp_compartment" {
  # Compartment details here
  # This is a placeholder for your actual compartment OCID
  compartment_id = "ocid1.tenancy.oc1..aaaa..."
  name           = "MindHelpProduction"
  description    = "Compartment for the MindHelp application"
}

# OCI Log Group for the API
resource "oci_logging_log_group" "api_log_group" {
  compartment_id = oci_identity_compartment.mindhelp_compartment.id
  display_name   = "MindHelpAPILogGroup"
}

# OCI Log for the application
resource "oci_logging_log" "application_log" {
  log_group_id = oci_logging_log_group.api_log_group.id
  log_type     = "AGENT"
  display_name = "APIApplicationLogs"

  is_enabled = true

  configuration {
    source {
      category = "application"
      resource = "ocid1.instance.oc1..aaaa..." # Placeholder for compute instance OCID
      service  = "compute"
      source_type = "SYSLOG"
    }
    
    # The compartment_id for the log configuration
    compartment_id = oci_identity_compartment.mindhelp_compartment.id
  }
}
