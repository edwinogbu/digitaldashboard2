// import React, { useState, useEffect } from 'react';
// import { FaBitcoin } from 'react-icons/fa';
// import { Button, Modal, Form } from 'react-bootstrap';
// import WalletWidget from './WalletWidget';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useAuth } from './../AuthContext';

// const WalletCard = ({ color, balance, validThru }) => {
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [walletExists, setWalletExists] = useState(false);
//   const [currencies, setCurrencies] = useState([]);
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [proofOfPayment, setProofOfPayment] = useState(null);
//   const [walletId, setWalletId] = useState(null);

//   // Get user authentication state and functions
//   const { isAuthenticated, logout } = useAuth();
//   const { state } = useAuth();
//   const user = state.user.user;  // Extract user information from the state
//   const userId = user.id;  // Retrieve userId from the user object

//   useEffect(() => {
//     // Check if the wallet exists for the user and fetch walletId
//     axios.get(`http://localhost:3005/api/wallet/${userId}`)
//       .then(response => {
//         if (response.data.wallet) {
//           setWalletExists(true);
//           setWalletId(response.data.wallet.id);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching wallet", error);
//       });

//     // Fetch available currencies
//     axios.get(`http://localhost:3005/api/crypto/currencies`)
//       .then(response => {
//         setCurrencies(response.data.currencies);
//       })
//       .catch(error => {
//         console.error("Error fetching currencies", error);
//       });
//   }, [userId]);

//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);
//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);

//   const handleCreateWallet = () => {
//     axios.post(`http://localhost:3005/api/wallets`, { userId })
//       .then(response => {
//         setWalletExists(true);
//         setWalletId(response.data.wallet.id);
//         Swal.fire('Wallet Created', 'Your wallet has been created successfully!', 'success');
//       })
//       .catch(error => {
//         console.error("Error creating wallet", error);
//         Swal.fire('Error', 'Failed to create wallet', 'error');
//       });
//   };

//   const handleDeposit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('walletId', walletId);
//     formData.append('amount', depositAmount);
//     formData.append('currencyId', selectedCurrency);
//     formData.append('proofOfPayment', proofOfPayment);

//     axios.post(`http://localhost:3005/api/crypto/deposits`, formData)
//       .then(response => {
//         Swal.fire('Success', 'Deposit successful!', 'success');
//         setShowDepositModal(false);
//       })
//       .catch(error => {
//         console.error("Error depositing funds", error);
//         Swal.fire('Error', 'Failed to deposit funds', 'error');
//       });
//   };

//   const handleWithdraw = (e) => {
//     e.preventDefault();

//     const withdrawData = {
//       userId: userId,
//       amount: withdrawAmount,
//     };

//     axios.post(`http://localhost:3005/api/crypto/withdrawals`, withdrawData)
//       .then(response => {
//         Swal.fire('Success', 'Withdrawal successful!', 'success');
//         setShowWithdrawModal(false);
//       })
//       .catch(error => {
//         console.error("Error withdrawing funds", error);
//         Swal.fire('Error', 'Failed to withdraw funds', 'error');
//       });
//   };

//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

//   return (
//     <div className={`col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style="height: 100vh;" `}>
//       <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//         <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h4 className="mb-1 text-muted">Main Balance</h4>
//               <h2 className="font-weight-bold">{balance}</h2>
//             </div>
//             <FaBitcoin size={48} className="text-primary" />
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <p className="text-muted mb-1">Valid Thru</p>
//               <h6 className="font-weight-bold">{validThru}</h6>
//             </div>
//             <div>
//               <p className="text-muted mb-1">Card Holder</p>
//               <h6 className="font-weight-bold">{user.firstName} {user.lastName}</h6> {/* Display user's name */}
//               <p className="text-muted mb-1">Email: {user.email}</p> {/* Display user's email */}
//             </div>
//           </div>

//           <div className="d-flex justify-content-between">
//             <Button variant="outline-primary" size="sm lg" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
//               Withdraw
//             </Button>
//             <Button variant="primary" size="sm lg" className="w-100 mx-2" onClick={handleDepositShow}>
//               Deposit
//             </Button>
//           </div>
//         </div>

//         <div className="mb-4">
//           <WalletWidget />
//         </div>

//         {!walletExists && (
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
//           <Form onSubmit={handleWithdraw}>
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

//             {/* Hidden userId input */}
//             <Form.Control
//               type="hidden"
//               value={userId}
//             />

