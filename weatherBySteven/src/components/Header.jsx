import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import {PropTypes} from 'prop-types'

export default function Header ({location, setLocation}) {

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 3600000,
  };

    async function success(pos) {
        try {
          const coords = await pos.coords;
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

    function error(err) {
      alert("Unable to access device location. Continue viewing weather by Zip Code or change browser settings to allow location sharing.")
    }

      
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(success, error, options)
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
            form.blur();
            document.body.style.zoom = 1.0;
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

    return (
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
                    navigator.geolocation.getCurrentPosition(success, error, options)
            }}/>
        </header>
    )
}

Header.propTypes = {
    location: PropTypes.object.isRequired,
    setLocation: PropTypes.func.isRequired
}