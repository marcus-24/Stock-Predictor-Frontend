import { lazy, Suspense } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import "./App.css";
import { useQueries } from "react-query";
import annotationPlugin from "chartjs-plugin-annotation";
import { IStock } from "./interfaces";
import StockStats from "./components/StockStats";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL; //need to have "VITE" prefix env variables and use this import method instead
const LineChart = lazy(() => import("./components/LineChart")); // Always lazy load your chart components. As chart components are
//built on top of web canvas, it takes a little while to load its bundle.

Chart.register(annotationPlugin, TimeScale); // allows for chartjs to see plugins within the "options" variable.

const getData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

function App() {
  const results = useQueries([
    {
      queryKey: ["stocks"],
      queryFn: () => getData(`${BACKEND_URL}/data/ticker`),
    },
    {
      queryKey: ["predictons"],
      queryFn: () => getData(`${BACKEND_URL}/prediction/ticker`),
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
        <StockStats stocks={stocks} preds={predictions} />
        <LineChart stocks={stocks} preds={predictions} />
      </Suspense>
    );
  }
}

export default App;
