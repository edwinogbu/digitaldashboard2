import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoConverter.css';

function CryptoConverter() {
  const [cryptoList, setCryptoList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false');
        setCryptoList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch crypto list:', error);
        setLoading(false);
      }
    };

    fetchCryptoList();
  }, []);

  const fetchExchangeRate = async (from, to) => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        from_currency: from,
        function: 'CURRENCY_EXCHANGE_RATE',
        to_currency: to
      },
      headers: {
        'x-rapidapi-key': 'abe6787989v6cxxcc6688ssa786554', // Replace with your actual RapidAPI key
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const rate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      return parseFloat(rate);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      return null;
    }
  };

  const handleConvert = async () => {
    const rate = await fetchExchangeRate(fromCurrency, toCurrency);
    if (rate) {
      setExchangeRate(rate);
      setConvertedAmount(amount * rate);
    }
  };

  return (
    <div className="container">
      <h2>Crypto Converter</h2>
      <div className="form">
        <div className="inputGroup">
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="select"
          >
            <option value="">Select Currency</option>
            {cryptoList.length > 0 &&
              cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.symbol.toUpperCase()}>
                  {crypto.name}
                </option>
              ))}
          </select>
        </div>
        <div className="inputGroup">
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="select"
          >
            <option value="">Select Currency</option>
            {cryptoList.length > 0 &&
              cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.symbol.toUpperCase()}>
                  {crypto.name}
                </option>
              ))}
          </select>
        </div>
        <div className="inputGroup">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={handleConvert} className="button">
          Convert
        </button>
      </div>
      {exchangeRate !== null && (
        <div className="result">
          <h3>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</h3>
          <h3>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CryptoConverter;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CryptoConverter.css';

// const CryptoConverter = () => {
//   const [cryptoList, setCryptoList] = useState([]);
//   const [fromCurrency, setFromCurrency] = useState('');
//   const [toCurrency, setToCurrency] = useState('');
//   const [amount, setAmount] = useState(1);
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [convertedAmount, setConvertedAmount] = useState(null);

//   useEffect(() => {
//     const fetchCryptoList = async () => {
//       // Fetch a list of available cryptocurrencies
//       const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false');
//       setCryptoList(response.data);
//     };

//     fetchCryptoList();
//   }, []);

//   const fetchExchangeRate = async (from, to) => {
//     const options = {
//       method: 'GET',
//       url: 'https://alpha-vantage.p.rapidapi.com/query',
//       params: {
//         from_currency: from,
//         function: 'CURRENCY_EXCHANGE_RATE',
//         to_currency: to
//       },
//       headers: {
//         'x-rapidapi-key': '8fa3683068msh5a2b6f9deade2dap155690jsn32fdf5584616 ', // Replace with your actual RapidAPI key
//         'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       const rate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
//       return parseFloat(rate);
//     } catch (error) {
//       console.error('Failed to fetch exchange rate:', error);
//       return null;
//     }
//   };

//   const handleConvert = async () => {
//     const rate = await fetchExchangeRate(fromCurrency, toCurrency);
//     if (rate) {
//       setExchangeRate(rate);
//       setConvertedAmount(amount * rate);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Crypto Converter</h2>
//       <div className="form">
//         <div className="inputGroup">
//           <label>From:</label>
//           <select
//             value={fromCurrency}
//             onChange={(e) => setFromCurrency(e.target.value)}
//             className="select"
//           >
//             <option value="">Select Currency</option>
//             {cryptoList.map((crypto) => (
//               <option key={crypto.id} value={crypto.symbol.toUpperCase()}>
//                 {crypto.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="inputGroup">
//           <label>To:</label>
//           <select
//             value={toCurrency}
//             onChange={(e) => setToCurrency(e.target.value)}
//             className="select"
//           >
//             <option value="">Select Currency</option>
//             {cryptoList.map((crypto) => (
//               <option key={crypto.id} value={crypto.symbol.toUpperCase()}>
//                 {crypto.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="inputGroup">
//           <label>Amount:</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="input"
//           />
//         </div>
//         <button onClick={handleConvert} className="button">Convert</button>
//       </div>
//       {exchangeRate && (
//         <div className="result">
//           <h3>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</h3>
//           <h3>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CryptoConverter;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CryptoConverter = () => {
//   const [cryptoList, setCryptoList] = useState([]);
//   const [fromCurrency, setFromCurrency] = useState('');
//   const [toCurrency, setToCurrency] = useState('');
//   const [amount, setAmount] = useState(1);
//   const [exchangeRate, setExchangeRate] = useState(0);

//   useEffect(() => {
//     const fetchCryptoList = async () => {
//       try {
//         const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
//         setCryptoList(response.data);
//         // Set default currencies (BTC and ETH) if not set
//         setFromCurrency('bitcoin');
//         setToCurrency('ethereum');
//       } catch (error) {
//         console.error('Error fetching cryptocurrency list:', error);
//       }
//     };

//     fetchCryptoList();
//   }, []);

//   useEffect(() => {
//     const fetchExchangeRate = async () => {
//       if (fromCurrency && toCurrency) {
//         try {
//           const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`);
//           const data = response.data;
//           const fromCurrencyRate = data[fromCurrency]?.usd || 0;
//           const toCurrencyRate = data[toCurrency]?.usd || 0;
//           if (fromCurrencyRate && toCurrencyRate) {
//             setExchangeRate(toCurrencyRate / fromCurrencyRate);
//           } else {
//             setExchangeRate(0);
//           }
//         } catch (error) {
//           console.error('Error fetching exchange rate:', error);
//           setExchangeRate(0);
//         }
//       }
//     };

//     fetchExchangeRate();
//   }, [fromCurrency, toCurrency]);

//   const handleFromCurrencyChange = (e) => {
//     setFromCurrency(e.target.value);
//   };

//   const handleToCurrencyChange = (e) => {
//     setToCurrency(e.target.value);
//   };

//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleSwapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const convertCurrency = () => {
//     return amount * exchangeRate;
//   };

//   return (
//     <div className="content">
//         <div className="crypto-converter" style={styles.container}>
//         <h2 style={styles.heading}>Cryptocurrency Converter</h2>
//         <div className="converter-form" style={styles.form}>
//             <div className="form-group">
//             <label style={styles.label}>From Currency:</label>
//             <select value={fromCurrency} onChange={handleFromCurrencyChange} style={styles.select}>
//                 {cryptoList.map(crypto => (
//                 <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
//                 ))}
//             </select>
//             </div>
//             <div className="form-group">
//             <label style={styles.label}>To Currency:</label>
//             <select value={toCurrency} onChange={handleToCurrencyChange} style={styles.select}>
//                 {cryptoList.map(crypto => (
//                 <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
//                 ))}
//             </select>
//             </div>
//             <div className="form-group">
//             <label style={styles.label}>Amount:</label>
//             <input type="number" value={amount} onChange={handleAmountChange} style={styles.input} />
//             </div>
//             <div className="form-group">
//             <button onClick={handleSwapCurrencies} style={styles.button}>Swap Currencies</button>
//             </div>
//         </div>
//         <div className="conversion-result" style={styles.result}>
//             {exchangeRate !== 0 && (
//             <p style={styles.resultText}>
//                 1 {fromCurrency.toUpperCase()} = {exchangeRate.toFixed(6)} {toCurrency.toUpperCase()}
//             </p>
//             )}
//             <p style={styles.resultText}>
//             {amount} {fromCurrency.toUpperCase()} = {convertCurrency().toFixed(6)} {toCurrency.toUpperCase()}
//             </p>
//         </div>
//         </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//   },
//   label: {
//     display: 'block',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   },
//   select: {
//     width: '100%',
//     padding: '8px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxSizing: 'border-box',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxSizing: 'border-box',
//   },
//   button: {
//     padding: '8px 16px',
//     fontSize: '16px',
//     border: 'none',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   buttonHover: {
//     backgroundColor: '#0056b3',
//   },
//   result: {
//     marginTop: '20px',
//     textAlign: 'center',
//   },
//   resultText: {
//     marginBottom: '10px',
//   },
// };

// export default CryptoConverter;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CryptoConverter = () => {
//   const [cryptoData, setCryptoData] = useState(null);
//   const [fromCurrency, setFromCurrency] = useState('BTC');
//   const [toCurrency, setToCurrency] = useState('ETH');
//   const [amount, setAmount] = useState(1);
//   const [exchangeRate, setExchangeRate] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRate = async () => {
//       try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`);
//         const data = response.data;
//         const fromCurrencyRate = data[fromCurrency.toLowerCase()].usd;
//         const toCurrencyRate = data[toCurrency.toLowerCase()].usd;
//         setExchangeRate(toCurrencyRate / fromCurrencyRate);
//       } catch (error) {
//         console.error('Error fetching exchange rate:', error);
//       }
//     };

//     fetchExchangeRate();
//   }, [fromCurrency, toCurrency]);

//   const handleFromCurrencyChange = (e) => {
//     setFromCurrency(e.target.value);
//   };

//   const handleToCurrencyChange = (e) => {
//     setToCurrency(e.target.value);
//   };

//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleSwapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const convertCurrency = () => {
//     return amount * exchangeRate;
//   };

//   return (
//     <div className="crypto-converter">
//       <h2>Cryptocurrency Converter</h2>
//       <div className="converter-form">
//         <div className="form-group">
//           <label>From Currency:</label>
//           <select value={fromCurrency} onChange={handleFromCurrencyChange}>
//             {cryptoData && Object.keys(cryptoData).map(currency => (
//               <option key={currency} value={currency}>{currency}</option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>To Currency:</label>
//           <select value={toCurrency} onChange={handleToCurrencyChange}>
//             {cryptoData && Object.keys(cryptoData).map(currency => (
//               <option key={currency} value={currency}>{currency}</option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Amount:</label>
//           <input type="number" value={amount} onChange={handleAmountChange} />
//         </div>
//         <div className="form-group">
//           <button onClick={handleSwapCurrencies}>Swap Currencies</button>
//         </div>
//       </div>
//       <div className="conversion-result">
//         {exchangeRate !== 0 && (
//           <p>
//             1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
//           </p>
//         )}
//         <p>
//           {amount} {fromCurrency} = {convertCurrency().toFixed(6)} {toCurrency}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CryptoConverter;


// import React, { useState, useEffect } from 'react';

// const CryptoConverter = () => {
//   const [cryptoOptions, setCryptoOptions] = useState([
//     { label: 'Bitcoin (BTC)', value: 'BTC' },
//     { label: 'Ethereum (ETH)', value: 'ETH' },
//     { label: 'Ripple (XRP)', value: 'XRP' },
//     { label: 'Litecoin (LTC)', value: 'LTC' },
//     { label: 'Cardano (ADA)', value: 'ADA' },
//   ]);
//   const [amount, setAmount] = useState('');
//   const [fromCrypto, setFromCrypto] = useState('BTC');
//   const [toCrypto, setToCrypto] = useState('ETH');
//   const [exchangeRate, setExchangeRate] = useState(0);
//   const [convertedAmount, setConvertedAmount] = useState(0);

//   // Dummy exchange rate API (replace with actual API endpoint)
//   const fetchExchangeRate = async () => {
//     // Replace this with actual API call to get exchange rate data
//     const dummyExchangeRates = {
//       BTC: { ETH: 12.345, XRP: 2345.67, LTC: 0.4567, ADA: 123.45 },
//       ETH: { BTC: 0.081, XRP: 189.23, LTC: 0.0234, ADA: 67.89 },
//       XRP: { BTC: 0.000426, ETH: 0.00529, LTC: 0.000123, ADA: 0.0345 },
//       LTC: { BTC: 2.189, ETH: 42.67, XRP: 8123.45, ADA: 34.56 },
//       ADA: { BTC: 0.0081, ETH: 0.0193, XRP: 29.32, LTC: 0.289 },
//     };

//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     if (fromCrypto !== toCrypto && dummyExchangeRates[fromCrypto] && dummyExchangeRates[fromCrypto][toCrypto]) {
//       setExchangeRate(dummyExchangeRates[fromCrypto][toCrypto]);
//     } else {
//       setExchangeRate(1); // Default to 1 if same crypto or no rate found
//     }
//   };

//   useEffect(() => {
//     fetchExchangeRate();
//   }, [fromCrypto, toCrypto]);

//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleFromCryptoChange = (e) => {
//     setFromCrypto(e.target.value);
//   };

//   const handleToCryptoChange = (e) => {
//     setToCrypto(e.target.value);
//   };

//   const handleConvert = () => {
//     if (!amount) {
//       alert('Please enter an amount.');
//       return;
//     }

//     const converted = parseFloat(amount) * exchangeRate;
//     setConvertedAmount(converted.toFixed(4));
//   };

//   return (
//     <div className="crypto-converter">
//       <h2>Cryptocurrency Converter</h2>
//       <div className="converter-form">
//         <div className="form-group">
//           <label>From:</label>
//           <select value={fromCrypto} onChange={handleFromCryptoChange}>
//             {cryptoOptions.map(option => (
//               <option key={option.value} value={option.value}>{option.label}</option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>To:</label>
//           <select value={toCrypto} onChange={handleToCryptoChange}>
//             {cryptoOptions.map(option => (
//               <option key={option.value} value={option.value}>{option.label}</option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Amount:</label>
//           <input type="number" value={amount} onChange={handleAmountChange} />
//         </div>
//         <button className="btn btn-primary" onClick={handleConvert}>Convert</button>
//       </div>
//       {exchangeRate !== 0 && (
//         <div className="conversion-result">
//           <p>Exchange Rate: 1 {fromCrypto} = {exchangeRate} {toCrypto}</p>
//           <p>{amount} {fromCrypto} = {convertedAmount} {toCrypto}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CryptoConverter;
