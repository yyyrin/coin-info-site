import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  // useParams: url의 동적인 파라미터 값을 추출할 때 사용
  const { coinId } = useParams<RouteParams>();
  // useLocation: 현재 URL과 관련된 정보 포함하는 객체 반환
  // state: Link 컴포넌트를 통해 전달된 state 나타내며, 페이지 간에 데이터 전달할 때 사용
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  const getinfoData = async () => {
    const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    setInfo(res.data);
  };

  const getPriceData = async () => {
    const res = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    console.log(res.data);
    setPriceInfo(res.data);
  };

  useEffect(() => {
    getinfoData();
    getPriceData();
    setLoading(false);
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
