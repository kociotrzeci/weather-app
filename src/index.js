import "./styles.scss";

async function getWeather() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=9c92d6dad9d248ab8e5150106241603&q=${input.value}` //i know I shoudnt
  );
  weatherInfo = await response.json();
  console.log(weatherInfo);
  displayWeather();
}

async function getImage(prompt) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=Mx4JFbLmysBu1d0vMQ7c3dG2akarPFO6&s=${prompt}`, //i know I shoudnt
    { mode: "cors" }
  );
  const json = await response.json();
  console.log(json);
  return json.data.images.original.url;
}

function displayWeather() {
  city.textContent = weatherInfo.location.name;
  temperature.textContent = "Temperature: " + weatherInfo.current.temp_c + "°C";
  wind.textContent = "Wind: " + weatherInfo.current.wind_kph + " km/h";
  container.classList.remove("hidden");
  getImage(weatherInfo.current.condition.text).then((response) => {
    img.src = response;
  });
}

const container = document.querySelector(".content");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const img = document.querySelector("img");
let weatherInfo;
const input = document.querySelector("input");
const button = document.querySelector("button");
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});
button.addEventListener("click", getWeather);
