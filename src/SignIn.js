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

<div
  style={{
    backgroundImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/bg6.jpg')",
  }}
>
  <div
    className="container"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/bg5.jpg')",
    }}
  >
    {/* Outer Row */}
    <div className="row justify-content-center">
      <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div
            className="card-body p-0"
            style={{ backgroundColor: "#000033", color: "#fff",  backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')", }}
          >
            {/* Nested Row within Card Body */}
            <div className="row d-flex" style={{ height: "100vh" }}>
              {/* Left Column: Form Section */}
              <div
                className="col-lg-6 d-flex align-items-center justify-content-center"
                style={{
                  padding: "10px",
                }}
              >
                
                <div className="p-5 w-100">
                  <div className="text-center">
                  <img
                    className="sidebar-card-illustration mb-2"
                    src="./../images/dlogo.png"
                    alt="Logo"
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 100,
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')",
                    }}
                  />

                    <h1
                      className="h4 text-white-900 mb-4"
                      style={{
                        padding: 10,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "1.2",
                        paddingBottom: 20,
                        paddingTop: 10,
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./../images/dlogo.png')",
                          backgroundColor:'#000033'
                      }}
                    >
                     Welcome Back
                    </h1>
                  </div>

             
                   
                  {/* Form Section */}
                  <form onSubmit={handleSubmit} className="user w-100">
                    <div className="form-group">
                      <input
                        style={{
                          border: 2,
                          borderColor: "#000033",
                          color: "#000033",
                        }}
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
                          style={{
                            border: 2,
                            borderColor: "#000033",
                            color: "#000033",
                          }}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck"
                          style={{ color: "#fff" }}
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "1.2",
                        paddingBottom: 20,
                        backgroundColor: "#000033",
                      }}
                    >
                      Login
                    </button>
                    <hr />
                  </form>
                </div>
              </div>

              {/* Right Column: Welcome and Logo */}
              <div
                className="col-lg-6 d-flex align-items-center justify-content-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  padding: 20,
                  backgroundColor: "#000033", color: "#fff",
                }}
              >
                <div className="text-center">
                  <img
                    className="sidebar-card-illustration mb-2"
                    src="./../images/dlogo.png"
                    alt="Logo"
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 100,
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')",
                    }}
                  />

                 
                  <div className="text-center">
                    <h1
                      className="h4 text-white-900 mb-4"
                      style={{
                        padding: 10,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "36px",
                        lineHeight: "1.2",
                        paddingBottom: 20,
                        paddingTop: 10,
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./../images/dlogo.png')",
                      }}
                    >
                      Digital PayOut!
                    </h1>
                  </div>

                  <p
                    style={{
                      padding: 10,
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "1.2",
                      paddingTop: 40,
                      borderRadius: 15,
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./../images/dlogo.png')",
                    }}
                  >
                    Digital PayOut is a fully registered <br />
                    investment platform, <br />
                    ensuring transparency, trust, <br />
                    and adherence to global financial regulations.
                  </p>

                  <div className="text-center">
                    <Link
                      className="small"
                      to="/signup"
                      style={{
                        padding: 10,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "1.2",
                        paddingBottom: 20,
                      }}
                    >
                      Sign Up!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End Row */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
