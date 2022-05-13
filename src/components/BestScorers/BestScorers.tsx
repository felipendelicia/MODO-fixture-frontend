import React, { useEffect, useState } from 'react'

import "./BestScorers.css"

import {players} from "../../data/players"
import {goals} from "../../data/goals"
import {teams} from "../../data/teams"

const BestScorers = () => {

    const [playersList, setPlayersList] = useState<unknown>([])

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
        <h3>Goleadores</h3>

        <div className="bestscorer-container">
            <div className="pic-bestscorer-name">
                <img src="" alt="player"/>
                <p className="bestscorer-1-name"></p>
            </div>
            <p className="bestscorer-goals"></p>
        </div>

        <div className="bestscorer-container">
            <div className="pic-bestscorer-name">
                <img src="" alt="player"/>
                <p className="bestscorer-2-name"></p>
            </div>
            <p className="bestscorer-goals"></p>
        </div>

        <div className="bestscorer-container">
            <div className="pic-bestscorer-name">
                <img src="" alt="player"/>
                <p className="bestscorer-3-name"></p>
            </div>
            <p className="bestscorer-goals"></p>
        </div>

        <p>Ver todos</p>
    </div>
  )
}

export default BestScorers