import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function Post() {
  const [currentItems, setCurrentItems] = useState([]);

  const getPostList = async () => {
    const items = query(collection(db, "post"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(items);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
    }));
    setCurrentItems(newData);
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <>
      <div className="m-auto flex max-w-[1220px] flex-col gap-3">
        <div className="flex justify-end">
          <Link to="/Post/NewPost">
            <Button
              color="primary"
              className="gap-1"
              startContent={<TiPencil className="text-[18px]" />}
            >
              글쓰기
            </Button>
          </Link>
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Category</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Username</TableColumn>
            <TableColumn>작성일</TableColumn>
            <TableColumn>조회수</TableColumn>
            <TableColumn>추천</TableColumn>
            <TableColumn>댓글</TableColumn>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Link className="hover:text-primary" to={`/Post/${item.id}`}>{item.title}</Link>
                </TableCell>
                <TableCell>{item.writer}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>123</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FaRegHeart /> 3
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <IoChatboxEllipsesOutline /> 3
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Post;
