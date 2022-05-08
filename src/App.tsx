import {BrowserRouter, Routes, Route} from "react-router-dom"
import {teams} from "./data/teams"
import Scorers from "./components/Scorers/Scorers";
import Team from "./components/Team/Team";
import General from "./components/General/General";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<General/>}/>
          <Route path="/scorers" element={<Scorers/>}/>
          {
            teams.map((teams,index)=>{
              let teamNameRoute = teams.name.replaceAll(" ", "")
              return(
                <Route path={"/team/" + teamNameRoute} element={<Team/>} key={index}/>
              )
            })
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
