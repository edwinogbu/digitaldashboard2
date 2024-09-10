import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import DashboardHome from './DashboardHome';
import Exchange from './Exchange';
import UserList from './UserList';
import UserProfile from './UserProfile';
import MarketCap from './MarketCap';
import CryptoConverter from './CryptoConverter';
import Wallet from './Wallet';
import CoinDetail from './CoinDetail';
import CurrencyConverter from './CurrencyConverter';
import Transactions from './Transactions';
import CrytocurrencyPrices from './CrytocurrencyPrices';
import CreateAccount from './CreateAccount';
import RecoverAccount from './RecoverAccount';
import HomeWallet from './wallet/homeWallet';
import WalletView from './wallet/WalletView';


const App = () => {
  const dashboardBasePath = "/dashboard";

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path={`${dashboardBasePath}/*`}
            element={<PrivateRoute element={<Dashboard />} />}
          />

          {/* Dashboard Routes */}
          <Route path={`${dashboardBasePath}/*`} element={<PrivateRoute element={<Dashboard />} />} />

          {/* Blog Routes */}
          {/* <Route path="posts/*" element={<PrivateRoute element={<DashboardHome />} />} />
          <Route path="posts/*" element={<PrivateRoute element={<Exchange />} />} />
          <Route path="add-post" element={<PrivateRoute element={<MarketCap />} />} />
          <Route path="view-post/:id" element={<PrivateRoute element={<CryptoConverter />} />} />
          <Route path="update-post/:id" element={<PrivateRoute element={<CurrencyConverter />} />} />
          <Route path="update-post/:id" element={<PrivateRoute element={<CrytocurrencyPrices />} />} />
          <Route path="update-post/:id" element={<PrivateRoute element={<CoinDetail />} />} />
          <Route path="update-post/:id" element={<PrivateRoute element={<Transactions />} />} /> */}

          {/* User Routes */}
          {/* <Route path="users/*" element={<PrivateRoute element={<Wallet />} />} />
          <Route path="users/*" element={<PrivateRoute element={<WalletView />} />} />
          <Route path="add-user" element={<PrivateRoute element={<HomeWallet />} />} />
          <Route path="update-user/:id" element={<PrivateRoute element={<CreateAccount />} />} />
          <Route path="view-user/:id" element={<PrivateRoute element={<RecoverAccount />} />} /> */}

          {/* Fees Routes */}
          {/* <Route path="fees/*" element={<PrivateRoute element={<UserList />} />} /> */}

  
        </Routes>
      </Router>


       {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path={`${dashboardBasePath}/*`}
            element={<PrivateRoute element={<Dashboard />} />}
          /> */}

          {/* Blog Routes */}
          {/* <Route path={`${dashboardBasePath}/posts/*`} element={<PrivateRoute element={<PostList />} />} />
          <Route path={`${dashboardBasePath}/add-post`} element={<PrivateRoute element={<AddPost />} />} />
          <Route path={`${dashboardBasePath}/view-post/:id`} element={<PrivateRoute element={<ViewPost />} />} />
          <Route path={`${dashboardBasePath}/update-post/:id`} element={<PrivateRoute element={<UpdatePost />} />} /> */}

          {/* User Routes */}
          {/* <Route path={`${dashboardBasePath}/users/*`} element={<PrivateRoute element={<UserList />} />} />
          <Route path="/users" element={<UserList />} />
          <Route path={`${dashboardBasePath}/add-user`} element={<PrivateRoute element={<AddUser />} />} />
          <Route path={`${dashboardBasePath}/update-user/:id`} element={<PrivateRoute element={<UpdateUser />} />} />
          <Route path={`${dashboardBasePath}/view-user/:id`} element={<PrivateRoute element={<ViewUser />} />} /> */}

          {/* Fees Routes */}
          {/* <Route path={`${dashboardBasePath}/fees/*`} element={<PrivateRoute element={<FeesList />} />} />
          <Route path={`${dashboardBasePath}/add-fees`} element={<PrivateRoute element={<AddFees />} />} />
          <Route path={`${dashboardBasePath}/update-fees/:id`} element={<PrivateRoute element={<UpdateFees />} />} />
          <Route path={`${dashboardBasePath}/view-fees/:id`} element={<PrivateRoute element={<ViewFees />} />} /> */}

          {/* Payments Routes */}
          {/* <Route path={`${dashboardBasePath}/payments/*`} element={<PrivateRoute element={<PaymentList />} />} />
          <Route path={`${dashboardBasePath}/add-payment`} element={<PrivateRoute element={<AddPayment />} />} />
          <Route path={`${dashboardBasePath}/update-payment/:id`} element={<PrivateRoute element={<UpdatePayment />} />} />
          <Route path={`${dashboardBasePath}/view-payment/:id`} element={<PrivateRoute element={<ViewPayment />} />} /> */}

          {/* Pin Routes */}
          {/* <Route path={`${dashboardBasePath}/pins/*`} element={<PrivateRoute element={<PinsList />} />} />
          <Route path={`${dashboardBasePath}/add-pin`} element={<PrivateRoute element={<AddPin />} />} />
          <Route path={`${dashboardBasePath}/add-batch-pins`} element={<PrivateRoute element={<AddBatchPins />} />} />
          <Route path={`${dashboardBasePath}/update-pin/:id`} element={<PrivateRoute element={<UpdatePin />} />} />
          <Route path={`${dashboardBasePath}/view-pin/:id`} element={<PrivateRoute element={<ViewPin />} />} /> */}

          {/* Exams Routes */}
          {/* <Route path={`${dashboardBasePath}/add-exam-record`} element={<PrivateRoute element={<AddExamRecord />} />} /> */}
          {/* <Route path={`${dashboardBasePath}/exam-records/*`} element={<PrivateRoute element={<ExamRecordList />} />} /> */}
          {/* <Route path={`${dashboardBasePath}/view-exam-record/:id`} element={<PrivateRoute element={<ViewExamRecord />} />} /> */}

          {/* Result Checker Routes */}
          {/* <Route path={`${dashboardBasePath}/result-sheet`} element={<PrivateRoute element={<ResultSheet />} />} />
          <Route path={`${dashboardBasePath}/result-checker-screen`} element={<PrivateRoute element={<ResultCheckerScreen />} />} /> */}

          {/* Students Routes */}
          {/* <Route path={`${dashboardBasePath}/add-student`} element={<PrivateRoute element={<AddStudent />} />} />
          <Route path={`${dashboardBasePath}/students/*`} element={<PrivateRoute element={<StudentList />} />} />
          <Route path={`${dashboardBasePath}/view-student/:id`} element={<PrivateRoute element={<ViewStudent />} />} /> */}

          {/* Courses Routes */}
          {/* <Route path={`${dashboardBasePath}/course-details/*`} element={<PrivateRoute element={<CourseDetailList />} />} /> */}

          {/* User Profile Routes */}
          {/* <Route path={`${dashboardBasePath}/profile`} element={<PrivateRoute element={<Profile />} />} />
          <Route path={`${dashboardBasePath}/add-user-profile`} element={<PrivateRoute element={<AddUserProfile />} />} />
          <Route path={`${dashboardBasePath}/users-profiles/*`} element={<PrivateRoute element={<UsersProfileList />} />} />
          <Route path={`${dashboardBasePath}/user-profile`} element={<PrivateRoute element={<UserProfile />} />} />
          <Route path={`${dashboardBasePath}/my-profile`} element={<PrivateRoute element={<UserProfile />} />} />
          <Route path={`${dashboardBasePath}/view-profile`} element={<PrivateRoute element={<ViewProfile />} />} /> */}

          {/* Students Profile Routes */}
          {/* <Route path={`${dashboardBasePath}/all-students-profiles`} element={<PrivateRoute element={<ViewAllStudentsProfile />} />} />
          <Route path={`${dashboardBasePath}/View-single-students-profile/:id`} element={<ViewSingleStudentsProfile />} />

        </Routes>
      </Router> */}
    </AuthProvider>
  );
};

