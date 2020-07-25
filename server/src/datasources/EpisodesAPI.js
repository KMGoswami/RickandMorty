const { RESTDataSource } = require('apollo-datasource-rest');

class EpisodesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://rickandmortyapi.com/api/';
  }

  async getAllEpisodes() {
  	try{
	    const response = await this.get('episode');
	    console.log("Episodes : " + response);
	    return response;
  	}catch(err){
  		console.log(err);
  	}
  }

  async getEpisodesByPage(page){
    try{
      const response = await this.get(`episode/?page=${page}`);
      return response;
    }catch(err){
      console.log(err);
    }
  }

}

module.exports = EpisodesAPI;