import {Route, Routes, BrowserRouter} from "react-router-dom"

import "./App.css"

import { teams } from "./data/teams";

import Home from "./views/Home";
import Team from "./views/Team"

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="./assets/img/modo-logo.svg" alt="modo logo"/>
        <h1>Torneo de fútbol</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {
            teams.map((team, index)=>{
              return(
                <Route path={"/team/" + team.id} element={<Team teamObject={team}/>} key={index}/>
              )
            })
          }
        </Routes>
      </BrowserRouter>
      <div className="footer">
        <div>
        <h4>Created by <a href="https://www.linkedin.com/in/felipe-nahuel-delicia-b2487119a/">Felipe Delicia</a> & <a href="https://www.linkedin.com/in/lucasdellasala/">Vlady</a></h4>
        </div>
      </div>
    </div>
  );
}

export default App;
