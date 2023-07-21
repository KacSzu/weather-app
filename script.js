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
};
const getWeatherData = async function (location) {
  await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}%2CUK?unitGroup=us&key=${API_KEY} `
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      alert("Wrong location :/");
    });
};
const showWeatherModal = function (e, data) {
  e.preventDefault();
  const location = searchInput.value;
  getWeatherData(location);
  searchInput.value = "";
};

weatherIcon.addEventListener("click", showSearchBar);
searchContainer.addEventListener("submit", showWeatherModal);
