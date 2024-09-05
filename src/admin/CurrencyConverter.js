
import React, { useState } from 'react';
import axios from 'axios';
import './CryptoConverter.css';
import './DashboardHome.css';

export default function CurrencyConverter() {
    const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
    // const currencies = [
    //     "BTC", "ETH", "USD", "XRP", "LTC", "ADA",
    //     "BCH", "BNB", "DOT", "SOL", "DOGE", "USDT",
    //     "USDC", "UNI", "LINK", "AVAX", "MATIC", "TRX",
    //     "SHIB", "ATOM", "XLM", "FIL", "NEAR", "ARB",
    //     "APT", "SUI", "PEPE", "OP", "STX", "INJ",
    //     "RPL", "LDO", "GRT", "AAVE", "FTM", "SAND",
    //     "DYDX", "MKR", "CRV", "AXS", "FLOW", "CHZ",
    //     "KSM", "GALA", "CRO", "VET", "IMX", "THETA",
    //     "MANA", "ZEC", "ENJ", "CSPR", "1INCH", "ALGO",
    //     "EGLD", "CELO", "QNT", "KAVA", "RSR", "REN",
    //     "FTT", "HT", "OKB", "BUSD", "PAXG", "WAVES"
    //   ];
      
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("USD");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);

    const convert = async () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: chosenPrimaryCurrency,
                to_currency: chosenSecondaryCurrency
            },
            headers: {
                'x-rapidapi-key': '3df21a2dc9mshcd6bbbb026fa6c7p1137f9jsn35843efa3d5c',
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const rate = parseFloat(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(rate);
            setResult(rate * amount);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // <div className="protected" style={{textAlign:'center', margin:25, }}>
        //     <div className="row">
        //         <div className="col-sm-12 card-body">
        //             <div className="sell-buy-list">
        //                 <ul style={{textAlign:'center'}}>
        //                     <h1 style={{textAlign:'center'}}>

        //                     <i class="fas fa-h1    ">Exchange Rate Calculator</i>
        //                     </h1>
        //                     {/* <li className="active">
        //                         <a href="#">Buy Crypto</a>
        //                     </li>
        //                     <li>
        //                         <a href="#">Sell Crypto</a>
        //                     </li> */}
        //                 </ul>
        //                 <p>Realtime Currency Exchange Rate. Calculator</p>
        //             </div>

        //             <div className="buy-crypto-group">
        //                 <form onSubmit={(e) => e.preventDefault()}>
        //                     <div className="row">
        //                         <div className="col container ">
        //                             <div className="row">
        //                                 <div className="col-lg-5">
        //                                 <label>From: Exchange</label>
        //                                     <div className="ex-forms">
        
        //                                     <div className="row">
        //                                     <div className="col-sm-8 bg-primary p-1">
        //                                     <input 
        //                                      type="number"
        //                                     className="form-control bg-light p-4 text-bold bold text-black-100"  
        //                                      placeholder="Enter Amount"
        //                                      value={amount}
        //                                      onChange={(e) => setAmount(Number(e.target.value))}
        //                                       style={{fontSize:20, }}
        //                                     />
        //                                     </div>
        //                                     <div className="col-sm-4 bg-primary p-2">
        //                                     <select className="form-select"
        //                                       value={chosenPrimaryCurrency}
        //                                       onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
        //                                   >
        //                                       {currencies.map((currency, index) => (
        //                                           <option key={index} value={currency}>
        //                                               {currency}
        //                                           </option>
        //                                       ))} 
        //                                             </select>                                            </div>
        //                                     </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-lg-2 d-flex align-items-center">
        //                                     <button type="button" className="btn btn-primary represh-btn" onClick={convert}>
        //                                         <i className="fas fa-exchange-alt" aria-hidden="true" />
        //                                     </button>
        //                                 </div>
        //                                 <div className="col-lg-5 ">
        //                                 <label>To: Exchange</label>
        //                                     <div className="ex-forms">
                                               
        //                                     <div className="row">
        //                                     <div className="col-sm-8  bg-primary p-1">
        //                                     <input 
        //                                      type="number"
        //                                     className="form-control bg-light p-4"  
                                            
        //                                      placeholder="Result"
        //                                      value={result.toFixed(2)}
        //                                      readOnly
        //                                      disabled={true}
        //                                      style={{fontSize:20, }}
        //                                     />
        //                                     </div>
        //                                     <div className="col-sm-4 bg-primary p-2">
        //                                     <select className="form-select "
        //                                       value={chosenSecondaryCurrency}
        //                                       onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
        //                                   >
        //                                       {currencies.map((currency, index) => (
        //                                           <option key={index} value={currency} className="form-control form-select p-5 m-3">
        //                                               {currency}
        //                                           </option>
        //                                       ))}
        //                                             </select>                                            </div>
        //                                     </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="buy-crpto-btn mt-4">
        //                             <button
        //                                 type="button"
        //                                 className="btn btn-primary submit-btn mb-0"
        //                                 onClick={convert}
        //                             >
        //                                 Convert 
        //                             </button>
        //                         </div>
        //                         <div className="offset-6 col-xl-6 col-lg-6">
        //                             <div className="form-group bg-hover col-md-12">
        //                                                 <h4 className="text-center">Exchange Rate</h4>
        //                                 <div className="col-xl-12 col-md-6 d-flex">
        //                                     <div className="card-holder holder-blue">
        //                                         <div className="main-balance-blk">
        //                                             <div className="main-balance center">
        //                                                 <h4 className="text-center">Exchange Rate</h4>
        //                                                 <h3 className="text-center">{exchangeRate.toFixed(4)}</h3>
        //                                             </div>
        //                                         </div>
        //                                         <div className="card-valid-blk">
        //                                             <div className="valid-holder me-4">
        //                                                 <p>Primary Currency</p>
        //                                                 <h5>{chosenPrimaryCurrency}</h5>
        //                                             </div>
        //                                             <span>To</span>
        //                                             <div className="valid-holder">
        //                                                 <p>Secondary Currency</p>
        //                                                 <h5>{chosenSecondaryCurrency}</h5>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>


<div className="container mt-5">
<div className="row">
    <div className="col-12 card-body">
        <div className="text-center mb-4">
            <h1 className="display-4">
                <i className="fas fa-exchange-alt"></i> Exchange Rate Calculator
            </h1>
            <p>Realtime Currency Exchange Rate Calculator</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
                <div className="col-lg-5">
                    <div className="form-group">
                        <label htmlFor="fromExchange">From: Exchange</label>
                        <div className="input-group">
                            <input 
                                type="number"
                                className="form-control"
                                id="fromExchange"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                style={{fontSize: '1.25rem'}}
                            />
                            <select className="form-control"
                                value={chosenPrimaryCurrency}
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, index) => (
                                    <option key={index} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="col-lg-2 d-flex align-items-center">
                    <button type="button" className="btn btn-primary" onClick={convert}>
                        <i className="fas fa-exchange-alt" aria-hidden="true" />
                    </button>
                </div>

                <div className="col-lg-5">
                    <div className="form-group">
                        <label htmlFor="toExchange">To: Exchange</label>
                        <div className="input-group">
                            <input 
                                type="number"
                                className="form-control"
                                id="toExchange"
                                placeholder="Result"
                                value={result.toFixed(2)}
                                readOnly
                                style={{fontSize: '1.25rem'}}
                            />
                            <select className="form-control"
                                value={chosenSecondaryCurrency}
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, index) => (
                                    <option key={index} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={convert}
                >
                    Convert
                </button>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6 offset-lg-6">
                    <div className="card bg-light p-3">
                        <h4 className="text-center">Exchange Rate</h4>
                        <div className="text-center">
                            <h3>{exchangeRate.toFixed(4)}</h3>
                            <p>Primary Currency: {chosenPrimaryCurrency}</p>
                            <p>Secondary Currency: {chosenSecondaryCurrency}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</div>

    );
}


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CryptoConverter.css';


