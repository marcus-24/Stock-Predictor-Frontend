export const lineChartOptions = {
  plugins: {
    title: {
      display: true,
      text: "Stock Price",
      font: { size: 30 }, //change title text size
    },
    legend: {
      display: true,
    },
  },
  elements: {
    point: {
      radius: 0, //no marker
    },
  },
  scales: {
    x: {
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
