const { RESTDataSource } = require('apollo-datasource-rest');

class CharactersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://rickandmortyapi.com/api/';
  }

  async getAllCharacters() {
  	try{
	    const response = await this.get('character');
	    return response;
  	}catch(err){
  		console.log(err);
  	}
  }

  async getCharactersByPage(page){
    try{
      const response = await this.get(`character/?page=${page}`);
      return response;
    }catch(err){
      console.log(err);
    }
  }

}

module.exports = CharactersAPI;