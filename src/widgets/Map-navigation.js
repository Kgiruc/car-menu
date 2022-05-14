
import React, {useEffect, useRef, useState} from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css"

export default function MapNavigation(){

    const mapElement = useRef()
    const [map,setMap] = useState({})
    const [longitude, setLongitude] = useState(-0.112869)
    const [latitude,setLatitude] = useState(51.504)
    const mapKey = "6LWNbmx2cA53NSsAKaFbgsqeWGAmBwj1";




    useEffect(() =>{
       const   map = tt.map ({
            key: mapKey,
            container: mapElement.current,
            center: [longitude, latitude],
           stylesVisibility:{
                trafficIncidents: true,
                trafficFlow: true,
           },
            zoom: 14
        })

         setMap(map)

        const addMarker =()=>{
            const popupOffset = {
                bottom: [0,-25]
            }
           const popup = new tt.Popup({offset: popupOffset}).setHTML('This is u')
           const element = document.createElement('div')
            element.className = 'marker'

            const marker = new tt.Marker({
               draggable: true,
               element: element,
           })
               .setLngLat([longitude, latitude])
               .addTo(map)

            marker.on('dragend', () =>{
                const lngLat = marker.getLngLat()
                setLongitude(lngLat.lng)
                setLatitude(lngLat.lat)
            })

            marker.setPopup(popup).togglePopup()
        }

        addMarker()

        return () => map.remove()
    }, [longitude, latitude])



    return (
        <>
        {map && <div className="map-container">
            <div ref={mapElement} className="map"/>
            <div className="search-bar">
            <h1>Where to?</h1>
                <input
                    type="text"
                    id="longitude"
                    className="longitude"
                    placeholder="longitude"
                    onChange ={(e) =>{setLongitude(e.target.value)}}
                />
                <input
                    type="text"
                    id="latitude"
                    className="latitude"
                    placeholder="latitude"
                    onChange ={(e) =>{setLatitude(e.target.value)}}
                />

            </div>
</div>}
    </>
    )

}

