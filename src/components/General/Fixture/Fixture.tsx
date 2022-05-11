import React, { ReactEventHandler } from 'react'

import "./Fixture.css"

import { teams } from "../../../data/teams"
import { matches } from "../../../data/matches"

import MatchModal from './MatchModal/MatchModal'

const Fixture = () => {

  const currentTeam = (currentId:string) =>{
    for(let i = 0;i<teams.length;i++){
      if(currentId===teams[i].id){
        return teams[i]
      }
    }
  }

  const openModal = (currentTarget:HTMLElement) => {
    let currentModal = currentTarget.parentElement?.parentElement?.lastElementChild
    console.log(currentModal?.classList.add("show"))
  }

  return (
    <div className="fixture-container">
      {
        matches.map((match, index)=>{
          let currentLocalTeam = currentTeam(match.localId)
          let currentVisitorTeam = currentTeam(match.visitorId)

          return(
            <div key={index} className="fixture-match-container">
              <div className="fixture-match-scores">
                <div className="fixture-match-shield-name">
                  <img className="fixture-match-shield" alt="team shield" src="./assets/img/favicon.png"/>
                  <p>{currentLocalTeam?.name}</p>
                </div>
                {
                  match.done
                  ? <p className="parraf-score" onClick={(e)=>openModal(e.currentTarget)}>{match.localScore + " - " + match.visitorScore}</p> 
                  : <p>vs</p> 
                }
                <div className="fixture-match-shield-name">
                  <img className="fixture-match-shield" alt="team shield" src="./assets/img/favicon.png"/>
                  <p>{currentVisitorTeam?.name}</p>
                </div>
              </div>
              <div className="fixture-match-date">
                <p className="match-date">{match.date}</p>
                <p className="match-time">{match.time}</p>
              </div>
              <div className="fixture-match-modal">
                <MatchModal matchId={match.id}/>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Fixture