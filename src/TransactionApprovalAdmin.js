import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const TransactionApprovalAdmin = ({ initialTransactions }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');

  const handleShowModal = (transaction, action) => {
    setSelectedTransaction(transaction);
    setAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setShowModal(false);
  };

  const handleApprove = () => {
    updateTransactionStatus(selectedTransaction.transactionId, 'Approved');
    handleCloseModal();
  };

  const handleReject = () => {
    updateTransactionStatus(selectedTransaction.transactionId, 'Rejected');
    handleCloseModal();
  };

  const updateTransactionStatus = (transactionId, newStatus) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.transactionId === transactionId
          ? { ...transaction, status: newStatus }
          : transaction
      )
    );
  };

  return (
    <div className="row my-2 g-3 gx-lg-4 pb-3" style={{backgroundColor:'#000033',  color:'#fff'}}>
    <div className={`col-xl-11 col-md-11 d-flex align-items-center justify-content-center" style="height: 100vh;" `} >
    <div className={`card-holder card shadow-sm p-4 mb-5 rounded bg-primary`}>

     <div className="transaction-approval-admin p-4 bg-white rounded shadow-sm">
      <h4 className="mb-4">Pending Transactions</h4>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Investment Plan</th>
              <th>Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.transactionId}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>{transaction.investmentPlan || '-'}</td>
                  <td>{transaction.details}</td>
                  <td>
                    {transaction.status === 'Pending' ? (
                      <span className="text-warning">Pending</span>
                    ) : transaction.status === 'Approved' ? (
                      <span className="text-success">Approved</span>
                    ) : (
                      <span className="text-danger">Rejected</span>
                    )}
                  </td>
                  <td>
                    {transaction.status === 'Pending' ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleShowModal(transaction, 'Approve')}
                          className="me-2"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleShowModal(transaction, 'Reject')}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button variant="secondary" size="sm" disabled>
                        Action Taken
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No pending transactions found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal for Approval Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{action === 'Approve' ? 'Approve' : 'Reject'} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to <strong>{action}</strong> this transaction?
          </p>
          <Form.Group>
            <Form.Label>Transaction ID:</Form.Label>
            <p>{selectedTransaction?.transactionId}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Type:</Form.Label>
            <p>{selectedTransaction?.type}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <p>${selectedTransaction?.amount.toFixed(2)}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Investment Plan:</Form.Label>
            <p>{selectedTransaction?.investmentPlan || '-'}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Details:</Form.Label>
            <p>{selectedTransaction?.details}</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {action === 'Approve' ? (
            <Button variant="success" onClick={handleApprove}>
              Approve
            </Button>
          ) : (
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
    </div>
  );
};

export default TransactionApprovalAdmin;


// import React, { useState } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const TransactionApprovalAdmin = ({ pendingTransactions, onUpdateTransaction }) => {
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [action, setAction] = useState('');

//   const handleShowModal = (transaction, action) => {
//     setSelectedTransaction(transaction);
//     setAction(action);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTransaction(null);
//     setShowModal(false);
//   };

//   const handleApprove = () => {
//     onUpdateTransaction(selectedTransaction.transactionId, 'Approved', selectedTransaction);
//     handleCloseModal();
//   };

//   const handleReject = () => {
//     onUpdateTransaction(selectedTransaction.transactionId, 'Rejected', selectedTransaction);
//     handleCloseModal();
//   };

//   return (
//     <div className="transaction-approval-admin p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">Pending Transactions</h4>

