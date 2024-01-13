import axios from "axios";

// Promise 사용
// export function fetchCoins() {
//   return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
//     response.json()
//   );
// }

// axios 사용
export const getCoins = async () => {
  return await axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
};
