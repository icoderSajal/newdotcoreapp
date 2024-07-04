import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./_conponents/Login";
import Authenticate from "./_conponents/Authenticate";
import Layout from "./_conponents/Layout";
import Quiz from "./_conponents/Quiz";
import Result from "./_conponents/Result"; 
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Authenticate />}>
            <Route path="/" element={<Layout />}>
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
