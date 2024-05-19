import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Card, CardBody, Avatar, Button } from "@nextui-org/react";

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import MDEditor from "@uiw/react-md-editor";

import { useRecoilState } from "recoil";
import { themeState, userUidState } from "../../store";
import { toast } from "react-toastify";

function PostDetail() {
  const [theme, setTheme] = useRecoilState(themeState);
  const [userUid, setUserUid] = useRecoilState(userUidState);

  const { docsId } = useParams();
  const [post, setPost] = useState(null);

  const getPostDetail = async () => {
    const docRef = doc(db, "post", docsId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost(docSnap.data());
    } else {
      toast.error("게시글을 불러오는데 실패했습니다.");
    }
  };

  const deletePost = async () => {
    if (userUid !== post.writerUid) {
      return toast.error("게시글 작성자만 삭제할 수 있습니다.");
    }
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const docRef = doc(db, "post", docsId);
    await deleteDoc(docRef);
    location.replace("/");
    toast.success("게시글이 삭제되었습니다.");
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <div className="m-auto max-w-[986px]">
      {post ? (
        <>
          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <Avatar src={post.writerProfileImage} />
                <div className="flex flex-col">
                  <p className="text-[15px]">{post.title}</p>
                  <div className="flex gap-2 text-sm text-[#8d8d8d]">
                    <p>{post.writer}</p>
                    <p>|</p>
                    <p>
                      {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="absolute right-3.5 flex gap-2 text-[15px]">
                  <p>조회수 123</p>
                  <p>·</p>
                  <p>추천 0</p>
                  <p>·</p>
                  <p>댓글 0</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="my-4 flex justify-end gap-2">
            {userUid === post.writerUid ? (
              <>
                <Button color="danger" variant="ghost" onClick={deletePost}>
                  삭제하기
                </Button>
                <Link to={`/Post/${docsId}/Edit`}>
                  <Button color="primary">수정하기</Button>
                </Link>
              </>
            ) : null}
          </div>

          <Card>
            <CardBody data-color-mode={theme}>
              <MDEditor.Markdown
                style={{
                  padding: "10px 10px",
                  backgroundColor: "inherit",
                  fontSize: "15px",
                }}
                source={post.content}
              />
            </CardBody>
          </Card>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <Card className="mt-16">
        <CardBody>
          <div className="flex">
            <Avatar name="Yeonwoo" />
            <div>
              <form>
                <input
                  type="text"
                  className="w-full rounded-lg border-none p-3"
                  placeholder="댓글을 입력하세요."
                />
              </form>
              <div className="w-full">
                <div className="flex justify-end">
                  <Button color="secondary">댓글 작성</Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-3.5">
            <Avatar name="Yeonwoo" />
            <div className="flex items-center justify-between">
              <div>
                <p>Nickname</p>
                <div className="text-sm text-[#8d8d8d]">
                  <p>2024/12/22 02:45:12</p>
                </div>
              </div>
            </div>
          </div>
          <div>좋아요 버튼</div>
        </div>
        <div>
          <p>내용</p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
