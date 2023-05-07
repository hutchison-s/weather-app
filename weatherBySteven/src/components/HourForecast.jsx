import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import {timeString, timeToDateObject} from '../converterFuncs'

export default function HourForecast({ hour }) {
    let nightDay = 
      (timeToDateObject(hour.time).getHours() > 6 && timeToDateObject(hour.time).getHours() < 21)
        ? './public/clear.png'
        : './public/night.png'
    let bgImage = `
      linear-gradient(transparent, ${hour.color}),
      radial-gradient(rgba(100,100,200,0.5), rgba(0,0,0,0.8)),
      url(${nightDay})`;

    return (
      <div 
        key={hour.time}
        className='hourForecast'
        style={{backgroundImage: bgImage}}>
        <h4 className='hourTime'>
            {timeString(timeToDateObject(hour.time))}
        </h4>
        <div className='hourTemp'>
          <div 
            style={{
              position: 'absolute', 
              top:`${(100-hour.temp)}%`,
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
            {parseInt(hour.temp, 10)}&deg;F
          </div>
        </div>
        <div className='hourPrecip'>
          <FontAwesomeIcon icon={faDroplet} />
          &nbsp;
          {hour.precipChance}%
        </div>
    </div>
    )
}

HourForecast.propTypes = {
    hour: PropTypes.object.isRequired
}