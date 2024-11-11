export const lineChartOptions = {
  plugins: {
    title: {
      display: true,
      text: "Users Gained between 2016-2020",
      font: { size: 30 }, //change title text size
    },
    legend: {
      display: true,
    },
  },
  elements: {
    point: {
      radius: 8, //change marker size
    },
  },
  scales: {
    x: {
      title: { display: true, text: "Year", font: { size: 30 } },
      ticks: {
        font: { size: 14 },
      },
    },
    y: {
      title: { display: true, text: "New Users", font: { size: 30 } },
      ticks: {
        font: { size: 14 },
      },
    },
  },
};
