const express = require('express');
const graphQLHTTP = require('express-graphql');

const app = express();

app.listen(8080, () => console.log('Start Listening Port 8080'));