import React from 'react';
import './wallet.css';
import { FaWallet, FaCalendarAlt, FaBitcoin, FaEthereum, FaExchangeAlt, FaLock, FaUnlockAlt, FaUserShield } from 'react-icons/fa';
import { BsArrowDownCircle } from 'react-icons/bs';

const WalletHeader = ({ dateRange, addWallet }) => (
  <div className="wallet-header">
    <div className="row">
      <div className="col-xl-6 col-lg-5 col-md-5 d-flex align-items-center">
        <div className="wel-come-name">
          <h4>My Wallet</h4>
        </div>
      </div>
      <div className="col-xl-6 col-lg-7 col-md-7">
        <div className="welcome-wallet d-flex justify-content-end">
          <div className="bookingrange btn-book ms-2 me-2 d-flex align-items-center">
            <FaCalendarAlt className="me-2" />
            <span>{dateRange}</span>
          </div>
          <div className="wallet-list">
            <a href="javascript:void(0);" onClick={addWallet} className="d-flex align-items-center">
              <FaWallet className="me-2" />
              <span>Add New Wallet</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WalletCard = ({ color, balance, validThru, cardHolder }) => (
  <div className={`col-xl-4 col-md-6 d-flex ${color}`}>
    <div className="card-holder card shadow-sm p-3 mb-5 bg-white rounded">
      <div className="main-balance-blk">
        <div className="main-balance">
          <h4>Main balance</h4>
          <h3>{balance}</h3>
        </div>
        <div className="balance-bit-img">
          <FaBitcoin size={48} className="text-primary" />
        </div>
      </div>
      <div className="card-valid-blk">
        <div className="valid-holder me-4">
          <p>Valid thru</p>
          <h5>{validThru}</h5>
        </div>
        <div className="valid-holder">
          <p>Card Holder</p>
          <h5>{cardHolder}</h5>
        </div>
      </div>
    </div>
  </div>
);

const WalletWidget = ({ color, percent, limit, label }) => (
  <div className={`col-xl-2 col-md-6 d-flex ${color}`}>
    <div className="card wallet-widget shadow-sm p-3 mb-5 bg-white rounded">
      <div className={`circle-bar circle-bar${percent}`}>
        <div className={`circle-graph${percent}`} data-percent={percent}>
          <b>{percent}%</b>
        </div>
      </div>
      <div className={`main-limit main-${label.toLowerCase().replace(" ", "-")}`}>
        <p>{label}</p>
        <h4>{limit}</h4>
      </div>
    </div>
  </div>
);

const QuickTransfer = ({ btcOptions, quickTransferAction }) => (
  <div className="col-xl-8 col-md-6 d-flex">
    <div className="card transfer-blk shadow-sm p-3 mb-5 bg-white rounded">
      <div className="transfer-quick">
        <div className="quick-cont comman-head">
          <h3>Quick Transfer</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="form-group bit-coins mb-0 d-flex align-items-center">
          <FaBitcoin className="me-2" />
          <select className="form-control select">
            {btcOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="ex-forms mb-5">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group bg-hover exchange-bg mb-0">
                  <select className="form-control select">
                    {["BTC", "Ethereum", "Ripple", "Bitcoin", "Cardano", "Litecoin", "NEO", "Stellar", "EOS", "NEM"].map((currency, index) => (
                      <option key={index} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-7">
                <div className="form-group mb-0 side-input">
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group bg-hover mb-5">
            <select className="form-control select">
              {["Aroon James", "William Stephin", "Bernardo James"].map((recipient, index) => (
                <option key={index} value={recipient}>{recipient}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="trans-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="transfer-now-btn">
            <a href="javascript:void(0);" className="btn btn-primary" onClick={quickTransferAction}>Transfer Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AccountSecurity = ({ securitySettings }) => (
  <div className="col-xl-4 col-md-6 d-flex">
    <div className="card account-grp shadow-sm p-3 mb-5 bg-white rounded">
      <div className="security-head">
        <h3>Account Security</h3>
      </div>
      {securitySettings.map(({ title, status, isChecked }, index) => (
        <SecurityGroup
          key={index}
          title={title}
          status={status}
          isChecked={isChecked}
        />
      ))}
    </div>
  </div>
);

const SecurityGroup = ({ title, status, isChecked }) => {
  const icon = title === 'Security Pin' ? <FaLock /> : title === '2-step Verification' ? <FaUnlockAlt /> : <FaUserShield />;
  
  return (
    <div className="security-group">
      <div className={`verification-blk ${status.toLowerCase().replace(" ", "-")}`}>
        <div className="security-box">
          {icon}
        </div>
        <div className="security-name-blk">
          <h4>{title}</h4>
          <span className={`secure-${status.toLowerCase().replace(" ", "-")}`}>{status}</span>
        </div>
        <div className="material-switch security-switch">
          <input id={title} type="checkbox" checked={isChecked} />
          <label htmlFor={title} className="badge-active"></label>
        </div>
      </div>
    </div>
  );
};

const Transactions = ({ transactions }) => (
  <div className="buy-form">
    <div className="border-watch">
      <div className="row">
        <div className="col d-flex align-items-center">
          <div className="watch-head">
            <h4>Transactions</h4>
          </div>
        </div>
        <div className="col-auto d-flex">
          <div className="trad-book-grp">
            <div className="bookingrange btn-book me-2 d-flex align-items-center">
              <FaCalendarAlt className="me-2" />
            </div>
            <div className="down-range">
              <a href="javascript:void(0);">
                <BsArrowDownCircle className="text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="transaction-wallet"></div>
    <div className="recent-buy comman-head">
      <h3>Wallet</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <TransactionTable transactions={transactions} />
    </div>
  </div>
);

const TransactionTable = ({ transactions }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table table-hover table-center">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.transactionId}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Wallet = () => {
  const dateRange = "Jul 1, 2023 - Jul 31, 2023";
  const addWallet = () => {
    // Function to add wallet
  };

  const quickTransferAction = () => {
    // Function for quick transfer action
  };

  const btcOptions = ["Bitcoin", "Ethereum", "Ripple"];

  const transactions = [
    {
      date: "Jul 21, 2023",
      transactionId: "TXN123456",
      description: "Purchased Bitcoin",
      amount: "0.05 BTC",
      status: "Completed",
    },
    // More transactions
  ];

  const securitySettings = [
    {
      imgSrc: "", // Use icons instead
      title: "Security Pin",
      status: "Active",
      isChecked: true,
    },
    {
      imgSrc: "", // Use icons instead
      title: "2-step Verification",
      status: "Inactive",
      isChecked: false,
    },
    {
      imgSrc: "", // Use icons instead
      title: "Security Question",
      status: "Active",
      isChecked: true,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <WalletHeader dateRange={dateRange} addWallet={addWallet} />
        <div className="row">
          <WalletCard color="bg-primary" balance="10.57 BTC" validThru="12/24" cardHolder="John Doe" />
          <WalletWidget color="bg-secondary" percent="75" limit="500 BTC" label="Credit Limit" />
          <QuickTransfer btcOptions={btcOptions} quickTransferAction={quickTransferAction} />
          <AccountSecurity securitySettings={securitySettings} />
          <Transactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;



// import React from 'react';
// import './wallet.css'
// const WalletHeader = ({ dateRange, addWallet }) => (
//   <div className="wallet-header">
//     <div className="row">
//       <div className="col-xl-6 col-lg-5 col-md-5 d-flex align-items-center">
//         <div className="wel-come-name">
//           <h4>My Wallet</h4>
//         </div>
//       </div>
//       <div className="col-xl-6 col-lg-7 col-md-7">
//         <div className="welcome-wallet">
//           <div className="bookingrange btn-book ms-2 me-2">
//             <img src="./img/icon/add-wallet.svg" alt="calendar" />
//             <span>{dateRange}</span>
//           </div>
//           <div className="wallet-list">
//             <a href="javascript:void(0);" onClick={addWallet}>
//               <span>
//                 <img src="./img/icon/add-wallet.svg" className="me-2" alt="add-wallet" />Add New Wallet
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const WalletCard = ({ color, balance, validThru, cardHolder, imgSrc }) => (
//   <div className={`col-xl-4 col-md-6 d-flex ${color}`}>
//     <div className="card-holder">
//       <div className="main-balance-blk">
//         <div className="main-balance">
//           <h4>Main balance</h4>
//           <h3>{balance}</h3>
//         </div>
//         <div className="balance-bit-img">
//           <img src={imgSrc} alt="balance" />
//         </div>
//       </div>
//       <div className="card-valid-blk">
//         <div className="valid-holder me-4">
//           <p>Valid thru</p>
//           <h5>{validThru}</h5>
//         </div>
//         <div className="valid-holder">
//           <p>Card Holder</p>
//           <h5>{cardHolder}</h5>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const WalletWidget = ({ color, percent, limit, label }) => (
//   <div className={`col-xl-2 col-md-6 d-flex ${color}`}>
//     <div className="card wallet-widget">
//       <div className={`circle-bar circle-bar${percent}`}>
//         <div className={`circle-graph${percent}`} data-percent={percent}>
//           <b>{percent}%</b>
//         </div>
//       </div>
//       <div className={`main-limit main-${label.toLowerCase().replace(" ", "-")}`}>
//         <p>{label}</p>
//         <h4>{limit}</h4>
//       </div>
//     </div>
//   </div>
// );

// const QuickTransfer = ({ btcOptions, quickTransferAction }) => (
//   <div className="col-xl-8 col-md-6 d-flex">
//     <div className="card transfer-blk">
//       <div className="transfer-quick">
//         <div className="quick-cont comman-head">
//           <h3>Quick Transfer</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </div>
//         <div className="form-group bit-coins mb-0">
//           <img src="assets/img/icon/watch-icon-08.svg" alt="icon" />
//           <select className="form-control select">
//             {btcOptions.map((option, index) => (
//               <option key={index} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-xl-6">
//           <div className="ex-forms mb-5">
//             <div className="row">
//               <div className="col-md-5">
//                 <div className="form-group bg-hover exchange-bg mb-0">
//                   <select className="form-control select">
//                     {["BTC", "Ethereum", "Ripple", "Bitcoin", "Cardano", "Litecoin", "NEO", "Stellar", "EOS", "NEM"].map((currency, index) => (
//                       <option key={index} value={currency}>{currency}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="col-md-7">
//                 <div className="form-group mb-0 side-input">
//                   <input type="text" className="form-control" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-6">
//           <div className="form-group bg-hover mb-5">
//             <select className="form-control select">
//               {["Aroon James", "William Stephin", "Bernardo James"].map((recipient, index) => (
//                 <option key={index} value={recipient}>{recipient}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="col-xl-8">
//           <div className="trans-text">
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
//           </div>
//         </div>
//         <div className="col-xl-4">
//           <div className="transfer-now-btn">
//             <a href="javascript:void(0);" className="btn btn-primary" onClick={quickTransferAction}>Transfer Now</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const AccountSecurity = ({ securitySettings }) => (
//   <div className="col-xl-4 col-md-6 d-flex">
//     <div className="card account-grp">
//       <div className="security-head">
//         <h3>Account Security</h3>
//       </div>
//       {securitySettings.map(({ imgSrc, title, status, isChecked }, index) => (
//         <SecurityGroup
//           key={index}
//           imgSrc={imgSrc}
//           title={title}
//           status={status}
//           isChecked={isChecked}
//         />
//       ))}
//     </div>
//   </div>
// );

// const SecurityGroup = ({ imgSrc, title, status, isChecked }) => (
//   <div className="security-group">
//     <div className={`verification-blk ${status.toLowerCase().replace(" ", "-")}`}>
//       <div className="security-box">
//         <img src={imgSrc} alt="security" />
//       </div>
//       <div className="security-name-blk">
//         <h4>{title}</h4>
//         <span className={`secure-${status.toLowerCase().replace(" ", "-")}`}>{status}</span>
//       </div>
//       <div className="material-switch security-switch">
//         <input id={title} type="checkbox" checked={isChecked} />
//         <label htmlFor={title} className="badge-active"></label>
//       </div>
//     </div>
//   </div>
// );

// const Transactions = ({ transactions }) => (
//   <div className="buy-form">
//     <div className="border-watch">
//       <div className="row">
//         <div className="col d-flex align-items-center">
//           <div className="watch-head">
//             <h4>Transactions</h4>
//           </div>
//         </div>
//         <div className="col-auto d-flex">
//           <div className="trad-book-grp">
//             <div className="bookingrange btn-book me-2">
//               <img src="./img/icon/calendar-icon.svg" alt="calendar" />
//               {/* <img src="assets/img/icon/calendar-icon.svg" alt="calendar" /> */}
//               <span></span>
//             </div>
//             <div className="down-range">
//               <a href="javascript:void(0);">
//                 <img src="./../assets/img/icon/down-icon.svg" alt="down" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div id="transaction-wallet"></div>
//     <div className="recent-buy comman-head">
//       <h3>Wallet</h3>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//       <TransactionTable transactions={transactions} />
//     </div>
//   </div>
// );

// const TransactionTable = ({ transactions }) => (
//   <div className="row">
//     <div className="col-md-12">
//       <div className="buy-form-crypto mb-0">
//         {transactions.map(({ id, type, amount, rate, date, details }, index) => (
//           <TransactionInfo
//             key={index}
//             transactionType={type}
//             amount={amount}
//             exchangeRate={rate}
//             date={date}
//             details={details}
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const TransactionInfo = ({ transactionType, amount, exchangeRate, date, details }) => (
//   <div className="border-watch border-bottom">
//     <div className="row">
//       <div className="col-lg-3">
//         <div className="action-head">
//           <h4>{transactionType}</h4>
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="transaction-id">
//           <h4>{amount}</h4>
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="transaction-id">
//           <h4>{exchangeRate}</h4>
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="transaction-id">
//           <h4>{date}</h4>
//         </div>
//       </div>
//     </div>
//     {details && (
//       <div className="row align-items-center">
//         {details.map(({ imgSrc, title, amount, rate, date }, index) => (
//           <TransactionDetail
//             key={index}
//             imgSrc={imgSrc}
//             title={title}
//             amount={amount}
//             exchangeRate={rate}
//             exchangeDate={date}
//           />
//         ))}
//       </div>
//     )}
//   </div>
// );

// const TransactionDetail = ({ imgSrc, title, amount, exchangeRate, exchangeDate }) => (
//   <div className="col-lg-6">
//     <div className="form-group bit-amount mb-0">
//       <img src={imgSrc} alt="icon" />
//       <div className="bit-rate">
//         <h4>{title}</h4>
//         <span>{amount}</span>
//       </div>
//       <div className="bit-rate">
//         <p>{exchangeRate}</p>
//         <p>{exchangeDate}</p>
//       </div>
//     </div>
//   </div>
// );

// const Wallet = () => {
//   const walletData = {
//     dateRange: '07/01/2023 - 07/31/2023',
//     addWallet: () => alert('Add Wallet Clicked'),
//     walletCards: [
//       { color: 'active-wallet', balance: 'BTC 0.0492159', validThru: '08/25', cardHolder: 'Jerry James', imgSrc: './../assets/img/icon/main-1.svg' },
//       { color: 'primary-wallet', balance: 'USD 22,000.00', validThru: '08/25', cardHolder: 'Jerry James', imgSrc: './../assets/img/icon/main-2.svg' },
//       { color: 'secondary-wallet', balance: 'EUR 860.00', validThru: '08/25', cardHolder: 'Jerry James', imgSrc: './../assets/img/icon/main-3.svg' }
//     ],
//     walletWidgets: [
//       { color: 'primary-wallet-widget', percent: 80, limit: '8,45,844', label: 'Daily Limit' },
//       { color: 'secondary-wallet-widget', percent: 65, limit: '5,42,874', label: 'Monthly Limit' },
//       { color: 'success-wallet-widget', percent: 50, limit: '3,25,845', label: 'Annual Limit' }
//     ],
//     btcOptions: ["BTC 0.0515"],
//     quickTransferAction: () => alert('Transfer Now Clicked'),
//     securitySettings: [
//       { imgSrc: './../assets/img/icon/watch-icon-01.svg', title: 'Security Pin', status: 'Secure', isChecked: true },
//       { imgSrc: './../assets/img/icon/watch-icon-02.svg', title: '2-step Verification', status: 'Unsecure', isChecked: false },
//       { imgSrc: './../assets/img/icon/watch-icon-03.svg', title: 'Face ID', status: 'Secure', isChecked: true }
//     ],
//     transactions: [
//       {
//         id: '66414194814',
//         type: 'Bitcoin',
//         amount: '6,799.0001 BTC',
//         rate: 'USD 4.453.99',
//         date: '2023-01-24 07:15:22',
//         details: [
//           { imgSrc: './../assets/img/icon/cube-icon.svg', title: 'Bitcoin', amount: '6,799.0001 BTC', rate: 'USD 4.453.99', date: '2023-01-24 07:15:22' },
//           { imgSrc: './../assets/img/icon/cube-icon-01.svg', title: 'Bitcoin', amount: '6,799.0001 BTC', rate: 'USD 4.453.99', date: '2023-01-24 07:15:22' }
//         ]
//       }
//     ]
//   };

//   return (
//     <div className="container">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-12 col-lg-12 col-xl-12">
//             <WalletHeader dateRange={walletData.dateRange} addWallet={walletData.addWallet} />
//             <div className="row">
//               {walletData.walletCards.map((card, index) => (
//                 <WalletCard key={index} {...card} />
//               ))}
//               {walletData.walletWidgets.map((widget, index) => (
//                 <WalletWidget key={index} {...widget} />
//               ))}
//               <QuickTransfer btcOptions={walletData.btcOptions} quickTransferAction={walletData.quickTransferAction} />
//               <AccountSecurity securitySettings={walletData.securitySettings} />
//             </div>
//           </div>
//           <div className="col-md-12 col-lg-12 col-xl-12">
//             <Transactions transactions={walletData.transactions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wallet;
