import React from 'react'
import Board from '../components/Board'
import {useParams} from 'react-router-dom'

export default function Game() {

    const { roomName } = useParams()

    return (
        <div>
            {JSON.stringify(roomName)}
            Game page
            <Board />
        </div>
    )
}