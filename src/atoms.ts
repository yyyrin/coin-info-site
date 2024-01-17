import { atom } from "recoil";
import { TickersData } from "./types/coinTypes";

export const isDarkAtom = atom({
  key: "isDark", // 유니크한 id
  default: true, // 기본값(초기값)
});

export const tickersDataAtom = atom<TickersData | null>({
  key: "tickersData",
  default: null,
});
