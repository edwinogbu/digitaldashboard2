import React from 'react';
import { Link } from 'react-router-dom';

function Transactions() {
    // Sample transaction data
    const transactions = [
        {
            id: '#4562665',
            currencyType: 'Ethereum',
            status: 'green',
            change: '263.54 %',
            amount: '0.568',
            price: '$ 11,723.40',
            usd: '979.28',
            fees: '0.2',
            time: '05:30 AM'
        },
        {
            id: '#4562666',
            currencyType: 'Ripple',
            status: 'red',
            change: '263.54 %',
            amount: '0.568',
            price: '$ 11,723.40',
            usd: '979.28',
            fees: '0.2',
            time: '05:30 AM'
        },
        // Add more transaction objects here
    ];

    return (
        <div className="content">
            <div className="row">
                <div className="col-sm-12">
                    <div className="transaction-grp">
                        <div className="row">
                            {/* Transaction records */}
                            {transactions.map((transaction, index) => (
                                <div key={index} className="col-xl-3 col-md-6">
                                    <div className={`transaction-record ${transaction.status}-view`}>
                                        <h2>{transaction.id}</h2>
                                        <p>{transaction.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="recent-buy comman-head">
                        <h3>Recent transactions</h3>
                        <p>Digital Payout.</p>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="buy-form-crypto mb-0">
                                    <div className="border-watch mb-2">
                                        <div className="row">
                                            {/* Add JSX for recent transactions filter */}
                                            <div className="col-xl-9  d-flex align-items-center">
                                                <div className="status-blk">
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <div className="action-head">
                                                                <h4>Latest actions</h4>
                                                                <span>(Showing 01 to 06 of 100)</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 d-flex align-items-center">
                                                            <div className="form-group date-border cal-icon">
                                                                <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 d-flex align-items-center">
                                                            <div className="form-group date-border cal-icon">
                                                                <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 d-flex align-items-center">
                                                            <div className="form-group bg-hover date-border">
                                                                <select className="form-control select">
                                                                    <option>$Currency type</option>
                                                                    <option>Credit</option>
                                                                    <option>Debit</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 d-flex align-items-center">
                                                            <div className="form-group bg-hover date-border">
                                                                <select className="form-control select">
                                                                    <option>Type</option>
                                                                    <option>Buy</option>
                                                                    <option>Sell</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 d-flex align-items-center">
                                                <label className="me-2">SortBy:</label>
                                                <div className="form-group date-border sort-by cal-icon me-2">
                                                    <input type="text" className="form-control datetimepicker" placeholder="DD-MM-YYYY" />
                                                </div>
                                                <div className="down-range date-border">
                                                    <Link to="/"><img src="assets/img/icon/down-icon.svg" alt="" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="datatable table custom-table">
                                            <thead>
                                                <tr>
                                                    <th>ID No</th>
                                                    <th>Currency type</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                    <th>Price</th>
                                                    <th>USD ($)</th>
                                                    <th>Fees</th>
                                                    <th>Time</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transactions.map((transaction, index) => (
                                                    <tr key={index}>
                                                        <td>{transaction.id}</td>
                                                        <td>
                                                            <img src={`assets/img/icon/watch-icon-0${index + 1}.svg`} alt="Award" className="me-2" />
                                                            {transaction.currencyType}
                                                        </td>
                                                        <td>
                                                            <span className={`custom-badge status-${transaction.status}`}>
                                                                <i className="fas fa-arrow-up" aria-hidden="true"></i>
                                                                {transaction.change}
                                                            </span>
                                                        </td>
                                                        <td>{transaction.amount}</td>
                                                        <td>{transaction.price}</td>
                                                        <td>{transaction.usd}</td>
                                                        <td>{transaction.fees}</td>
                                                        <td>{transaction.time}</td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <Link to="/" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="feather-more-vertical"></i>
                                                                </Link>
                                                                <div className="dropdown-menu dropdown-menu-right" >
                                                                    <Link className="dropdown-item" to="/"><i className="fas fa-pencil-alt m-r-5"></i>Edit</Link>
                                                                    <Link className="dropdown-item" to="/" data-bs-toggle="modal"><i className="fas fa-trash-alt m-r-5"></i>Delete</Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transactions;
