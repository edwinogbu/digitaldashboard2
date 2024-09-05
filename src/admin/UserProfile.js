import React from 'react'

export default function UserProfile() {
  return (
    <>

    <div className="container-fluid main-content settings px-2 px-lg-4">
      <div className="row my-2 g-3 g-lg-4 pb-3 settings-inner">
        <div className="col-sm-6 col-lg-5 col-xl-4 col-xxl-3">
          <div className="profile">
            <div className="profile-img">
              <img
                alt=""
                src="./assets/img/profile.png"
              />
              <div className="add-photo">
                <span className="material-symbols-outlined primary">
                  add_a_photo
                </span>
              </div>
            </div>
            <h4 className="text-white fw-semibold text-center mt-3 mb-1">
              Kim Griffith
            </h4>
            <span className="pb-3 d-block d-border text-center">
              Amet minim Developer
            </span>
            <h6 className="mt-3">
              BIO
            </h6>
            <p className="d-border pb-3">
              Fusce quis tempor augue, congue mollis lorem. Donec et tristique massa, a                consectetur risus
            </p>
            <h6 className="fw-semibold">
              Social media
            </h6>
            <div className="social-icons pt-1">
              <a href="#">
                <i className="ri-facebook-fill" />
              </a>
              <a href="#">
                <i className="ri-twitter-fill" />
              </a>
              <a href="#">
                <i className="ri-instagram-line" />
              </a>
              <a href="#">
                <i className="ri-linkedin-fill" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-7 col-xl-8 col-xxl-9">
          <div className="settings-tab">
            <ul
              className="nav nav-pills"
              id="pills-tab"
              role="tablist"
            >
              <li
                className="nav-item"
                role="presentation"
              >
                <button
                  className="nav-link active"
                  data-bs-target="#pills-profile"
                  data-bs-toggle="pill"
                  id="pills-profile-tab"
                  role="tab"
                  type="button"
                >
                  Profile
                </button>
              </li>
              <li
                className="nav-item"
                role="presentation"
              >
                <button
                  className="nav-link"
                  data-bs-target="#pills-password"
                  data-bs-toggle="pill"
                  id="pills-password-tab"
                  role="tab"
                  type="button"
                >
                  Change Password
                </button>
              </li>
              <li
                className="nav-item"
                role="presentation"
              >
                <button
                  className="nav-link"
                  data-bs-target="#pills-two-factor"
                  data-bs-toggle="pill"
                  id="pills-two-factor-tab"
                  role="tab"
                  type="button"
                >
                  Two-factor
                </button>
              </li>
              <li
                className="nav-item"
                role="presentation"
              >
                <button
                  className="nav-link"
                  data-bs-target="#pills-login"
                  data-bs-toggle="pill"
                  id="pills-login-tab"
                  role="tab"
                  type="button"
                >
                  Login Device History
                </button>
              </li>
            </ul>
            <div
              className="tab-content pt-2"
              id="pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="pills-profile"
                role="tabpanel"
                tabIndex="0"
              >
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="fname"
                      >
                        First Name
                      </label>
                      <input
                        className="form-control"
                        id="fname"
                        placeholder="First Name........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="lname"
                      >
                        last Name
                      </label>
                      <input
                        className="form-control"
                        id="lname"
                        placeholder="Last Name........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        placeholder="Email Address........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        id="phone"
                        placeholder="Phone Number........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="date"
                      >
                        Joining Date
                      </label>
                      <input
                        className="form-control"
                        id="date"
                        placeholder="Joining Date........"
                        type="date"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        className="form-control"
                        id="city"
                        placeholder="City ........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="country"
                      >
                        Country{' '}
                      </label>
                      <input
                        className="form-control"
                        id="country"
                        placeholder="Country ........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="zip"
                      >
                        Zip Code
                      </label>
                      <input
                        className="form-control"
                        id="zip"
                        placeholder="Zip Code........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="fw-semibold mb-2 mt-3">
                        Deposit Assets
                      </label>
                      <select className="form-select">
                        <option value="0">
                          Disabled
                        </option>
                        <option value="2500">
                          $2500
                        </option>
                        <option value="3000">
                          $3000
                        </option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="fw-semibold mb-2 mt-3">
                        Withdraw Assets
                      </label>
                      <select className="form-select">
                        <option value="0">
                          Enabled 111,000 USD/Day
                        </option>
                        <option value="2500">
                          $2500
                        </option>
                        <option value="3000">
                          $3000
                        </option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="fw-semibold  mt-3">
                        Description
                      </label>
                      <textarea
                        className="form-control mt-3"
                        cols="30"
                        placeholder="Description......."
                        rows="6"
                      />
                    </div>
                    <div className="col-12">
                      <label className="fw-semibold mb-2 mt-3">
                        Deposit Assets
                      </label>
                      <div className="deposit-assets">
                        <input
                          id="promotion"
                          type="checkbox"
                        />
                        <label
                          className="medium mb-2"
                          htmlFor="promotion"
                        >
                          Promotions
                        </label>
                        {' '}
                        <br />
                        <input
                          id="exchange"
                          type="checkbox"
                        />
                        <label
                          className="medium mb-2"
                          htmlFor="exchange"
                        >
                          Exchange
                        </label>
                        {' '}
                        <br />
                        <input
                          id="withdrawls"
                          type="checkbox"
                        />
                        <label
                          className="medium"
                          htmlFor="withdrawls"
                        >
                          Withdrawls
                        </label>
                        {' '}
                        <br />
                      </div>
                      <div className="mt-4 d-flex gap-3">
                        <button
                          className="primary-btn-lg"
                          type="submit"
                        >
                          Update
                        </button>
                        <button
                          className="secondary-btn-lg"
                          type="reset"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="pills-password"
                role="tabpanel"
                tabIndex="0"
              >
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="password"
                      >
                        Current Password
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        placeholder="Current Password........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="newpass"
                      >
                        New Password
                      </label>
                      <input
                        className="form-control"
                        id="newpass"
                        placeholder="New Passsword........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="fw-semibold mb-2 mt-3"
                        htmlFor="confirmpass"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        id="confirmpass"
                        placeholder="Confirm Password........"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <button
                        className="primary-btn-lg mt-3"
                        type="submit"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="pills-two-factor"
                role="tabpanel"
                tabIndex="0"
              >
                <div className="d-flex flex-wrap gap-4 align-items-center mt-3">
                  <div className="d-flex flex-column qr-code flex-shrink-0">
                    <div>
                      <img
                        alt=""
                        className="img-fluid"
                        src="./assets/img/qrcode.png"
                      />
                    </div>
                    <span className="fw-bold text-white large mt-2 text-center">
                      Scan Code
                    </span>
                  </div>
                  <div>
                    <span className="fw-bold text-white medium mb-3">
                      Enter the six-digit code from the application
                    </span>
                    <br />
                    <p className="medium">
                      After scanning the image, the app will display a six-digit code that you can                        enter below
                    </p>
                    <div className="otp mb-2">
                      <input
                        className="otp-input"
                        maxLength="1"
                        placeholder="0"
                        type="number"
                      />
                      <input
                        className="otp-input"
                        maxLength="1"
                        placeholder="0"
                        type="number"
                      />
                      <input
                        className="otp-input"
                        maxLength="1"
                        placeholder="0"
                        type="number"
                      />
                      <input
                        className="otp-input"
                        maxLength="1"
                        placeholder="0"
                        type="number"
                      />
                      <input
                        className="otp-input"
                        maxLength="1"
                        placeholder="0"
                        type="number"
                      />
                      <input
                        className="otp-input"
                        maxLength="1"
                        placeholder="0"
                        type="number"
                      />
                    </div>
                    <p>
                      Enter six-digit code
                    </p>
                    <a
                      className="primary-btn-lg mt-2"
                      href="#"
                    >
                      Download 2FA App
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-login"
                role="tabpanel"
                tabIndex="0"
              >
                <div className="recent-contact pb-2 pt-3">
                  <h5 className="fw-semibold">
                    Login Device History
                  </h5>
                  <table>
                    <thead>
                      <tr className="border-b2">
                        <th className="fw-bold">
                          Date/Time
                        </th>
                        <th className="fw-bold">
                          Device List
                        </th>
                        <th className="fw-bold">
                          Location
                        </th>
                        <th className="fw-bold">
                          IP Address
                        </th>
                        <th className="fw-bold">
                          Active Device
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="primary-dot" />
                          {' '}Active
                        </td>
                      </tr>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="secondary-dot" />
                          {' '}Unactive
                        </td>
                      </tr>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="primary-dot" />
                          {' '}Active
                        </td>
                      </tr>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="secondary-dot" />
                          {' '}Unactive
                        </td>
                      </tr>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="secondary-dot" />
                          {' '}Unactive
                        </td>
                      </tr>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="primary-dot" />
                          {' '}Active
                        </td>
                      </tr>
                      <tr className="border-b2">
                        <td>
                          Dec 2, 1:30pm
                        </td>
                        <td>
                          iMac Pro
                        </td>
                        <td>
                          United States
                        </td>
                        <td>
                          179.122.37.231
                        </td>
                        <td>
                          <span className="secondary-dot" />
                          {' '}Unactive
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 g-3 g-lg-4 top-border footer">
        <div className="col-lg-6">
          <span className="text-center text-lg-start d-block w-100">
            Copyright © 2023. All Rights Reserved By
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

    </>
  )
}
