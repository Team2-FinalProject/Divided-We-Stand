import React from "react";
import { Card, Button } from "react-bootstrap";
import socket from "../connection/socket"
import {useHistory} from 'react-router-dom'

export default function CardRoom(props) {
  const { id, name, players, status } = props.data
  const history = useHistory()

  const handleJoinRoom = (id, name) => {
    let payload = {
      roomName: name,
      idRoom: id,
      username: localStorage.getItem("username"),
    };
    socket.emit("joinRoom", payload)
    history.push(`/room/${name}`)
  };

  return (
    <Card>
      {JSON.stringify(props.data)}
      <Card.Title>{name}</Card.Title>
      <Card.Body>
        <ul>
          {players.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <Button onClick={() => handleJoinRoom(id, name)}>Join room</Button>
      </Card.Body>
    </Card>
  );
}
