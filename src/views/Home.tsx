import React from 'react'
import Carrousel from '../components/Carrousel/Carrousel'
import Fixture from '../components/Fixture/Fixture'
import BestScorers from '../components/BestScorers/BestScorers'
import Tournament from '../components/Tournament/Tournament'

const Home = () => {
  return (
    <div className="container">
        <Carrousel/>
        <Fixture/>
        <Tournament/>
        <BestScorers/>
    </div>
  )
}

export default Home