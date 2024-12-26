import { lazy, Suspense } from "react";
import Chart from "chart.js/auto";
import { TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import "./App.css";
import { useQueries } from "react-query";
import annotationPlugin from "chartjs-plugin-annotation";
import moment from "moment";
import { getStockData, getPredictionData } from "./utils/datafetchers";
import { IStock } from "./interfaces";

const N_DAYS_PRED: number = 7;
const TODAY_DATE: string = moment().format("YYYY-MM-DD");
const START_DATE: string = moment().subtract(1, "years").format("YYYY-MM-DD");
// const PRED_DATE: string = moment()
//   .add(N_DAYS_PRED, "days")
//   .format("YYYY-MM-DD");

const LineChart = lazy(() => import("./components/LineChart")); // Always lazy load your chart components. As chart components are
//built on top of web canvas, it takes a little while to load its bundle.

Chart.register(annotationPlugin, TimeScale); // allows for chartjs to see plugins within the "options" variable.

function App() {
  const results = useQueries([
    {
      queryKey: ["stocks"],
      queryFn: () => getStockData(START_DATE, TODAY_DATE),
    },
    {
      queryKey: ["predicitons"],
      queryFn: () => getPredictionData(N_DAYS_PRED),
    },
  ]);

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isLoading) {
    return <>Loading data</>;
  } else if (isError) {
    return (
      <>{`Error loading data. ${results.map((result) => result.error)}`}</>
    );
  } else {
    const [stocks, predictions]: IStock[][] = results.map(
      (result) => result.data!
    );
    return (
      <Suspense fallback={<div>Loading chart...</div>}>
        <LineChart stocks={stocks} preds={predictions} />
      </Suspense>
    );
  }
}

export default App;
