import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useQuery } from "react-query";
import { getCoinInfo, getCoinTickers } from "../../api";
import { Helmet } from "react-helmet-async";
import { InfoData, TickersData } from "../../types/coinTypes";
import { useRecoilState } from "recoil";
import { tickersDataAtom } from "../../atoms";
import { useEffect } from "react";
import * as style from "./styles";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const CoinOverview = () => {
  // useParams: url의 동적인 파라미터 값을 추출할 때 사용
  const { coinId } = useParams<RouteParams>();
  // useLocation: 현재 URL과 관련된 정보 포함하는 객체 반환
  // state: Link 컴포넌트를 통해 전달된 state 나타내며, 페이지 간에 데이터 전달할 때 사용
  const { state } = useLocation<RouteState>();
  // useRouteMatch: 현재 URL이 특정 경로에 일치하는지 여부를 확인하고 일치하는 경우에 대한 정보를 얻을 때 사용
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const [tickersData, setTickersData] = useRecoilState(tickersDataAtom);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => getCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: fetchedtickersData } =
    useQuery<TickersData>(["tickers", coinId], () => getCoinTickers(coinId), {
      // refetchInterval: 5000, // 해당 query를 5초마다 refetch
    });

  const loading = infoLoading || tickersLoading;

  // useHistory: URL 주소를 변경할 때 사용하는 Hook
  const history = useHistory();
  const handleBackButtonClick = () => {
    history.push("/"); // 브라우저의 주소를 변경하고 해당 주소로 이동
  };

  useEffect(() => {
    if (fetchedtickersData) {
      setTickersData(fetchedtickersData);
    }
  }, [fetchedtickersData, setTickersData]);

  return (
    <>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </title>
      </Helmet>
      <style.Header>
        <style.BackIcStyle onClick={handleBackButtonClick} />
        <style.Title>
          {/* 홈페이지로부터 온 게 아닌 경우도 고려(url로부터 name 받는 방식과 api로 name 받는 방식) */}
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </style.Title>
        <style.RightComponent />
      </style.Header>
      {loading ? (
        <style.Loader>{state.name} 로딩 중...</style.Loader>
      ) : (
        <>
          <style.Overview>
            <style.OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </style.OverviewItem>
            <style.OverviewItem>
              <span>티커</span>
              <span>{infoData?.symbol}</span>
            </style.OverviewItem>
            <style.OverviewItem>
              <span>현재가</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </style.OverviewItem>
          </style.Overview>
          <style.Overview>
            <style.OverviewItem>
              <span>총량</span>
              <span>{tickersData?.total_supply}</span>
            </style.OverviewItem>
            <style.OverviewItem>
              <span>최대 발행량</span>
              <span>{tickersData?.max_supply}</span>
            </style.OverviewItem>
          </style.Overview>
          <style.Overview>{infoData?.description}</style.Overview>
          {/* <a>는 페이지 전체를 새로고침하기 때문에 Link 사용 */}
          {/* Link를 사용하여 URL을 바꿈으로써 트리거가 되어 re-render */}
          <style.Tabs>
            <style.Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/chart`}>+ Chart</Link>
            </style.Tab>
            <style.Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>+ Price</Link>
            </style.Tab>
          </style.Tabs>
        </>
      )}
    </>
  );
};

export default CoinOverview;

/* Nested Routes (중첩 라우드 사용하기)
- 페이지 내부에서 페이지 이동없이 또다른 페이지에 방문할 수 있게 해줌
- url 변경됨
*/
