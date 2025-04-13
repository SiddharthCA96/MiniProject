import React, { useState } from "react";
import Navbar from "../Navbar/Navbar"; 
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import "./TransactionsHistory.css";

const TransactionsHistory = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2025, 3, 1), 
      endDate: new Date(2025, 3, 9),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dummyTransactions = [
    {
      category: "Food",
      description: "Lunch at restaurant",
      date: "2025-04-01",
      type: "Expense",
      amount: "$15.00",
    },
    {
      category: "Salary",
      description: "Monthly salary",
      date: "2025-04-02",
      type: "Income",
      amount: "$2000.00",
    },
    {
      category: "Transport",
      description: "Bus ticket",
      date: "2025-04-03",
      type: "Expense",
      amount: "$2.50",
    },
    {
      category: "Shopping",
      description: "Clothes",
      date: "2025-04-04",
      type: "Expense",
      amount: "$50.00",
    },
  ];

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setShowDatePicker(false); 
  };

  return (
    <>
      <Navbar />
      <div className="transactions-container">
        <header className="transactions-header">
          <h1>Transactions History</h1>
          <div className="header-buttons">
            <button>Export CSV</button>
            <button>View</button>
          </div>
        </header>

        <div className="transactions-filters">
          <div className="filter-buttons">
            <button>+ Category</button>
            <button>+ Type</button>
          </div>
          <div className="date-range">
            <button onClick={() => setShowDatePicker(!showDatePicker)}>
              {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
            </button>
            {showDatePicker && (
              <DateRangePicker
                ranges={dateRange}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
              />
            )}
          </div>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {dummyTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="transactions-footer">
          <button>Previous</button>
          <button>Next</button>
        </footer>
      </div>
    </>
  );
};

export default TransactionsHistory;