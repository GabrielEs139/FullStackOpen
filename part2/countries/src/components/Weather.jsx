import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const Weather = ({cap}) => {
    const [weather, setWeather] = useState(null)
    

    useEffect(() => {
        weatherService
        .getWeather(cap)
          .then(wt => {
          setWeather(wt)
          console.log(weather);
          })
        }, 
      [])
    
    
    if(weather){
       
        return (<div>
                <h2> Weather in {cap}</h2>
                <p> Temperature {weather.main.temp} Celsius</p>
                <p> Weather: {weather.weather[0].main}</p>
                <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}></img>
                <p> Wind {weather.wind.speed} m/s</p>
            </div>)
    }
    return (<div>
                <h2> Weather in {cap}</h2>      
            </div>)
}

export default Weather