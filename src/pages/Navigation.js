import React from "react";
import MapNavigation from "../widgets/Map-navigation";
import ButtonLeft from "./Button-left";

export default function Navigation() {
    return (
        <div className="navigation-container">
            <ButtonLeft/>
            <MapNavigation/>
        </div>
    )
}