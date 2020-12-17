// import React, { useEffect, useState } from 'react'
// import Board from '../components/Board'
// import {useParams} from 'react-router-dom'
// import socket from '../connection/socket'

// export default function Game() {

//     const { roomName } = useParams()
//     const [roomDetail, setRoomDetail] = useState(null);

//     useEffect(() => {
//         socket.on("startGame", (room) => {
//             console.log(room, "<,, start game");
//             setRoomDetail(room)
//         })
//     }, [])

//     return (
//         <>
//             <Board />
//         </>
//     )
// }

import React, { useState, useEffect } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import  config  from '../js/game'
import socket from '../connection/socket'
import { useHistory } from 'react-router-dom'

export default function Game() {

  const [game, setGame] = useState()
  const [result, setResult] = useState(localStorage.getItem('result'))
  const [initialize, setinitialize] = useState(true)
  // const [intervals, setIntervals] = useState()
  const history = useHistory()

  useEffect(() => {
    // const configs = new Phaser.Game(config(socket))
    const configs = new Phaser.Game(config(socket))
    console.log(configs, "<<< configs di board")
    // setInterval(() => {
    // }, 500);
    setGame(Object.assign({}, configs))
  }, [])

  let int = setInterval(() => {
    setResult(localStorage.getItem('result'))
  }, 1000)


  useEffect(() => {
    if(result === 'endgame') {
      history.push('/finish')
      setGame(null)
      setinitialize(false)
      clearInterval(int)
      alert("game Finish")
    }
    return () => {
      setGame(null)
      setinitialize(false)
    }
  }, [result])

  return (
    <>
      <IonPhaser game={game} initialize={initialize} />
    </>
  )
}