import React from "react";
import {useNavigate} from "react-router-dom";

export default function ButtonRight(){
    let navigate = useNavigate();
    function handleClick() {
        navigate('/navigation');
    }
    return (
        <button className="navigation btn" onClick={handleClick}><span>navigation </span></button>);
}