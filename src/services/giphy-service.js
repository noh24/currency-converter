export default class GiphyService {
  static async getGiphy(search) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.GIPHY_API_KEY}&limit=5`)
      .then(response => {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(error => error);
  }
}