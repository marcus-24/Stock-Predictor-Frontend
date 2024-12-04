import { useMemo, ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { lineChartOptions } from "./LineChartOptions";
import { IStock } from "../interfaces";

//Reference: https://medium.com/@arifwaghbakriwala97/time-series-prediction-intervals-1866545a5554

function formatData(stockResults: IStock[]) {
  // avoid recalculation same results during rerender
  return {
    labels: stockResults.map((data: IStock) => {
      const date = new Date(data.Date!);
      return date.toDateString();
    }),
    datasets: [
      {
        label: "AAPL", //todo: Need to make this an input
        data: stockResults.map((data: IStock) => data.Close),
        borderColor: "green",
        borderWidth: 3,
      },
    ],
  };
}

function LineChart({ stockResults }: { stockResults: IStock[] }): ReactElement {
  const chartData = useMemo(() => formatData(stockResults), [stockResults]); // only recalculate if 'stockResults' changes

  return (
    <div className="chart-container">
      <h2>Line Chart</h2>
      <Line data={chartData} options={lineChartOptions} />
    </div>
  );
}
export default LineChart;
