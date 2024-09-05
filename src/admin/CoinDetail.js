import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData,
  getTimeVariantOptions,
  getMoneyFlowData
} from '../api'; // Update the import path
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function CoinDetail() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [marketChartData, setMarketChartData] = useState(null);
  const [candleChartData, setCandleChartData] = useState(null);
  const [moneyFlowData, setMoneyFlowData] = useState(null);
  const [selectedRange, setSelectedRange] = useState(30); // Default to 30 days
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailedData = await getDetailedCoinData(coinId);
        setCoinData(detailedData);

        const chartData = await getCoinMarketChart(coinId, selectedRange);
        setMarketChartData(chartData);

        const candleData = await getCandleChartData(coinId, selectedRange);
        setCandleChartData(candleData);

        const flowData = await getMoneyFlowData(coinId, selectedRange);
        setMoneyFlowData(flowData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    fetchData();
  }, [coinId, selectedRange]);

  const handleRangeChange = async (event) => {
    setSelectedRange(event.target.value);
    setLoading(true);

    try {
      const chartData = await getCoinMarketChart(coinId, event.target.value);
      setMarketChartData(chartData);

      const candleData = await getCandleChartData(coinId, event.target.value);
      setCandleChartData(candleData);

      const flowData = await getMoneyFlowData(coinId, event.target.value);
      setMoneyFlowData(flowData);

      setLoading(false);
    } catch (error) {
      console.error("Error updating charts:", error);
    }
  };

  const getChartOptions = (data, label) => ({
    labels: data?.map(item => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: label,
        data: data?.map(item => item[1]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container"  style={{ backgroundColor: '#000033', color: '#FFF' }}>
      <div className="row container-fluid main-content px-2 px-lg-4">
        <div className="col-md-4" >
          <h1>{coinData?.name}</h1>
          <p style={{ backgroundColor: '#000033', color: '#FFF', border:5 }}>{coinData?.description.en}</p>
          <h3>Current Price: ${coinData?.market_data.current_price.usd.toFixed(2)}</h3>
          <h4>Market Cap: ${coinData?.market_data.market_cap.usd.toLocaleString()}</h4>
          <h4>Total Volume: ${coinData?.market_data.total_volume.usd.toLocaleString()}</h4>
        </div>
        <div className="col-md-8">
          <select onChange={handleRangeChange} value={selectedRange}>
            {getTimeVariantOptions().map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="chart-container">
            <h3>Price Chart</h3>
            {marketChartData && (
              <Line data={getChartOptions(marketChartData.prices, 'Price')} />
            )}
          </div>
          <div className="chart-container">
            <h3>Candle Chart</h3>
            {candleChartData && (
              <Line data={getChartOptions(candleChartData, 'Candles')} />
            )}
          </div>
          <div className="chart-container">
            <h3>Money Flow</h3>
            {moneyFlowData && (
              <Line data={getChartOptions(moneyFlowData.prices, 'Money Flow')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // For handling route parameters
// import { getCoinDetail } from '../api'; // Update the import path as needed

// export default function CoinDetail() {
//   const { coinId } = useParams(); // Retrieve the coin ID from the route parameters
//   const [coinData, setCoinData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCoinDetail = async () => {
//       try {
//         const data = await getCoinDetail(coinId); // Fetch coin details
//         setCoinData(data);
//         setLoading(false);
//       } catch (e) {
//         setError(e.message); // Handle errors
//         setLoading(false);
//       }
//     };

//     fetchCoinDetail(); // Call the fetch function
//   }, [coinId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!coinData) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div className="container-fluid coin-detail px-2 px-lg-4">
//       <div className="row my-4">
//         <div className="col-md-6">
//           <h2>{coinData.name} ({coinData.symbol.toUpperCase()})</h2>
//           <div className="d-flex align-items-center">
//             <img
//               src={coinData.image}
//               alt={coinData.name}
//               className="coin-image"
//               style={{ width: '50px', height: '50px' }}
//             />
//             <div className="ms-3">
//               <h4>${coinData.current_price.toFixed(2)}</h4>
//               <p>Market Cap: ${coinData.market_cap.toLocaleString()}</p>
//               <p>24h Change: <span className={coinData.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
//                 {coinData.price_change_percentage_24h.toFixed(2)}%
//               </span></p>
//               <p>Total Volume: ${coinData.total_volume.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h3>Description</h3>
//           <p>{coinData.description.en}</p>
//         </div>
//       </div>
//       <div className="row my-4">
//         <div className="col-12">
//           <h3>Price Chart</h3>
//           {/* Placeholder for price chart */}
//           <div className="chart-container">
//             <canvas id="priceChart" width="400" height="200"></canvas>
//           </div>
//         </div>
//       </div>
//       <div className="row my-4">
//         <div className="col-12">
//           <h3>Additional Info</h3>
//           <ul>
//             <li>Circulating Supply: {coinData.circulating_supply}</li>
//             <li>Total Supply: {coinData.total_supply}</li>
//             <li>All-Time High: ${coinData.ath.toFixed(2)}</li>
//             <li>All-Time High Date: {coinData.ath_date}</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
