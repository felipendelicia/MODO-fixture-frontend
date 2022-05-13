import React, { useEffect, useState } from 'react'

import {matches} from "../../data/matches"
import {teams} from "../../data/teams"

const Fixture = () => {

  const [teamsList, setTeamsList] = useState<unknown>([])

  useEffect(()=>{
    const currentTeams = teams.map((team)=>{
      return({
          id: team.id,
          name:team.name,
          points:team.points,
          wins:team.wins,
          defeats:team.defeats,
          draw:team.draws,
          group:team.group,
          playedMatches: matches.filter((match)=>{return match.done===true && (match.localId === team.id || match.visitorId === team.id)}).length
      })
    })
    setTeamsList(currentTeams)

    console.log(currentTeams)
  },[])

  return (
    <div>
    </div>
  )
}

export default Fixture