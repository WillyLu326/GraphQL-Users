const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const users = [
  { id: "1", name: 'Willy Lu', age: 29 },
  { id: "2", name: 'Billy Lu', age: 22 }
];

const companies = [
  { id: '1', name: 'C1', location: 'L1' },
  { id: '2', name: 'C2', location: 'L2' }
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { 
        id: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(_value, args) {
        return _.find(users, args);
      }
    },
    company: {
      type: new GraphQLList(CompanyType),
      args: {
        id: { type: GraphQLString }
      },
      resolve(_value, args) {
        if (_.isEmpty(args)) {
          return companies;
        }
        return _.filter(companies, company => company.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});