import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://cdn.pixabay.com/photo/2022/08/22/03/30/logo-7402626_640.png"
          alt="BudgetTracker Logo"
        />
        <span>BudgetTracker</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/manage">Manage</Link></li>
      </ul>
      <div className="navbar-actions">
        <button className="theme-toggle">🌙</button>
        <button className="profile-button">👤</button>
      </div>
    </nav>
  );
};

export default Navbar;