import React from 'react'

import "./MatchModal.css"

interface MatchModalPropsTypes {
  currentMatchModal: {id: string; localName: string; visitorName: string; localScore: number; visitorScore: number; isPlayoff: boolean
    localScorePenalties: number; visitorScorePenalties: number; date: string; time: string; done: boolean; urlLocal: string
    urlVisitor: string; localTeamId: string; visitorTeamId: string} | undefined
}

const Match = (props:MatchModalPropsTypes) => {

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

  }

  return (
    <div className='matchmodal-container'>
      {currentMatchModal.localName + " vs " + currentMatchModal.visitorName}
    </div>
  )
}

export default Match