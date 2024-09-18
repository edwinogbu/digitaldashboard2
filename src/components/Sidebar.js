

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path if needed

const Sidebar = ({ style, changeStyle }) => {
  const { state } = useAuth();
  const isAuthenticated = state.isAuthenticated;
  const userRole = state.user.user.role; // Correct way to access the user role

  // Logging for debugging purposes
  useEffect(() => {
    console.log('====================================');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('User Role:', userRole);
    console.log('====================================');
  }, [isAuthenticated, userRole]);

  const isUserRole = userRole === 'user';
  const isAdminRole = userRole === 'admin';
  // const isStaffRole = userRole === 'ROLE_STAFF';

  return (
    <ul className={style} id="accordionSidebar" style={{backgroundColor:'#000033', color:'#fff'}}>
      {/* Sidebar - Brand */}
      <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard/home" style={{backgroundColor:'#000033', color:'#fff'}}>
        <div className="sidebar-brand-icon rotate-n-15 btn-outline-light" style={{ width: 60, height: 60, borderRadius: 50, border: 2 }}>
          <img className="sidebar-card-illustration mb-2" src="./../images/dlogo.png" alt="..." style={{ width: 60, height: 60, borderRadius: 50, border: 2, borderColor: 'white' }} />
        </div>
        <div className="sidebar-brand-text mx-3">Digital PayOut</div>
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
        </div>
      </NavLink>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {isAuthenticated ? (
        <>
          {/* Common Navigation Items for All Authenticated Users */}
          <li className="nav-item active">
            <NavLink className="nav-link" to="/dashboard/home" style={{backgroundColor:'#000033', color:'#fff'}}>
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Divider */}
          {/* <hr className="sidebar-divider" /> */}

          {/* Wallet Section - Accessible to All Authenticated Users */}
          {/* <div className="sidebar-heading" style={{backgroundColor:'#000033', color:'#fff'}}>Wallet</div> */}

          {/* <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
            <NavLink className="nav-link d-flex gap-2 align-items-center" to="/dashboard/investors-wallet">
              <span className="material-symbols-outlined fw-lighter">wallet</span>
              <span className="fw-semibold">Wallet</span>
            </NavLink>
          </li> */}

          {/* <li className="nav-item"style={{backgroundColor:'#000033', color:'#fff'}}>
            <NavLink className="nav-link" to="/dashboard/homewallet">
              <i className="fas fa-fw fa-wallet"></i>
              <span>Your Wallet</span>
            </NavLink>
          </li> */}

          {/* User-Specific Navigation Items */}
          {isUserRole && (
            <>
             <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/subscription-plan">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Subscription Plan </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/investors-wallet">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Wallet </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/transactions">
                  <i className="fas fa-fw fa-receipt"></i>
                  <span>Transactions</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Admin-Specific Navigation Items */}
          {isAdminRole && (
            <>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/user-list">
                  <i className="fas fa-fw fa-users"></i>
                  <span>User List</span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/unapproved-deposits-investors">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>UnApproved Deposit </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/subscription-plan">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Subscription Plan </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/investors-wallet">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Wallet </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-subscriptionPlans">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage Subscription Plan </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-Testimonial">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage Testimonial </span>
                </NavLink>
              </li>
              {/* <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-testimonials">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage Testimonials </span>
                </NavLink>
              </li> */}
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-postDeposits">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage/PostDeposits </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-blogs">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage Blog Post </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-payouts">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage Payouts </span>
                </NavLink>
              </li>
              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/manage-InvestorPayoutHistory">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Manage InvestorPayoutHistory </span>
                </NavLink>
              </li>

              {/* <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/recover">
                  <i className="fas fa-fw fa-undo"></i>
                  <span>Recover Account</span>
                </NavLink>
              </li> */}

              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/exchange">
                  <i className="fas fa-fw fa-exchange-alt"></i>
                  <span>Exchange</span>
                </NavLink>
              </li>

              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/price">
                  <i className="fas fa-fw fa-chart-line"></i>
                  <span>Cryptocurrency Prices</span>
                </NavLink>
              </li>

              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/profile-settings">
                  <i className="fas fa-fw fa-user-cog"></i>
                  <span>Profile Settings</span>
                </NavLink>
              </li>

              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/market-cap">
                  <i className="fas fa-fw fa-chart-pie"></i>
                  <span>Market Cap</span>
                </NavLink>
              </li>

              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/cryptoconverter">
                  <i className="fas fa-fw fa-coins"></i>
                  <span>Crypto Converter</span>
                </NavLink>
              </li>

              {/* <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/wallet">
                  <i className="fas fa-fw fa-wallet"></i>
                  <span>Wallet</span>
                </NavLink>
              </li> */}

              <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/cryptoexchange">
                  <i className="fas fa-fw fa-exchange-alt"></i>
                  <span>Crypto Exchange</span>
                </NavLink>
              </li>

              {/* <li className="nav-item" style={{backgroundColor:'#000033', color:'#fff'}}>
                <NavLink className="nav-link" to="/dashboard/coin/:coinId">
                  <i className="fas fa-fw fa-info-circle"></i>
                  <span>Coin Detail</span>
                </NavLink>
              </li> */}
            </>
          )}

          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* Sidebar Message */}
          <div className="sidebar-card d-none d-lg-flex" style={{backgroundColor:'#000033', color:'#fff'}}>
            <img className="sidebar-card-illustration mb-2" src="./../images/dlogo.png" alt="..." style={{ width: 60, height: 60, borderRadius: 50 }} />
            <p className="text-center mb-2"><strong>Digital Payout</strong> !</p>
          </div>
        </>
      ) : null}
    </ul>
  );
};

export default Sidebar;
