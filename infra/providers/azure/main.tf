terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "azurerm" {
  features {}
}

# Resource Group to hold all resources
resource "azurerm_resource_group" "rg" {
  name     = "mindhelp-resources"
  location = "West US 2"
}

# Centralized Log Analytics Workspace for the API
resource "azurerm_log_analytics_workspace" "api_logs" {
  name                = "mindhelp-api-logs"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018" # Standard SKU
  retention_in_days   = 90        # For compliance

  tags = {
    Environment = "production"
    Application = "MindHelpAPI"
  }
}

# The application's compute service (e.g., App Service, VM)
# would then be configured with the workspace ID and primary shared key
# to send logs. The application environment would be configured with the
# appropriate Syslog endpoint for this workspace.
