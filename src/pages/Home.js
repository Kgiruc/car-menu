import React, {useState} from "react";
import WeatherApp from "../widgets/Weather-app";
import Clockdata from "../widgets/clockdata";


export default function Home() {
return(
    <>
        <WeatherApp/>
        <Clockdata/>
    </>
    )
}