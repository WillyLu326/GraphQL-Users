const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

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

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return axios.get(`http://localhost:3000/companies/${parent.companyId}`)
          .then(res => res.data);
      }
    }
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
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({

});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});