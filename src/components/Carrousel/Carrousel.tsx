import React, { useEffect, useState } from 'react'

import {matches} from "../../data/matches"
import {teams} from "../../data/teams"

import "./Carrousel.css"

const Carrousel = () => {

    const [matchesList, setMatchesList] = useState<{
      id: string;
      localName: string;
      visitorName: string;
      localScore: number;
      visitorScore: number;
      isPlayoff: boolean;
      localScorePenalties: number;
      visitorScorePenalties: number;
      date: string;
      time: string;
      done: boolean;
  }[]>([])
    const [currentMatch, setCurrentMatch] = useState<{ id: string; localName: string; visitorName: string; localScore: number; visitorScore: number; isPlayoff: boolean; localScorePenalties: number; visitorScorePenalties: number; date: string; time: string; done: boolean; } | undefined>()

    useEffect(()=>{
        const currentMatches = matches.map((match)=>{
            return({
                id: match.id,
                localName: teams.find(team=>team.id===match.localId)!.name,
                visitorName: teams.find(team=>team.id===match.visitorId)!.name,
                localScore: match.localScore,
                visitorScore: match.visitorScore,
                isPlayoff: match.isPlayoff,
                localScorePenalties: match.localScorePenalties,
                visitorScorePenalties: match.visitorScorePenalties,
                date: match.date,
                time: match.time,
                done: match.done
            })
        })
        setMatchesList(currentMatches)

        setCurrentMatch(currentMatches.find((match)=>{return match.done===false}))
    },[])

    const nextMatch = () => {
      let currentMatchIdNumber = parseInt(currentMatch?.id as string)
      if(currentMatchIdNumber===matchesList.length){
        setCurrentMatch(matchesList[0])
      } else {
        setCurrentMatch(matchesList[currentMatchIdNumber])
      }
    }

    const previousMatch = () => {
      let currentMatchIdNumber = parseInt(currentMatch?.id as string)
      if(currentMatchIdNumber===1){
        setCurrentMatch(matchesList[matchesList.length-1])
      } else {
        setCurrentMatch(matchesList[currentMatchIdNumber-2])
      }
    }

  return (
    <>
    <div className="carrousel-container">
      <div className="carrousel-container-main">
        <div className="carrousel-shields-scores">
          <div className="carrousel-shield-and-name">
            <img src='./assets/img/favicon.png' alt="shield"/>
            <p>{currentMatch?.localName}</p>
          </div>
          <p className="score-match">{currentMatch?.done? currentMatch.localScore + " - "+ currentMatch.visitorScore:"vs"}</p>
          <div className="carrousel-shield-and-name">
            <p>{currentMatch?.visitorName}</p>
            <img src='./assets/img/favicon.png' alt="shield"/>
          </div>
        </div>
        <div className="carrousel-date-time">
          <p>{currentMatch?.date}</p>
          <p>{currentMatch?.time}</p>
        </div>
        <div className="carrousel-buttons">
        </div>
      </div>
      <div className="carrousel-controls">
        <div onClick={previousMatch}>Anterior</div>
        <div onClick={nextMatch}>Siguiente</div>
      </div>
    </div>
    
    </>
  )
}

export default Carrousel