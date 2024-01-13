import axios from "axios";

// Promise 사용
// export function fetchCoins() {
//   return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
//     response.json()
//   );
// }

const BASE_URL = `https://api.coinpaprika.com/v1`;

// axios 사용
export const getCoins = async () => {
  return await axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};

export const getCoinInfo = async (coinId: string) => {
  return await axios.get(`${BASE_URL}/coins/${coinId}`).then((res) => res.data);
};

export const getCoinTickers = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.data);
};
