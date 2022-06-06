const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { Category } = require('./resolvers/Category');
const { Product } = require('./resolvers/Product');
const { Query } = require('./resolvers/Query');
const { Mutation } = require('./resolvers/Mutation');
const data = require('./db');

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
		Category,
		Product
	},
    context: data
});

server.listen().then(({ url }) => {
	console.log(`Server is ready at ${url}`);
});
