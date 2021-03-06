import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import socket from "../connection/socket";
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from "uuid";
// import { SET_PLAYERS } from '../store/actions/socket'
import "../App.css";
import img from '../assets/coollogo_com-18909269.png'
import '../Home.css'
import mp3 from '../sound/BGM/Star Wars Battle Theme FULL.mp3'
import ReactAudioPlayer from 'react-audio-player'
// export default function Home() {
//   return (
//     <div className="mainpage">
//       <div className="nes-field">
//         <label for="name_field">Your name</label>
//         <input type="text" id="name_field" className="nes-input" />
//       </div>
//       <button
//         type="button"
//         className="nes-btn is-success"
//         style={{ width: 200 }}
//       >
//         Start
//       </button>
//     </div>


export default function Home() {
  // console.log(socket)
  const history = useHistory();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    let id = uuidv4()
    localStorage.setItem("username", username);
    localStorage.setItem("id", id);
    history.push("/lobby")
    const data = {
      username, id
    }
    // socket.emit("login", username);
    dispatch({ type: 'server/players', data });
    // dispatch(SET_PLAYERS)
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  // <video src={videoSource} ref={videoPlayer} onLoadedData={() => videoPlayer.current.play()}/>

  return (
    <div className="container mb-5 mt-5">
      <ReactAudioPlayer 
        controls
        autoPlay
        src={mp3}
        loop
        style={{ display: "none"}}
      />
      <div className="d-flex justify-content-center">
        <img src={img} className="mt-5 mb-5" style={{ justifyContent: "center", width: "90%" }} alt="" />
      </div>
      <form onSubmit={handleLogin} className="form mt-5">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="input your name"
            onChange={handleUsername}
            style={{ alignItems: "center", width: "25rem", textAlign: "center" }}
          /> <br />
          <div className="button">
            <button style={{ alignItems: "center" }} type="submit">Submit</button>

          </div>
        </div>
      </form>
    </div>
  );
}
