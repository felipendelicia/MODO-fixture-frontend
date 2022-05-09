import React from 'react'
import { Link } from "react-router-dom"

import "./Teams.css"

import {teams} from "../../../data/teams"

const Teams = () => {
  return (
    <div className="teams-team-container">
      {
        teams.map((team, index)=>{
          let teamNameRoute = team.name.replaceAll(" ", "")
          return(
            <div className="general-teams-container" key={index}>
              <Link to={"/team/" + teamNameRoute}>
                <div className="team-name-shield">
                  <img src="./assets/img/favicon.png" alt="shield" className="team-shield-img"/>
                  <p className="team-name">{team.name}</p>
                </div>
              </Link>
              <div className="team-stats">
                <div className="team-wins-stat">
                  {team.wins}
                </div>
                <div className="team-draws-stat">
                  {team.draws}
                </div>
                <div className="team-defeats-stat">
                  {team.defeats}
                </div>
                <div className="team-points">
                  {"points: " + team.points}
                </div>
              </div>
            </div>
          )
        })
        
      }
    </div>
  )
}

export default Teams