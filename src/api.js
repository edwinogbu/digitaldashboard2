import axios from "axios";

export const getDetailedCoinData = async (coinId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getCoinMarketChart = async (coinId, selectedRange) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getMarketData = async (pageNumber = 1) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getWatchlistedCoins = async (pageNumber = 1, coinIds) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getAllCoins = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const getTrendingCoins = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/search/trending?include_platform=false`)
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/exchange_rates?include_platform=false`)
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export const Global = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/global?include_platform=false`)
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const getCandleChartData = async (coinId, days = 1) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}



// Function to fetch money flow data
export const getMoneyFlowData = async (coinId, days) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: 'daily',
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error fetching money flow data:", e);
    throw new Error("Failed to fetch money flow data");
  }
};


// Function to get time variant options
export const getTimeVariantOptions = () => {
  return [
    { label: "1 Day", value: 1 },
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 },
    { label: "1 Year", value: 365 },
  ];
};
