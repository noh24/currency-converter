import ExchangeRateService from "./../services/exchange-rate-service";

async function getExchangeRate(currency) {
  const response = await ExchangeRateService.getExchangeRate(currency);
    if (response instanceof Error) {
      printError(response, currency);
    } else {
      storeSession(response, currency);
    }
}

function storeSession(response) {
  for (const [key, value] of Object.entries(response['conversion_rates'])) {
    sessionStorage.setItem(key, value);
  }
}