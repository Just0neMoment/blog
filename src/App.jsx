import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useRecoilState } from "recoil";
import {
  isLoginStatState,
  userProfileImgState,
  userEmailState,
  userNicknameState,
  userUidState,
  themeState,
} from "./store.js";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";

import "./index.css";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/post/Post.jsx";
import NotFound from "./pages/NotFound.jsx";
import PostDetail from "./pages/post/PostDetail.jsx";
import Profile from "./pages/Profile.jsx";
import NewPost from "./pages/post/NewPost.jsx";
import Edit from "./pages/post/Edit.jsx";

function App() {
  const [isLoginStat, setIsLoginStat] = useRecoilState(isLoginStatState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);
  const [userUid, setUserUid] = useRecoilState(userUidState);
  const [theme, setTheme] = useRecoilState(themeState);

  const getUserInfo = async () => {
    try {
      await getDoc(doc(db, "userInfo", auth.currentUser.email)).then((doc) => {
        setUserEmail(doc.data().email);
        setUserNickname(doc.data().nickname);
        setUserProfileImg(doc.data().profileImg);
      });
    } catch {
      return toast.error("유저 정보를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    let Theme = localStorage.getItem("Theme");
    document.querySelector("html").classList.add(Theme);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoginStat(true);
        setUserUid(auth.currentUser.uid);
        setTheme(localStorage.getItem("Theme"));
        getUserInfo();
      } else {
        return setIsLoginStat(false);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <ToastContainer
        position="bottom-right"
        theme={localStorage.getItem("Theme")}
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Post/:docsId" element={<PostDetail />} />
        <Route path="/Post/NewPost" element={<NewPost />} />
        <Route path="/Post/:docsId/Edit" element={<Edit />} />

        <Route path="/Profile" element={<Profile />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
