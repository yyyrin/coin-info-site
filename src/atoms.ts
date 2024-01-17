import { atom } from "recoil";
import { TickersData } from "./types/coinTypes";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const tickersDataAtom = atom<TickersData | null>({
  key: "tickersData",
  default: null,
});
