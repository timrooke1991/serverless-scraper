const uuid = require('uuid');
const AWS = require('aws-sdk');

// export AWS_ACCESS_KEY_ID = AWSID
// export AWS_SECRET_ACCESS_KEY = AWSKEY
// export AWS_DEFAULT_REGION = REGION

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data, businessName) => {
  console.log('data saving...');
  console.log(data);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      businessName: businessName,
      reviewCount: data.reviewCount,
      rating: data.rating,
      createdAt: JSON.stringify(new Date())
    }
  };

  // I am can log params okay, but nothing with dynamoDb.put is logged to the console

  dynamoDb.put((params), error => {
    console.log('putting data');
    if (error) {
      console.log(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);
      return Promise.reject(
        `Error saving data to DynamoDB: ${JSON.stringify(error)}`
      );
    } else {
      console.log('data saved');
      return Promise.resolve(data);
    }
  });
};
