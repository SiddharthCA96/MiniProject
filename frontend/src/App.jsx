import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import TransactionsHistory from "../components/Transaction/TransactionHistory";
import Manage from "../components/Manage/Manage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/transactions" element={<TransactionsHistory/>} />
        <Route path="/manage" element={<Manage/>} />
      </Routes>
    </Router>
  );
};

export default App;