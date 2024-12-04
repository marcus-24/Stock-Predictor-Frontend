import { lazy, Suspense } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, TimeScale, TimeSeriesScale } from "chart.js";
import "./App.css";
import { useQuery } from "react-query";
import annotationPlugin from "chartjs-plugin-annotation";
import axios from "axios";
import { IStock } from "./interfaces";

const LineChart = lazy(() => import("./components/LineChart")); // Always lazy load your chart components. As chart components are
//built on top of web canvas, it takes a little while to load its bundle.

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL; //need to have "VITE" prefix env variables and use this import method instead

Chart.register(CategoryScale, annotationPlugin, TimeScale, TimeSeriesScale); // allows for chartjs to see plugins within the "options" variable.

async function getStockData(
  start_date: string,
  end_date: string
): Promise<IStock[]> {
  const response = await axios.get(
    `${BACKEND_URL}/data/ticker/AAPL/range/${start_date}/${end_date}`
  );
  return response.data;
}

function App() {
  const { status, data: stockResults } = useQuery({
    queryKey: ["stock"],
    queryFn: () => getStockData("2024-01-01", "2024-12-03"),
  });

  switch (status) {
    case "loading":
      return <h1>Loading results</h1>;
    case "error":
      return <h1>Error getting results</h1>;
    case "success":
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <LineChart stockResults={stockResults} />
        </Suspense>
      );
  }
}

export default App;
