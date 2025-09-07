terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-west-2"
}

# Centralized Log Group for the API
resource "aws_cloudwatch_log_group" "api_logs" {
  name              = "/mindhelp/api/application-logs"
  retention_in_days = 90 # Standard retention for HIPAA compliance

  tags = {
    Environment = "production"
    Application = "MindHelpAPI"
  }
}

# IAM Policy that allows writing to the CloudWatch Log Group
data "aws_iam_policy_document" "api_logging_policy" {
  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = [
      aws_cloudwatch_log_group.api_logs.arn
    ]

    effect = "Allow"
  }
}

# Note: This policy document would then be attached to the IAM Role
# that is used by the application's compute service (e.g., EC2, ECS, Lambda).
# The specific attachment mechanism depends on how that role is defined.
#
# resource "aws_iam_policy" "api_logging" {
#   name   = "MindHelpAPILoggingPolicy"
#   policy = data.aws_iam_policy_document.api_logging_policy.json
# }
#
# resource "aws_iam_role_policy_attachment" "api_logging_attachment" {
#   role       = aws_iam_role.api_role.name # Example role
#   policy_arn = aws_iam_policy.api_logging.arn
# }
