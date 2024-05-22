import React, { useEffect, useState } from "react";

import { Avatar } from "@nextui-org/react";

import { db } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Comments() {
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
