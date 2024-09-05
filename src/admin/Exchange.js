import React, { useState } from 'react';
import axios from 'axios';
// import './CryptoConverter.css';
// import './DashboardHome.css';
export default function Exchange() {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
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
    <>
 
 <div className="container mt-5 px-2 px-lg-1" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
    <div className="row">
        <div className="col-12">
            <h2 className='text-white text-center mb-4'>Exchange Rates</h2>
            <div className="table-container text-white">
                <div className="content" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
                    <div className="container-fluid pb-0">
                        <div className="row my-2">
                            <div className="col-xl-7 col-lg-8">
                                <div className="card px-3 py-3" style={{ backgroundColor: '#000033', borderRadius: '10px' }}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="mb-0">
                                            <i className="fas fa-h1">Amount And Currency</i>
                                        </h5>
                                        <ul className="nav nav-pills mb-3">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-exchange-tab" data-toggle="pill" href="#pills-exchange" role="tab" aria-controls="pills-exchange" aria-selected="true">
                                                    <i className="fas fa-h1">Exchange Rate Calculator</i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-amount-tab" data-toggle="pill" href="#pills-amount" role="tab" aria-controls="pills-amount" aria-selected="false">
                                                    <i className="fas fa-h1">Amount And Currency</i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="pills-tabContent2">
                                        <div className="tab-pane fade show active" id="pills-exchange" role="tabpanel" aria-labelledby="pills-exchange-tab">
                                            <div className="pb-2 pt-3">
                                                <table className="table table-dark">
                                                    <thead>
                                                        <tr>
                                                            <th className="font-weight-bold">
                                                                <label>Exchange: From</label>
                                                            </th>
                                                            <th className="font-weight-bold">
                                                                <i className="bi bi-arrow-left-right" aria-hidden="true" />
                                                            </th>
                                                            <th className="font-weight-bold">
                                                                <label>Exchange: To</label>
                                                            </th>  
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="form-group">
                                                                    <label>From: Exchange</label>
                                                                    <div className="row">
                                                                        <div className="col-sm-6 mb-2">
                                                                            <input 
                                                                                type="number"
                                                                                className="form-control"
                                                                                placeholder="Enter Amount"
                                                                                value={amount}
                                                                                onChange={(e) => setAmount(Number(e.target.value))}
                                                                                style={{ fontSize: '1.25rem', borderRadius: '5px' }}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-5 mb-2">
                                                                            <select 
                                                                                className="form-control"
                                                                                value={chosenPrimaryCurrency}
                                                                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                                                                style={{ borderRadius: '5px' }}
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
                                                            </td>
                                                            <td>=</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <label>To: Exchange</label>
                                                                    <div className="row">
                                                                        <div className="col-sm-6 mb-2">
                                                                            <input 
                                                                                type="number"
                                                                                className="form-control"
                                                                                placeholder="Result"
                                                                                value={result.toFixed(2)}
                                                                                readOnly
                                                                                style={{ fontSize: '1.25rem', borderRadius: '5px' }}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-5 mb-2">
                                                                            <select 
                                                                                className="form-control"
                                                                                value={chosenSecondaryCurrency}
                                                                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                                                                style={{ borderRadius: '5px' }}
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
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-amount" role="tabpanel" aria-labelledby="pills-amount-tab">
                                            <div className="pb-2 pt-3">
                                                <table className="table table-dark">
                                                    <thead>
                                                        <tr>
                                                            <th className="font-weight-bold">Time</th>
                                                            <th className="font-weight-bold">Price (USDT)</th>
                                                            <th className="font-weight-bold">Amount (BTC)</th>
                                                            <th className="font-weight-bold">Total (USDT)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>14:00</td>
                                                            <td>$281.68</td>
                                                            <td>25,143 BTC</td>
                                                            <td>$1686.7</td>
                                                        </tr>
                                                        <tr>
                                                            <td>12:00</td>
                                                            <td>$211.68</td>
                                                            <td>24,9753 BTC</td>
                                                            <td>$1586.67</td>
                                                        </tr>
                                                        <tr>
                                                            <td>21:00</td>
                                                            <td>$278.68</td>
                                                            <td>2473 BTC</td>
                                                            <td>$166.67</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10:00</td>
                                                            <td>$241.68</td>
                                                            <td>75,973 BTC</td>
                                                            <td>$7486.67</td>
                                                        </tr>
                                                        <tr>
                                                            <td>13:00</td>
                                                            <td>$224.68</td>
                                                            <td>5473 BTC</td>
                                                            <td>$1286.67</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col text-center">
                                        <button className="btn btn-primary px-5" onClick={convert}>Convert</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-4">
                                <div className="card" style={{ borderRadius: '15px', backgroundColor:'#000033', color:'#fff' }}>
                                    <div className="card-body text-center">
                                        <h4>Result:</h4>
                                        <h3 className='text-white'>{exchangeRate.toFixed(4)}</h3>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <div>
                                            <p className='text-white'>Primary Currency</p>
                                            <h5 className='text-white'>{chosenPrimaryCurrency}</h5>
                                        </div>
                                        <span className='text-white'>To</span>
                                        <div>
                                            <p className='text-white'>Secondary Currency</p>
                                            <h5 className='text-white'>{chosenSecondaryCurrency}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  )
}
