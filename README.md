# Project Name
By Brian Noh  
Epicodus Independent Project: Currency Converter    
_Currently not deployed_: [Check out the project here](noh24.github.com/currency-converter)

## Technologies Used  
* HTML
* CSS
* JavaScript
* Node.js
* Web API
* Tailwind CSS

## Description
This webpage converts base currency to desired currency using [Exchange Rate API](https://www.exchangerate-api.com/).  
You will have the option to choose base currency and the desired currency.

## Setup/Installation Requirements
### You will need:
* A code editor, such as [VS Code](https://code.visualstudio.com/) .
* [Git](https://docs.github.com/en/get-started/quickstart/set-up-git) installed.
* [Node.js](https://nodejs.org/en/download/).
### You will need an API Key from [Exchange Rate API](https://www.exchangerate-api.com/).
* Navigate to [Exchange Rate API](https://www.exchangerate-api.com/).
* Enter your email address and click `Get Free Key`.
* Finish registering and you shoud now have access to your API Key.
* _Keep your key private!_
### Terminal CLI:
* Open your Terminal and enter:  
```
  $ cd Desktop
  $ git clone https://github.com/noh24/currency-converter.git
  $ cd currency-converter
  $ touch .env
  $ echo "API_KEY={YOUR API KEY HERE}" > .env
```  
__Important note__ Replace {YOUR API KEY HERE}, including curly brackets, with the free API Key from [Exchange Rate API](https://www.exchangerate-api.com/). If you haven't signed up for the key, follow instructions above. 
```
  $ npm install
  $ npm run start
```
## Known bugs
* _No known bugs_.

## Contributing
_Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change_.  
  
Feel free to contact me through <noh24@ymail.com>.

## License
[MIT](./license.txt) License  
Copyright (c) _2022 Brian Noh_