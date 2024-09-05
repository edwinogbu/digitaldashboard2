import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'Your account has been created successfully!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard/home'); // Redirect to the dashboard after successful signup
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'There was a problem creating your account. Please try again.',
      });
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="container bg-gradient-primary" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/bg5.jpg')" }}>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-signup-image" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/signup-image.jpg')" }}></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-white-900 mb-4 text-white" style={{color:'#fff'}}>Create an Account!</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          style={{border:2, borderColor:'#000033', color:'#000033'}}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          style={{border:2, borderColor:'#000033', color:'#000033'}}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          style={{border:2, borderColor:'#000033', color:'#000033'}}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          className="form-control form-control-user"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          style={{border:2, borderColor:'#000033', color:'#000033'}}
                          required
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
                          style={{border:2, borderColor:'#000033', color:'#000033'}}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block" style={{color:'#fff'}}>
                        Sign Up
                      </button>
                      <hr />
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/signin" style={{color:'#fff'}}>Already have an account? Sign In!</Link>
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
// import Swal from 'sweetalert2';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Update the import path if needed

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: '',
//         role: 'user', // Default role or modify as needed
//         termsAccepted: false
//     });

//     const [loading, setLoading] = useState(false);
//     const { register } = useAuth(); // Destructure register from useAuth
//     const navigate = useNavigate(); // Hook for navigation

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission behavior
//         if (!formData.termsAccepted) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Terms Not Accepted',
//                 text: 'You must accept the terms and conditions to register.',
//             });
//             return;
//         }

//         setLoading(true);

//         try {
//             await register({
//                 firstName: formData.firstName,
//                 lastName: formData.lastName,
//                 email: formData.email,
//                 phone: formData.phone,
//                 password: formData.password,
//                 role: formData.role
//             });

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Registration Successful',
//                 text: 'You have successfully registered!',
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     navigate('/dashboard/home'); // Redirect to the login page after successful registration
//                 }
//             });

//             // Reset form data after successful registration
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 phone: '',
//                 password: '',
//                 role: 'user',
//                 termsAccepted: false
//             });

//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Registration Failed',
//                 text: error.message || 'Something went wrong!',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container bg-gradient-primary">
//             <div className="row justify-content-center">
//                 <div className="col-xl-10 col-lg-12 col-md-9">
//                     <div className="card o-hidden border-0 shadow-lg my-5">
//                         <div className="card-body p-0">
//                             <div className="row">
//                                 <div className="col-lg-6 d-none d-lg-block bg-register-image"></div>
//                                 <div className="col-lg-6">
//                                     <div className="p-5">
//                                         <div className="text-center">
//                                             <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
//                                         </div>
//                                         <form onSubmit={handleSubmit} className="user">
//                                             <div className="form-group">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control form-control-user"
//                                                     name="firstName"
//                                                     value={formData.firstName}
//                                                     onChange={handleChange}
//                                                     placeholder="First Name"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="form-group">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control form-control-user"
//                                                     name="lastName"
//                                                     value={formData.lastName}
//                                                     onChange={handleChange}
//                                                     placeholder="Last Name"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="form-group">
//                                                 <input
//                                                     type="email"
//                                                     className="form-control form-control-user"
//                                                     name="email"
//                                                     value={formData.email}
//                                                     onChange={handleChange}
//                                                     placeholder="Email Address"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="form-group">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control form-control-user"
//                                                     name="phone"
//                                                     value={formData.phone}
//                                                     onChange={handleChange}
//                                                     placeholder="Phone Number"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="form-group">
//                                                 <input
//                                                     type="password"
//                                                     className="form-control form-control-user"
//                                                     name="password"
//                                                     value={formData.password}
//                                                     onChange={handleChange}
//                                                     placeholder="Password"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="form-group">
//                                                 <div className="custom-control custom-checkbox small">
//                                                     <input
//                                                         type="checkbox"
//                                                         className="custom-control-input"
//                                                         name="termsAccepted"
//                                                         checked={formData.termsAccepted}
//                                                         onChange={handleChange}
//                                                         id="customCheck"
//                                                         required
//                                                     />
//                                                     <label className="custom-control-label" htmlFor="customCheck">
//                                                         I accept the terms and conditions
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                             <button type="submit" className="btn btn-primary btn-user btn-block" disabled={loading}>
//                                                 {loading ? 'Registering...' : 'Register Account'}
//                                             </button>
//                                         </form>
//                                         <hr />
//                                         <div className="text-center">
//                                             <Link className="small" to="/forgot-password">Forgot Password?</Link>
//                                         </div>
//                                         <div className="text-center">
//                                             <Link className="small" to="/login">Already have an account? Login!</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;


// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Update the import path if needed

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: '',
//         role: 'user', // Default role or modify as needed
//         termsAccepted: false
//     });

//     const [loading, setLoading] = useState(false);
//     const { register } = useAuth(); // Destructure register from useAuth
//     const navigate = useNavigate(); // Hook for navigation

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission behavior
//         if (!formData.termsAccepted) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Terms Not Accepted',
//                 text: 'You must accept the terms and conditions to register.',
//             });
//             return;
//         }

//         setLoading(true);

//         try {
//             await register({
//                 firstName: formData.firstName,
//                 lastName: formData.lastName,
//                 email: formData.email,
//                 phone: formData.phone,
//                 password: formData.password,
//                 role: formData.role
//             });

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Registration Successful',
//                 text: 'You have successfully registered!',
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     // navigate('/dashboard/home'); // Redirect to the dashboard
//                     navigate('/login'); 
//                 }
//             });

//             // Reset form data after successful registration
//             setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 phone: '',
//                 password: '',
//                 role: 'user',
//                 termsAccepted: false
//             });

//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Registration Failed',
//                 text: error.message || 'Something went wrong!',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="signin">
//             <div className="signin-inner">
//                 <div className="row d-flex align-items-center g-3">
//                     <div className="col-md-5">
//                         <div className="signin-left">
//                             <Link to="/">
//                                 <img alt="" className="img-fluid" src="./assets/img/signin_logo.png" />
//                             </Link>
//                             <Link className="btn btn-outline-light mt-2 rounded-5" to="/">
//                                 Back To Home
//                             </Link>
//                             <h3 className="text-white pt-4">Welcome</h3>
//                             <p className="pb-4 text-white">Already Have An Account? Sign In</p>
//                             <Link className="signin-btn" to="/login">
//                                 Sign In
//                             </Link>
//                             <div className="mt-3">
//                                 <img alt="signin" className="img-fluid" src="./assets/img/signin.png" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-7">
//                         <div className="form-wrapper">
//                             <form onSubmit={handleSubmit}>
//                                 <h4 className="text-center text-white">Sign Up</h4>
//                                 <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
//                                     {/* <button className="social-login-button d-flex align-items-center gap-2" type="button">
//                                         <i className="ri-facebook-fill" /> Sign Up With Facebook
//                                     </button>
//                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
//                                         <i className="ri-facebook-fill" /> Sign Up With Facebook
//                                     </button> */}
                                    
//                                     <Link className="social-login-button d-flex align-items-center gap-2" to="/login">
//                                         <i className="ri-google-fill" />Sign In
//                                     </Link>
//                                 </div>
//                                 <div className="divider mt-4">
//                                     <div className="line" />
//                                     <span className="text-white">OR</span>
//                                     <div className="line" />
//                                 </div>
//                                 <label className="fw-semibold mb-2 mt-3" htmlFor="firstName">
//                                     First Name
//                                 </label>
//                                 <input
//                                     className="form-control py-2"
//                                     id="firstName"
//                                     name="firstName"
//                                     placeholder="First Name ........"
//                                     type="text"
//                                     value={formData.firstName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <label className="fw-semibold mb-2 mt-3" htmlFor="lastName">
//                                     Last Name
//                                 </label>
//                                 <input
//                                     className="form-control py-2"
//                                     id="lastName"
//                                     name="lastName"
//                                     placeholder="Last Name ........"
//                                     type="text"
//                                     value={formData.lastName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <label className="fw-semibold mb-2 mt-3" htmlFor="email">
//                                     E-mail
//                                 </label>
//                                 <input
//                                     className="form-control py-2"
//                                     id="email"
//                                     name="email"
//                                     placeholder="E-mail ........"
//                                     type="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <label className="fw-semibold mb-2 mt-3" htmlFor="phone">
//                                     Phone
//                                 </label>
//                                 <input
//                                     className="form-control py-2"
//                                     id="phone"
//                                     name="phone"
//                                     placeholder="Phone ........"
//                                     type="text"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <label className="fw-semibold mb-2 mt-3" htmlFor="password">
//                                     Password
//                                 </label>
//                                 <input
//                                     className="form-control py-2"
//                                     id="password"
//                                     name="password"
//                                     placeholder="Password ........"
//                                     type="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <div className="mt-2">
//                                     <input
//                                         id="termsAccepted"
//                                         name="termsAccepted"
//                                         type="checkbox"
//                                         checked={formData.termsAccepted}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <label htmlFor="termsAccepted mt-4 p-4">I accept the terms and conditions</label>
//                                 </div>
//                                 <div className="d-flex justify-content-center mt-4">
//                                     <button className="primary-outline" type="submit" disabled={loading}>
//                                         {loading ? 'Signing Up...' : 'Sign Up'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SignUp;


