
# =============================================================================
# Azure Provider: Main Configuration
#
# This file is the entry point for the Azure infrastructure. It configures the
# Azure Provider (azurerm) and defines shared resources like the resource group.
# =============================================================================

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# --- Provider Configuration ---
# Configure the Azure Provider. Credentials are automatically sourced from
# the environment (e.g., Azure CLI, Service Principal).
provider "azurerm" {
  features {}
}

# --- Resource Group ---
# A resource group is a container that holds related resources for an Azure solution.
resource "azurerm_resource_group" "main" {
  name     = "${var.project_name}-rg"
  location = var.azure_region

  tags = {
    environment = var.environment
    managed-by  = "terraform"
  }
}

# --- Global Variables for Azure ---
variable "azure_region" {
  description = "The Azure region for deploying resources."
  type        = string
  default     = "East US"
}

variable "azure_failover_region" {
  description = "The Azure region for failover."
  type        = string
  default     = "West US"
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

