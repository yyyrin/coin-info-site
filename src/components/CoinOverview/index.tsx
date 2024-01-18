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
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const [tickersData, setTickersData] = useRecoilState(tickersDataAtom);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => getCoinInfo(coinId)
  );

  const { isLoading: tickersLoading, data: fetchedtickersData } =
    useQuery<TickersData>(["tickers", coinId], () => getCoinTickers(coinId));

  const loading = infoLoading || tickersLoading;
  const history = useHistory();
  const handleBackButtonClick = () => {
    history.push("/");
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
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </style.Title>
        <style.RightComponent />
      </style.Header>
      {loading ? (
        <style.Loader>{state?.name} 로딩 중...</style.Loader>
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
          <style.Tabs>
            <style.Tab $isActive={chartMatch !== null}>
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
