import React, { useEffect, useState } from 'react'

import "./BestScorers.css"

import { players } from "../../data/players"
import { goals } from "../../data/goals"
import { teams } from "../../data/teams"

const PIC_BESTCORERS_CLASS: { [key: number]: string } = {
    0: "gold-border",
    1: "silver-border",
    2: "bronze-border"
}

enum SHOW_ALL_BUTTON_TEXT_OPTIONS {
    SHOW_MORE = "Ver más",
    SHOW_LESS = "Ver menos"
}

interface IPlayer {
    id: string;
    name: string;
    picUrl: string;
    teamName: string;
    playerGoals: number;
    teamLogo: string;
}

interface CardProps {
    name: string
    color: string
    photo: string
    logo: string
    i: number
}

const Card = (props: CardProps) => {
    const { name, color, photo, logo, i } = props;

    return (
        <>
            <div className={`pic-bestscorer-name card-more-than-one`}>
                <img className={`pic-bestscorer ${color}`} src={photo} alt="player" />
                <img className="bestscorer-team-logo" src={logo} alt="teamLogo" />
                <p className="bestscorer-name">{name}</p>
                <div className="golden-boot-container">
                    {i === 0 ? <img className="golden-boot" src='./assets/img/botin_oro.png' alt="golden-boot" /> : <></>}
                </div>
            </div>
        </>
    )
}

const BestScorers = () => {
    const [playersList, setPlayersList] = useState<IPlayer[][]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [ToggleShowText, setToggleShowText] = useState<SHOW_ALL_BUTTON_TEXT_OPTIONS>(SHOW_ALL_BUTTON_TEXT_OPTIONS.SHOW_MORE);

    useEffect(() => {
        const allPlayers = players.map((player) => {
            const teamObj = teams.find(team => team.id === player.teamId)!;
            return (
                {
                    id: player.id,
                    name: player.name,
                    picUrl: player.picUrl,
                    teamName: teamObj.name,
                    teamLogo: teamObj.url,
                    playerGoals: goals.filter(goal => { return goal.playerGoalId === player.id }).length
                }
            )
        })

        let sortedPlayers = allPlayers.sort((a, b) => { return b.playerGoals - a.playerGoals })
        sortedPlayers = sortedPlayers.filter((player) => { return player.playerGoals > 0 })

        let groupedPlayers = [];

        for (let i = 0; i < sortedPlayers.length; i++) {
            if (groupedPlayers.length > 0) {
                const lastPlayer = groupedPlayers[groupedPlayers.length - 1];

                if (lastPlayer && lastPlayer[0].playerGoals === sortedPlayers[i].playerGoals) {
                    groupedPlayers[groupedPlayers.length - 1].push(sortedPlayers[i]);
                } else {
                    groupedPlayers.push([sortedPlayers[i]]);
                }
            } else {
                groupedPlayers.push([sortedPlayers[i]])
            }
        }

        if (showAll) {
            setPlayersList(groupedPlayers)
        } else {
            setPlayersList(groupedPlayers.slice(0, 3))
        }
    }, [showAll])

    const ToggleShow = () => {
        setShowAll(!showAll)
        setToggleShowText(showAll ? SHOW_ALL_BUTTON_TEXT_OPTIONS.SHOW_MORE : SHOW_ALL_BUTTON_TEXT_OPTIONS.SHOW_LESS)
    }

    return (
        <div className="bestscorers-container">
            <h3>Goleadores</h3>
            {playersList.map((group: IPlayer[], i: number) => {
                const className = PIC_BESTCORERS_CLASS[i];
                const goals = group? group[0].playerGoals : '';
                return (
                    <div className='bestscorer-container-group'>
                        <p className="bestscorer-goals">{goals}</p>
                        <div className={`bestscorer-container more-than-one`} key={i}>
                            {group.map((player: IPlayer) => {

                                return <Card 
                                name={player.name}
                                photo={player.picUrl}
                                logo={player.teamLogo}
                                color={className}
                                i={i}/>
                                })}
                        </div>
                    </div>
                )
            })}
            <div className="bestscorers-footer">
                <button className="btn-bestscorers" onClick={ToggleShow}>{ToggleShowText}</button>
            </div>
        </div>
    )
}

export default BestScorers