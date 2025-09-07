
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');
const fs = require('fs');
const path = require('path');

// Configure the AWS SDK to use the local DynamoDB instance
const client = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

const docClient = DynamoDBDocumentClient.from(client);

// --- Data Files ---
const doctorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/doctors.json'), 'utf8'));
const patientsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/patients.json'), 'utf8'));
const reviewsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/reviews.json'), 'utf8'));

// Function to batch write items to a table
const seedTable = async (tableName, items) => {
  const putRequests = items.map(item => ({
    PutRequest: {
      Item: item,
    },
  }));

  // DynamoDB BatchWriteCommand can only handle 25 items at a time
  for (let i = 0; i < putRequests.length; i += 25) {
    const chunk = putRequests.slice(i, i + 25);
    const command = new BatchWriteCommand({
      RequestItems: {
        [tableName]: chunk,
      },
    });

    try {
      await docClient.send(command);
      console.log(`Successfully seeded a chunk of ${chunk.length} items into ${tableName}`);
    } catch (err) {
      console.error(`Error seeding ${tableName}:`, JSON.stringify(err, null, 2));
    }
  }
};

const main = async () => {
  console.log('Seeding started...');

  // An array of promises to run the seeding in parallel
  const seedingPromises = [
    seedTable('doctors', doctorsData),
    seedTable('patients', patientsData),
    seedTable('reviews', reviewsData),
  ];

  // Wait for all seeding operations to complete
  await Promise.all(seedingPromises);

  console.log('Seeding completed successfully!');
};

main().catch(err => {
  console.error('An error occurred during the seeding process:', err);
});
