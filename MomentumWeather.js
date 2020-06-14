const COORDS = 'coords';
const API_KEY ='d9cc910ed347de43734947b6b42f0913';
const weather = document.querySelector(".js-weather");
function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText =`${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeosucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude:latitude,
        longitude :longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log('cant access geo location');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeosucces, handleGeoError)
}
function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();