import React from "react";
import "./Dashboard.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarketChart from "../components/MarketChart"; 
export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, 
  
  [navigate]);
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard 📊</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Portfolio Value</h3>
          <p>₹1,25,430</p>
        </div>

        <div className="stat-card">
          <h3>Today's Change</h3>
          <p>+2.4%</p>
        </div>

        <div className="stat-card">
          <h3>Stocks Owned</h3>
          <p>8</p>
        </div>

        <div className="stat-card">
          <h3>Watchlist</h3>
          <p>15</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>Market Trend</h2>
        <div className="chart-placeholder">
              <MarketChart />  
        </div>
      </div>
    </div>
  );
}




