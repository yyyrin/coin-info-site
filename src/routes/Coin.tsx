import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

const Coin = () => {
  // useParams: url의 동적인 파라미터 값을 추출할 때 사용
  const { coinId } = useParams<RouteParams>();

  return <h1>Coin: {coinId}</h1>;
};

export default Coin;
