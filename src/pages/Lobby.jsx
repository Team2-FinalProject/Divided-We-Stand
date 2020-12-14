import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardRoom from "../components/CardRoom";
import socket from "../connection/socket";
import { v4 as uuidv4 } from "uuid";

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
    socket.emit("createRoom", payload);
    formRoom.current.reset();
  };

  //belum kepake
  useEffect(() => {
    dispatch({ type: "server/online" });
    dispatch({ type: "server/rooms" });
    console.log(state.rooms.length, ",,, useeffect mounted");
    if (state.rooms.length > 0) {
      setRoom(state.rooms);
    }
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
      <div className="row lobby">
        <Form onSubmit={handleSubmitRoom} ref={formRoom} style={{ width: 2000}}>
          <textarea
            className="nes-textarea"
            placeholder="Create Room"
            ref={nameRoom}
            required
          ></textarea>
          <Button type="submit" className="nes-btn is-success">
            Submit
          </Button>
        </Form>
      </div>

      <div className="row">

        {room.map(item => (
          <CardRoom data={item} key={item.id} />
        ))}
        {/* <div className="nes-container with-title is-centered">
          <p className="title">Room 1</p>
          <div className="d-flex justify-content-between">
            <div className="team-1">
              <span className="text-light">Team 1</span>
              <div className="card player">
                <div className="card-body">Player 1</div>
              </div>
              <div className="card player">
                <div className="card-body">Player 2</div>
              </div>
              <div className="card player">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="align-self-center">
              <span className="text-light">VS</span>
            </div>
            <div className="team-2">
              <span className="text-light">Team 2</span>
              <div className="card player">
                <div className="card-body">Player 4</div>
              </div>
              <div className="card player">
                <div className="card-body">Player 5</div>
              </div>
              <div className="card player">
                <div className="card-body">Player 6</div>
              </div>
            </div>
          </div>
        </div> */}
        
      </div>
    </section>
  );
}

// export default function Lobby() {
// const dispatch = useDispatch();
// const state = useSelector((state) => state);
// const nameRoom = useRef();
// const formRoom = useRef();
// // const history = useHistory();
// const [room, setRoom] = useState([]);

// const handleSubmitRoom = (e) => {
//   e.preventDefault();
//   let roomName = nameRoom.current.value;
//   let payload = {
//     roomName,
//     id: uuidv4(),
//     roomMaster: {
//       id: localStorage.getItem('id'),
//       username: localStorage.getItem('username'),
//     }
//   };
//   // dispatch({type: 'server/createRoom', data: roomName})
//   socket.emit("createRoom", payload)
//   formRoom.current.reset()
// };

// //belum kepake
// useEffect(() => {
//   dispatch({ type: "server/online" });
//   dispatch({ type: "server/rooms" });
//   console.log(state.rooms.length, ",,, useeffect mounted");
//   if (state.rooms.length > 0) {
//     setRoom(state.rooms);
//   }
// }, []);

// useEffect(() => {
//   socket.on("createRoom", (rooms) => {
//     setRoom(rooms);
//   });
//   socket.on("joinRoom", (rooms) => {
//     setRoom(rooms);
//   });
// }, [room]);

//   return (
//     <Container>
// {JSON.stringify(state)}
//       <Form onSubmit={handleSubmitRoom} ref={formRoom}>
//         <Form.Group>
//           <Form.Label>Create Room</Form.Label>
//           <Form.Control type="text" ref={nameRoom}></Form.Control>
//         </Form.Group>
//         <Button type="submit">Submit</Button>
//       </Form>
//       {room.map((item) => (
//         <CardRoom data={item} key={item.id} />
//       ))}
//     </Container>
//   );
// }
