import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import { getMarketData, getMoneyFlowData, getTimeVariantOptions } from './../api';
import Chart from 'chart.js/auto';
import './DashboardHome.css';

export default function DashboardHome() {
    const navigate = useNavigate();
    const { state, isAuthenticated, logout } = useAuth();
    const [marketData, setMarketData] = useState([]);
    const [moneyFlowData, setMoneyFlowData] = useState([]);
    const [selectedRange, setSelectedRange] = useState(7); // Default to 7 days
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const timeVariantOptions = getTimeVariantOptions();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Fetch market data
    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const data = await getMarketData();
                setMarketData(data);
            } catch (error) {
                console.error('Error fetching market data:', error);
            }
        };

        fetchMarketData();
    }, []);

    // Fetch money flow data
    useEffect(() => {
        const fetchMoneyFlowData = async () => {
            try {
                const data = await getMoneyFlowData('bitcoin', selectedRange); // Example for Bitcoin
                setMoneyFlowData(data);
            } catch (error) {
                console.error('Error fetching money flow data:', error);
            }
        };

        fetchMoneyFlowData();
    }, [selectedRange]);

    // Check user authentication
    let user = state.user.user;
    if (!user) {
        const localStorageUser = localStorage.getItem('user');
        if (localStorageUser) {
            user = JSON.parse(localStorageUser).user;
        } else {
            logout();
        }
    }

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: moneyFlowData.prices?.map(price => new Date(price[0]).toLocaleDateString()) || [],
                    datasets: [{
                        label: 'Price',
                        data: moneyFlowData.prices?.map(price => price[1]) || [],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            });
        }
    }, [moneyFlowData]);

    // Redirect if the user is not authenticated
    if (!user) {
        navigate('/dashboard');
        return null;
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = marketData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

// Utility function to calculate "time ago"
const timeAgo = (date) => {
    const now = new Date();
    const secondsPast = Math.floor((now - date) / 1000);
  
    if (secondsPast < 60) {
      return `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast <= 86400) {
      return `${Math.floor(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast <= 2592000) {
      return `${Math.floor(secondsPast / 86400)} days ago`;
    }
    if (secondsPast <= 31104000) {
      return `${Math.floor(secondsPast / 2592000)} months ago`;
    }
    return `${Math.floor(secondsPast / 31104000)} years ago`;
  };
  
  const lastUpdated = new Date(); // Replace this with the actual last updated date
  

    return (
        <>
  
        <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
            <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

                <div className="table-container text-white">
        <div className="row g-3 align-items-center">
        <div className="col-xl-3 col-xxl-6">
            <img
            alt="..."
            className="img-fluid rounded-start"
            src="../img/promo_s_11.png"
            />
        </div>
          <div className="col-xl-9 col-xxl-6">
          <div className="home-header">
                <h1>Welcome, {user?.firstName || 'User'}</h1>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>
            <div className="card-body">
             
              <p className="card-text">
                {user?.email || 'User'}
              </p>
              <p className="card-text">
                <small className="text-muted text-white-50">
                  Last updated {timeAgo(lastUpdated)}
                </small>
              </p>
            </div>
          </div>
        </div>
                </div>
              
            </div>
        </div>

        <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
            <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
            
                <h2 className='text-white, text-center' style={{ padding:1, color:'#fff'}}>Money Flow Data</h2>
                <div className="table-container text-white">
                <div className="money-flow" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
                <select onChange={(e) => setSelectedRange(e.target.value)} value={selectedRange} style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
                    {timeVariantOptions.map(option => (
                        <option key={option.value} value={option.value} style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>{option.label}</option>
                    ))}
                </select>
                <canvas ref={chartRef} style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}} className='text-white' />
            </div>
                </div>
              
            </div>
        </div>
            <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

                <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

                <h2 className='text-white, text-center' style={{ padding:1, color:'#fff'}}>Market Data</h2>
                    <div className="table-container text-white">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>market_cap</th>
                                <th>total_volume</th>
                                <th>circulating_supply</th>
                                <th>price_change_percentage_24h</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((data, index) => (
                                <tr key={index} style={{backgroundColor:'#000033', color:'#fff'}} >
                                    <td>{data.name}</td>
                                    <td>{data.current_price}</td>
                                    <td>{data.market_cap}</td>
                                    <td>{data.total_volume}</td>
                                    <td>{data.circulating_supply}</td>
                                    <td>{data.price_change_percentage_24h}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(marketData.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
           
            </div>
        </>
    );
}



// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './../AuthContext';
// import { getMarketData, getMoneyFlowData, getTimeVariantOptions } from './../api';
// import Chart from 'chart.js/auto';
// import './DashboardHome.css';


// export default function DashboardHome() {
//   const navigate = useNavigate();
//   const { state, isAuthenticated, logout } = useAuth();
//   const [marketData, setMarketData] = useState([]);
//   const [moneyFlowData, setMoneyFlowData] = useState([]);
//   const [selectedRange, setSelectedRange] = useState(7); // Default to 7 days
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const timeVariantOptions = getTimeVariantOptions();
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   // Fetch market data
//   useEffect(() => {
//       const fetchMarketData = async () => {
//           try {
//               const data = await getMarketData();
//               setMarketData(data);
//           } catch (error) {
//               console.error('Error fetching market data:', error);
//           }
//       };

//       fetchMarketData();
//   }, []);

//   // Fetch money flow data
//   useEffect(() => {
//       const fetchMoneyFlowData = async () => {
//           try {
//               const data = await getMoneyFlowData('bitcoin', selectedRange); // Example for Bitcoin
//               setMoneyFlowData(data);
//           } catch (error) {
//               console.error('Error fetching money flow data:', error);
//           }
//       };

//       fetchMoneyFlowData();
//   }, [selectedRange]);

//   // Check user authentication
//   let user = state.user.user;
//   if (!user) {
//       const localStorageUser = localStorage.getItem('user');
//       if (localStorageUser) {
//           user = JSON.parse(localStorageUser).user;
//       } else {
//           logout();
//       }
//   }

//   useEffect(() => {
//       if (chartInstance.current) {
//           chartInstance.current.destroy();
//       }

//       const ctx = chartRef.current.getContext('2d');
//       if (ctx) {
//           chartInstance.current = new Chart(ctx, {
//               type: 'line',
//               data: {
//                   labels: moneyFlowData.prices?.map(price => new Date(price[0]).toLocaleDateString()) || [],
//                   datasets: [{
//                       label: 'Price',
//                       data: moneyFlowData.prices?.map(price => price[1]) || [],
//                       fill: false,
//                       borderColor: 'rgb(75, 192, 192)',
//                       tension: 0.1
//                   }]
//               }
//           });
//       }
//   }, [moneyFlowData]);

//   // Redirect if the user is not authenticated
//   if (!user) {
//       navigate('/dashboard');
//       return null;
//   }

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = marketData.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
// // Utility function to calculate "time ago"
// const timeAgo = (date) => {
//   const now = new Date();
//   const secondsPast = Math.floor((now - date) / 1000);

//   if (secondsPast < 60) {
//     return `${secondsPast} seconds ago`;
//   }
//   if (secondsPast < 3600) {
//     return `${Math.floor(secondsPast / 60)} minutes ago`;
//   }
//   if (secondsPast <= 86400) {
//     return `${Math.floor(secondsPast / 3600)} hours ago`;
//   }
//   if (secondsPast <= 2592000) {
//     return `${Math.floor(secondsPast / 86400)} days ago`;
//   }
//   if (secondsPast <= 31104000) {
//     return `${Math.floor(secondsPast / 2592000)} months ago`;
//   }
//   return `${Math.floor(secondsPast / 31104000)} years ago`;
// };

// const lastUpdated = new Date(); // Replace this with the actual last updated date

// return (
//   <>
//   <div className="row my-2 g-3 gx-lg-4 col-10">
//     <div className="d-flex justify-content-between align-items-center w-100">
//       <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//         <div className="row g-3 align-items-center">
//           <div className="col-xl-3 col-xxl-6">
//             <img
//               alt="..."
//               className="img-fluid rounded-start"
//               src="../assets/img/promo_s_11.png"
//             />
//           </div>
//           <div className="col-xl-9 col-xxl-6">
//             <div className="card-body">
//               <h6 className="card-title">
//                 Welcome--
//               </h6>
//               <h5 className="card-title">
//                 {user?.firstName || 'User'}
//               </h5>
//               <p className="card-text">
//                 {user?.email || 'User'}
//               </p>
//               <p className="card-text">
//                 <small className="text-muted text-white-50">
//                   Last updated {timeAgo(lastUpdated)}
//                 </small>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//         <button onClick={logout} className="btn btn-danger">Logout</button>
//       </div>
//     </div>
//   </div>

//         <div className="container  col-10" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
           

//             <div className="row my-2 g-3 gx-lg-4 pb-3">
//                 <div className="col-xl-7 col-xxl-9">
//                     <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//                         <h5 className="mb-0">
//                             Active Overall Growth
//                         </h5>
//                         <div className="pb-2 pt-3">
//                             <canvas ref={chartRef} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//             <div className="row my-2 g-3 gx-lg-4 container  col-10" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
//                 <div className="col-md-6 col-xl-12">
//                     <div className="market-data">
//                         <h2>Market Data</h2>
//                         <div className="d-flex mb-3">
//                             <select
//                                 className="form-select"
//                                 onChange={(e) => setSelectedRange(e.target.value)}
//                                 value={selectedRange}
//                             >
//                                 {timeVariantOptions.map(option => (
//                                     <option key={option.value} value={option.value}>{option.label}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="table-responsive">
//                             <table className="table">
//                                 <thead>
//                                     <tr className="border-bottom">
//                                         <th className="fw-bold">Name</th>
//                                         <th className="fw-bold">Price</th>
//                                         <th className="fw-bold">Market Cap</th>
//                                         <th className="fw-bold">Total Volume</th>
//                                         <th className="fw-bold">Circulating Supply</th>
//                                         <th className="fw-bold">24h Price Change</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentItems.map((data, index) => (
//                                         <tr key={index} className="border-b2">
//                                             <td>{data.name}</td>
//                                             <td>{data.current_price}</td>
//                                             <td>{data.market_cap}</td>
//                                             <td>{data.total_volume}</td>
//                                             <td>{data.circulating_supply}</td>
//                                             <td className="d-flex align-items-center gap-2">{data.price_change_percentage_24h}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <nav className="d-flex justify-content-center mt-4">
//                             <ul className="pagination">
//                                 {Array.from({ length: Math.ceil(marketData.length / itemsPerPage) }, (_, i) => (
//                                     <li
//                                         key={i + 1}
//                                         className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
//                                     >
//                                         <button
//                                             className="page-link"
//                                             onClick={() => paginate(i + 1)}
//                                         >
//                                             {i + 1}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }



// import React from 'react'

// export default function DashboardHome() {
//   return (
//     <>
//       <div className="row my-2 g-3 g-lg-4">
//        <div className="col-md-6 col-xl-4 col-xxl-3">
//          <div className="price-box">
//            <div className="d-flex align-items-center justify-content-between">
//              <div>
//                <p className="text-white mb-0">
//                  Bitcoin
//                </p>
//                <h4 className="fw-semibold text-white mb-0">
//                  $1200.00
//                </h4>
//              </div>
//              <img
//                alt=""
//                src="./assets/img/crypto/bitcoin.png"
//              />
//            </div>
//            <div className="chart">
//              <canvas id="chart_2" />
//            </div>
//          </div>
//        </div>
//        <div className="col-md-6 col-xl-4 col-xxl-3">
//          <div className="price-box">
//            <div className="d-flex align-items-center justify-content-between">
//              <div>
//                <p className="text-white mb-0">
//                  Ethereum
//                </p>
//                <h4 className="fw-semibold text-white mb-0">
//                  $100.00
//                </h4>
//              </div>
//              <img
//                alt=""
//                src="./assets/img/crypto/etherium.png"
//              />
//            </div>
//            <div className="chart">
//              <canvas id="chart_3" />
//            </div>
//          </div>
//        </div>
//        <div className="col-md-6 col-xl-4 col-xxl-3">
//          <div className="price-box">
//            <div className="d-flex align-items-center justify-content-between">
//              <div>
//                <p className="text-white mb-0">
//                  Dogecoin
//                </p>
//                <h4 className="fw-semibold text-white mb-0">
//                  $2500.00
//                </h4>
//              </div>
//              <img
//                alt=""
//                src="./assets/img/crypto/dogecoin.png"
//              />
//            </div>
//            <div className="chart">
//              <canvas id="chart_4" />
//            </div>
//          </div>
//        </div>
//        <div className="col-md-6 col-xl-4 col-xxl-3">
//          <div className="price-box">
//            <div className="d-flex align-items-center justify-content-between">
//              <div>
//                <p className="text-white mb-0">
//                  Binance
//                </p>
//                <h4 className="fw-semibold text-white mb-0">
//                  $3200.00
//                </h4>
//              </div>
//              <img
//                alt=""
//                src="./assets/img/crypto/binance.png"
//              />
//            </div>
//            <div className="chart">
//              <canvas id="chart_5" />
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="row my-2 g-3 gx-lg-4">
//        <div className="col-xl-7 col-xxl-9">
//          <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//            <div className="d-flex w-100 flex-wrap justify-content-between pb-4 bottom-border">
//              <h4 className="mb-0">
//                Monthly Overall Growth
//              </h4>
//              <div className="d-flex align-items-center gap-3">
//                <button className="outline-btn">
//                  Week
//                </button>
//                <button className="outline-btn">
//                  Month
//                </button>
//                <button className="outline-btn">
//                  Year
//                </button>
//              </div>
//            </div>
//            <div className="chart-container">
//              <canvas id="chart_1" />
//            </div>
//          </div>
//        </div>
//        <div className="col-xl-5 col-xxl-3">
//          <div className="doughnut">
//            <div
//              className="position-relative"
//              id="donut_wrapper"
//            >
//              <div id="donutchart" />
//            </div>
//            <p className="large text-center mt-3">
//              Total Balance
//            </p>
//            <h3 className="text-white text-center">
//              0.3475948
//            </h3>
//            <p className="primary text-center">
//              11,032.24 USD
//            </p>
//            <div className="d-flex justify-content-center">
//              <button className="primary-btn">
//                Withdraw
//              </button>
//            </div>
//          </div>
//        </div>
//      </div>
//      <div className="row my-2 g-3 gx-lg-4 pb-3">
//        <div className="col-xl-7 col-xxl-9">
//          <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
//            <div>
//              <h5 className="mb-0">
//                Active Overall Growth
//              </h5>
//            </div>
//            <div className="recent-contact pb-2 pt-3">
//              <table>
//                <thead>
//                  <tr className="border-b2">
//                    <th className="fw-bold">
//                      Type
//                    </th>
//                    <th className="fw-bold">
//                      Asset
//                    </th>
//                    <th className="fw-bold">
//                      Date
//                    </th>
//                    <th className="fw-bold">
//                      IP Address
//                    </th>
//                    <th className="fw-bold">
//                      Status List
//                    </th>
//                    <th className="fw-bold">
//                      Amount
//                    </th>
//                  </tr>
//                </thead>
//                <tbody>
//                  <tr className="border-b2">
//                    <td>
//                      Exchange
//                    </td>
//                    <td className="d-flex align-items-center gap-2">
//                      <img
//                        alt=""
//                        src="./assets/img/crypto/bitcoin.png"
//                      />
//                      Bitcoin
//                    </td>
//                    <td>
//                      Apr 14, 2023
//                    </td>
//                    <td>
//                      140.91.94.219
//                    </td>
//                    <td>
//                      <span className="green-tag">
//                        Success
//                      </span>
//                    </td>
//                    <td>
//                      11,250 BTC
//                    </td>
//                  </tr>
//                  <tr className="border-b2">
//                    <td>
//                      Exchange
//                    </td>
//                    <td className="d-flex align-items-center gap-2">
//                      <img
//                        alt=""
//                        src="./assets/img/crypto/binance.png"
//                      />
//                      Binance
//                    </td>
//                    <td>
//                      Apr 14, 2023
//                    </td>
//                    <td>
//                      140.91.94.219
//                    </td>
//                    <td>
//                      <span className="red-tag">
//                        Unpaid
//                      </span>
//                    </td>
//                    <td>
//                      11,250 BTC
//                    </td>
//                  </tr>
//                  <tr className="border-b2">
//                    <td>
//                      Exchange
//                    </td>
//                    <td className="d-flex align-items-center gap-2">
//                      <img
//                        alt=""
//                        src="./assets/img/crypto/dash.png"
//                      />
//                      Dashcoin
//                    </td>
//                    <td>
//                      Apr 14, 2023
//                    </td>
//                    <td>
//                      140.91.94.219
//                    </td>
//                    <td>
//                      <span className="green-tag">
//                        Success
//                      </span>
//                    </td>
//                    <td>
//                      11,250 BTC
//                    </td>
//                  </tr>
//                  <tr className="border-b2">
//                    <td>
//                      Exchange
//                    </td>
//                    <td className="d-flex align-items-center gap-2">
//                      <img
//                        alt=""
//                        src="./assets/img/crypto/dogecoin.png"
//                      />
//                      Dogecoin
//                    </td>
//                    <td>
//                      Apr 14, 2023
//                    </td>
//                    <td>
//                      140.91.94.219
//                    </td>
//                    <td>
//                      <span className="red-tag">
//                        Unpaid
//                      </span>
//                    </td>
//                    <td>
//                      11,250 BTC
//                    </td>
//                  </tr>
//                  <tr className="border-b2">
//                    <td>
//                      Exchange
//                    </td>
//                    <td className="d-flex align-items-center gap-2">
//                      <img
//                        alt=""
//                        src="./assets/img/crypto/etherium.png"
//                      />
//                      Ethereum
//                    </td>
//                    <td>
//                      Apr 14, 2023
//                    </td>
//                    <td>
//                      140.91.94.219
//                    </td>
//                    <td>
//                      <span className="red-tag">
//                        Pending
//                      </span>
//                    </td>
//                    <td>
//                      11,250 BTC
//                    </td>
//                  </tr>
//                  <tr className="border-b2">
//                    <td>
//                      Exchange
//                    </td>
//                    <td className="d-flex align-items-center gap-2">
//                      <img
//                        alt=""
//                        src="./assets/img/crypto/tether.png"
//                      />
//                      Tether
//                    </td>
//                    <td>
//                      Apr 14, 2023
//                    </td>
//                    <td>
//                      140.91.94.219
//                    </td>
//                    <td>
//                      <span className="red-tag">
//                        Pending
//                      </span>
//                    </td>
//                    <td>
//                      11,250 BTC
//                    </td>
//                  </tr>
//                </tbody>
//              </table>
//            </div>
//          </div>
//        </div>
//        <div className="col-xl-5 col-xxl-3">
//          <div className="doughnut">
//            <h5 className="text-whit mb-3">
//              Recent Transaction
//            </h5>
//            <div className="coins-list">
//              <div className="coin d-flex justify-content-between align-items-center border-b2">
//                <div className="d-flex gap-2 align-items-center">
//                  <div>
//                    <img
//                      alt=""
//                      src="./assets/img/crypto/bitcoin.png"
//                    />
//                  </div>
//                  <div className="d-flex flex-column">
//                    <span className="text-white">
//                      Bitcon
//                    </span>
//                    <span className="medium">
//                      Today, 3.50 PM
//                    </span>
//                  </div>
//                </div>
//                <h5 className="text-white">
//                  $47,515
//                </h5>
//              </div>
//              <div className="coin d-flex justify-content-between align-items-center border-b2">
//                <div className="d-flex gap-2 align-items-center">
//                  <div>
//                    <img
//                      alt=""
//                      src="./assets/img/crypto/tether.png"
//                    />
//                  </div>
//                  <div className="d-flex flex-column">
//                    <span className="text-white">
//                      Litcon
//                    </span>
//                    <span className="medium">
//                      Today, 3.50 PM
//                    </span>
//                  </div>
//                </div>
//                <h5 className="text-white">
//                  $37,515
//                </h5>
//              </div>
//              <div className="coin d-flex justify-content-between align-items-center border-b2">
//                <div className="d-flex gap-2 align-items-center">
//                  <div>
//                    <img
//                      alt=""
//                      src="./assets/img/crypto/binance.png"
//                    />
//                  </div>
//                  <div className="d-flex flex-column">
//                    <span className="text-white">
//                      Binance
//                    </span>
//                    <span className="medium">
//                      Today, 3.50 PM
//                    </span>
//                  </div>
//                </div>
//                <h5 className="text-white">
//                  $27,515
//                </h5>
//              </div>
//              <div className="coin d-flex justify-content-between align-items-center border-b2">
//                <div className="d-flex gap-2 align-items-center">
//                  <div>
//                    <img
//                      alt=""
//                      src="./assets/img/crypto/etherium.png"
//                    />
//                  </div>
//                  <div className="d-flex flex-column">
//                    <span className="text-white">
//                      Ethereum
//                    </span>
//                    <span className="medium">
//                      Today, 3.50 PM
//                    </span>
//                  </div>
//                </div>
//                <h5 className="text-white">
//                  $23,515
//                </h5>
//              </div>
//              <div className="coin d-flex justify-content-between align-items-center border-b2">
//                <div className="d-flex gap-2 align-items-center">
//                  <div>
//                    <img
//                      alt=""
//                      src="./assets/img/crypto/dogecoin.png"
//                    />
//                  </div>
//                  <div className="d-flex flex-column">
//                    <span className="text-white">
//                      Dogecoin
//                    </span>
//                    <span className="medium">
//                      Today, 3.50 PM
//                    </span>
//                  </div>
//                </div>
//                <h5 className="text-white">
//                  $22,515
//                </h5>
//              </div>
//              <div className="coin d-flex justify-content-between align-items-center border-b2">
//                <div className="d-flex gap-2 align-items-center">
//                  <div>
//                    <img
//                      alt=""
//                      src="./assets/img/crypto/dash.png"
//                    />
//                  </div>
//                  <div className="d-flex flex-column">
//                    <span className="text-white">
//                      Dashcoin
//                    </span>
//                    <span className="medium">
//                      Today, 3.50 PM
//                    </span>
//                  </div>
//                </div>
//                <h5 className="text-white">
//                  $21,515
//                </h5>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//     </>
//   )
// }
