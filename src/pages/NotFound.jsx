import React from "react";

import { Image, Code, Link } from "@nextui-org/react";

function NotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-10">
      <Code color="danger" size="md">
        404 Not Found - 페이지를 찾을 수 없습니다.
      </Code>
      <Image width={400} src="src\assets\notFoundImg.png" alt="notFoundImg" />
      <Link href="/" showAnchorIcon>
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export default NotFound;
