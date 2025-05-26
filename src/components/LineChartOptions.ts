import { ChartOptions } from "chart.js";
// import moment from "moment";
// todo: format hover labels (tooltip) https://youtu.be/GnRAbf9MMQI?si=c_EIuqEzBnA83Q_1
export const lineChartOptions: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: true,
      text: "Dow Jones Index Prediction",
      font: { size: 30 }, //change title text size
    },
    legend: {
      display: true,
    },
  },
  elements: {
    line: {
      borderWidth: 3 // set line border width globally
    }
  },
  scales: {
    x: {
      min: "original", // Set min to the minimum value in your data
      max: "original", // Set max to the maximum value in your data
      type: "time",
      time: {
        unit: "week",
        displayFormats: { day: "yyyy MM" },
      },
      title: { display: true, text: "Date", font: { size: 30 } },
      ticks: {
        font: { size: 14 },
      },
    },
    y: {
      title: { display: true, text: "Price ($)", font: { size: 30 } },
      ticks: {
        font: { size: 14 },
      },
    },
  },
};
