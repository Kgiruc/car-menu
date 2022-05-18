import React from "react";
import {useNavigate} from "react-router-dom";

export default function ButtonLeft(){
    let navigate = useNavigate();
    function handleClick() {
        navigate('/');
    }
    return (
        <button className="navigation btn" onClick={handleClick}><span>Home </span></button>);
}