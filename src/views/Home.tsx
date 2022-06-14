import React from 'react'
import Carrousel from '../components/Carrousel/Carrousel'
import Fixture from '../components/Fixture/Fixture'
import BestScorers from '../components/BestScorers/BestScorers'
import Tournament from '../components/Tournament/Tournament'

const Hero = () => {
  const [showFixture, setShowFixture] = React.useState(false)
  const [showTournament, setTournament] = React.useState(true)

  const toggle = () => {
    setShowFixture(!showFixture)
    setTournament(!showTournament)
  }

  return <>
    <div onClick={toggle} className={showTournament? '' : 'hide'}>
      <Tournament  />
    </div>
    <div onClick={toggle} className={showFixture? '' : 'hide'}>
      <Fixture  />
    </div>
  </>
}

const Home = () => {
  return (
    <div className="container">
      <Carrousel />
      <Hero />
      <BestScorers />
    </div>
  )
}

export default Home