export default App;




// import React, { useState } from 'react';

// const App = () => {
//   const [sidebarClass, setSidebarClass] = useState('sidebar pe-4 pb-3');

//   const toggleSidebarClass = () => {
//     setSidebarClass(prevClass => 
//       prevClass === 'sidebar pe-4 pb-3' ? 'sidebar pe-4 pb-3 collapsed' : 'sidebar pe-4 pb-3'
//     );
//   };

//   return (
//     <div className="container-fluid position-relative d-flex p-0">
//       {/* Spinner Start */}
//       <div
//         id="spinner"
//         className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
//       >
//         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//       {/* Spinner End */}

//       {/* Sidebar Start */}
//       <div className={sidebarClass}>
//         <nav className="navbar bg-secondary navbar-dark">
//           <a href="index.html" className="navbar-brand mx-4 mb-3">
//             <h3 className="text-primary">
//               <i className="fa fa-user-edit me-2"></i>DarkPan
//             </h3>
//           </a>
//           <div className="d-flex align-items-center ms-4 mb-4">
//             <div className="position-relative">
//               <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//               <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
//             </div>
//             <div className="ms-3">
//               <h6 className="mb-0">Jhon Doe</h6>
//               <span>Admin</span>
//             </div>
//           </div>
//           <div className="navbar-nav w-100">
//             <a href="index.html" className="nav-item nav-link">
//               <i className="fa fa-tachometer-alt me-2"></i>Dashboard
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-laptop me-2"></i>Elements
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="button.html" className="dropdown-item">
//                   Buttons
//                 </a>
//                 <a href="typography.html" className="dropdown-item">
//                   Typography
//                 </a>
//                 <a href="element.html" className="dropdown-item">
//                   Other Elements
//                 </a>
//               </div>
//             </div>
//             <a href="widget.html" className="nav-item nav-link">
//               <i className="fa fa-th me-2"></i>Widgets
//             </a>
//             <a href="form.html" className="nav-item nav-link">
//               <i className="fa fa-keyboard me-2"></i>Forms
//             </a>
//             <a href="table.html" className="nav-item nav-link">
//               <i className="fa fa-table me-2"></i>Tables
//             </a>
//             <a href="chart.html" className="nav-item nav-link">
//               <i className="fa fa-chart-bar me-2"></i>Charts
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
//                 <i className="far fa-file-alt me-2"></i>Pages
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="signin.html" className="dropdown-item">
//                   Sign In
//                 </a>
//                 <a href="signup.html" className="dropdown-item">
//                   Sign Up
//                 </a>
//                 <a href="404.html" className="dropdown-item">
//                   404 Error
//                 </a>
//                 <a href="blank.html" className="dropdown-item active">
//                   Blank Page
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//       {/* Sidebar End */}

