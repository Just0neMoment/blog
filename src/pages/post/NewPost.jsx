import React, { useState } from "react";
import { Link } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import { Button, Select, SelectItem, Input } from "@nextui-org/react";

import { useRecoilState } from "recoil";
import { themeState, userUidState } from "../../store";

function NewPost() {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useRecoilState(themeState);
  const [userUid, setUserUid] = useRecoilState(userUidState);

  const renderSelect = () => {
    if (userUid === "oTQXVkoPJXNEeWhn8ewf4EiSBnb2") {
      return (
        <Select label="카테고리를 선택해주세요.">
          <SelectItem key="잡담">잡담</SelectItem>
          <SelectItem key="TodayILearn">Today I Learn</SelectItem>
          <SelectItem key="피드백">피드백</SelectItem>
        </Select>
      );
    } else {
      return (
        <Select label="카테고리를 선택해주세요.">
          <SelectItem key="TodayILearn">피드백</SelectItem>
        </Select>
      );
    }
  };

  return (
    <>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4">
        <Input type="text" label="제목을 입력해주세요 ." />
        {renderSelect()}
        <MDEditor
          value={value}
          onChange={setValue}
          height={600}
          data-color-mode={theme}
        />
        <div className="flex justify-end gap-4">
          <Button variant="light" color="danger">
            <Link to="/Post">취소하기</Link>
          </Button>
          <Button color="primary" variant="ghost">
            등록하기
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewPost;
