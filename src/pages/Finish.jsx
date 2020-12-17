import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import mp3 from '../sound/BGM/Siddartha.mp3'

function Finish() {
    const history = useHistory()
    const toHome = () => {
        history.push('/')
    }
    return (
        <div>
            <div style={{ position: "fixed", left: "0", right: "0", width: "1366px", height: "667px", zIndex: "10", backgroundImage: url("https://wallpaperaccess.com/full/17520.jpg")}}>
            <div className="container-fluid" style={{ height: "43rem", position: "relative" }}>
            <ReactAudioPlayer
                controls
                autoPlay
                src={mp3}
                loop
                style={{ display: "none" }}
            />
            <div className="d-flex justify-content-center" style={{ position: "absolute", top: "50%", left: "45%" }}>
                <button onClick={() => toHome()}>Play Again</button>
            </div>
        </div>
            </div>
        </div>
    )
}

export default Finish