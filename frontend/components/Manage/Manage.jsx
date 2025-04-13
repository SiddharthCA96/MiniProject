import React from "react";
import Navbar from "../Navbar/Navbar"; 
import { Bar } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./Manage.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Manage = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Income",
        data: [500, 700, 800, 600, 900, 1000],
        backgroundColor: "#28a745",
      },
      {
        label: "Expenses",
        data: [400, 600, 700, 500, 800, 900],
        backgroundColor: "#dc3545", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expenses (Monthly)",
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="manage-container">
        <header className="manage-header">
          <h1>Manage</h1>
          <p>Manage your account settings and categories</p>
        </header>

        <div className="manage-section">
          <div className="currency-section">
            <h2>Currency</h2>
            <p>Set your default currency for transactions</p>
            <select className="currency-dropdown">
              <option value="dollar">$ Dollar</option>
              <option value="euro">€ Euro</option>
              <option value="pound">£ Pound</option>
            </select>
          </div>

          <div className="categories-section">
            <div className="categories-header">
              <h2>Incomes categories</h2>
              <p>Sorted by name</p>
              <button className="create-category">+ Create category</button>
            </div>
            <div className="categories-content">
              <p>No <span className="highlight">income</span> categories yet</p>
              <small>Create one to get started</small>
            </div>
          </div>

          <div className="categories-section">
            <div className="categories-header">
              <h2>Expenses categories</h2>
              <p>Sorted by name</p>
              <button className="create-category">+ Create category</button>
            </div>
            <div className="categories-content">
              <p>No <span className="highlight-expense">expense</span> categories yet</p>
              <small>Create one to get started</small>
            </div>
          </div>

          <div className="graph-section">
            <h2>Income vs Expenses</h2>
            <div className="graph-container">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;