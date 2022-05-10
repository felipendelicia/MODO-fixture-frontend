import React, { useState } from 'react'
import {Link} from "react-router-dom"

import "./Players.css"

import { players } from '../../../data/players'
import { goals } from '../../../data/goals'
import { teams } from '../../../data/teams'

const Players = () => {

  const [search, setSearch] = useState("")
  const [playersList, setPlayerList] = useState(players)

  const handlePlayerGoals = (id:string) => {
    let playerGoals = 0
    for(let i = 0;i<goals.length;i++){
      if(goals[i].playerGoalId===id){
        playerGoals = playerGoals + 1
      }
    }
    return playerGoals
  }

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearch(value)
    if(value===""){
      setPlayerList(players)
    } else {
      filterPlayers(search)
    }
  }

  const filterPlayers = (search:string) => {
    let searchResponse = players.filter((player) => {
      if(player.name.toString().toLowerCase().includes(search.toLocaleLowerCase())){
        return player
      }
    })
    
    setPlayerList(searchResponse)
  } 

  return (
    <div className="players-container-main">
        <div className="search-bar-container">
          <input placeholder="Buscar jugador" onChange={(e)=>handleOnChange(e)} value={search}></input>
        </div>
        <div className="players-container">
          {
            playersList.map((player, index)=>{
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