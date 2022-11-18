import ExchangeRateService from './../services/exchange-rate-service.js';

window.addEventListener('load', function() {
  addSelectBoxes();
});

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
