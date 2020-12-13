import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import socket from "../connection/socket";

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const initialState = {
  players: [],
  rooms: [],
  activeRoom: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "CREATE_ROOM":
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
}

// const store = createStore(reducer, applyMiddleware(thunk))
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

export default store;
