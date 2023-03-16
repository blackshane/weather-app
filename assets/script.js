var APIkey = '4db82ccb8ba6333d32b8c06c5e939250'
var city;
var weatherURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
var coordByLocNameURL ='http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'