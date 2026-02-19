// const API_KEY = "9C5OFMMZCZK7EGBO";

// export async function getStockData(symbol = "AAPL") {
//   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("API Response:", data);

//     if (!data["Time Series (Daily)"]) return null;

// //     const dailyData = data["Time Series (Daily)"];
// //     const dates = Object.keys(dailyData).slice(0, 7).reverse();
// //     const prices = dates.map(date => dailyData[date]["4. close"]);

// //     return { dates, prices };
// //   } catch {
// //     return null;
// //   }
// // }
// const API_KEY = import.meta.env.REACT_APP_TWELVE_API_KEY;
// const BASE_URL = "https://api.twelvedata.com/time_series";
// const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hrs

// const mockData = {
//   "RELIANCE.BSE": { dates: ["2024-01-01" , "2024-01-02"], prices: [2500 , 2550] },
//   "TCS.BSE": { dates: ["2024-01-01" , "2024-01-02"], prices: [3500 , 3450] },
//   "INFY.BSE": { dates: ["2024-01-01" ,"2024-01-02" ], prices: [1500 , 1520] },
//   "HDFCBANK.BSE": { dates: ["2024-01-01" , "2024-01-02"], prices: [1600 , 1610] },
//   "BHARTIARTL.BSE": { dates: ["2024-01-01" , "2024-01-02"], prices: [900 , 920] },
// };

// function saveCache(key, data) {
//   localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
// }

// function getCache(key) {
//   const cached = JSON.parse(localStorage.getItem(key));
//   if (!cached) return null;
//   if (Date.now() - cached.time > CACHE_DURATION) return null;
//   return cached.data;
// }

// export async function getStockData(symbol) {
//   const cached = getCache(symbol);
//   if (cached) return cached;

//   try {
//     const url =
//       `${BASE_URL}?symbol=${symbol}&interval=1day&outputsize=365&apikey=${API_KEY}`;

//     const response = await fetch(url);
//     const result = await response.json();

//     if (!result.values) throw new Error("Invalid API data");

//     const dates = result.values.map((d) => d.datetime).reverse();
//     const prices = result.values.map((d) => parseFloat(d.close)).reverse();

//     const formatted = { dates, prices };
//     saveCache(symbol, formatted);

//     return formatted;
//   } catch (error) {
//     console.warn("API failed → using mock data for", symbol);
//     return mockData[symbol];
//   }
// }

// stocksAPI.js
// const API_KEY = import.meta.env.REACT_APP_TWELVE_API_KEY;
// const BASE_URL = "https://api.twelvedata.com/time_series";
// const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hrs

// // Generate quarterly dates for 2024-2025
// function generateQuarterlyDates(startYear = 2024, endYear = 2025) {
//   const months = ["01", "04", "07", "10"];
//   const dates = [];
//   for (let year = startYear; year <= endYear; year++) {
//     months.forEach(month => dates.push(`${year}-${month}-01`));
//   }
//   return dates;
// }

// // Generate mock prices based on a base price
// function generatePrices(basePrice, count) {
//   const prices = [];
//   let price = basePrice;
//   for (let i = 0; i < count; i++) {
//     const change = price * (Math.random() * 0.1 - 0.05); // ±5% variation
//     price = Math.max(price + change, 1);
//     prices.push(Math.round(price * 100) / 100);
//   }
//   return prices;
// }
// function calculateSupportResistance(prices) {
//   const sorted = [...prices].sort((a, b) => a - b);

//   const support = (sorted[0] + sorted[1]) / 2; // 2 lowest average
//   const resistance =
//     (sorted[sorted.length - 1] + sorted[sorted.length - 2]) / 2; // 2 highest average

//   return {
//     support: Math.round(support),
//     resistance: Math.round(resistance)
//   };
// }

// const dates = generateQuarterlyDates(); // ["2024-01-01", "2024-04-01", ...]
// const mockData = {
//   "RELIANCE.BSE": { dates, prices: generatePrices(2500, dates.length) },
//   "TCS.BSE": { dates, prices: generatePrices(3500, dates.length) },
//   "INFY.BSE": { dates, prices: generatePrices(1500, dates.length) },
//   "HDFCBANK.BSE": { dates, prices: generatePrices(1600, dates.length) },
//   "BHARTIARTL.BSE": { dates, prices: generatePrices(900, dates.length) },
// };

// // LocalStorage cache helpers
// function saveCache(key, data) {
//   localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
// }

