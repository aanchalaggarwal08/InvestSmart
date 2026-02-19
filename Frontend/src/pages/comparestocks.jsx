import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { getStockData } from "../api/stocksAPI";
import "./comparestocks.css";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CompareStocks() {
  const stockList = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE", "HDFCBANK.BSE", "BHARTIARTL.BSE"];

  const [selectedStocks, setSelectedStocks] = useState(["RELIANCE.BSE", "TCS.BSE"]);
  const [chartData, setChartData] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [technical, setTechnical] = useState({});
  const [fundamentals, setFundamentals] = useState({});
  const [bestOverall, setBestOverall] = useState(null);
  const [ranking, setRanking] = useState([]);

  const stockColors = ["#0053B8", "#FF6B6B", "#FFA500", "#2ECC71", "#8E44AD"];

  const handleToggleStock = (symbol) => {
    setSelectedStocks(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  const handleCompare = async () => {
    if (selectedStocks.length < 2) {
      alert("Select at least 2 stocks to compare");
      return;
    }

    try {
      const stockDataArray = await Promise.all(selectedStocks.map(symbol => getStockData(symbol)));

      let labels = [];
      const datasets = [];
      const perf = {};
      const techData = {};
      const fundaData = {};

      stockDataArray.forEach((data, index) => {
        if (!data) return;

        const formattedDates = data.dates.map(d => {
          const [year, month] = d.split("-");
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return `${months[parseInt(month) - 1]} ${year}`;
        });

        if (labels.length === 0) labels = formattedDates;

        datasets.push({
          label: selectedStocks[index],
          data: data.prices,
          borderColor: stockColors[index % stockColors.length],
          borderWidth: 2,
          tension: 0.4,
          fill: false
        });

        perf[selectedStocks[index]] = (
          (data.prices.at(-1) - data.prices[0]) /
          data.prices[0] *
          100
        ).toFixed(2);

        techData[selectedStocks[index]] = {
          support: data.support,
          resistance: data.resistance
        };

        fundaData[selectedStocks[index]] = {
          pe: data.metrics?.pe ?? "N/A",
          pb: data.metrics?.pb ?? "N/A",
          roe: data.metrics?.roe ?? "N/A",
          debtEquity: data.metrics?.debtEquity ?? "N/A",
          eps: data.metrics?.eps ?? "N/A"
        };
      });

      setChartData({ labels, datasets });
      setPerformance(perf);
      setTechnical(techData);
      setFundamentals(fundaData);

      // ✅ SCORING SYSTEM for Best Overall Investment
      const score = {};
      Object.keys(fundaData).forEach(s => (score[s] = 0));

      const rankHigh = metric =>
        Object.keys(fundaData).reduce((a, b) =>
          (parseFloat(fundaData[b][metric]) || 0) > (parseFloat(fundaData[a][metric]) || 0) ? b : a
        );

      const rankLow = metric =>
        Object.keys(fundaData).reduce((a, b) =>
          (parseFloat(fundaData[b][metric]) || Infinity) < (parseFloat(fundaData[a][metric]) || Infinity) ? b : a
        );

      score[rankHigh("roe")]++;
      score[rankLow("pe")]++;
      score[rankLow("pb")]++;
      score[rankLow("debtEquity")]++;
      score[rankHigh("eps")]++;

      const topPerf = Object.keys(perf).reduce((a, b) =>
        parseFloat(perf[b]) > parseFloat(perf[a]) ? b : a
      );
      score[topPerf]++;

      const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
      setRanking(sorted);
      setBestOverall(sorted[0]);

    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div className="compare-container">
      <h2>Compare Indian Stocks 🇮🇳📊</h2>

      <div className="checkbox-grid">
        {stockList.map(stock => (
          <label key={stock} className="checkbox-item">
            <input
              type="checkbox"
              checked={selectedStocks.includes(stock)}
              onChange={() => handleToggleStock(stock)}
            />
            {stock}
          </label>
        ))}
      </div>

      <button className="compare-btn" onClick={handleCompare}>
        Compare
      </button>

      {chartData && (
        <div className="chart-wrapper">
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      )}

      {performance && (
        <>
          {/* ✅ Comparison Table */}
          <div className="comparison-table">
            <h3>📊 Side-By-Side Comparison</h3>
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Gain %</th>
                  <th>P/E</th>
                  <th>P/B</th>
                  <th>ROE %</th>
                  <th>Debt-Equity</th>
                  <th>EPS</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(fundamentals).map(symbol => (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>{performance[symbol]}%</td>
                    <td>{fundamentals[symbol].pe}</td>
                    <td>{fundamentals[symbol].pb}</td>
                    <td>{fundamentals[symbol].roe}</td>
                    <td>{fundamentals[symbol].debtEquity}</td>
                    <td>{fundamentals[symbol].eps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Technical Section */}
          <div className="technical-section">
            <h3>📌 Support & Resistance</h3>
            {Object.keys(technical).map(symbol => (
              <p key={symbol}>
                <strong>{symbol}</strong> ➜ Support: ₹{technical[symbol].support} | Resistance: ₹{technical[symbol].resistance}
              </p>
            ))}
          </div>

          {/* ✅ Best Overall */}
          {bestOverall && (
            <div className="best-overall">
              <h3>🏆 Best Overall Investment</h3>
              <p><strong>{bestOverall[0]}</strong> — Score: {bestOverall[1]}</p>
            </div>
          )}

          {/* ✅ Ranking based on score */}
          {ranking.length > 0 && (
            <div className="ranking-section">
              <h3>📈 Overall Ranking</h3>
              {ranking.map(([symbol, scoreVal], i) => (
                <p key={symbol}>
                  #{i + 1} — <strong>{symbol}</strong> (Score: {scoreVal})
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { getStockData } from "../api/stocksAPI";
// import "./comparestocks.css";

// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// export default function CompareStocks() {
//   const stockList = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE", "HDFCBANK.BSE", "BHARTIARTL.BSE"];

//   const [selectedStocks, setSelectedStocks] = useState(["RELIANCE.BSE", "TCS.BSE"]);
//   const [chartData, setChartData] = useState(null);
//   const [performance, setPerformance] = useState(null);
//   const [technical, setTechnical] = useState({});
//   const [fundamentals, setFundamentals] = useState({});

//   const stockColors = ["#0053B8", "#FF6B6B", "#FFA500", "#2ECC71", "#8E44AD"];

//   const handleToggleStock = (symbol) => {
//     setSelectedStocks(prev =>
//       prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
//     );
//   };

//   const handleCompare = async () => {
//     if (selectedStocks.length < 2) {
//       alert("Select at least 2 stocks to compare");
//       return;
//     }

//     try {
//       const stockDataArray = await Promise.all(selectedStocks.map(symbol => getStockData(symbol)));

//       let labels = [];
//       const datasets = [];
//       const perf = {};
//       const techData = {};
//       const fundaData = {};

//       stockDataArray.forEach((data, index) => {
//         if (!data) return;

//         const formattedDates = data.dates.map(d => {
//           const [year, month] = d.split("-");
//           const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//           return `${months[parseInt(month) - 1]} ${year}`;
//         });

//         if (labels.length === 0) labels = formattedDates;

//         datasets.push({
//           label: selectedStocks[index],
//           data: data.prices,
//           borderColor: stockColors[index % stockColors.length],
//           borderWidth: 2,
//           tension: 0.4,
//           fill: false
//         });

//         perf[selectedStocks[index]] = (
//           (data.prices.at(-1) - data.prices[0]) /
//           data.prices[0] *
//           100
//         ).toFixed(2);

//         techData[selectedStocks[index]] = {
//           support: data.support,
//           resistance: data.resistance
//         };

//         fundaData[selectedStocks[index]] = {
//           pe: data.metrics?.pe ?? "N/A",
//           pb: data.metrics?.pb ?? "N/A",
//           roe: data.metrics?.roe ?? "N/A",
//           debtEquity: data.metrics?.debtEquity ?? "N/A",
//           eps: data.metrics?.eps ?? "N/A"
//         };
//       });

//       setChartData({ labels, datasets });
//       setPerformance(perf);
//       setTechnical(techData);
//       setFundamentals(fundaData);

//     } catch (error) {
//       console.error("Error fetching stock data:", error);
//     }
//   };

//   return (
//     <div className="compare-container">
//       <h2>Compare Indian Stocks 🇮🇳📊</h2>

//       <div className="checkbox-grid">
//         {stockList.map(stock => (
//           <label key={stock} className="checkbox-item">
//             <input
//               type="checkbox"
//               checked={selectedStocks.includes(stock)}
//               onChange={() => handleToggleStock(stock)}
//             />
//             {stock}
//           </label>
//         ))}
//       </div>

//       <button className="compare-btn" onClick={handleCompare}>
//         Compare
//       </button>

//       {chartData && (
//         <div className="chart-wrapper">
//           <Line data={chartData} options={{ responsive: true }} />
//         </div>
//       )}

//       {performance && (
//         <>
//           <div className="performance">
//             <h3>📈 Performance</h3>
//             {Object.entries(performance).map(([symbol, change]) => (
//               <p key={symbol}><strong>{symbol}:</strong> {change}%</p>
//             ))}
//           </div>

//           <div className="fundamental-section">
//             <h3>📊 Fundamentals</h3>
//             <div className="fundamental-grid">
//               {Object.keys(fundamentals).map(symbol => (
//                 <div key={symbol} className="fundamental-card">
//                   <h4>{symbol}</h4>
//                   <p><strong>P/E:</strong> {fundamentals[symbol].pe}</p>
//                   <p><strong>P/B:</strong> {fundamentals[symbol].pb}</p>
//                   <p><strong>ROE:</strong> {fundamentals[symbol].roe}%</p>
//                   <p><strong>Debt-Equity:</strong> {fundamentals[symbol].debtEquity}</p>
//                   <p><strong>EPS:</strong> {fundamentals[symbol].eps}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="technical-section">
//             <h3>📌 Support & Resistance</h3>
//             {Object.keys(technical).map(symbol => (
//               <p key={symbol}>
//                 <strong>{symbol}:</strong>
//                 &nbsp;Support: ₹{technical[symbol].support} | Resistance: ₹{technical[symbol].resistance}
//               </p>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );




