import React from "react";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { themeState, userUidState } from "../../store";
import { toast } from "react-toastify";

function Edit() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const [theme, setTheme] = useRecoilState(themeState);
  const [userUid, setUserUid] = useRecoilState(userUidState);

  const handleCategory = (event) => {
    setPostCategory(event.target.value);
  };

  const handleTitle = (event) => {
    setPostTitle(event.target.value);
  };

  const editPost = async () => {
    if (!postTitle) {
      return toast.error("제목을 입력해주세요.");
    }
    if (!postContent) {
      return toast.error("내용을 입력해주세요.");
    }
    if (!postCategory) {
      return toast.error("카테고리를 선택해주세요.");
    }
    try {
      const docRef = await addDoc(collection(db, "post"), {
        title: postTitle,
        content: postContent,
        category: postCategory,
        writer: userUid,
        createdAt: new Date(),
      });
      toast.success("게시글이 수정되었습니다.");
      window.location.replace(`/Post/${docRef.id}`);
    } catch (error) {
      toast.error(error.message);
    }
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
          <Button color="primary" variant="ghost" onClick={editPost}>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
