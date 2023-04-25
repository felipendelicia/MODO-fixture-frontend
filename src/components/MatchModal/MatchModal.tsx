import "./MatchModal.css"
import "./PlayedMatchModal.css"
import "./PlayedMatchVideoButton.css"

import {teams} from "../../data/teams"
import {players} from "../../data/players"
import {goals} from "../../data/goals"
import {cards} from "../../data/cards"

const URL_YELLOW_CARD = "https://user-images.githubusercontent.com/55720621/234161803-8527d836-c56c-44c8-9e9b-fb98ddd975ce.png";
const URL_RED_CARD = "https://user-images.githubusercontent.com/55720621/234161808-c23581d5-e543-4c0b-8c21-0b332bcb1ee9.png";

interface MatchModalPropsTypes {
  tournamentId: string;
  currentMatchModal: {id: string; localName: string; visitorName: string; localScore: number; visitorScore: number; isPlayoff: boolean
    stage: string; localScorePenalties: number; visitorScorePenalties: number; date: string; time: string; done: boolean; urlLocal: string
    urlVisitor: string; localTeamId: string; visitorTeamId: string; urlVideo: string|undefined} | undefined
}

interface Card { id: string; matchId: string; playerId: string; teamId: string; type: string };

interface PlayedMatchModalProps {
  localCards: Card[];
  localScorers: { name: string; picUrl: string; quantity: number; }[];
  visitorCards: Card[];
  visitorScorers: { name: string; picUrl: string; quantity: number; }[];
  tournamentId: string;
}

const PlayedMatchVideoButton = (props:{videoURL:string}) => {
  return (
    <div className="playedmatchvideo-button">
      <a href={props.videoURL} target="_blank" rel="noreferrer">
        Ver video
      </a>
    </div>
  )
}

const returnCardForPlayer = (card: Card, tournamentId: string) => {
  const p = players[parseInt(tournamentId)-1].find((p: any) => p.id === card.playerId);
  const name = p?.name;
  const urlPic = p?.picUrl;
  const urlColor = card.type === "red"? URL_RED_CARD : URL_YELLOW_CARD;
  return(
    <div className="player-scorer-container">
      <img src={urlColor} alt={`${card.type} card`}/>
      <img src={urlPic} alt={name}/>
      <p>{name}</p>
    </div>
  )
};

const PlayedMatchModal = (props: PlayedMatchModalProps) => {
  return (
    <div className='playedmatch-modal-container'>
      <div className='players-scorers-playedmatch-main'>
        <div className="players-scorers-playedmatch">
          {
            props.localScorers.map((player, i)=>{
              return(
                <div className="player-scorer-container">
                  <p>{player.quantity}</p>
                  <img src={player?.picUrl} alt={player?.name}/>
                  <p>{player?.name}</p>
                </div>
              )
            })
          }
          {
            props.localCards.map((card)=>{
              return returnCardForPlayer(card, props.tournamentId);
            })
          }
        </div>
        <div className="players-scorers-playedmatch">
          {
            props.visitorScorers.map((player, i)=>{
              return(
                <div className="player-scorer-container">
                  <p>{player.quantity}</p>
                  <img src={player?.picUrl} alt={player?.name}/>
                  <p>{player?.name}</p>
                </div>
              )
            })
          }
          {
            props.visitorCards.map((card)=>{
              return returnCardForPlayer(card, props.tournamentId);
            })
          }
        </div>
      </div>
    </div>
  )
}

