import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

export default function SignIn() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.getElementById('body').className = 'bg-gradient-primary';
  // }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome to your dashboard!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard/home'); // Redirect to the dashboard
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your email/phone and password and try again.',
      });
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container bg-gradient-primary" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/bg5.jpg')" }}>
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"  style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')" }}></div>
                {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"  style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/bg5.jpg')" }}></div> */}
                {/* <div className="col-lg-6" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/testimonial/crt4.jpg')" }}> */}
                <div className="col-lg-6" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')" }}>
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-white-900 mb-4 text-white" style={{color:'#fff'}}>Welcome Back!</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="user">
                      <div className="form-group">
                        <input
                        style={{border:2, borderColor:'#000033', color:'#000033'}}
                          type="text"
                          className="form-control form-control-user border-2 border-primary"
                          name="emailOrPhone"
                          value={formData.emailOrPhone}
                          onChange={handleChange}
                          placeholder="Enter Email Address or Phone Number..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            id="customCheck"
                            style={{border:2, borderColor:'#000033', color:'#000033'}}
                          />
                          <label className="custom-control-label" htmlFor="customCheck" style={{color:'#fff'}}>
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block" style={{color:'#fff'}}>
                        Login
                      </button>
                      <hr />
                      {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw"></i> Login with Google
                      </a>
                      <a href="index.html" className="btn btn-facebook btn-user btn-block">
                        <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                      </a> */}
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" href="#" style={{color:'#fff'}}>Forgot Password?</Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/signup" style={{color:'#fff'}}>Create an Account!</Link>
                    </div>
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


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import Swal from 'sweetalert2';

// export default function SignIn() {
//   const [formData, setFormData] = useState({
//     emailOrPhone: '',
//     password: '',
//     rememberMe: false,
//   });

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(formData);
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         text: 'Welcome to your dashboard!',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/dashboard/home'); // Redirect to the dashboard
//         }
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: 'Please check your email/phone and password and try again.',
//       });
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <section className="signin">
//       <div className="signin-inner">
//         <div className="row d-flex align-items-center g-3">
//           <div className="col-md-5">
//             <div className="signin-left">
//               <Link to="/">
//                 <img
//                   alt=""
//                   className="img-fluid"
//                   src="./assets/img/signin_logo.png"
//                 />
//               </Link>
              
//               <Link className="btn btn-outline-light mt-2  rounded-5" to='/'>
//                 Back To Home
//               </Link>
//               <h3 className="text-white pt-4">Welcome: <span>
//               </span></h3>
//               <p className="pb-3 text-white">
//                 Create an account to enjoy all the services without any ads for free!
//               </p>
//               <Link className="signin-btn mt-2 text-white" to='/register'>
//                 Sign Up
//               </Link>
//               <div className="mt-3">
//                 <img
//                   alt="signin"
//                   className="img-fluid"
//                   src="./assets/img/signin.png"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="col-md-7">
//             <div className="form-wrapper">
//               <form onSubmit={handleSubmit}>
//                 <h4 className="text-center text-white">Sign In</h4>
//                 <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
//                   {/* <button className="social-login-button d-flex align-items-center gap-2" type="button">
//                     <i className="ri-facebook-fill" />
//                     {' '}Sign In With Facebook
//                   </button>
//                   <button className="social-login-button d-flex align-items-center gap-2" type="button">
//                     <i className="ri-google-fill" />
//                     {' '}Sign In With Google
//                   </button> */}
//                   <Link className="social-login-button d-flex align-items-center gap-2" to="/register">
//                       <i className="ri-google-fill" />Sign Up
//                   </Link>
//                 </div>
//                 <div className="divider mt-4">
//                   <div className="line" />
//                   <span className="text-white">OR</span>
//                   <div className="line" />
//                 </div>
//                 <label className="fw-semibold mb-2 mt-3" htmlFor="emailOrPhone">
//                   E-mail or Phone
//                 </label>
//                 <input
//                   className="form-control py-4"
//                   id="emailOrPhone"
//                   name="emailOrPhone"
//                   placeholder="E-mail or Phone..."
//                   type="text"
//                   value={formData.emailOrPhone}
//                   onChange={handleChange}
//                 />
//                 <label className="fw-semibold mb-2 mt-3" htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   className="form-control py-4"
//                   id="password"
//                   name="password"
//                   placeholder="Password..."
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <div className="mt-2 d-flex justify-content-between flex-wrap gap-2">
//                   <div>
//                     <input
//                       id="rememberMe"
//                       name="rememberMe"
//                       type="checkbox"
//                       checked={formData.rememberMe}
//                       onChange={handleChange}
//                     />
//                     <label htmlFor="rememberMe">Remember me</label>
//                   </div>
//                   <a className="primary" href="#">
//                     Forgot password?
//                   </a>
//                 </div>
//                 <div className="d-flex justify-content-center mt-4 text-white">
//                   <button className="primary-outline text-white" type="submit">
//                     Sign In
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// // import React from 'react'

