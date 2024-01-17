import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCoins } from "../../api";
import { Helmet } from "react-helmet-async";
import { ICoin } from "../../types/listCoinsTypes";
import * as style from "./styles";

const Coins = () => {
  // React Query 사용: 2개의 인자(queryKey, fetch 함수)
  // queryKey: query의 고유 식별자
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", getCoins, {
    // 4번째 매개변수로 옵션 설정 가능
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
              {/* Link 컴포넌트 사용해서 코인 상세 페이지로 이동 */}
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  // state 사용해서 코인 name 전달
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

/*
React Query
- React 애플리케이션에서 서버 state를 fetching, caching, synchronizing, updating 할 수 있도록 도와주는 라이브러리
- "global state"를 건드리지 않고 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트함
- React Query는 queryKey를 기반으로 쿼리 캐싱을 관리하며, 각 쿼리에 대한 인라인 캐싱과 공유 캐시도 지원
- useQuery에서 반환된 쿼리 결과에는 템플릿 및 기타 데이터 사용에 필요한 쿼리에 대한 모든 정보가 포함되어 있음
*/
