import React, {useEffect, useRef, useState} from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";


export default function MapNavigation() {

    const mapElement = useRef()
    const [map, setMap] = useState({})
    const [longitude, setLongitude] = useState(18.638306)
    const [latitude, setLatitude] = useState(54.372158)
    const mapKey = "6LWNbmx2cA53NSsAKaFbgsqeWGAmBwj1";

    const convertToPoint = (lngLat) => {
        return {
            point: {
                latitude: lngLat.lat,
                longitude: lngLat.lng
            }
        }
    }

    const drawRoute = (geoJson, map) => {
        if (map.getLayer('route')) {
            map.removeLayer('route')
            map.removeSource('route')
        }
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geoJson
            },
            paint: {
                'line-color': '#4a90e2',
                'line-width': 7
            }
        })
    }


    const addGoalMarker = (lngLat, map) => {
        const element = document.createElement('div')
        element.className = 'marker-goal'
        new tt.Marker({
            element: element
        })
            .setLngLat(lngLat)
            .addTo(map)
    }

    useEffect(() => {

        const origin = {
            lng: longitude,
            lat: latitude,
        }
        const destination = []

        const map = tt.map({
            key: mapKey,
            container: mapElement.current,
            center: [longitude, latitude],
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true,
            },
            zoom: 14
        });

        setMap(map);

        const addMarker = () => {
            const popupOffset = {
                bottom: [0, -25]
            }
            const popup = new tt.Popup({offset: popupOffset}).setHTML('This is you :)<br>(tap point of goal)')
            const element = document.createElement('div')
            element.className = 'marker'

            const marker = new tt.Marker({
                draggable: true,
                element: element,
            })
                .setLngLat([longitude, latitude])
                .addTo(map)

            marker.on('dragend', () => {
                const lngLat = marker.getLngLat()
                setLongitude(lngLat.lng)
                setLatitude(lngLat.lat)
            })

            marker.setPopup(popup).togglePopup()
        }

        addMarker()


        const sortDestination = (location) => {
            const pointForDestination = location.map((destination) => {
                return convertToPoint(destination)
            })
            const callParameters = {
                key: mapKey,
                destinations: pointForDestination,
                origins: [convertToPoint(origin)],

            }
            return new Promise((resolve, reject) => {
                ttapi.services
                    .matrixRouting(callParameters)
                    .then((matrixApiResult) => {
                        const results = matrixApiResult.matrix[0]
                        const resultsArray = results.map((result, index) => {
                            return {
                                location: location[index],
                                drivingTime: result.response.travelTimeInSeconds,
                            }
                        })
                        resultsArray.sort((a, b) => {
                            return a.drivingTime - b.drivingTime
                        })

                        const sortedLocations = resultsArray.map((result) => {
                            return result.location
                        })
                        resolve(sortedLocations)
                    })
            })
        }


        const recalculeteRoutes = () => {
            sortDestination(destination).then((sorted) => {
                sorted.unshift(origin)

                ttapi.services
                    .calculateRoute({
                        key: mapKey,
                        locations: sorted,
                    })
                    .then((routeData) => {
                        const geoJson = routeData.toGeoJson()
                        drawRoute(geoJson, map)
                    })
            })
        }


        map.on("click", (e) => {
            destination.push(e.lngLat)
            addGoalMarker(e.lngLat, map)
            recalculeteRoutes()
        })

        return () => map.remove()
    }, [longitude, latitude])


    return (
        <>
            {map && <div className="map-container">
                <div ref={mapElement} className="map"/>
                <div className="search-bar__navigation">
                    <h1 className="inscription">Where to start?</h1>
                    <input
                        type="text"
                        id="longitude"
                        className="longitude bar__navigation"
                        placeholder="longitude"
                        onChange={(e) => {
                            setLongitude(e.target.value)
                        }}
                    />
                    <input
                        type="text"
                        id="latitude"
                        className="latitude bar__navigation"
                        placeholder="latitude"
                        onChange={(e) => {
                            setLatitude(e.target.value)
                        }}
                    />

                </div>
            </div>}
        </>
    )

}

