import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import socket from "../connection/socket";
import { useHistory } from "react-router-dom";

export default function CardRoom(props) {
  const { id, name, teamOne, teamTwo, status } = props.data;
  const history = useHistory();
// import React from "react";
// import { Card, Button } from "react-bootstrap";
// import socket from "../connection/socket"
// import {useHistory} from 'react-router-dom'

// export default function CardRoom(props) {
  const { id, name, players, status } = props.data
  const history = useHistory()


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
      <div className="d-flex justify-content-between">
        <div className="team-1">
          <span className="text-light">Team 1</span>
          {/* {teamOne.map((e) => (
            <div className="card player">
              <div className="card-body">{e}</div>
            </div>
          ))} */}
          <div className="card player">
            <div className="card-body">{teamOne[0]}</div>
          </div>
          <div className="card player">
            <div className="card-body">{teamOne[1]}</div>
          </div>
          <div className="card player">
            <div className="card-body">{teamOne[2]}</div>
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
          <div className="card player">
            <div className="card-body">{teamTwo[0]}</div>
          </div>
          <div className="card player">
            <div className="card-body">{teamTwo[1]}</div>
          </div>
          <div className="card player">
            <div className="card-body">{teamTwo[2]}</div>
          </div>
          <Button type="submit" className="nes-btn is-success mt-3 mr-3" onClick={() => handleJoinTeam('team2')}>
            Join
          </Button>
        </div>
      </div>
    </div>
      )
}
