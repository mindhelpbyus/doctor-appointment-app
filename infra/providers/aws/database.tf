
# =============================================================================
# AWS Provider: Transactional Database (DynamoDB)
#
# Defines the tables for the application's live operational data.
# All tables are encrypted by default to meet compliance requirements.
# =============================================================================

# --- Users Table ---
# Stores all user types (patients, doctors, admins).
resource "aws_dynamodb_table" "users" {
  name         = "users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "email-index"
    hash_key        = "email"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Name        = "users-table"
    Environment = "dev"
    Compliance  = "HIPAA, PCI, PII"
    ManagedBy   = "Terraform"
  }
}

# --- Patients Table ---
# Stores detailed patient-specific information.
resource "aws_dynamodb_table" "patients" {
  name         = "patients"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Name        = "patients-table"
    Environment = "dev"
    Compliance  = "HIPAA, PHI"
    ManagedBy   = "Terraform"
  }
}

# --- Doctors Table ---
resource "aws_dynamodb_table" "doctors" {
  name         = "doctors"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Name        = "doctors-table"
    Environment = "dev"
    Compliance  = "HIPAA, PII"
    ManagedBy   = "Terraform"
  }
}

# --- Appointments Table ---
resource "aws_dynamodb_table" "appointments" {
  name         = "appointments"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  range_key    = "appointment_date"

  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "appointment_date"
    type = "S"
  }
  attribute {
    name = "patient_id"
    type = "S"
  }
  attribute {
    name = "doctor_id"
    type = "S"
  }

  global_secondary_index {
    name            = "patient-appointments-index"
    hash_key        = "patient_id"
    range_key       = "appointment_date"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "doctor-appointments-index"
    hash_key        = "doctor_id"
    range_key       = "appointment_date"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Name        = "appointments-table"
    Environment = "dev"
    Compliance  = "HIPAA, PHI"
    ManagedBy   = "Terraform"
  }
}

