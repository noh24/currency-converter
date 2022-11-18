import WeatherService from "./../services/weather-service";
import GiphyService from './../services/giphy-service';

//business logic
// async function
// async function getWeather(city) {
//   let response = await WeatherService.getWeather(city);
//   if (response.main) {
//     printElements(response, city);
//   } else {
//     printError(response, city);
//   }
// }
// // fetch api
// function getWeather(city) {
//   WeatherService.getWeather(city)
//     .then(response => {
//       if (response.main) {
//         printElements(response, city);
//       } else {
//         printError(response, city);
//       }
//     })
// }
// // promises
// function getWeather(city) {
//   let promise = WeatherService.getWeather(city);
//   promise.then(function(weatherDataArray) {
//     printElements(weatherDataArray);
//   }, function(errorArray) {
//     printError(errorArray);
//   });
// }
//chaining API calls
function getApiData(city) {
  WeatherService.getWeather(city)
    .then(weatherResponse => {
      if (weatherResponse instanceof Error) {
        const weatherErrorMessage = `There wass a problem with accessing the weather data from Open Weather API for ${city}: ${weatherResponse.message}`;
        throw new Error(weatherErrorMessage);
      }
      const description = (weatherResponse.weather[0].description);
      printWeather(description, city);
      return GiphyService.getGiphy(description);
    })
    .then(giphyResponse => {
      if (giphyResponse instanceof Error) {
        const errorMessage = `There was a problem accessing the gif data from Giphy API: ${giphyResponse.message}`
        throw new Error(errorMessage);
      }
      displayGif(giphyResponse, city);
    })
    .catch(error => printError(error));
}

//UI Logic
function printWeather(description, city) {
  document.getElementById('weather-description').innerText = `The weather in ${city} is ${description}`;
}
function printError(error) {
  document.getElementById('error').innerText = error;
}
function displayGif(response, city) {
  const url = response.data[0].images.downsized.url;
  const img = document.createElement('img');
  img.src = url;
  img.alt = `${city} weather`;
  document.getElementById('gif').append(img);
}
function clearResults() {
  document.getElementById('weather-description').innerText = null;
  document.getElementById('gif').innerText = null;
  document.getElementById('error').innerText = null;
}
// function printElements(response, city) {
//   document.querySelector('#showResponse').innerText = `The humidity is in ${city} is ${response.main.humidity}%.
//   The temperature in Kelvins is ${response.main.temp} degrees.`;
// }

// function printError(error, city) {
//   document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${error}.`;
// }

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  clearResults();
  getApiData(city);
}


document.querySelector('form').addEventListener('submit', handleFormSubmission);
