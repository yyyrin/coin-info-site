import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

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

export const getCoinHistory = async (coinId: string) => {
  return await axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.data);
};
