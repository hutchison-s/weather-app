import './Spinner.css'

export default function Spinner () {
    return (
        <div className="currentWeather is_day loading">
            <div className="spinnerBox">
                <div className="bar" style={{animationDelay: '0s', background: 'rgba(100,0,100,0.3)'}}></div>
                <div className="bar" style={{animationDelay: '0.1s', background: 'rgba(0,0,100,0.3)'}}></div>
                <div className="bar" style={{animationDelay: '0.2s', background: 'rgba(100,0,50,0.3)'}}></div>
                <div className="bar" style={{animationDelay: '0.3s', background: 'rgba(50,0,100,0.3)'}}></div>
            </div>
        </div>
    )
}