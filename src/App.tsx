import {Route, Routes, BrowserRouter} from "react-router-dom"

import "./App.css"

import Home from "./views/Home";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
