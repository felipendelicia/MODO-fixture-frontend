import Carrousel from "./components/Carrousel/Carrousel";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Torneo de fútbol</h1>
        <img src="https://merchants.modo.com.ar/img/home/modo-logo.svg" alt="modo logo"/>
      </div>
      <div className="container">
        <Carrousel/>
        {/* <Fixture/>
        <BestScorers/> */}
      </div>
    </div>
  );
}

export default App;
