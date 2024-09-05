// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Select } from 'antd';
// import Sidebar from '../components/Sidebar';
// import Footer from '../components/Footer';
// import DashboardHome from './DashboardHome';
// import Exchange from './Exchange';
// import UserList from './UserList';
// import CrytocurrencyPrices from './CrytocurrencyPrices';
// import UserProfile from './UserProfile';
// import MarketCap from '../admin/Transactions';
// import WalletView from './wallet/WalletView';
// import Wallet from './wallet/Wallet';
// import HomeWallet from './wallet/homeWallet';
// import RecoverAccount from './wallet/RecoverAccount';
// import CreateAccount from './wallet/CreateAccount';
// import Transactions from '../admin/Transactions';
// import CryptoConverter from '../admin/CryptoConverter';
// import CurrencyConverter from '../admin/CurrencyConverter';
// import { useAuth } from '../AuthContext';
// import CoinDetail from './CoinDetail';

// export default function Dashboard() {
//   const { isAuthenticated, logout } = useAuth();
//   const { state } = useAuth();
//   const user = state.user.user;

//   const [wallet, setWallet] = useState(null);
//   const [seedPhrase, setSeedPhrase] = useState(null);
//   const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     // Attach event listener to menu toggle button
//     const menuToggle = document.getElementsByClassName('menu-toggle')[0];
//     const sidebar = document.getElementById('sidebar');
//     const pageContentWrapper = document.getElementById('page-content-wrapper');

//     if (menuToggle) {
//       menuToggle.addEventListener('click', () => {
//         // Toggle the 'open' class on sidebar
//         if (sidebar.classList.contains('open')) {
//           sidebar.classList.remove('open');
//           pageContentWrapper.classList.remove('sidebar-open');
//         } else {
//           sidebar.classList.add('open');
//           pageContentWrapper.classList.add('sidebar-open');
//         }
//       });
//     }

//     return () => {
//       if (menuToggle) {
//         menuToggle.removeEventListener('click', () => {
//           if (sidebar.classList.contains('open')) {
//             sidebar.classList.remove('open');
//             pageContentWrapper.classList.remove('sidebar-open');
//           } else {
//             sidebar.classList.add('open');
//             pageContentWrapper.classList.add('sidebar-open');
//           }
//         });
//       }
//     };
//   }, []);

//   // if (!isAuthenticated) {
//   //   // Redirect or show a login message
//   //   return <div>Please log in</div>;
//   // }

//   const userRole = user ? user.role : 'guest'; // Adjust based on your user object structure

//   return (
//     <div className="d-flex wrapper" id="wrapper">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={userRole} />
//       <div className="page-content-wrapper" id="page-content-wrapper">
//         <nav className="navbar navbar-expand-lg py-lg-3 px-2 px-lg-4 d-flex fixed-top justify-content-between" style={{ backgroundColor: '#000033' }}>
//           <div className="d-flex align-items-center">
//             <div className="d-flex align-items-center d-lg-none">
//               <span
//                 className="material-symbols-outlined menu-toggle"
//                 id="menu-toggle"
//                 style={{ color: '#FFF' }}
//               >
//                 menu
//               </span>
//             </div>
//             <div className="d-none d-xl-block">
//               <form className="d-flex align-items-center search-form p-2">
//                 <span className="material-symbols-outlined" style={{ color: '#FFF' }}>
//                   crypto
//                 </span>
//                 <Select
//                   style={{ backgroundColor: '#000033', color: '#FFF' }}
//                   onChange={(val) => setSelectedChain(val)}
//                   value={selectedChain}
//                   options={[
//                     { label: "Ethereum", value: "0x1" },
//                     { label: "Mumbai Testnet", value: "0x13881" },
//                     { label: "Polygon", value: "0x89" },
//                     { label: "Avalanche", value: "0xa86a" },
//                   ]}
//                   className="dropdown align-items-center p-0"
//                 />
//                 <span className="material-symbols-outlined" style={{ color: '#FFF' }}>
//                   search
//                 </span>
//               </form>
//             </div>

