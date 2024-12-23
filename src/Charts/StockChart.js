import React, { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2"; // Directly import Chart for Candlestick
import 'chartjs-adapter-date-fns'; // Import date adapter

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

const StockChart = ({ stockData }) => {
  // Ensure that dates are in the correct format
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
        data: formattedData,   // Use the formatted data for candlestick chart
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

  useEffect(() => {
    return () => {
      // Cleanup: Destroy chart if the component is unmounted
      if (window.myChart) {
        window.myChart.destroy();
      }
    };
  }, []);

  return <Chart type="candlestick" data={data} options={options} />;
};

export default StockChart;
