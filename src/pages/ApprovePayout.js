import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ApprovePayout = () => {
  const [payoutId, setPayoutId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/payout/approve', { payoutId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error approving payout');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Approve Payout</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="payoutId">
          <Form.Label>Payout ID</Form.Label>
          <Form.Control
            type="number"
            value={payoutId}
            onChange={(e) => setPayoutId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Approve Payout
        </Button>
      </Form>
    </div>
  );
};

export default ApprovePayout;