//             <div className="d-none d-xl-block">
//               <form className="d-flex align-items-center search-form p-2">
//                 <button onClick={logout} className="btn btn-danger">Logout</button>
//               </form>
//             </div>
//           </div>
//           <div className="d-flex gap-3 p-lg-2 p-lg-0 align-items-center justify-content-end">
//             <div className="dropdown">
//               <Link
//                 aria-expanded="false"
//                 className="nav-icon"
//                 data-bs-toggle="dropdown"
//                 href="#"
//                 id="navbarDropdown1"
//                 role="button"
//                 style={{ color: '#FFF' }}
//               >
//                 <span className="material-symbols-outlined fw-light d-flex">
//                   comment
//                 </span>
//                 <span className="dot" />
//               </Link>
//               <div
//                 aria-labelledby="navbarDropdown1"
//                 className="dropdown-menu message rounded border-0 shadow"
//                 style={{ backgroundColor: '#000033', color: '#FFF' }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="border-b">
//                   <span className="fw-bold lead-text text-center d-block pb-2">
//                     Message
//                   </span>
//                 </div>
//                 <div>
//                   <Link
//                     className="message-box"
//                     href="#"
//                     style={{ color: '#FFF' }}
//                   >
//                     <div>
//                       <img
//                         alt="avatar"
//                         src="../assets/img/chat_5.png"
//                       />
//                     </div>
//                     <div className="d-flex flex-column">
//                       <span className="large fw-bold text-white">
//                         {user ? ` ${user.lastName}` : ''}
//                       </span>
//                       <p className="mb-0">
//                         Hi, What's going on?
//                       </p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="dropdown">
//               <Link
//                 aria-expanded="false"
//                 className="nav-icon"
//                 data-bs-toggle="dropdown"
//                 href="#"
//                 id="navbarDropdown2"
//                 role="button"
//                 style={{ color: '#FFF' }}
//               >
//                 <span className="material-symbols-outlined fw-light d-flex">
//                   notifications_active
//                 </span>
//                 <span className="dot" />
//               </Link>
//               <div
//                 aria-labelledby="navbarDropdown2"
//                 className="dropdown-menu notification rounded border-0 shadow"
//                 style={{ backgroundColor: '#000033', color: '#FFF' }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="border-b">
//                   <span className="fw-bold lead-text text-center d-block pb-2">
//                     Notifications
//                   </span>
//                 </div>
//                 <div>
//                   <Link
//                     className="message-box"
//                     href="#"
//                     style={{ color: '#FFF' }}
//                   >
//                     <div>
//                       <img
//                         alt="avatar"
//                         src="./assets/img/chat_1.png"
//                       />
//                     </div>
//                     <div className="d-flex flex-column">
//                       <span className="large fw-bold text-white">
//                         {user ? `${user.email}` : ''}
//                       </span>
//                       <span className="small d-inline-block mb-2">
//                         Digital Payout
//                       </span>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <Link
//                 aria-expanded="false"
//                 className="d-flex gap-2 align-items-center"
//                 data-bs-toggle="dropdown"
//                 href="#"
//                 id="navbarDropdown4"
//                 role="button"
//                 style={{ color: '#FFF' }}
//               >
//                 <img
//                   alt="user"
//                   className="img-fluid"
//                   height="60"
//                   src="../assets/img/promo_9.png"
//                   width="60"
//                 />
//                 <div className="d-flex flex-column d-none d-xl-block">
//                   <p className="mb-0 text-white fw-semibold">
//                     <h5>{user ? `${user.firstName} ${user.lastName}` : ''}</h5>
//                   </p>
//                   <span className="small text-white">
//                     {user ? user.email : ''}
//                   </span>
//                 </div>
//               </Link>
//               <ul
//                 aria-labelledby="navbarDropdown4"
//                 className="dropdown-menu dropdown-menu-end user shadow border-0"
//                 style={{ backgroundColor: '#000033', color: '#FFF' }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <li>
//                   <span className="px-3 d-inline-block">
//                     Welcome{user ? ` ${user.firstName}` : ''}
//                   </span>
//                 </li>
//                 <li>
//                   <Link className="dropdown-item" href="/profile" style={{ color: '#FFF' }}>
//                     <span className="material-symbols-outlined align-middle">
//                       person
//                     </span>
//                     <span className="d-inline-block px-2">Profile</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="dropdown-item" href="/settings" style={{ color: '#FFF' }}>
//                     <span className="material-symbols-outlined align-middle">
//                       settings
//                     </span>
//                     <span className="d-inline-block px-2">Settings</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="dropdown-item"
//                     href="#"
//                     onClick={logout}
//                     style={{ color: '#FFF' }}
//                   >
//                     <span className="material-symbols-outlined align-middle">
//                       logout
//                     </span>
//                     <span className="d-inline-block px-2">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//         <div className="container-fluid">
//           <Routes>
//             <Route path="/" element={<DashboardHome />} />
//             <Route path="/exchange" element={<Exchange />} />
//             <Route path="/user-list" element={<UserList />} />
//             <Route path="/crypto-prices" element={<CrytocurrencyPrices />} />
//             <Route path="/user-profile" element={<UserProfile />} />
//             <Route path="/market-cap" element={<MarketCap />} />
//             <Route path="/wallet-view" element={<WalletView />} />
//             <Route path="/wallet" element={<Wallet />} />
//             <Route path="/home-wallet" element={<HomeWallet />} />
//             <Route path="/recover-account" element={<RecoverAccount />} />
//             <Route path="/create-account" element={<CreateAccount />} />
//             <Route path="/transactions" element={<Transactions />} />
//             <Route path="/crypto-converter" element={<CryptoConverter />} />
//             <Route path="/currency-converter" element={<CurrencyConverter />} />
//             <Route path="/coin-detail" element={<CoinDetail />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route, MemoryRouter, Link, NavLink } from 'react-router-dom';
import { Select } from 'antd';


import DashboardHome from './admin/DashboardHome';
import Exchange from './admin/Exchange';
import UserList from './admin/UserList';
import CrytocurrencyPrices from './CrytocurrencyPrices';
import UserProfile from './UserProfile';
import MarketCap from '../admin/Transactions';
import WalletView from './wallet/WalletView';
import Wallet from './wallet/Wallet';
import HomeWallet  from './wallet/homeWallet'
import RecoverAccount  from './wallet/RecoverAccount'
import CreateAccount  from './wallet/CreateAccount'
import Transactions  from '../admin/Transactions'
import CryptoConverter from '../admin/CryptoConverter'
import CurrencyConverter  from '../admin/CurrencyConverter'
import { useAuth } from '../AuthContext';
import CoinDetail from './CoinDetail';
import DepositAndWithdrawal from './DepositAndWithdrawal';



