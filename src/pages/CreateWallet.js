import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateWallet = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/wallet', { userId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error creating wallet');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Create Wallet</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Wallet
        </Button>
      </Form>
    </div>
  );
};

export default CreateWallet;
