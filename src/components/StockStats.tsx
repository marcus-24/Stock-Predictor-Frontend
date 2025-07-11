import { ReactElement, useMemo } from "react";
import { IStock } from "../interfaces";

const roundPrice = (price: number) => Math.round(price * 100) / 100;

const priceChange = (prices: IStock[]) =>
  prices[prices.length - 1].Close - prices[0].Close;

const getLatestPrice = (prices: IStock[]) =>
  roundPrice(prices[prices.length - 1].Close);

function percentChange(priceChange: number, firstPrice: number): number {
  const percentChange = priceChange / firstPrice;
  return Math.round(percentChange * 10000) / 100;
}

function priceChangeString(priceChange: number): string {
  const displayString = priceChange > 0 ? "+" : "";
  return displayString + `${roundPrice(priceChange)}`;
}

function generateArrowStyle(priceChange: number): { [key: string]: string } {
  if (priceChange > 0) {
    return {
      color: "darkgreen",
      backgroundColor: "rgba(85, 255, 0, 0.2)",
    };
  }
  return {
    color: "darkred",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  };
}

function generateStatText(priceChange: number): { [key: string]: string } {
  if (priceChange > 0) {
    return { color: "green" };
  }

  return { color: "red" };
}

function StatsElement({
  latestPrice,
  priceChange,
  percentChange,
  title,
}: {
  latestPrice: number;
  priceChange: number;
  percentChange: number;
  title: string;
}): ReactElement {
  return (
    <div className="stock-stats">
      <div className="arrow" style={generateArrowStyle(priceChange)}>
        {percentChange > 0 ? "↑" : "↓"}
      </div>
      <div>{title}</div>
      <div>{latestPrice}</div>
      <div style={generateStatText(priceChange)}>{`${percentChange}%`}</div>
      <div style={generateStatText(priceChange)}>
        {priceChangeString(priceChange)}
      </div>
    </div>
  );
}

function StockStats({
  stocks,
  preds,
}: {
  stocks: IStock[];
  preds: IStock[];
}): ReactElement {
  const latestStock = useMemo(() => getLatestPrice(stocks), [stocks]);
  const stockChange = useMemo(() => priceChange(stocks), [stocks]);
  const stockPercentChange = percentChange(stockChange, stocks[0].Close);
  // const stockPriceChangeStr = priceChangeString(stockChange);

  const latestPred = useMemo(() => getLatestPrice(preds), [preds]);
  const predChange = useMemo(() => priceChange(preds), [preds]);
  const predPercentChange = percentChange(predChange, preds[0].Close);
  // const predPriceChangeStr = priceChangeString(predChange);

  return (
    <div className="hud-container">
      <StatsElement
        latestPrice={latestStock}
        priceChange={stockChange}
        percentChange={stockPercentChange}
        title="Current Stock Statistics"
      />
      <StatsElement
        latestPrice={latestPred}
        priceChange={predChange}
        percentChange={predPercentChange}
        title="Predicted Stock Statistics"
      />
    </div>
  );
}

export default StockStats;
