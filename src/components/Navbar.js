import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Full stack</a>
                <button className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            <Link  className="nav-link active" aria-current="page" to="/blog">Blog</Link>
            <Link className='btn btn-outline-light' to="/adduser">Add User</Link>
            </div>
        </nav> */}

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Full stack</a>
                <button className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5 ">
        <li className="nav-item">
        <Link  className="nav-link active mx-2" aria-current="page" to="/">Home</Link>

        </li>
        
        <li className="nav-item">
          <Link  className="nav-link active mx-2" aria-current="page" to="/blog">Blog</Link>
        </li>

      </ul>
      
      <Link className='btn btn-outline-light' to="/adduser">Add User</Link>
     
    </div>
  </div>
</nav>
    </div>
  )
}
