import MainScreen from "./pages/MainScreen.js";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Questions from "./pages/QuestionsScreen.js";
import ResultScreen from "./pages/ResultScreen.js";
import ReviewScreen from "./pages/ReviewScreen.js";

function App() {
  return (
    <div style={{ backgroundColor: "#872657" }}>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
      </Routes>
    </div>
  );
}

export default App;
