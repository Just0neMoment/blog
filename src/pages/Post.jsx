import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

function Post() {
  return (
    <>
      <div className="m-auto max-w-[1220px]">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Post ID</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Username</TableColumn>
            <TableColumn>작성일</TableColumn>
            <TableColumn>조회수</TableColumn>
            <TableColumn>추천</TableColumn>
            <TableColumn>댓글</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>1</TableCell>
              <TableCell>
                TIL 블로그 리팩토링에서 파이어베이스 및 리액트
              </TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024/12/22</TableCell>
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
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Post;
