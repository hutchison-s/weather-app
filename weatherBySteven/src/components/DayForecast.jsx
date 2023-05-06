import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'

export default function DayForecast({ day }) {
    return (
        <div 
          className="dayForecast" 
          key={day.date.dateString.join("")}
          data-image={day.code.image}>
            <h1 className="dayName">{day.date.dayOfWeek}</h1>
            <p className='dayDate'>{day.date.dateString[1]} {day.date.dateString[2]}</p>
            
            <div className="dayDetails">
              <p className="dayConditions">{day.precipChance.chanceWord} {day.code.desc}</p>
              <div>
                <h3 style={{background: "#ab080855", padding: "0 5px"}}>{day.temps.max}&deg; F</h3>
                <h3 style={{background: "#0877ab55", padding: "0 5px"}}>{day.temps.min}&deg; F</h3>
              </div>
              <div>
                <FontAwesomeIcon icon={faDroplet} />
                <p>{day.precipChance.percent}%</p>
              </div>
            </div>
          </div>
    )
}

DayForecast.propTypes = {
    day: PropTypes.object.isRequired
}