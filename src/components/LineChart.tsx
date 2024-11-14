import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { lineChartOptions } from "./LineChartOptions";
import { IAggResponseFormatted } from "polygon.io";
import { IAggV2Formatted } from "polygon.io/lib/rest/stocks/aggregates";

function formatData(stockResults: IAggResponseFormatted) {
  // avoid recalculation same results during rerender
  return {
    labels: stockResults.results.map((data: IAggV2Formatted) => {
      const date = new Date(data.timestamp!);
      return date.toDateString();
    }),
    datasets: [
      {
        label: stockResults.ticker,
        data: stockResults.results.map((data: IAggV2Formatted) => data.close),
        borderColor: "green",
        borderWidth: 3,
      },
    ],
  };
}

function LineChart({ stockResults }: { stockResults: IAggResponseFormatted }) {
  const chartData = useMemo(() => formatData(stockResults), [stockResults]); // only recalculate if 'stockResults' changes

  return (
    <div className="chart-container">
      <h2>Line Chart</h2>
      <Line data={chartData} options={lineChartOptions} />
    </div>
  );
}
export default LineChart;
