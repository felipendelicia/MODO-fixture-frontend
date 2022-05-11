import React, { useEffect, useState } from 'react'

import {matches} from "../../data/matches"
import {teams} from "../../data/teams"

const Carrousel = () => {

    const [matchesList, setMatchesList] = useState([])
    //const [currentMatch, setCurrentMatch] = useState({})

    useEffect(()=>{
        const currentMatches = matches.map((match)=>{
            return({
                id: match.id,
                localName: teams.find(team=>team.id===match.localId)!.name,
                visitorName: teams.find(team=>team.id===match.visitorId)!.name,
                localScore: match.localScore,
                visitorScore: match.visitorScore,
                isPlayoff: match.isPlayoff,
                localScorePenalties: match.localScorePenalties,
                visitorScorePenalties: match.visitorScorePenalties,
                date: match.date,
                time: match.time,
                done: match.done
            })
        })
    },[])

    

  return (
    <div>
    </div>
  )
}

export default Carrousel