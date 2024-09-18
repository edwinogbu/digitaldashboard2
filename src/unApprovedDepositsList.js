// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const UnApprovedDepositsList = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch pending deposits
//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
//         setDeposits(response.data);
//       } catch (error) {
//         console.error('Error fetching deposits:', error);
//         Swal.fire('Error', 'Failed to fetch deposits', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   // Handle deposit approval
//   const handleApprove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Approve deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, approve it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'accepted',
//         });

//         if (response.data.success) {
//           // Remove the approved deposit from the list
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//           Swal.fire('Approved!', response.data.message, 'success');
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Error approving deposit:', error);
//       Swal.fire('Error', `Failed to approve deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
//     }
//   };

//   // Handle deposit rejection
//   const handleReject = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Reject deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, reject it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'rejected',
//         });

//         if (response.data.success) {
//           // Remove the rejected deposit from the list
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//           Swal.fire('Rejected!', response.data.message, 'success');
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Error rejecting deposit:', error);
//       Swal.fire('Error', `Failed to reject deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
//     }
//   };

//   // Filter deposits to only show those with status 'pending'
//   const pendingDeposits = deposits.filter(deposit => deposit.status === 'pending');

//   return (
//     <div className="deposits-list p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">Unapproved Deposits</h4>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Currency</th>
//                 <th>Proof of Payment</th>
//                 <th>Admin Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingDeposits.length > 0 ? (
//                 pendingDeposits.map((deposit) => (
//                   <tr key={deposit.id}>
//                     <td>{deposit.id}</td>
//                     <td>{deposit.depositorName}</td>
//                     <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
//                     <td>{deposit.amount}</td>
//                     <td>{deposit.currencyName}</td>
//                     <td>
//                       {deposit.proofOfPayment ? (
//                         <img
//                           src={`http://localhost:3005/${deposit.proofOfPayment}`}
//                           alt="Proof of Payment"
//                           style={{ width: '100px', height: 'auto' }}
//                         />
//                       ) : (
//                         'No proof available'
//                       )}
//                     </td>
//                     <td>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => handleApprove(deposit.id)}
//                         className="me-2"
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleReject(deposit.id)}
//                         className="me-2"
//                       >
//                         Reject
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center text-muted">
//                     No deposits found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnApprovedDepositsList;



