var APIkey = '4db82ccb8ba6333d32b8c06c5e939250'
var city = document.getElementById('city-search')
var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=38.81&lon=-90.69&units=imperial&appid=' + APIkey 
var coordByLocNameURL ='http://api.openweathermap.org/geo/1.0/direct?q=O\'Fallon,MO,&limit=5&appid=' + APIkey
var searchBarCity = document.getElementById('search');
var searchButton = document.getElementById('search-btn');



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
                const tomorrowForecast = data.list[6].main.temp.toFixed(1) + '°';
                const twoDayForecast = data.list[14].main.temp.toFixed(1) + '°';
                const threeDayForecast = data.list[22].main.temp.toFixed(1) + '°';
                const fourDayForecast = data.list[30].main.temp.toFixed(1) + '°';
                const fiveDayForecast = data.list[38].main.temp.toFixed(1) + '°';
                document.getElementById('current-temp').textContent = temp;
                document.getElementById('location').textContent = currentCity;
                document.getElementById('next-day-forecast').textContent = tomorrowForecast;
                document.getElementById('two-day-forecast').textContent = twoDayForecast
                document.getElementById('three-day-forecast').textContent = threeDayForecast;
                document.getElementById('four-day-forecast').textContent = fourDayForecast;
                document.getElementById('five-day-forecast').textContent = fiveDayForecast;
                
                console.log(temp)
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