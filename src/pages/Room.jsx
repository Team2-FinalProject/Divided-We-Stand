import React from "react";
import PlayerCard from "../components/P1Card";

export default function Room() {
  return (
    <section>
      <div className="row room">
        <div className="column">
          <PlayerCard></PlayerCard>
          <PlayerCard></PlayerCard>
          <PlayerCard></PlayerCard>
        </div>
        <img
          className="versus-logo"
          src="https://www.dlf.pt/png/big/11/110833_versus-logo-png.png"
          alt=""
        />
        <div className="column">
          <PlayerCard></PlayerCard>
          <PlayerCard></PlayerCard>
          <PlayerCard></PlayerCard>
        </div>
      </div>
      <button type="button" className="nes-btn is-success start">
        START
      </button>
    </section>
  );
}