//       {/* Content Start */}
//       <div className="content">
//         {/* Navbar Start */}
//         <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
//           <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
//             <h2 className="text-primary mb-0">
//               <i className="fa fa-user-edit"></i>
//             </h2>
//           </a>
//           <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebarClass}>
//             <i className="fa fa-bars"></i>
//           </a>
//           <form className="d-none d-md-flex ms-4">
//             <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
//           </form>
//           <div className="navbar-nav align-items-center ms-auto">
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-envelope me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Message</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all message
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-bell me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Notification</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Profile updated</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">New user added</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Password changed</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all notifications
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//                 <span className="d-none d-lg-inline-flex">John Doe</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   My Profile
//                 </a>
//                 <a href="#" className="dropdown-item">
//                   Settings
//                 </a>
//                 <a href="#" className="dropdown-item">
//                   Log Out
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//         {/* Navbar End */}

//         {/* Blank Start */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="row bg-secondary rounded align-items-center justify-content-center mx-0">
//             <div className="col-md-6 text-center">
//               <h3 className="mb-4">Blank Page</h3>
//             </div>
//           </div>
//         </div>
//         {/* Blank End */}

//         {/* Footer Start */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="bg-secondary rounded-top p-4">
//             <div className="row">
//               <div className="col-12 col-sm-6 text-center text-sm-start">
//                 &copy; <a href="#">Your Site Name</a>, All Right Reserved.
//               </div>
//               <div className="col-12 col-sm-6 text-center text-sm-end">
//                 {/* Note: You must include a link back to BootstrapMade.com. If you don't want to include the link, you can purchase a license for legal use. */}
//                 Designed By <a href="https://htmlcodex.com">HTML Codex</a>
//                 <br />
//                 Distributed By <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Footer End */}
//       </div>
//       {/* Content End */}

