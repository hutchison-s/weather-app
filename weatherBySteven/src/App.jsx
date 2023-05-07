import {useState, useEffect } from 'react'
import codeConverter from './codeConverter'
import CurrentWeather from './components/CurrentWeather';
import DayForecast from './components/DayForecast.jsx';
import ForecastSelector from './components/ForecastSelector';
import HourForecast from './components/HourForecast';
import Spinner from './components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import {timeString, convertDateToObject, convertPrecipChance, timeToDateObject} from './converterFuncs'

const prevLocation = JSON.parse(localStorage.getItem("weatherLocation")) || {zip: 66203, longitude: "-94.8", latitude: "38.8"};

function App() {
  const [daysData, setDaysData] = useState([]);
  const [hoursData, setHoursData] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [currentTime, setCurrentTime] = useState(timeString(new Date()));
  const [location, setLocation] = useState(prevLocation)

async function setCurrentLocation(thing) {
  try {
    const coords = await thing.coords;
    setLocation({
      zip: "Your Location",
      latitude: await coords.latitude,
      longitude: await coords.longitude,
    })
    localStorage.setItem("weatherLocation", JSON.stringify(location))
  } catch(err) {
    null
  }
  
}

useEffect(()=>{
  setCurrentLocation(navigator.geolocation.getCurrentPosition(setCurrentLocation))
}, [])

  function changeLocation(e) {
    e.preventDefault();
    let form = document.getElementById("zipChange");
    fetch(`https://www.zippopotam.us/us/${form.value}`)
      .then(result => result.json())
      .then(json => {
        let longitude = json.places[0].longitude;
        let latitude = json.places[0].latitude;
        setLocation({
          longitude: longitude,
          latitude: latitude,
          zip: form.value,
          city: json.places[0]["place name"]+", "+json.places[0]["state abbreviation"]
        })
        form.value = "";
        form.blur()
        localStorage.setItem("weatherLocation", JSON.stringify(location))
      })
      .catch(err => {
        console.log(err)
        form.value = "";
        document.querySelector("#zipChange~label").innerHTML = "No Match Found"
        setTimeout(()=>{
          form.blur()
        }, 1000)
        setTimeout(()=>{
          document.querySelector("#zipChange~label").innerHTML = "Get Weather By Zip Code";
        }, 1600)
      })
    
  }

  async function getHourlyWeather () {
    let hourlyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&timezone=CST&hourly=temperature_2m,precipitation_probability,is_day&temperature_unit=fahrenheit`;
    const weather = await fetch(hourlyUrl)
    const response = await weather.json()
    const hours = [];
    let currentHour = new Date().getHours();
    let precipChance = idx => response.hourly.precipitation_probability[idx]
    for (let i=currentHour; i<24+currentHour; i++) {
      hours.push({
        time: response.hourly.time[i],
        temp: response.hourly.temperature_2m[i],
        precipChance: precipChance(i),
        color: `rgb(${10 - (precipChance(i) * -1)}, 20, ${precipChance(i) * 2})`
      })
    }
    setHoursData(hours)
  }

  async function getDailyWeather () {
    let dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&timezone=CST&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset&temperature_unit=fahrenheit`;
    const weather = await fetch(dailyUrl)
    const response = await weather.json()
    const days = [];
    for (let i=0; i<7; i++) {
      days.push({
        date: convertDateToObject(response.daily.time[i]),
        sunrise: response.daily.sunrise[i],
        sunset: response.daily.sunset[i],
        temps: {
          max: parseInt(response.daily.temperature_2m_max[i], 10),
          min: parseInt(response.daily.temperature_2m_min[i], 10),
        },
        precipChance: convertPrecipChance(response.daily.precipitation_probability_mean[i], response.daily.weathercode[i]),
        code: codeConverter(response.daily.weathercode[i])
      })
    }
    setDaysData(days);
    setCurrentData(response.current_weather);
  }

  useEffect(()=>{
    getDailyWeather()
    getHourlyWeather()
    setCurrentTime(timeString(new Date()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDaily, location])  

  return (
    <>
    <header id='appHeader'>
        <div id='logoBox'>WBS
          <img id='logo' src='./logo.png'/>
        </div>
        <form onSubmit={changeLocation}>
          <input type='text' id='zipChange' pattern='\d*' maxLength='5' minLength='5' placeholder={`Weather for ${location.zip}`}/>
          <label onClick={changeLocation} htmlFor='zipChange'>Get Weather by Zip Code</label>
        </form>
        <FontAwesomeIcon 
          icon={faLocationCrosshairs} 
          id='crosshairs' 
          onClick={()=>{
            setCurrentLocation(navigator.geolocation.getCurrentPosition(setCurrentLocation))
        }}/>
      </header>
    <div className='App'>
      {daysData.length > 0
        ? <CurrentWeather 
        sunrise={timeToDateObject(daysData[0].sunrise)} 
        sunset={timeToDateObject(daysData[0].sunset)} 
        currentData={currentData} currentTime={currentTime}/>
        : <Spinner />
      }
      
      <small id='currentLocation'>
        {location.zip.length > 5 ? location.zip : location.city}
      </small>
      <ForecastSelector isDaily={isDaily} setIsDaily={setIsDaily} />
      <div className='forecast'>
        {isDaily 
          ? daysData.length > 0
              ? daysData.map(day => (
                <DayForecast key={day.date.dateString.join("")} day={day} />
              ))
              : <Spinner />
          : hoursData 
              ? hoursData.map(hour => (
                  <HourForecast key={hour.time} hour={hour}/>
                ))
              : <div style={{display: 'grid', placeItems: "center", color: "white", width: '100%'}}>
            </div>
        }
      </div>
      <p id='credit'>Powered by Open-Meteo.com</p>
    </div>
    </>
  )
}

export default App
