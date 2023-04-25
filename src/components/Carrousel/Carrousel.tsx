import React, { useEffect, useState } from 'react'

import {matches} from "../../data/matches"
import {teams} from "../../data/teams"
import MatchModal from '../MatchModal/MatchModal'
import Modal from '../Modal/Modal'

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

const Carrousel = (props:any) => {

    const [matchesList, setMatchesList] = useState<Match[]>([])
    const [currentMatch, setCurrentMatch] = useState<Match | undefined>()
    const [toggleShowMatch, setToggleShowMatch] = useState<boolean>(false)
    
    useEffect(()=>{
        const currentMatches = matches[parseInt(props.tournamentId)-1].map((match)=>{
            const localTeam = teams[parseInt(props.tournamentId)-1].find(team=>team.id===match.localId)!;
            const visitorTeam = teams[parseInt(props.tournamentId)-1].find(team=>team.id===match.visitorId)!;
            return({
                id: match.id,
                localTeamId: match.localId,
                visitorTeamId: match.visitorId,
                localName: localTeam ? localTeam.name : match.localId,
                visitorName: visitorTeam ? visitorTeam.name : match.visitorId,
                urlLocal: localTeam ? localTeam.url : './assets/img/favicon.png',
                urlVisitor: visitorTeam ? visitorTeam.url : './assets/img/favicon.png',
                localScore: match.localScore,
                visitorScore: match.visitorScore,
                isPlayoff: match.isPlayoff,
                stage: match.stage,
                localScorePenalties: match.localScorePenalties,
                visitorScorePenalties: match.visitorScorePenalties,
                date: buildDate(match.date),
                time: match.time,
                done: match.done,
                urlVideo: match.urlVideo,
            })
        })
        setMatchesList(currentMatches)
        if (!currentMatches.find((match)=>{return match.done===false})) {
          setCurrentMatch(currentMatches[currentMatches.length-1]);
        } else {
          let counter = 0;
          for (let match of currentMatches) {
            if (match.done === false) {
              break;
            }
            counter++;
          }
          setCurrentMatch(currentMatches[counter-1]);
        }
    },[props.tournamentId])

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

    const toggleModalView = () =>{
      if(toggleShowMatch){
        setToggleShowMatch(false)
      } else {
        setToggleShowMatch(true)
      }
    }

    const currentMatchModal = <MatchModal currentMatchModal={currentMatch} tournamentId={props.tournamentId}/>

  return (
    <div className="carrousel-container">
      <div className="carrousel-container-main">
        <div className="carrousel-shields-scores">
          <div className="carrousel-shield-and-name">
            <img className="shield-image-carrousel" src={currentMatch?.urlLocal} alt="shield"/>
            <p className="carrousel-team-name">{currentMatch?.localName}</p>
          </div>
          {
            currentMatch?.localScore === currentMatch?.visitorScore && currentMatch?.done ? 
            <div className="score-match-with-penalties">
            <p className="score-match">{currentMatch?.done? currentMatch.localScore + " - "+ currentMatch.visitorScore:"vs"}</p>
            <p className="score-match-penalties">{currentMatch?.done? currentMatch.localScorePenalties + " - "+ currentMatch.visitorScorePenalties:"vs"}</p>
            </div> :
            <p className="score-match">{currentMatch?.done? currentMatch.localScore + " - "+ currentMatch.visitorScore:"vs"}</p>
          }
          <div className="carrousel-shield-and-name">
            <p className="carrousel-team-name">{currentMatch?.visitorName}</p>
            <img className="shield-image-carrousel" src={currentMatch?.urlVisitor} alt="shield"/>
          </div>
        </div>
        <div className="carrousel-date-time">
          <p>{currentMatch?.date}</p>
          <p>{currentMatch?.time}</p>
          <p className="stage">{currentMatch?.stage}</p>
        </div>
        <div className="carrousel-buttons">
        </div>
      </div>
      <div className="carrousel-controls">
        <div onClick={previousMatch}>Anterior</div>
        <div onClick={nextMatch}>Siguiente</div>
      </div>
      <div className="carrousel-see-more-button" onClick={toggleModalView}>
        Ver más
      </div>
      {
        toggleShowMatch
        ? <Modal 
        toggleState={()=>{toggleModalView()}} 
        modalComponent={currentMatchModal}/>
        : <></>
      }
    </div>
  )
}

interface Match {
  id: string
  localTeamId: string
  visitorTeamId: string
  localName: string
  visitorName: string
  localScore: number
  visitorScore: number
  isPlayoff: boolean
  stage: string
  localScorePenalties: number
  visitorScorePenalties: number
  date: string
  time: string
  done: boolean
  urlLocal: string
  urlVisitor: string
  urlVideo: string | undefined
}

export default Carrousel