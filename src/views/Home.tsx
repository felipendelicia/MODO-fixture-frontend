import React from 'react'
import Carrousel from '../components/Carrousel/Carrousel'
import Fixture from '../components/Fixture/Fixture'
import BestScorers from '../components/BestScorers/BestScorers'
import Tournament from '../components/Tournament/Tournament'

export interface HomeProps {
  tournamentId: string,
}

const Hero = (props:HomeProps) => {
  const [showFixture, setShowFixture] = React.useState(false)
  const [showTournament, setTournament] = React.useState(true)

  const toggle = () => {
    setShowFixture(!showFixture)
    setTournament(!showTournament)
  }

  if (props.tournamentId !== '2') {
    return <>
      <div onClick={toggle} className={showTournament? '' : 'hide'}>
        <Tournament tournamentId={props.tournamentId} />
      </div>
      <div onClick={toggle} className={showFixture? '' : 'hide'}>
        <Fixture tournamentId={props.tournamentId}/>
      </div>
    </>
  } else {
    return <>
      <div>
        <Fixture tournamentId={props.tournamentId}/>
      </div>
    </>
  }
}

const Home = (props:HomeProps) => {
  return (
    <div className="container">
      <Carrousel tournamentId={props.tournamentId} />
      <Hero tournamentId={props.tournamentId}/>
      <BestScorers tournamentId={props.tournamentId}/>
    </div>
  )
}

export default Home