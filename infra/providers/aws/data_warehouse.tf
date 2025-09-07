
# =============================================================================
# AWS Provider: Data Warehouse (Redshift)
#
# Defines the resources for the analytics platform.
# =============================================================================

# --- S3 Bucket for Analytics Data ---
# This bucket will store raw data for ingestion into Redshift.
resource "aws_s3_bucket" "analytics_data" {
  bucket = "your-app-analytics-data"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  versioning {
    enabled = true
  }

  tags = {
    Name        = "analytics-data-bucket"
    Environment = "dev"
    Compliance  = "HIPAA, PCI, PII, PHI"
    ManagedBy   = "Terraform"
  }
}

# --- Redshift Cluster ---
# This is the core data warehouse.
# NOTE: In a real-world scenario, you would parameterize the node type,
# number of nodes, and master username/password.
resource "aws_redshift_cluster" "analytics_cluster" {
  cluster_identifier = "your-app-analytics-cluster"
  database_name      = "analyticsdb"
  master_username    = "adminuser"
  master_password    = "YourSecurePassword1!" # Replace with a secret from a secret manager
  node_type          = "dc2.large"
  cluster_type       = "single-node"

  # Enable encryption for compliance
  encrypted = true

  # IAM roles for accessing other AWS services (like S3)
  iam_roles = [aws_iam_role.redshift_role.arn]

  # VPC security groups for network security
  vpc_security_group_ids = [aws_security_group.redshift_sg.id]

  skip_final_snapshot = true

  tags = {
    Name        = "analytics-cluster"
    Environment = "dev"
    Compliance  = "HIPAA, PCI, PII, PHI"
    ManagedBy   = "Terraform"
  }
}

# --- IAM Role for Redshift ---
# Allows Redshift to access the S3 bucket.
resource "aws_iam_role" "redshift_role" {
  name = "Redshift-S3-Access-Role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = {
        Service = "redshift.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "redshift_s3_policy" {
  role       = aws_iam_role.redshift_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

# --- Security Group for Redshift ---
# Controls network access to the cluster.
resource "aws_security_group" "redshift_sg" {
  name        = "redshift-sg"
  description = "Allow inbound traffic to Redshift"

  # In a real environment, you should restrict this to your application's IP range.
  ingress {
    from_port   = 5439
    to_port     = 5439
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "redshift-security-group"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

