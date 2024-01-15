import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // 유니크한 id
  default: true, // 기본값(초기값)
});
