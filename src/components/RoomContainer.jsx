import React from "react";
import P1Card from "./P1Card";
import P2Card from "./P2Card";
import P3Card from "./P3Card";
import P4Card from "./P4Card";

export default function RoomContainer() {
  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Room 1</p>
      <div className="row player-card">
        <P1Card></P1Card>
        <P2Card></P2Card>
      </div>
      <div className="row player-card">
        <P3Card></P3Card>
        <P4Card></P4Card>
      </div>
    </div>
  );
}
