
import React, { useState } from 'react';
import './Dashboard.css';
import './wallet/wallet.css';
import { FaWallet, FaCalendarAlt, FaBitcoin, FaEthereum, FaExchangeAlt, FaLock, FaUnlockAlt, FaUserShield } from 'react-icons/fa';
import { BsArrowDownCircle } from 'react-icons/bs';
import { BrowserRouter as Router, Routes, Route, MemoryRouter, Link, NavLink, Outlet } from 'react-router-dom';
import DashboardHome from './admin/DashboardHome';
import Exchange from './admin/Exchange';
import UserList from './admin/UserList';
import UserProfile from './UserProfile';
import MarketCap from './admin/MarketCap';
import CryptoConverter from './admin/CryptoConverter';
import Wallet from './admin/wallet/Wallet';
import CoinDetail from './CoinDetail';
import CurrencyConverter from './admin/CurrencyConverter';
import Transactions from './Transactions';
import CrytocurrencyPrices from './CrytocurrencyPrices';
import CreateAccount from './admin/wallet/CreateAccount';
import RecoverAccount from './admin/wallet//RecoverAccount';
import HomeWallet from './admin/wallet/homeWallet';
import WalletView from './admin/wallet/WalletView';
import { Button } from 'react-bootstrap';
import WalletCard from './components/WalletCard';
import TransactionApprovalAdmin from './TransactionApprovalAdmin';
import TestimonialList from './TestimonialList';
import DepositsList from './DepositsList';
import DashboardDepositSubscription from './components/DepositSubscriptionForm';
import CreateSubscriptionPlan from './components/CreateSubscriptionPlan';
import SubscriptionPlans from './components/SubscriptionPlans';
import DashboardHeader from './components/DashboardHeader';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import UnApprovedDepositsList from './unApprovedDepositsList';
import UserDashboardHome from './UserDashboardHome';
import UserWalletHome from './UserWalletHome';
import ManagePostDeposits from './ManagePostDeposits';
import ManageBlog from './ManageBlog';
import ManagePayout from './ManagePayout';
import InvestorPayoutHistory from './InvestorPayoutHistory';
import ManageTestimonial from './ManageTestimonial';


