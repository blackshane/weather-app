var APIkey = '4db82ccb8ba6333d32b8c06c5e939250';
var city = document.getElementById('city-search');
var searchButton = document.getElementById('search-btn');
var weatherByCoorURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=38.81&lon=-90.69&units=imperial&appid=' + APIkey 
var locationByName ='http://api.openweathermap.org/geo/1.0/direct?q=O\'Fallon,MO,&limit=5&appid=' + APIkey
var searchBarCity = document.getElementById('search');
var searchHistoryList = document.getElementById('saved-cities');

searchButton.addEventListener('click', function () {
    renderWeatherDataForCity(city.value, true)
}); 


function getSearchHistory()  {
    // Type: Array
    let data = JSON.parse(localStorage.getItem('searchHistory'))
    if (!data) {
        return Array()
    }
    return data
}

searchHistoryList.onclick = function(e) {
    if (e.target.tagName != 'LI') return
    console.log(e.target.innerText)
    renderWeatherDataForCity(e.target.innerText, false);
}

function saveCityToSearchHistory() {
    var lastCity = city.value;
    let searchHistory = getSearchHistory()
    searchHistory.push(lastCity)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}


function renderCitySearchHistory() {
    var cities = getSearchHistory()
    searchHistoryList.innerHTML = ''
    for (var i = 0; i < cities.length; i ++ ){
        let city = cities[i]
        searchHistoryList.innerHTML += `<li> ${city} </li>`
    }
}


$(document).ready(function () {
    renderCitySearchHistory()
})