function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { state } = useAuth();
  const user = state.user.user;
  
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name
  const [classState, setClassState] = useState('d-flex wrapper');

  const toggleClass = () => {
    setClassState((prevClass) =>
      prevClass === 'd-flex wrapper' ? 'd-flex wrapper toggled' : 'd-flex wrapper'
    );
  };


  const userRole = user ? user.role : 'user';
  return (
    <>
      <div className={classState} id="wrapper">
        <div className="sidebar-wrapper" id="sidebar-wrapper">
          <div className="sidebar-heading">
            <NavLink to="/">
              {/* <img alt="" id="logo" src="../images/golden-coin.jpg" /> */}
              <img className="sidebar-card-illustration mb-2" src="./../images/dlogo.png" alt="logo" id="logo" style={{width:60, height:60, borderRadius:50}}/>

            </NavLink>
          </div>
          <nav className="sidebar mb-4">
           
              <ul className="nav flex-column" id="nav_accordion">
              {/* User-specific links */}
              {(userRole === 'user' || userRole === 'admin') && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/home">
                      {/* <img src="../images/fly-coins.jpg" alt="Dashboard Icon" width={20} height={20} /> */}
                      <img className="sidebar-card-illustration mb-2" src="./../images/dlogo.png" alt="logo" id="logo" style={{width:60, height:60, borderRadius:50}}/>

                      <span className="fw-semibold">Dashboard</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/exchange">
                      <span className="material-symbols-outlined fw-lighter">sync</span>
                      <span className="fw-semibold">Exchange Rate</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/homewallet">
                      <span className="material-symbols-outlined fw-lighter">account_balance_wallet</span>
                      <span className="fw-semibold">Wallets</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/DepositAndWithdrawal">
                      <span className="material-symbols-outlined fw-lighter">account_balance_wallet</span>
                      <span className="fw-semibold">DepositAndWithdrawal</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin-specific links */}
              {userRole === 'admin' && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/cryptoexchange">
                      <span className="material-symbols-outlined fw-lighter">sync</span>
                      <span className="fw-semibold">Exchange</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/user-list">
                      <span className="material-symbols-outlined fw-lighter">payments</span>
                      <span className="fw-semibold">User List</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/profile-settings">
                      <span className="material-symbols-outlined fw-lighter">person</span>
                      <span className="fw-semibold">User Profile</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/price">
                      <span className="material-symbols-outlined fw-lighter">attach_money</span>
                      <span className="fw-semibold">Crypto Market Trends</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/market-cap">
                      <span className="material-symbols-outlined fw-lighter">percent</span>
                      <span className="fw-semibold">Market Cap</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/transactions">
                      <span className="material-symbols-outlined fw-lighter">insights</span>
                      <span className="fw-semibold">Activities</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/notifications">
                      <span className="material-symbols-outlined fw-lighter">notifications_active</span>
                      <span className="fw-semibold">Notifications</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/settings">
                      <span className="material-symbols-outlined fw-lighter">settings</span>
                      <span className="fw-semibold">Settings</span>
                    </NavLink>
                  </li>
                  <li className="nav-item has-submenu">
                    <NavLink className="nav-link d-flex justify-content-between align-items-center" to="#" onClick={(e) => e.preventDefault()}>
                      <span className="d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined fw-light">construction</span>
                        <span className="fw-semibold">Utilities</span>
                      </span>
                      <span className="material-symbols-outlined">arrow_drop_down</span>
                    </NavLink>
                    <ul className="submenu collapse ps-2">
                      <li className="mt-2">
                        <NavLink className="nav-link" to="/protected">Protected Page</NavLink>
                      </li>
                      <li className="mt-2">
                        <NavLink className="nav-link" to="/404">404 Error</NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-submenu">
                    <NavLink className="nav-link d-flex justify-content-between align-items-center" to="#" onClick={(e) => e.preventDefault()}>
                      <span className="d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined fw-light">work</span>
                        <span className="fw-semibold">Authentication</span>
                      </span>
                      <span className="material-symbols-outlined">arrow_drop_down</span>
                    </NavLink>
                    <ul className="submenu collapse ps-2">
                      <li className="mt-2">
                        <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                      </li>
                      <li className="mt-2">
                        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
            <div className="lang-select d-flex justify-content-center">
              <select id="select">
                <option value="english">English</option>
                <option value="bangla">Bangla</option>
                <option value="arabic">Arabic</option>
              </select>
            </div>
          </nav>
        </div>
        <div className="page-content-wrapper" id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg py-lg-3 px-2 px-lg-4 d-flex fixed-top justify-content-between">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center d-lg-none">
                <span
                  className="material-symbols-outlined menu-toggle"
                  id="menu-toggle"
                  onClick={toggleClass}
                >
                  menu
                </span>
              </div>
              <div className="d-none d-xl-block">
                <form className="d-flex align-items-center search-form p-2">
                  <input placeholder="Search..." type="text" />
                  <span className="material-symbols-outlined">search</span>
                </form>
              </div>
              <div className="d-none d-xl-block">
                
                <Select
                style={{ backgroundColor: '#000033', color: '#FFF' }}
                onChange={(val) => setSelectedChain(val)}
                value={selectedChain}
                options={[
                  { label: "Ethereum", value: "0x1" },
                  { label: "Mumbai Testnet", value: "0x13881" },
                  { label: "Polygon", value: "0x89" },
                  { label: "Avalanche", value: "0xa86a" },
                ]}
                // className="dropdown align-items-center p-0"
                className="d-flex align-items-center search-form p-2"
              />
              </div>
            </div>
            <div className="d-flex gap-3 p-lg-2 p-lg-0 align-items-center justify-content-end">
              <div className="dropdown">
                <NavLink
                  aria-expanded="false"
                  className="nav-icon"
                  data-bs-toggle="dropdown"
                  to="#"
                  id="navbarDropdown1"
                  role="button"
                >
                  <span className="material-symbols-outlined fw-light d-flex">comment</span>
                  <span className="dot" />
                </NavLink>
                <div
                  aria-labelledby="navbarDropdown1"
                  className="dropdown-menu message rounded border-0 shadow"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b">
                    <span className="fw-bold lead-text text-center d-block pb-2">Message</span>
                  </div>
                  <div>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_1.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">  Welcome{user ? ` ${user.firstName} ${user.lastName}` : ''}</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_6.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white"> {user ? ` ${user.firstName} ${user.lastName}` : ''}</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_3.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">  {user ? ` ${user.firstName} ${user.lastName}` : ''}</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_5.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">  {user ? ` ${user.firstName} ${user.lastName}` : ''}</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_1.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Guillaume Apithy</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="border-t pt-3 pb-2 text-center">
                    <NavLink className="text-decoration-none text-white" to="#">
                      Read All Messages
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <NavLink
                  aria-expanded="false"
                  className="nav-icon"
                  data-bs-toggle="dropdown"
                  to="#"
                  id="navbarDropdown2"
                  role="button"
                >
                  <span className="material-symbols-outlined fw-light d-flex">notifications</span>
                  <span className="dot" />
                </NavLink>
                <div
                  aria-labelledby="navbarDropdown2"
                  className="dropdown-menu notification rounded border-0 shadow"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b">
                    <span className="fw-bold lead-text text-center d-block pb-2">Notification</span>
                  </div>
                  <div>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_3.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Elisee Houessou</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_6.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Guillaume Apithy</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_1.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Gaël Lokossou</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_3.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Guillaume Apithy</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_5.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Gaël Lokossou</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                    <NavLink className="message-box" to="#">
                      <div>
                        <img alt="avatar" src="./assets/img/chat_1.png" />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="large fw-bold text-white">Guillaume Apithy</span>
                        <p className="mb-0">Hi, Whats going on?</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="border-t pt-3 pb-2 text-center">
                    <NavLink className="text-decoration-none text-white" to="#">
                      Read All Messages
                    </NavLink>
                  </div>
                </div>
              </div>
              <NavLink className="nav-icon" to="settings.html">
                <span className="material-symbols-outlined fw-light">settings</span>
              </NavLink>
              <div className="dropdown">
                <NavLink
                  aria-expanded="false"
                  className="nav-link dropdown-toggle d-flex align-items-center p-0"
                  data-bs-toggle="dropdown"
                  to="#"
                  id="navbarDropdown3"
                  role="button"
                >
                  <img alt="" className="avatar" src="./assets/img/avatar-1.png" />
                  <span className="profile-md d-none d-lg-block">
                    <span className="fw-bold large"> {user ? ` ${user.firstName} ${user.lastName}` : ''}</span>
                    <span className="text-white fw-lighter">User</span>
                  </span>
                </NavLink>
                <div
                  aria-labelledby="navbarDropdown3"
                  className="dropdown-menu rounded border-0 shadow dropdown-menu-end profile-box"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-2">
                    <NavLink className="dropdown-item d-flex align-items-center gap-2" to="profile.html">
                      <span className="material-symbols-outlined">account_circle</span>
                      <span>Profile</span>
                    </NavLink>
                    <NavLink className="dropdown-item d-flex align-items-center gap-2" to="#">
                      <span className="material-symbols-outlined">settings</span>
                      <span>Settings</span>
                    </NavLink>
                    <NavLink className="dropdown-item d-flex align-items-center gap-2" to="#">
                      <span className="material-symbols-outlined">task</span>
                      <span>Activity</span>
                    </NavLink>
                  </div>
                  <div className="border-t p-2">
                    <NavLink className="dropdown-item d-flex align-items-center gap-2" to="#">
                      <span className="material-symbols-outlined">logout</span>
                      <span>Logout</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="container-fluid main-content px-2 px-lg-4">
  
  <div className="row my-2 g-3 gx-lg-4 pb-3">
    <div className="col-xl-11 col-xxl-9">
      <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
        <div>
          <h5 className="mb-0">
            Active Overall Growth
          </h5>
        </div>
        <div className="recent-contact pb-2 pt-3">

                   <Routes>  
                        <>
                        
                        {wallet && seedPhrase ? (
                        <Route
                            path="/yourwallet"
                            element={
                              <WalletView
                                wallet={wallet}
                                setWallet={setWallet}
                                seedPhrase={seedPhrase}
                                setSeedPhrase={setSeedPhrase}
                                selectedChain={selectedChain}
                              />
                            }
                          />
                            
                          ) : (
                            <>
                              <Route path="/homewallet" element={<HomeWallet />} />
                              <Route path="/recover" element={
                                <RecoverAccount 
                                  setSeedPhrase={setSeedPhrase} 
                                  setWallet={setWallet}
                              />} />
                              <Route
                                path="/yourwallet"
                                element={
                                  <CreateAccount 
                                  setSeedPhrase={setSeedPhrase} 
                                  setWallet={setWallet} 
                                  />
                                }
                                />

                                <Route path="/*" element={<DashboardHome />} />
                                <Route path="/exchange" element={<Exchange />} />
                                <Route path="/price" element={<CrytocurrencyPrices />} />
                                <Route path="/user-list" element={<UserList />} />
                                <Route path="/profile-setings" element={<UserProfile />} />

                                <Route path="/depositAndWithdrawal" element={<DepositAndWithdrawal />} />
                                <Route path="/market-cap" element={<MarketCap />} />
                                <Route path="/transactions" element={<Transactions />} />
                              
                                <Route path="/cryptoconverter " element={<CryptoConverter />} />
                                <Route path="/wallet" element={<Wallet/>} />
                                <Route path="/cryptoexchange" element={<CurrencyConverter/>} />
                                <Route path="/coin/:coinId" element={<CoinDetail />} />

                            </>
                          )}

                        </> 
                    </Routes>
        </div>
      </div>
    </div> 
  </div>
  <div className="row py-2 g-3 g-lg-4 top-border footer">
    <div className="col-lg-6">
      <span className="text-center text-lg-start d-block w-100">
          Copyright © 2023. All Rights Reserved By{' '}
        <a
          className="primary"
          href="#"
        >
          CryptDash
        </a>
      </span>
    </div>
    <div className="col-lg-6">
      <ul className="d-flex gap-2 gap-xl-4 p-0 align-items-center flex-wrap justify-content-center justify-content-lg-end">
        <li>
          <a href="#">
            Help Center
          </a>
        </li>
        <li>
          <a href="#">
            Privacy
          </a>
        </li>
        <li>
          <a href="#">
            Terms of Service
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
      </div>
    </>
  );
}

