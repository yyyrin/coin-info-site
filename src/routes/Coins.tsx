import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoins } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 16px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
    font-weight: 500;
  }
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  // React Query 사용: 2개의 인자(queryKey, fetch 함수)
  // queryKey: query의 고유 식별자
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", getCoins, {
    // 4번째 매개변수로 옵션 설정 가능
    select: (data) => data.slice(0, 30),
  });

  return (
    <Container>
      <Helmet>
        <title>Cryptocurrencies</title>
      </Helmet>
      <Header>
        <Title>Cryptocurrencies</Title>
      </Header>
      {isLoading ? (
        <Loader>로딩 중...</Loader>
      ) : (
        <CoinsList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              {/* Link 컴포넌트 사용해서 코인 상세 페이지로 이동 */}
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  // state 사용해서 코인 name 전달
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
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
