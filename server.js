const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schemas/schema');

const app = express();

app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true
}));

app.listen(8080, () => console.log('Start Listening Port 8080'));