// // import React, { useState } from 'react';
// // import Swal from 'sweetalert2';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from './AuthContext'; // Update the import path if needed

// // const SignUp = () => {
// //     const [formData, setFormData] = useState({
// //         firstName: '',
// //         lastName: '',
// //         email: '',
// //         phone: '',
// //         password: '',
// //         role: 'user', // Default role or modify as needed
// //         termsAccepted: false
// //     });

// //     const [loading, setLoading] = useState(false);
// //     const { register } = useAuth(); // Destructure register from useAuth
// //     const navigate = useNavigate(); // Hook for navigation

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: type === 'checkbox' ? checked : value
// //         });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!formData.termsAccepted) {
// //             Swal.fire({
// //                 icon: 'warning',
// //                 title: 'Terms Not Accepted',
// //                 text: 'You must accept the terms and conditions to register.',
// //             });
// //             return;
// //         }

// //         setLoading(true);

// //         try {
// //             const result = await register({
// //                 firstName: formData.firstName,
// //                 lastName: formData.lastName,
// //                 email: formData.email,
// //                 phone: formData.phone,
// //                 password: formData.password,
// //                 role: formData.role
// //             });

// //             Swal.fire({
// //                 icon: 'success',
// //                 title: 'Registration Successful',
// //                 text: 'You have successfully registered!',
// //             }).then((result) => {
// //                 if (result.isConfirmed) {
// //                     navigate('/dashboard/home'); // Redirect to the dashboard
// //                 }
// //             });

// //             // Reset form data after successful registration
// //             setFormData({
// //                 firstName: '',
// //                 lastName: '',
// //                 email: '',
// //                 phone: '',
// //                 password: '',
// //                 role: 'user',
// //                 termsAccepted: false
// //             });

// //         } catch (error) {
// //             Swal.fire({
// //                 icon: 'error',
// //                 title: 'Registration Failed',
// //                 text: error.message || 'Something went wrong!',
// //             });
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <section className="signin">
// //             <div className="signin-inner">
// //                 <div className="row d-flex align-items-center g-3">
// //                     <div className="col-md-5">
// //                         <div className="signin-left">
// //                             <Link to="/">
// //                                 <img alt="" className="img-fluid" src="./assets/img/signin_logo.png" />
// //                             </Link>
// //                             <Link className="btn btn-outline-light mt-2 rounded-5" to="/">
// //                                 Back To Home
// //                             </Link>
// //                             <h3 className="text-white pt-4">Welcome</h3>
// //                             <p className="pb-4 text-white">Already Have An Account? Sign In</p>
// //                             <Link className="signin-btn" to="/login">
// //                                 Sign In
// //                             </Link>
// //                             <div className="mt-3">
// //                                 <img alt="signin" className="img-fluid" src="./assets/img/signin.png" />
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="col-md-7">
// //                         <div className="form-wrapper">
// //                             <form onSubmit={handleSubmit}>
// //                                 <h4 className="text-center text-white">Sign Up</h4>
// //                                 <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
// //                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                                         <i className="ri-facebook-fill" /> Sign Up With Facebook
// //                                     </button>
// //                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                                         <i className="ri-google-fill" /> Sign Up With Google
// //                                     </button>
// //                                 </div>
// //                                 <div className="divider mt-4">
// //                                     <div className="line" />
// //                                     <span className="text-white">OR</span>
// //                                     <div className="line" />
// //                                 </div>
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="firstName">
// //                                     First Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="firstName"
// //                                     name="firstName"
// //                                     placeholder="First Name ........"
// //                                     type="text"
// //                                     value={formData.firstName}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="lastName">
// //                                     Last Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="lastName"
// //                                     name="lastName"
// //                                     placeholder="Last Name ........"
// //                                     type="text"
// //                                     value={formData.lastName}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="email">
// //                                     E-mail
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="email"
// //                                     name="email"
// //                                     placeholder="E-mail ........"
// //                                     type="email"
// //                                     value={formData.email}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="phone">
// //                                     Phone
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="phone"
// //                                     name="phone"
// //                                     placeholder="Phone ........"
// //                                     type="text"
// //                                     value={formData.phone}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="password">
// //                                     Password
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="password"
// //                                     name="password"
// //                                     placeholder="Password ........"
// //                                     type="password"
// //                                     value={formData.password}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <div className="mt-2">
// //                                     <input
// //                                         id="termsAccepted"
// //                                         name="termsAccepted"
// //                                         type="checkbox"
// //                                         checked={formData.termsAccepted}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                     <label htmlFor="termsAccepted">I accept the terms and conditions</label>
// //                                 </div>
// //                                 <div className="d-flex justify-content-center mt-4">
// //                                     <button className="primary-outline" type="submit" disabled={loading}>
// //                                         {loading ? 'Signing Up...' : 'Sign Up'}
// //                                     </button>
// //                                 </div>
// //                             </form>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default SignUp;


