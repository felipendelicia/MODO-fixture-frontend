import React, { useEffect, useState } from 'react'

import "./BestScorers.css"

import {players} from "../../data/players"
import {goals} from "../../data/goals"
import {teams} from "../../data/teams"

const BestScorers = () => {

    const [playersList, setPlayersList] = useState([])

    useEffect(()=>{
        const allPlayers = players.map((player)=>{
            return(
                {
                    id:player.id,
                    name:player.name,
                    picUrl:player.picUrl,
                    teamName: teams.find(team=>team.id===player.teamId)!.name,
                    playerGoals: goals.filter(goal=>{return goal.playerGoalId === player.id}).length
                }
            )
        })

        let sortedPlayers = allPlayers.sort((a,b)=>{return b.playerGoals - a.playerGoals})

        setPlayersList(sortedPlayers.slice(0,3))

    },[])


  return (
    <div className="bestscorers-container">

    </div>
  )
}

export default BestScorers