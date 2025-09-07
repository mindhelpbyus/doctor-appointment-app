
# =============================================================================
# OCI Provider: Data Warehouse (Autonomous Data Warehouse)
#
# Defines the resources for the analytics platform on OCI.
# =============================================================================

# --- Autonomous Data Warehouse ---
# This is a fully managed, self-driving database optimized for analytics workloads.
resource "oci_database_autonomous_database" "analytics_dw" {
  # The compartment OCID where the database will be created.
  compartment_id = var.oci_compartment_ocid
  db_name        = "${var.project_name}_adw_db"
  display_name   = "${var.project_name}-analytics-dw"
  db_workload    = "DW" # Optimized for Data Warehouse

  # Basic configuration for development
  cpu_core_count = 1
  data_storage_size_in_tbs = 1

  # For production, you should manage the admin password via a secret vault.
  admin_password = "YourSecureOraclePassword2@"

  # Network configuration. This example makes it publicly accessible.
  # For production, you should use private endpoints and network security groups.
  is_free_tier = false
  whitelisted_ips = ["0.0.0.0/0"] # WARNING: Open to the world. Restrict this in production.

  tags = {
    "environment" = var.environment
    "managed-by"  = "terraform"
    "compliance"  = "hipaa, pci, pii, phi"
  }
}