//             <Button variant="primary" type="submit" className="mt-3 w-100">
//               Confirm Withdrawal
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default WalletCard;


// import React, { useState, useEffect } from 'react';
// import { FaBitcoin } from 'react-icons/fa';
// import { Button, Modal, Form } from 'react-bootstrap';
// import WalletWidget from './WalletWidget';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const WalletCard = ({ color, balance, validThru, cardHolder, userId }) => {
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [walletExists, setWalletExists] = useState(false);
//   const [currencies, setCurrencies] = useState([]);
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [proofOfPayment, setProofOfPayment] = useState(null);
//   const [walletId, setWalletId] = useState(null);

//   useEffect(() => {
//     // Check if the wallet exists for the user and fetch walletId
//     axios.get(`http://localhost:3005/api/wallet/${userId}`)
//       .then(response => {
//         if (response.data.wallet) {
//           setWalletExists(true);
//           setWalletId(response.data.wallet.id);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching wallet", error);
//       });

//     // Fetch available currencies
//     axios.get(`http://localhost:3005/api/currencies`)
//       .then(response => {
//         setCurrencies(response.data.currencies);
//       })
//       .catch(error => {
//         console.error("Error fetching currencies", error);
//       });
//   }, [userId]);

//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);
//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);

//   const handleCreateWallet = () => {
//     axios.post(`http://localhost:3005/api/wallet/create`, { userId })
//       .then(response => {
//         setWalletExists(true);
//         setWalletId(response.data.wallet.id);
//         Swal.fire('Wallet Created', 'Your wallet has been created successfully!', 'success');
//       })
//       .catch(error => {
//         console.error("Error creating wallet", error);
//         Swal.fire('Error', 'Failed to create wallet', 'error');
//       });
//   };

//   const handleDeposit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('walletId', walletId);
//     formData.append('amount', depositAmount);
//     formData.append('currencyId', selectedCurrency);
//     formData.append('proofOfPayment', proofOfPayment);

//     axios.post(`http://localhost:3005/api/wallet/deposit`, formData)
//       .then(response => {
//         Swal.fire('Success', 'Deposit successful!', 'success');
//         setShowDepositModal(false);
//       })
//       .catch(error => {
//         console.error("Error depositing funds", error);
//         Swal.fire('Error', 'Failed to deposit funds', 'error');
//       });
//   };

//   const handleFileChange = (e) => {
//     setProofOfPayment(e.target.files[0]);
//   };

//   return (
//     <div className={`col-sm-12 container align-items-center justify-content-center" style="height: 100vh;" `}>
//     <div className={`row d-flex align-items-center justify-content-center" style="height: 100vh;" `}>
//     <div className={`col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style="height: 100vh;" `}>
//       <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//         <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h4 className="mb-1 text-muted">Main Balance</h4>
//               <h2 className="font-weight-bold">{balance}</h2>
//             </div>
//             <FaBitcoin size={48} className="text-primary" />
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <p className="text-muted mb-1">Valid Thru</p>
//               <h6 className="font-weight-bold">{validThru}</h6>
//             </div>
//             <div>
//               <p className="text-muted mb-1">Card Holder</p>
//               <h6 className="font-weight-bold">{cardHolder}</h6>
//             </div>
//           </div>

//           <div className="d-flex justify-content-between">
//             <Button variant="outline-primary" size="sm lg" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
//               Withdraw
//             </Button>
//             <Button variant="primary" size="sm lg" className="w-100 mx-2" onClick={handleDepositShow}>
//               Deposit
//             </Button>
//           </div>
//         </div>

//         <div className="mb-4">
//           <WalletWidget />
//         </div>

//         {!walletExists && (
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
//     <div className={`col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style="height: 100vh;" `}>
//       <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//         <div className="wallet-widget p-3 bg-light rounded shadow-sm">
         
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//                 duration counter designes with 
//             </div>
//           </div>
//         </div>

//         <div className="mb-4">
//         <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//         <div className="wallet-widget p-3 bg-light rounded shadow-sm">
         
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
          
//           designes of js chart showing investment growth 
//         </div>
//         </div>
//         </div>
//         </div>
//         </div>

//         {!walletExists && (
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
//     </div>
//   );
// };

// export default WalletCard;


import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaBitcoin, FaLock, FaWallet } from 'react-icons/fa';
import { useAuth } from './../AuthContext';
import Swal from 'sweetalert2'; // Importing SweetAlert2 for alerts
import WalletWidget from './WalletWidget';


