export default class ExchangeRateService {
  static async getExchangeRate(currency) {
    try {
      let response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`);
      let jsonResponse = await response.json();

      if (!response.ok) {
        const errorMessage = `There was an error ${response.status} ${jsonResponse['error-type']}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    }
    catch(error) {
      return error;
    }
  }
}