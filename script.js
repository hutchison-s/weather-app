let weekBox = document.getElementById("weekForecast");
let currentBox = document.getElementById("current");
let url = "https://api.open-meteo.com/v1/forecast?latitude=38.8&longitude=-94.8&timezone=CST&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset&temperature_unit=fahrenheit";

const codeConverter = {
  0: {
    color: "#AAD3EE",
    desc: "Clear skies",
    image: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7816581/sun-clipart-md.png"
  },
  1: {
    color: "#78B8E3",
    desc: "Mainly clear",
    image: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7816581/sun-clipart-md.png"
  },
  2: "#9BC8E8",
  3: "#DDDFE3",
  45: "#E0F0F5",
  53: "#88A1FC",
  55: "#88A1FC",
  63: "#88A1FC",
  80: "#6081FB",
  81: "#6081FB",
  82: "#6081FB",
  95: "#A5A9B6"
}

const codeColors = {
  0: "#AAD3EE",
  1: "#78B8E3",
  2: "#9BC8E8",
  3: "#DDDFE3",
  45: "#E0F0F5",
  53: "#88A1FC",
  55: "#88A1FC",
  63: "#88A1FC",
  80: "#6081FB",
  81: "#6081FB",
  82: "#6081FB",
  95: "#A5A9B6"
}
const codeWords = {
  0: "Clear skies",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Light rain shower",
  81: "Rain showers",
  82: "Heavy rain shower",
  95: "Thunderstorms"
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function createDay({ day, maxTemp, minTemp, precipChance, code }) {
  let newDay = document.createElement("div");
  const [year, month, date] = day.split("-");
  let newDate = new Date(year, parseInt(month, 10) - 1, parseInt(date, 10));
  let dayOfWeek = weekDays[newDate.getDay()];
  newDay.classList.add("day");
  newDay.style.backgroundColor = codeColors[code]
  let dayDate = newDate.toDateString().split(" ");
  newDay.innerHTML = `
  <h1 class="dayName">${dayOfWeek}</h1>
  <p>${dayDate[1]} ${dayDate[2]}</p>
  
  <p class="dayConditions">${codeWords[code]}</p>
  <div class="dayDetails">
    <div>
      <h3>${Math.round(maxTemp)}&deg; F</h3>
      <h3>${Math.round(minTemp)}&deg; F</h3>
    </div>
    <div>
      <i class="fa-solid fa-droplet"></i>
      <p>${precipChance}%</p>
    </div>
  </div>
  `;
  if (code >= 53) {
    newDay.style.backgroundImage = `linear-gradient(to bottom, transparent, ${codeColors[code]}, ${codeColors[code]}), url('https://www.freeiconspng.com/uploads/water-drops-png-image--water-drops-png-image-23.png')`
  }
  return newDay;
}

function setTheme(is_day) {
  let root = document.querySelector(":root");
  let bg = (is_day > 0) ? "#ffffff" : "#000000";
  let fg = (is_day > 0) ? "#000000" : "#ffffff";
  let img = (is_day > 0) ? "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7816581/sun-clipart-md.png" : "https://www.pngmart.com/files/13/Crescent-Moon-PNG-Transparent.png";
  currentBox.style.background = `center / cover url("${img}") no-repeat`
  root.style.setProperty("--background", bg);
  root.style.setProperty("--foreground", fg);
}

function createWind(windspeed, winddirection) {
  let wind = document.createElement("div");
  wind.classList.add("windBox");
  let windSpeedChars = Math.round(parseInt(windspeed, 10) / 6);
  wind.innerHTML = `
    <div id="windPointer">${">".repeat(windSpeedChars)}</div>
  `;
  wind.style.transform = `rotate(${winddirection}deg) scale(1.6)`;
  return wind;
}

function setTime() {
  let newTime = new Date();
  let hour = newTime.getHours() % 12;
  hour == 0 ? hour = 12 : null;
  let min = newTime.getMinutes();
  min < 10 ? min = "0"+min : null;
  let amPM = newTime.getHours() >= 12 ? "PM" : "AM"
  return `${hour}:${min} ${amPM}`
}

function createCurrent({ temperature, windspeed, winddirection, weathercode, is_day, time }) {
  setTheme(is_day)
  
  let timeStamp = document.createElement("p");
  timeStamp.id = "currentTime";
  timeStamp.innerHTML = setTime()
  setInterval(()=>{
    timeStamp.innerHTML = setTime()
  }, 10000)
  
  let currentTemp = document.createElement("div");
  currentTemp.id = "currentTemp";
  currentTemp.innerHTML = `
    <h1>${Math.round(temperature)}&deg; F</h1>
  `;
  
  let cover = document.createElement("div");
  cover.id = "coverCurrent"
  
  let wind = createWind(windspeed, winddirection);
  
  let conditions = document.createElement("p");
  conditions.id = "currentConditions"
  conditions.innerHTML = codeWords[weathercode];
  return [cover, currentTemp, wind, conditions, timeStamp];
}

function newCloud() {
  let cloud = document.createElement("div")
cloud.classList.add("cloud");
cloud.style.setProperty("top", `${Math.floor(Math.random() * 40)}%`)
cloud.style.setProperty("left", `${Math.floor(Math.random() * 40)}%`)
cloud.style.animation = `drift 30s infinite ${Math.floor(Math.random() * 8)}s alternate`;
  cloud.innerHTML = `<img class="cloud" width="200px" src="https://www.freeiconspng.com/thumbs/rain-png/rain-clouds-png-27.png"/>`
  return cloud;
}

async function getWeather () {
  const weather = await fetch(url)
  const response = await weather.json()
  const days = [];
  for (let i=0; i<7; i++) {
    days.push({
      day: response.daily.time[i],
      maxTemp: response.daily.temperature_2m_max[i],
      minTemp: response.daily.temperature_2m_min[i],
      precipChance: response.daily.precipitation_probability_mean[i],
      code: response.daily.weathercode[i]
    })
  }
  days.forEach(day => {
    weekBox.appendChild(createDay(day))    
  })
  createCurrent(response.current_weather).forEach(x => currentBox.appendChild(x))
console.log(days)
}

getWeather();
setInterval(getWeather, 60000)
setTime();