// // import React, { useState } from 'react';
// // import Swal from 'sweetalert2';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from './AuthContext'; // Update the import path if needed

// // const SignUp = () => {
// //     const [formData, setFormData] = useState({
// //         firstName: '',
// //         lastName: '',
// //         email: '',
// //         phone: '',
// //         password: '',
// //         role: 'user', // Default role or modify as needed
// //         termsAccepted: false
// //     });

// //     const [loading, setLoading] = useState(false);
// //     const { register } = useAuth(); // Destructure register from useAuth

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: type === 'checkbox' ? checked : value
// //         });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!formData.termsAccepted) {
// //             Swal.fire({
// //                 icon: 'warning',
// //                 title: 'Terms Not Accepted',
// //                 text: 'You must accept the terms and conditions to register.',
// //             });
// //             return;
// //         }

// //         setLoading(true);

// //         try {
// //             await register({
// //                 firstName: formData.firstName,
// //                 lastName: formData.lastName,
// //                 email: formData.email,
// //                 phone: formData.phone,
// //                 password: formData.password,
// //                 role: formData.role
// //             });
// //             Swal.fire({
// //                 icon: 'success',
// //                 title: 'Registration Successful',
// //                 text: 'You have successfully registered!',
// //             });
// //             setFormData({
// //                 firstName: '',
// //                 lastName: '',
// //                 email: '',
// //                 phone: '',
// //                 password: '',
// //                 role: 'user',
// //                 termsAccepted: false
// //             });
// //         } catch (error) {
// //             Swal.fire({
// //                 icon: 'error',
// //                 title: 'Registration Failed',
// //                 text: error.message || 'Something went wrong!',
// //             });
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <section className="signin">
// //             <div className="signin-inner">
// //                 <div className="row d-flex align-items-center g-3">
// //                     <div className="col-md-5">
// //                         <div className="signin-left">
// //                             <Link to="/">
// //                                 <img alt="" className="img-fluid" src="./assets/img/signin_logo.png" />
// //                             </Link>
// //                             <Link className="btn btn-outline-light mt-2 rounded-5" to="/">
// //                                 Back To Home
// //                             </Link>
// //                             <h3 className="text-white pt-4">Welcome</h3>
// //                             <p className="pb-4 text-white">Already Have An Account? Sign In</p>
// //                             <Link className="signin-btn" to="/login">
// //                                 Sign In
// //                             </Link>
// //                             <div className="mt-3">
// //                                 <img alt="signin" className="img-fluid" src="./assets/img/signin.png" />
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="col-md-7">
// //                         <div className="form-wrapper">
// //                             <form onSubmit={handleSubmit}>
// //                                 <h4 className="text-center text-white">Sign Up</h4>
// //                                 <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
// //                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                                         <i className="ri-facebook-fill" /> Sign Up With Facebook
// //                                     </button>
// //                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                                         <i className="ri-google-fill" /> Sign Up With Google
// //                                     </button>
// //                                 </div>
// //                                 <div className="divider mt-4">
// //                                     <div className="line" />
// //                                     <span className="text-white">OR</span>
// //                                     <div className="line" />
// //                                 </div>
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="firstName">
// //                                     First Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="firstName"
// //                                     name="firstName"
// //                                     placeholder="First Name ........"
// //                                     type="text"
// //                                     value={formData.firstName}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="lastName">
// //                                     Last Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="lastName"
// //                                     name="lastName"
// //                                     placeholder="Last Name ........"
// //                                     type="text"
// //                                     value={formData.lastName}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="email">
// //                                     E-mail
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="email"
// //                                     name="email"
// //                                     placeholder="E-mail ........"
// //                                     type="email"
// //                                     value={formData.email}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="phone">
// //                                     Phone
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="phone"
// //                                     name="phone"
// //                                     placeholder="Phone ........"
// //                                     type="text"
// //                                     value={formData.phone}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="password">
// //                                     Password
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="password"
// //                                     name="password"
// //                                     placeholder="Password ........"
// //                                     type="password"
// //                                     value={formData.password}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <div className="mt-2">
// //                                     <input
// //                                         id="termsAccepted"
// //                                         name="termsAccepted"
// //                                         type="checkbox"
// //                                         checked={formData.termsAccepted}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                     <label htmlFor="termsAccepted">I accept the terms and conditions</label>
// //                                 </div>
// //                                 <div className="d-flex justify-content-center mt-4">
// //                                     <button className="primary-outline" type="submit" disabled={loading}>
// //                                         {loading ? 'Signing Up...' : 'Sign Up'}
// //                                     </button>
// //                                 </div>
// //                             </form>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default SignUp;


// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { Link } from 'react-router-dom';

// // const SignUp = () => {
// //     const [formData, setFormData] = useState({
// //         firstName: '',
// //         lastName: '',
// //         email: '',
// //         phone: '',
// //         password: '',
// //         role: 'user', 
// //         termsAccepted: false
// //     });

// //     const [loading, setLoading] = useState(false);

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: type === 'checkbox' ? checked : value
// //         });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!formData.termsAccepted) {
// //             Swal.fire({
// //                 icon: 'warning',
// //                 title: 'Terms Not Accepted',
// //                 text: 'You must accept the terms and conditions to register.',
// //             });
// //             return;
// //         }

// //         setLoading(true);

// //         try {
// //             const response = await axios.post('http://localhost:3005/api/auth/register', {
// //                 firstName: formData.firstName,
// //                 lastName: formData.lastName,
// //                 email: formData.email,
// //                 phone: formData.phone,
// //                 password: formData.password,
// //                 role: formData.role
// //             });

// //             if (response.data.success) {
// //                 Swal.fire({
// //                     icon: 'success',
// //                     title: 'Registration Successful',
// //                     text: response.data.message,
// //                 });
// //                 setFormData({
// //                     firstName: '',
// //                     lastName: '',
// //                     email: '',
// //                     phone: '',
// //                     password: '',
// //                     role: 'user',
// //                     termsAccepted: false
// //                 });
// //             } else {
// //                 Swal.fire({
// //                     icon: 'error',
// //                     title: 'Registration Failed',
// //                     text: response.data.message,
// //                 });
// //             }
// //         } catch (error) {
// //             Swal.fire({
// //                 icon: 'error',
// //                 title: 'An Error Occurred',
// //                 text: error.response?.data?.message || 'Something went wrong!',
// //             });
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <section className="signin">
// //             <div className="signin-inner">
// //                 <div className="row d-flex align-items-center g-3">
// //                     <div className="col-md-5">
// //                         <div className="signin-left">
// //                             <Link to="/">
// //                                 <img alt="" className="img-fluid" src="./assets/img/signin_logo.png" />
// //                             </Link>
// //                             <Link className="btn btn-outline-light mt-2 rounded-5" to="/">
// //                                 Back To Home
// //                             </Link>
// //                             <h3 className="text-white pt-4">Welcome</h3>
// //                             <p className="pb-4 text-white">Already Have An Account? Sign In</p>
// //                             <Link className="signin-btn" to="/login">
// //                                 Sign In
// //                             </Link>
// //                             <div className="mt-3">
// //                                 <img alt="signin" className="img-fluid" src="./assets/img/signin.png" />
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="col-md-7">
// //                         <div className="form-wrapper">
// //                             <form onSubmit={handleSubmit}>
// //                                 <h4 className="text-center text-white">Sign Up</h4>
// //                                 <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
// //                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                                         <i className="ri-facebook-fill" /> Sign Up With Facebook
// //                                     </button>
// //                                     <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                                         <i className="ri-google-fill" /> Sign Up With Google
// //                                     </button>
// //                                 </div>
// //                                 <div className="divider mt-4">
// //                                     <div className="line" />
// //                                     <span className="text-white">OR</span>
// //                                     <div className="line" />
// //                                 </div>
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="firstName">
// //                                     First Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="firstName"
// //                                     name="firstName"
// //                                     placeholder="First Name ........"
// //                                     type="text"
// //                                     value={formData.firstName}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="lastName">
// //                                     Last Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="lastName"
// //                                     name="lastName"
// //                                     placeholder="Last Name ........"
// //                                     type="text"
// //                                     value={formData.lastName}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="email">
// //                                     E-mail
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="email"
// //                                     name="email"
// //                                     placeholder="E-mail ........"
// //                                     type="email"
// //                                     value={formData.email}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="phone">
// //                                     Phone
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="phone"
// //                                     name="phone"
// //                                     placeholder="Phone ........"
// //                                     type="text"
// //                                     value={formData.phone}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <label className="fw-semibold mb-2 mt-3" htmlFor="password">
// //                                     Password
// //                                 </label>
// //                                 <input
// //                                     className="form-control py-2"
// //                                     id="password"
// //                                     name="password"
// //                                     placeholder="Password ........"
// //                                     type="password"
// //                                     value={formData.password}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                                 <div className="mt-2">
// //                                     <input
// //                                         id="termsAccepted"
// //                                         name="termsAccepted"
// //                                         type="checkbox"
// //                                         checked={formData.termsAccepted}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                     <label htmlFor="termsAccepted">I accept the terms and conditions</label>
// //                                 </div>
// //                                 <div className="d-flex justify-content-center mt-4">
// //                                     <button className="primary-outline" type="submit" disabled={loading}>
// //                                         {loading ? 'Signing Up...' : 'Sign Up'}
// //                                     </button>
// //                                 </div>
// //                             </form>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default SignUp;


// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from './AuthContext';

// // export default function SignUp() {
// //   const [formData, setFormData] = useState({
// //     fullname: '',
// //     email: '',
// //     password: '',
// //     mobile: '',
// //     termsAccepted: false,
// //   });

// //   const { register } = useAuth();
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'checkbox' ? checked : value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await register(formData);
// //       navigate('/dashboard'); // Redirect to the dashboard or any other route
// //     } catch (error) {
// //       console.error('Registration failed:', error);
// //       // Handle error (e.g., display error message)
// //     }
// //   };

// //   return (
// //     <section className="signin">
// //       <div className="signin-inner">
// //         <div className="row d-flex align-items-center g-3">
// //           <div className="col-md-5">
// //             <div className="signin-left">
// //               <Link to="/">
// //                 <img alt="" className="img-fluid" src="./assets/img/signin_logo.png" />
// //               </Link>
// //               <Link className="btn btn-outline-light mt-2 rounded-5" to='/'>
// //                 Back To Home
// //               </Link>
// //               <h3 className="text-white pt-4">Welcome</h3>
// //               <p className="pb-4 text-white">Already Have An Account? Sign In</p>
// //               <Link className="signin-btn" to="/login">
// //                 Sign In
// //               </Link>
// //               <div className="mt-3">
// //                 <img alt="signin" className="img-fluid" src="./assets/img/signin.png" />
// //               </div>
// //             </div>
// //           </div>
// //           <div className="col-md-7">
// //             <div className="form-wrapper">
// //               <form onSubmit={handleSubmit}>
// //                 <h4 className="text-center text-white">Sign Up</h4>
// //                 <div className="d-flex gap-2 flex-wrap justify-content-center pt-4">
// //                   <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                     <i className="ri-facebook-fill" /> Sign In With Facebook
// //                   </button>
// //                   <button className="social-login-button d-flex align-items-center gap-2" type="button">
// //                     <i className="ri-google-fill" /> Sign In With Google
// //                   </button>
// //                 </div>
// //                 <div className="divider mt-4">
// //                   <div className="line" />
// //                   <span className="text-white">OR</span>
// //                   <div className="line" />
// //                 </div>
// //                 <label className="fw-semibold mb-2 mt-3" htmlFor="fullname">
// //                   Full Name
// //                 </label>
// //                 <input
// //                   className="form-control py-2"
// //                   id="fullname"
// //                   name="fullname"
// //                   placeholder="Full Name ........"
// //                   type="text"
// //                   value={formData.fullname}
// //                   onChange={handleChange}
// //                 />
// //                 <label className="fw-semibold mb-2 mt-3" htmlFor="email">
// //                   E-mail
// //                 </label>
// //                 <input
// //                   className="form-control py-2"
// //                   id="email"
// //                   name="email"
// //                   placeholder="E-mail ........"
// //                   type="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                 />
// //                 <label className="fw-semibold mb-2 mt-3" htmlFor="password">
// //                   Password
// //                 </label>
// //                 <input
// //                   className="form-control py-2"
// //                   id="password"
// //                   name="password"
// //                   placeholder="Password ........"
// //                   type="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                 />
// //                 <label className="fw-semibold mb-2 mt-3" htmlFor="mobile">
// //                   Mobile
// //                 </label>
// //                 <input
// //                   className="form-control py-2"
// //                   id="mobile"
// //                   name="mobile"
// //                   placeholder="Mobile ........"
// //                   type="text"
// //                   value={formData.mobile}
// //                   onChange={handleChange}
// //                 />
// //                 <div className="mt-2">
// //                   <input
// //                     id="termsAccepted"
// //                     name="termsAccepted"
// //                     type="checkbox"
// //                     checked={formData.termsAccepted}
// //                     onChange={handleChange}
// //                   />
// //                   <label htmlFor="termsAccepted">I accept the terms and conditions</label>
// //                 </div>
// //                 <div className="d-flex justify-content-center mt-4">
// //                   <button className="primary-outline" type="submit">
// //                     Sign Up
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// // import React, { useState } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'
// // import { useAuth } from './AuthContext';

