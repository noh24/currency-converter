import ExchangeRateService from "./../services/exchange-rate-service";
import { printError, printResults, printRates } from "./index.js";

export async function getExchangeRate(baseCurrency, amount, exchangeCurrency) {
  if (!sessionStorage || Object.keys(sessionStorage).includes(baseCurrency)) {
    console.log(`working`);
    const response = await ExchangeRateService.getExchangeRate(baseCurrency);
    if (response instanceof Error) {
      printError(response);
    } else {
      storeSession(response);
      calculateExchange(baseCurrency, amount, exchangeCurrency);
      printRates(baseCurrency);
    }
  } else {
    console.log(`not printing a new one but new money`);
    calculateExchange(baseCurrency, amount, exchangeCurrency);
  }
}


function storeSession(response) {
  for (const [key, value] of Object.entries(response['conversion_rates'])) {
    sessionStorage.setItem(key, value);
  }
}

function calculateExchange(baseCurrency, amount, exchangeCurrency) {
  const conversionRate = sessionStorage.getItem(exchangeCurrency);
  const convertedAmount = amount * conversionRate;
  printResults(convertedAmount, baseCurrency, amount, exchangeCurrency);
}