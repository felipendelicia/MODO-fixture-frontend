import React from 'react'

import "./Players.css"

import { players } from '../../../data/players'

const Players = () => {
  return (
    <div className="players-container">
        <div className="search-bar-container">

        </div>
        <div className="players-container">
          {
            players.map((player, index)=>{
              return(
                <div className="player-container" key={index}>
                  
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Players