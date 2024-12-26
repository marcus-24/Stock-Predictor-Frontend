import axios from "axios";
import { IStock } from "../interfaces";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL; //need to have "VITE" prefix env variables and use this import method instead

export async function getStockData(
  start_date: string,
  end_date: string
): Promise<IStock[]> {
  const response = await axios.get(
    `${BACKEND_URL}/data/ticker/AAPL/range/${start_date}/${end_date}`
  );
  return response.data;
}

export async function getPredictionData(
  n_days_pred: number
): Promise<IStock[]> {
  const response = await axios.get(
    `${BACKEND_URL}/prediction/ticker/AAPL/days/${n_days_pred}`
  );
  return response.data;
}
