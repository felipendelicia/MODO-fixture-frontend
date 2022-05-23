import React from 'react'

import "./MatchModal.css"

import {teams} from "../../data/teams"
import {players} from "../../data/players"
import {goals} from "../../data/goals"

interface MatchModalPropsTypes {
  currentMatchModal: {id: string; localName: string; visitorName: string; localScore: number; visitorScore: number; isPlayoff: boolean
    localScorePenalties: number; visitorScorePenalties: number; date: string; time: string; done: boolean; urlLocal: string
    urlVisitor: string; localTeamId: string; visitorTeamId: string; urlVideo: string|undefined} | undefined
}

const Match = (props:MatchModalPropsTypes) => {

  const filterGoalsForMatchId = goals.filter(goal=>{return goal.matchId===props.currentMatchModal?.id})

  const teamGoals = (teamId:String) => {
    let teamPlayers = teams.find(team=>team.id===props.currentMatchModal?.localTeamId)!.player_ids
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
    localScorers:           teamGoals(props.currentMatchModal?.localTeamId as string),
    visitorScorers:         teamGoals(props.currentMatchModal?.visitorTeamId as string),
  }


  return (
    <div className='matchmodal-container'>
      {currentMatchModal.localName + " vs " + currentMatchModal.visitorName}
    </div>
  )
}

export default Match