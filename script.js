"use strict";
/// API FROM https://www.visualcrossing.com/
const API_KEY = "";
const weatherIcon = document.querySelector(".weather-icon");
const mainContainer = document.querySelector(".container");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(`.search-input`);

const showSearchBar = function () {
  mainContainer.classList.add("active");
  weatherIcon.style.cursor = "default";
  searchInput.focus();
};
const getWeatherData = async function (location) {
  await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}%2CUK?unitGroup=us&key=${API_KEY} `
  )
    .then((res) => res.json())
    .then((data) => showWeatherModal(data))
    .catch((error) => {
      alert("Wrong location :/");
    });
};
const showWeatherModal = function (data) {
  const address = data.address;
  const temperature = data.currentConditions.temp;
  const celciusTemperature = (temperature - 32) * (5 / 9);
  const humidity = data.currentConditions.humidity;
  const pressure = data.currentConditions.pressure;
  const wind = data.currentConditions.windgust;
  const description = data.description;
  console.log(data);
  mainContainer.innerHTML = `<div class="weather-container">
  <span class="location"> ${address[0].toUpperCase() + address.slice(1)}</span>
  <span class="location-description"
    >${description}</span
  >

  <div class="location-data">
      <div class="temperature">
          <ion-icon class="data-icon" name="thermometer-outline"></ion-icon>
          <span class="data">${celciusTemperature.toFixed(1)} °C</span>
      </div>
      <div class="humidity">
          <ion-icon  class="data-icon" name="water-outline"></ion-icon>
          <span class="data">${humidity} %</span>
      </div>
      <div class="pressure">
      <ion-icon class="data-icon" name="fitness-outline"></ion-icon>
      <span class="data">${pressure} hPa</span>
  </div>
  <div class="wind">
                  <svg xmlns="http://www.w3.org/2000/svg" class="data-icon icon icon-tabler icon-tabler-wind" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24"></path>
   <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24"></path>
   <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24"></path>
</svg>
                  <span class="data">${wind}km/h</span>
              </div>
  </div>
</div>`;
};

weatherIcon.addEventListener("click", showSearchBar);
searchContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  getWeatherData(location);
});
