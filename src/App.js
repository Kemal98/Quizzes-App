import { Route, Routes } from "react-router-dom";
import ListQuizzes from "./pages/ListQuizzes";
import ViewQuiz from "./pages/ViewQuiz";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ListQuizzes />} />
        <Route path="/quiz/:id" element={<ViewQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
