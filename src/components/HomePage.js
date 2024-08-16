// src/components/HomePage.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = ({ income, expenses, balance }) => {
  const data = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Financial Summary',
        data: [income, expenses, balance],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };

  return (
    <div className="home-page">
      <h2>Financial Summary</h2>
      <div className="summary">
        <div>Total Income: ${income}</div>
        <div>Total Expenses: ${expenses}</div>
        <div>Balance: ${balance}</div>
      </div>
      <Bar data={data} />
    </div>
  );
};

export default HomePage;
