const { GraphQLSchema } = require('graphql');
const query = require('./queries');

module.exports = new GraphQLSchema({
    query,
})