//       {/* Back to Top */}
//       <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
//         <i className="bi bi-arrow-up"></i>
//       </a>
//     </div>
//   );
// };

// export default App;


// // // now implement the sidebar toggles dynamically using the class names state variables too so that provides a responsive admin interface with a togglable sidebar and a top navigation bar. The sidebar's appearance can be dynamically changed just like the recent one you just explained implement such here on these component:import React from 'react';

// const App = () => {
//   return (
//     <div className="container-fluid position-relative d-flex p-0">
//       {/* Spinner Start */}
//       <div
//         id="spinner"
//         className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
//       >
//         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//       {/* Spinner End */}

//       {/* Sidebar Start */}
//       <div className="sidebar pe-4 pb-3">
//         <nav className="navbar bg-secondary navbar-dark">
//           <a href="index.html" className="navbar-brand mx-4 mb-3">
//             <h3 className="text-primary">
//               <i className="fa fa-user-edit me-2"></i>DarkPan
//             </h3>
//           </a>
//           <div className="d-flex align-items-center ms-4 mb-4">
//             <div className="position-relative">
//               <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//               <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
//             </div>
//             <div className="ms-3">
//               <h6 className="mb-0">Jhon Doe</h6>
//               <span>Admin</span>
//             </div>
//           </div>
//           <div className="navbar-nav w-100">
//             <a href="index.html" className="nav-item nav-link">
//               <i className="fa fa-tachometer-alt me-2"></i>Dashboard
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-laptop me-2"></i>Elements
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="button.html" className="dropdown-item">
//                   Buttons
//                 </a>
//                 <a href="typography.html" className="dropdown-item">
//                   Typography
//                 </a>
//                 <a href="element.html" className="dropdown-item">
//                   Other Elements
//                 </a>
//               </div>
//             </div>
//             <a href="widget.html" className="nav-item nav-link">
//               <i className="fa fa-th me-2"></i>Widgets
//             </a>
//             <a href="form.html" className="nav-item nav-link">
//               <i className="fa fa-keyboard me-2"></i>Forms
//             </a>
//             <a href="table.html" className="nav-item nav-link">
//               <i className="fa fa-table me-2"></i>Tables
//             </a>
//             <a href="chart.html" className="nav-item nav-link">
//               <i className="fa fa-chart-bar me-2"></i>Charts
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
//                 <i className="far fa-file-alt me-2"></i>Pages
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="signin.html" className="dropdown-item">
//                   Sign In
//                 </a>
//                 <a href="signup.html" className="dropdown-item">
//                   Sign Up
//                 </a>
//                 <a href="404.html" className="dropdown-item">
//                   404 Error
//                 </a>
//                 <a href="blank.html" className="dropdown-item active">
//                   Blank Page
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//       {/* Sidebar End */}

//       {/* Content Start */}
//       <div className="content">
//         {/* Navbar Start */}
//         <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
//           <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
//             <h2 className="text-primary mb-0">
//               <i className="fa fa-user-edit"></i>
//             </h2>
//           </a>
//           <a href="#" className="sidebar-toggler flex-shrink-0">
//             <i className="fa fa-bars"></i>
//           </a>
//           <form className="d-none d-md-flex ms-4">
//             <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
//           </form>
//           <div className="navbar-nav align-items-center ms-auto">
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-envelope me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Message</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all message
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-bell me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Notification</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Profile updated</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">New user added</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Password changed</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all notifications
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//                 <span className="d-none d-lg-inline-flex">John Doe</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   My Profile
//                 </a>
//                 <a href="#" className="dropdown-item">
//                   Settings
//                 </a>
//                 <a href="#" className="dropdown-item">
//                   Log Out
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//         {/* Navbar End */}