import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const UnApprovedDepositsList = () => {
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(null); // Track deposit being updated

    useEffect(() => {
        // Fetch deposits when component mounts
        fetchDeposits();
    }, []);

    const fetchDeposits = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
            setDeposits(response.data || []); // Set deposits to response data
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch deposits.');
            setLoading(false);
        }
    };

    const updateDepositStatus = async (depositId, status) => {
        try {
            setUpdating(depositId);
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `You are about to ${status} the deposit.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Yes, ${status === 'accepted' ? 'accept' : 'reject'} it!`,
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${depositId}`, {
                    status,
                });

                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `Deposit has been ${status === 'accepted' ? 'accepted' : 'rejected'}.`,
                        confirmButtonColor: '#000033',
                    });
                    fetchDeposits(); // Refresh deposits after update
                } else {
                    setError(response.data.message);
                }
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update deposit status.',
                confirmButtonColor: '#000033',
            });
        } finally {
            setUpdating(null);
        }
    };

    const tableStyle = {
        backgroundColor: '#000033', // Table background color
        color: '#fff', // Text color
    };

    const buttonStyle = (variant) => ({
        backgroundColor: variant === 'success' ? '#f0e00f' : '#000033', // Button color
        color: variant === 'success' ? '#000033' : '#f0e00f',
        border: `1px solid ${variant === 'success' ? '#f0e00f' : '#f0e00f'}`,
        padding: '0.375rem 0.75rem',
        fontSize: '0.9rem',
    });

    if (loading) {
        return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
    }

    return (
      <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
      <div className="row align-items-center justify-content-center" style={{ height: '100%', backgroundColor:'#000033' }}>
        <div className="container-fluid">
            <h2 className="text-center my-4" style={{ color: '#f0e00f' }}>Deposit Management</h2>

            {error && <Alert variant="danger text-danger">{error}</Alert>}

            <div className="table-responsive">
                <Table striped bordered hover responsive="sm" style={tableStyle} className="table-sm">
                    <thead style={{color:'#000033', border:'2px solid green', borderRadius:10,}}>
                        <tr style={{color:'#000033', border:'2px solid green', borderRadius:10,}}>
                            <th>#</th>
                            {/* <th>Wallet ID</th> */}
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Status</th>
                            <th>Depositor Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(deposits) && deposits.length > 0 ? (
                            deposits.map((deposit, index) => (
                                <tr key={deposit.id}>
                                    <td>{index + 1}</td>
                                    {/* <td>{deposit.walletId}</td> */}
                                    <td>{deposit.amount}</td>
                                    <td>{deposit.currencyName}</td> {/* Updated currency display */}
                                    <td>{deposit.status}</td>
                                    <td>{deposit.depositorName}</td> {/* Added depositor name */}
                                    <td>{deposit.phone}</td> {/* Added phone */}
                                    <td>{deposit.email}</td> {/* Added email */}
                                    <td>
                                        {deposit.status === 'pending' && (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    disabled={updating === deposit.id}
                                                    style={buttonStyle('success')}
                                                    onClick={() => updateDepositStatus(deposit.id, 'accepted')}
                                                >
                                                    {updating === deposit.id ? 'Processing...' : 'Accept'}
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    disabled={updating === deposit.id}
                                                    style={buttonStyle('danger')}
                                                    onClick={() => updateDepositStatus(deposit.id, 'rejected')}
                                                >
                                                    {updating === deposit.id ? 'Processing...' : 'Reject'}
                                                </Button>
                                            </div>
                                        )}
                                        {deposit.status !== 'pending' && (
                                            <span>{deposit.status === 'accepted' ? 'Accepted' : 'Rejected'}</span>
                                        )}
                                    </td>

                                    {/* <td>
                                        {deposit.status === 'pending' && (
                                            <div>
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    disabled={updating === deposit.id}
                                                    style={buttonStyle('success')}
                                                    onClick={() => updateDepositStatus(deposit.id, 'accepted')}
                                                >
                                                    {updating === deposit.id ? 'Processing...' : 'Accept'}
                                                </Button>{' '}
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    disabled={updating === deposit.id}
                                                    style={buttonStyle('danger')}
                                                    onClick={() => updateDepositStatus(deposit.id, 'rejected')}
                                                >
                                                    {updating === deposit.id ? 'Processing...' : 'Reject'}
                                                </Button>
                                            </div>
                                        )}
                                        {deposit.status !== 'pending' && (
                                            <span>{deposit.status === 'accepted' ? 'Accepted' : 'Rejected'}</span>
                                        )}
                                    </td> */}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No deposits found</td> {/* Updated colspan */}
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
        </div>
        </div>
    );
};

export default UnApprovedDepositsList;



// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const UnApprovedDepositsList = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch pending deposits
//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
//         setDeposits(response.data);
//       } catch (error) {
//         console.error('Error fetching deposits:', error);
//         Swal.fire('Error', 'Failed to fetch deposits', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   // Approve a deposit
//   const handleApprove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Approve deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, approve it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'accepted',
//         });

//         if (response.data.success) {
//           Swal.fire('Approved!', response.data.message, 'success');
//           // Remove the approved deposit from the list
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Error approving deposit:', error);
//       Swal.fire('Error', `Failed to approve deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
//     }
//   };

//   // Reject a deposit
//   const handleReject = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Reject deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, reject it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'rejected',
//         });

//         if (response.data.success) {
//           Swal.fire('Rejected!', response.data.message, 'success');
//           // Remove the rejected deposit from the list
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Error rejecting deposit:', error);
//       Swal.fire('Error', `Failed to reject deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
//     }
//   };

//   return (
//     <div className="deposits-list p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">UnApproved Deposits</h4>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Currency</th>
//                 <th>Proof of Payment</th>
//                 <th>Admin Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deposits.length > 0 ? (
//                 deposits.map((deposit) => (
//                   <tr key={deposit.id}>
//                     <td>{deposit.id}</td>
//                     <td>{deposit.depositorName}</td>
//                     <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
//                     <td>{deposit.amount}</td>
//                     <td>{deposit.currencyName}</td>
//                     <td>
//                       {deposit.proofOfPayment ? (
//                         <img
//                           src={`http://localhost:3005/${deposit.proofOfPayment}`}
//                           alt="Proof of Payment"
//                           style={{ width: '100px', height: 'auto' }}
//                         />
//                       ) : (
//                         'No proof available'
//                       )}
//                     </td>
//                     <td>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => handleApprove(deposit.id)}
//                         className="me-2"
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleReject(deposit.id)}
//                         className="me-2"
//                       >
//                         Reject
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center text-muted">
//                     No deposits found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnApprovedDepositsList;

// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const UnApprovedDepositsList = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
//         setDeposits(response.data);
//       } catch (error) {
//         console.error('Error fetching deposits:', error);
//         Swal.fire('Error', 'Failed to fetch deposits', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Approve deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, approve it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'accepted',
//         });

//         if (response.data.success) {
//           Swal.fire('Approved!', response.data.message, 'success');
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Error approving deposit:', error);
//       Swal.fire('Error', `Failed to approve deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Reject deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, reject it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'rejected',
//         });

//         if (response.data.success) {
//           Swal.fire('Rejected!', response.data.message, 'success');
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Error rejecting deposit:', error);
//       Swal.fire('Error', `Failed to reject deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
//     }
//   };

//   return (
//     <div className="deposits-list p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">UnApproved Deposits</h4>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Currency</th>
//                 <th>Deposit Status</th>
//                 <th>Proof of Payment</th>
//                 <th>Admin Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deposits.length > 0 ? (
//                 deposits.map((deposit) => (
//                   <tr key={deposit.id}>
//                     <td>{deposit.id}</td>
//                     <td>{deposit.depositorName}</td>
//                     <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
//                     <td>{deposit.amount}</td>
//                     <td>{deposit.currencyName}</td>
//                     <td>{deposit.status}</td>
//                     <td>
//                       {deposit.proofOfPayment ? (
//                         <img
//                           src={`http://localhost:3005/${deposit.proofOfPayment}`}
//                           alt="Proof of Payment"
//                           style={{ width: '100px', height: 'auto' }}
//                         />
//                       ) : (
//                         'No proof available'
//                       )}
//                     </td>
//                     <td>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => handleApprove(deposit.id)}
//                         className="me-2"
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleReject(deposit.id)}
//                         className="me-2"
//                       >
//                         Reject
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center text-muted">
//                     No deposits found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnApprovedDepositsList;


// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const UnApprovedDepositsList = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
//         if (Array.isArray(response.data)) {
//           setDeposits(response.data);
//         } else {
//           throw new Error('Unexpected response format');
//         }
//       } catch (error) {
//         console.error('Error fetching deposits:', error);
//         Swal.fire('Error', 'Failed to fetch deposits', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Approve deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, approve it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'accepted',
//         });

//         if (response.data.success) {
//           Swal.fire('Approved!', response.data.message, 'success');
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to approve deposit', 'error');
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Reject deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, reject it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'rejected',
//         });

//         if (response.data.success) {
//           Swal.fire('Rejected!', response.data.message, 'success');
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to reject deposit', 'error');
//     }
//   };

//   return (
//     <div className="deposits-list p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">UnApproved Deposits</h4>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Currency</th>
//                 <th>subscription Plan</th>
//                 <th>Proof of Payment</th>
//                 <th>Admin Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deposits.length > 0 ? (
//                 deposits.map((deposit) => (
//                   <tr key={deposit.id}>
//                     <td>{deposit.id}</td>
//                     <td>{deposit.depositorName}</td>
//                     <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
//                     <td>{deposit.amount}</td>
//                     <td>{deposit.currencyName}</td>
//                     <td>{deposit.subscriptionPlanLabel}</td>
//                     <td>
//                       {deposit.proofOfPayment ? (
//                         <img
//                           src={`http://localhost:3005/${deposit.proofOfPayment}`}
//                           alt="Proof of Payment"
//                           style={{ width: '100px', height: 'auto' }}
//                         />
//                       ) : (
//                         'No proof available'
//                       )}
//                     </td>
//                     <td>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => handleApprove(deposit.id)}
//                         className="me-2"
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleReject(deposit.id)}
//                         className="me-2"
//                       >
//                         Reject
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center text-muted">
//                     No deposits found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnApprovedDepositsList;


// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const UnApprovedDepositsList = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
//         if (Array.isArray(response.data)) {
//           setDeposits(response.data);
//         } else {
//           throw new Error('Unexpected response format');
//         }
//       } catch (error) {
//         console.error('Error fetching deposits:', error);
//         Swal.fire('Error', 'Failed to fetch deposits', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Approve deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, approve it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'accepted',
//         });

//         if (response.data.success) {
//           Swal.fire('Approved!', response.data.message, 'success');
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to approve deposit', 'error');
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Reject deposit with ID ${id}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, reject it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
//           status: 'rejected',
//         });

//         if (response.data.success) {
//           Swal.fire('Rejected!', response.data.message, 'success');
//           setDeposits(deposits.filter((deposit) => deposit.id !== id));
//         } else {
//           Swal.fire('Error', response.data.message, 'error');
//         }
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to reject deposit', 'error');
//     }
//   };

//   return (
//     <div className="deposits-list p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">UnApproved Deposits</h4>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Currency</th>
//                 <th>Admin Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deposits.length > 0 ? (
//                 deposits.map((deposit) => (
//                   <tr key={deposit.id}>
//                     <td>{deposit.id}</td>
//                     <td>{deposit.depositorName}</td>
//                     <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
//                     <td>{deposit.amount}</td>
//                     <td>{deposit.currencyName}</td>
//                     <td>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => handleApprove(deposit.id)}
//                         className="me-2"
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleReject(deposit.id)}
//                         className="me-2"
//                       >
//                         Reject
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No deposits found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnApprovedDepositsList;
