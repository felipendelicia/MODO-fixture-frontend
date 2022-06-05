import "./Tournament.css";
import "./MatchCard.css";

const MatchCard = (props:{stage:string}) => {
  return (
    <div className="match-card-container-main">
      <p>{props.stage}</p>
      <div className="match-card-container">
        <img src="./assets/img/favicon.png" alt="shield" />
        <p>vs</p>
        <img src="./assets/img/favicon.png" alt="shield" />
      </div>
    </div>
  );
};

const Tournament = () => {
  return (
    <div className="tournament-template-container">
      <div className="tournament-container">
        <div className="tournament-stage-container">
            <p>🎉🎊¡Ganador!🎊🎉</p>
          <div className="match-cards-container">
            <img
              src="./assets/img/favicon.png"
              alt="shield"
              className="winner-img"
            />
          </div>
        </div>
        <div className="tournament-stage-container">
          <div className="match-cards-container">
            <MatchCard stage="Final"/>
          </div>
        </div>
        <div className="tournament-stage-container">
          <div className="match-cards-container">
            <MatchCard stage="Semifinal A"/>
            <MatchCard stage="Semifinal B"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
