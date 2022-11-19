import ExchangeRateService from './../services/exchange-rate-service.js';
import { getExchangeRate, calculateExchange } from './exchange-rate.js';
import './../css/output.css';

window.addEventListener('load', function() {
  this.sessionStorage.clear();
  addSelectBoxes();
  document.querySelector('form').addEventListener('submit', handleSubmission);
});

export function printError(response) {
  document.getElementById('error').innerText = `There was an error with ExchangeRate-API: ${response}`;
}
export function printResults(convertedAmount, baseCurrency, amount, exchangeCurrency) {
  document.getElementById('results').innerText = `${amount} ${baseCurrency} = ${convertedAmount} ${exchangeCurrency}`;
}
export function printRates(baseCurrency) {
  const conversionTable = document.getElementById('conversion-table');
  const table = document.createElement('table');
  const caption = document.createElement('caption');
  caption.innerText = 'Conversion Rates';
  caption.classList.add('p-5', 'text-3xl', 'text-slate-50');
  const tableHead = document.createElement('thead');
  tableHead.classList.add('text-blue-500', 'bg-slate-50');
  const tableHeader = document.createElement('th');
  const tableHeader2 = document.createElement('th');
  const tableHeader3 = document.createElement('th');
  tableHeader.innerText = 'Base Currency';
  tableHeader2.innerText = 'Exchange Currency';
  tableHeader3.innerText = 'Exchange Rate';
  tableHead.append(tableHeader, tableHeader2, tableHeader3);
  table.append(caption, tableHead);
  let count = 0;
  for (const [key, value] of Object.entries(sessionStorage)) {
    const tableData = document.createElement('td');
    const tableData2 = document.createElement('td');
    const tableData3 = document.createElement('td');
    tableData.innerText = baseCurrency;
    tableData2.innerText = key;
    tableData3.innerText = value;
    tableData.classList.add('py-3', 'px-6');
    tableData2.classList.add('py-3', 'px-6');
    tableData3.classList.add('py-3', 'px-6');
    const tableRow = document.createElement('tr');
    if (count % 2 === 1) {
      tableRow.classList.add('bg-slate-50');
    } else {
      tableRow.classList.add('text-slate-50');
    }
    tableRow.append(tableData, tableData2, tableData3);
    table.append(tableRow);
    count++;
  }
  conversionTable.append(table);
}
function handleSubmission(e) {
  e.preventDefault();
  document.getElementById('conversion-table').innerText = null;
  const baseCurrency = document.getElementById('base-currency').value;
  const amount = document.getElementById('amount').value;
  const exchangeCurrency = document.getElementById('exchange-currency').value;
  if (sessionStorage[baseCurrency] !== "1") {
    getExchangeRate(baseCurrency, amount, exchangeCurrency);
  } else {
    calculateExchange(baseCurrency, amount, exchangeCurrency);
    printRates(baseCurrency);
  }
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