"use strict";
/// API FROM https://www.visualcrossing.com/
const API_KEY = "YLE8ZUKY3PMKBS3EUF6CXFWPX";
const weatherIcon = document.querySelector(".weather-icon");
const mainContainer = document.querySelector(".container");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(`.search-input`);

const showSearchBar = function () {
  mainContainer.classList.add("active");
  weatherIcon.style.cursor = "default";
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
  const celciusTemperature = ((temperature - 32) * (5 / 9))
  const humidity = data.currentConditions.humidity;
  const description = data.description;
console.log(data);
  mainContainer.innerHTML=`<div class="weather-container">
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
          <ion-icon  class="data-icon" name="umbrella-outline"></ion-icon>
          <span class="data">${humidity} %</span>
      </div>
  </div>
</div>`
};

weatherIcon.addEventListener("click", showSearchBar);
searchContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  getWeatherData(location);
});
