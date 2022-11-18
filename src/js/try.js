function checkNumber(number) {
  if (isNaN(number) || number < 0) {
    return new Error('not a valid number');
  } else {
    return true;
  }
}
window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const inputtedNumber = parseInt(document.querySelector('#number').value);
    document.querySelector('#number').value = null;

    try {
      const isNumberValid = checkNumber(inputtedNumber);
      if (isNumberValid instanceof Error) {
        console.error(isNumberValid.message);
        throw RangeError('not a valid number!');
      } else {
        console.log('try was successful, so no need to catch');
        document.querySelector('#displayNumber').innerText = 'this number is valid. you may continue.';
      }
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }
  });
});