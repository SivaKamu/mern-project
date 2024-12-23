import React, { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2"; // Directly import Chart for Candlestick
import 'chartjs-adapter-date-fns'; // Import date adapter
import { useSelector } from "react-redux";

// Register chart.js components and the financial chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement
);

const StockChart = () => {
  const stockData = useSelector((state) => state.authData.stockData);

  // Ensure useEffect is always called at the top of the component
  useEffect(() => {
    // Any side-effect or cleanup logic can be placed here
    return () => {
      if (window.myChart) {
        window.myChart.destroy();
      }
    };
  }, []); // This will only run once when the component mounts

  // Check if stockData exists
  if (!stockData || !stockData.ohlc || stockData.ohlc.length === 0) {
    return <div>Loading chart...</div>; // Loading state if data isn't ready
  }

  // Format the data for the chart only if stockData is available
  const formattedData = stockData.ohlc.map(item => ({
    x: new Date(item.date),   // Ensure the date is a Date object
    o: item.o,                // Open price
    h: item.h,                // High price
    l: item.l,                // Low price
    c: item.c,                // Close price
  }));

  const data = {
    labels: stockData.dates,  // X-axis labels (though these aren't strictly necessary with the candlestick chart)
    datasets: [
      {
        label: "Stock Data",
        data: formattedData,   // Use the formatted data for the candlestick chart
        borderColor: "#3333ff",
        backgroundColor: "#3333ff",
        type: "candlestick",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",   // x-axis uses time scale
        time: {
          unit: "day",  // Group data by day
          tooltipFormat: "MMM dd, yyyy",  // Correct date format for tooltip
        },
      },
      y: {
        ticks: {
          beginAtZero: false,   // Don't start the y-axis from zero
        },
      },
    },
  };

  // After ensuring data is available, render the chart
  return <Chart type="candlestick" data={data} options={options} />;
};

export default StockChart;
