import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface IChart {
  x: Date;
  y: number[];
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const test = data?.map((price) => {
    return [price.time_close, price.open, price.high, price.low, price.close];
  });

  return (
    <>
      <Helmet>
        <title>Chart</title>
      </Helmet>
      <h1>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="candlestick"
            series={[
              {
                name: "Price",
                data: data?.map((props) => {
                  return {
                    x: new Date(props.time_open * 1000),
                    y: [
                      Number(props.open),
                      Number(props.high),
                      Number(props.low),
                      Number(props.close),
                    ],
                  };
                }) as IChart[],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                labels: {
                  show: false,
                  datetimeFormatter: {
                    month: "MMM 'yy",
                  },
                },
                axisTicks: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close * 1000),
              },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value}`,
                },
              },
            }}
          />
        )}
      </h1>
    </>
  );
}

export default Chart;
