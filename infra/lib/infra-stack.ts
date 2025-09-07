import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy } from 'aws-cdk-lib';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const createTable = (tableName: string, partitionKey: dynamodb.Attribute, sortKey?: dynamodb.Attribute) => {
      return new dynamodb.Table(this, tableName, {
        tableName: tableName,
        partitionKey: partitionKey,
        sortKey: sortKey,
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        encryption: dynamodb.TableEncryption.AWS_MANAGED,
        removalPolicy: RemovalPolicy.DESTROY, // Change in production
      });
    };

    // Define Attributes
    const idAttribute: dynamodb.Attribute = { name: 'id', type: dynamodb.AttributeType.STRING };
    const usernameAttribute: dynamodb.Attribute = { name: 'username', type: dynamodb.AttributeType.STRING };
    const emailAttribute: dynamodb.Attribute = { name: 'email', type: dynamodb.AttributeType.STRING };
    const roleAttribute: dynamodb.Attribute = { name: 'role', type: dynamodb.AttributeType.STRING };
    
    // Create Tables
    const usersTable = createTable('users', idAttribute);
    usersTable.addGlobalSecondaryIndex({
      indexName: 'username-index',
      partitionKey: usernameAttribute,
    });
    usersTable.addGlobalSecondaryIndex({
      indexName: 'email-index',
      partitionKey: emailAttribute,
    });
    usersTable.addGlobalSecondaryIndex({
        indexName: 'role-index',
        partitionKey: roleAttribute,
      });
  }
}
