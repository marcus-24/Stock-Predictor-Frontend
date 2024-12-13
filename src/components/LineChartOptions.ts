import { ChartOptions } from "chart.js";

export const lineChartOptions: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: true,
      text: "Stock Price",
      font: { size: 30 }, //change title text size
    },
    legend: {
      display: true,
    },
    annotation: {
      // Had to use chartjs-plugin-annotation and register in the App.tsx
      annotations: {
        line1: {
          type: "line",
          scaleID: "x",
          value: "2024-05-01",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0, //no marker
    },
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
