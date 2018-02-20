const graphql = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const users = [
  { id: 1, name: 'Willy Lu', age: 29 },
  { id: 2, name: 'Billy Lu', age: 22 }
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_value, args) {
        return users.filter(user => user.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});