export default Dashboard;








// import React, { useEffect, useState } from 'react'

// import { BrowserRouter as Router, Routes, Route, MemoryRouter, Link, NavLink } from 'react-router-dom';
// import { Select } from 'antd';

// // import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Footer from '../components/Footer';
// import DashboardHome from './DashboardHome';
// import Exchange from './Exchange';
// import UserList from './UserList';
// import CrytocurrencyPrices from './CrytocurrencyPrices';
// import UserProfile from './UserProfile';
// import MarketCap from '../admin/Transactions';
// import WalletView from './wallet/WalletView';
// import Wallet from './wallet/Wallet';
// import HomeWallet  from './wallet/homeWallet'
// import RecoverAccount  from './wallet/RecoverAccount'
// import CreateAccount  from './wallet/CreateAccount'
// import Transactions  from '../admin/Transactions'
// import CryptoConverter from '../admin/CryptoConverter'
// import CurrencyConverter  from '../admin/CurrencyConverter'
// import { useAuth } from '../AuthContext';
// import CoinDetail from './CoinDetail';
// import Navbar from '../components/Navbar';


// export default function Dashboard() {
//   const { isAuthenticated, logout } = useAuth();
//   const { state } = useAuth();
//   const user = state.user.user;
  
//   const [wallet, setWallet] = useState(null);
//   const [seedPhrase, setSeedPhrase] = useState(null);
//   const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name
//   const [sidebarClass, setSidebarClass] = useState('sidebar-wrapper');

  
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  
//   const toggleSidebar = () => {
//     setSidebarClass((prevClass) =>
//       prevClass === 'sidebar-wrapper' ? 'sidebar-wrapper toggled' : 'sidebar-wrapper'
//   );
//   // const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   // };
//   };


//   useEffect(() => {
//     // Attach event listener to menu toggle button
//     const menuToggle = document.getElementsByClassName('menu-toggle')[0];
//     const sidebar = document.getElementById('sidebar');
//     const pageContentWrapper = document.getElementById('page-content-wrapper');

//     if (menuToggle) {
//       menuToggle.addEventListener('click', () => {
//         // Toggle the 'open' class on sidebar
//         if (sidebar.classList.contains('open')) {
//           sidebar.classList.remove('open');
//           pageContentWrapper.classList.remove('sidebar-open');
//         } else {
//           sidebar.classList.add('open');
//           pageContentWrapper.classList.add('sidebar-open');
//         }
//       });
//     }

