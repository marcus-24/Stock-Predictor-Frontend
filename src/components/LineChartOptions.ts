import { ChartOptions, TooltipItem } from "chart.js";
// todo: format hover labels (tooltip) https://youtu.be/GnRAbf9MMQI?si=c_EIuqEzBnA83Q_1
export const lineChartOptions: ChartOptions<"line"> = {
  plugins: {
    tooltip: {
      callbacks: {
        title: (context: TooltipItem<"line">[]) => {
          const dateString = (context[0].raw as { x: number }).x; //had to assume x is a number TS:2571
          const dateObj = new Date(dateString);
          const formattedDate = dateObj.toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return formattedDate

        }
      }
    },
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
        unit: "month",
        displayFormats: { day: "MMM YYYY" },
      },
      ticks: {
        font: { size: 14 },
      },
      grid: {display: false} // remove vertical grid lines
    },
    y: {
      ticks: {
        font: { size: 14 },
      },
      grid: {display: true} // keep horizontal grid lines
    },
  },
};
