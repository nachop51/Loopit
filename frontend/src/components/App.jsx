import "./App.css";
import React from "react";
import Logo from "./Logo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import LoopitApp from "./Loopit";

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<LoopitApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
