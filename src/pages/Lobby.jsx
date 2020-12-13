import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardRoom from "../components/CardRoom";
import socket from "../connection/socket";
import { v4 as uuidv4 } from "uuid";

// export default function Lobby() {
//   return (
//     <section className="fight-screen">
//       <div className="row lobby">
//         <textarea className="nes-textarea" placeholder="Create Room"></textarea>
//         <button type="button" className="nes-btn is-success">
//           Submit
//         </button>
//       </div>

//       <div className="row room">
//         <div className="nes-container with-title is-centered">
//           <p className="title">Room 1</p>
//           <div className="row player-card">
//             <div className="card player">
//               <div className="card-body">Player 1</div>
//             </div>
//             <div className="card player-2">
//               <div className="card-body">Player 2</div>
//             </div>
//           </div>
//           <div className="row player-card">
//             <div className="card player-3">
//               <div className="card-body">Player 3</div>
//             </div>
//             <div className="card player-4">
//               <div className="card-body">Player 4</div>
//             </div>
//           </div>
//         </div>
//         <div className="nes-container with-title is-centered">
//           <p className="title">Room 2</p>
//           <div className="row player-card">
//             <div className="card player">
//               <div className="card-body">Player 1</div>
//             </div>
//             <div className="card player-2">
//               <div className="card-body">Player 2</div>
//             </div>
//           </div>
//           <div className="row player-card">
//             <div className="card player-3">
//               <div className="card-body">Player 3</div>
//             </div>
//             <div className="card player-4">
//               <div className="card-body">Player 4</div>
//             </div>
//           </div>
//         </div>
//         <div className="nes-container with-title is-centered">
//           <p className="title">Room 3</p>
//           <div className="row player-card">
//             <div className="card player">
//               <div className="card-body">Player 1</div>
//             </div>
//             <div className="card player-2">
//               <div className="card-body">Player 2</div>
//             </div>
//           </div>
//           <div className="row player-card">
//             <div className="card player-3">
//               <div className="card-body">Player 3</div>
//             </div>
//             <div className="card player-4">
//               <div className="card-body">Player 4</div>
//             </div>
//           </div>
//         </div>
//         <div className="nes-container with-title is-centered">
//           <p className="title">Room 4</p>
//           <div className="row player-card">
//             <div className="card player">
//               <div className="card-body">Player 1</div>
//             </div>
//             <div className="card player-2">
//               <div className="card-body">Player 2</div>
//             </div>
//           </div>
//           <div className="row player-card">
//             <div className="card player-3">
//               <div className="card-body">Player 3</div>
//             </div>
//             <div className="card player-4">
//               <div className="card-body">Player 4</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

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
        id: localStorage.getItem('id'),
        username: localStorage.getItem('username'),
      }
    };
    // dispatch({type: 'server/createRoom', data: roomName})
    socket.emit("createRoom", payload)
    formRoom.current.reset()
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
    <Container>
      {JSON.stringify(state)}
      <Form onSubmit={handleSubmitRoom} ref={formRoom}>
        <Form.Group>
          <Form.Label>Create Room</Form.Label>
          <Form.Control type="text" ref={nameRoom}></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      {room.map((item) => (
        <CardRoom data={item} key={item.id} />
      ))}
    </Container>
  );
}
