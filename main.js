var search=document.getElementById('search_button');
const API_key = "bcd89a6f9b78aec6b86d7f6dc4ec2ed5";
var base_url = "https://api.openweathermap.org/data/2.5/weather?";

function getCurrentWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            const lat=position.coords.latitude;
            const lon=position.coords.longitude;
            fetchWeather(lat,lon);
        
        },showError);
    }
    else{
        alert("Geolocation is not supported by this browser");  
    }
}

function getLocWeather(loc){
    // var loc="bihar";
    const url=`${base_url}units=metric&q=${loc}&appid=${API_key}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        loc =data.name;
        cont =data.sys.country;
        tem =data.main.temp;
        fel =data.main.feels_like;

        var location = document.getElementById('text_location');
        var country = document.getElementById('text_county_location');
        var temp = document.getElementById('text_temp');
        var feel = document.getElementById('text_feelslike');

        location.innerHTML = loc;
        country.innerHTML = cont;
        temp.innerHTML = tem;
        feel.innerHTML = fel;
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function fetchWeather(lat,lon){
    const url=`${base_url}lat=${lat}&lon=${lon}&units=metric&appid=${API_key}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        loc =data.name;
        cont =data.sys.country;
        tem =data.main.temp;
        fel =data.main.feels_like;
        // iconId=data.weather[0].icon;
        // const iconUrl = `https://openweathermap.org/img/wn/${iconId}@5x.png`; // Use @2x for sharper icons

        var location = document.getElementById('text_location');
        var country = document.getElementById('text_county_location');
        var temp = document.getElementById('text_temp');
        var feel = document.getElementById('text_feelslike');
        var i=document.getElementById('main-icon');

        location.innerHTML = loc;
        country.innerHTML = cont;
        temp.innerHTML = tem;
        feel.innerHTML = fel;
        
        // const weatherIcon = document.getElementById('weather-icon').querySelector('img');
        // weatherIcon.src = iconUrl;
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });
}


getCurrentWeather();

document.getElementById('search_button').addEventListener('click', function() {
    const location = document.getElementById('search_input').value;
    if (location) {
        getLocWeather(location);
    }
});