import React from "react";
import Navbar from "../Navbar/Navbar"; 
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Hello, Kamal! 👋</h1>
          <div className="dashboard-buttons">
            <button className="new-income">New income 😄</button>
            <button className="new-expense">New expense 😟</button>
          </div>
        </header>

        <div className="overview-section">
          <h2>Overview</h2>
          <div className="overview-cards">
            <div className="card income-card">
              <h3>Income</h3>
              <p>$0.00</p>
            </div>
            <div className="card expense-card">
              <h3>Expense</h3>
              <p>$0.00</p>
            </div>
            <div className="card balance-card">
              <h3>Balance</h3>
              <p>$0.00</p>
            </div>
          </div>
        </div>

        <div className="category-section">
          <div className="category-card">
            <h3>Incomes by category</h3>
            <p>No data for the selected period</p>
            <small>Try selecting a different period or try adding new incomes</small>
          </div>
          <div className="category-card">
            <h3>Expenses by category</h3>
            <p>No data for the selected period</p>
            <small>Try selecting a different period or try adding new expenses</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;