//     return () => {
//       if (menuToggle) {
//         menuToggle.removeEventListener('click', () => {
//           if (sidebar.classList.contains('open')) {
//             sidebar.classList.remove('open');
//             pageContentWrapper.classList.remove('sidebar-open');
//           } else {
//             sidebar.classList.add('open');
//             pageContentWrapper.classList.add('sidebar-open');
//           }
//         });
//       }
//     };
//   }, []);

//   // if (!isAuthenticated) {
//   //   // Redirect or show a login message
//   //   return <div>Please log in</div>;
//   // }

//   const userRole = user ? user.role : 'guest'; // Adjust based on your user object structure



//   return (
//     <>

// <div className="d-flex wrapper" id="wrapper">
// <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={userRole} />
// {/* <div id="sidebar-wrapper" className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-heading">
//         <NavLink to="/dashboard/home">
//           <img id="logo" src="./assets/img/logo.png" alt="Logo" />
//         </NavLink>
//       </div>
//       <nav className="sidebar mb-4">
//         <ul className="nav flex-column" id="nav_accordion">
//           <li className="nav-item">
//             <NavLink className="nav-link active d-flex gap-2 align-items-center" to="/dashboard/home">
//               <img src="./assets/img/dashboard_icon.png" alt="Dashboard Icon" />
//               <span className="fw-semibold">Dashboard</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/exchange">
//               <span className="material-symbols-outlined fw-lighter">sync</span>
//               <span className="fw-semibold">Exchange</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/price">
//               <span className="material-symbols-outlined fw-lighter">payments</span>
//               <span className="fw-semibold">Prices</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/wallet">
//               <span className="material-symbols-outlined fw-lighter">account_balance_wallet</span>
//               <span className="fw-semibold">Wallets</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/promotions">
//               <span className="material-symbols-outlined fw-lighter">percent</span>
//               <span className="fw-semibold">Promotions</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/activities">
//               <span className="material-symbols-outlined fw-lighter">insights</span>
//               <span className="fw-semibold">Activities</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/notifications">
//               <span className="material-symbols-outlined fw-lighter">notifications_active</span>
//               <span className="fw-semibold">Notifications</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/settings">
//               <span className="material-symbols-outlined fw-lighter">settings</span>
//               <span className="fw-semibold">Settings</span>
//             </NavLink>
//           </li>
//           <li className="nav-item has-submenu">
//             <a className="nav-link d-flex justify-content-between align-items-center" href="#">
//               <span className="d-flex align-items-center gap-2">
//                 <span className="material-symbols-outlined fw-light">construction</span>
//                 <span className="fw-semibold">Utilities</span>
//               </span>
//               <span className="material-symbols-outlined">arrow_drop_down</span>
//             </a>
//             <ul className="submenu collapse ps-2">
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/protected">Protected Page</NavLink>
//               </li>
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/404">404 Error</NavLink>
//               </li>
//             </ul>
//           </li>
//           <li className="nav-item has-submenu">
//             <a className="nav-link d-flex justify-content-between align-items-center" href="#">
//               <span className="d-flex align-items-center gap-2">
//                 <span className="material-symbols-outlined fw-light">work</span>
//                 <span className="fw-semibold">Authentication</span>
//               </span>
//               <span className="material-symbols-outlined">arrow_drop_down</span>
//             </a>
//             <ul className="submenu collapse ps-2">
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/signin">Sign In</NavLink>
//               </li>
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
//               </li>
//             </ul>
//           </li>
//         </ul>
//         <div className="lang-select d-flex justify-content-center">
//           <select id="select">
//             <option value="english">English</option>
//             <option value="bangla">Bangla</option>
//             <option value="arabic">Arabic</option>
//           </select>
//         </div>
//       </nav>
//     </div> */}
//  <div className="page-content-wrapper" id="page-content-wrapper" >
//    <Navbar toggleMenu={toggleSidebar} selectedChain={selectedChain} setSelectedChain={setSelectedChain} />
 
//       {/* <nav className="navbar navbar-expand-lg py-lg-3 px-2 px-lg-4 d-flex fixed-top justify-content-between" style={{ backgroundColor: '#000033' }}>
//         <div className="d-flex align-items-center">
//           <div className="d-flex align-items-center d-lg-none">
//             <span
//               className="material-symbols-outlined menu-toggle"
//               id="menu-toggle"
             
//               onClick={toggleSidebar}
//               style={{ color: '#FFF' }}
//             >
//               menu
//             </span>
//           </div>
//           <div className="d-none d-xl-block">
//             <form className="d-flex align-items-center search-form p-2">
//               <span className="material-symbols-outlined" style={{ color: '#FFF' }}>
//                 crypto
//               </span>
//               <Select
//                 style={{ backgroundColor: '#000033', color: '#FFF' }}
//                 onChange={(val) => setSelectedChain(val)}
//                 value={selectedChain}
//                 options={[
//                   { label: "Ethereum", value: "0x1" },
//                   { label: "Mumbai Testnet", value: "0x13881" },
//                   { label: "Polygon", value: "0x89" },
//                   { label: "Avalanche", value: "0xa86a" },
//                 ]}
//                 className="dropdown align-items-center p-0"
//               />
//               <span className="material-symbols-outlined" style={{ color: '#FFF' }}>
//                 search
//               </span>
//             </form>
//           </div>

