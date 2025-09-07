
# =============================================================================
# GCP Provider: Data Warehouse (BigQuery)
#
# Defines the resources for the analytics platform on GCP.
# BigQuery is a serverless, highly-scalable, and compliant data warehouse.
# =============================================================================

# --- BigQuery Dataset ---
# A dataset is a top-level container that holds your tables and views.
resource "google_bigquery_dataset" "analytics_dataset" {
  dataset_id                  = "app_analytics"
  friendly_name               = "Application Analytics"
  description                 = "This dataset holds all analytics and reporting data for the application."
  location                    = "US" # Set the geographic location of the data.

  # Labels are critical for tracking resources and costs.
  labels = {
    env         = var.environment
    managed-by  = "terraform"
    compliance  = "hipaa, pci, pii, phi"
  }

  # Set a default table expiration time (e.g., 365 days) if needed, which can help
  # manage storage costs and data retention policies.
  # default_table_expiration_ms = 31536000000

  # Access controls are crucial for compliance.
  # This example grants a predefined group project owner rights.
  # In a real-world scenario, you would create more granular roles.
  access {
    role          = "OWNER"
    group_by_email = "project-owners@your-domain.com" # Replace with your GCP group
  }

  access {
    role = "READER"
    domain = "your-domain.com" # Allow all users in your domain to read the data
  }

  # Enable deletion protection for production datasets.
  delete_contents_on_destroy = false
}
