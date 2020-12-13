import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import socket from "../connection/socket";
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from "uuid";
// import { SET_PLAYERS } from '../store/actions/socket'

export default function Home() {
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
    dispatch({type:'server/players', data});
    // dispatch(SET_PLAYERS)
};

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="input your name"
            onChange={handleUsername}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Container>
  );
}
