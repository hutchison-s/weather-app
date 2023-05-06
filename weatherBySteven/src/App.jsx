import {useState, useEffect } from 'react'
import codeConverter from './codeConverter'
import DayForecast from './components/DayForecast.jsx';

function App() {
  const [daysData, setDaysData] = useState([]);
  const [hoursData, setHoursData] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [isDay, setIsDay] = useState(null);

  let dailyUrl = "https://api.open-meteo.com/v1/forecast?latitude=38.8&longitude=-94.8&timezone=CST&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset&temperature_unit=fahrenheit";
  let hourlyUrl = "https://api.open-meteo.com/v1/forecast?latitude=38.8&longitude=-94.8&timezone=CST&hourly=temperature_2m,precipitation_probability,is_day&temperature_unit=fahrenheit";

  function convertDateToObject(day) {
    const [year, month, date] = day.split("-");
    let newDate = new Date(year, parseInt(month, 10) - 1, parseInt(date, 10));
    let dayOfWeek = weekDays[newDate.getDay()];
    const dayDate = newDate.toDateString().split(" ");
    return {
      dayOfWeek: dayOfWeek,
      dateString: dayDate
    }
  }

  function convertPrecipChance(percent, code) {
    let chanceWord;
    switch (true) {
      case (percent <= 55 && percent >= 30 && code > 50):
        chanceWord = "Chance of ";
        break;
      case (percent < 30 && code > 50):
        chanceWord = "Possible ";
        break;
      default:
        chanceWord = ""
    }
    return {
      percent: percent,
      chanceWord: chanceWord
    }
  }
  async function getHourlyWeather () {
    const weather = await fetch(hourlyUrl)
    const response = await weather.json()
    const hours = [];
    for (let i=0; i<16; i++) {
      hours.push({
        time: response.hourly.time[i],
        temp: response.hourly.temperature_2m[i],
        precipChance: response.hourly.precipitation_probability[i]
      })
    }
    setHoursData(hours)
  }

  async function getDailyWeather () {
    const weather = await fetch(dailyUrl)
    const response = await weather.json()
    const days = [];
    for (let i=0; i<7; i++) {
      days.push({
        date: convertDateToObject(response.daily.time[i]),
        temps: {
          max: parseInt(response.daily.temperature_2m_max[i], 10),
          min: parseInt(response.daily.temperature_2m_min[i], 10),
        },
        precipChance: convertPrecipChance(response.daily.precipitation_probability_mean[i], response.daily.weathercode[i]),
        code: codeConverter(response.daily.weathercode[i])
      })
    }
    setDaysData(days);
    setCurrentData(response.current_weather.temperature);
    setIsDay(response.current_weather.is_day)
  }

  useEffect(()=>{
    getDailyWeather()
    getHourlyWeather()
    console.log("weather data updated")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDaily])

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return (
    <div className='App'>
      <div className={`${isDay && "isDay"} currentWeather`} >
        <h1 className='currentTemp'>{parseInt(currentData, 10)}&deg; F</h1>
      </div>
      <div className='forecastChoice'>
        <label htmlFor='daily'>
          Daily
          <input 
            type='radio' 
            id='daily' 
            name='forecastRadio' 
            value='daily'
            style={{display: "none"}}
            checked={isDaily}
            onChange={() => {setIsDaily(!isDaily)}}/>
        </label>
        <label htmlFor='hourly'>
          Hourly
          <input 
            type='radio' 
            id='hourly' 
            name='forecastRadio' 
            value='hourly' 
            style={{display: "none"}}
            checked={!isDaily}
            onChange={() => {setIsDaily(!isDaily)}}/>
        </label>
        
      </div>
      <div className='forecast'>
        {isDaily 
          ? daysData.map(day => (
              <DayForecast key={day.date.dateString.join("")} day={day} />
            ))
          : hoursData 
              ? <div style={{backgroundColor: 'darkcyan', textAlign: 'center', width: '100%', display: "flex", color: '#fff', height: '100%', position: 'relative'}}>
                  {hoursData.map(hour => (
                    <div 
                      key={hour.time}
                      style={{height: '100%', flex: '0 0 20%'}}>
                      <h4>
                          {hour.time.split("T")[1]}
                      </h4>
                      <div 
                        style={{marginTop: `${(120-hour.temp)}%`}}>
                        {parseInt(hour.temp, 10)}&deg;
                      </div>
                      <div>
                        {hour.precipChance}%
                      </div>
                    </div>
                  ))}
                </div>
              : <div style={{display: 'grid', placeItems: "center", color: "white", width: '100%'}}>
            </div>
        }
      </div>
    </div>
  )
}

export default App
