'''
import boto3
from botocore.config import Config

def get_dynamodb_table(table_name: str):
    """Get a DynamoDB table resource."""
    config = Config(
        region_name="us-east-1",
        signature_version="v4",
        retries={
            "max_attempts": 10,
            "mode": "standard",
        },
    )
    dynamodb = boto3.resource("dynamodb", config=config)
    return dynamodb.Table(table_name)

'''