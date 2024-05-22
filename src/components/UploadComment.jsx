import React, { useState } from "react";
import { useParams } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import { Card, CardBody, Avatar, Button } from "@nextui-org/react";

import {
  userProfileImgState,
  themeState,
  userNicknameState,
  userUidState,
} from "../store";
import { useRecoilState } from "recoil";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { toast } from "react-toastify";

function Comment() {
  const [comment, setComment] = useState("");

  const [theme, setTheme] = useRecoilState(themeState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);
  const [userUid, setUserUid] = useRecoilState(userUidState);

  const { docsId } = useParams();

  const uploadComment = async () => {
    if (!comment) {
      return toast.error("내용을 입력해주세요.");
    }
    if (!userNickname) {
      return toast.error("로그인이 필요합니다.");
    }
    const commentInfo = {
      comment: comment,
      nickname: userNickname,
      writerProfileImage: userProfileImg,
      writerUid: userUid,
      createdAt: new Date(),
      likers: [],
    };
    try {
      await addDoc(collection(db, "post", docsId, "comments"), commentInfo);
      location.reload();
      return toast.success("댓글이 등록되었습니다.");
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      <Card className="mt-16">
        <CardBody>
          <div className="flex gap-4">
            <Avatar src={userProfileImg} />
            <div className="flex w-full flex-col gap-3">
              <MDEditor
                height="130px"
                data-color-mode={theme}
                value={comment}
                onChange={setComment}
              />
              <div className="w-full">
                <div className="flex justify-end">
                  <Button color="primary" onClick={uploadComment}>
                    댓글 작성
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Comment;
