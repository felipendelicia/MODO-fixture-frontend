import React, { useEffect, useState } from 'react'

import "./BestScorers.css"

import {players} from "../../data/players"
import {goals} from "../../data/goals"
import {teams} from "../../data/teams"

const PIC_BESTCORERS_CLASS: {[key: number]: string} = {
    0: "gold-border",
    1: "silver-border",
    2: "bronze-border"
}

const BestScorers = () => {

    const [playersList, setPlayersList] = useState<{ id: string; name: string; picUrl: string; teamName: string; playerGoals: number; teamLogo: string;}[]>([])

    useEffect(()=>{
        const allPlayers = players.map((player)=>{
            const teamObj = teams.find(team=>team.id===player.teamId)!;
            return(
                {
                    id:player.id,
                    name:player.name,
                    picUrl:player.picUrl,
                    teamName: teamObj.name,
                    teamLogo: teamObj.url,
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

        {playersList.map((player, i)=>{
            const className = PIC_BESTCORERS_CLASS[i];
            return(
                <div className="bestscorer-container">
                    <div className="pic-bestscorer-name">
                        <img className={`pic-bestscorer ${className}`} src={player?.picUrl} alt="player"/>
                        <img className="bestscorer-team-logo" src={player?.teamLogo} alt="teamLogo"/>
                        <p className="bestscorer-name">{player?.name}</p>
                        <div className="golden-boot-container">
                                {i===0? <img className="golden-boot" src='./assets/img/botin_oro.png' alt="golden-boot"/> : <></>}
                        </div>
                    </div>
                    <p className="bestscorer-goals">{player?.playerGoals}</p>
                </div>
            )
        })}
    </div>
  )
}

export default BestScorers