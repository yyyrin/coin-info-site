import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { getCoinInfo, getCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";
import { ReactComponent as ArrowIc } from "../assets/arrowIc.svg";
import { InfoData, TickersData } from "../types/coinTypes";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  margin: 30px 20px;
  justify-content: space-between;
`;

const BackIcStyle = styled(ArrowIc)`
  width: 40px;
  height: 40px;
  fill: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
`;

const RightComponent = styled.div`
  width: 40px;
  height: 40px;
  visibility: hidden;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 16px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  line-height: 1.3;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 2px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 16px;
`;

const Tab = styled.span<{ $isActive: Boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {
  // useParams: url의 동적인 파라미터 값을 추출할 때 사용
  const { coinId } = useParams<RouteParams>();
  // useLocation: 현재 URL과 관련된 정보 포함하는 객체 반환
  // state: Link 컴포넌트를 통해 전달된 state 나타내며, 페이지 간에 데이터 전달할 때 사용
  const { state } = useLocation<RouteState>();
  // useRouteMatch: 현재 URL이 특정 경로에 일치하는지 여부를 확인하고 일치하는 경우에 대한 정보를 얻을 때 사용
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => getCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersData>(["tickers", coinId], () => getCoinTickers(coinId), {
      // refetchInterval: 5000, // 해당 query를 5초마다 refetch
    });

  const loading = infoLoading || tickersLoading;

  // useHistory: URL 주소를 변경할 때 사용하는 Hook
  const history = useHistory();
  const handleBackButtonClick = () => {
    history.push("/"); // 브라우저의 주소를 변경하고 해당 주소로 이동
  };

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackIcStyle onClick={handleBackButtonClick} />
        <Title>
          {/* 홈페이지로부터 온 게 아닌 경우도 고려(url로부터 name 받는 방식과 api로 name 받는 방식) */}
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </Title>
        <RightComponent />
      </Header>
      {loading ? (
        <Loader>{state.name} 로딩 중...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>티커</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>현재가</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Overview>{infoData?.description}</Overview>
          {/* <a>는 페이지 전체를 새로고침하기 때문에 Link 사용 */}
          {/* Link를 사용하여 URL을 바꿈으로써 트리거가 되어 re-render */}
          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};

export default Coin;

/* Nested Routes (중첩 라우드 사용하기)
- 페이지 내부에서 페이지 이동없이 또다른 페이지에 방문할 수 있게 해줌
- url 변경됨
*/