//         {/* Blank Start */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="row bg-secondary rounded align-items-center justify-content-center mx-0">
//             <div className="col-md-6 text-center">
//               <h3 className="mb-4">Blank Page</h3>
//             </div>
//           </div>
//         </div>
//         {/* Blank End */}

//         {/* Footer Start */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="bg-secondary rounded-top p-4">
//             <div className="row">
//               <div className="col-12 col-sm-6 text-center text-sm-start">
//                 &copy; <a href="#">Your Site Name</a>, All Right Reserved.
//               </div>
//               <div className="col-12 col-sm-6 text-center text-sm-end">
//                 {/* Note: You must include a link back to BootstrapMade.com. If you don't want to include the link, you can purchase a license for legal use. */}
//                 Designed By <a href="https://htmlcodex.com">HTML Codex</a>
//                 <br />
//                 Distributed By <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Footer End */}
//       </div>
//       {/* Content End */}

//       {/* Back to Top */}
//       <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
//         <i className="bi bi-arrow-up"></i>
//       </a>
//     </div>
//   );
// };

// export default App;






// // import React, { useState } from 'react';

// // const App = () => {
// //   // State variables for sidebar style and toggle
// //   const [sidebarStyle, setSidebarStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
// //   const [isSidebarToggled, setIsSidebarToggled] = useState(false);

// //   const handleSidebarToggle = () => {
// //     setIsSidebarToggled(!isSidebarToggled);
// //     setSidebarStyle(isSidebarToggled ? 
// //       "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :
// //       "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
// //     );
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
// //       <div className={`sidebar pe-4 pb-3 ${sidebarStyle}`}>
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
// //           <a href="#" className="sidebar-toggler flex-shrink-0" onClick={handleSidebarToggle}>
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
// //                   See all notification
// //                 </a>
// //               </div>
// //             </div>
// //             <div className="nav-item dropdown">
// //               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <img
// //                   className="rounded-circle me-lg-2"
// //                   src="img/user.jpg"
// //                   alt=""
// //                   style={{ width: '40px', height: '40px' }}
// //                 />
// //                 <span className="d-none d-lg-inline-flex">Jhon Doe</span>
// //               </a>
// //               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
// //                 <a href="#" className="dropdown-item">
// //                   <i className="fa fa-user me-2"></i>My Profile
// //                 </a>
// //                 <a href="#" className="dropdown-item">
// //                   <i className="fa fa-cog me-2"></i>Settings
// //                 </a>
// //                 <a href="#" className="dropdown-item">
// //                   <i className="fa fa-sign-out-alt me-2"></i>Log Out
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //         {/* Navbar End */}

// //         {/* Main Content */}
// //         <div className="container-fluid">
// //           <h1 className="text-center my-4">Main Content Area</h1>
// //         </div>
// //       </div>
// //       {/* Content End */}
// //     </div>
// //   );
// // };

// // export default App;




// import React, { useState } from 'react';

// const App = () => {
//   const [sidebarClass, setSidebarClass] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//   const toggleSidebar = () => {
//     if (sidebarClass.includes("toggled")) {
//       setSidebarClass("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//     } else {
//       setSidebarClass("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
//     }
//   };

//   return (
//     <div className="container-fluid position-relative d-flex p-0">
//       {/* Spinner Start */}
//       <div
//         id="spinner"
//         className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
//       >
//         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//       {/* Spinner End */}

