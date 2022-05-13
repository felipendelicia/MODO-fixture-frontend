import "./App.css"

import Fixture from "./components/Fixture/Fixture";

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="./assets/img/modo-logo.svg" alt="modo logo"/>
        <h1>Torneo de fútbol</h1>
      </div>
      <div className="container">
        <Fixture/>
      </div>
    </div>
  );
}

export default App;
