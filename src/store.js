import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoginStatState = atom({
  key: "isLoginStat",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userProfileImgState = atom({
  key: "userProfileImg",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userEmailState = atom({
  key: "userEmail",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userNicknameState = atom({
  key: "userNickname",
  default: "",
  effects_UNSTABLE: [persistAtom],
});