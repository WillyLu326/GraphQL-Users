const graphql = require('graphql');
const _ = require('lodash');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
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
        return _.find(users, args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});