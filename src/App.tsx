import { lazy, Suspense } from "react";
import Chart from "chart.js/auto";
import { TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import "./App.css";
import { useQuery } from "react-query";
import annotationPlugin from "chartjs-plugin-annotation";
import axios from "axios";
import { IStock } from "./interfaces";
import moment from "moment";

// const N_DAYS_PRED: number = 7;
const TODAY_DATE: string = moment().format("YYYY-MM-DD");
const START_DATE: string = moment().subtract(1, "years").format("YYYY-MM-DD");
// const PRED_DATE: string = moment()
//   .add(N_DAYS_PRED, "days")
//   .format("YYYY-MM-DD");

const LineChart = lazy(() => import("./components/LineChart")); // Always lazy load your chart components. As chart components are
//built on top of web canvas, it takes a little while to load its bundle.

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL; //need to have "VITE" prefix env variables and use this import method instead

Chart.register(annotationPlugin, TimeScale); // allows for chartjs to see plugins within the "options" variable.

async function getStockData(
  start_date: string,
  end_date: string
): Promise<IStock[]> {
  const response = await axios.get(
    `${BACKEND_URL}/data/ticker/AAPL/range/${start_date}/${end_date}`
  );
  return response.data;
}

// async function getPredictionData(
//   n_days_pred: number = N_DAYS_PRED
// ): Promise<IStock[]> {
//   const response = await axios.get(
//     `${BACKEND_URL}/prediction/ticker/AAPL/days/${n_days_pred}`
//   );
//   return response.data;
// }

function App() {
  const { status: stockStatus, data: stockResults } = useQuery({
    queryKey: ["stock"],
    queryFn: () => getStockData(START_DATE, TODAY_DATE),
  });

  // const { status: predStatus, data: predResults } = useQuery({
  //   queryKey: ["stock"],
  //   queryFn: () => getPredictionData(N_DAYS_PRED),
  // });

  switch (stockStatus) {
    case "loading":
      return <h1>Loading results</h1>;
    case "error":
      return <h1>Error getting results</h1>;
    case "success":
      return (
        <Suspense fallback={<div>Loading chart...</div>}>
          <LineChart stockResults={stockResults} />
        </Suspense>
      );
  }
}

export default App;
