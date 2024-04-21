import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoginStatState } from "./store.js";
import { auth } from "./firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import "./index.css";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";

// todo : Header.jsx / ThemeToggleButton.jsx / SignupModal.jsx
//        새로고침 했을 때 로그인 상태 유지 안 됨 해결하기

function App() {
  const [isLoginStat, setIsLoginStat] = useRecoilState(isLoginStatState);

  useEffect(() => {
    let Theme = localStorage.getItem("Theme");
    document.querySelector("html").classList.add(Theme);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoginStat(true);
      } else {
        setIsLoginStat(false);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post" element={<Post />} />

        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
