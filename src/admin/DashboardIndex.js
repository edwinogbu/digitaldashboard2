import React from 'react';
import Sidebar from '../components/Sidebar';
import { Navbar } from 'react-bootstrap';

const DashboardIndex = () => {
  // Example data objects for main chart and tables
  const mainChartData = {
    title: 'Monthly Overall Growth',
    buttons: ['Week', 'Month', 'Year'],
    chartId: 'chart_1',
    totalBalance: '0.3475948',
    totalBalanceUSD: '11,032.24 USD',
  };

  const activeGrowthData = {
    title: 'Active Overall Growth',
    tableData: [
      {
        type: 'Exchange',
        asset: { imgSrc: './assets/img/crypto/bitcoin.png', name: 'Bitcoin' },
        date: 'Apr 14, 2023',
        ipAddress: '140.91.94.219',
        status: { text: 'Success', className: 'green-tag' },
        amount: '11,250 BTC',
      },
      {
        type: 'Exchange',
        asset: { imgSrc: './assets/img/crypto/binance.png', name: 'Binance' },
        date: 'Apr 14, 2023',
        ipAddress: '140.91.94.219',
        status: { text: 'Unpaid', className: 'red-tag' },
        amount: '11,250 BTC',
      },
      {
        type: 'Exchange',
        asset: { imgSrc: './assets/img/crypto/dash.png', name: 'Dashcoin' },
        date: 'Apr 14, 2023',
        ipAddress: '140.91.94.219',
        status: { text: 'Success', className: 'green-tag' },
        amount: '11,250 BTC',
      },
      {
        type: 'Exchange',
        asset: { imgSrc: './assets/img/crypto/dogecoin.png', name: 'Dogecoin' },
        date: 'Apr 14, 2023',
        ipAddress: '140.91.94.219',
        status: { text: 'Unpaid', className: 'red-tag' },
        amount: '11,250 BTC',
      },
      {
        type: 'Exchange',
        asset: { imgSrc: './assets/img/crypto/etherium.png', name: 'Ethereum' },
        date: 'Apr 14, 2023',
        ipAddress: '140.91.94.219',
        status: { text: 'Pending', className: 'red-tag' },
        amount: '11,250 BTC',
      },
      {
        type: 'Exchange',
        asset: { imgSrc: './assets/img/crypto/tether.png', name: 'Tether' },
        date: 'Apr 14, 2023',
        ipAddress: '140.91.94.219',
        status: { text: 'Pending', className: 'red-tag' },
        amount: '11,250 BTC',
      },
    ],
  };

  const recentTransactionsData = [
    { imgSrc: './assets/img/crypto/bitcoin.png', name: 'Bitcon', time: 'Today, 3.50 PM', amount: '$47,515' },
    { imgSrc: './assets/img/crypto/tether.png', name: 'Litcon', time: 'Today, 3.50 PM', amount: '$37,515' },
    { imgSrc: './assets/img/crypto/binance.png', name: 'Binance', time: 'Today, 3.50 PM', amount: '$27,515' },
    { imgSrc: './assets/img/crypto/etherium.png', name: 'Ethereum', time: 'Today, 3.50 PM', amount: '$23,515' },
    { imgSrc: './assets/img/crypto/dogecoin.png', name: 'Dogecoin', time: 'Today, 3.50 PM', amount: '$22,515' },
    { imgSrc: './assets/img/crypto/dash.png', name: 'Dashcoin', time: 'Today, 3.50 PM', amount: '$21,515' },
  ];

  return (
    <>
    <div class="d-flex wrapper" id="wrapper">
       <Sidebar />
       <div id="page-content-wrapper" class="page-content-wrapper">
        <Navbar />
        <div class="container-fluid main-content px-2 px-lg-4">
        {/* Main Chart Area */}
        <div className="row my-2 g-3 gx-lg-4">
            <div className="col-xl-7 col-xxl-9">
            <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
                <div className="d-flex w-100 flex-wrap justify-content-between pb-4 bottom-border">
                <h4 className="mb-0">{mainChartData.title}</h4>
                <div className="d-flex align-items-center gap-3">
                    {mainChartData.buttons.map((button, index) => (
                    <button key={index} className="outline-btn">{button}</button>
                    ))}
                </div>
                </div>
                <div className="chart-container">
                <canvas id={mainChartData.chartId}></canvas>
                </div>
            </div>
            </div>
            <div className="col-xl-5 col-xxl-3">
            <div className="doughnut">
                <div id="donut_wrapper" className="position-relative">
                <div id="donutchart"></div>
                </div>
                <p className="large text-center mt-3">Total Balance</p>
                <h3 className="text-white text-center">{mainChartData.totalBalance}</h3>
                <p className="primary text-center">{mainChartData.totalBalanceUSD}</p>
                <div className="d-flex justify-content-center">
                <button className="primary-btn">Withdraw</button>
                </div>
            </div>
            </div>
        </div>

        {/* Tables */}
        <div className="row my-2 g-3 gx-lg-4 pb-3">
            <div className="col-xl-7 col-xxl-9">
            <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
                <div>
                <h5 className="mb-0">{activeGrowthData.title}</h5>
                </div>
                <div className="recent-contact pb-2 pt-3">
                <table>
                    <thead>
                    <tr className="border-b2">
                        <th className="fw-bold">Type</th>
                        <th className="fw-bold">Asset</th>
                        <th className="fw-bold">Date</th>
                        <th className="fw-bold">IP Address</th>
                        <th className="fw-bold">Status List</th>
                        <th className="fw-bold">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activeGrowthData.tableData.map((row, index) => (
                        <tr key={index} className="border-b2">
                        <td>{row.type}</td>
                        <td className="d-flex align-items-center gap-2">
                            <img src={row.asset.imgSrc} alt="" />
                            {row.asset.name}
                        </td>
                        <td>{row.date}</td>
                        <td>{row.ipAddress}</td>
                        <td><span className={row.status.className}>{row.status.text}</span></td>
                        <td>{row.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <div className="col-xl-5 col-xxl-3">
            <div className="doughnut">
                <h5 className="text-white mb-3">Recent Transaction</h5>
                <div className="coins-list">
                {recentTransactionsData.map((transaction, index) => (
                    <div key={index} className="coin d-flex justify-content-between align-items-center border-b2">
                    <div className="d-flex gap-2 align-items-center">
                        <div>
                        <img src={transaction.imgSrc} alt="" />
                        </div>
                        <div className="d-flex flex-column">
                        <span className="text-white">{transaction.name}</span>
                        <span className="medium">{transaction.time}</span>
                        </div>
                    </div>
                    <h5 className="text-white">{transaction.amount}</h5>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default DashboardIndex;
