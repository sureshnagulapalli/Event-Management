const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://graphql:suresh-graphql@cluster0-n9a0x.mongodb.net/events-react-dev?retryWrites=true&w=majority`)
  .then(() => {
    console.log("server started");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


  // 5f36bb17f530f34bac8b60f0