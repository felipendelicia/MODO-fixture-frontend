import {BrowserRouter, Routes, Route} from "react-router-dom"
import {teams} from "./data/teams"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>General</p>}/>
          <Route path="/scorers" element={<p>Goleadores</p>}/>
          {
            teams.map((teams,index)=>{
              let teamNameRoute = teams.name.replaceAll(" ", "")
              return(
                <Route path={"/team/" + teamNameRoute} element={<p>{teams.name}</p>} key={index}/>
              )
            })
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
