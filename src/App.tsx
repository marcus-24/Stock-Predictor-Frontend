import { lazy, Suspense } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./App.css";
import { restClient, IAggResponseFormatted } from "polygon.io";
import { useQuery } from "react-query";
import {} from "polygon.io";

const LineChart = lazy(() => import("./components/LineChart")); // Always lazy load your chart components. As chart components are
//built on top of web canvas, it takes a little while to load its bundle.

const POLY_API_KEY: string = import.meta.env.VITE_POLY_API_KEY;

const rest = restClient(POLY_API_KEY);

Chart.register(CategoryScale); //todo: find out what it does

function App() {
  const { status, data: stockResults } = useQuery<IAggResponseFormatted>({
    queryKey: ["stock"],
    queryFn: () =>
      rest.stocks.aggregates("AAPL", 1, "day", "2023-01-01", "2024-04-14"),
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
