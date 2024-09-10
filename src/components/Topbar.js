import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

function Topbar({ changeStyle1 }) {

    // const { isAuthenticated, logout } = useAuth();
    // const { state } = useAuth();
    // const user = state.user.user;
    const { state, isAuthenticated, logout } = useAuth();
    const user = state.user.user;
    // const isAuthenticated = true;
      console.log("auth state:", state.isAuthenticated);
   
  
    // const { isAuthenticated, user, logout, getRole } = useAuth();
    // const userRole = getRole();
  
  return (
    <nav className="navbar navbar-expand navbar-light  topbar mb-4 static-top shadow" style={{backgroundColor:'#f0ee00', color:'#fff'}}>
      {/* Topbar content */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3 bg-white"  onClick={changeStyle1}>
        <i className="fa fa-bars"></i>
      </button>

                               
        {/*  <!-- Topbar Search --> */}
        <form
            className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" style={{backgroundColor:'#000033', color:'#fff'}}>
            <div className="input-group" style={{backgroundColor:'#000033', color:'#fff'}}>
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                    aria-label="Search" aria-describedby="basic-addon2" style={{backgroundColor:'#000033', color:'#fff'}} />
                <div className="input-group-append" style={{backgroundColor:'#000033', color:'#fff'}}>
                    <button className="btn " type="button" style={{backgroundColor:'#000033', color:'#fff'}}>
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </form>

        {/*  <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto bg-primary text-white" style={{backgroundColor:'#000033', color:'#fff'}}>

            {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
            <li className="nav-item dropdown no-arrow d-sm-none" style={{backgroundColor:'#000033', color:'#fff'}}>
                <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw"></i>
                </Link>
                {/*   <!-- Dropdown - Messages --> */}
                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown" style={{backgroundColor:'#000033', color:'#fff'}}>
                    <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small"
                                placeholder="Search for..." aria-label="Search"
                                aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>

            {/*  <!-- Nav Item - Alerts --> */}
           

            {/*  <!-- Nav Item - Messages --> */}
            <li className="nav-item dropdown no-arrow mx-1  bg-white" style={{backgroundColor:'#000033', color:'#fff'}}>
                <Link className="nav-link dropdown-toggle " to="#" id="messagesDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{backgroundColor:'#000033', color:'#fff'}}>
                    <img className="sidebar-card-illustration mb-2" src="./../images/dlogo.png" alt="..." style={{width:60, height:60, borderRadius:50}}/>

                        <Link className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" style={{backgroundColor:'#000033', color:'#fff'}}>

                        {
                         state.isAuthenticated = true ? (
                            <button className='btn btn-outline-light p-1 m-5' onClick={logout}>Sign Out</button>

                            ) : (
                                <p className="text-danger" style={{backgroundColor:'#000033', color:'#fff'}}>Please log in to view the dashboard.</p>
                            )}
                        </Link>
                </Link>
                {/*   <!-- Dropdown - Messages --> */}
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown" style={{backgroundColor:'#000033', color:'#fff'}}>
                        
                    <h6 className="dropdown-header" style={{backgroundColor:'#000033', color:'#fff'}}>
                        
                        {state.isAuthenticated = true ? (
                                        <>
                                    
                                            <p className="card-text" style={{backgroundColor:'#000033', color:'#fff'}}>
                                                <strong>Username:
                                                    
                                                    </strong> {user.firstName} {user.lastName}
                                            </p>
                                            </>
                         ):(
                                 <p className="card-text">
                                                <strong>Kindly Login to dashboard</strong> 
                                            </p>
                         )}
                    </h6>
                    <Link className="dropdown-item d-flex align-items-center" to="#" style={{backgroundColor:'#000033', color:'#fff'}}>
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="./../img/undraw_profile_1.svg"
                                alt="..." />
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                           <button className='btn btn-l btn-close btn-danger' onClick={logout}>Sign Out</button>
                        </div>
                    </Link>
                    <Link className="dropdown-item d-flex align-items-center" href="#" style={{backgroundColor:'#000033', color:'#fff'}}>
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="./../img/undraw_profile_2.svg"
                                alt="..." />
                            <div className="status-indicator"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Latest Posts</div>
                            {/* <div className="small text-gray-500">675</div> */}
                            <Link to="/dasboard/posts" className="small text-gray-500" />
                        </div>
                    </Link>
                    {/* <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="./../img/undraw_profile_3.svg"
                                alt="..." />
                            <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Last month's report looks great, I am very happy with
                                the progress so far, keep up the good work!</div>
                            <div className="small text-gray-500">Admin · 2d</div>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                alt="..." />
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                told me that people say this to all dogs, even if they aren't good...</div>
                            <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                    </a> */}
                        <div className=" shadow animated--grow-in"
                            aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                               
                                {state.isAuthenticated = true ? (
                                        <>
                                    
                                            <p className="card-text text-lg">
                                                <strong>
                                                    {user.username} {user.lastName}
                                                </strong> 
                                            </p>
                                            </>
                         ):(
                                 <p className="card-text">
                                                <strong>Username:</strong> {user.username} {user.lastName}
                                            </p>
                         )}
                            
                            <Link to="/dashboard/user-profile" className="dropdown-item text-center small text-gray-500 dropdown-header "  >My Profile</Link>
                            
                            </h6>
                       </div>
                </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

           

        </ul>

    </nav>

  );
}

export default Topbar;
