const { RESTDataSource } = require('apollo-datasource-rest');

class LocationsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://rickandmortyapi.com/api/';
  }

  async getAllLocations() {
  	try{
	    const response = await this.get('location');
	    return response;
  	}catch(err){
  		console.log(err);
  	}
  }

  async getLocationsByPage(page){
    try{
      const response = await this.get(`location/?page=${page}`);
      return response;
    }catch(err){
      console.log(err);
    }
  }

}

module.exports = LocationsAPI;