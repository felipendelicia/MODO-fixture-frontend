import React, { useEffect } from 'react'

import "./Fixture.css"
import moment from "moment"

//import { teams } from "../../../data/teams"
import { matches } from "../../../data/matches"

const Fixture = () => {
  
  useEffect(()=>{ //Ordering the matches for date
    let matchesSortedDate = matches.sort((a, b) => moment(b.date, "YYYY-MM-DD").unix() - moment(a.date, "YYYY-MM-DD").unix());
  })

  return (
    <div className="fixture-container">
        {

        }
    </div>
  )
}

export default Fixture