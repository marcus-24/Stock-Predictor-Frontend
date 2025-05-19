import { ReactElement, useMemo } from "react";
import { IStock } from "../interfaces";

const roundPrice = (price: number) => Math.round(price * 100) / 100;

function getLatestPrice(prices: IStock[]): number {
  const lastPrice = prices[prices.length - 1].Close;
  return roundPrice(lastPrice); // round to closest hundredth
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

  const stock_w_preds = stocks.concat(preds);
  const latestPred = useMemo(
    () => getLatestPrice(stock_w_preds),
    [stocks, preds]
  );
  const predPercentChange = percentChangeString(stock_w_preds);
  const predPriceChange = priceChangeString(stock_w_preds);

  return (
    <div className="stock-stats">
      <div>
        {latestStock} {stockPercentChange} {stockPriceChange}
      </div>
      <div>
        {latestPred} {predPercentChange} {predPriceChange}
      </div>
    </div>
  );
}

export default StockStats;
