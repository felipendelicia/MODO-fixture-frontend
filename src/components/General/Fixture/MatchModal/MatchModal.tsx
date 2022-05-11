import React from 'react'

import "./MatchModal.css"

import {matches} from "../../../../data/matches"
import {teams} from "../../../../data/teams"

interface MatchModalProps {
    matchId:string
}

const MatchModal = (props:MatchModalProps) => {
    
    const currentMatchUpdate = () => {
        for(let i = 0;i<matches.length;i++){
            if(props.matchId===matches[i].id){
                return matches[i]
            }
        }
    }

    let currentMatch = currentMatchUpdate()

    const currentTeamUpdate = (teamId:string) => {
        for(let i = 0;i<teams.length;i++){
            if(teamId===teams[i].id){
                return teams[i]
            }
        }
    }

    //let currentLocalTeam = currentTeamUpdate(currentMatch.localId)
    

  return (
    <div className="match-modal-container">
        <div className="match-modal-main">
            <div className="fixture-modal-scores">
                <div className="fixture-modal-shield-name">
                  <img className="fixture-modal-shield" alt="team shield" src="./assets/img/favicon.png"/>
                  <p>lName</p>
                </div>
                <p className="parraf-score-modal">{currentMatch?.localScore + " - " + currentMatch?.visitorScore}</p>
                <div className="fixture-modal-shield-name">
                  <img className="fixture-modal-shield" alt="team shield" src="./assets/img/favicon.png"/>
                  <p>vName</p>
                </div>
            </div>
            <div className="match-modal-scorers">
                <div className="match-modal-local-scorers">
                </div>
                <div className="match-modal-visitor-scorers">
                </div>
            </div>
            <div className="match-modal-penalty-container">
            </div>
            <div className="close-tab-button">
            </div>
        </div>
    </div>
  )
  }

export default MatchModal