import React, { useEffect, useState } from 'react'

import { matches } from "../../data/matches"
import { teams } from "../../data/teams"
import { goals } from "../../data/goals"

import "./Fixture.css"

const Fixture = () => {

  const [teamsList, setTeamsList] = useState<any>([])

  useEffect(() => {
    let currentTeams = teams.map((team) => {
      return ({
        id: team.id,
        name: team.name,
        points: team.points,
        wins: team.wins,
        defeats: team.defeats,
        draws: team.draws,
        group: team.group,
        playedMatches: matches.filter((match) => {
          return match.done === true && (match.localId === team.id || match.visitorId === team.id)
        }).length,
        gf: goals.filter((goal) => {
          return goal.teamId === team.id
        }).length,
        gc: goals.filter((goal) => {
          return goal.teamReceivedId === team.id
        }).length,
        url: team.url
      })
    })

    currentTeams.sort((a: any, b: any) => {
      if (a.points > b.points) {
        return -1
      } else if (a.points < b.points) {
        return 1
      } else {
        const dgA = a.gf - a.gc;
        const dgB = b.gf - b.gc;
        if (dgA > dgB) {
          return -1
        } else if (dgA < dgB) {
          return 1
        } else {
          if (a.gf > b.gf) {
            return -1
          } else {
            return 1
          }
        }
      }
    });

    setTeamsList(currentTeams)
  }, [])

  return (
    <div className="fixture-container">
      <div className="fixture-group-container">
        <h1 className="group-title">Grupo A</h1>
        <table className="table-container">
          <tr className="table-categories">
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
          {teamsList.map((team: any) => {
            if (team.group === "a") {
              return (
                <tr>
                  <td className="table-team-names"><img alt='shield' src={team.url} className='shield-image-fixture' /><span>{team.name}</span></td>
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
            } else {return(<></>)}
          })}
        </table>
      </div>
      <div className="fixture-group-container">
        <h1 className="group-title">Grupo B</h1>
        <table className="table-container">
          <tr className="table-categories">
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
          {teamsList.map((team: any) => {
            if (team.group === "b") {
              return (
                <tr>
                  <td className="table-team-names"><img alt='shield' src={team.url} className='shield-image-fixture' /><span>{team.name}</span></td>
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
            } else {return(<></>)}
          })}
        </table>
      </div>
    </div>
  )
}

export default Fixture