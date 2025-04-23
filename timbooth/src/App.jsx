import Home from "./pages/Home";
import Booth from "./pages/Booth";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/booth" element={<Booth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