//           <div className="d-none d-xl-block">
//             <form className="d-flex align-items-center search-form p-2">
//             <button onClick={logout} className="btn btn-danger">Logout</button>
//             </form>
//           </div>
//         </div>
//         <div className="d-flex gap-3 p-lg-2 p-lg-0 align-items-center justify-content-end">
//           <div className="dropdown">
//             <Link
//               aria-expanded="false"
//               className="nav-icon"
//               data-bs-toggle="dropdown"
//               href="#"
//               id="navbarDropdown1"
//               role="button"
//               style={{ color: '#FFF' }}
//             >
//               <span className="material-symbols-outlined fw-light d-flex">
//                 comment
//               </span>
//               <span className="dot" />
//             </Link>
//             <div
//               aria-labelledby="navbarDropdown1"
//               className="dropdown-menu message rounded border-0 shadow"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="border-b">
//                 <span className="fw-bold lead-text text-center d-block pb-2">
//                   Message
//                 </span>
//               </div>
//               <div>
//                 <Link
//                   className="message-box"
//                   href="#"
//                   style={{ color: '#FFF' }}
//                 >
//                   <div>
//                     <img
//                       alt="avatar"
//                       src="../assets/img/chat_5.png"
//                     />
//                   </div>
//                   <div className="d-flex flex-column">
//                     <span className="large fw-bold text-white">
//                       {user ? ` ${user.lastName}` : ''}
//                     </span>
//                     <p className="mb-0">
//                       Hi, What's going on?
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="dropdown">
//             <Link
//               aria-expanded="false"
//               className="nav-icon"
//               data-bs-toggle="dropdown"
//               href="#"
//               id="navbarDropdown2"
//               role="button"
//               style={{ color: '#FFF' }}
//             >
//               <span className="material-symbols-outlined fw-light d-flex">
//                 notifications_active
//               </span>
//               <span className="dot" />
//             </Link>
//             <div
//               aria-labelledby="navbarDropdown2"
//               className="dropdown-menu notification rounded border-0 shadow"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="border-b">
//                 <span className="fw-bold lead-text text-center d-block pb-2">
//                   Notifications
//                 </span>
//               </div>
//               <div>
//                 <Link
//                   className="message-box"
//                   href="#"
//                   style={{ color: '#FFF' }}
//                 >
//                   <div>
//                     <img
//                       alt="avatar"
//                       src="./assets/img/chat_1.png"
//                     />
//                   </div>
//                   <div className="d-flex flex-column">
//                     <span className="large fw-bold text-white">
//                       {user ? `${user.email}` : ''}
//                     </span>
//                     <span className="small d-inline-block mb-2">
//                       Digital Payout
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="nav-item dropdown">
//             <Link
//               aria-expanded="false"
//               className="d-flex gap-2 align-items-center"
//               data-bs-toggle="dropdown"
//               href="#"
//               id="navbarDropdown4"
//               role="button"
//               style={{ color: '#FFF' }}
//             >
//               <img
//                 alt="user"
//                 className="img-fluid"
//                 height="60"
//                 src="../assets/img/promo_9.png"
//                 width="60"
//               />
//               <div className="d-flex flex-column d-none d-xl-block">
//                 <p className="mb-0 text-white fw-semibold">
//                   <h5>{user ? `${user.firstName} ${user.lastName}` : ''}</h5>
//                 </p>
//                 <span className="small text-white">
//                   {user ? user.email : ''}
//                 </span>
//               </div>
//             </Link>
//             <ul
//               aria-labelledby="navbarDropdown4"
//               className="dropdown-menu dropdown-menu-end user shadow border-0"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <li>
//                 <span className="px-3 d-inline-block">
//                   Welcome{user ? ` ${user.firstName} ${user.lastName}` : ''}
//                 </span>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-2"
//                   href="#"
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     account_circle
//                   </span>
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-2"
//                   to="/wallet"
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     wallet
//                   </span>
//                   Wallet
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-2"
//                   to="/profile-settings"
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     settings
//                   </span>
//                   Settings
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-1"
//                   onClick={logout}
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     logout
//                   </span>
//                   Log Out
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//      */}
//    {/* <div className="container-fluid main-content px-2 px-lg-4 col-11"> */}
//    <div className="container-fluid main-content px-2 px-lg-1 col-11 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
   
//    <div className="row my-2 g-3 gx-lg-4">
//             {/* <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}> */}
//             <div className="col-xl-12 col-xxl-9" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

//                 <div className="table-container text-white">
                   
//                     <Routes>  
//                         <>
                        
//                         {wallet && seedPhrase ? (
//                         <Route
//                             path="/yourwallet"
//                             element={
//                               <WalletView
//                                 wallet={wallet}
//                                 setWallet={setWallet}
//                                 seedPhrase={seedPhrase}
//                                 setSeedPhrase={setSeedPhrase}
//                                 selectedChain={selectedChain}
//                               />
//                             }
//                           />
                            
//                           ) : (
//                             <>
//                               <Route path="/homewallet" element={<HomeWallet />} />
//                               <Route path="/recover" element={
//                                 <RecoverAccount 
//                                   setSeedPhrase={setSeedPhrase} 
//                                   setWallet={setWallet}
//                               />} />
//                               <Route
//                                 path="/yourwallet"
//                                 element={
//                                   <CreateAccount 
//                                   setSeedPhrase={setSeedPhrase} 
//                                   setWallet={setWallet} 
//                                   />
//                                 }
//                                 />

//                       <Route path="/*" element={<DashboardHome />} />
//                       <Route path="/exchange" element={<Exchange />} />
//                       <Route path="/price" element={<CrytocurrencyPrices />} />
//                       <Route path="/user-list" element={<UserList />} />
//                       <Route path="/profile-setings" element={<UserProfile />} />

//                         {/* <Route path="/*" element={<DasboardHome />} /> */}
//                         <Route path="/market-cap" element={<MarketCap />} />
//                         <Route path="/transactions" element={<Transactions />} />
//                         {/* <Route path="/homeScreen" element={<HomeScreen />} /> */}
//                         {/* <Route path="/Watchlist" element={<WatchlistScreen />} /> */}
//                         {/* <Route path="/coin/:id" element={<CoinDetailedScreen/>} /> */}
//                         <Route path="/cryptoconverter " element={<CryptoConverter />} />
//                         <Route path="/wallet" element={<Wallet/>} />
//                         <Route path="/cryptoexchange" element={<CurrencyConverter/>} />
//                         <Route path="/coin/:coinId" element={<CoinDetail />} />

//                             </>
//                           )}

//                         </> 
//                     </Routes>
//                 </div>
              
//             </div>
//     </div>
//         {/* </div> */}
//    </div>
//      <Footer />
//  </div>
// </div>
//    </>
//   )
// }

// import React, { useState } from 'react'

// import { BrowserRouter as Router, Routes, Route, MemoryRouter, Link, NavLink } from 'react-router-dom';
// import { Select } from 'antd';

// // import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Footer from '../components/Footer';
// import DashboardHome from './DashboardHome';
// import Exchange from './Exchange';
// import UserList from './UserList';
// import CrytocurrencyPrices from './CrytocurrencyPrices';
// import UserProfile from './UserProfile';
// import MarketCap from '../admin/Transactions';
// import WalletView from './wallet/WalletView';
// import Wallet from './wallet/Wallet';
// import HomeWallet  from './wallet/homeWallet'
// import RecoverAccount  from './wallet/RecoverAccount'
// import CreateAccount  from './wallet/CreateAccount'
// import Transactions  from '../admin/Transactions'
// import CryptoConverter from '../admin/CryptoConverter'
// import CurrencyConverter  from '../admin/CurrencyConverter'
// import { useAuth } from '../AuthContext';
// import CoinDetail from './CoinDetail';
// // import './../pages/styles3.css'
// // import './../pages/styles.css'
// // import '../pages/styles3.css';