//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead className="table-dark">
//             <tr>
//               <th>Transaction ID</th>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Investment Plan</th>
//               <th>Details</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingTransactions.length > 0 ? (
//               pendingTransactions.map((transaction, index) => (
//                 <tr key={index}>
//                   <td>{transaction.transactionId}</td>
//                   <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                   <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
//                   <td>${transaction.amount.toFixed(2)}</td>
//                   <td>{transaction.investmentPlan || '-'}</td>
//                   <td>{transaction.details}</td>
//                   <td>
//                     {transaction.status === 'Pending' ? (
//                       <span className="text-warning">Pending</span>
//                     ) : transaction.status === 'Approved' ? (
//                       <span className="text-success">Approved</span>
//                     ) : (
//                       <span className="text-danger">Rejected</span>
//                     )}
//                   </td>
//                   <td>
//                     {transaction.status === 'Pending' ? (
//                       <>
//                         <Button
//                           variant="success"
//                           size="sm"
//                           onClick={() => handleShowModal(transaction, 'Approve')}
//                           className="me-2"
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleShowModal(transaction, 'Reject')}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     ) : (
//                       <Button variant="secondary" size="sm" disabled>
//                         Action Taken
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center text-muted">
//                   No pending transactions found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {/* Modal for Approval Confirmation */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{action === 'Approve' ? 'Approve' : 'Reject'} Transaction</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Are you sure you want to <strong>{action}</strong> this transaction?
//           </p>
//           <Form.Group>
//             <Form.Label>Transaction ID:</Form.Label>
//             <p>{selectedTransaction?.transactionId}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Type:</Form.Label>
//             <p>{selectedTransaction?.type}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Amount:</Form.Label>
//             <p>${selectedTransaction?.amount.toFixed(2)}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Investment Plan:</Form.Label>
//             <p>{selectedTransaction?.investmentPlan || '-'}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Details:</Form.Label>
//             <p>{selectedTransaction?.details}</p>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           {action === 'Approve' ? (
//             <Button variant="success" onClick={handleApprove}>
//               Approve
//             </Button>
//           ) : (
//             <Button variant="danger" onClick={handleReject}>
//               Reject
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TransactionApprovalAdmin;


// import React, { useState } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const pendingTransactions = [
//     {
//       transactionId: 'TXN007',
//       date: '2024-08-25',
//       type: 'deposit',
//       amount: 800.00,
//       status: 'Pending',
//       investmentPlan: 'Premium Plan',
//       dueDate: '2024-09-25',
//       details: 'Pending deposit for Premium Plan',
//     },
//     {
//       transactionId: 'TXN008',
//       date: '2024-08-27',
//       type: 'withdrawal',
//       amount: 300.00,
//       status: 'Pending',
//       investmentPlan: null,
//       dueDate: null,
//       details: 'Pending withdrawal from wallet',
//     },
//   ];
  

// const TransactionApprovalAdmin = ({ pendingTransactions, onUpdateTransaction }) => {
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [approvalStatus, setApprovalStatus] = useState('');

//   const handleShowModal = (transaction) => {
//     setSelectedTransaction(transaction);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTransaction(null);
//     setShowModal(false);
//   };

//   const handleApprove = () => {
//     onUpdateTransaction(selectedTransaction.transactionId, 'Approved', selectedTransaction);
//     handleCloseModal();
//   };

//   const handleReject = () => {
//     onUpdateTransaction(selectedTransaction.transactionId, 'Rejected', selectedTransaction);
//     handleCloseModal();
//   };

//   return (
//     <div className="transaction-approval-admin p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">Pending Transactions</h4>

//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead className="table-dark">
//             <tr>
//               <th>Transaction ID</th>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Investment Plan</th>
//               <th>Details</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingTransactions.length > 0 ? (
//               pendingTransactions.map((transaction, index) => (
//                 <tr key={index}>
//                   <td>{transaction.transactionId}</td>
//                   <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                   <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
//                   <td>${transaction.amount.toFixed(2)}</td>
//                   <td>{transaction.investmentPlan || '-'}</td>
//                   <td>{transaction.details}</td>
//                   <td>
//                     <Button variant="success" size="sm" onClick={() => handleShowModal(transaction)}>
//                       Approve
//                     </Button>{' '}
//                     <Button variant="danger" size="sm" onClick={() => handleShowModal(transaction)}>
//                       Reject
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center text-muted">
//                   No pending transactions found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {/* Modal for Approval Confirmation */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Approve/Reject Transaction</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Are you sure you want to <strong>{approvalStatus}</strong> this transaction?
//           </p>
//           <Form.Group>
//             <Form.Label>Transaction ID:</Form.Label>
//             <p>{selectedTransaction?.transactionId}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Type:</Form.Label>
//             <p>{selectedTransaction?.type}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Amount:</Form.Label>
//             <p>${selectedTransaction?.amount.toFixed(2)}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Investment Plan:</Form.Label>
//             <p>{selectedTransaction?.investmentPlan || '-'}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Details:</Form.Label>
//             <p>{selectedTransaction?.details}</p>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleReject}>
//             Reject
//           </Button>
//           <Button variant="success" onClick={handleApprove}>
//             Approve
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TransactionApprovalAdmin;
