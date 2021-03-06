import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import socket from "../connection/socket";
import { useHistory } from "react-router-dom";
import './cardRoom.css'

export default function CardRoom(props) {
  const { id, name, teamOne, teamTwo, status } = props.data;
  const history = useHistory();

  const handleJoinRoom = (id, name) => {
    let payload = {
      roomName: name,
      idRoom: id,
      username: localStorage.getItem("username"),
    };
    socket.emit("joinRoom", payload);
    history.push(`/room/${name}`);
  };

  const handleJoinTeam = (tim) => {
    let payload = {
      roomName: name,
      idRoom: id,
      username: localStorage.getItem("username"),
      team: tim === 'team1' ? "teamOne" : "teamTwo"
    };
    socket.emit("joinRoom", payload);
    history.push(`/room/${name}`);
  }

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">{name}</p>
      <div className="d-flex justify-content-around">
        <div className="team-1">
          <span className="text-light">Team 1</span>
          {/* {teamOne.map((e) => (
            <div className="card player">
              <div className="card-body">{e}</div>
            </div>
          ))} */}
          <div className="card">
            <div className="card-body" style={{padding: "0.5rem"}}>{teamOne[0]}</div>
          </div>
          <Button type="submit" className="nes-btn is-success mt-3 mr-3" onClick={() => handleJoinTeam('team1')}>
            Join
          </Button>
        </div>
        <div className="align-self-center">
          <span className="text-light">VS</span>
        </div>
        
        <div className="team-2">
          <span className="text-light">Team 2</span>
          {/* {teamTwo?.map((e) => (
            <div className="card player">
              <div className="card-body">{e}</div>
            </div>
          ))} */}
          <div className="card">
            <div className="card-body" style={{padding: "0.5rem"}}>{teamTwo[0]}</div>
          </div>
          <Button type="submit" className="nes-btn is-success mt-3 mr-3" onClick={() => handleJoinTeam('team2')}>
            Join
          </Button>
        </div>
      </div>
    </div>
      )
}



// .card.player {
//     width: 170px;
//     height: 64px;
//     margin-top: 10px;

// .card-body {
//   flex: 1 1 auto;
//   min-height: 1px;
//   padding: 1.25rem;