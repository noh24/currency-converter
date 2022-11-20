import { getExchangeRate, calculateExchange } from './exchange-rate.js';
import './../css/output.css';

window.addEventListener('load', function() {
  this.sessionStorage.clear();
  addSelectOptions();
  document.querySelector('form').addEventListener('submit', handleSubmission);
});
function printUserError() {
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('error').innerText = 'Please select a valid currency.';
}
export function printError(response) {
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('error').innerText = `There was an error with ExchangeRate-API: ${response}`;
}
export function printResults(convertedAmount, baseCurrency, amount, exchangeCurrency) {
  document.getElementById('results').classList.remove('hidden');
  const div = document.createElement('div');
  div.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
  const divFrom = document.createElement('div');
  divFrom.innerText = 'From';
  const div2 = document.createElement('div');
  div2.classList.add('text-5xl');
  div2.innerText = amount;
  const div3 = document.createElement('div');
  div3.classList.add('font-normal');
  div3.innerText = baseCurrency;
  const div4 = document.createElement('div');
  div4.innerText = 'To';
  const div5 = document.createElement('div');
  div5.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
  const div6 = document.createElement('div');
  div6.classList.add('text-5xl');
  div6.innerText = convertedAmount;
  const div7 = document.createElement('div');
  div7.classList.add('font-normal');
  div7.innerText = exchangeCurrency;
  div.append(div2, div3);
  div5.append(div6, div7);
  document.getElementById('results').append(divFrom, div, div4, div5);
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
  tableHeader.classList.add( 'py-3', 'px-6');
  tableHeader2.classList.add( 'py-3', 'px-6');
  tableHeader3.classList.add( 'py-3', 'px-6');
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
  document.getElementById('error').classList.add('hidden');
  document.getElementById('results').classList.add('hidden');
  document.getElementById('error').innerText = null;
  document.getElementById('results').innerText = null;
  document.getElementById('conversion-table').innerText = null;
  const baseCurrency = document.getElementById('base-currency').value;
  const amount = document.getElementById('amount').value;
  const exchangeCurrency = document.getElementById('exchange-currency').value;
  if (isValidCurrency(baseCurrency, exchangeCurrency)) {
    if (sessionStorage[baseCurrency] !== "1") {
      getExchangeRate(baseCurrency, amount, exchangeCurrency);
    } else {
      calculateExchange(baseCurrency, amount, exchangeCurrency);
      printRates(baseCurrency);
    }
  } else {
    printUserError();
  }
}
function isValidCurrency(baseCurrency, exchangeCurrency) {
  let optionArray = Array.from(document.querySelectorAll('#base-currency option'));
  optionArray.shift();
  for (let i = 0; i < optionArray.length; i++) {
    optionArray[i] = optionArray[i].value;
  }
  if (optionArray.includes(baseCurrency) && optionArray.includes(exchangeCurrency)) {
    return true;
  } 
  return false;
}
function addSelectOptions() {
  const optionArray = Array.from(document.querySelectorAll('#base-currency option'));
  const exchangeSelect = document.getElementById('exchange-currency');
  optionArray.forEach(option => {
    let exchangeOption = document.createElement('option');
    if (option === optionArray[0]) {
      exchangeOption.innerText = option.innerText;
      exchangeSelect.append(exchangeOption);
    } else {
      exchangeOption.innerText = option.innerText;
      exchangeOption.value = option.value;
      exchangeSelect.append(exchangeOption);
    }
  });
}
