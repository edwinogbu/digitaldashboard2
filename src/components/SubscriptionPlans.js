// src/components/SubscriptionPlans.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { FaArrowDown, FaArrowUp, FaBitcoin, FaLock, FaWallet } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'; // Import the FaTimes icon

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

    const handleCloseModal = () => {
        setShowModal(false);
     // Clear input fields and reset state
     setDepositAmount('');
     setCurrencyId('');
     setProofOfPayment(null);
     setSelectedPlan(null);
    }
    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('walletId', walletId); // Assuming walletAddress as the wallet ID
    //     formData.append('currencyId', currencyId);
    //     formData.append('depositAmount', depositAmount);
    //     formData.append('userId', userId);
    //     formData.append('planId', selectedPlan.id);
    //     formData.append('proofOfPayment', proofOfPayment);

    //     try {
    //         const response = await axios.post('http://localhost:3005/api/crypto/deposits/subscription', formData);
    //         if (response.data.success) {
    //             Swal.fire('Success', 'Subscription created successfully!', 'success');
    //             handleCloseModal();
    //         } else {
    //             Swal.fire('Failed', `Failed to create subscription: ${response.data.message}`, 'error');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting the form:', error);
    //         Swal.fire('Error', 'An error occurred while processing your request.', 'error');
    //     }
    // };


    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    
    //     // Validation check
    //     if (selectedPlan) {
    //         const amount = parseFloat(depositAmount);
    //         const minInvest = parseFloat(selectedPlan.minInvest);
    //         const maxInvest = parseFloat(selectedPlan.maxInvest);
    
    //         if (amount < minInvest || amount > maxInvest) {
    //             Swal.fire(
    //                 'Invalid Amount',
    //                 `The deposit amount must be between ${minInvest} and ${maxInvest}.`,
    //                 'error'
    //             );
    //             return;
    //         }
    //     }
    
    //     const formData = new FormData();
    //     formData.append('walletId', walletId);
    //     formData.append('currencyId', currencyId);
    //     formData.append('depositAmount', depositAmount);
    //     formData.append('userId', userId);
    //     formData.append('planId', selectedPlan.id);
    //     formData.append('proofOfPayment', proofOfPayment);
    
    //     try {
    //         const response = await axios.post('http://localhost:3005/api/crypto/deposits/subscription', formData);
    //         if (response.data.success) {
    //             Swal.fire('Success', 'Subscription created successfully!', 'success');
    //             handleCloseModal();
    //         } else {
    //             Swal.fire('Failed', `Failed to create subscription: ${response.data.message}`, 'error');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting the form:', error);
    //         Swal.fire('Error', 'An error occurred while processing your request.', 'error');
    //     }
    // };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Check for required fields
        if (!depositAmount || !currencyId || !proofOfPayment) {
            Swal.fire('Validation Error', 'Please fill out all required fields.', 'error');
            return;
        }
    
        // Validate deposit amount
        if (selectedPlan) {
            const amount = parseFloat(depositAmount);
            const minInvest = parseFloat(selectedPlan.minInvest);
            const maxInvest = parseFloat(selectedPlan.maxInvest);
    
            if (isNaN(amount) || amount < minInvest || amount > maxInvest) {
                Swal.fire(
                    'Invalid Amount',
                    `The deposit amount must be between ${minInvest} and ${maxInvest}.`,
                    'error'
                );
                return;
            }
        } else {
            Swal.fire('Error', 'No plan selected. Please select a plan.', 'error');
            return;
        }
    
        const formData = new FormData();
        formData.append('walletId', walletId);
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
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="container" style={{
            backgroundColor: "#000033",
            fontSize: "26px",  
            lineHeight: "1.2",  
        }}>
            <div className="row text-center justify-content-center">
                <div className="col-md-12 col-sm-12 col-xs-12 row my-2 g-3 gx-lg-4 pb-3 text-center justify-content-center " >
                    <div className="section-headline text-center justify-content-center">
                        <h3 style={{
                            color: "#f0e000",
                            fontSize: "26px",  
                            lineHeight: "1.2", 
                            textAlign:'center' 
                        }}>
                            INVESTMENT OFFER
                        </h3>
                        <h5 style={{
                            color: "#fff",
                            fontSize: "26px",  
                            lineHeight: "1.2", 
                            textAlign:'center' 
                        }} >Our Investment Best Plans</h5>
                       
                    </div>
                </div>
            </div>
            <div className="row pricing-content justify-content-center">
                {plans.map(plan => (
                    <div className="col-md-3 col-sm-6 col-xs-12" key={plan.id}  >
                        <div className="card-image-wrapper">
                            {/* <img src={plan.image} alt={plan.label} className="card-image" /> */}
                        </div>
                        <div className="pri_table_list" style={{
                        // border: '2px solid #000033', // Border color and width
                        border: '5px solid #f0e000', // Border color and width
                        borderRadius: '10px',       // Rounded corners
                        backgroundColor:'#ffffff'
                      }}>
                            {plan.label && <span className="base">{plan.label}</span>}
                            <div className="top-price-inner">
                                <div className="rates">
                                    <span className="prices">{plan.rate}</span><span className="users">%</span>
                                </div>
                                <span className="per-day">{plan.duration} Days</span>
                            </div>
                            <ol className="pricing-text" style={{backgroundColor:'#f0f0ff', color:'#000033', textAlign:'center', borderRadius:1, padding:1,}}>
                                <li className="check">Minimum Invest: ${plan.minInvest}</li>
                                <li className="check">Maximum Invest: ${plan.maxInvest}</li>
                                <li className="check">Average Monthly: {plan.avgMonthly}%</li>
                                <li className="check">Rate: {plan.rate}%</li>
                            </ol>
                            <div className="price-btn blue">
                            <Button className="blue" onClick={() => handleDepositClick(plan)}>Invest</Button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{backgroundColor:'#000033', color:'#fff', textAlign:'center'}}>
                    <Modal.Title style={{ color:'#f0e00c', textAlign:'center'}} className='d-flex justify-content-between align-items-center mb-3'>Deposit and Subscribe</Modal.Title>
                    
                    <Button  className='btn btn-xs col-2' onClick={handleCloseModal}  style={{backgroundColor:'#000033', color:'#fff', textAlign:'center'}}>
                        <FaTimes onClick={handleCloseModal} style={{ color: '#fff' }}>

                        </FaTimes>
                        
                    </Button>
                </Modal.Header>
                <Modal.Header style={{backgroundColor:'#000033', color:'#fff', textAlign:'center'}}>
                    <br></br>
                    <div className="justify-content-between align-items-center mb-3">
                        make payment to the address:jlasdfdf2a3ad033333333qkll then upload prof of payment
                        </div>
                   
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
                    <Button variant="secondary" onClick={handleCloseModal} style={{backgroundColor:'#000033', color:'#fff'}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

           
        </div>
    );
};

export default SubscriptionPlans;

