import { useMemo, ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { lineChartOptions } from "./LineChartOptions";
import { IStock } from "../interfaces";
import { ScriptableContext } from "chart.js";

//Reference: https://medium.com/@arifwaghbakriwala97/time-series-prediction-intervals-1866545a5554

type chartJSData = { x: string; y: number };

function getPriceDifference(context: ScriptableContext<"line">): number {
  const data = context.dataset.data;
  const lastPoint = data[data.length - 1] as unknown as chartJSData;
  const firstPoint = context.dataset.data[0] as unknown as chartJSData;
  return lastPoint.y - firstPoint.y;
}

function formatData(results: IStock[]): chartJSData[] {
  // avoid recalculation same results during rerender
  return results.map((result) => ({ x: result.Date, y: result.Close }));
}

function formatShadedAreaData(
  stocks: IStock[],
  preds: IStock[]
): chartJSData[] {
  const nearest = 1000; // round to the nearest thousandth
  const maxStock: number =
    Math.round(Math.max(...stocks.map((x) => x.Close)) / nearest) * nearest;
  return preds.map((ele) => ({ x: ele.Date, y: maxStock }));
}

function defineBorderColor(
  context: ScriptableContext<"line">
): string | undefined {
  if (!context.chart.chartArea) {
    return; //skip function if context is not available when page is loading
  }
  const priceDifference = getPriceDifference(context);
  return priceDifference > 0 ? "green" : "red";
}

function showLastPoint(context: ScriptableContext<"line">): number {
  /**
   * If the current data pt is the last one, the radius is set to 5,
   * otherwise, it's set to 0.
   */
  const index = context.dataIndex;
  const dataArr = context.dataset.data;
  return index === dataArr.length - 1 ? 5 : 0;
}

function defineBackgroundColor(
  context: ScriptableContext<"line">
): CanvasGradient | undefined {
  if (!context.chart.chartArea) {
    return; //skip function if context is not available when page is loading
  }
  const ctx = context.chart.ctx;
  const { top, bottom } = context.chart.chartArea;
  const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
  const priceDifference = getPriceDifference(context);

  priceDifference > 0
    ? gradientBg.addColorStop(0, "rgba(0, 255, 34, 0.1)")
    : gradientBg.addColorStop(0, "rgba(255, 8, 0, 0.1)");

  gradientBg.addColorStop(0.8, "rgba(255, 255, 255, 0.7)");

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
        borderColor: defineBorderColor,
        backgroundColor: defineBackgroundColor,
        pointRadius: showLastPoint,
        pointBackgroundColor: defineBorderColor,
      },
      {
        label: "Predictions",
        data: useMemo(() => formatData(preds), [preds]),
        fill: "start",
        borderColor: defineBorderColor,
        borderDash: [5, 5], // 5px dash, 5px gap
        backgroundColor: defineBackgroundColor,
        pointRadius: showLastPoint,
        pointBackgroundColor: defineBorderColor,
      },
      {
        label: "Prediction Region",
        data: useMemo(
          () => formatShadedAreaData(stocks, preds),
          [stocks, preds]
        ),
        fill: "start",
        borderColor: "white",
        backgroundColor: "rgba(255, 197, 134, 0.53)",
        pointRadius: 0,
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