const MatchModal = (props:MatchModalPropsTypes) => {

  const filterGoalsForMatchId = goals[parseInt(props.tournamentId)-1].filter(goal=>{return goal.matchId===props.currentMatchModal?.id})

  const teamGoals = (teamId:String) => {
    let teamPlayers = teams[parseInt(props.tournamentId)-1].find(team=>team.id===teamId)!.player_ids
    let scorersList = []

    for(let i:number = 0; i<teamPlayers?.length; i++ ){
      let playerName = players[parseInt(props.tournamentId)-1].find(player=>teamPlayers[i]===player.id)
      let playerGoals = filterGoalsForMatchId.filter(goal=>{return teamPlayers[i]===goal.playerGoalId}).length

      for(let j:number = 0; j<playerGoals; j++){
        scorersList.push(playerName)
      }
    }
    return scorersList
  }

  const quantityGoalsForPlayer = (scorersList: ({ id: string; name: string; number?: string; picUrl: string; isCaptain?: boolean; teamId: string; } | undefined)[]) => {

    let scorers:{name:string; picUrl:string; quantity:number}[] = []

    for(let i:number = 0;i<scorersList.length;i++){
      if( scorers.find(scorer=>{return scorer.name === scorersList[i]?.name}) === undefined ){
        scorers.push({
          name: scorersList[i]?.name as string,
          picUrl: scorersList[i]?.picUrl as string,
          quantity: 1
        })        
      } else{
        scorers.find(scorer=>{return scorer.name === scorersList[i]?.name})!.quantity += 1
      }
    }

    return scorers
  }

  const getCardsForPlayer = (teamId?: string, matchId?: string) => {
    return cards[parseInt(props.tournamentId)-1].filter((card: any) => card.matchId === matchId && card.teamId === teamId);
  }

  const currentMatchModal = {
    localName:              props.currentMatchModal?.localName,
    visitorName:            props.currentMatchModal?.visitorName,
    localId:                props.currentMatchModal?.localTeamId,
    visitorId:              props.currentMatchModal?.visitorTeamId,
    localScore:             props.currentMatchModal?.localScore,
    visitorScore:           props.currentMatchModal?.visitorScore,
    isPlayOff:              props.currentMatchModal?.isPlayoff,
    stage:                  props.currentMatchModal?.stage,
    localScorePenalties:    props.currentMatchModal?.localScorePenalties,
    visitorScorePenalties:  props.currentMatchModal?.visitorScorePenalties,
    date:                   props.currentMatchModal?.date,
    time:                   props.currentMatchModal?.time,
    done:                   props.currentMatchModal?.done,
    urlLocal:               props.currentMatchModal?.urlLocal,
    urlVisitor:             props.currentMatchModal?.urlVisitor,
    urlVideo:               props.currentMatchModal?.urlVideo,
    localScorers:           quantityGoalsForPlayer(teamGoals(props.currentMatchModal?.localTeamId as string)),
    visitorScorers:         quantityGoalsForPlayer(teamGoals(props.currentMatchModal?.visitorTeamId as string)),
    localCards:             getCardsForPlayer(props.currentMatchModal?.localTeamId, props.currentMatchModal?.id),
    visitorCards:           getCardsForPlayer(props.currentMatchModal?.visitorTeamId, props.currentMatchModal?.id),
  }

  return (
    <div className='matchmodal-container'>
        <div className="modal-shields-scores">
          <div className="modal-shield-and-name">
            <img className="shield-image-modal" src={currentMatchModal.urlLocal} alt="shield"/>
            <p className="modal-team-name">{currentMatchModal.localName}</p>
          </div>
          {
            currentMatchModal?.localScore === currentMatchModal?.visitorScore && currentMatchModal?.done ? 
            <div className="score-match-modal-with-penalties">
            <p className="score-match-modal">{currentMatchModal?.done? currentMatchModal.localScore + " - "+ currentMatchModal.visitorScore:"vs"}</p>
            <p className="score-match-modal-penalties">{currentMatchModal?.done? currentMatchModal.localScorePenalties + " - "+ currentMatchModal.visitorScorePenalties:"vs"}</p>
            </div> :
            <p className="score-match-modal">{currentMatchModal?.done? currentMatchModal.localScore + " - "+ currentMatchModal.visitorScore:"vs"}</p>
          }
          <div className="modal-shield-and-name">
            <p className="modal-team-name">{currentMatchModal?.visitorName}</p>
            <img className="shield-image-modal" src={currentMatchModal?.urlVisitor} alt="shield"/>
          </div>
        </div>
        <div className="modal-date-time">
          <p>{currentMatchModal?.date}</p>
          <p>{currentMatchModal?.time}</p>
          <p className="stage">{currentMatchModal?.stage}</p>
        </div>

        {/* Agrego los jugadores que metieron gol solo si se jugó el partido */}

        {
          currentMatchModal.done === true &&
          <PlayedMatchModal
          tournamentId = {props.tournamentId}
          localCards = {currentMatchModal.localCards}
          localScorers={currentMatchModal.localScorers}
          visitorCards = {currentMatchModal.visitorCards}
          visitorScorers={currentMatchModal.visitorScorers}/>
        }

        {/* Agrego el button para ver el video del partido solo si lo hay */}

        {
          currentMatchModal.urlVideo !== undefined &&
          <PlayedMatchVideoButton 
          videoURL={currentMatchModal.urlVideo}/>
        }

    </div>
  )
}

export default MatchModal