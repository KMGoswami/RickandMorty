const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const CharactersAPI = require('./datasources/CharactersAPI');
const LocationsAPI = require('./datasources/LocationsAPI');
const EpisodesAPI = require('./datasources/EpisodesAPI');

const server = new ApolloServer({ 
	typeDefs,
	resolvers,
	dataSources: () => ({
		charactersAPI: new CharactersAPI(),
		locationsAPI: new LocationsAPI(),
		episodesAPI: new EpisodesAPI()
	}) 
});

server.listen().then(({ url }) => {  console.log(`🚀 Server ready at ${url}`);});