// function getCache(key) {
//   const cached = JSON.parse(localStorage.getItem(key));
//   if (!cached) return null;
//   if (Date.now() - cached.time > CACHE_DURATION) return null;
//   return cached.data;
// }

// // Main function to get stock data
// export async function getStockData(symbol) {
//   const cached = getCache(symbol);
//   if (cached) return cached;

//   try {
//     const url = `${BASE_URL}?symbol=${symbol}&interval=1day&outputsize=365&apikey=${API_KEY}`;
//     const response = await fetch(url);
//     const result = await response.json();

//     if (!result.values) throw new Error("Invalid API data");

//     const dates = result.values.map(d => d.datetime).reverse();
//     const prices = result.values.map(d => parseFloat(d.close)).reverse();

//     const formatted = { dates, prices };
//     saveCache(symbol, formatted);
//     return formatted;
//   } catch (error) {
//     console.warn("API failed → using mock data for", symbol);
//     return mockData[symbol];
//   }
// }
const API_KEY = import.meta.env.REACT_APP_TWELVE_API_KEY;
const BASE_URL = "https://api.twelvedata.com/time_series";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 Hours Cache

// ✅ Generate quarterly dates for mock data
function generateQuarterlyDates(startYear = 2024, endYear = 2025) {
  const months = ["01", "04", "07", "10"];
  const dates = [];
  for (let year = startYear; year <= endYear; year++) {
    months.forEach(month => dates.push(`${year}-${month}-01`));
  }
  return dates;
}

// ✅ Generate random mock chart prices
function generatePrices(basePrice, count) {
  const prices = [];
  let price = basePrice;
  for (let i = 0; i < count; i++) {
    const change = price * (Math.random() * 0.08 - 0.04); // ±4% variation
    price = Math.max(price + change, 1);
    prices.push(Math.round(price * 100) / 100);
  }
  return prices;
}

// ✅ Support & Resistance
function calculateSupportResistance(prices) {
  const sorted = [...prices].sort((a, b) => a - b);
  return {
    support: Math.round((sorted[0] + sorted[1]) / 2),
    resistance: Math.round((sorted[sorted.length - 1] + sorted[sorted.length - 2]) / 2)
  };
}

const dates = generateQuarterlyDates();

// ✅ Mock Fundamental + Chart Data
const mockData = {
  "RELIANCE.BSE": {
    dates, prices: generatePrices(2500, dates.length),
    metrics: { pe: 26.5, pb: 2.1, roe: 14.5, debtEquity: 0.38 }
  },
  "TCS.BSE": {
    dates, prices: generatePrices(3500, dates.length),
    metrics: { pe: 30.8, pb: 12.5, roe: 38.2, debtEquity: 0.05 }
  },
  "INFY.BSE": {
    dates, prices: generatePrices(1500, dates.length),
    metrics: { pe: 28.9, pb: 7.4, roe: 32.1, debtEquity: 0.12 }
  },
  "HDFCBANK.BSE": {
    dates, prices: generatePrices(1600, dates.length),
    metrics: { pe: 20.3, pb: 2.8, roe: 16.5, debtEquity: 1.02 }
  },
  "BHARTIARTL.BSE": {
    dates, prices: generatePrices(900, dates.length),
    metrics: { pe: 58.4, pb: 6.9, roe: 12.2, debtEquity: 1.21 }
  },
};

// ✅ Store cache in localStorage
function saveCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
}

// ✅ Retrieve cache from localStorage
function getCache(key) {
  const cached = JSON.parse(localStorage.getItem(key));
  if (!cached) return null;
  if (Date.now() - cached.time > CACHE_DURATION) return null;
  return cached.data;
}

// ✅ Main fetch function
export async function getStockData(symbol) {
  const cached = getCache(symbol);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}?symbol=${symbol}&interval=1day&outputsize=365&apikey=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!result.values) throw new Error("Invalid API Data");

    const dates = result.values.map(d => d.datetime).reverse();
    const prices = result.values.map(d => parseFloat(d.close)).reverse();

    const { support, resistance } = calculateSupportResistance(prices);

    // ✅ API Data + calculated levels
    const formatted = {
      dates,
      prices,
      support,
      resistance,
      metrics: mockData[symbol]?.metrics || null // Fallback to mock fundamentals
    };

    saveCache(symbol, formatted);
    return formatted;
  } catch (error) {
    console.warn("API failed → using mock data:", symbol);

    const stock = mockData[symbol];
    const { support, resistance } = calculateSupportResistance(stock.prices);

    // ✅ Mock data formatted to match API structure
    return {
      ...stock,
      support,
      resistance
    };
  }
}