function renderWeatherDataForCity(cityText, saveToHistory) {

    locationByName = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityText + '&limit=5&appid=' + APIkey ;
    function convertToLatAndLon() {
        fetch(locationByName)
        .then(function(response){
            if (response.status !== 200) {
                return undefined
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            if (!data || data.length < 1)  {
                alert('Input is invalid.')
            }
            if (getSearchHistory().includes(city.value)) {
                console.log(`${city.value} already in history`)
                saveToHistory = false
            }
            if (saveToHistory) {
                saveCityToSearchHistory(city.value)
                renderCitySearchHistory()
            }

            const cityLat = data[0].lat;
            const cityLon = data[0].lon;          
            let weatherByCoorURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon +'&units=imperial&appid=' + APIkey;
            function runUpdatedLocation(){             
                                       
                fetch(weatherByCoorURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function (data) {
                    console.log(data);
                    // TEMPS
                    const temp = data.list[0].main.temp.toFixed(1)+ '°';
                    const currentCity = data.city.name;
                    const tomorrowTemp = data.list[6].main.temp.toFixed(1) + '°';
                    const twoDayTemp = data.list[14].main.temp.toFixed(1) + '°';
                    const threeDayTemp = data.list[22].main.temp.toFixed(1) + '°';
                    const fourDayTemp = data.list[30].main.temp.toFixed(1) + '°';
                    const fiveDayTemp = data.list[38].main.temp.toFixed(1) + '°';

                    document.getElementById('current-temp').textContent = temp;
                    document.getElementById('location').textContent = currentCity;
                    document.getElementById('next-day-temp').textContent = tomorrowTemp;
                    document.getElementById('two-day-temp').textContent = twoDayTemp
                    document.getElementById('three-day-temp').textContent = threeDayTemp;
                    document.getElementById('four-day-temp').textContent = fourDayTemp;
                    document.getElementById('five-day-temp').textContent = fiveDayTemp;
                    

                    // FORECAST- CLEAR, CLOUDS, RAIN
                    const currentForecast = data.list[0].weather[0].main;                    
                    const tomorrowForecast = data.list[6].weather[0].main;
                    const twoDayForecast = data.list[14].weather[0].main;
                    const threeDayForecast = data.list[22].weather[0].main;
                    const fourDayForecast = data.list[30].weather[0].main;
                    const fiveDayForecast = data.list[38].weather[0].main;
                    document.getElementById('current-sun').textContent = currentForecast;
                    document.getElementById('tomorrow-sun').textContent = tomorrowForecast;
                    document.getElementById('two-day-sun').textContent = twoDayForecast;
                    document.getElementById('three-day-sun').textContent = threeDayForecast;
                    document.getElementById('four-day-sun').textContent = fourDayForecast;
                    document.getElementById('five-day-sun').textContent = fiveDayForecast;

            

                    // DATES
                    var todaysDate = data.list[0].dt_txt;
                    var todaysDateRefined = todaysDate.substring(6,10);
                    var tomorrowDate = data.list[6].dt_txt;
                    var tomorrowDateRefined = tomorrowDate.substring(6,10);
                    var twoDayDate = data.list[14].dt_txt;
                    var twoDayDateRefined = twoDayDate.substring(6,10);
                    var threeDayDate = data.list[22].dt_txt;
                    var threeDayDateRefined = threeDayDate.substring(6,10);
                    var fourDayDate = data.list[30].dt_txt;
                    var fourDayDateRefined = fourDayDate.substring(6,10);
                    var fiveDayDate = data.list[38].dt_txt;
                    var fiveDayDateRefined = fiveDayDate.substring(6,10);
                
                    document.getElementById('current-date').textContent = todaysDateRefined;
                    document.getElementById('tomorrow-date').textContent = tomorrowDateRefined;
                    document.getElementById('two-day-date').textContent = twoDayDateRefined;
                    document.getElementById('three-day-date').textContent = threeDayDateRefined;
                    document.getElementById('four-day-date').textContent = fourDayDateRefined;                    
                    document.getElementById('five-day-date').textContent = fiveDayDateRefined;

                    // WIND SPEED
                    var todaysWind = 'Wind ' + data.list[0].wind.speed + ' MPH'; 
                    var tomorrowWind = data.list[6].wind.speed + ' MPH';
                    var twoDayWind = data.list[14].wind.speed + ' MPH';
                    var threeDayWind = data.list[22].wind.speed + ' MPH';
                    var fourDayWind = data.list[30].wind.speed + ' MPH';
                    var fiveDayWind = data.list[38].wind.speed + ' MPH';

                    document.getElementById('current-wind-speed').textContent = todaysWind;
                    document.getElementById('tomorrow-wind').textContent = tomorrowWind;
                    document.getElementById('two-day-wind').textContent = twoDayWind;
                    document.getElementById('three-day-wind').textContent = threeDayWind;
                    document.getElementById('four-day-wind').textContent = fourDayWind;
                    document.getElementById('five-day-wind').textContent = fiveDayWind;

                    // HUMIDITY
                    var todaysHumid = 'Humidity ' + data.list[0].main.humidity + '%';
                    var tomorrowHumid = data.list[6].main.humidity + '%';
                    var twoDayHumid = data.list[14].main.humidity + '%';
                    var threeDayHumid = data.list[22].main.humidity + '%';
                    var fourDayHumid = data.list[30].main.humidity + '%';
                    var fiveDayHumid = data.list[38].main.humidity + '%';

                    document.getElementById('current-humid').textContent = todaysHumid;
                    document.getElementById('tomorrow-humid').textContent = tomorrowHumid;
                    document.getElementById('two-day-humid').textContent = twoDayHumid;
                    document.getElementById('three-day-humid').textContent = threeDayHumid;
                    document.getElementById('four-day-humid').textContent = fourDayHumid;
                    document.getElementById('five-day-humid').textContent = fiveDayHumid;


                    // CURRENT ICON
                    var currentIcon = document.getElementById('current-icon')
                    if (currentForecast === 'Clear') {
                        currentIcon.src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";

                    } else if (currentForecast  === 'Clouds') {
                        currentIcon.src= 'https://cdn-icons-png.flaticon.com/512/14/14078.png';
                        
                    } else if (currentForecast === 'Rain') {
                        currentIcon.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgKW7PlV7Wzu6V-t1auS9lv6SdukxnUTQBmi5y3Y0deRhuXyOvHtWihxXzmm4wy8DVXw&usqp=CAU'
                    }

                    // TOMORROW ICON

                    var tomorrowIcon = document.getElementById('tomorrow-icon')
                    if (tomorrowForecast === 'Clear') {
                        tomorrowIcon.src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";

                    } else if (tomorrowForecast  === 'Clouds') {
                        tomorrowIcon.src= 'https://cdn-icons-png.flaticon.com/512/14/14078.png';
                        
                    } else if (tomorrowForecast === 'Rain') {
                        tomorrowIcon.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgKW7PlV7Wzu6V-t1auS9lv6SdukxnUTQBmi5y3Y0deRhuXyOvHtWihxXzmm4wy8DVXw&usqp=CAU'
                    }
                    
                    // TWO-DAY ICON
                    var twoDayIcon = document.getElementById('two-day-icon')
                    if (twoDayForecast === 'Clear') {
                        twoDayIcon.src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";

                    } else if (twoDayForecast  === 'Clouds') {
                        twoDayIcon.src= 'https://cdn-icons-png.flaticon.com/512/14/14078.png';
                        
                    } else if (twoDayForecast === 'Rain') {
                        twoDayIcon.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgKW7PlV7Wzu6V-t1auS9lv6SdukxnUTQBmi5y3Y0deRhuXyOvHtWihxXzmm4wy8DVXw&usqp=CAU'
                    }

                    // THREE-DAY ICON
                    var threeDayIcon = document.getElementById('three-day-icon')
                    if (threeDayForecast === 'Clear') {
                        threeDayIcon.src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";

                    } else if (threeDayForecast  === 'Clouds') {
                        threeDayIcon.src= 'https://cdn-icons-png.flaticon.com/512/14/14078.png';
                        
                    } else if (threeDayForecast === 'Rain') {
                        threeDayIcon.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgKW7PlV7Wzu6V-t1auS9lv6SdukxnUTQBmi5y3Y0deRhuXyOvHtWihxXzmm4wy8DVXw&usqp=CAU'
                    }

                    // FOUR-DAY ICON
                    var fourDayIcon = document.getElementById('four-day-icon')
                    if (fourDayForecast === 'Clear') {
                        fourDayIcon.src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";

                    } else if (fourDayForecast  === 'Clouds') {
                        fourDayIcon.src= 'https://cdn-icons-png.flaticon.com/512/14/14078.png';
                        
                    } else if (fourDayForecast === 'Rain') {
                        fourDayIcon.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgKW7PlV7Wzu6V-t1auS9lv6SdukxnUTQBmi5y3Y0deRhuXyOvHtWihxXzmm4wy8DVXw&usqp=CAU'
                    }

                    // FIV-DAY ICON
                    var fiveDayIcon = document.getElementById('five-day-icon')
                    if (fiveDayForecast === 'Clear') {
                        fiveDayIcon.src= "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";

                    } else if (fiveDayForecast  === 'Clouds') {
                        fiveDayIcon.src= 'https://cdn-icons-png.flaticon.com/512/14/14078.png';
                        
                    } else if (fiveDayForecast === 'Rain') {
                        fiveDayIcon.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgKW7PlV7Wzu6V-t1auS9lv6SdukxnUTQBmi5y3Y0deRhuXyOvHtWihxXzmm4wy8DVXw&usqp=CAU'
                    }       
                
                });           
                             
            }
          runUpdatedLocation()
       
        
    }
    )
    }  
    convertToLatAndLon();

}


    



// searchButton.addEventListener('click', getAPI)




// update "weatherByCoorURL" to work for city in search bar. 
// save past searches to local storage.  

//maybe use AppendChild for the list of previously saved cities? and create the list dynamically if local storage somehow can't achieve this. 