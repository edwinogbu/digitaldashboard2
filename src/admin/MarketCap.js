import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import { getMarketData, getMoneyFlowData, getTimeVariantOptions } from './../api';
import Chart from 'chart.js/auto';
import './DashboardHome.css';

export default function MarketCap() {
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

    useEffect(() => {
        const fetchMarketData = async () => {
            const localMarketData = localStorage.getItem('marketData');
            if (localMarketData) {
                setMarketData(JSON.parse(localMarketData));
            } else {
                try {
                    const data = await getMarketData();
                    setMarketData(data);
                    localStorage.setItem('marketData', JSON.stringify(data));
                } catch (error) {
                    console.error('Error fetching market data:', error);
                }
            }
        };

        fetchMarketData();
    }, []);

    useEffect(() => {
        const fetchMoneyFlowData = async () => {
            const localMoneyFlowData = localStorage.getItem(`moneyFlowData-${selectedRange}`);
            if (localMoneyFlowData) {
                setMoneyFlowData(JSON.parse(localMoneyFlowData));
            } else {
                try {
                    const data = await getMoneyFlowData('bitcoin', selectedRange);
                    setMoneyFlowData(data);
                    localStorage.setItem(`moneyFlowData-${selectedRange}`, JSON.stringify(data));
                } catch (error) {
                    console.error('Error fetching money flow data:', error);
                }
            }
        };

        fetchMoneyFlowData();
    }, [selectedRange]);

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

    if (!user) {
        navigate('/dashboard');
        return null;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = marketData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-home">
            <div className="home-header">
                <h1>Welcome, {user?.firstName || 'User'}</h1>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>
            
            <div className="market-data">
                <h2>Market Data</h2>
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Market Cap</th>
                            <th>Total Volume</th>
                            <th>Circulating Supply</th>
                            <th>Price Change (24h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data, index) => (
                            <tr key={index}>
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

            <div className="money-flow">
                <h2>Money Flow Data</h2>
                <select onChange={(e) => setSelectedRange(e.target.value)} value={selectedRange}>
                    {timeVariantOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}


// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './../AuthContext';
// import { getMarketData, getMoneyFlowData, getTimeVariantOptions } from './../api';
// import Chart from 'chart.js/auto';
// import './DashboardHome.css';

// export default function MarketCap() {
//     const navigate = useNavigate();
//     const { state, isAuthenticated, logout } = useAuth();
//     const [marketData, setMarketData] = useState([]);
//     const [moneyFlowData, setMoneyFlowData] = useState([]);
//     const [selectedRange, setSelectedRange] = useState(7); // Default to 7 days
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;
//     const timeVariantOptions = getTimeVariantOptions();
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);

//     // Fetch market data
//     useEffect(() => {
//         const fetchMarketData = async () => {
//             try {
//                 const data = await getMarketData();
//                 setMarketData(data);
//             } catch (error) {
//                 console.error('Error fetching market data:', error);
//             }
//         };

//         fetchMarketData();
//     }, []);

//     // Fetch money flow data
//     useEffect(() => {
//         const fetchMoneyFlowData = async () => {
//             try {
//                 const data = await getMoneyFlowData('bitcoin', selectedRange); // Example for Bitcoin
//                 setMoneyFlowData(data);
//             } catch (error) {
//                 console.error('Error fetching money flow data:', error);
//             }
//         };

//         fetchMoneyFlowData();
//     }, [selectedRange]);

//     // Check user authentication
//     let user = state.user.user;
//     if (!user) {
//         const localStorageUser = localStorage.getItem('user');
//         if (localStorageUser) {
//             user = JSON.parse(localStorageUser).user;
//         } else {
//             logout();
//         }
//     }

//     useEffect(() => {
//         if (chartInstance.current) {
//             chartInstance.current.destroy();
//         }

//         const ctx = chartRef.current.getContext('2d');
//         if (ctx) {
//             chartInstance.current = new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels: moneyFlowData.prices?.map(price => new Date(price[0]).toLocaleDateString()) || [],
//                     datasets: [{
//                         label: 'Price',
//                         data: moneyFlowData.prices?.map(price => price[1]) || [],
//                         fill: false,
//                         borderColor: 'rgb(75, 192, 192)',
//                         tension: 0.1
//                     }]
//                 }
//             });
//         }
//     }, [moneyFlowData]);

//     // Redirect if the user is not authenticated
//     if (!user) {
//         navigate('/dashboard');
//         return null;
//     }

//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = marketData.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className="dashboard-home">
//             <div className="home-header">
//                 <h1>Welcome, {user?.firstName || 'User'}</h1>
//                 <button onClick={logout} className="logout-button">Logout</button>
//             </div>
            
//             <div className="market-data">
//                 <h2>Market Data</h2>
//                 <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>market_cap</th>
//                             <th>total_volume</th>
//                             <th>circulating_supply</th>
//                             <th>price_change_percentage_24h</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentItems.map((data, index) => (
//                             <tr key={index}>
//                                 <td>{data.name}</td>
//                                 <td>{data.current_price}</td>
//                                 <td>{data.market_cap}</td>
//                                 <td>{data.total_volume}</td>
//                                 <td>{data.circulating_supply}</td>
//                                 <td>{data.price_change_percentage_24h}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                </div> 
//                 <div className="pagination">
//                     {Array.from({ length: Math.ceil(marketData.length / itemsPerPage) }, (_, i) => (
//                         <button
//                             key={i + 1}
//                             onClick={() => paginate(i + 1)}
//                             className={currentPage === i + 1 ? 'active' : ''}
//                         >
//                             {i + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>


//             <div className="money-flow">
//                 <h2>Money Flow Data</h2>
//                 <select onChange={(e) => setSelectedRange(e.target.value)} value={selectedRange}>
//                     {timeVariantOptions.map(option => (
//                         <option key={option.value} value={option.value}>{option.label}</option>
//                     ))}
//                 </select>
//                 <canvas ref={chartRef} />
//             </div>
//         </div>
//     );
// }




// import React, { useEffect, useState } from 'react';
// import './WhatsappChatBox.css'; // Make sure to create and import a CSS file for styling

// function MarketCap() {
//     const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
//     const [filterOptions, setFilterOptions] = useState([
//         { id: 1, label: 'Currency type' },
//         { id: 2, label: 'Credit' },
//         { id: 3, label: 'Debit' },
//     ]);
//     const [sortingOptions, setSortingOptions] = useState([
//         { id: 1, label: 'Volume' },
//         { id: 2, label: 'Pending' },
//         { id: 3, label: 'Success' },
//     ]);

//     useEffect(() => {
//         fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5000&page=1&sparkline=false&price_change_percentage=24h')
//             .then(response => response.json())
//             .then(data => {
//                 const transformedData = data.map(item => ({
//                     id: item.id,
//                     currency: item.name,
//                     price: `$${item.current_price.toLocaleString()}`,
//                     marketCap: `$${item.market_cap.toLocaleString()}`,
//                     volume: `$${item.total_volume.toLocaleString()}`,
//                     circulatingSupply: item.circulating_supply.toLocaleString(),
//                     change24h: `${item.price_change_percentage_24h.toFixed(2)}%`,
//                 }));
//                 setCryptocurrencyData(transformedData);
//             })
//             .catch(error => console.error('Error fetching cryptocurrency data:', error));
//     }, []);

//     return (
//         <div className="content">
//             {/* WhatsApp Chat Box */}
//             <div className="whatsapp-chat-box">
//                 <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
//                     <img src="assets/img/whatsapp-icon.png" alt="WhatsApp Chat" />
//                 </a>
//             </div>

//             <div className="row">
//                 <div className="col-sm-10 offset-2">
//                     <div className="buy-form">
//                         <div className="border-watch">
//                             <div className="row">
//                                 <div className="col-xl-4 col-lg-3 d-flex align-items-center">
//                                     <div className="watch-head">
//                                         <h4>Digital Payout Cryptocurrency Market Cap</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-4 d-flex align-items-center">
//                                     <div className="market-cap-list">
//                                         <ul>
//                                             {/* Sample static market cap list */}
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-08.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-03.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-01.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-02.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-07.svg" alt="" /></a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-5 d-flex ">
//                                     <div className="trad-book-grp ms-auto">
//                                         <div className="bookingrange btn-book me-2">
//                                             <img src="assets/img/icon/calendar-icon.svg" alt="" />
//                                             <span></span>
//                                         </div>
//                                         <div className="down-range btn-down">
//                                             <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="market-area"></div>
//                     </div>
//                     <div className="recent-buy comman-head">
//                         <h3>Digital Payout Cryptocurrency Market Capitalizations</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="buy-form-crypto mb-0">
//                                     <div className="border-watch mb-2">
//                                         <div className="row">
//                                             <div className="col-xl-9 d-flex align-items-center">
//                                                 <div className="status-blk">
//                                                     <div className="row">
//                                                         <div className="col-lg-2">
//                                                             <div className="action-head">
//                                                                 <h4>Latest actions </h4>
//                                                                 <span>(Showing 01 to 06 of 100)</span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {filterOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {sortingOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-xl-3 d-flex align-items-center">
//                                                 <label className="me-2">SortBy:</label>
//                                                 <div className="form-group date-border sort-by cal-icon me-2">
//                                                     <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                 </div>
//                                                 <div className="down-range date-border">
//                                                     <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="datatable table custom-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>ID No</th>
//                                                     <th>Currency type</th>
//                                                     <th style={{ minWidth: '10px' }}>Price</th>
//                                                     <th style={{ minWidth: '10px' }}>Market Cap</th>
//                                                     <th style={{ minWidth: '10px' }}>Volume</th>
//                                                     <th style={{ minWidth: '10px' }}>Circulating Supply</th>
//                                                     <th style={{ minWidth: '10px' }}>Change 24 h</th>
//                                                     <th style={{ minWidth: '10px' }}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cryptocurrencyData.map(item => (
//                                                     <tr key={item.id}>
//                                                         <td><a href="javascript:;">#{item.id}</a></td>
//                                                         <td>{item.currency}</td>
//                                                         <td>{item.price}</td>
//                                                         <td>{item.marketCap}</td>
//                                                         <td>{item.volume}</td>
//                                                         <td>{item.circulatingSupply}</td>
//                                                         <td><span className={`custom-badge ${item.change24h.includes('-') ? 'status-red' : 'status-green'}`}>{item.change24h}</span></td>
//                                                         <td className="text-end">
//                                                             <div className="dropdown dropdown-action">
//                                                                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="feather-more-vertical"></i></a>
//                                                                 <div className="dropdown-menu dropdown-menu-right">
//                                                                     <a className="dropdown-item" href="javascript:;"><i className="fas fa-pencil-alt m-r-5"></i>Edit</a>
//                                                                     <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MarketCap;


// import React, { useEffect, useState } from 'react';

// function MarketCap() {
//     const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
//     const [filterOptions, setFilterOptions] = useState([
//         { id: 1, label: 'Currency type' },
//         { id: 2, label: 'Credit' },
//         { id: 3, label: 'Debit' },
//     ]);
//     const [sortingOptions, setSortingOptions] = useState([
//         { id: 1, label: 'Volume' },
//         { id: 2, label: 'Pending' },
//         { id: 3, label: 'Success' },
//     ]);

//     useEffect(() => {
//         fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5000&page=1&sparkline=false&price_change_percentage=24h')
//             .then(response => response.json())
//             .then(data => {
//                 const transformedData = data.map(item => ({
//                     id: item.id,
//                     currency: item.name,
//                     price: `$${item.current_price.toLocaleString()}`,
//                     marketCap: `$${item.market_cap.toLocaleString()}`,
//                     volume: `$${item.total_volume.toLocaleString()}`,
//                     circulatingSupply: item.circulating_supply.toLocaleString(),
//                     change24h: `${item.price_change_percentage_24h.toFixed(2)}%`,
//                 }));
//                 setCryptocurrencyData(transformedData);
//             })
//             .catch(error => console.error('Error fetching cryptocurrency data:', error));
//     }, []);

//     return (
//         <div className="content">
//             <div className="row">
//                 <div className="col-sm-12">
//                     <div className="buy-form">
//                         <div className="border-watch">
//                             <div className="row">
//                                 <div className="col-xl-4 col-lg-3 d-flex align-items-center">
//                                     <div className="watch-head">
//                                         <h4>Digital Payout Cryptocurrency Market Cap</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-4 d-flex align-items-center">
//                                     <div className="market-cap-list">
//                                         <ul>
//                                             {/* Sample static market cap list */}
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-08.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-03.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-01.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-02.svg" alt="" /></a>
//                                             </li>
//                                             <li>
//                                                 <a href="javascript:;"><img src="assets/img/icon/watch-icon-07.svg" alt="" /></a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-5 d-flex ">
//                                     <div className="trad-book-grp ms-auto">
//                                         <div className="bookingrange btn-book me-2">
//                                             <img src="assets/img/icon/calendar-icon.svg" alt="" />
//                                             <span></span>
//                                         </div>
//                                         <div className="down-range btn-down">
//                                             <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="market-area"></div>
//                     </div>
//                     <div className="recent-buy comman-head">
//                         <h3>Digital Payout Cryptocurrency Market Capitalizations</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="buy-form-crypto mb-0">
//                                     <div className="border-watch mb-2">
//                                         <div className="row">
//                                             <div className="col-xl-9  d-flex align-items-center">
//                                                 <div className="status-blk">
//                                                     <div className="row">
//                                                         <div className="col-lg-2">
//                                                             <div className="action-head">
//                                                                 <h4>Latest actions </h4>
//                                                                 <span>(Showing 01 to 06 of 100)</span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {filterOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {sortingOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-xl-3 d-flex align-items-center">
//                                                 <label className="me-2">SortBy:</label>
//                                                 <div className="form-group date-border sort-by cal-icon me-2">
//                                                     <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                 </div>
//                                                 <div className="down-range date-border">
//                                                     <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="datatable table custom-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>ID No</th>
//                                                     <th>Currency type</th>
//                                                     <th style={{ minWidth: '110px' }}>Price</th>
//                                                     <th style={{ minWidth: '110px' }}>Market Cap</th>
//                                                     <th style={{ minWidth: '110px' }}>Volume</th>
//                                                     <th style={{ minWidth: '110px' }}>Circulating Supply</th>
//                                                     <th style={{ minWidth: '110px' }}>Change 24 h</th>
//                                                     <th style={{ minWidth: '90px' }}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cryptocurrencyData.map(item => (
//                                                     <tr key={item.id}>
//                                                         <td><a href="javascript:;">#{item.id}</a></td>
//                                                         <td>{item.currency}</td>
//                                                         <td>{item.price}</td>
//                                                         <td>{item.marketCap}</td>
//                                                         <td>{item.volume}</td>
//                                                         <td>{item.circulatingSupply}</td>
//                                                         <td><span className={`custom-badge ${item.change24h.includes('-') ? 'status-red' : 'status-green'}`}>{item.change24h}</span></td>
//                                                         <td className="text-end">
//                                                             <div className="dropdown dropdown-action">
//                                                                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="feather-more-vertical"></i></a>
//                                                                 <div className="dropdown-menu dropdown-menu-right">
//                                                                     <a className="dropdown-item" href="javascript:;"><i className="fas fa-pencil-alt m-r-5"></i>Edit</a>
//                                                                     <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MarketCap;


// import React, { useEffect, useState } from 'react';

// function MarketCap() {
//     const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
//     const [marketCapList, setMarketCapList] = useState([]);
//     const [filterOptions, setFilterOptions] = useState([
//         { id: 1, label: 'Currency type' },
//         { id: 2, label: 'Credit' },
//         { id: 3, label: 'Debit' },
//     ]);
//     const [sortingOptions, setSortingOptions] = useState([
//         { id: 1, label: 'Volume' },
//         { id: 2, label: 'Pending' },
//         { id: 3, label: 'Success' },
//     ]);

//     useEffect(() => {
//         fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5000&page=1&sparkline=false&price_change_percentage=24h')
//             .then(response => response.json())
//             .then(data => {
//                 const transformedData = data.map(item => ({
//                     id: item.id,
//                     currency: item.name,
//                     price: `$${item.current_price.toLocaleString()}`,
//                     marketCap: `$${item.market_cap.toLocaleString()}`,
//                     volume: `$${item.total_volume.toLocaleString()}`,
//                     circulatingSupply: item.circulating_supply.toLocaleString(),
//                     change24h: `${item.price_change_percentage_24h.toFixed(2)}%`,
//                     icon: item.image
//                 }));
//                 setCryptocurrencyData(transformedData);
//                 setMarketCapList(transformedData.slice(0, 5)); // Extract top 5 cryptocurrencies by market cap
//             })
//             .catch(error => console.error('Error fetching cryptocurrency data:', error));
//     }, []);

//     return (
//         <div className="content">
//             <div className="row">
//                 <div className="col-sm-12">
//                     <div className="buy-form">
//                         <div className="border-watch">
//                             <div className="row">
//                                 <div className="col-xl-4 col-lg-3 d-flex align-items-center">
//                                     <div className="watch-head">
//                                         <h4>Digital Payout Cryptocurrency Market Cap</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-4 d-flex align-items-center">
//                                     <div className="market-cap-list">
//                                         <ul>
//                                             {marketCapList.map(item => (
//                                                 <li key={item.id}>
//                                                     <a href="javascript:;"><img src={item.icon} alt={item.currency} /></a>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-5 d-flex ">
//                                     <div className="trad-book-grp ms-auto">
//                                         <div className="bookingrange btn-book me-2">
//                                             <img src="assets/img/icon/calendar-icon.svg" alt="calendar icon" />
//                                             <span></span>
//                                         </div>
//                                         <div className="down-range btn-down">
//                                             <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="down icon" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="market-area"></div>
//                     </div>
//                     <div className="recent-buy comman-head">
//                         <h3>Digital Payout Cryptocurrency Market Capitalizations</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="buy-form-crypto mb-0">
//                                     <div className="border-watch mb-2">
//                                         <div className="row">
//                                             <div className="col-xl-9 d-flex align-items-center">
//                                                 <div className="status-blk">
//                                                     <div className="row">
//                                                         <div className="col-lg-2">
//                                                             <div className="action-head">
//                                                                 <h4>Latest actions </h4>
//                                                                 <span>(Showing 01 to 06 of 100)</span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {filterOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {sortingOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-xl-3 d-flex align-items-center">
//                                                 <label className="me-2">SortBy:</label>
//                                                 <div className="form-group date-border sort-by cal-icon me-2">
//                                                     <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                 </div>
//                                                 <div className="down-range date-border">
//                                                     <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="down icon" /></a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="datatable table custom-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>ID No</th>
//                                                     <th>Currency type</th>
//                                                     <th style={{ minWidth: '110px' }}>Price</th>
//                                                     <th style={{ minWidth: '110px' }}>Market Cap</th>
//                                                     <th style={{ minWidth: '110px' }}>Volume</th>
//                                                     <th style={{ minWidth: '110px' }}>Circulating Supply</th>
//                                                     <th style={{ minWidth: '110px' }}>Change 24 h</th>
//                                                     <th style={{ minWidth: '90px' }}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cryptocurrencyData.map(item => (
//                                                     <tr key={item.id}>
//                                                         <td><a href="javascript:;">#{item.id}</a></td>
//                                                         <td>{item.currency}</td>
//                                                         <td>{item.price}</td>
//                                                         <td>{item.marketCap}</td>
//                                                         <td>{item.volume}</td>
//                                                         <td>{item.circulatingSupply}</td>
//                                                         <td><span className={`custom-badge ${item.change24h.includes('-') ? 'status-red' : 'status-green'}`}>{item.change24h}</span></td>
//                                                         <td className="text-end">
//                                                             <div className="dropdown dropdown-action">
//                                                                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="feather-more-vertical"></i></a>
//                                                                 <div className="dropdown-menu dropdown-menu-right">
//                                                                     <a className="dropdown-item" href="javascript:;"><i className="fas fa-pencil-alt m-r-5"></i>Edit</a>
//                                                                     <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MarketCap;


// import React from 'react';

// function MarketCap() {
//     // Sample data object for the market cap list items
//     const marketCapList = [
//         { id: 1, icon: 'assets/img/icon/watch-icon-08.svg', label: 'Bitcoin' },
//         { id: 2, icon: 'assets/img/icon/watch-icon-03.svg', label: 'Ethereum' },
//         { id: 3, icon: 'assets/img/icon/watch-icon-01.svg', label: 'Ripple' },
//         { id: 4, icon: 'assets/img/icon/watch-icon-02.svg', label: 'Cardano' },
//         { id: 5, icon: 'assets/img/icon/watch-icon-07.svg', label: 'NEO' },
//     ];

//     // Sample data object for the cryptocurrency table
//     const cryptocurrencyData = [
//         {
//             id: 1,
//             currency: 'Ethereum',
//             price: '$11,723.40',
//             marketCap: '$197,078,267,295',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 2,
//             currency: 'Ripple',
//             price: '$11,723.40',
//             marketCap: '$103,892,495,504',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 3,
//             currency: 'Cardeno',
//             price: '$11,723.40',
//             marketCap: '$63,391,183,730',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 4,
//             currency: 'NEO',
//             price: '$11,723.40',
//             marketCap: '$10,901,285,520',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 5,
//             currency: 'Bitcoin',
//             price: '$11,723.40',
//             marketCap: '$197,078,267,295',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '-263.54%',
//         },
//     ];

//     // Sample filter options
//     const filterOptions = [
//         { id: 1, label: 'Currency type' },
//         { id: 2, label: 'Credit' },
//         { id: 3, label: 'Debit' },
//     ];

//     // Sample sorting options
//     const sortingOptions = [
//         { id: 1, label: 'Volume' },
//         { id: 2, label: 'Pending' },
//         { id: 3, label: 'Success' },
//     ];

//     return (
//         <div className="content">
//             <div className="row">
//                 <div className="col-sm-12">
//                     <div className="buy-form">
//                         <div className="border-watch">
//                             <div className="row">
//                                 <div className="col-xl-4 col-lg-3 d-flex align-items-center">
//                                     <div className="watch-head">
//                                         <h4>Digital Payout Cryptocurrency Market Cap</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-4 d-flex align-items-center">
//                                     <div className="market-cap-list">
//                                         <ul>
//                                             {marketCapList.map(item => (
//                                                 <li key={item.id}>
//                                                     <a href="javascript:;"><img src={item.icon} alt="" /></a>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-5 d-flex ">
//                                     <div className="trad-book-grp ms-auto">
//                                         <div className="bookingrange btn-book me-2">
//                                             <img src="assets/img/icon/calendar-icon.svg" alt="" />
//                                             <span></span>
//                                         </div>
//                                         <div className="down-range btn-down">
//                                             <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="market-area"></div>
//                     </div>
//                     <div className="recent-buy comman-head">
//                         <h3>Digital Payout Cryptocurrency Market Capitalizations</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="buy-form-crypto mb-0">
//                                     <div className="border-watch mb-2">
//                                         <div className="row">
//                                             <div className="col-xl-9  d-flex align-items-center">
//                                                 <div className="status-blk">
//                                                     <div className="row">
//                                                         <div className="col-lg-2">
//                                                             <div className="action-head">
//                                                                 <h4>Latest actions </h4>
//                                                                 <span>(Showing 01 to 06 of 100)</span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {filterOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {sortingOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-xl-3 d-flex align-items-center">
//                                                 <label className="me-2">SortBy:</label>
//                                                 <div className="form-group date-border sort-by cal-icon me-2">
//                                                     <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                 </div>
//                                                 <div className="down-range date-border">
//                                                     <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="datatable table  custom-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>ID No</th>
//                                                     <th>Currency type</th>
//                                                     <th style={{minWidth: '110px'}}>Price</th>
//                                                     <th style={{minWidth: '110px'}}>Market Cap </th>
//                                                     <th style={{minWidth: '110px'}}>Volume</th>
//                                                     <th style={{minWidth: '110px'}}>Circulating Supply</th>
//                                                     <th style={{minWidth: '110px'}}>Change 24 h</th>
//                                                     <th style={{minWidth: '90px'}}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cryptocurrencyData.map(item => (
//                                                     <tr key={item.id}>
//                                                         <td><a href="javascript:;">#{item.id}</a></td>
//                                                         <td><img src={`assets/img/icon/watch-icon-0${item.id}.svg`} alt="Award" className="me-2" />{item.currency}</td>
//                                                         <td>{item.price}</td>
//                                                         <td>{item.marketCap}</td>
//                                                         <td>{item.volume}</td>
//                                                         <td>{item.circulatingSupply}</td>
//                                                         <td><span className={`custom-badge ${item.change24h.includes('-') ? 'status-red' : 'status-green'}`}>{item.change24h}</span></td>
//                                                         <td className="text-end">
//                                                             <div className="dropdown dropdown-action">
//                                                                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="feather-more-vertical"></i></a>
//                                                                 <div className="dropdown-menu dropdown-menu-right" style={{}}>
//                                                                     <a className="dropdown-item" href="javascript:;"><i className="fas fa-pencil-alt m-r-5"></i>Edit</a>
//                                                                     <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MarketCap;



// import React from 'react';

// function MarketCap() {
//     // Sample data object for the market cap list items
//     const marketCapList = [
//         { id: 1, icon: 'assets/img/icon/watch-icon-08.svg', label: 'Bitcoin' },
//         { id: 2, icon: 'assets/img/icon/watch-icon-03.svg', label: 'Ethereum' },
//         { id: 3, icon: 'assets/img/icon/watch-icon-01.svg', label: 'Ripple' },
//         { id: 4, icon: 'assets/img/icon/watch-icon-02.svg', label: 'Cardano' },
//         { id: 5, icon: 'assets/img/icon/watch-icon-07.svg', label: 'NEO' },
//     ];

//     // Sample data object for the cryptocurrency table
//     const cryptocurrencyData = [
//         {
//             id: 1,
//             currency: 'Ethereum',
//             price: '$11,723.40',
//             marketCap: '$197,078,267,295',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 2,
//             currency: 'Ripple',
//             price: '$11,723.40',
//             marketCap: '$103,892,495,504',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 3,
//             currency: 'Cardeno',
//             price: '$11,723.40',
//             marketCap: '$63,391,183,730',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 4,
//             currency: 'NEO',
//             price: '$11,723.40',
//             marketCap: '$10,901,285,520',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 5,
//             currency: 'Bitcoin',
//             price: '$11,723.40',
//             marketCap: '$197,078,267,295',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '-263.54%',
//         },
//     ];

//     // Sample filter options
//     const filterOptions = [
//         { id: 1, label: 'Currency type' },
//         { id: 2, label: 'Credit' },
//         { id: 3, label: 'Debit' },
//     ];

//     // Sample sorting options
//     const sortingOptions = [
//         { id: 1, label: 'Volume' },
//         { id: 2, label: 'Pending' },
//         { id: 3, label: 'Success' },
//     ];

//     return (
//         <div className="content">
//             <div className="row">
//                 <div className="col-sm-12">
//                     <div className="buy-form">
//                         <div className="border-watch">
//                             <div className="row">
//                                 <div className="col-xl-4 col-lg-3 d-flex align-items-center">
//                                     <div className="watch-head">
//                                         <h4>Market Cap</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-4 d-flex align-items-center">
//                                     <div className="market-cap-list">
//                                         <ul>
//                                             {marketCapList.map(item => (
//                                                 <li key={item.id}>
//                                                     <a href="javascript:;"><img src={item.icon} alt="" /></a>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-5 d-flex ">
//                                     <div className="trad-book-grp ms-auto">
//                                         <div className="bookingrange btn-book me-2">
//                                             <img src="assets/img/icon/calendar-icon.svg" alt="" />
//                                             <span></span>
//                                         </div>
//                                         <div className="down-range btn-down">
//                                             <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="market-area"></div>
//                     </div>
//                     <div className="recent-buy comman-head">
//                         <h3>Cryptocurrency Market Capitalizations</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="buy-form-crypto mb-0">
//                                     <div className="border-watch mb-2">
//                                         <div className="row">
//                                             <div className="col-xl-9  d-flex align-items-center">
//                                                 <div className="status-blk">
//                                                     <div className="row">
//                                                         <div className="col-lg-2">
//                                                             <div className="action-head">
//                                                                 <h4>Latest actions </h4>
//                                                                 <span>(Showing 01 to 06 of 100)</span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-3 d-flex align-items-center">
//                                                             <div className="form-group date-border cal-icon">
//                                                                 <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {filterOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-lg-2 d-flex align-items-center">
//                                                             <div className="form-group bg-hover date-border">
//                                                                 <select className="form-control select">
//                                                                     {sortingOptions.map(option => (
//                                                                         <option key={option.id}>{option.label}</option>
//                                                                     ))}
//                                                                 </select>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-xl-3 d-flex align-items-center">
//                                                 <label className="me-2">SortBy:</label>
//                                                 <div className="form-group date-border sort-by cal-icon me-2">
//                                                     <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
//                                                 </div>
//                                                 <div className="down-range date-border">
//                                                     <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="datatable table  custom-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>ID No</th>
//                                                     <th>Currency type</th>
//                                                     <th style={{minWidth: '110px'}}>Price</th>
//                                                     <th style={{minWidth: '110px'}}>Market Cap </th>
//                                                     <th style={{minWidth: '110px'}}>Volume</th>
//                                                     <th style={{minWidth: '110px'}}>Circulating Supply</th>
//                                                     <th style={{minWidth: '110px'}}>Change 24 h</th>
//                                                     <th style={{minWidth: '90px'}}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cryptocurrencyData.map(item => (
//                                                     <tr key={item.id}>
//                                                         <td><a href="javascript:;">#{item.id}</a></td>
//                                                         <td><img src={`assets/img/icon/watch-icon-0${item.id}.svg`} alt="Award" className="me-2" />{item.currency}</td>
//                                                         <td>{item.price}</td>
//                                                         <td>{item.marketCap}</td>
//                                                         <td>{item.volume}</td>
//                                                         <td>{item.circulatingSupply}</td>
//                                                         <td><span className={`custom-badge ${item.change24h.includes('-') ? 'status-red' : 'status-green'}`}>{item.change24h}</span></td>
//                                                         <td className="text-end">
//                                                             <div className="dropdown dropdown-action">
//                                                                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="feather-more-vertical"></i></a>
//                                                                 <div className="dropdown-menu dropdown-menu-right" style={{}}>
//                                                                     <a className="dropdown-item" href="javascript:;"><i className="fas fa-pencil-alt m-r-5"></i>Edit</a>
//                                                                     <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MarketCap;




// import React from 'react';

// function MarketCap() {
//     // Sample data object for the market cap list items
//     const marketCapList = [
//         { id: 1, icon: 'assets/img/icon/watch-icon-08.svg', label: 'Bitcoin' },
//         { id: 2, icon: 'assets/img/icon/watch-icon-03.svg', label: 'Ethereum' },
//         { id: 3, icon: 'assets/img/icon/watch-icon-01.svg', label: 'Ripple' },
//         { id: 4, icon: 'assets/img/icon/watch-icon-02.svg', label: 'Cardano' },
//         { id: 5, icon: 'assets/img/icon/watch-icon-07.svg', label: 'NEO' },
//     ];

//     // Sample data object for the cryptocurrency table
//     const cryptocurrencyData = [
//         {
//             id: 1,
//             currency: 'Ethereum',
//             price: '$11,723.40',
//             marketCap: '$197,078,267,295',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 2,
//             currency: 'Ripple',
//             price: '$11,723.40',
//             marketCap: '$103,892,495,504',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 3,
//             currency: 'Cardeno',
//             price: '$11,723.40',
//             marketCap: '$63,391,183,730',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 4,
//             currency: 'NEO',
//             price: '$11,723.40',
//             marketCap: '$10,901,285,520',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '+263.54%',
//         },
//         {
//             id: 5,
//             currency: 'Bitcoin',
//             price: '$11,723.40',
//             marketCap: '$197,078,267,295',
//             volume: '$17,950,900,000',
//             circulatingSupply: '16979456',
//             change24h: '-263.54%',
//         },
//     ];

//     return (
//         <div className="content">
//             <div className="row">
//                 <div className="col-sm-12">
//                     <div className="buy-form">
//                         <div className="border-watch">
//                             <div className="row">
//                                 <div className="col-xl-4 col-lg-3 d-flex align-items-center">
//                                     <div className="watch-head">
//                                         <h4>Market Cap</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-4 d-flex align-items-center">
//                                     <div className="market-cap-list">
//                                         <ul>
//                                             {marketCapList.map(item => (
//                                                 <li key={item.id}>
//                                                     <a href="javascript:;"><img src={item.icon} alt="" /></a>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-xl-4 col-lg-5 d-flex ">
//                                     <div className="trad-book-grp ms-auto">
//                                         <div className="bookingrange btn-book me-2">
//                                             <img src="assets/img/icon/calendar-icon.svg" alt="" />
//                                             <span></span>
//                                         </div>
//                                         <div className="down-range btn-down">
//                                             <a href="javascript:;"><img src="assets/img/icon/down-icon.svg" alt="" /></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="market-area"></div>
//                     </div>
//                     <div className="recent-buy comman-head">
//                         <h3>Cryptocurrency Market Capitalizations</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="buy-form-crypto mb-0">
//                                     <div className="border-watch mb-2">
//                                         <div className="row">
//                                             {/* Filter and sorting options */}
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="datatable table custom-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>ID No</th>
//                                                     <th>Currency type</th>
//                                                     <th style={{ minWidth: '110px' }}>Price</th>
//                                                     <th style={{ minWidth: '110px' }}>Market Cap</th>
//                                                     <th style={{ minWidth: '110px' }}>Volume</th>
//                                                     <th style={{ minWidth: '110px' }}>Circulating Supply</th>
//                                                     <th style={{ minWidth: '110px' }}>Change 24 h</th>
//                                                     <th style={{ minWidth: '90px' }}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cryptocurrencyData.map((crypto) => (
//                                                     <tr key={crypto.id}>
//                                                         <td><a href="javascript:;">#{crypto.id}</a></td>
//                                                         <td><img src={`assets/img/icon/watch-icon-0${crypto.id}.svg`} alt="Award" className="me-2" />{crypto.currency}</td>
//                                                         <td>{crypto.price}</td>
//                                                         <td>{crypto.marketCap}</td>
//                                                         <td>{crypto.volume}</td>
//                                                         <td>{crypto.circulatingSupply}</td>
//                                                         <td>
//                                                             <span className={`custom-badge ${crypto.change24h.startsWith('+') ? 'status-green' : 'status-red'}`}>
//                                                                 <i className={`fas fa-arrow-${crypto.change24h.startsWith('+') ? 'up' : 'down'}`} aria-hidden="true"></i>
//                                                                 {crypto.change24h}
//                                                             </span>
//                                                         </td>
//                                                         <td className="text-end">
//                                                             <div className="dropdown dropdown-action">
//                                                                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                                                                     <i className="feather-more-vertical"></i>
//                                                                 </a>
//                                                                 <div className="dropdown-menu dropdown-menu-right" style="">
//                                                                     <a className="dropdown-item" href="javascript:;"><i className="fas fa-pencil-alt m-r-5"></i>Edit</a>
//                                                                     <a className="dropdown-item" href="javascript:;" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MarketCap;
