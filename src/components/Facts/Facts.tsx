import React, { useEffect, useState } from 'react';
import { goals } from "../../data/goals";
import { players } from "../../data/players"
import "./Facts.css";

const TotalGoals = () => {
    const [fact, setFact] = useState<{ title: string, content: string }>({ title: "", content: "" });

    useEffect(() => {
        setFact({ title: "Goles totales", content: goals.length.toString() })
    }, []);

    return (
        <div className="fact-list-container">
            <div className="fact-container">
                <h3>{fact.title}</h3>
                <p>{fact.content}</p>
            </div>
        </div>
    )
}

const MoreGoalsOneMatch = () => {
    interface IGoals {
        id: string,
        matchId: string,
        playerGoalId: string,
        teamId: string,
        teamReceivedId: string
    }
    const [fact, setFact] = useState<{ title: string, content: string }>({ title: "", content: "" });

    useEffect(() => {
        const matches: IGoals[][] = []
        const sortedGoals = goals.sort((a, b) => (a.matchId > b.matchId) ? 1 : -1);
        for (let i = 0; i < sortedGoals.length; i++) {
            if (matches.length) {
                const lastMatch = matches[matches.length - 1];
                if (lastMatch[lastMatch.length - 1].matchId === sortedGoals[i].matchId) {
                    lastMatch.push(sortedGoals[i]);
                } else {
                    matches.push([sortedGoals[i]]);
                }
            } else {
                matches.push([sortedGoals[i]])
            }
        }
        let candidate = { id: '', goals: 0 };

        for (let i = 0; i < matches.length; i++) {
            const counts: any = {};
            const sampleArray = matches[i];
            sampleArray.forEach((element: IGoals) => { counts[element.playerGoalId] = (counts[element.playerGoalId] || 0) + 1; });
            const idBest = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            if (counts[idBest] > candidate.goals) {
                candidate = { id: idBest, goals: counts[idBest] };
            }
        }

        const name = players.find((player: any) => player.id === candidate.id)?.name;

        setFact({ title: "Más goles en un partido:", content: `${name} (${candidate.goals})` })
    }, []);

    return (
        <div className="fact-list-container">
            <div className="fact-container">
                <h3>{fact.title}</h3>
                <p>{fact.content}</p>
            </div>
        </div>
    )
}

const Fact = (props: any) => {
    return props.children
}

const Facts = () => {
    const CURRENT_FACT_LIMIT = 1;
    const [currentFact, setCurrentFact] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if(currentFact < CURRENT_FACT_LIMIT) {
                setCurrentFact(currentFact + 1);
            } else {
                setCurrentFact(0);
            }
        }, 3000);
        return () => clearInterval(interval);
      }, [currentFact]);

    return (
        <>
            <Fact>
                {
                    currentFact === 0? <MoreGoalsOneMatch /> : null                
                }
                {
                    currentFact === 1? <TotalGoals /> : null
                }
            </Fact>
        </>
    )
}

export default Facts
