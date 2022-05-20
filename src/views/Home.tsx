import React from 'react'
import Carrousel from '../components/Carrousel/Carrousel'
import Fixture from '../components/Fixture/Fixture'
import BestScorers from '../components/BestScorers/BestScorers'

const Home = () => {
  return (
    <div className="container">
        <Carrousel/>
        <Fixture/>
        <BestScorers/>
    </div>
  )
}

export default Home