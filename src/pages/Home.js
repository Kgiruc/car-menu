import React  from "react";
import WeatherApp from "../widgets/Weather-app";
import Clockdata from "../widgets/Clockdata";
import ButtonRight from "./Button-right";



export default function Home() {
return(
    <>
    <div className="home-container">
        <WeatherApp/>
        <Clockdata/>
    </div>
        <ButtonRight/>
    </>
    )
}