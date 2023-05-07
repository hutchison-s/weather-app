import {PropTypes} from 'prop-types'

export default function ForecastSelector({isDaily, setIsDaily}) {
    return (
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
    )
}
ForecastSelector.propTypes = {
    isDaily: PropTypes.bool.isRequired,
    setIsDaily: PropTypes.func.isRequired
}