import React, { useEffect, useState } from "react";

import { Avatar } from "@nextui-org/react";

import { db } from "../firebase/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import { Card, CardBody, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import {
  themeState,
  userProfileImgState,
  userNicknameState,
  userUidState,
} from "../store";



function Comments() {
  const [comment, setComment] = useState("");

  const [theme, setTheme] = useRecoilState(themeState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);
  const [userUid, setUserUid] = useRecoilState(userUidState);

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
      setComment("");
      getComments();
      return toast.success("댓글이 등록되었습니다.");
    } catch (error) {
      return console.log(error);
    }
  };

  const [currentItems, setCurrentItems] = useState([]);

  const { docsId } = useParams();

  const getComments = async () => {
    const items = collection(db, "post", docsId, "comments");
    const querySnapshot = await getDocs(items);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    }));
    setCurrentItems(newData);
  };

  useEffect(() => {
    getComments();
  }, []);

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
      {currentItems.map((item) => (
        <div className="mt-10" key={item.id}>
          <div className="flex items-center justify-between">
            <div className="flex gap-3.5">
              <Avatar src={item.writerProfileImage} />
              <div className="flex items-center justify-between">
                <div>
                  <p>{item.nickname}</p>
                  <div className="text-sm text-[#8d8d8d]">
                    <p>{item.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>좋아요 버튼</div>
          </div>
          <div>
            <p>{item.comment}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;
