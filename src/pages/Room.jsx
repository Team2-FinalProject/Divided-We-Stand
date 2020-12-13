import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import {useParams} from 'react-router-dom'
import socket from '../connection/socket'
import {useHistory} from 'react-router-dom'

export default function Room() {

  const { roomName } = useParams()
  const [ roomDetail, setRoomDetail ] = useState(null)
  const history = useHistory()

  useEffect(() => {
    socket.on('roomDetail', room => {
      setRoomDetail(room)
    })
    socket.on('startGame', room => {
      setRoomDetail(room)
    })
  }, [])

  useEffect(() => {
    if(roomDetail) {
      roomDetail.status === true && history.push(`/game/${roomName}`)
    }
  }, [roomDetail])

  const handleStartGame = () => {
    console.log("this start game button")
    const payload = {
      id: roomDetail.id,
      name: roomDetail.name
    }
    socket.emit('startGame', payload)
  }

  return (
    <Container>
      {JSON.stringify(roomDetail)}
      <Button onClick={handleStartGame}>start the game</Button>
    </Container>
  );
}
