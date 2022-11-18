//async functions
export default class WeatherService {
  static async getWeather(city) {
    try {
      let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      let jsonResponse = await response.json();
  
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    } catch(error) {
      return error;
    }
  }
}

// // fetch Api
// export default class WeatherService {
//   static getWeather(city) {
//     return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
//       .then(response => {
//         if (!response.ok) {
//           const errorMessage = `${response.status} ${response.statusText}`;
//           throw new Error(errorMessage);
//         } else {
//           return response.json();
//         }
//       }) 
//       .catch(error => {
//         return error;
//       });
//   }
// }
// // Promises
// export default class WeatherService {
//   static getWeather(city) {
//     return new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

//       request.addEventListener('loadend', function() {
//         const response = JSON.parse(this.responseText);
//         if (this.status === 200) {
//           resolve([response, city]);
//         } else {
//           reject([this, response, city]);
//         }
//       });
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }

