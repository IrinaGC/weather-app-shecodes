//Date & Time

function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[currentDate.getMonth()];
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let actualDate = `${day}・${date} ${month}・${hours}:${minutes}`;

  return actualDate;
}
let now = new Date();
let weatherDate = document.querySelector("h6");
weatherDate.innerHTML = formatDate(now);


// Search Location with API

function changeLocation(response) {
  console.log(response.data)
  document.querySelector(
    "#city-weather"
  ).innerHTML = `${response.data.name}・${response.data.sys.country}`;

   celciusTemperature = response.data.main.temp;
   dayTemp = response.data.main.temp_max
  nightTemp = response.data.main.temp_min

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentState").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#day-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#night-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = response.data.weather[0].icon;
  document.querySelector("#current-location-icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  document.querySelector("#current-location-icon").setAttribute("alt", response.data.weather[0].description)
}

function search(city) {
  let apiKey = "b61c3c1367ef76f46df98ab48f24e246";
  let unit = ["metric", "imperial"];
  let apiWeather = "https://api.openweathermap.org/data/2.5/weather";
  let apiCity = `${apiWeather}?q=${city}&units=${unit[0]}&appid=${apiKey}`;
  axios.get(apiCity).then(changeLocation);
}

function getLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#input-location").value;
  search(city);
}

let newLocation = document.querySelector("#location-search-form");
newLocation.addEventListener("submit", getLocation);

// Button GPS location

function getTemparature(response) {
  document.querySelector(
    "#city-weather"
  ).innerHTML = `${response.data.name}・${response.data.sys.country}`;

  celciusTemperature = response.data.main.temp;
  dayTemp = response.data.main.temp_max
  nightTemp = response.data.main.temp_min

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentState").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#day-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#night-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = response.data.weather[0].icon;
  document.querySelector("#current-location-icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  document.querySelector("#current-location-icon").setAttribute("alt", response.data.weather[0].description)
}

function getGpsLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position.coords);
  let unit = ["metric", "imperial"];
  let apiKey = "b61c3c1367ef76f46df98ab48f24e246";
  let apiUrlEnd = "https://api.openweathermap.org/data/2.5/weather";
  let apiGpsWeather = `${apiUrlEnd}?lat=${lat}&lon=${lon}&units=${unit[0]}&appid=${apiKey}`;
  axios.get(apiGpsWeather).then(getTemparature);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGpsLocation);
}

let currentLocation = document.querySelector("#button-current-location");
currentLocation.addEventListener("click", getCurrentLocationWeather);

// C to F
function changeFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
 celcius.classList.remove("active");
 fahrenheit.classList.add("active");
 currentTemperature.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
  let day = document.querySelector("#day-temp");
  let night = document.querySelector("#night-temp");
  day.innerHTML = Math.round((dayTemp * 9) / 5 + 32);
  night.innerHTML = Math.round((nightTemp * 9) / 5 + 32);
}

function changeCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
  let day = document.querySelector("#day-temp");
  let night = document.querySelector("#night-temp");
  day.innerHTML = Math.round(dayTemp);
  night.innerHTML = Math.round(nightTemp);
}


let celciusTemperature = null;
let dayTemp = null;
let nightTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);


search("london");
