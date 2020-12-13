import socket from "../../connection/socket";

export const SOCKET_LOGIN = (username) => {
  return {
    type: "SET_ONLINE_USERS",
    payload: username,
  };
};

export function SET_PLAYERS() {
    console.log("This set players")
    return (dispatch) => {
        socket.on("login", (username) => {
            console.log(username, "ini username di set players")
            dispatch({
                type: "SET_PLAYERS",
                payload: username
            })
        })
    };
  }
  