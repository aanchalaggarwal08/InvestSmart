import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getStockData } from "../api/stocksAPI";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const stockSymbols = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE", "HDFCBANK.BSE", "BHARTIARTL.BSE"];
const colors = ["#0053B8", "#F77F00", "#2A9D8F", "#E63946", "#8D99AE"];

export default function MarketChart() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const datasets = [];

        // Use the first stock's dates as x-axis labels
        let labels = [];

        for (let i = 0; i < stockSymbols.length; i++) {
          const symbol = stockSymbols[i];
          const data = await getStockData(symbol);

          if (!data) {
            console.warn(`No data for ${symbol}`);
            continue;
          }

          if (labels.length === 0) labels = data.dates;

          datasets.push({
            label: symbol,
            data: data.prices,
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length] + "33", // semi-transparent fill
            tension: 0.3,
            fill: false,
            borderWidth: 2,
          });
        }

        if (datasets.length === 0) {
          setError("No stock data available.");
          return;
        }

        setChartData({ labels, datasets });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch market chart data.");
      }
    }

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!chartData) return <p>Loading chart...</p>;

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: true, position: "top" },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: { display: true, title: { display: true, text: "Date" } },
          y: { display: true, title: { display: true, text: "Price (₹)" } },
        },
      }}
    />
  );
}