//       {/* Sidebar Start */}
//       <div className={sidebarClass}>
//         <nav className="navbar bg-secondary navbar-dark">
//           <a href="index.html" className="navbar-brand mx-4 mb-3">
//             <h3 className="text-primary">
//               <i className="fa fa-user-edit me-2"></i>DarkPan
//             </h3>
//           </a>
//           <div className="d-flex align-items-center ms-4 mb-4">
//             <div className="position-relative">
//               <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//               <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
//             </div>
//             <div className="ms-3">
//               <h6 className="mb-0">Jhon Doe</h6>
//               <span>Admin</span>
//             </div>
//           </div>
//           <div className="navbar-nav w-100">
//             <a href="index.html" className="nav-item nav-link">
//               <i className="fa fa-tachometer-alt me-2"></i>Dashboard
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-laptop me-2"></i>Elements
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="button.html" className="dropdown-item">
//                   Buttons
//                 </a>
//                 <a href="typography.html" className="dropdown-item">
//                   Typography
//                 </a>
//                 <a href="element.html" className="dropdown-item">
//                   Other Elements
//                 </a>
//               </div>
//             </div>
//             <a href="widget.html" className="nav-item nav-link">
//               <i className="fa fa-th me-2"></i>Widgets
//             </a>
//             <a href="form.html" className="nav-item nav-link">
//               <i className="fa fa-keyboard me-2"></i>Forms
//             </a>
//             <a href="table.html" className="nav-item nav-link">
//               <i className="fa fa-table me-2"></i>Tables
//             </a>
//             <a href="chart.html" className="nav-item nav-link">
//               <i className="fa fa-chart-bar me-2"></i>Charts
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
//                 <i className="far fa-file-alt me-2"></i>Pages
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="signin.html" className="dropdown-item">
//                   Sign In
//                 </a>
//                 <a href="signup.html" className="dropdown-item">
//                   Sign Up
//                 </a>
//                 <a href="404.html" className="dropdown-item">
//                   404 Error
//                 </a>
//                 <a href="blank.html" className="dropdown-item active">
//                   Blank Page
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//       {/* Sidebar End */}

//       {/* Content Start */}
//       <div className="content">
//         {/* Navbar Start */}
//         <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
//           <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
//             <h2 className="text-primary mb-0">
//               <i className="fa fa-user-edit"></i>
//             </h2>
//           </a>
//           <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
//             <i className="fa fa-bars"></i>
//           </a>
//           <form className="d-none d-md-flex ms-4">
//             <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
//           </form>
//           <div className="navbar-nav align-items-center ms-auto">
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-envelope me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Message</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all message
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-bell me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Notification</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Profile updated</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">New user added</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Password changed</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all notifications
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//                 <span className="d-none d-lg-inline-flex">John Doe</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">My Profile</a>
//                 <a href="#" className="dropdown-item">Settings</a>
//                 <a href="#" className="dropdown-item">Log Out</a>
//               </div>
//             </div>
//           </div>
//         </nav>
//         {/* Navbar End */}

//         {/* Blank Start */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="row bg-secondary rounded align-items-center justify-content-center mx-0">
//             <div className="col-md-6 text-center">
//               <h3 className="mb-0">Blank Page</h3>
//             </div>
//           </div>
//         </div>
//         {/* Blank End */}
//       </div>
//       {/* Content End */}
//     </div>
//   );
// };

// export default App;



// import React, { useState } from 'react';
// import './App.css'; // Ensure you have this CSS file for additional styles

// const App = () => {
//   const [sidebarClass, setSidebarClass] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//   const toggleSidebar = () => {
//     setSidebarClass(prevClass =>
//       prevClass.includes("toggled")
//         ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
//         : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//     );
//   };

//   return (
//     <div className={`container-fluid position-relative d-flex p-0 ${sidebarClass}`}>
//       {/* Spinner Start */}
//       <div
//         id="spinner"
//         className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
//       >
//         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//       {/* Spinner End */}

