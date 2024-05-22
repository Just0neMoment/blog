import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Card, CardBody, Avatar, Button, Divider } from "@nextui-org/react";

import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import MDEditor from "@uiw/react-md-editor";

import { useRecoilState } from "recoil";
import { themeState, userUidState } from "../../store";
import { toast } from "react-toastify";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import Loading from "../../components/Loading";
import Comments from "../../components/comments";

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

  const likePost = async () => {
    if (post.likers.includes(userUid)) {
      return toast.error("이미 좋아요를 누르셨습니다.");
    }

    try {
      const docRef = doc(db, "post", docsId);
      await updateDoc(docRef, {
        likers: [...post.likers, userUid],
      });
      getPostDetail();
      return toast.success("좋아요가 반영되었습니다.");
    } catch {
      return toast.error("좋아요 반영에 실패했습니다.");
    }
  };

  const unLikePost = async () => {
    if (!post.likers.includes(userUid)) {
      return toast.error("좋아요를 누르지 않으셨습니다.");
    }

    try {
      const docRef = doc(db, "post", docsId);
      await updateDoc(docRef, {
        likers: post.likers.filter((liker) => liker !== userUid),
      });
      getPostDetail();
      return toast.success("좋아요가 취소되었습니다.");
    } catch {
      return toast.error("좋아요 취소에 실패했습니다.");
    }
  };

  const plusView = async () => {
    const docRef = doc(db, "post", docsId);
    await updateDoc(docRef, {
      views: post.views + 1,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPostDetail();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (post) {
      plusView();
    }
  }, [post]);

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
                      {post.createdAt.toDate().toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </p>
                  </div>
                </div>
                <div className="absolute right-3.5 flex gap-2 text-[14px]">
                  <p>조회수 {post.views}</p>
                  <p>·</p>
                  <p>추천 {post.likers.length}</p>
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
              <Divider />
              <div className="mt-3 flex justify-end gap-1.5">
                {post.likers.includes(userUid) ? (
                  <button onClick={unLikePost}>
                    <FaHeart color="#11ddaa" className="text-2xl" />
                  </button>
                ) : (
                  <button onClick={likePost}>
                    <FaRegHeart color="#11ddaa" className="text-2xl" />
                  </button>
                )}
                {post.likers.length}
              </div>
            </CardBody>
          </Card>

          <Comments />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PostDetail;
