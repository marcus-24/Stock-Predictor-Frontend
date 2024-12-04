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
          mode: "vertical",
          scaleID: "x",
          value: "Tue May 21 2024",
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
      // type: "time",
      // time: {
      //   // Luxon format string
      //   tooltipFormat: "DD T",
      // },
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
