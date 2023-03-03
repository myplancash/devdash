const util = require('util');
const weather = require('weather-js');

const findWeather = util.promisify(weather.find)

findWeather({ search: 'Nashville TN', degreeType: "F"})
.then(result => console.log(JSON.stringify(result, null, 2)))
.catch(error => console.error(error))
