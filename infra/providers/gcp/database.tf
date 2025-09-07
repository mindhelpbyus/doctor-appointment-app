
# =============================================================================
# GCP Provider: Transactional Database (Cloud Spanner)
#
# Defines the database for the application's live operational data on GCP.
# Cloud Spanner is a globally-distributed, strongly consistent, and HIPAA
# compliant database.
# =============================================================================

# --- Cloud Spanner Instance ---
# This is the managed instance that will host our database.
resource "google_spanner_instance" "main" {
  name         = "${var.project_name}-spanner-instance"
  config       = "regional-us-central1"
  display_name = "Main Spanner Instance"
  num_nodes    = 1 # Start with 1 node for development

  labels = {
    env         = var.environment
    managed-by  = "terraform"
    compliance  = "hipaa, pci, pii, phi"
  }
}

# --- Cloud Spanner Database ---
# The actual database within the Spanner instance.
# DDL (Data Definition Language) statements are used to define the tables.
# This keeps the schema definition directly within the infrastructure code.
resource "google_spanner_database" "main_db" {
  instance = google_spanner_instance.main.name
  name     = "app-database"

  ddl = [
    # --- Users Table ---
    "CREATE TABLE users (id STRING(36) NOT NULL, email STRING(255) NOT NULL, role STRING(50)) PRIMARY KEY (id)",
    
    # --- Patients Table ---
    "CREATE TABLE patients (id STRING(36) NOT NULL, name STRING(255), gender STRING(50), age INT64) PRIMARY KEY (id)",
    
    # --- Doctors Table ---
    "CREATE TABLE doctors (id STRING(36) NOT NULL, name STRING(255), specialty STRING(100)) PRIMARY KEY (id)",
    
    # --- Appointments Table ---
    "CREATE TABLE appointments (id STRING(36) NOT NULL, patient_id STRING(36) NOT NULL, doctor_id STRING(36) NOT NULL, appointment_date TIMESTAMP, reason STRING(MAX), status STRING(50), CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients (id), CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (id)) PRIMARY KEY (id)",
  ]

  deletion_protection = false # Set to true for production environments
}

