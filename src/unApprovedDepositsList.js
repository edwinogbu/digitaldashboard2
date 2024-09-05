import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const UnApprovedDepositsList = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
        setDeposits(response.data);
      } catch (error) {
        console.error('Error fetching deposits:', error);
        Swal.fire('Error', 'Failed to fetch deposits', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  // Approve a deposit
  const handleApprove = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Approve deposit with ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
          status: 'accepted',
        });

        if (response.data.success) {
          Swal.fire('Approved!', response.data.message, 'success');
          // Remove the approved deposit from the list
          setDeposits(deposits.filter((deposit) => deposit.id !== id));
        } else {
          Swal.fire('Error', response.data.message, 'error');
        }
      }
    } catch (error) {
      console.error('Error approving deposit:', error);
      Swal.fire('Error', `Failed to approve deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
  };

  // Reject a deposit
  const handleReject = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Reject deposit with ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const response = await axios.put(`http://localhost:3005/api/crypto/approve-deposit-status/${id}`, {
          status: 'rejected',
        });

        if (response.data.success) {
          Swal.fire('Rejected!', response.data.message, 'success');
          // Remove the rejected deposit from the list
          setDeposits(deposits.filter((deposit) => deposit.id !== id));
        } else {
          Swal.fire('Error', response.data.message, 'error');
        }
      }
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      Swal.fire('Error', `Failed to reject deposit: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
  };

  return (
    <div className="deposits-list p-4 bg-white rounded shadow-sm">
      <h4 className="mb-4">UnApproved Deposits</h4>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Proof of Payment</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length > 0 ? (
                deposits.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.id}</td>
                    <td>{deposit.depositorName}</td>
                    <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
                    <td>{deposit.amount}</td>
                    <td>{deposit.currencyName}</td>
                    <td>
                      {deposit.proofOfPayment ? (
                        <img
                          src={`http://localhost:3005/${deposit.proofOfPayment}`}
                          alt="Proof of Payment"
                          style={{ width: '100px', height: 'auto' }}
                        />
                      ) : (
                        'No proof available'
                      )}
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(deposit.id)}
                        className="me-2"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleReject(deposit.id)}
                        className="me-2"
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No deposits found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
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
