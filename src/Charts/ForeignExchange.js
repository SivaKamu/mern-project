import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const ForeignExchange = () => {
  const forexData = {
    exchangeRate: 85.077,
    bidPrice: 85.0756,
    askPrice: 85.0792,
  };

  const data = {
    labels: ["Exchange Rate", "Bid Price", "Ask Price"],
    datasets: [
      {
        label: "Forex Metrics",
        data: [forexData.exchangeRate, forexData.bidPrice, forexData.askPrice],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      r: {
        suggestedMin: 84.5,
        suggestedMax: 85.5,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}> {/* Set custom height */}
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default ForeignExchange;
