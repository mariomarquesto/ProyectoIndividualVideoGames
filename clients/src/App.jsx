import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import GameDetails from "./components/GameDetails/GameDetails";
import Create from "./components/Create/Create";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games/:idVideoGame" element={<GameDetails />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
