import React, { useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const FinancialChart = () => {
  const fundamentalData = useSelector((state) => state.authData.fundamentalData);
  console.log(fundamentalData);
  useEffect(() => {
      return () => {
        if (window.myChart) {
          window.myChart.destroy();
        }
      };
    }, []); 

    if (!fundamentalData) {
      return <div>Loading chart...</div>; 
    }


  const financialData = {
    labels: ['Market Cap', 'P/E Ratio', 'Revenue', 'Gross Profit', 'EBITDA'],  // Labels for financial metrics
    datasets: [
      {
        label: 'Tesla Inc. Financials',
        data: [
            fundamentalData.MarketCapitalization,
            fundamentalData.PERatio,
            fundamentalData.RevenueTTM,
            fundamentalData.GrossProfitTTM,
            fundamentalData.EBITDA
        ],
        backgroundColor: '#42A5F5',  // Blue color for the bars
        borderColor: '#1E88E5',      // Border color for the bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,  // Start Y-axis from zero
      },
    },
  };

  return <Bar data={financialData} options={options} />;
};

export default FinancialChart;
