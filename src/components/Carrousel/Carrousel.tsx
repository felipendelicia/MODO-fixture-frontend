import React, { useEffect, useState } from 'react'

import {matches} from "../../data/matches"
import {teams} from "../../data/teams"

import "./Carrousel.css"

const MONTHS_MAP: {[key: string]: string} = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
}

const buildDate = (date: string): string => {
  const dateArray = date.split("-");
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2].startsWith("0")?dateArray[2].substring(1):dateArray[2];

  return `${day} de ${MONTHS_MAP[month]} de ${year}`
}

const Carrousel = () => {

    const [matchesList, setMatchesList] = useState<Match[]>([])
    const [currentMatch, setCurrentMatch] = useState<Match | undefined>()

    useEffect(()=>{
        const currentMatches = matches.map((match)=>{
            const localTeam = teams.find(team=>team.id===match.localId)!;
            const visitorTeam = teams.find(team=>team.id===match.visitorId)!;
            return({
                id: match.id,
                localName: localTeam.name,
                visitorName: visitorTeam.name,
                urlLocal: localTeam.url,
                urlVisitor: visitorTeam.url,
                localScore: match.localScore,
                visitorScore: match.visitorScore,
                isPlayoff: match.isPlayoff,
                localScorePenalties: match.localScorePenalties,
                visitorScorePenalties: match.visitorScorePenalties,
                date: buildDate(match.date),
                time: match.time,
                done: match.done,
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
            <img className="shield-image-carrousel" src={currentMatch?.urlLocal} alt="shield"/>
            <p>{currentMatch?.localName}</p>
          </div>
          <p className="score-match">{currentMatch?.done? currentMatch.localScore + " - "+ currentMatch.visitorScore:"vs"}</p>
          <div className="carrousel-shield-and-name">
            <p>{currentMatch?.visitorName}</p>
            <img className="shield-image-carrousel" src={currentMatch?.urlVisitor} alt="shield"/>
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

interface Match {
  id: string
  localName: string
  visitorName: string
  localScore: number
  visitorScore: number
  isPlayoff: boolean
  localScorePenalties: number
  visitorScorePenalties: number
  date: string
  time: string
  done: boolean
  urlLocal: string
  urlVisitor: string
}

export default Carrousel