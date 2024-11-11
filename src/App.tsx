import { useState, lazy, Suspense } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./App.css";
import { Data } from "./utils/Data";

const LineChart = lazy(() => import("./components/LineChart")); // Always lazy load your chart components. As chart components are
//built on top of web canvas, it takes a little while to load its bundle.

Chart.register(CategoryScale); //todo: find out what it does

function App() {
  const [chartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ", // used for legend
        data: Data.map((data) => data.userGain), //unravel array of data in
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ], // marker colors
        borderColor: "green", // line color
        borderWidth: 5, //line width
      },
      {
        label: "Users Lost",
        data: Data.map((data) => data.userLost),
        borderColor: "red",
        borderWidth: 5,
      },
    ],
  });

  //Suspense will put your UI in a pending state until the chart has been loaded:
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LineChart chartData={chartData} />
    </Suspense>
  );
}

export default App;
