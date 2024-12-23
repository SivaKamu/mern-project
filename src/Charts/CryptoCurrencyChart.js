import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const CryptoCurrencyChart = ({ cryptoCurrencyData }) => {
  const chartRef = useRef(null);

  const data = {
    labels: cryptoCurrencyData.dates,
    datasets: [
      {
        label: "Closing Prices",
        data: cryptoCurrencyData.ohlc.map((item) => item.c),
        borderColor: "#42A5F5",
        backgroundColor: "#90CAF9",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        type: "time", // For time-based X-axis
        time: {
          unit: "day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart instance when unmounting
      }
    };
  }, []);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default CryptoCurrencyChart;
