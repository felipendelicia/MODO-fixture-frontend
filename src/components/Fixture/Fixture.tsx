import React, { useEffect, useState } from 'react'

import {matches} from "../../data/matches"
import {teams} from "../../data/teams"
import {goals} from "../../data/goals"


const Fixture = () => {

  const [teamsList, setTeamsList] = useState<any>([])

  useEffect(()=>{
    let currentTeams = teams.map((team)=>{
      return({
          id: team.id,
          name:team.name,
          points:team.points,
          wins:team.wins,
          defeats:team.defeats,
          draw:team.draws,
          group:team.group,
          playedMatches: matches.filter((match)=>{
            return match.done===true && (match.localId === team.id || match.visitorId === team.id)
          }).length,
          gf: goals.filter((goal)=>{
            return goal.teamId === team.id
          }).length,
          gc: goals.filter((goal)=>{
            return goal.teamReceivedId === team.id
          }).length,
          })
    })

    currentTeams = currentTeams.sort((team: any)=> -team.points)
    setTeamsList(currentTeams)
  },[])

  useEffect(()=>{console.log(teamsList)},[teamsList])

  return (
  <div>
    <h1>Grupo A</h1>
    <table>
            <tr>
              <td>Equipo</td>
              <td>PJ</td>
              <td>PG</td>
              <td>PE</td>
              <td>PP</td>
              <td>PTS</td>
              <td>GF</td>
              <td>GE</td>
              <td>DG</td>
            </tr>
            {teamsList.map((team: any)=>{
              if(team.group === "a"){
                return(
                  <tr>
                    <td>{team.name}</td>
                    <td>{team.playedMatches}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.defeats}</td>
                    <td>{team.points}</td>
                    <td>{team.gf}</td>
                    <td>{team.gc}</td>
                    <td>{team.gf - team.gc}</td>
                  </tr>
                  )
              }   
            })}
    </table>
    <h1>Grupo B</h1>
    <table>
            <tr>
              <td>Equipo</td>
              <td>PJ</td>
              <td>PG</td>
              <td>PE</td>
              <td>PP</td>
              <td>PTS</td>
              <td>GF</td>
              <td>GE</td>
              <td>DG</td>
            </tr>
            {teamsList.map((team: any)=>{
              if(team.group === "b"){
                return(
                  <tr>
                    <td>{team.name}</td>
                    <td>{team.playedMatches}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.defeats}</td>
                    <td>{team.points}</td>
                    <td>{team.gf}</td>
                    <td>{team.gc}</td>
                    <td>{team.gf - team.gc}</td>
                  </tr>
                  )
              }   
            })}
    </table>
  </div>
  )
}

export default Fixture