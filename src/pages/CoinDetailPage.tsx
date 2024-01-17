import { Route, Switch, useParams } from "react-router-dom";
import CoinOverview from "../components/CoinOverview";
import Price from "../components/Price";
import Chart from "../components/Chart";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

interface RouteParams {
  coinId: string;
}

const CoinDetailPage = () => {
  const { coinId } = useParams<RouteParams>();

  return (
    <Container>
      <CoinOverview />
      <Switch>
        <Route path="/:coinId/price">
          <Price />
        </Route>
        <Route path="/:coinId/chart">
          <Chart coinId={coinId} />
        </Route>
      </Switch>
    </Container>
  );
};

export default CoinDetailPage;
