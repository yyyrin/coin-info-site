import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCoins } from "../../api";
import { Helmet } from "react-helmet-async";
import { ICoin } from "../../types/listCoinsTypes";
import * as style from "./styles";

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", getCoins, {
    select: (data) => data.slice(0, 30),
  });

  return (
    <style.Container>
      <Helmet>
        <title>Cryptocurrencies</title>
      </Helmet>
      <style.Header>
        <style.Title>Cryptocurrencies</style.Title>
      </style.Header>
      {isLoading ? (
        <style.Loader>로딩 중...</style.Loader>
      ) : (
        <style.CoinsList>
          {data?.map((coin) => (
            <style.Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <style.Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </style.Coin>
          ))}
        </style.CoinsList>
      )}
    </style.Container>
  );
};

export default Coins;
