import "./App.css"

import BestScorers from "./components/BestScorers/BestScorers";

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="./assets/img/modo-logo.svg" alt="modo logo"/>
        <h1>Torneo de fútbol</h1>
      </div>
      <div className="container">
        <BestScorers/>
      </div>
    </div>
  );
}

export default App;
