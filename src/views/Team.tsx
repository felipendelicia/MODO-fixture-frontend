interface teamPropTypes {
  teamObject: { id: string; name: string; player_ids: string[]; points: number; wins: number; draws: number; defeats: number; group: string; url: string; }
}

const Team = (props:teamPropTypes) => {
  return (
    <div className="container">
        {props.teamObject.name}
    </div>
  )
}

export default Team