const WalletCard = () => {
  const { state } = useAuth(); // Getting the user state from the AuthContext
  const user = state?.user?.user; // Safe navigation to access the user object
  const userId = user?.id; // Extracting userId from the user object
  const [selectedChain, setSelectedChain] = useState("0x1"); // Fixed state setter name

  const [walletExists, setWalletExists] = useState(false);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [validThru, setValidThru] = useState('12/28');
  const [cardHolder, setCardHolder] = useState(`${user?.firstName} ${user?.lastName}`);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [currencyName, setCurrencyName] = useState('');
  const [color, setColor] = useState('bg-primary'); // For dynamic color classes
  const [proofOfPayment, setProofOfPayment] = useState(null);

  
  // useEffect(() => {
  //   // Fetch wallet data using the userId
  //   const fetchWalletData = async () => {
  //     if (!userId) return;

  //     try {
  //       const response = await fetch(`http://localhost:3005/api/crypto/wallet/user-wallet-history/${userId}`);
  //       const data = await response.json();
  //         console.log('====================================');
  //         console.log(data);
  //         console.log('Full data:', data);
  //         console.log('Wallet data:', data.wallet);

  //         console.log('====================================');
  //       if (data.wallet) {
  //         setWalletExists(true);
  //         setBalance(data.wallet.balance);
  //         setValidThru(data.wallet.validThru);
  //         setCardHolder(`${user.firstName} ${user.lastName}`);
  //       } else {
  //         setWalletExists(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching wallet data:', error);
  //       Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
  //     }
  //   };

  //   fetchWalletData();
  // }, [userId, user]);


  // const truncateAddress = (address, maxLength = 6) => {
  //   if (address.length <= maxLength) return address;
  //   return `${address.slice(0, maxLength)}...`;
  // };
  

  const truncateAddress = (address) => {
    if (address.length <= 7) return address; // Handle short addresses
    return `${address.slice(0, 5)}.....${address.slice(-4)}`;
  };

  
  useEffect(() => {
    // Fetch wallet data using the userId
    const fetchWalletData = async () => {
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:3005/api/crypto/wallet/user-wallet-history/${userId}`);
        const result = await response.json();
        console.log('====================================');
        console.log('Response data:', result);
        console.log('====================================');
  
        // Check if the response is successful and data is available
        if (result.success && result.data.wallet) {
          setWalletExists(true);
          setBalance(result.data.wallet.balance); // Correctly accessing the balance
          setWalletAddress(truncateAddress(result.data.wallet.walletAddress)); // Truncate wallet address

          setCardHolder(`${user.firstName} ${user.lastName}`); // Accessing user's name
          setCurrencyName(`${result.data.wallet.currency.currencyName}`); // Accessing user's name
        } else {
          setWalletExists(false);
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
      }
    };
  
    fetchWalletData();
  }, [userId, user]);
  
  const handleDepositShow = () => setShowDepositModal(true);
  const handleDepositClose = () => setShowDepositModal(false);
  const handleWithdrawShow = () => setShowWithdrawModal(true);
  const handleWithdrawClose = () => setShowWithdrawModal(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      // Perform deposit API call here
      Swal.fire('Success', 'Deposit successful.', 'success');
      setShowDepositModal(false);
    } catch (error) {
      Swal.fire('Error', 'Failed to deposit funds.', 'error');
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      // Perform withdrawal API call here
      Swal.fire('Success', 'Withdrawal successful.', 'success');
      setShowWithdrawModal(false);
    } catch (error) {
      Swal.fire('Error', 'Failed to withdraw funds.', 'error');
    }
  };

  const handleCreateWallet = async () => {
    try {
      // Perform create wallet API call here
      Swal.fire('Success', 'Wallet created successfully.', 'success');
      setWalletExists(true);
    } catch (error) {
      Swal.fire('Error', 'Failed to create wallet.', 'error');
    }
  };


  const handleFileChange = (e) => {
    setProofOfPayment(e.target.files[0]);
  };

  

  return (
    <div className="container align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="row d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
        <div className="mb-4">
        <div className="wallet-widget p-3 bg-light rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-primary">Welcome {cardHolder}</h5>
        <FaWallet size={24} className="text-primary" />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="text-muted">Subscription Plan:</div>
        <div className="text-muted d-flex align-items-center">
          <FaLock className="me-2" />
          <strong>$1,250.00</strong>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="text-muted">Recent Deposits</div>
        <div className="text-muted d-flex align-items-center">
          <FaArrowDown className="me-2 text-success" />
          <strong>$500.00</strong>
        </div>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted">Recent Withdrawals</div>
        <div className="text-muted d-flex align-items-center">
          <FaArrowUp className="me-2 text-danger" />
          <strong>$200.00</strong>
        </div>
      </div> */}

<div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                   See Other Crypto Currency on your Account SubscriptionPlans
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    <select
                                                    style={{ backgroundColor: '#000033', color: '#FFF' }}
                                                    onChange={(e) => setSelectedChain(e.target.value)}
                                                    value={selectedChain}
                                                    >
                                                    <option value="0x1">Ethereum</option>
                                                    <option value="0x13881">Mumbai Testnet</option>
                                                    <option value="0x89">Polygon</option>
                                                    <option value="0xa86a">Avalanche</option>
                                                    </select>
                                                </div>
                                                </div>
                                                <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>     
    </div>
        {/* <div className="wallet-widget p-3 bg-light rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          Welcome {cardHolder} your default account is on {currencyName}: You should consider trading with other currencies of your choice to 
          maximized your profits and multiple earnings
        </div>
        </div> */}
        </div>
            <div className="wallet-widget p-3 bg-light rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="mb-1 text-muted">Main Balance</h6>
                  <h2 className="font-weight-bold text-primary">   Amount :  {balance}</h2>
                  <span className="font-weight-bold text-primary">currency: {currencyName}</span>
                </div>
                <div>
                      <p className="text-muted mb-1">Valid Thru</p>
                      <h6 className="font-weight-bold">{validThru}</h6>  
                  </div>
                <FaBitcoin size={48} className="text-primary" />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                <p className="text-muted mb-1 m-0 d-flex justify-content-between align-items-center mb-3">Wallet ID:</p>
                  <h6 className="font-weight-bold">{walletAddress}</h6>
                  
                </div>
                <div>
                  <p className="text-muted mb-1 text-primary">Card Holder</p>
                  <h6 className="font-weight-bold text-primary">{cardHolder}</h6>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <Button variant="outline-primary" size="sm lg" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
                  Withdraw
                </Button>
                <Button variant="primary" size="sm lg" className="w-100 mx-2" onClick={handleDepositShow}>
                  Deposit
                </Button>
              </div>
            </div>

            <div className="mb-4">
              {/* Assuming WalletWidget is another component */}
              {/* <WalletWidget /> */}
              {/* <div className="col-xl-12 col-md-12 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                   See Other Crypto Currency on your Account SubscriptionPlans
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    <select
                                                    style={{ backgroundColor: '#000033', color: '#FFF' }}
                                                    onChange={(e) => setSelectedChain(e.target.value)}
                                                    value={selectedChain}
                                                    >
                                                    <option value="0x1">Ethereum</option>
                                                    <option value="0x13881">Mumbai Testnet</option>
                                                    <option value="0x89">Polygon</option>
                                                    <option value="0xa86a">Avalanche</option>
                                                    </select>
                                                </div>
                                                </div>
                                                <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div> */}
            </div>

            {!walletExists && (
              <div className="text-center">
                <Button variant="success" onClick={handleCreateWallet}>
                  Create Wallet
                </Button>
              </div>
            )}
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
                    placeholder="Amount to deposit"
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
                    <option value="" disabled>Select a currency</option>
                    {currencies.map(currency => (
                      <option key={currency.id} value={currency.id}>
                        {currency.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="proofOfPayment" className="mt-3">
                  <Form.Label>Upload Proof of Payment</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={() => { /* handle file change logic */ }}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Confirm Deposit
                </Button>
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
                    placeholder="Amount to withdraw"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Confirm Withdrawal
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>

        <div className="col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
                  <WalletWidget />
            

            <div className="mb-4">
              <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
                <div className="wallet-widget p-3 bg-light rounded shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      {/* Placeholder for JS chart showing investment growth */}
                      JS chart for investment growth here
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!walletExists && (
          <div className="text-center">
            <Button variant="success" onClick={handleCreateWallet}>
              Create Wallet
            </Button>
          </div>
        )}
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
                placeholder="Amount to deposit"
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
                <option value="" disabled>Select a currency</option>
                {currencies.map(currency => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="proofOfPayment" className="mt-3">
              <Form.Label>Upload Proof of Payment</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100">
              Confirm Deposit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Withdraw Modal */}
      <Modal show={showWithdrawModal} onHide={handleWithdrawClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw Funds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={{}}>
            <Form.Group controlId="withdrawAmount">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount to withdraw"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Confirm Withdrawal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </div>
    <div className="mb-4">

    </div>
    </div>
  );
};

export default WalletCard;

















// import React, { useState } from 'react';
// import { FaBitcoin } from 'react-icons/fa';
// import { Button, Modal, Form } from 'react-bootstrap';
// import WalletWidget from './WalletWidget'; // Assuming WalletWidget is in the same directory

// const WalletCard = ({ color, balance, validThru, cardHolder }) => {
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);

//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);
//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);

//   return (
//     <div className={`col-xl-6 col-md-6 d-flex align-items-center justify-content-center" style="height: 100vh;" `} >
//       <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//        <div className="wallet-widget p-3 bg-light rounded shadow-sm">

//         {/* Main Balance and Actions */}
//         <div className="d-flex justify-content-between align-items-center mb-4 ">
//           <div>
//             <h4 className="mb-1 text-muted">Main Balance</h4>
//             <h2 className="font-weight-bold">{balance}</h2>
//           </div>
//           <FaBitcoin size={48} className="text-primary" />
//         </div>

//         {/* Card Details */}
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <div>
//             <p className="text-muted mb-1">Valid Thru</p>
//             <h6 className="font-weight-bold">{validThru}</h6>
//           </div>
//           <div>
//             <p className="text-muted mb-1">Card Holder</p>
//             <h6 className="font-weight-bold">{cardHolder}</h6>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-between">
//           <Button variant="outline-primary" size="sm lg" className="w-100 me-2 mx-2" onClick={handleWithdrawShow}>
//             Withdraw
//           </Button>
//           <Button variant="primary" size="sm lg" className="w-100 mx-2" onClick={handleDepositShow}>
//             Deposit
//           </Button>
//         </div>
//        </div>
//          {/* Wallet Widget */}
//          <div className="mb-4">
//           <WalletWidget />
//         </div>

//       </div>

//       {/* Deposit Modal */}
//       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Deposit Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="depositAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control type="number" placeholder="Amount to deposit" />
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
//           <Form>
//             <Form.Group controlId="withdrawAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control type="number" placeholder="Amount to withdraw" />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3 w-100">
//               Confirm Withdrawal
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default WalletCard;


// import React, { useState } from 'react';
// import { FaBitcoin } from 'react-icons/fa';
// import { Button, Modal, Form } from 'react-bootstrap';

// const WalletCard = ({ color, balance, validThru, cardHolder }) => {
//   const [showDepositModal, setShowDepositModal] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);

//   const handleDepositClose = () => setShowDepositModal(false);
//   const handleWithdrawClose = () => setShowWithdrawModal(false);
//   const handleDepositShow = () => setShowDepositModal(true);
//   const handleWithdrawShow = () => setShowWithdrawModal(true);

//   return (
//     <div className={`col-xl-4 col-md-6`}>
//       <div className={`card-holder card shadow-sm p-4 mb-5 rounded ${color}`}>
//         {/* Main Balance and Actions */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div>
//             <h4 className="mb-1 text-muted">Main Balance</h4>
//             <h2 className="font-weight-bold">{balance}</h2>
//           </div>
//           <FaBitcoin size={48} className="text-primary" />
//         </div>

//         {/* Card Details */}
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <div>
//             <p className="text-muted mb-1">Valid Thru</p>
//             <h6 className="font-weight-bold">{validThru}</h6>
//           </div>
//           <div>
//             <p className="text-muted mb-1">Card Holder</p>
//             <h6 className="font-weight-bold">{cardHolder}</h6>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-between">
//           <Button variant="outline-primary" size="sm" className="w-100 me-2" onClick={handleWithdrawShow}>
//             Withdraw
//           </Button>
//           <Button variant="primary" size="sm" className="w-100" onClick={handleDepositShow}>
//             Deposit
//           </Button>
//         </div>
//       </div>

//       {/* Deposit Modal */}
//       <Modal show={showDepositModal} onHide={handleDepositClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Deposit Funds</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="depositAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control type="number" placeholder="Amount to deposit" />
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
//           <Form>
//             <Form.Group controlId="withdrawAmount">
//               <Form.Label>Enter Amount</Form.Label>
//               <Form.Control type="number" placeholder="Amount to withdraw" />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3 w-100">
//               Confirm Withdrawal
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default WalletCard;
