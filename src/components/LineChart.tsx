// components/LineChart.js
import { Line } from "react-chartjs-2";
import { lineChartOptions } from "./LineChartOptions";

interface chartDataProps {
  labels: number[];
  datasets: any;
}

function LineChart({ chartData }: { chartData: chartDataProps }) {
  return (
    <div className="chart-container">
      <h2>Line Chart</h2>
      <Line data={chartData} options={lineChartOptions} />
    </div>
  );
}
export default LineChart;
