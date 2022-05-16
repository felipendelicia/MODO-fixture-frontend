import React, { useEffect, useState } from 'react'

import "./BestScorers.css"

import {players} from "../../data/players"
import {goals} from "../../data/goals"
import {teams} from "../../data/teams"

const BestScorers = () => {

    const [playersList, setPlayersList] = useState<{ id: string; name: string; picUrl: string; teamName: string; playerGoals: number; }[]>([])

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
                <img className="pic-bestscorer-gold" src={playersList[0]?.picUrl} alt="player"/>
                <p className="bestscorer-1-name">{playersList[0]?.name}</p>
                <div className="golden-boot-container">
                        <img className="golden-boot" src='./assets/img/botin_oro.png' alt="golden"/>
                </div>
            </div>
            <p className="bestscorer-goals">{playersList[0]?.playerGoals}</p>
        </div>

        <div className="bestscorer-container">
            <div className="pic-bestscorer-name">
                <img className="pic-bestscorer-silver" src={playersList[1]?.picUrl} alt="player"/>
                <p className="bestscorer-2-name">{playersList[1]?.name}</p>
            </div>
            <p className="bestscorer-goals">{playersList[1]?.playerGoals}</p>
        </div>

        <div className="bestscorer-container">
            <div className="pic-bestscorer-name">
                <img className="pic-bestscorer-bronze" src={playersList[2]?.picUrl} alt="player"/>
                <p className="bestscorer-3-name">{playersList[2]?.name}</p>
            </div>
            <p className="bestscorer-goals">{playersList[2]?.playerGoals}</p>
        </div>
    </div>
  )
}

export default BestScorers