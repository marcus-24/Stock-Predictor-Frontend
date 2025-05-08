import { useMemo, ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { lineChartOptions } from "./LineChartOptions";
import { IStock } from "../interfaces";

//Reference: https://medium.com/@arifwaghbakriwala97/time-series-prediction-intervals-1866545a5554

function formatData(results: IStock[]): { x: number; y: number }[] {
  // avoid recalculation same results during rerender
  return results.map((result) => ({ x: result.Date, y: result.Close }));
}

function LineChart({
  stocks,
  preds,
}: {
  stocks: IStock[];
  preds: IStock[];
}): ReactElement {
  const chartData = {
    datasets: [
      {
        label: "Historical Stock",
        data: useMemo(() => formatData(stocks), [stocks]),
        borderColor: "green",
      },
      {
        label: "Predictions",
        data: useMemo(() => formatData(preds), [preds]),
        borderColor: "blue",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={lineChartOptions} />
    </div>
  );
}
export default LineChart;
