
# =============================================================================
# Azure Provider: Transactional Database (Cosmos DB)
#
# Defines the database for the application's live operational data on Azure.
# Cosmos DB is a globally-distributed, multi-model database with extensive
# compliance certifications, including HIPAA and PCI DSS.
# =============================================================================

# --- Cosmos DB Account ---
# The top-level resource for Cosmos DB.
resource "azurerm_cosmosdb_account" "main" {
  name                = "${var.project_name}-cosmos-account"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  offer_type          = "Standard"

  # SQL API is the most common and is similar to other document databases.
  kind = "GlobalDocumentDB"

  # Geo-redundancy for high availability and disaster recovery.
  enable_automatic_failover = true

  geo_location {
    location          = var.azure_region
    failover_priority = 0
  }

  geo_location {
    location          = var.azure_failover_region
    failover_priority = 1
  }

  # Consistency level for the database.
  consistency_policy {
    consistency_level       = "Session"
    max_interval_in_seconds = 5
    max_staleness_prefix    = 100
  }

  tags = {
    environment = var.environment
    managed-by  = "terraform"
    compliance  = "hipaa, pci, pii, phi"
  }
}

# --- Cosmos DB SQL Database ---
resource "azurerm_cosmosdb_sql_database" "main_db" {
  name                = "app-database"
  resource_group_name = azurerm_resource_group.main.name
  account_name        = azurerm_cosmosdb_account.main.name
}

# --- Cosmos DB SQL Container (for Users) ---
# A container is analogous to a table in a relational database.
resource "azurerm_cosmosdb_sql_container" "users" {
  name                  = "users"
  resource_group_name   = azurerm_resource_group.main.name
  account_name          = azurerm_cosmosdb_account.main.name
  database_name         = azurerm_cosmosdb_sql_database.main_db.name
  partition_key_path    = "/id"
  throughput            = 400 # Minimum throughput in RU/s
}
