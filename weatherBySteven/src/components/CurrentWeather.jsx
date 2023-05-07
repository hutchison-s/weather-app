import {PropTypes} from 'prop-types'
import { timeToDateObject } from '../converterFuncs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

export default function CurrentWeather({sunrise, sunset, currentData, currentTime}) {
    let bgClass;
    let sunriseHour = sunrise.getHours();
    let sunsetHour = sunset.getHours();
    let currentHour = timeToDateObject(currentData.time).getHours();
    switch (true) {
        case (currentHour === sunriseHour || currentHour === sunsetHour):
            bgClass = "is_duskdawn";
            break;
        case (currentData.is_day > 0):
            bgClass = "is_day"
            break;
        default:
            bgClass = "is_night"
    }

    return (
        <div className={`${bgClass} currentWeather`} >
            <h1 id='currentTemp'>{parseInt(currentData.temperature, 10)}&deg; F</h1>
            <small id='currentTime'>{currentTime}</small>
            <div 
                id='windBox' 
                style={{
                    transform: `scale(${8 / currentData.windspeed}) rotate(${currentData.winddirection}deg)`,
                    color: currentData.is_day > 1 ? "var(--darkBlue)" : "skyblue"}}>
                <FontAwesomeIcon icon={faLocationArrow} id="windPointer" />
            </div>
        </div>
    )
}

CurrentWeather.propTypes = {
    sunrise: PropTypes.object.isRequired,
    sunset: PropTypes.object.isRequired,
    currentData: PropTypes.object.isRequired,
    currentTime: PropTypes.string.isRequired
}