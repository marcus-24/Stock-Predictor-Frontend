import { useMemo, ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { lineChartOptions } from "./LineChartOptions";
import { IStock } from "../interfaces";
import { ScriptableContext } from "chart.js";

//Reference: https://medium.com/@arifwaghbakriwala97/time-series-prediction-intervals-1866545a5554

function formatData(results: IStock[]): { x: number; y: number }[] {
  // avoid recalculation same results during rerender
  return results.map((result) => ({ x: result.Date, y: result.Close }));
}

function defineBackgroundColor(context: ScriptableContext<"line">) {
  if (!context.chart.chartArea) {
    return; //skip function if context is not available when page is loading
  }
  const ctx = context.chart.ctx;
  const { top, bottom } = context.chart.chartArea;
  const gradientBg: CanvasGradient = ctx.createLinearGradient(
    0,
    top,
    0,
    bottom
  );
  gradientBg.addColorStop(0, "rgba(0, 255, 34, 0.9)");
  gradientBg.addColorStop(1, "rgba(255, 255, 255, 0.7)");
  return gradientBg;
}

function LineChart({
  stocks,
  preds,
}: {
  stocks: IStock[];
  preds: IStock[];
}): ReactElement {
  const chartData = {
    //TODO: follow this for gradient: https://www.youtube.com/watch?v=e-15uzfcd-I&ab_channel=ChartJS
    //copy method above with useMemo
    datasets: [
      {
        label: "Historical Stock",
        data: useMemo(() => formatData(stocks), [stocks]),
        fill: "start",
        borderColor: "black",
        backgroundColor: defineBackgroundColor,
      },
      {
        label: "Predictions",
        data: useMemo(() => formatData(preds), [preds]),
        borderColor: "black",
        // backgroundColor: defineBackgroundColor,
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
