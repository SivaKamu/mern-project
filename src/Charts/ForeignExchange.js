import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ForeignExchange = () => {
  // Forex data
  const forexData = {
    exchangeRate: 85.077,
    bidPrice: 85.0756,
    askPrice: 85.0792,
  };

  // Radar chart data configuration
  const data = {
    labels: ["Exchange Rate", "Bid Price", "Ask Price"],
    datasets: [
      {
        label: "Forex Metrics (USD to INR)",
        data: [forexData.exchangeRate, forexData.bidPrice, forexData.askPrice],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
      },
    ],
  };

  // Radar chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position the legend at the top
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true, // Display angle lines
        },
        suggestedMin: 84.5, // Minimum value for the chart
        suggestedMax: 85.5, // Maximum value for the chart
        ticks: {
          stepSize: 0.1, // Steps for value ticks
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default ForeignExchange;
