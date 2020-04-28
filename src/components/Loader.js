import React from "react";
import logo from "../logo.svg";
import '../App.css';
import '../styles/loadingAnim.css'


function Loader() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="loading loading04">
                    <span>Ъ</span>
                    <span>Ъ</span>
                    <span>Ъ</span>
                    <span>Ъ</span>
                    <span>Ъ</span>
                    <span>Ъ</span>
                    <span>Ъ</span>
                </div>
            </div>
        </div>
    )
}

export default Loader;