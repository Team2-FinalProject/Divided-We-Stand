import React from "react";
import Room from "../components/RoomContainer"

export default function Lobby() {
  return (
    <section className="fight-screen">
      
      <div className="row lobby">
        <textarea className="nes-textarea" placeholder="Create Room"></textarea>
        <button type="button" className="nes-btn is-success">
          Submit
        </button>
      </div>

      <div className="row room">
        <Room></Room>
        <Room></Room>
        <Room></Room>
        <Room></Room>
      </div>

    </section>
  );
}
