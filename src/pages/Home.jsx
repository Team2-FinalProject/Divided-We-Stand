import React from "react";
import "../App.css";

export default function Home() {
  return (
    <div className="mainpage">
      <div className="nes-field">
        <label for="name_field">Your name</label>
        <input type="text" id="name_field" className="nes-input" />
      </div>
      <button
        type="button"
        className="nes-btn is-success"
        style={{ width: 200 }}
      >
        Start
      </button>
    </div>
  );
}
