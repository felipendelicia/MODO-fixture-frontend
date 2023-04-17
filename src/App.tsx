import {Route, Routes, BrowserRouter} from "react-router-dom"

import "./App.css"

//import { teams } from "./data/teams";

import Home from "./views/Home";
//import Team from "./views/Team";
//import Facts from "./components/Facts/Facts";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="header-logo-and-title">
          <img src="./assets/img/modo-logo.svg" alt="modo logo"/>
          <h1>Torneo de fútbol</h1>
        </div>
        <div className="header-facts">
          {/* <Facts/> */}
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home tournamentId="2"/>}/>
          <Route path="/2022" element={<Home tournamentId="1"/>}/>
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
