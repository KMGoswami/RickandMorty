module.exports = {
  Query: {
    characters: (parent, args, context, info) => context.dataSources.charactersAPI.getAllCharacters() ,
    charactersByPage: (parent, args, context, info) => context.dataSources.charactersAPI.getCharactersByPage(args.page) ,
    locations: (parent, args, context, info) => context.dataSources.locationsAPI.getAllLocations() ,
    locationsByPage: (parent, args, context, info) => context.dataSources.locationsAPI.getLocationsByPage(args.page) ,
    episodes: (parent, args, context, info) => context.dataSources.episodesAPI.getAllEpisodes() ,
    episodesByPage: (parent, args, context, info) => context.dataSources.episodesAPI.getEpisodesByPage(args.page)
  }
};