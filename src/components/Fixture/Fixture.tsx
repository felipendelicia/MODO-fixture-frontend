import React, { useEffect, useState } from 'react'

import { matches } from "../../data/matches"
import { teams } from "../../data/teams"
import { goals } from "../../data/goals"

import "./Fixture.css"

const Fixture = () => {

  const [teamsList, setTeamsList] = useState<any>([])

  useEffect(() => {
    const filteredGoals = goals.filter(goal => parseInt(goal.matchId) < 13);
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
        gf: filteredGoals.filter((goal) => {
          return goal.teamId === team.id
        }).length,
        gc: filteredGoals.filter((goal) => {
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
    <>
      <div className="toggle-msg">
        <p className="show">Ver play offs</p>
      </div>
      <div className="fixture-container">
        <div className="fixture-group-container">
          <h1 className="group-title">Grupo A</h1>
          <table className="table-container">
            <tr className="table-categories">
              <td>Equipo</td>
              <td>PJ</td>
              <td>G</td>
              <td>E</td>
              <td>P</td>
              <td>GF</td>
              <td>GE</td>
              <td>DG</td>
              <td>PTS</td>
            </tr>
            {teamsList.filter((team: any) => team.group === "a").map((team: any, i: number) => {
              const classifiedClass = i < 2 ? "classified" : "unclassified";
              return (
                <tr key={i}>
                  <td className={`table-team-names ${classifiedClass}`}><img alt='shield' src={team.url} className='shield-image-fixture' /><span>{team.name}</span></td>
                  <td>{team.playedMatches}</td>
                  <td>{team.wins}</td>
                  <td>{team.draws}</td>
                  <td>{team.defeats}</td>
                  <td>{team.gf}</td>
                  <td>{team.gc}</td>
                  <td>{team.gf - team.gc}</td>
                  <td className="td-points">{team.points}</td>
                </tr>
              )
            })}
          </table>
        </div>
        <div className="fixture-group-container">
          <h1 className="group-title">Grupo B</h1>
          <table className="table-container">
            <tr className="table-categories">
              <td>Equipo</td>
              <td>PJ</td>
              <td>G</td>
              <td>E</td>
              <td>P</td>
              <td>GF</td>
              <td>GE</td>
              <td>DG</td>
              <td>PTS</td>
            </tr>
            {teamsList.filter((team: any) => team.group === "b").map((team: any, i: number) => {
              const classifiedClass = i < 2 ? "classified" : "unclassified";
              return (
                <tr key={i}>
                  <td className={`table-team-names ${classifiedClass}`}><img alt='shield' src={team.url} className='shield-image-fixture' /><span>{team.name}</span></td>
                  <td>{team.playedMatches}</td>
                  <td>{team.wins}</td>
                  <td>{team.draws}</td>
                  <td>{team.defeats}</td>
                  <td>{team.gf}</td>
                  <td>{team.gc}</td>
                  <td>{team.gf - team.gc}</td>
                  <td className="td-points">{team.points}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </>

  )
}

export default Fixture
