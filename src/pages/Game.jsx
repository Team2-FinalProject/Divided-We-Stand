import React, { useEffect, useState } from 'react'
// import Board from '../components/Board'
import {useParams} from 'react-router-dom'
import socket from '../connection/socket'

export default function Game() {

    const { roomName } = useParams()
    const [roomDetail, setRoomDetail] = useState(null);

    useEffect(() => {
        socket.on("startGame", (room) => {
            console.log(room, "<,, start game");
            setRoomDetail(room)
        })
    }, [])

    return (
        <div>
            <p>{roomDetail?.teamOne}</p>
            <p>{roomDetail?.teamTwo}</p>
            <p>{roomDetail?.status}</p>
            {JSON.stringify(roomName)}
            Game page
            {/* <Board /> */}
        </div>
    )
}