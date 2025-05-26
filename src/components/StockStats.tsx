import { ReactElement, useMemo } from "react";
import { IStock } from "../interfaces";

const roundPrice = (price: number) => Math.round(price * 100) / 100;

function getLatestPrice(prices: IStock[]): string {
  const lastPrice = prices[prices.length - 1].Close;
  return roundPrice(lastPrice).toLocaleString("en-US"); // round to closest hundredth
}

function percentChangeString(prices: IStock[]): string {
  const percentChange =
    (prices[prices.length - 1].Close - prices[0].Close) / prices[0].Close;
  const roundPercentChange = Math.round(percentChange * 10000) / 100;
  const displayString = roundPercentChange > 0 ? "↑" : "↓";
  return displayString + `${roundPercentChange}%`;
}

function priceChangeString(prices: IStock[]): string {
  const priceChange = prices[prices.length - 1].Close - prices[0].Close;
  const displayString = priceChange > 0 ? "+" : "";
  return displayString + `${roundPrice(priceChange)}`;
}

function generateStyle(prices: IStock[]): { [key: string]: string } {
  const priceChange = prices[prices.length - 1].Close - prices[0].Close;
  if (priceChange > 0) {
    return {
      color: "darkgreen",
      backgroundColor: "rgba(85, 255, 0, 0.2)",
    };
  } else {
    return {
      color: "darkred",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
    };
  }
}

function StockStats({
  stocks,
  preds,
}: {
  stocks: IStock[];
  preds: IStock[];
}): ReactElement {
  const latestStock = useMemo(() => getLatestPrice(stocks), [stocks]);
  const stockPercentChange = percentChangeString(stocks);
  const stockPriceChange = priceChangeString(stocks);

  const latestPred = useMemo(() => getLatestPrice(preds), [preds]);
  const predPercentChange = percentChangeString(preds);
  const predPriceChange = priceChangeString(preds);

  return (
    <div className="stock-stats">
      <div style={generateStyle(stocks)}>
        {latestStock} {stockPercentChange} {stockPriceChange}
      </div>
      <div style={generateStyle(preds)}>
        {latestPred} {predPercentChange} {predPriceChange}
      </div>
    </div>
  );
}

export default StockStats;
