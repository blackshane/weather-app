var APIkey = '4db82ccb8ba6333d32b8c06c5e939250'
var city = document.getElementById('city-search')
var searchButton = document.getElementById('search-btn');
var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=38.81&lon=-90.69&units=imperial&appid=' + APIkey 
var coordByLocNameURL ='http://api.openweathermap.org/geo/1.0/direct?q=O\'Fallon,MO,&limit=5&appid=' + APIkey
var searchBarCity = document.getElementById('search');


searchButton.addEventListener('click', getDataFromSearch()) 

function getDataFromSearch() {
   
    var text = city.value;
    console.log('this is' + text);    
}

function convertToLatAndLon() {
    fetch(coordByLocNameURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        const cityLat = data[0].lat;
        console.log(cityLat);
        const cityLon = data[0].lon;
        console.log(cityLon);
        let weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon +'&units=imperial&appid=' + APIkey;
        function runUpdatedLocation(){
          
                console.log('get API running')
                fetch(weatherURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                console.log('Fetch Response \n-------------');
                console.log(data);
                const temp = data.list[0].main.temp.toFixed(1)+ '°';
                const currentCity = data.city.name;
                const tomorrowTemp = data.list[6].main.temp.toFixed(1) + '°';
                const twoDayTemp = data.list[14].main.temp.toFixed(1) + '°';
                const threeDayTemp = data.list[22].main.temp.toFixed(1) + '°';
                const fourDayTemp = data.list[30].main.temp.toFixed(1) + '°';
                const fiveDayTemp = data.list[38].main.temp.toFixed(1) + '°';
                const currentForecast = data.list[0].weather[0].main;
                const tomorrowForecast = data.list[6].weather[0].main;
                const twoDayForecast = data.list[14].weather[0].main;
                const threeDayForecast = data.list[22].weather[0].main;
                const fourDayForecast = data.list[30].weather[0].main;
                const fiveDayForecast = data.list[38].weather[0].main;
                document.getElementById('current-temp').textContent = temp;
                document.getElementById('location').textContent = currentCity;
                document.getElementById('next-day-forecast').textContent = tomorrowTemp;
                document.getElementById('two-day-forecast').textContent = twoDayTemp
                document.getElementById('three-day-forecast').textContent = threeDayTemp;
                document.getElementById('four-day-forecast').textContent = fourDayTemp;
                document.getElementById('five-day-forecast').textContent = fiveDayTemp;
                document.getElementById('current-sun').textContent = currentForecast;
                document.getElementById('tomorrow-sun').textContent = tomorrowForecast;
                document.getElementById('two-day-sun').textContent = tomorrowForecast;
                document.getElementById('three-day-sun').textContent = tomorrowForecast;
                document.getElementById('four-day-sun').textContent = tomorrowForecast;
                document.getElementById('five-day-sun').textContent = tomorrowForecast;
                
                console.log(currentForecast, tomorrowForecast, twoDayForecast, threeDayForecast, fourDayForecast, fiveDayForecast)
            });
        
                
      }
      runUpdatedLocation()
    
}
)
}  
    
convertToLatAndLon();


// searchButton.addEventListener('click', getAPI)




// update "weatherURL" to work for city in search bar. 
// save past searches to local storage.  

//maybe use AppendChild for the list of previously saved cities? and create the list dynamically if local storage somehow can't achieve this. 