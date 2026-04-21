import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Quiz from "./Quiz";
import Result from "./Result";
import Leaderboard from "./Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />   
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;