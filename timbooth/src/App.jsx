import Home from "./pages/Home";
import Booth from "./pages/Booth";
import About from "./pages/About";
import Profile from "./pages/Profile";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/booth" element={<Booth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
