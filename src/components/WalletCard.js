import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaArrowDown, FaWallet, FaLock } from 'react-icons/fa';
import { useAuth } from './../AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import './walletCard.css';

const WalletCard = () => {
  const { state } = useAuth();
  const user = state?.user?.user;
  const userId = user?.id;

  const [subscriptions, setSubscriptions] = useState({});
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null); // Subscription plan selected by the user
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [proofOfPayment, setProofOfPayment] = useState(null); // State for file
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Fetch subscriptions data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
        if (response.data.success) {
          const data = response.data.data;
          console.log('Subscriptions Data:', data);
          setSubscriptions(data.subscriptions || {});
          // Automatically set the first available subscription
          if (Object.keys(data.subscriptions).length > 0) {
            const firstPlan = Object.keys(data.subscriptions)[0];
            setSelectedSubscription(firstPlan);
            setSelectedPlan(data.subscriptions[firstPlan][0] || null); // Set the first subscription plan
            setSelectedWallet(data.wallets[firstPlan]?.[0] || null);
          }

          // Fetch currencies
          const currenciesResponse = await axios.get('http://localhost:3005/api/crypto/currencies');
          setCurrencies(currenciesResponse.data.currencies || []);
        } else {
          Swal.fire('Error', response.data.message, 'error');
        }
      } catch (error) {
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
    const response = await axios.post('http://localhost:3005/api/crypto/wallet/withdraw', {
      amount: withdrawAmount,
      walletId: selectedPlan.deposit.id, // Assuming you're using the deposit ID here
      userId: userId
    });

    if (response.data.success) {
      Swal.fire('Success', 'Withdrawal completed successfully', 'success');
      setShowWithdrawModal(false);
    } else {
      Swal.fire('Error', response.data.message, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Failed to complete the withdrawal', 'error');
  }
};


  return (
    <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
      <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
        <div className="col-xl-6 col-md-8">
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
                <Form.Label className="text-primary text-uppercase mb-1">Select Subscription Plan</Form.Label>
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
                  <div className="wallet-widget bg-light shadow-sm p-3">
                    <p>Total Amount: ${selectedPlan.totalAmount}</p>
                    <p>Plan Start Date: {new Date(selectedPlan.startDate).toLocaleDateString()}</p>
                    <p>Plan End Date: {new Date(selectedPlan.endDate).toLocaleDateString()}</p>
                    <p>Wallet Deposit Status: {selectedPlan.deposit.status}</p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                {/* <span className="text-muted" style={{color:'green'}}>Total Invested Balance</span> */}
                <span className="text" style={{color:'green'}}>Total Invested Balance</span>
                <span style={{color:'green', fontSize:'bold', fontWeight:'bolder'}} ><FaArrowDown className="me-2 text-success" style={{color:'green'}}/> ${selectedWallet.balance}</span>
              </div>
                    <div className="button-group">
                      <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
                      <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Deposit Modal */}
          <Modal show={showDepositModal} onHide={handleDepositClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Deposit Funds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleDeposit}>
                <Form.Group controlId="depositAmount">
                  <Form.Label>Enter Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="currencySelect" className="mt-3">
                  <Form.Label>Select Currency</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select currency</option>
                    {currencies.length > 0 ? (
                      currencies.map(currency => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Currencies Available</option>
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="proofOfPayment" className="mt-3">
                  <Form.Label>Upload Proof of Payment</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} required />
                </Form.Group>
                <Button type="submit" className="mt-3 w-100">Confirm Deposit</Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Withdraw Modal */}
          <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Withdraw Funds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleWithdraw}>
                <Form.Group controlId="withdrawAmount">
                  <Form.Label>Enter Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="mt-3 w-100">Confirm Withdrawal</Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;




// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaWallet } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './walletCard.css';

// const WalletCard = () => {
//   const { state } = useAuth();
//   const user = state?.user?.user;
//   const userId = user?.id;

//   const [subscriptions, setSubscriptions] = useState({});
//   const [wallets, setWallets] = useState({});
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [proofOfPayment, setProofOfPayment] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         if (response.data.success) {
//           const data = response.data.data;
//           setSubscriptions(data.subscriptions || {});
//           setWallets(data.wallets || {});

//           if (Object.keys(data.subscriptions).length > 0) {
//             const firstPlan = Object.keys(data.subscriptions)[0];
//             setSelectedSubscription(firstPlan);
//             setSelectedWallet(data.wallets[firstPlan]?.[0] || null);
//           }

//           // Load currencies
//           const currenciesResponse = await axios.get('http://localhost:3005/api/crypto/currencies');
//           setCurrencies(currenciesResponse.data.currencies || []);
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch data', 'error');
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const handleSubscriptionChange = (e) => {
//     const planName = e.target.value;
//     setSelectedSubscription(planName);

//     // Update the selectedWallet based on the selected subscription
//     const correspondingWallet = wallets[planName]?.[0];  // Get the first wallet for the selected subscription
//     setSelectedWallet(correspondingWallet || null);  // Set to null if no wallet is found
//   };

//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

//   return (
//     <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//       <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
//         <div className="col-xl-6 col-md-8">
//           <div className="card-holder card shadow p-4 mb-5">
//             <div className="wallet-widget">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
//                 <FaWallet size={24} />
//               </div>

//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Subscription Plan:</span>
//                 <span>{selectedSubscription}</span>
//               </div>

//               <Form.Group controlId="subscriptionSelect">
//                 <Form.Label className="text-primary text-uppercase mb-1">
//                   Select Subscription Plan
//                 </Form.Label>
//                 <Form.Control
//                   as="select"
//                   style={{ backgroundColor: '#000033', color: '#FFF' }}
//                   value={selectedSubscription}
//                   onChange={handleSubscriptionChange}
//                 >
//                   {Object.keys(subscriptions).length > 0 ? (
//                     Object.keys(subscriptions).map(planName => (
//                       <option key={planName} value={planName}>
//                         {planName}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">No Plans Available</option>
//                   )}
//                 </Form.Control>
//               </Form.Group>

//               {selectedWallet && (
//                 <>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Wallet Balance</span>
//                     <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.balance}</span>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Deposit Amount</span>
//                     <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.deposit.depositAmount}</span>
//                   </div>
//                   <div className="wallet-widget bg-light shadow-sm p-3">
//                     <p>Currency: {selectedWallet.currency.currencyName} ({selectedWallet.currency.symbol})</p>
//                     <p>Wallet Address: {selectedWallet.walletAddress}</p>
//                     <div className="button-group">
//                       <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
//                       <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletCard;


// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaWallet } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './walletCard.css';

// const WalletCard = () => {
//   const { state } = useAuth();
//   const user = state?.user?.user;
//   const userId = user?.id;

//   const [subscriptions, setSubscriptions] = useState({});
//   const [wallets, setWallets] = useState({});
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [proofOfPayment, setProofOfPayment] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         if (response.data.success) {
//           const data = response.data.data;
//           setSubscriptions(data.subscriptions || {});
//           setWallets(data.wallets || {});

//           if (Object.keys(data.subscriptions).length > 0) {
//             const firstPlan = Object.keys(data.subscriptions)[0];
//             setSelectedSubscription(firstPlan);
//             setSelectedWallet(data.wallets[firstPlan]?.[0] || null);
//           }

//           // Load currencies
//           const currenciesResponse = await axios.get('http://localhost:3005/api/crypto/currencies');
//           setCurrencies(currenciesResponse.data.currencies || []);
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch data', 'error');
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const handleSubscriptionChange = (e) => {
//     const planName = e.target.value;
//     setSelectedSubscription(planName);
//     setSelectedWallet(wallets[planName]?.[0] || null);
//   };

//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

//   return (
//     <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//       <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
//         <div className="col-xl-6 col-md-8">
//           <div className="card-holder card shadow p-4 mb-5">
//             <div className="wallet-widget">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
//                 <FaWallet size={24} />
//               </div>

//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Subscription Plan:</span>
//                 <span>{selectedSubscription}</span>
//               </div>

//               <Form.Group controlId="subscriptionSelect">
//                 <Form.Label className="text-primary text-uppercase mb-1">
//                   Select Subscription Plan
//                 </Form.Label>
//                 <Form.Control
//                   as="select"
//                   style={{ backgroundColor: '#000033', color: '#FFF' }}
//                   value={selectedSubscription}
//                   onChange={handleSubscriptionChange}
//                 >
//                   {Object.keys(subscriptions).length > 0 ? (
//                     Object.keys(subscriptions).map(planName => (
//                       <option key={planName} value={planName}>
//                         {planName}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">No Plans Available</option>
//                   )}
//                 </Form.Control>
//               </Form.Group>

//               {selectedWallet && (
//                 <>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Wallet Balance</span>
//                     <span><FaArrowDown className="me-2 text-success" /> {selectedWallet.balance}</span>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Deposit Amount</span>
//                     <span><FaArrowDown className="me-2 text-success" /> {selectedWallet.deposit.depositAmount}</span>
//                   </div>
//                   <div className="wallet-widget bg-light shadow-sm p-3">
//                     <p>Currency: {selectedWallet.currency.currencyName} ({selectedWallet.currency.symbol})</p>
//                     <p>Wallet Address: {selectedWallet.walletAddress}</p>
//                     <div className="button-group">
//                       <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
//                       <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletCard;



// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaArrowUp, FaWallet, FaLock } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './walletCard.css';

// const WalletCard = () => {
//   const { state } = useAuth();
//   const user = state?.user?.user;
//   const userId = user?.id;

//   const [subscriptions, setSubscriptions] = useState({});
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [proofOfPayment, setProofOfPayment] = useState(null); // State for file

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//   //       if (response.data.success) {
//   //         const data = response.data.data;
//   //         setSubscriptions(data.subscriptions || {});
//   //         if (Object.keys(data.subscriptions).length > 0) {
//   //           setSelectedSubscription(Object.keys(data.subscriptions)[0]);
//   //           setSelectedWallet(data.subscriptions[Object.keys(data.subscriptions)[0]][0]);
//   //         }
//   //         // Load currencies
//   //         const currenciesResponse = await axios.get('http://localhost:3005/api/crypto/currencies');
//   //         setCurrencies(currenciesResponse.data.currencies || []);
//   //       } else {
//   //         Swal.fire('Error', response.data.message, 'error');
//   //       }
//   //     } catch (error) {
//   //       Swal.fire('Error', 'Failed to fetch data', 'error');
//   //     }
//   //   };

//   //   fetchData();
//   // }, [userId]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         if (response.data.success) {
//           const data = response.data.data;
//           console.log('====================================');
//           console.log('user-wallet:', data);
//           console.log('====================================');
//           setSubscriptions(data.subscriptions || {});
//           if (Object.keys(data.subscriptions).length > 0) {
//             const firstPlan = Object.keys(data.subscriptions)[0];
//             setSelectedSubscription(firstPlan);
//             setSelectedWallet(data.subscriptions[firstPlan][0] || null);
//           }
//           // Load currencies
//           const currenciesResponse = await axios.get('http://localhost:3005/api/crypto/currencies');
//           setCurrencies(currenciesResponse.data.currencies || []);
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch data', 'error');
//       }
//     };
  
//     fetchData();
//   }, [userId]);
  
//   const handleSubscriptionChange = (e) => {
//     const planName = e.target.value;
//     setSelectedSubscription(planName);
//     setSelectedWallet(subscriptions[planName]?.[0] || null);
//   };

//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleDeposit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('amount', depositAmount);
//     formData.append('currencyId', selectedCurrency);
//     formData.append('walletId', selectedWallet.walletId);
//     formData.append('userId', userId);
//     if (proofOfPayment) {
//       formData.append('proofOfPayment', proofOfPayment);
//     }

//     try {
//       const response = await axios.post('http://localhost:3005/api/crypto/wallet/deposit', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       if (response.data.success) {
//         Swal.fire('Success', 'Deposit completed successfully', 'success');
//         handleDepositClose();
//       } else {
//         Swal.fire('Error', response.data.message, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to deposit funds', 'error');
//     }
//   };

//   const handleWithdraw = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3005/api/crypto/wallet/withdraw', {
//         amount: withdrawAmount,
//         walletId: selectedWallet.walletId,
//         userId: userId
//       });
//       if (response.data.success) {
//         Swal.fire('Success', 'Withdrawal completed successfully', 'success');
//         handleWithdrawClose();
//       } else {
//         Swal.fire('Error', response.data.message, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to withdraw funds', 'error');
//     }
//   };

//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

//   return (
//     <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//       <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
//         <div className="col-xl-6 col-md-8">
//           <div className="card-holder card shadow p-4 mb-5">
//             <div className="wallet-widget">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
//                 <FaWallet size={24} />
//               </div>

//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Subscription Plan:</span>
//                 <span><FaLock className="me-2" /> {selectedSubscription}</span>
//               </div>

//               <Form.Group controlId="subscriptionSelect">
//                 <Form.Label className="text-primary text-uppercase mb-1">Select Subscription Plans to See Your Crypto Currency on the Wallet Account</Form.Label>
//                 <Form.Control
//                   as="select"
//                   style={{ backgroundColor: '#000033', color: '#FFF' }}
//                   value={selectedSubscription}
//                   onChange={handleSubscriptionChange}
//                 >
//                   {Object.keys(subscriptions).length > 0 ? (
//                     Object.keys(subscriptions).map(planName => (
//                       <option key={planName} value={planName}>
//                         {planName}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">No Plans Available</option>
//                   )}
//                 </Form.Control>
//               </Form.Group>

//               {selectedWallet && (
//                 <>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Balance</span>
//                     <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.balance}</span>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Subscription Deposit Amount</span>
//                     <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.balance}</span>
//                   </div>
//                   <div className="wallet-widget bg-light shadow-sm p-3">
//                     <h6 className="mb-1">Main Balance: {selectedWallet.balance}</h6>
//                     <p>Currency: {selectedWallet.currency.currencyName}</p>
//                     <p>Wallet ID: {selectedWallet.walletAddress}</p>
//                     <div className="button-group">
//                       <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
//                       <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Deposit Modal */}
//           <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Deposit Funds</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleDeposit}>
//                 <Form.Group controlId="depositAmount">
//                   <Form.Label>Enter Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={depositAmount}
//                     onChange={(e) => setDepositAmount(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="currencySelect" className="mt-3">
//                   <Form.Label>Select Currency</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={selectedCurrency}
//                     onChange={(e) => setSelectedCurrency(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>Select currency</option>
//                     {currencies.length > 0 ? (
//                       currencies.map(currency => (
//                         <option key={currency.id} value={currency.id}>
//                           {currency.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="">No Currencies Available</option>
//                     )}
//                   </Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId="proofOfPayment" className="mt-3">
//                   <Form.Label>Upload Proof of Payment</Form.Label>
//                   <Form.Control type="file" onChange={handleFileChange} required />
//                 </Form.Group>
//                 <Button type="submit" className="mt-3 w-100">Confirm Deposit</Button>
//               </Form>
//             </Modal.Body>
//           </Modal>

//           {/* Withdraw Modal */}
//           <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Withdraw Funds</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleWithdraw}>
//                 <Form.Group controlId="withdrawAmount">
//                   <Form.Label>Enter Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={withdrawAmount}
//                     onChange={(e) => setWithdrawAmount(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button type="submit" className="mt-3 w-100">Confirm Withdrawal</Button>
//               </Form>
//             </Modal.Body>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletCard;


// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaWallet, FaLock } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './walletCard.css';

// const WalletCard = () => {
//   const { state } = useAuth();
//   const user = state?.user?.user;
//   const userId = user?.id;
  
//   const [wallets, setWallets] = useState({});
//   const [subscriptions, setSubscriptions] = useState({});
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [proofOfPayment, setProofOfPayment] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         const { data } = response.data;

//         setWallets(data.wallets);
//         setSubscriptions(data.subscriptions);

//         // Set the default subscription filter and wallet to the first subscription plan
//         const firstSubscriptionKey = Object.keys(data.subscriptions)[0];
//         setSelectedSubscription(firstSubscriptionKey);
//         setSelectedWallet(data.wallets[firstSubscriptionKey][0]);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const handleSubscriptionChange = (e) => {
//     const selectedPlan = e.target.value;
//     setSelectedSubscription(selectedPlan);
//     setSelectedWallet(wallets[selectedPlan][0]);
//   };

//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleFileChange = (e) => setProofOfPayment(e.target.files[0]);
//   const handleDeposit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform deposit API call here
//       Swal.fire('Success', 'Deposit successful.', 'success');
//       setShowDepositModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to deposit funds.', 'error');
//     }
//   };

//   const handleWithdraw = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform withdrawal API call here
//       Swal.fire('Success', 'Withdrawal successful.', 'success');
//       setShowWithdrawModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to withdraw funds.', 'error');
//     }
//   };

  
  

//   return (
    
// <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//   <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
//     <div className="col-xl-6 col-md-8">
//       <div className="card-holder card shadow p-4 mb-5">
//         <div className="wallet-widget">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
//             <FaWallet size={24} />
//           </div>

//           <div className="d-flex justify-content-between mb-2">
//             <span className="text-muted">Subscription Plan:</span>
//             <span><FaLock className="me-2" /> {selectedSubscription}</span>
//           </div>

//           {/* use the Subscription Plan Dropdown see different deposited amounts on the wallet made */}
//           <Form.Group controlId="subscriptionSelect">
//             <Form.Label className="text-primary text-uppercase mb-1">select Subscription Plans to See Your Crypto Currency on the Wallet Account </Form.Label>
//             <Form.Control
//               as="select"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               value={selectedSubscription}
//               onChange={handleSubscriptionChange}
//             >
//               {Object.keys(subscriptions).map(planName => (
//                 <option key={planName} value={planName}>
//                   {planName}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           {selectedWallet && (
//             <>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <span className="text-muted">Balance</span>
//                 <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.balance}</span>
//               </div>
//               <div className="wallet-widget bg-light shadow-sm p-3">
//                 <h6 className="mb-1">Main Balance: {selectedWallet.balance}</h6>
//                 <p>Currency: {selectedWallet.currency.currencyName}</p>
//                 <p>Wallet ID: {selectedWallet.walletAddress}</p>
//                 <div className="button-group">
//                   <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
//                   <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Deposit Modal */}
//       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Deposit Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleDeposit}>
//             <Form.Group controlId="depositAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={depositAmount}
//                 onChange={(e) => setDepositAmount(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="currencySelect" className="mt-3">
//               <Form.Label>Select Currency</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedCurrency}
//                 onChange={(e) => setSelectedCurrency(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>Select currency</option>
//                 {currencies.map(currency => (
//                   <option key={currency.id} value={currency.id}>
//                     {currency.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="proofOfPayment" className="mt-3">
//               <Form.Label>Upload Proof of Payment</Form.Label>
//               <Form.Control type="file" onChange={handleFileChange} required />
//             </Form.Group>
//             <Button type="submit" className="mt-3 w-100">Confirm Deposit</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Withdraw Modal */}
//       <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Withdraw Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleWithdraw}>
//             <Form.Group controlId="withdrawAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={withdrawAmount}
//                 onChange={(e) => setWithdrawAmount(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" className="mt-3 w-100">Confirm Withdrawal</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   </div>
// </div>


//   );
// };

// export default WalletCard;




// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaWallet, FaLock } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './walletCard.css';

// const WalletCard = () => {
//   const { state } = useAuth();
//   const user = state?.user?.user;
//   const userId = user?.id;
  
//   const [wallets, setWallets] = useState({});
//   const [subscriptions, setSubscriptions] = useState({});
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [proofOfPayment, setProofOfPayment] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         const { data } = response.data;

//         setWallets(data.wallets);
//         setSubscriptions(data.subscriptions);

//         // Set the default subscription filter and wallet to the first subscription plan
//         const firstSubscriptionKey = Object.keys(data.subscriptions)[0];
//         setSelectedSubscription(firstSubscriptionKey);
//         setSelectedWallet(data.wallets[firstSubscriptionKey][0]);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const handleSubscriptionChange = (e) => {
//     const selectedPlan = e.target.value;
//     setSelectedSubscription(selectedPlan);
//     setSelectedWallet(wallets[selectedPlan][0]);
//   };

//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleFileChange = (e) => setProofOfPayment(e.target.files[0]);
//   const handleDeposit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform deposit API call here
//       Swal.fire('Success', 'Deposit successful.', 'success');
//       setShowDepositModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to deposit funds.', 'error');
//     }
//   };

//   const handleWithdraw = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform withdrawal API call here
//       Swal.fire('Success', 'Withdrawal successful.', 'success');
//       setShowWithdrawModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to withdraw funds.', 'error');
//     }
//   };

//   // const handleCreateWallet = async () => {
//   //   try {
//   //     // Perform create wallet API call here
//   //     Swal.fire('Success', 'Wallet created successfully.', 'success');
//   //     setWalletExists(true);
//   //   } catch (error) {
//   //     Swal.fire('Error', 'Failed to create wallet.', 'error');
//   //   }
//   // };


//   // const handleFileChange = (e) => {
//   //   setProofOfPayment(e.target.files[0]);
//   // };

  


//   return (
//     // <div className="container align-items-center justify-content-center" style={{ height: '100%', backgroundColor: '#f' }}>
//     //   <div className="row d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
//     //     <div className="col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
//     //       <div className="card-holder card shadow-sm p-4 mb-5 rounded" style={{
//     //         color: "#f0e000",
//     //         fontSize: "12px",
//     //         lineHeight: "1.2",
//     //         textAlign: 'center',
//     //         backgroundColor: '#000033'
//     //       }}>
//     //         <div className="mb-4">
//     //           <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//     //             <div className="d-flex justify-content-between align-items-center mb-3">
//     //               <h5 className="mb-0 text-primary">Welcome {user?.firstName} {user?.lastName}</h5>
//     //               <FaWallet size={24} className="text-primary" />
//     //             </div>

//     //             <div className="d-flex justify-content-between align-items-center mb-2">
//     //               <div className="text-muted">Subscription Plan:</div>
//     //               <div className="text-muted d-flex align-items-center">
//     //                 <FaLock className="me-2" />
//     //                 <strong>{selectedSubscription}</strong>
//     //               </div>
//     //             </div>

//     //             {selectedWallet && (
//     //               <>
//     //                 <div className="d-flex justify-content-between align-items-center mb-2">
//     //                   <div className="text-muted">Recent Deposits</div>
//     //                   <div className="text-muted d-flex align-items-center">
//     //                     <FaArrowDown className="me-2 text-success" />
//     //                     <strong>${selectedWallet.balance}</strong>
//     //                   </div>
//     //                 </div>

//     //                 <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//     //                   <div className="d-flex justify-content-between align-items-center mb-4">
//     //                     <div>
//     //                       <h6 className="mb-1 text-muted">Main Balance</h6>
//     //                       <h2 className="font-weight-bold text-primary">Amount: {selectedWallet.balance}</h2>
//     //                       <span className="font-weight-bold text-primary">Currency: {selectedWallet.currency.currencyName}</span>
//     //                     </div>
//     //                     <div>
//     //                       <p className="text-muted mb-1">Valid Thru</p>
//     //                       <h6 className="font-weight-bold">{selectedWallet.walletAddress}</h6>
//     //                     </div>
//     //                     <FaBitcoin size={48} className="text-primary" />
//     //                   </div>

//     //                   <div className="d-flex justify-content-between align-items-center mb-3">
//     //                     <div>
//     //                       <p className="text-muted mb-1 m-0">Wallet ID:</p>
//     //                       <h6 className="font-weight-bold">{selectedWallet.walletAddress}</h6>
//     //                     </div>
//     //                     <div>
//     //                       <p className="text-muted mb-1 text-primary">Card Holder</p>
//     //                       <h6 className="font-weight-bold text-primary">{user?.firstName} {user?.lastName}</h6>
//     //                     </div>
//     //                   </div>

//     //                   <div className="d-flex justify-content-between">
//     //                     <Button variant="outline-primary" size="sm" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
//     //                       Withdraw
//     //                     </Button>
//     //                     <Button variant="primary" size="sm" className="w-100 mx-2" onClick={handleDepositShow}>
//     //                       Deposit
//     //                     </Button>
//     //                   </div>
//     //                 </div>
//     //               </>
//     //             )}

//     //             <div className="row no-gutters align-items-center mt-4">
//     //               <div className="col mr-2">
//     //                 <Form.Group controlId="subscriptionSelect">
//     //                   <Form.Label className="text-primary text-uppercase mb-1">See Other Crypto Currency on your Account Subscription Plans</Form.Label>
//     //                   <Form.Control as="select" style={{ backgroundColor: '#000033', color: '#FFF' }} value={selectedSubscription} onChange={handleSubscriptionChange}>
//     //                     {Object.keys(subscriptions).map(planName => (
//     //                       <option key={planName} value={planName}>{planName}</option>
//     //                     ))}
//     //                   </Form.Control>
//     //                 </Form.Group>
//     //               </div>
//     //               <div className="col-auto">
//     //                 <i className="fas fa-calendar fa-2x text-gray-300"></i>
//     //               </div>
//     //             </div>
//     //           </div>

//     //           {!selectedWallet && (
//     //             <div className="text-center">
//     //               <Button variant="success" onClick={() => alert('Create Wallet Functionality')}>
//     //                 Create Wallet
//     //               </Button>
//     //             </div>
//     //           )}
//     //         </div>
//     //       </div>

//     //       {/* Deposit Modal */}
//     //       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//     //         <Modal.Header closeButton>
//     //           <Modal.Title>Deposit Funds</Modal.Title>
//     //         </Modal.Header>
//     //         <Modal.Body>
//     //           <Form onSubmit={handleDeposit}>
//     //             <Form.Group controlId="depositAmount">
//     //               <Form.Label>Enter Amount</Form.Label>
//     //               <Form.Control
//     //                 type="number"
//     //                 placeholder="Amount to deposit"
//     //                 value={depositAmount}
//     //                 onChange={(e) => setDepositAmount(e.target.value)}
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <Form.Group controlId="currencySelect" className="mt-3">
//     //               <Form.Label>Select Currency</Form.Label>
//     //               <Form.Control
//     //                 as="select"
//     //                 value={selectedCurrency}
//     //                 onChange={(e) => setSelectedCurrency(e.target.value)}
//     //                 required
//     //               >
//     //                 <option value="" disabled>Select a currency</option>
//     //                 {currencies.map(currency => (
//     //                   <option key={currency.id} value={currency.id}>{currency.name}</option>
//     //                 ))}
//     //               </Form.Control>
//     //             </Form.Group>

//     //             <Form.Group controlId="proofOfPayment" className="mt-3">
//     //               <Form.Label>Upload Proof of Payment</Form.Label>
//     //               <Form.Control
//     //                 type="file"
//     //                 onChange={handleFileChange}
//     //                 required
//     //               />
//     //             </Form.Group>

//     //             <Button variant="primary" type="submit" className="mt-3 w-100">
//     //               Confirm Deposit
//     //             </Button>
//     //           </Form>
//     //         </Modal.Body>
//     //       </Modal>

//     //       {/* Withdraw Modal */}
//     //       <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//     //         <Modal.Header closeButton>
//     //           <Modal.Title>Withdraw Funds</Modal.Title>
//     //         </Modal.Header>
//     //         <Modal.Body>
//     //           <Form onSubmit={handleWithdraw}>
//     //             <Form.Group controlId="withdrawAmount">
//     //               <Form.Label>Enter Amount</Form.Label>
//     //               <Form.Control
//     //                 type="number"
//     //                 placeholder="Amount to withdraw"
//     //                 value={withdrawAmount}
//     //                 onChange={(e) => setWithdrawAmount(e.target.value)}
//     //                 required
//     //               />
//     //             </Form.Group>
//     //             <Button variant="primary" type="submit" className="mt-3 w-100">
//     //               Confirm Withdrawal
//     //             </Button>
//     //           </Form>
//     //         </Modal.Body>
//     //       </Modal>
//     //     </div>
//     //   </div>
//     // </div>
// //   <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
// //   <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
// //     <div className="col-xl-6 col-md-8">
// //       <div className="card-holder card shadow p-4 mb-5">
// //         <div className="wallet-widget">
// //           <div className="d-flex justify-content-between align-items-center mb-3">
// //             <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
// //             <FaWallet size={24} />
// //           </div>
// //           <div className="d-flex justify-content-between mb-2">
// //             <span className="text-muted">Subscription Plan:</span>
// //             <span><FaLock className="me-2" /> {selectedSubscription}</span>
// //           </div>
// //           {selectedWallet && (
// //             <>
// //               <div className="d-flex justify-content-between align-items-center mb-3">
// //                 <span className="text-muted">Balance</span>
// //                 <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.balance}</span>
// //               </div>
// //               <div className="wallet-widget bg-light shadow-sm p-3">
// //                 <h6 className="mb-1">Main Balance: {selectedWallet.balance}</h6>
// //                 <p>Currency: {selectedWallet.currency.currencyName}</p>
// //                 <p>Wallet ID: {selectedWallet.walletAddress}</p>
// //                 <div className="button-group">
// //                   <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
// //                   <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* Modals */}
// //       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Deposit Funds</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form onSubmit={handleDeposit}>
// //             <Form.Group controlId="depositAmount">
// //               <Form.Label>Enter Amount</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 value={depositAmount}
// //                 onChange={(e) => setDepositAmount(e.target.value)}
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group controlId="currencySelect" className="mt-3">
// //               <Form.Label>Select Currency</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 value={selectedCurrency}
// //                 onChange={(e) => setSelectedCurrency(e.target.value)}
// //                 required
// //               >
// //                 <option value="" disabled>Select currency</option>
// //                 {currencies.map(currency => (
// //                   <option key={currency.id} value={currency.id}>{currency.name}</option>
// //                 ))}
// //               </Form.Control>
// //             </Form.Group>
// //             <Form.Group controlId="proofOfPayment" className="mt-3">
// //               <Form.Label>Upload Proof of Payment</Form.Label>
// //               <Form.Control type="file" onChange={handleFileChange} required />
// //             </Form.Group>
// //             <Button type="submit" className="mt-3 w-100">Confirm Deposit</Button>
// //           </Form>
// //         </Modal.Body>
// //       </Modal>

// //       <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Withdraw Funds</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form onSubmit={handleWithdraw}>
// //             <Form.Group controlId="withdrawAmount">
// //               <Form.Label>Enter Amount</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 value={withdrawAmount}
// //                 onChange={(e) => setWithdrawAmount(e.target.value)}
// //                 required
// //               />
// //             </Form.Group>
// //             <Button type="submit" className="mt-3 w-100">Confirm Withdrawal</Button>
// //           </Form>
// //         </Modal.Body>
// //       </Modal>
// //     </div>
// //   </div>
// // </div>

// <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//   <div className="row align-items-center justify-content-center" style={{ height: '100%' }}>
//     <div className="col-xl-6 col-md-8">
//       <div className="card-holder card shadow p-4 mb-5">
//         <div className="wallet-widget">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5>Welcome, {user?.firstName} {user?.lastName}</h5>
//             <FaWallet size={24} />
//           </div>

//           <div className="d-flex justify-content-between mb-2">
//             <span className="text-muted">Subscription Plan:</span>
//             <span><FaLock className="me-2" /> {selectedSubscription}</span>
//           </div>

//           {/* Subscription Plan Dropdown */}
//           <Form.Group controlId="subscriptionSelect">
//             <Form.Label className="text-primary text-uppercase mb-1">select Subscription Plans to See Your Crypto Currency on the Wallet Account </Form.Label>
//             <Form.Control
//               as="select"
//               style={{ backgroundColor: '#000033', color: '#FFF' }}
//               value={selectedSubscription}
//               onChange={handleSubscriptionChange}
//             >
//               {Object.keys(subscriptions).map(planName => (
//                 <option key={planName} value={planName}>
//                   {planName}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           {selectedWallet && (
//             <>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <span className="text-muted">Balance</span>
//                 <span><FaArrowDown className="me-2 text-success" /> ${selectedWallet.balance}</span>
//               </div>
//               <div className="wallet-widget bg-light shadow-sm p-3">
//                 <h6 className="mb-1">Main Balance: {selectedWallet.balance}</h6>
//                 <p>Currency: {selectedWallet.currency.currencyName}</p>
//                 <p>Wallet ID: {selectedWallet.walletAddress}</p>
//                 <div className="button-group">
//                   <Button variant="outline-primary" onClick={handleWithdrawShow}>Withdraw</Button>
//                   <Button variant="primary" onClick={handleDepositShow}>Deposit</Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Deposit Modal */}
//       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Deposit Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleDeposit}>
//             <Form.Group controlId="depositAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={depositAmount}
//                 onChange={(e) => setDepositAmount(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="currencySelect" className="mt-3">
//               <Form.Label>Select Currency</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedCurrency}
//                 onChange={(e) => setSelectedCurrency(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>Select currency</option>
//                 {currencies.map(currency => (
//                   <option key={currency.id} value={currency.id}>
//                     {currency.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="proofOfPayment" className="mt-3">
//               <Form.Label>Upload Proof of Payment</Form.Label>
//               <Form.Control type="file" onChange={handleFileChange} required />
//             </Form.Group>
//             <Button type="submit" className="mt-3 w-100">Confirm Deposit</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Withdraw Modal */}
//       <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Withdraw Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleWithdraw}>
//             <Form.Group controlId="withdrawAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={withdrawAmount}
//                 onChange={(e) => setWithdrawAmount(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" className="mt-3 w-100">Confirm Withdrawal</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   </div>
// </div>


//   );
// };

// export default WalletCard;


// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaWallet } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './walletCard.css';

// const WalletCard = () => {
//   const { state } = useAuth();
//   const user = state?.user?.user;
//   const userId = user?.id;

//   const [wallets, setWallets] = useState({});
//   const [subscriptions, setSubscriptions] = useState({});
//   const [userDetails, setUserDetails] = useState({});
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [selectedWallet, setSelectedWallet] = useState(null);

//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [proofOfPayment, setProofOfPayment] = useState(null);

//   // Fetch wallet and subscription details on component load
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!userId) return;
  
//       try {
//         const response = await axios.get(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         const { data } = response.data;
        
//         setUserDetails(data.user);
//         setWallets(data.wallets);
//         setSubscriptions(data.subscriptions);

//         // Set the default wallet to the first Bitcoin wallet
//         const bitcoinWallet = findBitcoinWallet(data.wallets);
//         if (bitcoinWallet) {
//           setSelectedWallet(bitcoinWallet);
//         }

//         // Set default subscription filter to the first subscription available
//         const firstSubscriptionKey = Object.keys(data.subscriptions)[0];
//         setSelectedSubscription(firstSubscriptionKey);
//       } catch (error) {
//         console.error('Error fetching wallet and subscription data:', error);
//         Swal.fire('Error', 'Failed to fetch data.', 'error');
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const findBitcoinWallet = (wallets) => {
//     for (const planName in wallets) {
//       const bitcoinWallet = wallets[planName].find(wallet => wallet.currency.currencyName === 'Bitcoin');
//       if (bitcoinWallet) {
//         return bitcoinWallet;
//       }
//     }
//     return null;
//   };

//   const handleSubscriptionChange = (e) => {
//     const selectedPlan = e.target.value;
//     setSelectedSubscription(selectedPlan);

//     // Update the wallet to display the first wallet in the selected subscription plan
//     const subscriptionWallets = wallets[selectedPlan];
//     if (subscriptionWallets && subscriptionWallets.length > 0) {
//       setSelectedWallet(subscriptionWallets[0]);
//     }
//   };

//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleDeposit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform deposit API call here
//       Swal.fire('Success', 'Deposit successful.', 'success');
//       setShowDepositModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to deposit funds.', 'error');
//     }
//   };

//   const handleWithdraw = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform withdrawal API call here
//       Swal.fire('Success', 'Withdrawal successful.', 'success');
//       setShowWithdrawModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to withdraw funds.', 'error');
//     }
//   };

//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

//   return (
//     <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//       <div className="row d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
//         <div className="col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
//           <div className="card-holder card shadow-sm p-4 mb-5 rounded" style={{ color: "#f0e000", fontSize: "12px", lineHeight: "1.2", textAlign: 'center', backgroundColor: '#000033' }}>
            
//             {/* Wallet Details */}
//             {selectedWallet && (
//               <div className="wallet-widget p-3 bg-light rounded shadow-sm mb-4">
//                 <h5 className="mb-0 text-primary">Wallet Overview</h5>
//                 <p className="mb-1 text-muted">Address: {selectedWallet.walletAddress}</p>
//                 <h6 className="font-weight-bold text-primary">Balance: {selectedWallet.balance}</h6>
//                 <h6 className="font-weight-bold text-primary">Currency: {selectedWallet.currency.currencyName} ({selectedWallet.currency.symbol})</h6>
//               </div>
//             )}

//             {/* Subscription Filter */}
//             <Form.Group controlId="subscriptionSelect">
//               <Form.Label>Select Subscription Plan</Form.Label>
//               <Form.Control as="select" value={selectedSubscription} onChange={handleSubscriptionChange}>
//                 {Object.keys(subscriptions).map(planName => (
//                   <option key={planName} value={planName}>{planName}</option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <div className="d-flex justify-content-between mt-4">
//               <Button variant="outline-primary" size="sm lg" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
//                 Withdraw
//               </Button>
//               <Button variant="primary" size="sm lg" className="w-100 mx-2" onClick={handleDepositShow}>
//                 Deposit
//               </Button>
//             </div>
//           </div>

//           {/* Modals for Deposit and Withdraw */}
//           <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Deposit Funds</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleDeposit}>
//                 <Form.Group controlId="depositAmount">
//                   <Form.Label>Enter Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Amount to deposit"
//                     value={depositAmount}
//                     onChange={(e) => setDepositAmount(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="currencySelect" className="mt-3">
//                   <Form.Label>Select Currency</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={selectedCurrency}
//                     onChange={(e) => setSelectedCurrency(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>Select a currency</option>
//                     {currencies.map(currency => (
//                       <option key={currency.id} value={currency.id}>
//                         {currency.name}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId="proofOfPayment" className="mt-3">
//                   <Form.Label>Upload Proof of Payment</Form.Label>
//                   <Form.Control
//                     type="file"
//                     onChange={handleFileChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="mt-3 w-100">
//                   Confirm Deposit
//                 </Button>
//               </Form>
//             </Modal.Body>
//           </Modal>

//           <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Withdraw Funds</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleWithdraw}>
//                 <Form.Group controlId="withdrawAmount">
//                   <Form.Label>Enter Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Amount to withdraw"
//                     value={withdrawAmount}
//                     onChange={(e) => setWithdrawAmount(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="mt-3 w-100">
//                   Confirm Withdrawal
//                 </Button>
//               </Form>
//             </Modal.Body>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletCard;



// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaLock, FaWallet } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2'; // Importing SweetAlert2 for alerts
// import WalletWidget from './WalletWidget';
// import './walletCard.css'


// const WalletCard = () => {
//   const { state } = useAuth(); // Getting the user state from the AuthContext
//   const user = state?.user?.user; // Safe navigation to access the user object
//   const userId = user?.id; // Extracting userId from the user object
//   const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name

//   const [walletExists, setWalletExists] = useState(false);
//   const [balance, setBalance] = useState(0);
//   const [walletAddress, setWalletAddress] = useState("");
//   const [validThru, setValidThru] = useState('12/28');
//   const [cardHolder, setCardHolder] = useState(`${user?.firstName} ${user?.lastName}`);
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currencies, setCurrencies] = useState([]);
//   const [currencyName, setCurrencyName] = useState('');
//   const [color, setColor] = useState('bg-primary'); // For dynamic color classes
//   const [proofOfPayment, setProofOfPayment] = useState(null);


//   const truncateAddress = (address) => {
//     if (address.length <= 7) return address; // Handle short addresses
//     return `${address.slice(0, 5)}.....${address.slice(-4)}`;
//   };

  
//   useEffect(() => {
//     // Fetch wallet data using the userId
//     const fetchWalletData = async () => {
//       if (!userId) return;
  
//       try {
//         // const response = await fetch(`http://localhost:3005/api/crypto/wallet/user-wallet-history/${userId}`);
//         const response = await fetch(`http://localhost:3005/api/crypto/wallet/user-wallet-subscription-details/${userId}`);
//         const result = await response.json();
//         console.log('====================================');
//         console.log('Response data:', result);
//         console.log('====================================');
  
//         // Check if the response is successful and data is available
//         if (result.success && result.data.wallet) {
//           setWalletExists(true);
//           setBalance(result.data.wallet.balance); // Correctly accessing the balance
//           setWalletAddress(truncateAddress(result.data.wallet.walletAddress)); // Truncate wallet address

//           setCardHolder(`${user.firstName} ${user.lastName}`); // Accessing user's name
//           setCurrencyName(`${result.data.wallet.currency.currencyName}`); // Accessing user's name
//         } else {
//           setWalletExists(false);
//         }
//       } catch (error) {
//         console.error('Error fetching wallet data:', error);
//         Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
//       }
//     };
  
//     fetchWalletData();
//   }, [userId, user]);
  
//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);

//   const handleDeposit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform deposit API call here
//       Swal.fire('Success', 'Deposit successful.', 'success');
//       setShowDepositModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to deposit funds.', 'error');
//     }
//   };

//   const handleWithdraw = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform withdrawal API call here
//       Swal.fire('Success', 'Withdrawal successful.', 'success');
//       setShowWithdrawModal(false);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to withdraw funds.', 'error');
//     }
//   };

//   const handleCreateWallet = async () => {
//     try {
//       // Perform create wallet API call here
//       Swal.fire('Success', 'Wallet created successfully.', 'success');
//       setWalletExists(true);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to create wallet.', 'error');
//     }
//   };


//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

  

//   return (
//     <div className="container align-items-center justify-content-center" style={{ height: '100%', backgroundColor:'#f' }} >
//       <div className="row d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
//         <div className="col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
//           <div className={`card-holder card shadow-sm p-4 mb-5 rounded `} style={{
//                             color: "#f0e000",
//                             fontSize: "12px",  
//                             lineHeight: "1.2", 
//                             textAlign:'center' ,
//                             backgroundColor:'#000033'
//                         }} >
//         <div className="mb-4" >
//         <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0 text-primary">Welcome {cardHolder}</h5>
//         <FaWallet size={24} className="text-primary" />
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <div className="text-muted">Subscription Plan:</div>
//         <div className="text-muted d-flex align-items-center">
//           <FaLock className="me-2" />
//           <strong>{}</strong>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <div className="text-muted">Recent Deposits</div>
//         <div className="text-muted d-flex align-items-center">
//           <FaArrowDown className="me-2 text-success" />
//           <strong>$500.00</strong>
//         </div>
//       </div>

    

// <div className="row no-gutters align-items-center">
//                                                 <div className="col mr-2">
//                                                 <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
//                                                    See Other Crypto Currency on your Account SubscriptionPlans
//                                                 </div>
//                                                 <div className="h5 mb-0 font-weight-bold text-gray-800">
//                                                     <select
//                                                     style={{ backgroundColor: '#000033', color: '#FFF' }}
//                                                     onChange={(e) => setSelectedChain(e.target.value)}
//                                                     value={selectedChain}
//                                                     >
//                                                     <option value="0x1">Ethereum</option>
//                                                     <option value="0x13881">Mumbai Testnet</option>
//                                                     <option value="0x89">Polygon</option>
//                                                     <option value="0xa86a">Avalanche</option>
//                                                     </select>
//                                                 </div>
//                                                 </div>
//                                                 <div className="col-auto">
//                                                 <i className="fas fa-calendar fa-2x text-gray-300"></i>
//                                                 </div>
//                                             </div>     
//     </div>

//         </div>
//             <div className="wallet-widget p-3 bg-light rounded shadow-sm" >
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                   <h6 className="mb-1 text-muted">Main Balance</h6>
//                   <h2 className="font-weight-bold text-primary">   Amount :  {balance}</h2>
//                   <span className="font-weight-bold text-primary">currency: {currencyName}</span>
//                 </div>
//                 <div>
//                       <p className="text-muted mb-1">Valid Thru</p>
//                       <h6 className="font-weight-bold">{validThru}</h6>  
//                   </div>
//                 <FaBitcoin size={48} className="text-primary" />
//               </div>

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                 <p className="text-muted mb-1 m-0 d-flex justify-content-between align-items-center mb-3">Wallet ID:</p>
//                   <h6 className="font-weight-bold">{walletAddress}</h6>
                  
//                 </div>
//                 <div>
//                   <p className="text-muted mb-1 text-primary">Card Holder</p>
//                   <h6 className="font-weight-bold text-primary">{cardHolder}</h6>
//                 </div>
//               </div>

//               <div className="d-flex justify-content-between">
//                 <Button variant="outline-primary" size="sm lg" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
//                   Withdraw
//                 </Button>
//                 <Button variant="primary" size="sm lg" className="w-100 mx-2" onClick={handleDepositShow}>
//                   Deposit
//                 </Button>
//               </div>
//             </div>

//             <div className="mb-4">
//               {/* Assuming WalletWidget is another component */}
//               {/* <WalletWidget /> */}
//               {/* <div className="col-xl-12 col-md-12 mb-4">
//                                         <div className="card border-left-primary shadow h-100 py-2">
//                                             <div className="card-body">
//                                             <div className="row no-gutters align-items-center">
//                                                 <div className="col mr-2">
//                                                 <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
//                                                    See Other Crypto Currency on your Account SubscriptionPlans
//                                                 </div>
//                                                 <div className="h5 mb-0 font-weight-bold text-gray-800">
//                                                     <select
//                                                     style={{ backgroundColor: '#000033', color: '#FFF' }}
//                                                     onChange={(e) => setSelectedChain(e.target.value)}
//                                                     value={selectedChain}
//                                                     >
//                                                     <option value="0x1">Ethereum</option>
//                                                     <option value="0x13881">Mumbai Testnet</option>
//                                                     <option value="0x89">Polygon</option>
//                                                     <option value="0xa86a">Avalanche</option>
//                                                     </select>
//                                                 </div>
//                                                 </div>
//                                                 <div className="col-auto">
//                                                 <i className="fas fa-calendar fa-2x text-gray-300"></i>
//                                                 </div>
//                                             </div>
//                                             </div>
//                                         </div>
//                                     </div> */}
//             </div>

//             {!walletExists && (
//               <div className="text-center">
//                 <Button variant="success" onClick={handleCreateWallet}>
//                   Create Wallet
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Deposit Modal */}
//           <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Deposit Funds</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleDeposit}>
//                 <Form.Group controlId="depositAmount">
//                   <Form.Label>Enter Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Amount to deposit"
//                     value={depositAmount}
//                     onChange={(e) => setDepositAmount(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="currencySelect" className="mt-3">
//                   <Form.Label>Select Currency</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={selectedCurrency}
//                     onChange={(e) => setSelectedCurrency(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>Select a currency</option>
//                     {currencies.map(currency => (
//                       <option key={currency.id} value={currency.id}>
//                         {currency.name}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId="proofOfPayment" className="mt-3">
//                   <Form.Label>Upload Proof of Payment</Form.Label>
//                   <Form.Control
//                     type="file"
//                     onChange={() => { /* handle file change logic */ }}
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="mt-3 w-100">
//                   Confirm Deposit
//                 </Button>
//               </Form>
//             </Modal.Body>
//           </Modal>

//           {/* Withdraw Modal */}
//           <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Withdraw Funds</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleWithdraw}>
//                 <Form.Group controlId="withdrawAmount">
//                   <Form.Label>Enter Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Amount to withdraw"
//                     value={withdrawAmount}
//                     onChange={(e) => setWithdrawAmount(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="mt-3 w-100">
//                   Confirm Withdrawal
//                 </Button>
//               </Form>
//             </Modal.Body>
//           </Modal>
//         </div>

//         <div className="col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
//           <div className={`card-holder card shadow-sm p-4 mb-5 rounded `} style={{
//                             color: "#f0e000",
//                             fontSize: "12px",  
//                             lineHeight: "1.2", 
//                             textAlign:'center' ,
//                             backgroundColor:'#000033'
//                         }}>
//                   <WalletWidget />
            

//             <div className="mb-4">
//               <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//                 <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <div>
//                       {/* Placeholder for JS chart showing investment growth */}
//                       JS chart for investment growth here
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {!walletExists && (
//           <div className="text-center">
//             <Button variant="success" onClick={handleCreateWallet}>
//               Create Wallet
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Deposit Modal */}
//       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Deposit Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleDeposit}>
//             <Form.Group controlId="depositAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Amount to deposit"
//                 value={depositAmount}
//                 onChange={(e) => setDepositAmount(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="currencySelect" className="mt-3">
//               <Form.Label>Select Currency</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedCurrency}
//                 onChange={(e) => setSelectedCurrency(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>Select a currency</option>
//                 {currencies.map(currency => (
//                   <option key={currency.id} value={currency.id}>
//                     {currency.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="proofOfPayment" className="mt-3">
//               <Form.Label>Upload Proof of Payment</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={handleFileChange}
//                 required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="mt-3 w-100">
//               Confirm Deposit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Withdraw Modal */}
//       <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Withdraw Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={{}}>
//             <Form.Group controlId="withdrawAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Amount to withdraw"
//                 value={withdrawAmount}
//                 onChange={(e) => setWithdrawAmount(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3 w-100">
//               Confirm Withdrawal
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//     </div>
//     <div className="mb-4">

//     </div>
//     </div>
//   );
// };

// export default WalletCard;













