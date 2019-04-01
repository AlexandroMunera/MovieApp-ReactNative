const BASE_API = 'https://api.themoviedb.org/3/';
const API_KEY = 'b835070ca3f98419c2433584bf3af7cd';
const API_LANGUAGE = 'fr';

class Api {

  async getPopularMovies() {
      console.log('Entre a getPopularMovie');
    const query = await fetch(`${BASE_API}movie/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=1`);
    const { results } = await query.json();
    // console.log(results);
    return results;

  }  
}

export default new Api();