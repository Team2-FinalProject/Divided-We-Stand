import React from "react";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
        <div classNameName="nes-field">
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
    </Container>
  );
}
