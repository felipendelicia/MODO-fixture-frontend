import React from 'react'

import "./Fixture.css"

import { teams } from "../../../data/teams"
import { matches } from "../../../data/matches"

const Fixture = () => {

  const currentTeam = (currentId:string) =>{
    for(let i = 0;i<teams.length;i++){
      if(currentId===teams[i].id){
        return teams[i]
      }
    }
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
                  ? <p>{match.localScore + " a " + match.visitorScore}</p> 
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
            </div>
          )
        })
      }
    </div>
  )
}

export default Fixture