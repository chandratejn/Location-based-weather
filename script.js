const getLocationBtn = document.getElementById("location");
const removeLocationBtn = document.getElementById("remove");
const mapDiv = document.getElementById("map");
const getLatitude = document.getElementById("latitude");
const getLongitude = document.getElementById("longitude");


function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    mapDiv.innerHTML = "Geolocation is not supported by this browser.";
  }


}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  localStorage.setItem("lat", latitude);
  localStorage.setItem("long", longitude);
  getLatitude.textContent = `Your Current Latitude : ${position.coords.latitude}`;
  getLongitude.textContent = `Your Current Longitude : ${position.coords.longitude}`;
 
  displayMap(latitude,longitude);
  getLocationBtn.style.display = "none";
  removeLocationBtn.style.display = "block";
  getWeatherData(latitude, longitude); // Call getWeatherData with the latitude and longitude
}

function displayMap(latitude,longitude) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
  // mapDiv.innerHTML = `<iframe src="${mapUrl}" alt="Map" height="500" width="1000" > </iframe>`;
  mapDiv.setAttribute("src", mapUrl);
}

function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLocationBtn.style.display = "block";
  removeLocationBtn.style.display = "none";
  getLatitude.textContent = ``;
  getLongitude.textContent = ``;
  mapDiv.setAttribute("src", "");
  document.getElementById('lati').textContent = "";
  document.getElementById('lon').textContent = "";
  document.getElementById('location-container').textContent = "";
  document.getElementById('wind-speed').textContent = "";
  document.getElementById('pressure').textContent = "";
  document.getElementById('humidity').textContent = "";
  document.getElementById('wind-direction').textContent = "";
  document.getElementById('uv-index').textContent = "";
  document.getElementById('feels-like').textContent = "";
}

// Check if lat and long already exist in local storage
const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");
if (lat && long) {
  displayMap(lat, long);
  removeLocationBtn.disabled = false;
  getWeatherData(lat, long); // Call getWeatherData with the latitude and longitude

}


function getWeatherData(lat, long) {
  // const apikey = 'bb60449b493a034cb960d094c1154516'; // Replace with your API key
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=6361d95b3f05fe05e5f2bb8110e975f2`;


  // Make a GET request to the API URL using fetch() or any other HTTP library
  // and parse the JSON response to get the weather data
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Extract the weather data from the JSON response and display it in the UI
    const lati = lat;
    const longi = long;
    const location = data.timezone;
    const windSpeed = data.current.wind_speed;
    const pressure = data.current.pressure;
    const humidity = data.current.humidity;
    const windDirection = data.current.wind_deg;
    const uvIndex = data.current.uvi;
    const feelsLike = data.current.feels_like;
    
    // Display the weather data in the UI using document.getElementById(), console.log(), or any other method

     // Display the weather data in the UI using document.getElementById(), console.log(), or any other method

     document.getElementById('lati').textContent = lati;
     document.getElementById('lon').textContent = longi;
     document.getElementById('location-container').textContent = location;
     document.getElementById('wind-speed').textContent = windSpeed;
     document.getElementById('pressure').textContent = pressure;
     document.getElementById('humidity').textContent = humidity;
     document.getElementById('wind-direction').textContent = windDirection;
     document.getElementById('uv-index').textContent = uvIndex;
     document.getElementById('feels-like').textContent = feelsLike;
  })
  .catch(error => console.error(error));
}

