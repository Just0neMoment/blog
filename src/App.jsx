import React from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";

// todo : Header.jsx / ThemeToggleButton.jsx / Home.jsx

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
