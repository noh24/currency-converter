import ExchangeRateService from "./../services/exchange-rate-service";
import { printError, printResults, printRates } from "./index.js";

export async function getExchangeRate(baseCurrency, amount, exchangeCurrency) {
  const response = await ExchangeRateService.getExchangeRate(baseCurrency);
  if (response instanceof Error) {
    printError(response, baseCurrency);
  } else {
    storeSession(response);
    calculateExchange(baseCurrency, amount, exchangeCurrency);
    printRates(baseCurrency);
  }
}

function storeSession(response) {
  for (const [key, value] of Object.entries(response['conversion_rates'])) {
    sessionStorage.setItem(key, value);
  }
}

export function calculateExchange(baseCurrency, amount, exchangeCurrency) {
  const conversionRate = sessionStorage.getItem(exchangeCurrency);
  const convertedAmount = amount * conversionRate;
  printResults(convertedAmount, baseCurrency, amount, exchangeCurrency);
}