const dynamodb = require("serverless-dynamodb-client");

module.exports.handler = async (event, context) => {
  const date = new Date();
  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      id: event.request.userAttributes.sub,
      name: event.request.userAttributes.name,
      email: event.request.userAttributes.email,
      phone: event.request.userAttributes.phone,
      createdAt: date.toISOString(),
    },
  };

  try {
    await dynamodb.doc.put(params).promise();
    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } catch (error) {
    console.log("Error", error);
    context.done(null, event);
  }
};