//       {/* Sidebar Start */}
//       <div className={`sidebar ${sidebarClass}`}>
//         <nav className="navbar bg-secondary navbar-dark">
//           <a href="index.html" className="navbar-brand mx-4 mb-3">
//             <h3 className="text-primary">
//               <i className="fa fa-user-edit me-2"></i>DarkPan
//             </h3>
//           </a>
//           <div className="d-flex align-items-center ms-4 mb-4">
//             <div className="position-relative">
//               <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//               <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
//             </div>
//             <div className="ms-3">
//               <h6 className="mb-0">Jhon Doe</h6>
//               <span>Admin</span>
//             </div>
//           </div>
//           <div className="navbar-nav w-100">
//             <a href="index.html" className="nav-item nav-link">
//               <i className="fa fa-tachometer-alt me-2"></i>Dashboard
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-laptop me-2"></i>Elements
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="button.html" className="dropdown-item">
//                   Buttons
//                 </a>
//                 <a href="typography.html" className="dropdown-item">
//                   Typography
//                 </a>
//                 <a href="element.html" className="dropdown-item">
//                   Other Elements
//                 </a>
//               </div>
//             </div>
//             <a href="widget.html" className="nav-item nav-link">
//               <i className="fa fa-th me-2"></i>Widgets
//             </a>
//             <a href="form.html" className="nav-item nav-link">
//               <i className="fa fa-keyboard me-2"></i>Forms
//             </a>
//             <a href="table.html" className="nav-item nav-link">
//               <i className="fa fa-table me-2"></i>Tables
//             </a>
//             <a href="chart.html" className="nav-item nav-link">
//               <i className="fa fa-chart-bar me-2"></i>Charts
//             </a>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
//                 <i className="far fa-file-alt me-2"></i>Pages
//               </a>
//               <div className="dropdown-menu bg-transparent border-0">
//                 <a href="signin.html" className="dropdown-item">
//                   Sign In
//                 </a>
//                 <a href="signup.html" className="dropdown-item">
//                   Sign Up
//                 </a>
//                 <a href="404.html" className="dropdown-item">
//                   404 Error
//                 </a>
//                 <a href="blank.html" className="dropdown-item active">
//                   Blank Page
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//       {/* Sidebar End */}

//       {/* Content Start */}
//       <div className="content">
//         {/* Navbar Start */}
//         <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
//           <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
//             <h2 className="text-primary mb-0">
//               <i className="fa fa-user-edit"></i>
//             </h2>
//           </a>
//           <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
//             <i className="fa fa-bars"></i>
//           </a>
//           <form className="d-none d-md-flex ms-4">
//             <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
//           </form>
//           <div className="navbar-nav align-items-center ms-auto">
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-envelope me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Message</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <div className="d-flex align-items-center">
//                     <img
//                       className="rounded-circle"
//                       src="img/user.jpg"
//                       alt=""
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                     <div className="ms-2">
//                       <h6 className="fw-normal mb-0">Jhon send you a message</h6>
//                       <small>15 minutes ago</small>
//                     </div>
//                   </div>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all message
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <i className="fa fa-bell me-lg-2"></i>
//                 <span className="d-none d-lg-inline-flex">Notification</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Profile updated</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">New user added</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item">
//                   <h6 className="fw-normal mb-0">Password changed</h6>
//                   <small>15 minutes ago</small>
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a href="#" className="dropdown-item text-center">
//                   See all notifications
//                 </a>
//               </div>
//             </div>
//             <div className="nav-item dropdown">
//               <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
//                 <span className="d-none d-lg-inline-flex">John Doe</span>
//               </a>
//               <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
//                 <a href="#" className="dropdown-item">My Profile</a>
//                 <a href="#" className="dropdown-item">Settings</a>
//                 <a href="#" className="dropdown-item">Log Out</a>
//               </div>
//             </div>
//           </div>
//         </nav>
//         {/* Navbar End */}

//         {/* Blank Start */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="row bg-secondary rounded align-items-center justify-content-center mx-0">
//             <div className="col-md-6 text-center">
//               <h3 className="mb-0">Blank Page</h3>
//             </div>
//           </div>
//         </div>
//         {/* Blank End */}
//       </div>
//       {/* Content End */}
//     </div>
//   );
// };

// export default App;
