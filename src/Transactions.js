import React, { useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const Transactions = ({ transactions }) => {
  const [filter, setFilter] = useState({
    type: 'all', // 'all', 'deposit', 'withdrawal', 'investment'
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const { type, startDate, endDate } = filter;
    const transactionDate = new Date(transaction.date);

    // Filter by transaction type
    if (type !== 'all' && transaction.type !== type) return false;

    // Filter by date range
    if (startDate && transactionDate < new Date(startDate)) return false;
    if (endDate && transactionDate > new Date(endDate)) return false;

    return true;
  });

  return (
    <div className={`col-xl-12 col-md-12 d-flex align-items-center justify-content-center" style="height: 100vh;" `} >
    <div className={`card-holder card shadow-sm p-4 mb-5 rounded bg-primary`}>

    <div className="transactions-widget p-4 bg-white rounded shadow-sm">
      {/* Filter Section */}
      <div className="filter-section mb-4">
        <Row className="align-items-end">
          <Col md={3} sm={6} className="mb-3">
            <Form.Group controlId="type">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control as="select" name="type" value={filter.type} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="investment">Investment</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} />
            </Form.Group>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} />
            </Form.Group>
          </Col>

          <Col md={3} sm={6} className="text-md-end">
            <Button variant="primary" className="w-100">
              Apply Filters
            </Button>
          </Col>
        </Row>
      </div>

      {/* Transactions Table */}
      <div className="table-responsive">
        <Table striped bordered hover className="mb-0">
          <thead className="table-dark">
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.transactionId}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>{transaction.investmentPlan || '-'}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString() : '-'}</td>
                  <td>{transaction.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No transactions found
                </td>
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

export default Transactions;


// import React, { useState } from 'react';
// import { Table, Form, Button, Row, Col } from 'react-bootstrap';


// const transactions = [
//   {
//     date: '2024-08-10',
//     type: 'deposit',
//     amount: 500.00,
//     status: 'Completed',
//     details: 'Deposit to wallet',
//   },
//   {
//     date: '2024-08-12',
//     type: 'withdrawal',
//     amount: 200.00,
//     status: 'Pending',
//     details: 'Withdrawal from wallet',
//   },
//   {
//     date: '2024-08-15',
//     type: 'investment',
//     amount: 750.00,
//     status: 'Completed',
//     details: 'Investment in Bitcoin',
//   },
//   {
//     date: '2024-08-18',
//     type: 'deposit',
//     amount: 1000.00,
//     status: 'Completed',
//     details: 'Deposit to wallet',
//   },
//   {
//     date: '2024-08-20',
//     type: 'investment',
//     amount: 400.00,
//     status: 'Completed',
//     details: 'Investment in Ethereum',
//   },
//   {
//     date: '2024-08-22',
//     type: 'withdrawal',
//     amount: 300.00,
//     status: 'Completed',
//     details: 'Withdrawal from wallet',
//   },
// ];


// const Transactions = ({ transactions }) => {
//   const [filter, setFilter] = useState({
//     type: 'all', // 'all', 'deposit', 'withdrawal', 'investment'
//     startDate: '',
//     endDate: '',
//   });

//   const handleFilterChange = (e) => {
//     setFilter({
//       ...filter,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const filteredTransactions = transactions.filter((transaction) => {
//     const { type, startDate, endDate } = filter;
//     const transactionDate = new Date(transaction.date);

//     // Filter by transaction type
//     if (type !== 'all' && transaction.type !== type) return false;

//     // Filter by date range
//     if (startDate && transactionDate < new Date(startDate)) return false;
//     if (endDate && transactionDate > new Date(endDate)) return false;

//     return true;
//   });

//   return (
//     <div className="transactions-widget p-4 bg-white rounded shadow-sm">
//       {/* Filter Section */}
//       <div className="filter-section mb-4">
//         <Row className="align-items-end">
//           <Col md={3} sm={6} className="mb-3">
//             <Form.Group controlId="type">
//               <Form.Label>Transaction Type</Form.Label>
//               <Form.Control as="select" name="type" value={filter.type} onChange={handleFilterChange}>
//                 <option value="all">All</option>
//                 <option value="deposit">Deposit</option>
//                 <option value="withdrawal">Withdrawal</option>
//                 <option value="investment">Investment</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>

//           <Col md={3} sm={6} className="mb-3">
//             <Form.Group controlId="startDate">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} />
//             </Form.Group>
//           </Col>

//           <Col md={3} sm={6} className="mb-3">
//             <Form.Group controlId="endDate">
//               <Form.Label>End Date</Form.Label>
//               <Form.Control type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} />
//             </Form.Group>
//           </Col>

//           <Col md={3} sm={6} className="text-md-end">
//             <Button variant="primary" className="w-100">
//               Apply Filters
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       {/* Transactions Table */}
//       <div className="table-responsive">
//         <Table striped bordered hover className="mb-0">
//           <thead className="table-dark">
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.length > 0 ? (
//               filteredTransactions.map((transaction, index) => (
//                 <tr key={index}>
//                   <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                   <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
//                   <td>${transaction.amount.toFixed(2)}</td>
//                   <td>{transaction.status}</td>
//                   <td>{transaction.details}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center text-muted">
//                   No transactions found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

// // import React from 'react'

// // function Transactions() {
// //   return (
// //     <div>
// //        trans
// //     </div>
// //   )
// // }

// // export default Transactions
