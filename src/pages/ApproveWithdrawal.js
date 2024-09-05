import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ApproveWithdrawal = () => {
  const [transactionId, setTransactionId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/withdrawal/approve', { transactionId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error approving withdrawal');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Approve Withdrawal</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="transactionId">
          <Form.Label>Transaction ID</Form.Label>
          <Form.Control
            type="number"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Approve Withdrawal
        </Button>
      </Form>
    </div>
  );
};

export default ApproveWithdrawal;
