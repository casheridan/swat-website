import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/HomePage/Home";
import Awards from "./components/pages/AwardsPage/Awards";
import Join from "./components/pages/JoinPage/Join";
import About from "./components/pages/AboutPage/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/join" element={<Join />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </Router>
  );
}