// export default function CurrencyConverter() {
//     const Currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"]
//     const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC")
//     const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("BTC")
//     const [amount, setAmount] =useState(1)
//     const [result, setResult] =useState(0)
//     const [exchangeRate, setExchangeRate] =useState(0)
 
//     const convert =()=>{

//         const options = {
//           method: 'GET',
//           url: 'https://alpha-vantage.p.rapidapi.com/query',
//           params: {
//             from_currency: chosenPrimaryCurrency,
//             function: 'CURRENCY_EXCHANGE_RATE',
//             to_currency: chosenSecondaryCurrency
//           },
//           headers: {
//             'x-rapidapi-key': '3df21a2dc9mshcd6bbbb026fa6c7p1137f9jsn35843efa3d5c',
//             'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
//           }
//         };
        
//         try {
//             const response = await axios.request(options);
//             console.log(response.data['Realtime Currency Exchange Rate']['Exchange Rate']);
//             setExchangeRate(response.data['Realtime Currency Exchange Rate']['Exchange Rate']);
//             setResult(response.data['Realtime Currency Exchange Rate']['Exchange Rate'] * amount);
            
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     return (
//     <>
//         <div className="content">
//                 <div className="row">
//                 <div className="col-sm-12 card-body">
//                     <div className="sell-buy-list">
//                     <ul>
//                         <li className="active">
//                             <a href="buy-crypto.html">Buy Crypto</a>
//                         </li>
//                         <li>
//                            <a href="sell-crypto.html">Sell Crypto</a>
//                         </li>
//                     </ul>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                     </div>

//                     <div className="buy-crypto-group">
//                         <form>
//                             <div className="row">
                            
//                             <div className="col-lg-12">
//                                 <div className="row">
//                                 <label>Exchange</label>
//                                 <div className="col-lg-5">
//                                     <div className="ex-forms">
//                                     <div className="row">
//                                         <div className="col-md-5">
//                                         <div className="form-group bg-hover exchange-bg mb-0">
//                                             <select
//                                             className="form-control select select2-hidden-accessible"
//                                             data-select2-id="select2-data-10-zksv"
//                                             tabIndex={-1}
//                                             aria-hidden="true"
//                                             value={chosenPrimaryCurrency}
//                                             onChange={(e)=>setChosenPrimaryCurrency(e.target.value)}
//                                             >
//                                                 {Currencies.map((currency, _index)=>(
//                                                      <option
//                                                      selected=""
//                                                      data-select2-id="select2-data-12-xkh3"
//                                                  key={_index}
//                                                  >
//                                                     {currency}
//                                                  </option>
//                                                 ))}
//                                             <option
//                                                 selected=""
//                                                 data-select2-id="select2-data-12-xkh3"
//                                             >
//                                                 BTC
//                                             </option>
                                           
//                                             </select>
//                                             <span
//                                             className="select2 select2-container select2-container--default"
//                                             dir="ltr"
//                                             data-select2-id="select2-data-11-ok0l"
//                                             style={{ width: "100%" }}
//                                             >
//                                             <span className="selection">
//                                                 <span
//                                                 className="select2-selection select2-selection--single"
//                                                 role="combobox"
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                                 tabIndex={0}
//                                                 aria-disabled="false"
//                                                 aria-labelledby="select2-lqnb-container"
//                                                 aria-controls="select2-lqnb-container"
//                                                 >
//                                                 <span
//                                                     className="select2-selection__rendered"
//                                                     id="select2-lqnb-container"
//                                                     role="textbox"
//                                                     aria-readonly="true"
//                                                     title="BTC"
//                                                 >
//                                                     BTC
//                                                 </span>
//                                                 <span
//                                                     className="select2-selection__arrow"
//                                                     role="presentation"
//                                                 >
//                                                     <b role="presentation" />
//                                                 </span>
//                                                 </span>
//                                             </span>
//                                             <span className="dropdown-wrapper" aria-hidden="true" />
//                                             </span>
//                                         </div>
//                                         </div>
//                                         <div className="col-md-7">
//                                         <div className="form-group mb-0 side-input">
//                                             <input 
//                                             type="number" 
//                                             className="form-control " 
//                                              placeholder="Enter Amount"
//                                              value={""}
//                                              onChange={(e)=> setAmount(e.target.value)}
//                                              />
//                                         </div>
//                                         </div>
//                                     </div>
//                                     </div>
//                                 </div>
                                
//                                 <div className="col-lg-2 d-flex align-items-center">
//                                     <button type="button" className="btn btn-primary represh-btn">
//                                     <i className="fas fa-exchange-alt" aria-hidden="true" />
//                                     </button>
//                                 </div>
//                                 <div className="col-lg-5">
//                                     <div className="ex-forms">
//                                     <div className="row">
//                                         <div className="col-md-5">
//                                         <div className="form-group bg-hover exchange-bg mb-0">
//                                              <select
//                                             className="form-control select select2-hidden-accessible"
//                                             data-select2-id="select2-data-10-zksv"
//                                             tabIndex={-1}
//                                             aria-hidden="true"
//                                             value={chosenSecondaryCurrency}
//                                             onChange={(e)=>setChosenSecondaryCurrency(e.target.value)}
//                                             >
//                                                 {Currencies.map((currency, _index)=>(
//                                                      <option
//                                                      selected=""
//                                                      data-select2-id="select2-data-12-xkh3"
//                                                  key={_index}
//                                                  >
//                                                     {currency}
//                                                  </option>
//                                                 ))}

//                                             <option
//                                                 selected=""
//                                                 data-select2-id="select2-data-15-a3bh"
//                                             >
//                                                 BTC
//                                             </option>
                                           
//                                             </select>
//                                             <span
//                                             className="select2 select2-container select2-container--default"
//                                             dir="ltr"
//                                             data-select2-id="select2-data-14-42sv"
//                                             style={{ width: "100%" }}
//                                             >
//                                             <span className="selection">
//                                                 <span
//                                                 className="select2-selection select2-selection--single"
//                                                 role="combobox"
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                                 tabIndex={0}
//                                                 aria-disabled="false"
//                                                 aria-labelledby="select2-ih12-container"
//                                                 aria-controls="select2-ih12-container"
//                                                 >
//                                                 <span
//                                                     className="select2-selection__rendered"
//                                                     id="select2-ih12-container"
//                                                     role="textbox"
//                                                     aria-readonly="true"
//                                                     title="BTC"
//                                                 >
//                                                     BTC
//                                                 </span>
//                                                 <span
//                                                     className="select2-selection__arrow"
//                                                     role="presentation"
//                                                 >
//                                                     <b role="presentation" />
//                                                 </span>
//                                                 </span>
//                                             </span>
//                                             <span className="dropdown-wrapper" aria-hidden="true" />
//                                             </span>
//                                         </div>
//                                         </div>
//                                         <div className="col-md-7">
//                                         <div className="form-group mb-0 side-input">
//                                         <input 
//                                             type="number" 
//                                             className="form-control " 
//                                              placeholder="Enter Amount"
//                                              value={result}
//                                              disabled={true}
//                                              onChange={(e)=> setAmount(e.target.value)}
//                                              />
//                                         </div>
//                                         </div>
//                                     </div>
//                                     </div>
//                                 </div>
//                                 </div>
//                             </div>
//                             <div className="buy-crpto-btn mt-4">
//                                 <button 
//                                 className="btn btn-primary submit-btn mb-0"
//                                 onClick={convert}
//                                 >Convert Crypto</button>
//                             </div>
//                             <div className="offset-6 col-xl-6 col-lg-6">
//                                 <div className="form-group bg-hover col-md-12">
//                                      <div className="col-xl-12 col-md-6 d-flex">
//                                     <div className="card-holder holder-blue ">
//                                         <div className="main-balance-blk">
//                                         <div className="main-balance center">
//                                             <h4  className="text-center">Exchange Rate</h4>
//                                             <h3  className="text-center">{exchangeRate}</h3>
//                                         </div>
//                                            To:
//                                         </div>
//                                         <div className="card-valid-blk">
//                                         <div className="valid-holder me-4">
//                                             <p>primary Currency</p>
//                                             <h5>{chosenPrimaryCurrency}</h5>
//                                         </div>
//                                         <span>To</span>
//                                         <div className="valid-holder">
//                                             <p>Secondary Currency</p>
//                                             <h5>{chosenSecondaryCurrency}</h5>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             </div>
//                         </form>
//                     </div>

//                 </div>

//                 {/* <div className="wallet-group">
//                     <div className="row">
//                         <div className="col-xl-4 col-md-6 d-flex">
//                         <div className="card-holder holder-blue">
//                             <div className="main-balance-blk">
//                             <div className="main-balance">
//                                 <h4>Main balance</h4>
//                                 <h3>$4626595</h3>
//                             </div>
//                             <div className="balance-bit-img">
//                                 <img src="assets/img/icon/watch-icon-08.svg" alt="" />
//                             </div>
//                             </div>
//                             <div className="card-valid-blk">
//                             <div className="valid-holder me-4">
//                                 <p>Valid thru</p>
//                                 <h5>08/21</h5>
//                             </div>
//                             <div className="valid-holder">
//                                 <p>Card Holderr</p>
//                                 <h5>Daniel radcliff</h5>
//                             </div>
//                             </div>
//                         </div>
//                         </div>
//                         <div className="col-xl-4 col-md-6 d-flex">
//                         <div className="card-holder holder-light">
//                             <div className="main-balance-blk">
//                             <div className="main-balance">
//                                 <h4>Main balance</h4>
//                                 <h3>$4626595</h3>
//                             </div>
//                             <div className="balance-bit">
//                                 <img src="assets/img/card-icon.png" alt="" />
//                             </div>
//                             </div>
//                             <div className="card-valid-blk">
//                             <div className="valid-holder me-4">
//                                 <p>Valid thru</p>
//                                 <h5>08/21</h5>
//                             </div>
//                             <div className="valid-holder">
//                                 <p>Card Holderr</p>
//                                 <h5>Daniel radcliff</h5>
//                             </div>
//                             </div>
//                         </div>
//                         </div>
//                         <div className="col-xl-2 col-md-6 d-flex">
//                         <div className="card wallet-widget">
//                             <div className="circle-bar circle-bar2">
//                             <div className="circle-graph2" data-percent={66}>
//                                 <canvas width={400} height={400} />
//                                 <b>66%</b>
//                             </div>
//                             </div>
//                             <div className="main-limit">
//                             <p>Main Limits</p>
//                             <h4>$10,000</h4>
//                             </div>
//                         </div>
//                         </div>
//                         <div className="col-xl-2 col-md-6 d-flex">
//                         <div className="card wallet-widget">
//                             <div className="circle-bar circle-bar3">
//                             <div className="circle-graph3" data-percent={66}>
//                                 <canvas width={400} height={400} />
//                                 <b>66%</b>
//                             </div>
//                             </div>
//                             <div className="main-limit main-second">
//                             <p>Seconds</p>
//                             <h4>$500</h4>
//                             </div>
//                         </div>
//                         </div>
//                     </div>
//                 </div> */}
//                 </div>
//         </div>



//     </>
//   )
// }
