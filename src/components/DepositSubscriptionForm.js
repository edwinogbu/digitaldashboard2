import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';
import './DashboardDepositSubscription.css';

const DashboardDepositSubscription = ({ walletId: initialWalletId, planId: initialPlanId }) => {
    const [walletId, setWalletId] = useState(initialWalletId || '');
    const [planId, setPlanId] = useState(initialPlanId || '');
    const [currencyId, setCurrencyId] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [proofOfPayment, setProofOfPayment] = useState(null);
    const { state } = useAuth();
    const user = state.user.user;

    const handleFileChange = (e) => {
        setProofOfPayment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!walletId || !planId || !currencyId || !depositAmount) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Please fill in all the required fields.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('walletId', walletId);
        formData.append('planId', planId);
        formData.append('currencyId', currencyId);
        formData.append('depositAmount', depositAmount);
        formData.append('userId', user.id);

        if (proofOfPayment) {
            formData.append('proofOfPayment', proofOfPayment);
        }

        try {
            const response = await axios.post('/api/deposits/subscription', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: response.data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while processing the deposit and subscription.',
            });
            console.error('Error:', error);
        }
    };

    return (
        <div className="dashboard-deposit-form">
            <h2 className="form-title">Deposit & Subscribe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="walletId">Wallet ID</label>
                    <input
                        type="text"
                        id="walletId"
                        className="form-control"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                        required
                        placeholder="Enter your Wallet ID"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="planId">Plan ID</label>
                    <input
                        type="text"
                        id="planId"
                        className="form-control"
                        value={planId}
                        onChange={(e) => setPlanId(e.target.value)}
                        required
                        placeholder="Enter Plan ID"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currencyId">Currency ID</label>
                    <input
                        type="text"
                        id="currencyId"
                        className="form-control"
                        value={currencyId}
                        onChange={(e) => setCurrencyId(e.target.value)}
                        required
                        placeholder="Enter Currency ID"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="depositAmount">Deposit Amount</label>
                    <input
                        type="number"
                        id="depositAmount"
                        className="form-control"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        required
                        placeholder="Enter Deposit Amount"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="proofOfPayment" className="file-label">Proof of Payment</label>
                    <input
                        type="file"
                        id="proofOfPayment"
                        className="form-control-file"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DashboardDepositSubscription;




// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useAuth } from '../AuthContext';
// import './DashboardDepositSubscription.css';

// const DashboardDepositSubscription = () => {
//     const [walletId, setWalletId] = useState('');
//     const [planId, setPlanId] = useState('');
//     const [currencyId, setCurrencyId] = useState('');
//     const [depositAmount, setDepositAmount] = useState('');
//     const [proofOfPayment, setProofOfPayment] = useState(null);
//     const { state } = useAuth();
//     const user = state.user.user;

//     const handleFileChange = (e) => {
//         setProofOfPayment(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!walletId || !planId || !currencyId || !depositAmount) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Missing Fields',
//                 text: 'Please fill in all the required fields.',
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('walletId', walletId);
//         formData.append('planId', planId);
//         formData.append('currencyId', currencyId);
//         formData.append('depositAmount', depositAmount);
//         formData.append('userId', user.id);

//         if (proofOfPayment) {
//             formData.append('proofOfPayment', proofOfPayment);
//         }

//         try {
//             const response = await axios.post('/api/deposits/subscription', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success',
//                     text: response.data.message,
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Failed',
//                     text: response.data.message,
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'An error occurred while processing the deposit and subscription.',
//             });
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="dashboard-deposit-form">
//             <h2 className="form-title">Deposit & Subscribe</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="walletId">Wallet ID</label>
//                     <input
//                         type="text"
//                         id="walletId"
//                         className="form-control"
//                         value={walletId}
//                         onChange={(e) => setWalletId(e.target.value)}
//                         required
//                         placeholder="Enter your Wallet ID"
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="planId">Plan ID</label>
//                     <input
//                         type="text"
//                         id="planId"
//                         className="form-control"
//                         value={planId}
//                         onChange={(e) => setPlanId(e.target.value)}
//                         required
//                         placeholder="Enter Plan ID"
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="currencyId">Currency ID</label>
//                     <input
//                         type="text"
//                         id="currencyId"
//                         className="form-control"
//                         value={currencyId}
//                         onChange={(e) => setCurrencyId(e.target.value)}
//                         required
//                         placeholder="Enter Currency ID"
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="depositAmount">Deposit Amount</label>
//                     <input
//                         type="number"
//                         id="depositAmount"
//                         className="form-control"
//                         value={depositAmount}
//                         onChange={(e) => setDepositAmount(e.target.value)}
//                         required
//                         placeholder="Enter Deposit Amount"
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="proofOfPayment" className="file-label">Proof of Payment</label>
//                     <input
//                         type="file"
//                         id="proofOfPayment"
//                         className="form-control-file"
//                         onChange={handleFileChange}
//                     />
//                 </div>

//                 <button type="submit" className="btn btn-primary submit-btn">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default DashboardDepositSubscription;