function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name

    const [style, setStyle] = useState("navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion")
        }
    };

    
  const btcOptions = ["Bitcoin", "Ethereum", "Ripple"];

  // const transactions = [
  //   {
  //     date: "Jul 21, 2023",
  //     transactionId: "TXN123456",
  //     description: "Purchased Bitcoin",
  //     amount: "0.05 BTC",
  //     status: "Completed",
  //   },
  //   // More transactions
  // ];



  const transactions = [
    {
      transactionId: 'TXN001',
      date: '2024-08-10',
      type: 'deposit',
      amount: 500.00,
      status: 'Completed',
      investmentPlan: 'Basic Plan',
      dueDate: '2024-09-10',
      details: 'Deposit to wallet for Basic Plan',
    },
    {
      transactionId: 'TXN002',
      date: '2024-08-12',
      type: 'withdrawal',
      amount: 200.00,
      status: 'Pending',
      investmentPlan: null,
      dueDate: null,
      details: 'Withdrawal from wallet',
    },
    {
      transactionId: 'TXN003',
      date: '2024-08-15',
      type: 'investment',
      amount: 750.00,
      status: 'Completed',
      investmentPlan: 'Advanced Plan',
      dueDate: '2024-09-15',
      details: 'Investment in Bitcoin under Advanced Plan',
    },
    {
      transactionId: 'TXN004',
      date: '2024-08-18',
      type: 'deposit',
      amount: 1000.00,
      status: 'Completed',
      investmentPlan: 'Premium Plan',
      dueDate: '2024-09-18',
      details: 'Deposit to wallet for Premium Plan',
    },
    {
      transactionId: 'TXN005',
      date: '2024-08-20',
      type: 'investment',
      amount: 400.00,
      status: 'Completed',
      investmentPlan: 'Standard Plan',
      dueDate: '2024-09-20',
      details: 'Investment in Ethereum under Standard Plan',
    },
    {
      transactionId: 'TXN006',
      date: '2024-08-22',
      type: 'withdrawal',
      amount: 300.00,
      status: 'Completed',
      investmentPlan: null,
      dueDate: null,
      details: 'Withdrawal from wallet',
    },
  ];

  const pendingTransactions = [
    {
      transactionId: 'TXN007',
      date: '2024-08-25',
      type: 'deposit',
      amount: 800.00,
      status: 'Pending',
      investmentPlan: 'Premium Plan',
      dueDate: '2024-09-25',
      details: 'Pending deposit for Premium Plan',
    },
    {
      transactionId: 'TXN008',
      date: '2024-08-27',
      type: 'withdrawal',
      amount: 300.00,
      status: 'Pending',
      investmentPlan: null,
      dueDate: null,
      details: 'Pending withdrawal from wallet',
    },
  ];
  

  const initialTransactions = [
    {
      transactionId: 'TXN001',
      date: '2024-08-23',
      type: 'deposit',
      amount: 1200.00,
      status: 'Pending',
      investmentPlan: 'Basic Plan',
      dueDate: '2024-09-23',
      details: 'Deposit for Basic Plan',
    },
    {
      transactionId: 'TXN002',
      date: '2024-08-24',
      type: 'withdrawal',
      amount: 500.00,
      status: 'Pending',
      investmentPlan: null,
      dueDate: null,
      details: 'Withdrawal from wallet',
    },
  ];
  

  // const initialTestimonials = [
  //   {
  //     id: 1,
  //     author: 'John Doe',
  //     message: 'This service is fantastic! I am very satisfied.',
  //     amount: 1000.00,
  //     date: '2024-08-23',
  //     status: 'Pending',
  //   },
  //   {
  //     id: 2,
  //     author: 'Jane Smith',
  //     message: 'Great experience, highly recommend.',
  //     amount: 500.00,
  //     date: '2024-08-22',
  //     status: 'Pending',
  //   },
  //   {
  //     id: 3,
  //     author: 'Samuel Green',
  //     message: 'Good service, but room for improvement.',
  //     amount: 750.00,
  //     date: '2024-08-21',
  //     status: 'Approved',
  //   },
  // ];
  
  
  // const deposits = [
  //   { id: 1, name: 'Admond Sayhel', date: '2020-01-02', amount: 1000, currency: 'Bitcoin' },
  //   { id: 2, name: 'Jonshon', date: '2019-12-12', amount: 5000, currency: 'USD' },
  //   { id: 3, name: 'Hopper', date: '2019-12-22', amount: 4000, currency: 'Ripple' },
  //   { id: 4, name: 'Admond Sayhel', date: '2020-01-02', amount: 3000, currency: 'Bitcoin' },
  //   { id: 5, name: 'Anjel July', date: '2020-01-05', amount: 500, currency: 'USD' },
  //   { id: 6, name: 'Lagisha', date: '2020-01-12', amount: 5000, currency: 'Bitcoin' },
  // ];
  
  
  // const securitySettings = [
  //   {
  //     imgSrc: "", // Use icons instead
  //     title: "Security Pin",
  //     status: "Active",
  //     isChecked: true,
  //   },
  //   {
  //     imgSrc: "", // Use icons instead
  //     title: "2-step Verification",
  //     status: "Inactive",
  //     isChecked: false,
  //   },
  //   {
  //     imgSrc: "", // Use icons instead
  //     title: "Security Question",
  //     status: "Active",
  //     isChecked: true,
  //   },
  // ];




    return (
        <div>
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper" style={{backgroundColor:'#000033', color:'#fff'}}>

                    {/*  <!-- Sidebar --> */}
                    <Sidebar  style={ style} changeStyle={changeStyle} />
                    {/*  <!-- End of Sidebar --> */}

                    {/*  <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/*  <!-- Main Content --> */}
                        <div id="content">

                            {/*  <!-- Topbar --> */}
                           
                            <Topbar changeStyle1={changeStyle1} />
                            {/*  <!-- End of Topbar --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                              
                                <DashboardHeader />

                                {/*  <!-- Content Row --> */}
                                <div className="row">

                                  
                                <div className="col-xl-12 col-md-12 mb-4">
                                <div className="container-fluid px-2 px-lg-4">

<div className="row">
  
          {/* <WalletCard color="bg-primary"  /> */}
          <div className="mb-4"></div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>
                                 
                              </div>

                                </div>
                                </div>

                                {/*  <!-- Main Content Row --> */}
                                <div className="d-flex align-items-center justify-content-center min-vh-100">
                                <div className="row col-10">
                                 
                                <>
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
                             <Route path="/*" element={<Outlet />} />
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
                                <Route path="/home" element={<UserDashboardHome />} />
                                {/* <Route path="/home" element={<UserWalletHome />} /> */}
                                <Route path="/user-wallet" element={<UserWalletHome />} />
                                <Route path="/dashboard" element={<DashboardHome />} />
                                <Route path="/exchange" element={<Exchange />} />
                                <Route path="/price" element={<CrytocurrencyPrices />} />
                                <Route path="/user-list" element={<UserList />} />
                                <Route path="/profile-setings" element={<UserProfile />} />

                                <Route path="/market-cap" element={<MarketCap />} />
                                <Route path="/transactions" element={<Transactions />} />
                              
                                <Route path="/cryptoconverter " element={<CryptoConverter />} />
                                <Route path="/wallet" element={<Wallet/>} />
                                <Route path="/cryptoexchange" element={<CurrencyConverter/>} />
                                <Route path="/coin/:coinId" element={<CoinDetail />} />

                                <Route path="/unapproved-deposits-investors" element={<UnApprovedDepositsList />}/>
                                <Route path="/investors-wallet" element={ <UserWalletHome color="bg-primary"  />}/>
                                <Route path="/subscription-plan" element={<SubscriptionPlans color="bg-primary"/>}/>


                                <Route path="/transaction-admin-approval" element={<TransactionApprovalAdmin initialTransactions={initialTransactions} />}/>
                                {/* <Route path="/manage-testimonials-" element={<TestimonialList />}/> */}
                                <Route path="/manage-postDeposits" element={<ManagePostDeposits />}/>
                                <Route path="/manage-blogs" element={<ManageBlog />}/>
                                <Route path="/manage-payouts" element={<ManagePayout />}/>
                                <Route path="/manage-InvestorPayoutHistory" element={<InvestorPayoutHistory />}/>
                                <Route path="/manage-Testimonial" element={<ManageTestimonial />}/>
                                {/* <Route path="/testimonial" element={<TestimonialList initialTestimonials={initialTestimonials} />}/> */}
                                 {/* <Route path="/deposits-list" element={<DepositsList deposits={deposits} />}/> */}
                                <Route path="/DashboardDepositSubscription" element={<DashboardDepositSubscription />}/>
                                <Route path="/DashboardDepositSubscription" element={<DashboardDepositSubscription walletId={1} planId={1} />}/>
                                <Route path="/createSubscriptionPlan" element={<CreateSubscriptionPlan />}/>
                                <Route path="/transactions" element={<Transactions transactions={transactions} />}/>


                                {/* manage-subscriptionPlans manage-testimonials  manage-posts manage-payouts */}



                            </>
                          )}

                        </> 
                    </Routes>
                                </>
                                  
                                </div>
                                </div>

                              
                            </div>
                            {/*   <!-- /.container-fluid --> */}

                        </div>
                        {/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Digital 2025</span>
                                </div>
                            </div>
                        </footer>
                        {/* <!-- End of Footer --> */}

                    </div>
                    {/*  <!-- End of Content Wrapper --> */}

                </div>
                {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/*  <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        </div>
    )
}

export default Dashboard;




// // import React from 'react'

// // const Dashboard = () => {
// //   return (
// //     <div className="container-fluid position-relative d-flex p-0">
// //       {/* Spinner Start */}
// //       <div
// //         id="spinner"
// //         className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
// //       >
// //         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
// //           <span className="sr-only">Loading...</span>
// //         </div>
// //       </div>
// //       {/* Spinner End */}

// //       {/* Sidebar Start */}
// //       <div className="sidebar pe-4 pb-3">
// //         <nav className="navbar bg-secondary navbar-dark">
// //           <a href="index.html" className="navbar-brand mx-4 mb-3">
// //             <h3 className="text-primary">
// //               <i className="fa fa-user-edit me-2"></i>DarkPan
// //             </h3>
// //           </a>
// //           <div className="d-flex align-items-center ms-4 mb-4">
// //             <div className="position-relative">
// //               <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
// //               <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
// //             </div>
// //             <div className="ms-3">
// //               <h6 className="mb-0">Jhon Doe</h6>
// //               <span>Admin</span>
// //             </div>
// //           </div>
// //           <div className="navbar-nav w-100">
// //             <a href="index.html" className="nav-item nav-link">
// //               <i className="fa fa-tachometer-alt me-2"></i>Dashboard
// //             </a>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="fa fa-laptop me-2"></i>Elements
// //               </a>
// //               <div className="dropdown-menu bg-transparent border-0">
// //                 <a href="button.html" className="dropdown-item">
// //                   Buttons
// //                 </a>
// //                 <a href="typography.html" className="dropdown-item">
// //                   Typography
// //                 </a>
// //                 <a href="element.html" className="dropdown-item">
// //                   Other Elements
// //                 </a>
// //               </div>
// //             </div>
// //             <a href="widget.html" className="nav-item nav-link">
// //               <i className="fa fa-th me-2"></i>Widgets
// //             </a>
// //             <a href="form.html" className="nav-item nav-link">
// //               <i className="fa fa-keyboard me-2"></i>Forms
// //             </a>
// //             <a href="table.html" className="nav-item nav-link">
// //               <i className="fa fa-table me-2"></i>Tables
// //             </a>
// //             <a href="chart.html" className="nav-item nav-link">
// //               <i className="fa fa-chart-bar me-2"></i>Charts
// //             </a>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
// //                 <i className="far fa-file-alt me-2"></i>Pages
// //               </a>
// //               <div className="dropdown-menu bg-transparent border-0">
// //                 <a href="signin.html" className="dropdown-item">
// //                   Sign In
// //                 </a>
// //                 <a href="signup.html" className="dropdown-item">
// //                   Sign Up
// //                 </a>
// //                 <a href="404.html" className="dropdown-item">
// //                   404 Error
// //                 </a>
// //                 <a href="blank.html" className="dropdown-item active">
// //                   Blank Page
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //       {/* Sidebar End */}

// //       {/* Content Start */}
// //       <div className="content">
// //         {/* Navbar Start */}
// //         <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
// //           <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
// //             <h2 className="text-primary mb-0">
// //               <i className="fa fa-user-edit"></i>
// //             </h2>
// //           </a>
// //           <a href="#" className="sidebar-toggler flex-shrink-0">
// //             <i className="fa fa-bars"></i>
// //           </a>
// //           <form className="d-none d-md-flex ms-4">
// //             <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
// //           </form>
// //           <div className="navbar-nav align-items-center ms-auto">
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="fa fa-envelope me-lg-2"></i>
// //                 <span className="d-none d-lg-inline-flex">Message</span>
// //               </a>
// //               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
// //                 <a href="#" className="dropdown-item">
// //                   <div className="d-flex align-items-center">
// //                     <img
// //                       className="rounded-circle"
// //                       src="img/user.jpg"
// //                       alt=""
// //                       style={{ width: '40px', height: '40px' }}
// //                     />
// //                     <div className="ms-2">
// //                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
// //                       <small>15 minutes ago</small>
// //                     </div>
// //                   </div>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <div className="d-flex align-items-center">
// //                     <img
// //                       className="rounded-circle"
// //                       src="img/user.jpg"
// //                       alt=""
// //                       style={{ width: '40px', height: '40px' }}
// //                     />
// //                     <div className="ms-2">
// //                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
// //                       <small>15 minutes ago</small>
// //                     </div>
// //                   </div>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <div className="d-flex align-items-center">
// //                     <img
// //                       className="rounded-circle"
// //                       src="img/user.jpg"
// //                       alt=""
// //                       style={{ width: '40px', height: '40px' }}
// //                     />
// //                     <div className="ms-2">
// //                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
// //                       <small>15 minutes ago</small>
// //                     </div>
// //                   </div>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item text-center">
// //                   See all message
// //                 </a>
// //               </div>
// //             </div>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="fa fa-bell me-lg-2"></i>
// //                 <span className="d-none d-lg-inline-flex">Notification</span>
// //               </a>
// //               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
// //                 <a href="#" className="dropdown-item">
// //                   <h6 className="fw-normal mb-0">Profile updated</h6>
// //                   <small>15 minutes ago</small>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <h6 className="fw-normal mb-0">New user added</h6>
// //                   <small>15 minutes ago</small>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <h6 className="fw-normal mb-0">Password changed</h6>
// //                   <small>15 minutes ago</small>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item text-center">
// //                   See all notifications
// //                 </a>
// //               </div>
// //             </div>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
// //                 <span className="d-none d-lg-inline-flex">John Doe</span>
// //               </a>
// //               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
// //                 <a href="#" className="dropdown-item">
// //                   My Profile
// //                 </a>
// //                 <a href="#" className="dropdown-item">
// //                   Settings
// //                 </a>
// //                 <a href="#" className="dropdown-item">
// //                   Log Out
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //         {/* Navbar End */}

// //         {/* Blank Start */}
// //         <div className="container-fluid pt-4 px-4">
// //           <div className="row bg-secondary rounded align-items-center justify-content-center mx-0">
// //             <div className="col-md-6 text-center">
// //               <h3 className="mb-4">Blank Page</h3>
// //             </div>
// //           </div>
// //         </div>
// //         {/* Blank End */}

// //         {/* Footer Start */}
// //         <div className="container-fluid pt-4 px-4">
// //           <div className="bg-secondary rounded-top p-4">
// //             <div className="row">
// //               <div className="col-12 col-sm-6 text-center text-sm-start">
// //                 &copy; <a href="#">Your Site Name</a>, All Right Reserved.
// //               </div>
// //               <div className="col-12 col-sm-6 text-center text-sm-end">
// //                 {/* Note: You must include a link back to BootstrapMade.com. If you don't want to include the link, you can purchase a license for legal use. */}
// //                 Designed By <a href="https://htmlcodex.com">HTML Codex</a>
// //                 <br />
// //                 Distributed By <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         {/* Footer End */}
// //       </div>
// //       {/* Content End */}

// //       {/* Back to Top */}
// //       <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
// //         <i className="bi bi-arrow-up"></i>
// //       </a>
// //     </div>
// //   );
// // };

// // export default Dashboard;






// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const App = () => {
// //   // State to manage sidebar visibility and top nav bar style
// //   const [sidebarToggled, setSidebarToggled] = useState(false);
// //   const [topNavStyle, setTopNavStyle] = useState('bg-secondary');

// //   const toggleSidebar = () => {
// //     setSidebarToggled(!sidebarToggled);
// //   };

// //   const toggleTopNavStyle = () => {
// //     setTopNavStyle(topNavStyle === 'bg-secondary' ? 'bg-primary' : 'bg-secondary');
// //   };

// //   return (
// //     <div className="container-fluid position-relative d-flex p-0">
// //       {/* Spinner Start */}
// //       <div
// //         id="spinner"
// //         className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
// //       >
// //         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
// //           <span className="sr-only">Loading...</span>
// //         </div>
// //       </div>
// //       {/* Spinner End */}

// //       {/* Sidebar Start */}
// //       <div className={`sidebar pe-4 pb-3 ${sidebarToggled ? 'toggled' : ''}`}>
// //         <nav className="navbar bg-secondary navbar-dark">
// //           <a href="index.html" className="navbar-brand mx-4 mb-3">
// //             <h3 className="text-primary">
// //               <i className="fa fa-user-edit me-2"></i>DarkPan
// //             </h3>
// //           </a>
// //           <div className="d-flex align-items-center ms-4 mb-4">
// //             <div className="position-relative">
// //               <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
// //               <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
// //             </div>
// //             <div className="ms-3">
// //               <h6 className="mb-0">Jhon Doe</h6>
// //               <span>Admin</span>
// //             </div>
// //           </div>
// //           <div className="navbar-nav w-100">
// //             <a href="index.html" className="nav-item nav-link">
// //               <i className="fa fa-tachometer-alt me-2"></i>Dashboard
// //             </a>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="fa fa-laptop me-2"></i>Elements
// //               </a>
// //               <div className="dropdown-menu bg-transparent border-0">
// //                 <a href="button.html" className="dropdown-item">Buttons</a>
// //                 <a href="typography.html" className="dropdown-item">Typography</a>
// //                 <a href="element.html" className="dropdown-item">Other Elements</a>
// //               </div>
// //             </div>
// //             <a href="widget.html" className="nav-item nav-link">
// //               <i className="fa fa-th me-2"></i>Widgets
// //             </a>
// //             <a href="form.html" className="nav-item nav-link">
// //               <i className="fa fa-keyboard me-2"></i>Forms
// //             </a>
// //             <a href="table.html" className="nav-item nav-link">
// //               <i className="fa fa-table me-2"></i>Tables
// //             </a>
// //             <a href="chart.html" className="nav-item nav-link">
// //               <i className="fa fa-chart-bar me-2"></i>Charts
// //             </a>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
// //                 <i className="far fa-file-alt me-2"></i>Pages
// //               </a>
// //               <div className="dropdown-menu bg-transparent border-0">
// //                 <a href="signin.html" className="dropdown-item">Sign In</a>
// //                 <a href="signup.html" className="dropdown-item">Sign Up</a>
// //                 <a href="404.html" className="dropdown-item">404 Error</a>
// //                 <a href="blank.html" className="dropdown-item active">Blank Page</a>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //       {/* Sidebar End */}

// //       {/* Content Start */}
// //       <div className="content">
// //         {/* Navbar Start */}
// //         <nav className={`navbar navbar-expand ${topNavStyle} navbar-dark sticky-top px-4 py-0`}>
// //           <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
// //             <h2 className="text-primary mb-0">
// //               <i className="fa fa-user-edit"></i>
// //             </h2>
// //           </a>
// //           <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
// //             <i className="fa fa-bars"></i>
// //           </a>
// //           <form className="d-none d-md-flex ms-4">
// //             <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
// //           </form>
// //           <div className="navbar-nav align-items-center ms-auto">
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="fa fa-envelope me-lg-2"></i>
// //                 <span className="d-none d-lg-inline-flex">Message</span>
// //               </a>
// //               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
// //                 <a href="#" className="dropdown-item">
// //                   <div className="d-flex align-items-center">
// //                     <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
// //                     <div className="ms-2">
// //                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
// //                       <small>15 minutes ago</small>
// //                     </div>
// //                   </div>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <div className="d-flex align-items-center">
// //                     <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
// //                     <div className="ms-2">
// //                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
// //                       <small>15 minutes ago</small>
// //                     </div>
// //                   </div>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <div className="d-flex align-items-center">
// //                     <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
// //                     <div className="ms-2">
// //                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
// //                       <small>15 minutes ago</small>
// //                     </div>
// //                   </div>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item text-center">
// //                   See all message
// //                 </a>
// //               </div>
// //             </div>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="fa fa-bell me-lg-2"></i>
// //                 <span className="d-none d-lg-inline-flex">Notification</span>
// //               </a>
// //               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
// //                 <a href="#" className="dropdown-item">
// //                   <h6 className="fw-normal mb-0">Profile updated</h6>
// //                   <small>15 minutes ago</small>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <h6 className="fw-normal mb-0">New user added</h6>
// //                   <small>15 minutes ago</small>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item">
// //                   <h6 className="fw-normal mb-0">Password changed</h6>
// //                   <small>15 minutes ago</small>
// //                 </a>
// //                 <hr className="dropdown-divider" />
// //                 <a href="#" className="dropdown-item text-center">
// //                   See all notification
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //         {/* Navbar End */}

// //         {/* Main Content */}
// //         <div className="container-fluid pt-4 px-4">
// //           <div className="row g-4">
// //             <div className="col-12 col-xl-8">
// //               <div className="bg-light rounded p-4">
// //                 <h6 className="mb-4">Recent Post</h6>
// //                 {/* Content goes here */}
// //               </div>
// //             </div>
// //             <div className="col-12 col-xl-4">
// //               <div className="bg-light rounded p-4">
// //                 <h6 className="mb-4">Sidebar</h6>
// //                 {/* Sidebar content goes here */}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         {/* Main Content End */}
// //       </div>
// //       {/* Content End */}
// //     </div>
// //   );
// // };

// // export default App;
