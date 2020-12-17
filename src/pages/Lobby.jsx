import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardRoom from "../components/CardRoom";
import socket from "../connection/socket";
import { v4 as uuidv4 } from "uuid";
import mp3 from '../sound/BGM/Cinematic_Drum.mp3'
import ReactAudioPlayer from 'react-audio-player'

export default function Lobby() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const nameRoom = useRef();
  const formRoom = useRef();
  // const history = useHistory();
  const [room, setRoom] = useState([]);

  const handleSubmitRoom = (e) => {
    e.preventDefault();
    let roomName = nameRoom.current.value;
    let payload = {
      roomName,
      id: uuidv4(),
      roomMaster: {
        id: localStorage.getItem("id"),
        username: localStorage.getItem("username"),
      },
    };

    // dispatch({type: 'server/createRoom', data: roomName})
    socket.emit("createRoom", payload)
    formRoom.current.reset()
    console.log("this");
  };

  //belum kepake
  useEffect(() => {
    dispatch({ type: "server/online" });
    dispatch({ type: "server/rooms" });
    console.log(state.rooms.length, ",,, useeffect mounted");
    if (state.rooms.length > 0) {
      setRoom(state.rooms);
    }
    socket.on("hello", data => {
      console.log(data, "from lobby");
    })
  }, []);

  useEffect(() => {
    socket.on("createRoom", (rooms) => {
      setRoom(rooms);
    });
    socket.on("joinRoom", (rooms) => {
      setRoom(rooms);
    });
  }, [room]);
  
  return (
    <section className="fight-screen">
      <ReactAudioPlayer 
        controls
        autoPlay
        src={mp3}
        loop
        style={{ display: "none"}}
      />
      <div className="row lobby mb-4">
        <Form onSubmit={handleSubmitRoom} ref={formRoom} style={{ width: 2000}}>
          <input
            className="nes-textarea"
            placeholder="Create Room"
            ref={nameRoom}
            required
          ></input>
          <Button type="submit" className="nes-btn is-success">
            Submit
          </Button>
        </Form>
      </div>

      <div className="row d-flex justify-content-center">

        {room.map(item => (
          <CardRoom data={item} key={item.id} />
        ))}
        
      </div>
    </section>
  );
}