import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateSubscription = () => {
  const [walletId, setWalletId] = useState('');
  const [planId, setPlanId] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [reinvest, setReinvest] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/subscription', {
        walletId,
        planId,
        durationMonths,
        reinvest
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error creating subscription');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Create Subscription</h2>
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
        <Form.Group controlId="planId">
          <Form.Label>Plan ID</Form.Label>
          <Form.Control
            type="number"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="durationMonths">
          <Form.Label>Duration (Months)</Form.Label>
          <Form.Control
            type="number"
            value={durationMonths}
            onChange={(e) => setDurationMonths(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="reinvest">
          <Form.Check
            type="checkbox"
            label="Reinvest"
            checked={reinvest}
            onChange={(e) => setReinvest(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Subscription
        </Button>
      </Form>
    </div>
  );
};

export default CreateSubscription;
