import React from 'react'
import {useParams} from 'react-router-dom'

export default function Game() {

    const { roomName } = useParams()

    return (
        <div>
            {JSON.stringify(roomName)}
            Game page
        </div>
    )
}
