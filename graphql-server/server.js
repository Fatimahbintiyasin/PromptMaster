const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schemas/prompt.server.schema');
//
const app = express();
const cors = require("cors");

// connect to MongoDB database
mongoose
  .connect('mongodb://localhost:27017/FatimahYasin-prompt-db', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// create the graphql endpoint
app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql: true,
}));
//
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql`);
});
