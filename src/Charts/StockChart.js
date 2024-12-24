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
  useEffect(() => {
    return () => {
      if (window.myChart) {
        window.myChart.destroy();
      }
    };
  }, []); 

  if (!stockData || !stockData.ohlc || stockData.ohlc.length === 0) {
    return <div>Loading chart...</div>; 
  }

  const formattedData = stockData.ohlc.map(item => ({
    x: new Date(item.date),
    o: item.o,
    h: item.h,
    l: item.l,
    c: item.c,
  }));

  const data = {
    labels: stockData.dates,
    datasets: [
      {
        label: "Stock Data",
        data: formattedData,
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
