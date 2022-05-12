import React, {useState} from "react";

export default function WeatherApp() {

    const apiKey = '2c53647046dd58ea69b179191f13dbb2';
    const [weatherData, setWeatherData] = useState([{}])
    const [city, setCity] = useState("")



    const getWeather = (event) => {
        if(event.key === 'Enter'){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
                .then(
                    response => response.json()
                ).then(
                data => {
                    setWeatherData(data);
                    setCity("")

                }
            )
        }
    }



    return (
        <div className="weather-container">
            <input className="weather-box" placeholder="Enter City"
                   onChange={e => setCity(e.target.value)}
                   value={city}
                   onKeyPress={getWeather}
            />


            {
                typeof weatherData.main === 'undefined' ? (
                <div>
                    <p>Enter ur localisation to get the weather</p>
                </div>

            ): (
                <div className="weather-data">
                    <p>{weatherData.name}</p>
                    <p>{Math.round((weatherData.main.temp -32)*5/9)}°C</p>
                    <p>{weatherData.weather[0].main}</p>
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather_icon"/>

                </div>
            )}

            {weatherData.cod === "404" ? (
                <p>City not found</p>
            )
                :(
                <>
                </>
            )}
        </div>
    )
}