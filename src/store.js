import { atom } from "recoil";
import { auth } from "./firebase/firebase";

export const isLoginStatState = atom({
  key: "isLoginStat",
  default: auth.currentUser,
});