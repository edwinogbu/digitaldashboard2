import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { getMarketData } from '../api'; // Update the import path

export default function CrytocurrencyPrices() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('cryptoData');
    if (savedData) {
      setCryptoData(JSON.parse(savedData));
      setLoading(false);
    } else {
      fetchCryptoData();
    }
  }, []);

  const fetchCryptoData = async (pageNumber = 1) => {
    const data = await getMarketData(pageNumber);
    setCryptoData(data);
    localStorage.setItem('cryptoData', JSON.stringify(data));
    setLoading(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid main-content px-2 px-lg-4">
      <div className="row my-2 g-3 g-lg-4">
        {filteredData.map((crypto, index) => (
          <div className="col-md-2 col-xl-2 col-xxl-3" key={crypto.id}>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-white mb-0">{crypto.name}</p>
                  <h4 className="fw-semibold text-white mb-0">${crypto.current_price.toFixed(2)}</h4>
                </div>
                <img alt={crypto.name} src={crypto.image} width={20} height={20} />
              </div>
              <div className="chart">
                <canvas id={`chart_${index + 2}`} />
              </div>
              {/* Link to the CoinDetail page */}
              <Link to={`/dashboard/coin/${crypto.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="row my-2 g-3 gx-lg-4 pb-3">
        <div className="col-12">
          <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
            <div className="d-flex justify-content-between flex-wrap gap-4">
              <h5 className="mb-0">Cryptocurrency Prices</h5>
              <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
                <form className="d-flex align-items-center search-form px-2 flex-shrink-0" onSubmit={e => e.preventDefault()}>
                  <input 
                    placeholder="Search..." 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearch} 
                  />
                  <span className="material-symbols-outlined">search</span>
                </form>
                <select className="form-select price-select">
                  <option value="all">All Time</option>
                  <option value="month">This month</option>
                  <option value="week">This week</option>
                </select>
              </div>
            </div>
            <div className="pb-2 pt-3 price-table">
              <table>
                <thead>
                  <tr>
                    <th className="fw-bold" />
                    <th className="fw-bold">#</th>
                    <th className="fw-bold">Name</th>
                    <th className="fw-bold">Price</th>
                    <th className="fw-bold">24h %</th>
                    <th className="fw-bold">Market Cap</th>
                    <th className="fw-bold">Volume</th>
                    <th className="fw-bold">Charts</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((crypto, index) => (
                    <tr key={crypto.id}>
                      <td>
                        <span className="material-symbols-outlined star">star</span>
                      </td>
                      <td>{index + 1}</td>
                      <td className="d-flex align-items-center gap-2">
                        <img alt={crypto.name} src={crypto.image} style={{ width: '24px', height: '24px' }} />
                        <Link to={`/dashboard/coin/${crypto.id}`} className="text-decoration-none">
                          {crypto.name} ({crypto.symbol.toUpperCase()})
                        </Link>
                      </td>
                      <td>${crypto.current_price.toFixed(2)}</td>
                      <td className={crypto.price_change_percentage_24h > 0 ? 'primary' : 'secondary'}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td>${crypto.market_cap.toLocaleString()}</td>
                      <td>${crypto.total_volume.toLocaleString()}</td>
                      <td>
                        {/* <img src={`./assets/images/chart-${index % 2 === 0 ? '1' : '2'}.svg`} alt="chart" width="100" height="40" /> */}
                        <img alt="chart" src={crypto.price_change_percentage_24h > 0 ? 'assets/images/chart-2.svg' : 'assets/images/chart-2.svg'} />
                      </td>
                      <td>
                        <button className="outline-btn">Trade</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 g-3 g-lg-4 top-border footer">
        <div className="col-lg-6">
          <span className="text-center text-lg-start d-block w-100">
            Copyright © 2023. All Rights Reserved By{' '}
            <a className="primary" href="#">
              CryptDash
            </a>
          </span>
        </div>
        <div className="col-lg-6">
          <ul className="d-flex gap-2 gap-xl-4 p-0 align-items-center flex-wrap justify-content-center justify-content-lg-end">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import { getMarketData } from '../api'; // Update the import path

// export default function CrytocurrencyPrices() {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const savedData = localStorage.getItem('cryptoData');
//     if (savedData) {
//       setCryptoData(JSON.parse(savedData));
//       setLoading(false);
//     } else {
//       fetchCryptoData();
//     }
//   }, []);

//   const fetchCryptoData = async (pageNumber = 1) => {
//     const data = await getMarketData(pageNumber);
//     setCryptoData(data);
//     localStorage.setItem('cryptoData', JSON.stringify(data));
//     setLoading(false);
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredData = cryptoData.filter(crypto =>
//     crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container-fluid main-content px-2 px-lg-4">
//       <div className="row my-2 g-3 g-lg-4">
//         {filteredData.map((crypto, index) => (
//           <div className="col-md-2 col-xl-2 col-xxl-3" key={crypto.id}>
//             <div className="price-box">
//               <div className="d-flex align-items-center justify-content-between">
//                 <div>
//                   <p className="text-white mb-0">{crypto.name}</p>
//                   <h4 className="fw-semibold text-white mb-0">${crypto.current_price.toFixed(2)}</h4>
//                 </div>
//                 <img alt={crypto.name} src={crypto.image} width={20} height={20}/>
//               </div>
//               <div className="chart">
//                 <canvas id={`chart_${index + 2}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="row my-2 g-3 gx-lg-4 pb-3">
//         <div className="col-12">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
//             <div className="d-flex justify-content-between flex-wrap gap-4">
//               <h5 className="mb-0">Cryptocurrency Prices</h5>
//               <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
//                 <form className="d-flex align-items-center search-form px-2 flex-shrink-0" onSubmit={e => e.preventDefault()}>
//                   <input 
//                     placeholder="Search..." 
//                     type="text" 
//                     value={searchQuery} 
//                     onChange={handleSearch} 
//                   />
//                   <span className="material-symbols-outlined">search</span>
//                 </form>
//                 <select className="form-select price-select">
//                   <option value="all">All Time</option>
//                   <option value="month">This month</option>
//                   <option value="week">This week</option>
//                 </select>
//               </div>
//             </div>
//             <div className="pb-2 pt-3 price-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th className="fw-bold" />
//                     <th className="fw-bold">#</th>
//                     <th className="fw-bold">Name</th>
//                     <th className="fw-bold">Price</th>
//                     <th className="fw-bold">24h %</th>
//                     <th className="fw-bold">Market Cap</th>
//                     <th className="fw-bold">Volume</th>
//                     <th className="fw-bold">Charts</th>
//                     <th />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map((crypto, index) => (
//                     <tr key={crypto.id}>
//                       <td>
//                         <span className="material-symbols-outlined star">star</span>
//                       </td>
//                       <td>{index + 1}</td>
//                       <td className="d-flex align-items-center gap-2">
//                         <img alt={crypto.name} src={crypto.image} style={{ width: '24px', height: '24px' }} />
                        
//                         {crypto.name} ({crypto.symbol.toUpperCase()})
//                       </td>
//                       <td>${crypto.current_price.toFixed(2)}</td>
//                       <td className={crypto.price_change_percentage_24h > 0 ? 'primary' : 'secondary'}>
//                         {crypto.price_change_percentage_24h.toFixed(2)}%
//                       </td>
//                       <td>${crypto.market_cap.toLocaleString()}</td>
//                       <td>${crypto.total_volume.toLocaleString()}</td>
//                       <td>
//                       {/* <img src={`./assets/images/chart-${index % 2 === 0 ? '1' : '2'}.svg`} alt="chart" width="100" height="40" /> */}

//                         <img alt="chart" src={crypto.price_change_percentage_24h > 0 ? 'assets/images/chart-2.svg' : 'assets/images/chart-2.svg'} />
//                       </td>
//                       <td>
//                         <button className="outline-btn">Trade</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row py-2 g-3 g-lg-4 top-border footer">
//         <div className="col-lg-6">
//           <span className="text-center text-lg-start d-block w-100">
//             Copyright © 2023. All Rights Reserved By{' '}
//             <a className="primary" href="#">
//               CryptDash
//             </a>
//           </span>
//         </div>
//         <div className="col-lg-6">
//           <ul className="d-flex gap-2 gap-xl-4 p-0 align-items-center flex-wrap justify-content-center justify-content-lg-end">
//             <li>
//               <a href="#">Help Center</a>
//             </li>
//             <li>
//               <a href="#">Privacy</a>
//             </li>
//             <li>
//               <a href="#">Terms of Service</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { getMarketData } from '../api';

// export default function CrytocurrencyPrices() {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedData = localStorage.getItem('cryptoData');
//     if (savedData) {
//       setCryptoData(JSON.parse(savedData));
//       setLoading(false);
//     } else {
//       fetchCryptoData();
//     }
//   }, []);

//   const fetchCryptoData = async (pageNumber = 1) => {
//     const data = await getMarketData(pageNumber);
//     setCryptoData(data);
//     localStorage.setItem('cryptoData', JSON.stringify(data));
//     setLoading(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container-fluid main-content px-2 px-lg-4">
//       <div className="row my-2 g-3 g-lg-4">
//         {cryptoData.map((crypto, index) => (
//           <div className="col-md-2 col-xl-2 col-xxl-3" key={crypto.id}>
//             <div className="price-box">
//               <div className="d-flex align-items-center justify-content-between">
//                 <div>
//                   <p className="text-white mb-0">{crypto.name}</p>
//                   <h4 className="fw-semibold text-white mb-0">${crypto.current_price.toFixed(2)}</h4>
//                 </div>
//                 <img alt={crypto.name} src={crypto.image} width={20} height={20}/>
//               </div>
//               <div className="chart">
//                 <canvas id={`chart_${index + 2}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="row my-2 g-3 gx-lg-4 pb-3">
//         <div className="col-12">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
//             <div className="d-flex justify-content-between flex-wrap gap-4">
//               <h5 className="mb-0">Cryptocurrency Prices</h5>
//               <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
//                 <form className="d-flex align-items-center search-form px-2 flex-shrink-0">
//                   <input placeholder="Search..." type="text" />
//                   <span className="material-symbols-outlined">search</span>
//                 </form>
//                 <select className="form-select price-select">
//                   <option value="all">All Time</option>
//                   <option value="month">This month</option>
//                   <option value="week">This week</option>
//                 </select>
//               </div>
//             </div>
//             <div className="pb-2 pt-3 price-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th className="fw-bold" />
//                     <th className="fw-bold">#</th>
//                     <th className="fw-bold">Name</th>
//                     <th className="fw-bold">Price</th>
//                     <th className="fw-bold">24h %</th>
//                     <th className="fw-bold">Market Cap</th>
//                     <th className="fw-bold">Volume</th>
//                     <th className="fw-bold">Charts</th>
//                     <th />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cryptoData.map((crypto, index) => (
//                     <tr key={crypto.id}>
//                       <td>
//                         <span className="material-symbols-outlined star">star</span>
//                       </td>
//                       <td>{index + 1}</td>
//                       <td className="d-flex align-items-center gap-2">
//                         <img alt={crypto.name} src={crypto.image} style={{ width: '24px', height: '24px' }} />
//                         {crypto.name} ({crypto.symbol.toUpperCase()})
//                       </td>
//                       <td>${crypto.current_price.toFixed(2)}</td>
//                       <td className={crypto.price_change_percentage_24h > 0 ? 'primary' : 'secondary'}>
//                         {crypto.price_change_percentage_24h.toFixed(2)}%
//                       </td>
//                       <td>${crypto.market_cap.toLocaleString()}</td>
//                       <td>${crypto.total_volume.toLocaleString()}</td>
//                       <td>
//                         <img alt="chart" src={crypto.price_change_percentage_24h > 0 ? './assets/img/chart_green.png' : './assets/img/chart_red.png'} />
//                       </td>
//                       <td>
//                         <button className="outline-btn">Trade</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row py-2 g-3 g-lg-4 top-border footer">
//         <div className="col-lg-6">
//           <span className="text-center text-lg-start d-block w-100">
//             Copyright © 2023. All Rights Reserved By{' '}
//             <a className="primary" href="#">
//               CryptDash
//             </a>
//           </span>
//         </div>
//         <div className="col-lg-6">
//           <ul className="d-flex gap-2 gap-xl-4 p-0 align-items-center flex-wrap justify-content-center justify-content-lg-end">
//             <li>
//               <a href="#">Help Center</a>
//             </li>
//             <li>
//               <a href="#">Privacy</a>
//             </li>
//             <li>
//               <a href="#">Terms of Service</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from 'react'

// export default function CrytocurrencyPrices() {
//   return (
//     <>

//     <div className="container-fluid main-content px-2 px-lg-4">
//       <div className="row my-2 g-3 g-lg-4">
//         <div className="col-md-6 col-xl-4 col-xxl-3">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Bitcoin
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $1200.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/bitcoin.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_2" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 col-xl-4 col-xxl-3">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Ethereum
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $100.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/etherium.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_3" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 col-xl-4 col-xxl-3">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Dogecoin
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $2500.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/dogecoin.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_4" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 col-xl-4 col-xxl-3">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Binance
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $3200.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/binance.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_5" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-2 g-3 gx-lg-4 pb-3">
//         <div className="col-12">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
//             <div className="d-flex justify-content-between flex-wrap gap-4">
//               <h5 className="mb-0">
//                 Crytocurrency Prices
//               </h5>
//               <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
//                 <form className="d-flex align-items-center search-form  px-2 flex-shrink-0">
//                   <input
//                     placeholder="Search..."
//                     type="text"
//                   />
//                   <span className="material-symbols-outlined">
//                     {' '}search{' '}
//                   </span>
//                 </form>
//                 <select className="form-select price-select">
//                   <option value="all">
//                     All Time
//                   </option>
//                   <option value="month">
//                     This month
//                   </option>
//                   <option value="week">
//                     This week
//                   </option>
//                 </select>
//               </div>
//             </div>
//             <div className="pb-2 pt-3 price-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th className="fw-bold" />
//                     <th className="fw-bold">
//                       #
//                     </th>
//                     <th className="fw-bold">
//                       Name
//                     </th>
//                     <th className="fw-bold">
//                       Price
//                     </th>
//                     <th className="fw-bold">
//                       24h %
//                     </th>
//                     <th className="fw-bold">
//                       Market Cap
//                     </th>
//                     <th className="fw-bold">
//                       Volume
//                     </th>
//                     <th className="fw-bold">
//                       Charts
//                     </th>
//                     <th />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       1
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/bitcoin.png"
//                       />
//                       Bitcoin (BTC)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       2
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         className="flex-shrink-0"
//                         src="./assets/img/crypto/ripple.png"
//                       />
//                       Ripple (RPL)
//                     </td>
//                     <td>
//                       $377,600
//                     </td>
//                     <td className="secondary">
//                       -2.33%
//                     </td>
//                     <td>
//                       $303,780
//                     </td>
//                     <td>
//                       $112,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_red_1.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       3
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/binance.png"
//                       />
//                       Binance (BNB)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="secondary">
//                       -2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_red_2.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       4
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/dash.png"
//                       />
//                       Dashcoin (DTC)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green_2.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       5
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/digibyte.png"
//                       />
//                       Digibyte (DGB)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       6
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/dogecoin.png"
//                       />
//                       Dogecoin (DOGE)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green_2.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       7
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/ellaism.png"
//                       />
//                       Ellasiam (ELLA)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="secondary">
//                       -2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_red_1.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       8
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/etherium.png"
//                       />
//                       Ethereum (ETH)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green_2.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       9
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/monero.png"
//                       />
//                       Monero (MNR)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <span className="material-symbols-outlined star">
//                         star
//                       </span>
//                     </td>
//                     <td>
//                       10
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/tether.png"
//                       />
//                       Tether (USDT)
//                     </td>
//                     <td>
//                       $326,600
//                     </td>
//                     <td className="primary">
//                       +2.33%
//                     </td>
//                     <td>
//                       $303,800
//                     </td>
//                     <td>
//                       $880,423
//                     </td>
//                     <td>
//                       <img
//                         alt=""
//                         src="./assets/img/chart_green_2.png"
//                       />
//                     </td>
//                     <td>
//                       <button className="outline-btn">
//                         Trade
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row py-2 g-3 g-lg-4 top-border footer">
//         <div className="col-lg-6">
//           <span className="text-center text-lg-start d-block w-100">
//             Copyright © 2023. All Rights Reserved By{' '}
//             <a
//               className="primary"
//               href="#"
//             >
//               CryptDash
//             </a>
//           </span>
//         </div>
//         <div className="col-lg-6">
//           <ul className="d-flex gap-2 gap-xl-4 p-0 align-items-center flex-wrap justify-content-center justify-content-lg-end">
//             <li>
//               <a href="#">
//                 Help Center
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 Privacy
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 Terms of Service
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>

//     </>
//   )
// }
