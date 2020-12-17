import React, { useState } from 'react'
// import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import { config } from '../js/newgame'
import socket from '../connection/socket'

export default function Board() {

  const [game, setGame] = useState()
  // var game = new Phaser.Game(config)
  // setGame()

  React.useEffect(() => {
    const configs = config(socket)
    console.log(configs, "<<< configs di board")
    // debugger
    // setInterval(() => {
    // }, 500);
    setGame(Object.assign({}, configs))
  }, [])

  return (
    <>
      <IonPhaser game={game} />
    </>
  )
}