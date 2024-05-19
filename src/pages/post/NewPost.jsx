import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";

import MDEditor from "@uiw/react-md-editor";

import { Button, Select, SelectItem, Input } from "@nextui-org/react";

import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

import { useRecoilState } from "recoil";
import {
  themeState,
  userUidState,
  userProfileImgState,
  userNicknameState,
} from "../../store";

function NewPost() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const [theme, setTheme] = useRecoilState(themeState);
  const [userUid, setUserUid] = useRecoilState(userUidState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);

  const navigate = useNavigate();

  if (!userUid) {
    window.confirm("로그인이 필요합니다.");
    location.replace("/");
  }

  const handleCategory = (event) => {
    setPostCategory(event.target.value);
  };

  const handleTitle = (event) => {
    setPostTitle(event.target.value);
  };

  const renderSelect = () => {
    if (userUid === "mZ6fTnE3wMWDGC8sUwqyr3Z17S93") {
      return (
        <Select label="카테고리를 선택해주세요." onChange={handleCategory}>
          <SelectItem key="잡담" value="잡담">
            잡담
          </SelectItem>
          <SelectItem key="TodayILearn" value="Today I Learn">
            Today I Learn
          </SelectItem>
          <SelectItem key="피드백" value="피드백">
            피드백
          </SelectItem>
        </Select>
      );
    } else {
      return (
        <Select label="카테고리를 선택해주세요." onChange={handleCategory}>
          <SelectItem key="피드백" value="피드백">
            피드백
          </SelectItem>
        </Select>
      );
    }
  };

  const uploadPost = async () => {
    if (!postTitle) {
      return toast.error("제목을 입력해주세요.");
    }

    if (!postCategory) {
      return toast.error("카테고리를 선택해주세요.");
    }

    if (!postContent) {
      return toast.error("내용을 입력해주세요.");
    }
    const post = {
      title: postTitle,
      content: postContent,
      category: postCategory,
      writerUid: userUid,
      writerProfileImage: userProfileImg,
      writer: userNickname,
      createdAt: new Date(),
    };
    try {
      await addDoc(collection(db, "post"), post);
      navigate("/Post");
      return toast.success("게시물이 등록되었습니다.");
    } catch (error) {
      console.log(error.message);
      return toast.error("게시물 등록에 실패했습니다.");
    }
  };

  return (
    <div className="px-4">
      <div className="mx-auto flex max-w-[968px] flex-col gap-4">
        <Input
          type="text"
          label="제목을 입력해주세요 ."
          onChange={handleTitle}
        />
        {renderSelect()}
        <MDEditor
          value={postContent}
          onChange={setPostContent}
          height={600}
          data-color-mode={theme}
        />
        <div className="flex justify-end gap-4">
          <Button variant="light" color="danger">
            <Link to="/Post">취소하기</Link>
          </Button>
          <Button color="primary" variant="ghost" onClick={uploadPost}>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
