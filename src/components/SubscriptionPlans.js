// src/components/SubscriptionPlans.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaArrowDown, FaArrowUp, FaBitcoin, FaLock, FaWallet } from 'react-icons/fa';
import { useAuth } from './../AuthContext';

import './SubscriptionPlans.css'; // Include your CSS file here

const SubscriptionPlans = () => {
    // const { state } = useAuth();
    // const user = state?.user?.user; // Safe navigation to access the user object
    // const userId = user?.id; // Extracting userId from the user object

    // const [plans, setPlans] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);



        const { state } = useAuth(); // Getting the user state from the AuthContext
    const user = state?.user?.user; // Safe navigation to access the user object
    const userId = user?.id; // Extracting userId from the user object

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [walletExists, setWalletExists] = useState(false);
    const [balance, setBalance] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [currencyName, setCurrencyName] = useState('');
    const [currencyId, setCurrencyId] = useState('');
    const [walletId, setWalletId] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [proofOfPayment, setProofOfPayment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Fetch subscription plans, wallet details, and available currencies
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
                setPlans(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch subscription plans.');
                setLoading(false);
            }
        };

        
        const fetchWalletData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:3005/api/crypto/wallet/user-wallet-history/${userId}`);
                const result = await response.json();
                console.log('Response data:', result);

                if (result.success && result.data.wallet) {
                    setWalletExists(true);
                    setBalance(result.data.wallet.balance);
                    setWalletAddress(truncateAddress(result.data.wallet.walletAddress));
                    console.log('====================================');
                    console.log('wallet ID:',result.data.wallet.walletId);
                    console.log('wallet ID:',result.data.wallet.walletId);
                    console.log('====================================');
                    setWalletId(result.data.wallet.walletId);
                    setCardHolder(`${user.firstName} ${user.lastName}`);
                    setCurrencyName(result.data.wallet.currency.currencyName);
                } else {
                    setWalletExists(false);
                }
            } catch (error) {
                console.error('Error fetching wallet data:', error);
                Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
            }
        };

        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/crypto/currencies');
                setCurrencies(response.data.data);
                console.log('====================================');
                console.log('currencies',response.data.data);
                console.log('====================================');
            } catch (error) {
                console.error('Failed to fetch currencies:', error);
            }
        };

        fetchPlans();
        fetchWalletData();
        fetchCurrencies();
    }, [userId, user]);

    const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

    const handleDepositClick = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('walletId', walletId); // Assuming walletAddress as the wallet ID
        formData.append('currencyId', currencyId);
        formData.append('depositAmount', depositAmount);
        formData.append('userId', userId);
        formData.append('planId', selectedPlan.id);
        formData.append('proofOfPayment', proofOfPayment);

        try {
            const response = await axios.post('http://localhost:3005/api/crypto/deposits/subscription', formData);
            if (response.data.success) {
                Swal.fire('Success', 'Subscription created successfully!', 'success');
                handleCloseModal();
            } else {
                Swal.fire('Failed', `Failed to create subscription: ${response.data.message}`, 'error');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            Swal.fire('Error', 'An error occurred while processing your request.', 'error');
        }
    };


    // useEffect(() => {
    //     const fetchPlans = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
    //             setPlans(response.data.data);
    //             setLoading(false);
    //         } catch (err) {
    //             setError('Failed to fetch subscription plans.');
    //             setLoading(false);
    //         }
    //     };

    //     fetchPlans();
    // }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="section-headline text-center">
                        <h3 style={{
                            color: "#000033",
                            fontSize: "26px",  
                            lineHeight: "1.2",  
                        }}>
                            INVESTMENT OFFER
                        </h3>
                        <h5>Our Investment Best Plans</h5>
                        <p style={{
                            color: "#000033",
                            fontSize: "16px",
                            paddingBottom: '25px',
                            marginBottom: '25px',
                            margin: '25px',
                        }}>
                            Our experts have set up these investment plans strategically, which minimizes your risk
                            of investment and maximizes the return of interest.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row pricing-content">
                {plans.map(plan => (
                    <div className="col-md-3 col-sm-6 col-xs-12" key={plan.id}  >
                        <div className="card-image-wrapper">
                            {/* <img src={plan.image} alt={plan.label} className="card-image" /> */}
                        </div>
                        <div className="pri_table_list" style={{
                        border: '2px solid #000033', // Border color and width
                        borderRadius: '10px',       // Rounded corners
                      }}>
                            {plan.label && <span className="base">{plan.label}</span>}
                            <div className="top-price-inner">
                                <div className="rates">
                                    <span className="prices">{plan.rate}</span><span className="users">Daily</span>
                                </div>
                                <span className="per-day">{plan.duration} months</span>
                            </div>
                            <ol className="pricing-text">
                                <li className="check">Minimum Invest: ${plan.minInvest}</li>
                                <li className="check">Maximum Invest: ${plan.maxInvest}</li>
                                <li className="check">Average Monthly: {plan.avgMonthly}%</li>
                            </ol>
                            <div className="price-btn blue">
                            <Button className="blue" onClick={() => handleDepositClick(plan)}>Deposit</Button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit and Subscribe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
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

                        <Form.Group controlId="currencyId">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control
                                as="select"
                                value={currencyId}
                                onChange={(e) => setCurrencyId(e.target.value)}
                                required
                            >
                                <option value="">Select Currency</option>
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="proofOfPayment">
                            <Form.Label>Proof of Payment</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setProofOfPayment(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit and Subscribe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
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

                        <Form.Group controlId="currencyId">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control
                                as="select"
                                value={currencyId}
                                onChange={(e) => setCurrencyId(e.target.value)}
                                required
                            >
                                <option value="">Select Currency</option>
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="proofOfPayment">
                            <Form.Label>Proof of Payment</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setProofOfPayment(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubscriptionPlans;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaLock, FaWallet } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import './SubscriptionPlans.css'; // Include your CSS file here

// const SubscriptionPlans = () => {
//     const { state } = useAuth();
//     const user = state?.user?.user; // Safe navigation to access the user object
//     const userId = user?.id; // Extracting userId from the user object

//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedPlan, setSelectedPlan] = useState(null);

//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
//                 setPlans(response.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch subscription plans.');
//                 setLoading(false);
//             }
//         };

//         fetchPlans();
//     }, []);

//     const handleDepositClick = (plan) => {
//         setSelectedPlan(plan);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedPlan(null);
//     };

//     const handleDeposit = async () => {
//         // Handle deposit logic here, e.g., form submission or API call.
//         // Example: axios.post('/api/deposit', { planId: selectedPlan.id, userId, amount });
//         Swal.fire('Success', 'Deposit successful!', 'success');
//         handleCloseModal();
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12 col-sm-12 col-xs-12">
//                     <div className="section-headline text-center">
//                         <h3 style={{
//                             color: "#000033",
//                             fontSize: "26px",  
//                             lineHeight: "1.2",  
//                         }}>
//                             INVESTMENT OFFER
//                         </h3>
//                         <h5>Our Investment Best Plans</h5>
//                         <p style={{
//                             color: "#000033",
//                             fontSize: "16px",
//                             paddingBottom: '25px',
//                             marginBottom: '25px',
//                             margin: '25px',
//                         }}>
//                             Our experts have set up these investment plans strategically, which minimizes your risk
//                             of investment and maximizes the return of interest.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className="row pricing-content">
//                 {plans.map(plan => (
//                     <div className="col-md-3 col-sm-6 col-xs-12" key={plan.id}>
//                         <div className="card-image-wrapper">
//                             {/* <img src={plan.image} alt={plan.label} className="card-image" /> */}
//                         </div>
//                         <div className="pri_table_list">
//                             {plan.label && <span className="base">{plan.label}</span>}
//                             <div className="top-price-inner">
//                                 <div className="rates">
//                                     <span className="prices">{plan.rate}</span><span className="users">Daily</span>
//                                 </div>
//                                 <span className="per-day">{plan.duration} months</span>
//                             </div>
//                             <ol className="pricing-text">
//                                 <li className="check">Minimum Invest: ${plan.minInvest}</li>
//                                 <li className="check">Maximum Invest: ${plan.maxInvest}</li>
//                                 <li className="check">Average Monthly: {plan.avgMonthly}%</li>
//                             </ol>
//                             <div className="price-btn blue">
//                                 <Button className="blue" onClick={() => handleDepositClick(plan)}>Deposit</Button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Modal for Deposit */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Deposit to {selectedPlan?.label}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="formAmount">
//                             <Form.Label>Amount</Form.Label>
//                             <Form.Control type="number" placeholder="Enter amount" />
//                         </Form.Group>
//                         <Form.Group controlId="formWallet">
//                             <Form.Label>Wallet ID</Form.Label>
//                             <Form.Control type="text" value={userId} readOnly />
//                         </Form.Group>
//                         <Form.Group controlId="formCurrency">
//                             <Form.Label>Currency</Form.Label>
//                             <Form.Control type="text" value={selectedPlan?.currencyName} readOnly />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//                     <Button variant="primary" onClick={handleDeposit}>Deposit</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default SubscriptionPlans;




// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
// import axios from 'axios';
// import { useAuth } from './../AuthContext'; // Assume useAuth hook is set up to retrieve user data
// import './CreateSubscriptionPlan.css';

// const SubscriptionPlans = () => {
//     const { state } = useAuth(); // Getting the user state from the AuthContext
//     const user = state?.user?.user; // Safe navigation to access the user object
//     const userId = user?.id; // Extracting userId from the user object

//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [walletId, setWalletId] = useState(null);
//     const [currencyId, setCurrencyId] = useState('');
//     const [depositAmount, setDepositAmount] = useState('');
//     const [proofOfPayment, setProofOfPayment] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [currencies, setCurrencies] = useState([]);
//     const [selectedPlan, setSelectedPlan] = useState(null);

//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
//                 setPlans(response.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch subscription plans.');
//                 setLoading(false);
//             }
//         };

//         const fetchWalletDetails = async () => {
//             try {
//                 const response = await axios.get(`/api/wallet/${user.id}`);
//                 setWalletId(response.data.walletId);
//             } catch (error) {
//                 console.error('Failed to fetch wallet details:', error);
//             }
//         };

//         const fetchCurrencies = async () => {
//             try {
//                 const response = await axios.get(`/api/currencies`);
//                 setCurrencies(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch currencies:', error);
//             }
//         };

//         fetchPlans();
//         fetchWalletDetails();
//         fetchCurrencies();
//     }, [user.id]);

//     const handleDepositClick = (plan) => {
//         setSelectedPlan(plan);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => setShowModal(false);

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('walletId', walletId);
//         formData.append('currencyId', currencyId);
//         formData.append('depositAmount', depositAmount);
//         formData.append('userId', user.id);
//         formData.append('planId', selectedPlan.id);
//         formData.append('proofOfPayment', proofOfPayment);

//         try {
//             const response = await axios.post('/api/deposits/subscription', formData);
//             if (response.data.success) {
//                 alert('Subscription created successfully!');
//                 handleCloseModal();
//             } else {
//                 alert('Failed to create subscription: ' + response.data.message);
//             }
//         } catch (error) {
//             console.error('Error submitting the form:', error);
//             alert('An error occurred while processing your request.');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12 col-sm-12 col-xs-12">
//                     <div className="section-headline text-center">
//                         <h3 style={{
//                             color: "#000033",
//                             fontSize: "26px",  
//                             lineHeight: "1.2",  
//                         }}>
//                             INVESTMENT OFFER
//                         </h3>
//                         <h5>Our Investment Best Plans</h5>
//                         <p style={{
//                             color: "#000033",
//                             fontSize: "16px",
//                             paddingBottom: '25px',
//                             marginBottom: '25px',
//                             margin: '25px',
//                         }}>
//                             Our experts have set up these investment plans strategically, which minimizes your risk
//                             of investment and maximizes the return of interest.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className="row pricing-content">
//                 {loading ? (
//                     <Spinner animation="border" role="status">
//                         <span className="sr-only">Loading...</span>
//                     </Spinner>
//                 ) : error ? (
//                     <Alert variant="danger">{error}</Alert>
//                 ) : (
//                     plans.map(plan => (
//                         <div className="col-md-3 col-sm-6 col-xs-12" key={plan.id}>
//                             <div className="card-image-wrapper">
//                                 {/* <img src={plan.image} alt={plan.label} className="card-image" /> */}
//                             </div>
//                             <div className="pri_table_list">
//                                 {plan.label && <span className="base">{plan.label}</span>}
//                                 <div className="top-price-inner">
//                                     <div className="rates">
//                                         <span className="prices">{plan.rate}</span><span className="users">Daily</span>
//                                     </div>
//                                     <span className="per-day">{plan.duration} months</span>
//                                 </div>
//                                 <ol className="pricing-text">
//                                     <li className="check">Minimum Invest: ${plan.minInvest}</li>
//                                     <li className="check">Maximum Invest: ${plan.maxInvest}</li>
//                                     <li className="check">Average Monthly: {plan.avgMonthly}%</li>
//                                 </ol>
//                                 <div className="price-btn blue">
//                                     <Button className="blue" onClick={() => handleDepositClick(plan)}>Deposit</Button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>

//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Deposit and Subscribe</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleFormSubmit}>
//                         <Form.Group controlId="depositAmount">
//                             <Form.Label>Deposit Amount</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Enter deposit amount"
//                                 value={depositAmount}
//                                 onChange={(e) => setDepositAmount(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="currencyId">
//                             <Form.Label>Currency</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 value={currencyId}
//                                 onChange={(e) => setCurrencyId(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Currency</option>
//                                 {currencies.map((currency) => (
//                                     <option key={currency.id} value={currency.id}>
//                                         {currency.name}
//                                     </option>
//                                 ))}
//                             </Form.Control>
//                         </Form.Group>

//                         <Form.Group controlId="proofOfPayment">
//                             <Form.Label>Proof of Payment</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 onChange={(e) => setProofOfPayment(e.target.files[0])}
//                                 required
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default SubscriptionPlans;



// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaLock, FaWallet } from 'react-icons/fa';
// import { useAuth } from './../AuthContext';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './CreateSubscriptionPlan.css';

// const SubscriptionPlans = () => {
//     const { state } = useAuth(); // Getting the user state from the AuthContext
//     const user = state?.user?.user; // Safe navigation to access the user object
//     const userId = user?.id; // Extracting userId from the user object

//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [walletExists, setWalletExists] = useState(false);
//     const [balance, setBalance] = useState(0);
//     const [walletAddress, setWalletAddress] = useState('');
//     const [cardHolder, setCardHolder] = useState('');
//     const [currencyName, setCurrencyName] = useState('');
//     const [currencyId, setCurrencyId] = useState('');
//     const [depositAmount, setDepositAmount] = useState('');
//     const [proofOfPayment, setProofOfPayment] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [currencies, setCurrencies] = useState([]);
//     const [selectedPlan, setSelectedPlan] = useState(null);

//     // Fetch subscription plans, wallet details, and available currencies
//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
//                 setPlans(response.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch subscription plans.');
//                 setLoading(false);
//             }
//         };

//         const fetchWalletData = async () => {
//             if (!userId) return;

//             try {
//                 const response = await fetch(`http://localhost:3005/api/crypto/wallet/user-wallet-history/${userId}`);
//                 const result = await response.json();
//                 console.log('Response data:', result);

//                 if (result.success && result.data.wallet) {
//                     setWalletExists(true);
//                     setBalance(result.data.wallet.balance);
//                     setWalletAddress(truncateAddress(result.data.wallet.walletAddress));
//                     setCardHolder(`${user.firstName} ${user.lastName}`);
//                     setCurrencyName(result.data.wallet.currency.currencyName);
//                 } else {
//                     setWalletExists(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching wallet data:', error);
//                 Swal.fire('Error', 'Failed to fetch wallet data.', 'error');
//             }
//         };

//         const fetchCurrencies = async () => {
//             try {
//                 const response = await axios.get('/api/currencies');
//                 setCurrencies(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch currencies:', error);
//             }
//         };

//         fetchPlans();
//         fetchWalletData();
//         fetchCurrencies();
//     }, [userId, user]);

//     const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

//     const handleDepositClick = (plan) => {
//         setSelectedPlan(plan);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => setShowModal(false);

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('walletId', walletAddress); // Assuming walletAddress as the wallet ID
//         formData.append('currencyId', currencyId);
//         formData.append('depositAmount', depositAmount);
//         formData.append('userId', userId);
//         formData.append('planId', selectedPlan.id);
//         formData.append('proofOfPayment', proofOfPayment);

//         try {
//             const response = await axios.post('/api/deposits/subscription', formData);
//             if (response.data.success) {
//                 Swal.fire('Success', 'Subscription created successfully!', 'success');
//                 handleCloseModal();
//             } else {
//                 Swal.fire('Failed', `Failed to create subscription: ${response.data.message}`, 'error');
//             }
//         } catch (error) {
//             console.error('Error submitting the form:', error);
//             Swal.fire('Error', 'An error occurred while processing your request.', 'error');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12 col-sm-12 col-xs-12">
//                     <div className="section-headline text-center">
//                         <h3 style={{ color: "#000033", fontSize: "26px", lineHeight: "1.2" }}>
//                             INVESTMENT OFFER
//                         </h3>
//                         <h5>Our Investment Best Plans</h5>
//                         <p style={{ color: "#000033", fontSize: "16px", paddingBottom: '25px', marginBottom: '25px', margin: '25px' }}>
//                             Our experts have set up these investment plans strategically, which minimizes your risk of investment and maximizes the return of interest.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className="row pricing-content">
//                 {loading ? (
//                     <Spinner animation="border" role="status">
//                         <span className="sr-only">Loading...</span>
//                     </Spinner>
//                 ) : error ? (
//                     <Alert variant="danger">{error}</Alert>
//                 ) : (
//                     plans.map(plan => (
//                         <div className="col-md-3 col-sm-6 col-xs-12" key={plan.id}>
//                             <div className="card-image-wrapper">
//                                 {/* <img src={plan.image} alt={plan.label} className="card-image" /> */}
//                             </div>
//                             <div className="pri_table_list">
//                                 {plan.label && <span className="base">{plan.label}</span>}
//                                 <div className="top-price-inner">
//                                     <div className="rates">
//                                         <span className="prices">{plan.rate}</span><span className="users">Daily</span>
//                                     </div>
//                                     <span className="per-day">{plan.duration} months</span>
//                                 </div>
//                                 <ol className="pricing-text">
//                                     <li className="check">Minimum Invest: ${plan.minInvest}</li>
//                                     <li className="check">Maximum Invest: ${plan.maxInvest}</li>
//                                     <li className="check">Average Monthly: {plan.avgMonthly}%</li>
//                                 </ol>
//                                 <div className="price-btn blue">
//                                     <Button className="blue" onClick={() => handleDepositClick(plan)}>Deposit</Button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>

//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Deposit and Subscribe</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleFormSubmit}>
//                         <Form.Group controlId="depositAmount">
//                             <Form.Label>Deposit Amount</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Enter deposit amount"
//                                 value={depositAmount}
//                                 onChange={(e) => setDepositAmount(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="currencyId">
//                             <Form.Label>Currency</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 value={currencyId}
//                                 onChange={(e) => setCurrencyId(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Currency</option>
//                                 {currencies.map((currency) => (
//                                     <option key={currency.id} value={currency.id}>
//                                         {currency.name}
//                                     </option>
//                                 ))}
//                             </Form.Control>
//                         </Form.Group>

//                         <Form.Group controlId="proofOfPayment">
//                             <Form.Label>Proof of Payment</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 onChange={(e) => setProofOfPayment(e.target.files[0])}
//                                 required
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default SubscriptionPlans;
