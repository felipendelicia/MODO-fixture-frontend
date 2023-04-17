import React, { useState } from 'react';
import "./Tournament.css";
import "./MatchCard.css";
import { matches } from "../../data/matches";
import { teams } from "../../data/teams";
import { HomeProps } from '../../views/Home';


const MatchCard = (props:{stage:string, data:any, winner:string, tournamentId: string}) => {
  const {stage, data, winner, tournamentId} = props;

  const [ local ] = useState(teams[parseInt(tournamentId)-1].find(team => team.id === data.localId));
  const [ visitor ] = useState(teams[parseInt(tournamentId)-1].find(team => team.id === data.visitorId));

  return (
    <div className="match-card-container-main">
      <p>{stage}</p>
      <div className="match-card-container">
        <div className="card-container">
          <img className={`${winner==='local'?'winner': ''}`} src={local?.url} alt="shield" />
          <p>{local?.name}</p>
        </div>
        <p>vs</p>
        <div className="card-container">
          <img className={`${winner==='visitor'?'winner': ''}`} src={visitor?.url} alt="shield" />
          <p>{visitor?.name}</p>
        </div>
      </div>
    </div>
  );
};

const Tournament = (props: HomeProps) => {
  const [ matchSemA ] = useState( matches[parseInt(props.tournamentId)-1].find(match => match.stage === 'Semifinal A'));
  const [ matchSemB ] = useState( matches[parseInt(props.tournamentId)-1].find(match => match.stage === 'Semifinal B'));
  const [ matchFinal ] = useState( matches[parseInt(props.tournamentId)-1].find(match => match.stage === 'Final'));

  return (
    <div className="tournament-template-container">
      <div className="toggle-msg">
        <p className="show">Ver fase de grupos</p>
      </div>  
      <div className="tournament-container">
        <div className="tournament-stage-container">
            <p>🎉🎊¡Ganador!🎊🎉</p>
          <div className="match-cards-container">
            <div className="card-container">
              <img className={`final-winner`} src={teams[parseInt(props.tournamentId)-1][7].url} alt="shield" />
              <p>{teams[parseInt(props.tournamentId)-1][7].name}</p>
            </div>
          </div>
        </div>
        <div className="tournament-stage-container">
          <div className="match-cards-container">
            <MatchCard stage="Final" data={matchFinal} winner="local" tournamentId={props.tournamentId}/>
          </div>
        </div>
        <div className="tournament-stage-container">
          <div className="match-cards-container">
            <MatchCard stage="Semifinal A" data={matchSemA} winner="local" tournamentId={props.tournamentId}/>
            <MatchCard stage="Semifinal B" data={matchSemB} winner="visitor" tournamentId={props.tournamentId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
