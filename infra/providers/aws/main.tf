
# =============================================================================
# AWS Provider: Main Configuration
#
# This file is the entry point for the AWS infrastructure. It configures the
# AWS provider and can be used to define shared resources and variables for
# the AWS environment.
# =============================================================================

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# --- Provider Configuration ---
# In a real-world deployment, you would use variables to manage different
# regions and environments (e.g., dev, staging, prod).
provider "aws" {
  region = "us-east-1"
}

# --- Global Variables for AWS ---
# Define any variables that are shared across the AWS infrastructure here.
variable "environment" {
  description = "The deployment environment (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "your-app"
}
