import { useQuery } from "react-query";
import { getCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string; // 시작가
  high: string; // 최고가
  low: string; // 최저가
  close: string; // 종가
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);
  // router로부터 parameter 가져오는 방법
  // 하지만 Chart 컴포넌트를 렌더링하는 Coin screen은 URL로부터 이미 coinId 값 알고 있기 때문에 props로 넘겨줘도 됨
  // const params = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => getCoinHistory(coinId),
    {
      refetchInterval: 10000, // 해당 query를 10초마다 refetch
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line" // 차트 유형
          // 차트에 표시하려는 데이터
          series={[
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) ?? [],
            },
          ]}
          // 차트의 구성 옵션
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300, // 차트의 높이
              width: 500, // 차트의 너비
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: { formatter: (value) => `$ ${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
