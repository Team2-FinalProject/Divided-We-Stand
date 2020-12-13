import React from "react";

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
        <div className="nes-container with-title is-centered">
          <p className="title">Room 1</p>
          <div className="row player-card">
            <div className="card player">
              <div className="card-body">Player 1</div>
            </div>
            <div className="card player-2">
              <div className="card-body">Player 2</div>
            </div>
          </div>
          <div className="row player-card">
            <div className="card player-3">
              <div className="card-body">Player 3</div>
            </div>
            <div className="card player-4">
              <div className="card-body">Player 4</div>
            </div>
          </div>
        </div>
        <div className="nes-container with-title is-centered">
          <p className="title">Room 2</p>
          <div className="row player-card">
            <div className="card player">
              <div className="card-body">Player 1</div>
            </div>
            <div className="card player-2">
              <div className="card-body">Player 2</div>
            </div>
          </div>
          <div className="row player-card">
            <div className="card player-3">
              <div className="card-body">Player 3</div>
            </div>
            <div className="card player-4">
              <div className="card-body">Player 4</div>
            </div>
          </div>
        </div>
        <div className="nes-container with-title is-centered">
          <p className="title">Room 3</p>
          <div className="row player-card">
            <div className="card player">
              <div className="card-body">Player 1</div>
            </div>
            <div className="card player-2">
              <div className="card-body">Player 2</div>
            </div>
          </div>
          <div className="row player-card">
            <div className="card player-3">
              <div className="card-body">Player 3</div>
            </div>
            <div className="card player-4">
              <div className="card-body">Player 4</div>
            </div>
          </div>
        </div>
        <div className="nes-container with-title is-centered">
          <p className="title">Room 4</p>
          <div className="row player-card">
            <div className="card player">
              <div className="card-body">Player 1</div>
            </div>
            <div className="card player-2">
              <div className="card-body">Player 2</div>
            </div>
          </div>
          <div className="row player-card">
            <div className="card player-3">
              <div className="card-body">Player 3</div>
            </div>
            <div className="card player-4">
              <div className="card-body">Player 4</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
