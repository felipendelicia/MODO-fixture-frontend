import React from 'react'
import {Link} from "react-router-dom"

import "./Players.css"

import SearchBar from './SearchBar/SearchBar'

import { players } from '../../../data/players'
import { goals } from '../../../data/goals'
import { teams } from '../../../data/teams'

const Players = () => {

  const handlePlayerGoals = (id:string) => {
    let playerGoals = 0
    for(let i = 0;i<goals.length;i++){
      if(goals[i].playerGoalId===id){
        playerGoals = playerGoals + 1
      }
    }
    return playerGoals
  }

  return (
    <div className="players-container-main">
        <div className="search-bar-container">
          <SearchBar/>
        </div>
        <div className="players-container">
          {
            players.map((player, index)=>{
              let currentTeam = ""
              for(let i = 0;i<teams.length;i++){
                if(teams[i].id===player.teamId){
                  currentTeam = teams[i].name.replaceAll(" ", "")
                  break
                }
              }

              return(
                <div className="player-container" key={index}>
                  <div className="player-photo-name">
                    <img src={player.picUrl} alt="playerPic" className="player-photo"/>
                    <p className="player-name">{player.name}</p>
                  </div>
                  <div className="player-goals-team">
                    <p>{handlePlayerGoals(player.id)}</p>
                    <Link to={"/team/" + currentTeam}>
                      <img src="./assets/img/favicon.png" className="player-photo" alt="team shield"/>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Players