// // export default function SignIn() {
// //   return (
// //     <>
// //       <section className="signin">
// //   <div className="signin-inner">
// //     <div className="row d-flex align-items-center g-3">
// //       <div className="col-md-5">
// //         <div className="signin-left">
// //           <a href="index.html">
// //             <img
// //               alt=""
// //               className="img-fluid"
// //               src="./assets/img/signin_logo.png"
// //             />
// //           </a>
// //           <h3 className="text-white pt-4">
// //             Welcome
// //           </h3>
// //           <p className="pb-3 text-white">
// //             Create an account to enjoy all the services without any ads for free!
// //           </p>
// //           <a
// //             className="signin-btn mt-2"
// //             href="signup.html"
// //           >
// //             Sign Up
// //           </a>
// //           <div className="mt-3">
// //             <img
// //               alt="signin"
// //               className="img-fluid"
// //               src="./assets/img/signin.png"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <div className="col-md-7">
// //         <div className="form-wrapper">
// //           <form>
// //             <h4 className="text-center text-white">
// //               Sign In
// //             </h4>
// //             <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
// //               <button className="social-login-button d-flex align-items-center gap-2">
// //                 <i className="ri-facebook-fill" />
// //                 {' '}Sign In With Facebook
// //               </button>
// //               <button className="social-login-button d-flex align-items-center gap-2">
// //                 <i className="ri-google-fill" />
// //                 {' '}Sign In With Google
// //               </button>
// //             </div>
// //             <div className="divider mt-4">
// //               <div className="line" />
// //               <span className="text-white">
// //                 OR
// //               </span>
// //               <div className="line" />
// //             </div>
// //             <label
// //               className="fw-semibold mb-2 mt-3"
// //               htmlFor="password"
// //             >
// //               E-mail
// //             </label>
// //             <input
// //               className="form-control py-2"
// //               id="password"
// //               placeholder="E-mail ........"
// //               type="email"
// //             />
// //             <label
// //               className="fw-semibold mb-2 mt-3"
// //               htmlFor="password"
// //             >
// //               Password
// //             </label>
// //             <input
// //               className="form-control py-2"
// //               id="password"
// //               placeholder="Password ........"
// //               type="password"
// //             />
// //             <div className="mt-2 d-flex justify-content-between flex-wrap gap-2">
// //               <div>
// //                 <input
// //                   id="remember"
// //                   name="remember"
// //                   type="checkbox"
// //                 />
// //                 <label htmlFor="remember">
// //                   Remember me
// //                 </label>
// //               </div>
// //               <a
// //                 className="primary"
// //                 href="#"
// //               >
// //                 Forgot password?
// //               </a>
// //             </div>
// //             <div className="d-flex justify-content-center mt-4">
// //               <button
// //                 className="primary-outline"
// //                 type="submit"
// //               >
// //                 Sign In
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // </section>
// //     </>
// //   )
// // }
