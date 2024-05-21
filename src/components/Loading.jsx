import React from "react";

import { Spinner } from "@nextui-org/react";

function Loading() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <Spinner size="lg" label="게시글을 불러오는 중입니다." />
      <p>이 창이 지속된다면 dnxks1222@gmail.com으로 문의 부탁드립니다.</p>
    </div>
  );
}

export default Loading;
