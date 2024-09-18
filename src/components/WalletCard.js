import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaArrowDown, FaWallet, FaLock } from 'react-icons/fa';
import { useAuth } from './../AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './walletCard.css';
import Transactions from '../Transactions';

const WalletCard = () => {
  const { state } = useAuth();
  const user = state?.user?.user;
  const userId = user?.id;
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState({});
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Fetch subscriptions data on component mount
  useEffect(() => {
    if (!userId) {
      Swal.fire('Error', 'User not authenticated', 'error');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
        if (response.data.success) {
          const data = response.data.data;
          console.log('Subscriptions Data:', data);
          setSubscriptions(data.subscriptions || {});
          if (Object.keys(data.subscriptions).length > 0) {
            const firstPlan = Object.keys(data.subscriptions)[0];
            setSelectedSubscription(firstPlan);
            setSelectedPlan(data.subscriptions[firstPlan][0] || null);
            setSelectedWallet(data.wallets[firstPlan]?.[0] || null);
          }

          const currenciesResponse = await axios.get('http://localhost:3005/api/crypto/currencies');
          setCurrencies(currenciesResponse.data.data || []);
          // console.log('====================================');
          // console.log('currencies:', currenciesResponse.data.currencies);
          // console.log('currencies2:', currenciesResponse.data);
          // console.log('currencies3:', currenciesResponse);
          // console.log('====================================');
        } else {
          Swal.fire('Error', response.data.message, 'error');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Failed to fetch data', 'error');
      }
    };

    fetchData();
  }, [userId]);

  // Handle subscription change
  const handleSubscriptionChange = (e) => {
    const planName = e.target.value;
    setSelectedSubscription(planName);
    setSelectedPlan(subscriptions[planName]?.[0] || null); // Update selected plan when a subscription changes
  };

  const handleDepositShow = () => setShowDepositModal(true);
  const handleDepositClose = () => setShowDepositModal(false);
  const handleWithdrawShow = () => setShowWithdrawModal(true);
  const handleWithdrawClose = () => setShowWithdrawModal(false);

  const handleFileChange = (e) => {
    setProofOfPayment(e.target.files[0]);
  };

  // Handle deposit
  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      Swal.fire('Error', 'Please select a valid subscription plan', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('amount', depositAmount);
    formData.append('currencyId', selectedCurrency);
    formData.append('walletId', selectedPlan.deposit.id); // Assuming you're using the deposit ID here
    formData.append('userId', userId);

    if (proofOfPayment) {
      formData.append('proofOfPayment', proofOfPayment);
    }

    try {
      const response = await axios.post('http://localhost:3005/api/crypto/wallet/deposit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        Swal.fire('Success', 'Deposit completed successfully', 'success');
        setShowDepositModal(false);
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Deposit Error:', error);
      Swal.fire('Error', 'Failed to complete the deposit', 'error');
    }
  };

  // Handle withdrawal
  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      Swal.fire('Error', 'Please select a valid subscription plan', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/api/crypto/payout/request', {
        userId,
        walletId: selectedPlan.deposit.id, // Assuming you're using the deposit ID here
        amount: withdrawAmount,
        currencyId: selectedCurrency
      });

      if (response.data.success) {
        Swal.fire('Success', 'Withdrawal completed successfully', 'success');
        setShowWithdrawModal(false);
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Withdrawal Error:', error);
      Swal.fire('Error', 'Failed to complete the withdrawal', 'error');
    }
  };

  return (
    <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
      <div className="row align-items-center justify-content-center" style={{ height: '100%', backgroundColor:'#000033' }}>
        <div className="col-xl-6 col-md-8">
          <img src='../images/golden-coin.jpg' alt='wallet Home'
               style={{ width: "100px", textAlign: "center", fontWeight: "bold" }}
          />
          <div className="card-holder card shadow p-4 mb-5">
            <div className="wallet-widget">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
                <FaWallet size={24} />
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subscription Plan:</span>
                <span><FaLock className="me-2" /> {selectedSubscription}</span>
              </div>

              <Form.Group controlId="subscriptionSelect">
                <Form.Label className="text-primary text-uppercase mb-1" style={{ backgroundColor: "#000033", color: "#fff" }}>
                  Select Subscription Plan
                </Form.Label>
                <Form.Control
                  as="select"
                  style={{ backgroundColor: '#000033', color: '#FFF' }}
                  value={selectedSubscription}
                  onChange={handleSubscriptionChange}
                >
                  {Object.keys(subscriptions).length > 0 ? (
                    Object.keys(subscriptions).map(planName => (
                      <option key={planName} value={planName}>
                        {planName}
                      </option>
                    ))
                  ) : (
                    <option value="">No Plans Available</option>
                  )}
                </Form.Control>
              </Form.Group>

              {selectedPlan && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Deposit Amount</span>
                    <span><FaArrowDown className="me-2 text-success" /> ${selectedPlan.deposit.amount}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Currency</span>
                    <span><FaArrowDown className="me-2 text-success" /> {selectedPlan.currency.currencyName} ({selectedPlan.currency.symbol})</span>
                  </div>
                  <div className="wallet-widget shadow-sm p-3" style={{ backgroundColor: "#000033", color: "#fff", backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./images/golden-coin.jpg')" }}>
                    <p>Total Amount: ${selectedPlan.totalAmount}</p>
                    <p>Plan Start Date: {new Date(selectedPlan.startDate).toLocaleDateString()}</p>
                    <p>Plan End Date: {new Date(selectedPlan.endDate).toLocaleDateString()}</p>
                    <p>Wallet Deposit Status: {selectedPlan.deposit.status}</p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text" style={{color:'green'}}>Total Invested Balance</span>
                      <span style={{color:'green', fontSize:'bold', fontWeight:'bolder'}}><FaArrowDown className="me-2 text-success" style={{color:'green'}}/> ${selectedWallet?.balance || '0.00'}</span>
                    </div>
                    <div className="button-group">
                      <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
                      <Button variant="outline-primary" onClick={handleDepositShow}>Deposit</Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Deposit Modal */}
            <Modal show={showDepositModal} onHide={handleDepositClose}>
              <Modal.Header closeButton>
                <Modal.Title>Deposit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleDeposit}>
                  <Form.Group controlId="depositAmount">
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter deposit amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="currencySelect">
                    <Form.Label>Select Currency</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      required
                    >
                      <option value="">Select Currency</option>
                      {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="proofOfPayment">
                    <Form.Label>Proof of Payment</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Withdraw Modal */}
            <Modal show={showWithdrawModal} onHide={handleWithdrawClose}>
              <Modal.Header closeButton>
                <Modal.Title>Withdraw</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleWithdraw}>
                  <Form.Group controlId="withdrawAmount">
                    <Form.Label>Withdraw Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter withdrawal amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="currencySelect">
                    <Form.Label>Select Currency</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      required
                    >
                      <option value="">Select Currency</option>
                      {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      {/* <Transactions /> */}
    </div>
  );
};

export default WalletCard;
