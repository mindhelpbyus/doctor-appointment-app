
# =============================================================================
# Azure Provider: Data Warehouse (Synapse Analytics)
#
# Defines the resources for the analytics platform on Azure.
# Synapse Analytics is a limitless analytics service that brings together
# data warehousing and Big Data analytics.
# =============================================================================

# --- Synapse Analytics Workspace ---
# The core environment for Synapse Analytics.
resource "azurerm_synapse_workspace" "analytics_workspace" {
  name                                 = "${var.project_name}-synapse-workspace"
  resource_group_name                  = azurerm_resource_group.main.name
  location                             = azurerm_resource_group.main.location
  storage_data_lake_gen2_filesystem_id = azurerm_storage_data_lake_gen2_filesystem.synapse_fs.id
  sql_administrator_login              = "sqladminuser"
  sql_administrator_login_password     = "YourSecurePassword123!" # Replace with a secret

  tags = {
    environment = var.environment
    managed-by  = "terraform"
    compliance  = "hipaa, pci, pii, phi"
  }
}

# --- Dedicated SQL Pool for Data Warehousing ---
resource "azurerm_synapse_sql_pool" "analytics_sql_pool" {
  name                 = "analytics-sql-pool"
  synapse_workspace_id = azurerm_synapse_workspace.analytics_workspace.id
  sku_name             = "DW100c" # Smallest data warehouse unit for development
  create_mode          = "Default"
}

# --- Storage Account for Synapse Data Lake ---
resource "azurerm_storage_account" "synapse_storage" {
  name                     = "${var.project_name}synapsestorage"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  is_hns_enabled           = true # Required for Data Lake Storage Gen2
}

resource "azurerm_storage_data_lake_gen2_filesystem" "synapse_fs" {
  name               = "synapse-filesystem"
  storage_account_id = azurerm_storage_account.synapse_storage.id
}
