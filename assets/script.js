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
                fetch(weatherURL) //need to be able to search not just my weather
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                console.log('Fetch Response \n-------------');
                console.log(data);
                const temp = data.list[0].main.temp;
                const currentCity = data.city.name;
                document.getElementById('current-temp').textContent = temp;
                document.getElementById('location').textContent = currentCity;
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
// display data in correct fields. 

// need to take var = {} and put that variable in the url search for lat and log