import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import socket from "../connection/socket";
import { useHistory } from "react-router-dom";

export default function Room() {
  const { roomName } = useParams();
  const [roomDetail, setRoomDetail] = useState(null);
  const history = useHistory();

  useEffect(() => {
    socket.on("roomDetail", (room) => {
      setRoomDetail(room); // team1 nanda, team2 rivari, roomDetail.id
    });
  }, []);

  useEffect(() => {
    socket.on("moveRoom", (room) => {
      // setRoomDetail(room); // team1 nanda, team2 rivari, roomDetail.id
      history.push(`/game`);
    });
    // if (roomDetail) {
    //   roomDetail.status === true && history.push(`/game/${roomDetail.name}`);
    // }
  }, [roomDetail])

  const handleStartGame = () => {
    console.log("this start game button");
    const payload = {
      id: roomDetail.id,
      name: roomDetail.name,
    };
    socket.emit("startGame", payload)
    // history.push(`/game/${roomName}`)
  };

  return (
    <section style={{ height: "80vh" }}>
      <div className="row justify-content-center align-content-center h-100 position-relative">
        <div className="d-flex">
          <div className="column">
            <div className="card player">
              <div className="card-body">{roomDetail?.teamOne[0]}</div>
            </div>
            <div className="card player">
              <div className="card-body">{roomDetail?.teamOne[1]}</div>
            </div>
          </div>
          <div>
            <img
              className="versus-logo"
              src="https://www.dlf.pt/png/big/11/110833_versus-logo-png.png"
              alt=""
            />
          </div>
          <div className="column">
            <div className="card player">
              <div className="card-body">{roomDetail?.teamTwo[0]}</div>
            </div>
            <div className="card player">
              <div className="card-body">{roomDetail?.teamTwo[1]}</div>
            </div>

          </div>
        </div>
        <Button className="position-absolute mt-5" style={{ top: "68%"}} onClick={handleStartGame}>
          START
        </Button>
      </div>
    </section>
)
}
