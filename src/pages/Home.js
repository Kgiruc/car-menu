import React  from "react";
import WeatherApp from "../widgets/Weather-app";
import Clockdata from "../widgets/Clockdata";


export default function Home() {
return(
    <div className="home-container">
        <WeatherApp/>
        <Clockdata/>
    </div>
    )
}