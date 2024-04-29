import React from "react";

import { Card, CardBody, Avatar, Button } from "@nextui-org/react";

function PostDetail() {
  return (
    <div className="m-auto max-w-[986px]">
      <Card>
        <CardBody>
          <div className="flex items-center gap-4">
            <Avatar name="Yeonwoo" />
            <div className="flex flex-col">
              <p className="text-[15px]">
                TIL 블로그 리팩토링에서 파이어베이스 및 리액트
              </p>
              <div className="flex gap-2 text-sm text-[#8d8d8d]">
                <p>Nickname</p>
                <p>|</p>
                <p>2024/12/22 02:10:42</p>
              </div>
            </div>
            <div className="absolute right-3.5 flex gap-2 text-[15px]">
              <p>조회수 100</p>
              <p>·</p>
              <p>추천 3</p>
              <p>·</p>
              <p>댓글 5</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-8">
        <CardBody>
          <p>
            리액트와 파이어베이스를 사용하여 TIL 블로그를 리팩토링하는 중입니다.
            리액트와 파이어베이스는 강력한 조합이며, 데이터베이스와 사용자 인증
            등 다양한 기능을 제공합니다. 리팩토링을 통해 코드의 가독성과
            유지보수성을 향상시키고, 사용자들에게 더 나은 경험을 제공할 수
            있습니다. 리액트와 파이어베이스를 함께 사용하는 방법에 대해 더
            알아보고 싶다면 공식 문서를 참조하세요.
          </p>
        </CardBody>
      </Card>

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
                  <Button color="secondary">Primary</Button>
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
