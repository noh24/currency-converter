import ExchangeRateService from './../services/exchange-rate-service.js';
import { getExchangeRate } from './exchange-rate.js';

window.addEventListener('load', function() {
  addSelectBoxes();
  document.querySelector('form').addEventListener('submit', handleSubmission);
});

export function printError(response) {
  document.getElementById('error').innerText = `There was an error with ExchangeRate-API: ${response}`;
}
export function printResults(convertedAmount, baseCurrency, amount, exchangeCurrency) {
  document.getElementById('results').innerText = `${amount} ${baseCurrency} = ${convertedAmount} ${exchangeCurrency}`;
}
function handleSubmission(e) {
  e.preventDefault();
  const baseCurrency = document.getElementById('base-currency').value;
  const amount = document.getElementById('amount').value;
  const exchangeCurrency = document.getElementById('exchange-currency').value;
  getExchangeRate(baseCurrency, amount, exchangeCurrency);
}

async function addSelectBoxes() {
  let response = await ExchangeRateService.getExchangeRate('USD');
  if (response['conversion_rates']) {
    const keys = Object.keys(response['conversion_rates']);
    const baseSelectTag = document.getElementById('base-currency');
    const exchangeSelectTag = document.getElementById('exchange-currency');
    const tagArr = [baseSelectTag, exchangeSelectTag];
    for (let j = 0; j < tagArr.length; j++) {
      for (let i = 0; i < keys.length; i ++) {
        const option = document.createElement('option');
        option.value = keys[i];
        option.innerText = keys[i];
        tagArr[j].append(option);
      }
    }
  }
}