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
            className="card-body p-0 100vh"
            style={{ backgroundColor: "#000033", color: "#fff",  backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')", }}
          >
            {/* Nested Row within Card Body */}
            <div className="row d-flex" style={{ height: "100%" }}>
              {/* Left Column: Form Section */}
              <div
                className="col-lg-6 d-flex align-items-center justify-content-center"
                style={{
                  padding: "20px",
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
<button type="submit" className="btn  btn-user btn-block" style={{color:'#fff',  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "1.2",
  paddingBottom:20, backgroundColor:'#000033'}}>
  Sign Up
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
                  padding: 10,
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
                      to="/login"
                      style={{
                        padding: 10,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "1.2",
                        paddingBottom: 20,
                      }}
                    >
                     Login In!
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