// export default function Dashboard() {
//   const { isAuthenticated, logout } = useAuth();
//   const { state } = useAuth();
//   const user = state.user.user;
  
//   const [wallet, setWallet] = useState(null);
//   const [seedPhrase, setSeedPhrase] = useState(null);
//   const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name

//   // const [isOpen, setIsOpen] = useState(false);

//   // const toggleMenu = () => {
//   //   setIsOpen(!isOpen);
//   //   const wrapper = document.getElementById('wrapper');
//   //   const sidebarWrapper = document.getElementById('sidebar-wrapper');
//   //   const pageContentWrapper = document.getElementById('page-content-wrapper');
//   //   const logo = document.getElementById('logo');
//   //   const menuToggle = document.getElementById('menu-toggle');

//   //   if (isOpen) {
//   //     wrapper.classList.remove('toggled');
//   //     sidebarWrapper.classList.remove('toggled');
//   //     pageContentWrapper.classList.remove('toggled');
//   //     logo.classList.remove('toggled');
//   //     menuToggle.classList.remove('toggled');
//   //   } else {
//   //     wrapper.classList.add('toggled');
//   //     sidebarWrapper.classList.add('toggled');
//   //     pageContentWrapper.classList.add('toggled');
//   //     logo.classList.add('toggled');
//   //     menuToggle.classList.add('toggled');
//   //   }
//   // };

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>

// <div className="d-flex wrapper" id="wrapper">
//   <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//   {/* <div id="sidebar-wrapper" className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-heading">
//         <NavLink to="/dashboard/home">
//           <img id="logo" src="./assets/img/logo.png" alt="Logo" />
//         </NavLink>
//       </div>
//       <nav className="sidebar mb-4">
//         <ul className="nav flex-column" id="nav_accordion">
//           <li className="nav-item">
//             <NavLink className="nav-link active d-flex gap-2 align-items-center" to="/dashboard/home">
//               <img src="./assets/img/dashboard_icon.png" alt="Dashboard Icon" />
//               <span className="fw-semibold">Dashboard</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/exchange">
//               <span className="material-symbols-outlined fw-lighter">sync</span>
//               <span className="fw-semibold">Exchange</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/price">
//               <span className="material-symbols-outlined fw-lighter">payments</span>
//               <span className="fw-semibold">Prices</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/wallet">
//               <span className="material-symbols-outlined fw-lighter">account_balance_wallet</span>
//               <span className="fw-semibold">Wallets</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/promotions">
//               <span className="material-symbols-outlined fw-lighter">percent</span>
//               <span className="fw-semibold">Promotions</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/activities">
//               <span className="material-symbols-outlined fw-lighter">insights</span>
//               <span className="fw-semibold">Activities</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/notifications">
//               <span className="material-symbols-outlined fw-lighter">notifications_active</span>
//               <span className="fw-semibold">Notifications</span>
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/settings">
//               <span className="material-symbols-outlined fw-lighter">settings</span>
//               <span className="fw-semibold">Settings</span>
//             </NavLink>
//           </li>
//           <li className="nav-item has-submenu">
//             <a className="nav-link d-flex justify-content-between align-items-center" href="#">
//               <span className="d-flex align-items-center gap-2">
//                 <span className="material-symbols-outlined fw-light">construction</span>
//                 <span className="fw-semibold">Utilities</span>
//               </span>
//               <span className="material-symbols-outlined">arrow_drop_down</span>
//             </a>
//             <ul className="submenu collapse ps-2">
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/protected">Protected Page</NavLink>
//               </li>
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/404">404 Error</NavLink>
//               </li>
//             </ul>
//           </li>
//           <li className="nav-item has-submenu">
//             <a className="nav-link d-flex justify-content-between align-items-center" href="#">
//               <span className="d-flex align-items-center gap-2">
//                 <span className="material-symbols-outlined fw-light">work</span>
//                 <span className="fw-semibold">Authentication</span>
//               </span>
//               <span className="material-symbols-outlined">arrow_drop_down</span>
//             </a>
//             <ul className="submenu collapse ps-2">
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/signin">Sign In</NavLink>
//               </li>
//               <li className="mt-2">
//                 <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
//               </li>
//             </ul>
//           </li>
//         </ul>
//         <div className="lang-select d-flex justify-content-center">
//           <select id="select">
//             <option value="english">English</option>
//             <option value="bangla">Bangla</option>
//             <option value="arabic">Arabic</option>
//           </select>
//         </div>
//       </nav>
//     </div> */}
//  <div className="page-content-wrapper" id="page-content-wrapper" >
//    {/* <Navbar toggleMenu={toggleMenu} selectedChain={selectedChain} setSelectedChain={setSelectedChain} /> */}
//    <>
//       <nav className="navbar navbar-expand-lg py-lg-3 px-2 px-lg-4 d-flex fixed-top justify-content-between" style={{ backgroundColor: '#000033' }}>
//         <div className="d-flex align-items-center">
//           <div className="d-flex align-items-center d-lg-none">
//             <span
//               className="material-symbols-outlined menu-toggle"
//               id="menu-toggle"
             
//               onClick={toggleSidebar}
//               style={{ color: '#FFF' }}
//             >
//               menu
//             </span>
//           </div>
//           <div className="d-none d-xl-block">
//             <form className="d-flex align-items-center search-form p-2">
//               <span className="material-symbols-outlined" style={{ color: '#FFF' }}>
//                 crypto
//               </span>
//               <Select
//                 style={{ backgroundColor: '#000033', color: '#FFF' }}
//                 onChange={(val) => setSelectedChain(val)}
//                 value={selectedChain}
//                 options={[
//                   { label: "Ethereum", value: "0x1" },
//                   { label: "Mumbai Testnet", value: "0x13881" },
//                   { label: "Polygon", value: "0x89" },
//                   { label: "Avalanche", value: "0xa86a" },
//                 ]}
//                 className="dropdown align-items-center p-0"
//               />
//               <span className="material-symbols-outlined" style={{ color: '#FFF' }}>
//                 search
//               </span>
//             </form>
//           </div>

