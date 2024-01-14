import { useQuery } from "react-query";
import { getCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  // router로부터 parameter 가져오는 방법
  // 하지만 Chart 컴포넌트를 렌더링하는 Coin screen은 URL로부터 이미 coinId 값 알고 있기 때문에 props로 넘겨줘도 됨
  // const params = useParams();
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    getCoinHistory(coinId)
  );

  return <h1>Chart</h1>;
};

export default Chart;
