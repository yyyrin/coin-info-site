import { useQuery } from "react-query";
import { getCoinHistory } from "../../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../atoms";
import { IHistorical } from "../../types/coinTypes";
import * as style from "./styles";

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    getCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <style.ChartContainer>
          <ReactApexChart
            type="line"
            series={[
              {
                name: "price",
                data: data?.map((price) => Number(price.close)) ?? [],
              },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              chart: {
                height: 300,
                width: 500,
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
          <ReactApexChart
            type="candlestick"
            height={300}
            series={[
              {
                data:
                  data?.map((price) => ({
                    x: new Date(price.time_close * 1000).toUTCString(),
                    y: [
                      Number(price.open),
                      Number(price.high),
                      Number(price.low),
                      Number(price.close),
                    ],
                  })) ?? [],
              },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              chart: {
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              xaxis: {
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
                type: "datetime",
              },
              yaxis: {
                show: false,
              },
              grid: {
                show: false,
              },
            }}
          />
        </style.ChartContainer>
      )}
    </div>
  );
};

export default Chart;