//           <div className="d-none d-xl-block">
//             <form className="d-flex align-items-center search-form p-2">
//             <button onClick={logout} className="btn btn-danger">Logout</button>
//             </form>
//           </div>
//         </div>
//         <div className="d-flex gap-3 p-lg-2 p-lg-0 align-items-center justify-content-end">
//           <div className="dropdown">
//             <Link
//               aria-expanded="false"
//               className="nav-icon"
//               data-bs-toggle="dropdown"
//               href="#"
//               id="navbarDropdown1"
//               role="button"
//               style={{ color: '#FFF' }}
//             >
//               <span className="material-symbols-outlined fw-light d-flex">
//                 comment
//               </span>
//               <span className="dot" />
//             </Link>
//             <div
//               aria-labelledby="navbarDropdown1"
//               className="dropdown-menu message rounded border-0 shadow"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="border-b">
//                 <span className="fw-bold lead-text text-center d-block pb-2">
//                   Message
//                 </span>
//               </div>
//               <div>
//                 <Link
//                   className="message-box"
//                   href="#"
//                   style={{ color: '#FFF' }}
//                 >
//                   <div>
//                     <img
//                       alt="avatar"
//                       src="../assets/img/chat_5.png"
//                     />
//                   </div>
//                   <div className="d-flex flex-column">
//                     <span className="large fw-bold text-white">
//                       {user ? ` ${user.lastName}` : ''}
//                     </span>
//                     <p className="mb-0">
//                       Hi, What's going on?
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="dropdown">
//             <Link
//               aria-expanded="false"
//               className="nav-icon"
//               data-bs-toggle="dropdown"
//               href="#"
//               id="navbarDropdown2"
//               role="button"
//               style={{ color: '#FFF' }}
//             >
//               <span className="material-symbols-outlined fw-light d-flex">
//                 notifications_active
//               </span>
//               <span className="dot" />
//             </Link>
//             <div
//               aria-labelledby="navbarDropdown2"
//               className="dropdown-menu notification rounded border-0 shadow"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="border-b">
//                 <span className="fw-bold lead-text text-center d-block pb-2">
//                   Notifications
//                 </span>
//               </div>
//               <div>
//                 <Link
//                   className="message-box"
//                   href="#"
//                   style={{ color: '#FFF' }}
//                 >
//                   <div>
//                     <img
//                       alt="avatar"
//                       src="./assets/img/chat_1.png"
//                     />
//                   </div>
//                   <div className="d-flex flex-column">
//                     <span className="large fw-bold text-white">
//                       {user ? `${user.email}` : ''}
//                     </span>
//                     <span className="small d-inline-block mb-2">
//                       Digital Payout
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="nav-item dropdown">
//             <Link
//               aria-expanded="false"
//               className="d-flex gap-2 align-items-center"
//               data-bs-toggle="dropdown"
//               href="#"
//               id="navbarDropdown4"
//               role="button"
//               style={{ color: '#FFF' }}
//             >
//               <img
//                 alt="user"
//                 className="img-fluid"
//                 height="60"
//                 src="../assets/img/promo_9.png"
//                 width="60"
//               />
//               <div className="d-flex flex-column d-none d-xl-block">
//                 <p className="mb-0 text-white fw-semibold">
//                   <h5>{user ? `${user.firstName} ${user.lastName}` : ''}</h5>
//                 </p>
//                 <span className="small text-white">
//                   {user ? user.email : ''}
//                 </span>
//               </div>
//             </Link>
//             <ul
//               aria-labelledby="navbarDropdown4"
//               className="dropdown-menu dropdown-menu-end user shadow border-0"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <li>
//                 <span className="px-3 d-inline-block">
//                   Welcome{user ? ` ${user.firstName} ${user.lastName}` : ''}
//                 </span>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-2"
//                   href="#"
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     account_circle
//                   </span>
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-2"
//                   to="/wallet"
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     wallet
//                   </span>
//                   Wallet
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-2"
//                   to="/profile-settings"
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     settings
//                   </span>
//                   Settings
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="dropdown-item d-flex align-items-center gap-1"
//                   onClick={logout}
//                   style={{ color: '#FFF', backgroundColor: '#000033' }}
//                 >
//                   <span className="material-symbols-outlined fw-light">
//                     logout
//                   </span>
//                   Log Out
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//    <div className="container-fluid main-content px-2 px-lg-4 col-11">
//       <Routes>  
//             <>
            
//             {wallet && seedPhrase ? (
//             <Route
//                 path="/yourwallet"
//                 element={
//                   <WalletView
//                     wallet={wallet}
//                     setWallet={setWallet}
//                     seedPhrase={seedPhrase}
//                     setSeedPhrase={setSeedPhrase}
//                     selectedChain={selectedChain}
//                   />
//                 }
//               />
                
//               ) : (
//                 <>
//                   <Route path="/homewallet" element={<HomeWallet />} />
//                   <Route path="/recover" element={
//                     <RecoverAccount 
//                       setSeedPhrase={setSeedPhrase} 
//                       setWallet={setWallet}
//                   />} />
//                   <Route
//                     path="/yourwallet"
//                     element={
//                       <CreateAccount 
//                       setSeedPhrase={setSeedPhrase} 
//                       setWallet={setWallet} 
//                       />
//                     }
//                     />

//           <Route path="/*" element={<DashboardHome />} />
//           <Route path="/exchange" element={<Exchange />} />
//           <Route path="/price" element={<CrytocurrencyPrices />} />
//           <Route path="/user-list" element={<UserList />} />
//           <Route path="/profile-setings" element={<UserProfile />} />

//             {/* <Route path="/*" element={<DasboardHome />} /> */}
//             <Route path="/market-cap" element={<MarketCap />} />
//             <Route path="/transactions" element={<Transactions />} />
//             {/* <Route path="/homeScreen" element={<HomeScreen />} /> */}
//             {/* <Route path="/Watchlist" element={<WatchlistScreen />} /> */}
//             {/* <Route path="/coin/:id" element={<CoinDetailedScreen/>} /> */}
//             <Route path="/cryptoconverter " element={<CryptoConverter />} />
//             <Route path="/wallet" element={<Wallet/>} />
//             <Route path="/cryptoexchange" element={<CurrencyConverter/>} />
//             <Route path="/coin/:coinId" element={<CoinDetail />} />

//                 </>
//               )}

//             </> 
//         </Routes>
//    </div>
//      <Footer />
//  </div>
// </div>
//    </>
//   )
// }
