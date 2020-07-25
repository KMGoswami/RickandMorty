const { gql } = require('apollo-server');

const typeDefs = gql`

  type Character{
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Location
    location: Location
    image: String
    episode: [Episode]
    url: String
    created: String
  }

  type Characters{
  	info: Info
  	results: [Character]
  }

  type Location{
  	id: ID
  	name: String
    type: String
    dimension: String
    residents: [String]
    url: String
    created: String
  }

  type Locations{
  	info: Info
  	results: [Location]
  }

  type Episode{
	id: ID
	name: String
	air_date: String
	episode: String
	characters: [Character]
	created: String
  }

  type Episodes{
  	info: Info
  	results: [Episode]
  }

  type Info{
  	count: Int
  	pages: Int
  	next: String
  	prev: String
  }

  type Query {
	 character: Character
    characters: Characters
    charactersByPage(page: String): Characters
    episode: Episode
    episodes: Episodes
    episodesByPage(page: String): Episodes
    location: Location
    locations: Locations
    locationsByPage(page: String): Locations
  }

`;

module.exports = typeDefs