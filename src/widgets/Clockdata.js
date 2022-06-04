import React, {useEffect, useState} from "react";

export default function Clockdata(){
    const [clockState,setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            setClockState(date.toLocaleTimeString())
        },1000)
    },[])

    return(
        <div className="clock-container container">
         <div className="clock">{clockState}</div>
        </div>
    )
}