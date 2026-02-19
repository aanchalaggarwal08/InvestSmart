export async function getStockData(symbol) {
  try {
    const response = await fetch(
      `https://www.nseindia.com/api/quote-equity?symbol=${symbol}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const data = await response.json();

    const prices = data.priceInfo?.lastPrice ? [data.priceInfo.lastPrice] : [];

    // For now: chart is static, because NSE blocks bulk history
    return {
      name: symbol,
      prices,
      dates: ["Today"],
    };
  } catch (err) {
    console.log("Error fetching data:", err);
    return null;
  }
}
if (result) {
  const { dates, prices } = result;

  const { support, resistance } = calculateSupportResistance(prices);

  return {
    dates,
    prices,
    support,
    resistance,
    metrics: result.metrics // fundamentals
  };
}