import React from 'react'

import "./MatchModal.css"
import "./PlayedMatchModal.css"
import "./PlayedMatchVideoButton.css"

import {teams} from "../../data/teams"
import {players} from "../../data/players"
import {goals} from "../../data/goals"

interface MatchModalPropsTypes {
  currentMatchModal: {id: string; localName: string; visitorName: string; localScore: number; visitorScore: number; isPlayoff: boolean
    localScorePenalties: number; visitorScorePenalties: number; date: string; time: string; done: boolean; urlLocal: string
    urlVisitor: string; localTeamId: string; visitorTeamId: string; urlVideo: string|undefined} | undefined
}

interface playedMatchModalProps {
  localScorers: { name: string; picUrl: string; quantity: number; }[];
  visitorScorers: { name: string; picUrl: string; quantity: number; }[]
}

const PlayedMatchVideoButton = (props:{videoURL:string}) => {
  return (
    <div className="playedmatchvideo-button">
      <a href={props.videoURL} target="_blank" rel="noreferrer">
        Ver video
      </a>
    </div>
  )
}

const PlayedOffMatch = (props:{localScore:number; visitorScore:number}) => {
  return (
    <div className="playedoffmatch-modal-container">
      <div className="playedoffmatch-title"> Penales </div>
      <p className="playedoffmatch-scores">{props.localScore.toString() + " - " + props.visitorScore.toString()}</p>
    </div>
  )
}

const PlayedMatchModal = (props: playedMatchModalProps) => {
  return (
    <div className='playedmatch-modal-container'>
      <div className='players-scorers-playedmatch-main'>
        <div className="players-scorers-playedmatch">
          {
            props.localScorers.map((player, i)=>{
              return(
                <div className="player-scorer-container">
                  <p>{player.quantity}</p>
                  <img src={player?.picUrl} alt={player?.name}/>
                  <p>{player?.name}</p>
                </div>
              )
            })
          }
        </div>
        <div className="players-scorers-playedmatch">
          {
            props.visitorScorers.map((player, i)=>{
              return(
                <div className="player-scorer-container">
                  <p>{player.quantity}</p>
                  <img src={player?.picUrl} alt={player?.name}/>
                  <p>{player?.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const MatchModal = (props:MatchModalPropsTypes) => {

  const filterGoalsForMatchId = goals.filter(goal=>{return goal.matchId===props.currentMatchModal?.id})

  const teamGoals = (teamId:String) => {
    let teamPlayers = teams.find(team=>team.id===teamId)!.player_ids
    let scorersList = []

    for(let i:number = 0; i<teamPlayers?.length; i++ ){
      let playerName = players.find(player=>teamPlayers[i]===player.id)
      let playerGoals = filterGoalsForMatchId.filter(goal=>{return teamPlayers[i]===goal.playerGoalId}).length

      for(let j:number = 0; j<playerGoals; j++){
        scorersList.push(playerName)
      }
    }

    return scorersList
  }

  const quantityGoalsForPlayer = (scorersList: ({ id: string; name: string; number: string; picUrl: string; isCaptain: boolean; teamId: string; } | undefined)[]) => {

    let scorers:{name:string; picUrl:string; quantity:number}[] = []

    for(let i:number = 0;i<scorersList.length;i++){
      if( scorers.find(scorer=>{return scorer.name === scorersList[i]?.name}) === undefined ){
        scorers.push({
          name: scorersList[i]?.name as string,
          picUrl: scorersList[i]?.picUrl as string,
          quantity: 1
        })        
      } else{
        scorers.find(scorer=>{return scorer.name === scorersList[i]?.name})!.quantity += 1
      }
    }

    return scorers
  }

  const currentMatchModal = {
    localName:              props.currentMatchModal?.localName,
    visitorName:            props.currentMatchModal?.visitorName,
    localId:                props.currentMatchModal?.localTeamId,
    visitorId:              props.currentMatchModal?.visitorTeamId,
    localScore:             props.currentMatchModal?.localScore,
    visitorScore:           props.currentMatchModal?.visitorScore,
    isPlayOff:              props.currentMatchModal?.isPlayoff,
    localScorePenalties:    props.currentMatchModal?.localScorePenalties,
    visitorScorePenalties:  props.currentMatchModal?.visitorScorePenalties,
    date:                   props.currentMatchModal?.date,
    time:                   props.currentMatchModal?.time,
    done:                   props.currentMatchModal?.done,
    urlLocal:               props.currentMatchModal?.urlLocal,
    urlVisitor:             props.currentMatchModal?.urlVisitor,
    urlVideo:               props.currentMatchModal?.urlVideo,
    localScorers:           quantityGoalsForPlayer(teamGoals(props.currentMatchModal?.localTeamId as string)),
    visitorScorers:         quantityGoalsForPlayer(teamGoals(props.currentMatchModal?.visitorTeamId as string)),
  }

  return (
    <div className='matchmodal-container'>
        <div className="modal-shields-scores">
          <div className="modal-shield-and-name">
            <img className="shield-image-modal" src={currentMatchModal.urlLocal} alt="shield"/>
            <p className="modal-team-name">{currentMatchModal.localName}</p>
          </div>
          <p className="score-match-modal">{currentMatchModal.done? currentMatchModal.localScore + " - "+ currentMatchModal.visitorScore:"vs"}</p>
          <div className="modal-shield-and-name">
            <p className="modal-team-name">{currentMatchModal?.visitorName}</p>
            <img className="shield-image-modal" src={currentMatchModal?.urlVisitor} alt="shield"/>
          </div>
        </div>
        <div className="modal-date-time">
          <p>{currentMatchModal?.date}</p>
          <p>{currentMatchModal?.time}</p>
        </div>

        {/* Agrego los jugadores que metieron gol solo si se jugó el partido */}

        {
          currentMatchModal.done === true &&
          <PlayedMatchModal 
          localScorers={currentMatchModal.localScorers}
          visitorScorers={currentMatchModal.visitorScorers}/>
        }

        {/* Agrego el resultado de los penales solo si el partido fue definido asi*/}

        {
          currentMatchModal.isPlayOff === true && currentMatchModal.done === true &&
          <PlayedOffMatch 
          localScore={currentMatchModal.localScorePenalties as number} 
          visitorScore={currentMatchModal.visitorScorePenalties as number}/>
        }

        {/* Agrego el button para ver el video del partido solo si lo hay */}

        {
          currentMatchModal.urlVideo !== undefined &&
          <PlayedMatchVideoButton 
          videoURL={currentMatchModal.urlVideo}/>
        }

    </div>
  )
}

export default MatchModal