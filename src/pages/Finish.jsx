import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import mp3 from '../sound/BGM/Siddartha.mp3'
import './Finish.css'

export default function Finish() {
    const history = useHistory()
    const toHome = () => {
        history.push('/')
    }
    //     height: 200px;
    //   position: relative;
    return (
        <div className="container" style={{ height: "43rem", position: "relative" }}>
            <ReactAudioPlayer
                controls
                autoPlay
                src={mp3}
                loop
                style={{ display: "none" }}
            />
                <div className="d-flex justify-content-center" style={{marginTop: "12rem"}}>
                    <h1 style={{color: "white"}}>HISTORY RESULT:</h1>
                </div>
                <div className="d-flex justify-content-around align-items-center" style={{height: "10rem"}}>
                    <h4 style={{ color: "white" }}>Player 1 </h4>
                    <h3 style={{ color: "white" }}> 3 </h3>
                    <h2 style={{ color: "white" }}> - </h2>
                    <h3 style={{ color: "white" }}> 3 </h3>
                    <h4 style={{ color: "white" }}> Player 2</h4>
                </div>
                <div className="d-flex justify-content-center" >
                    <button className="buttonPlay" onClick={() => toHome()}>Play Again</button>
                </div>
        </div>
    )
}
