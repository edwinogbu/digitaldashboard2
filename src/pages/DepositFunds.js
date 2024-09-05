import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const DepositFunds = () => {
  const [walletId, setWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/deposit', { walletId, amount });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error depositing funds');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Deposit Funds</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="walletId">
          <Form.Label>Wallet ID</Form.Label>
          <Form.Control
            type="number"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </Form>
    </div>
  );
};

export default DepositFunds;