// // export default function SignUp() {
// //   const [formData, setFormData] = useState({
// //     fullname: '',
// //     email: '',
// //     password: '',
// //     mobile: '',
// //     termsAccepted: false,
// //   });

// //   const { register } = useAuth();
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'checkbox' ? checked : value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await register(formData);
// //       navigate('/dashboard'); // Redirect to the dashboard or any other route
// //     } catch (error) {
// //       console.error('Registration failed:', error);
// //       // Handle error (e.g., display error message)
// //     }
// //   };
// //   return (
// //     <>
// //       <section className="signin">
// //   <div className="signin-inner">
// //     <div className="row d-flex align-items-center g-3">
// //       <div className="col-md-5">
// //         <div className="signin-left">
// //           <Link to="/">
// //             <img
// //               alt=""
// //               className="img-fluid"
// //               src="./assets/img/signin_logo.png"
// //             />
// //           </Link>
// //           <Link className="btn btn-outline-light mt-2  rounded-5" to='/'>
// //                 Back To Home
// //               </Link>
// //           <h3 className="text-white pt-4">
// //             Welcome
// //           </h3>
// //           <p className="pb-4 text-white">
// //             Already Have An Account? Sign In
// //           </p>
// //           <Link
// //             className="signin-btn"
// //             to="/login"
// //           >
// //             Sign In
// //           </Link>
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
// //               Sign Up
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
// //               htmlFor="username"
// //             >
// //               User Name
// //             </label>
// //             <input
// //               className="form-control py-2"
// //               id="username"
// //               placeholder="User Name ........"
// //               type="text"
// //             />
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
// //             <div className="mt-2">
// //               <input
// //                 id="remember"
// //                 name="remember"
// //                 type="checkbox"
// //               />
// //               <label htmlFor="remember">
// //                 Remember me
// //               </label>
// //             </div>
// //             <div className="d-flex justify-content-center mt-4">
// //               <button
// //                 className="primary-outline"
// //                 type="submit"
// //               >
// //                 Sign Up
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
