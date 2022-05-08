import React from 'react'

import "./General.css"

import Players from './Players/Players'
import Fixture from './Fixture/Fixture'
import Teams from './Teams/Teams'

const General = () => {
  return (
    <div className="general-container">
        <div className="fixture-players-container">
          <div className="fixture-container">
            <Fixture/>
          </div>
          <div className="players-container">
            <Players/>
          </div>
        </div>
        <div className="teams-container">
          <Teams/>
        </div>
    </div>
  )
}

export default General