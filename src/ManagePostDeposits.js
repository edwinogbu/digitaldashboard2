import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './managePostDeposits.css'

const ManagePostDeposits = () => {
  const [postDeposits, setPostDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentDeposit, setCurrentDeposit] = useState(null);

  // State for form fields
  const [formData, setFormData] = useState({
    type: 'deposit', // Default value
    amount: '',
    profit: '',
    currency: '',
    investorName: '',
    status: 'pending'
  });

  // Fetch all post deposits
  const fetchPostDeposits = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/postDeposits/viewAll');
      setPostDeposits(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch post deposits');
      setLoading(false);
    }
  };

  // Fetch post deposits on component mount
  useEffect(() => {
    fetchPostDeposits();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  // Show create modal
  const handleShowCreateModal = () => {
    setFormData({
      type: 'deposit',
      amount: '',
      profit: '',
      currency: '',
      investorName: '',
      status: 'pending'
    });
    setShowCreateModal(true);
  };

  // Hide create modal
  const handleCloseCreateModal = () => setShowCreateModal(false);

  // Show update modal
  const handleShowUpdateModal = (deposit) => {
    setCurrentDeposit(deposit);
    setFormData({
      type: deposit.type,
      amount: deposit.amount,
      profit: deposit.profit,
      currency: deposit.currency,
      investorName: deposit.investorName,
      status: deposit.status
    });
    setShowUpdateModal(true);
  };

  // Hide update modal
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  // Create a new post deposit
  const handleCreatePostDeposit = async () => {
    try {
      await axios.post('http://localhost:3005/api/postDeposits/create', formData);
      Swal.fire('Success', 'Post deposit created successfully!', 'success');
      handleCloseCreateModal();
      fetchPostDeposits(); // Fetch updated list
    } catch (error) {
      Swal.fire('Error', 'Failed to create post deposit', 'error');
    }
  };

  // Update an existing post deposit
  const handleUpdatePostDeposit = async () => {
    try {
      await axios.put(`http://localhost:3005/api/postDeposits/update/${currentDeposit.id}`, formData);
      Swal.fire('Success', 'Post deposit updated successfully!', 'success');
      handleCloseUpdateModal();
      fetchPostDeposits(); // Fetch updated list
    } catch (error) {
      Swal.fire('Error', 'Failed to update post deposit', 'error');
    }
  };

  // Delete a post deposit
  const deletePostDeposit = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3005/api/postDeposits/delete/${id}`);
        Swal.fire('Deleted!', 'Post deposit has been deleted.', 'success');
        fetchPostDeposits(); // Fetch updated list
      } catch (error) {
        Swal.fire('Error', 'Failed to delete post deposit', 'error');
      }
    }
  };

  // Change the status of a post deposit
  const changeStatus = async (id) => {
    const { value: status } = await Swal.fire({
      title: 'Change Status',
      input: 'select',
      inputOptions: {
        pending: 'Pending',
        publish: 'Publish',
        unpublish: 'Unpublish'
      },
      inputPlaceholder: 'Select status',
      showCancelButton: true,
      customClass: {
        popup: 'swal-custom',  // Custom class for the Swal popup
        title: 'swal-title',    // Custom class for the Swal title
        input: 'swal-input',    // Custom class for the Swal input
        confirmButton: 'swal-confirm',  // Custom class for the confirm button
        cancelButton: 'swal-cancel'     // Custom class for the cancel button
      },
      
    });

    if (status) {
      try {
        await axios.patch(`http://localhost:3005/api/postDeposits/changeStatus/${id}`, { status });
        Swal.fire('Success', 'Status updated successfully!', 'success');
        fetchPostDeposits(); // Fetch updated list
      } catch (error) {
        Swal.fire('Error', 'Failed to change status', 'error');
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container-fluid">
      <div className="button-container col-4">
        <Button onClick={handleShowCreateModal} className="mb-3 btn-custom btn btn-sm">Create New Post Deposit</Button>
      </div>
      <Table striped bordered hover responsive className="table-custom">
        <thead style={{border:'2px solid #f0e00f', backgroundColor:'#000033'}}>
          <tr style={{color:'#000033', backgroundColor:'#000033'}}>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Profit</th>
            <th>Currency</th>
            <th>Investor Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postDeposits.map((deposit) => (
            <tr key={deposit.id}>
              <td>{deposit.id}</td>
              <td>{deposit.type}</td>
              <td>{deposit.amount}</td>
              <td>{deposit.profit}</td>
              <td>{deposit.currency}</td>
              <td>{deposit.investorName}</td>
              <td>{deposit.status}</td>
              <td className="actions-cell">
                <div className="btn-group btn-group-xs">
                  <Button variant="warning" className='btn btn-sm btn-xs' style={{border:'2px solid #fff'}} onClick={() => handleShowUpdateModal(deposit)}>Edit</Button>
                  <Button variant="danger" className='btn btn-sm btn-xs' style={{border:'2px solid #fff'}} onClick={() => deletePostDeposit(deposit.id)}>Delete</Button>
                  <Button variant="info" className='btn btn-sm btn-xs' style={{border:'2px solid #fff'}} onClick={() => changeStatus(deposit.id)}>Change Status</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
                  color: '#fff', 
                  border: '1px solid #f0e000', // Border color and width
                  borderRight: '1px solid #f0e000', // Border color and width
                  borderLeft: '1px solid #f0e000', // Border color and width
                  borderBottom: '1px solid #f0e000', // Border color and width
                  borderRadius: '10px',       // Rounded corners
                  backgroundColor:'#000033',
                 
                }}>
          <Form>
            <Form.Group controlId="type" >
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" value={formData.type} onChange={handleInputChange} style={{
                  color: '#fff', 
                  border: '1px solid #f0e000', // Border color and width
                  borderRadius: '10px',       // Rounded corners
                  backgroundColor:'#000033',
                 
                }}>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="earning">Earning</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Amount" value={formData.amount} onChange={handleInputChange} style={{color:'#000033'}}/>
            </Form.Group>
            <Form.Group controlId="profit">
              <Form.Label>Profit</Form.Label>
              <Form.Control type="number" placeholder="Profit" value={formData.profit} onChange={handleInputChange} style={{color:'#000033'}}/>
            </Form.Group>
            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control type="text" placeholder="Currency" value={formData.currency} onChange={handleInputChange} style={{color:'#000033'}}/>
            </Form.Group>
            <Form.Group controlId="investorName">
              <Form.Label>Investor Name</Form.Label>
              <Form.Control type="text" placeholder="Investor Name" value={formData.investorName} onChange={handleInputChange} style={{color:'#000033'}}/>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={formData.status} onChange={handleInputChange} style={{
                  color: '#fff', 
                  border: '1px solid #f0e000', // Border color and width
                  borderRadius: '10px',       // Rounded corners
                  backgroundColor:'#000033',
                 
                }}>
                <option value="pending">Pending</option>
                <option value="publish">Publish</option>
                <option value="unpublish">Unpublish</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>Close</Button>
          <Button variant="primary" onClick={handleCreatePostDeposit}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" value={formData.type} onChange={handleInputChange}>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="earning">Earning</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Amount" value={formData.amount} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="profit">
              <Form.Label>Profit</Form.Label>
              <Form.Control type="number" placeholder="Profit" value={formData.profit} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control type="text" placeholder="Currency" value={formData.currency} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="investorName">
              <Form.Label>Investor Name</Form.Label>
              <Form.Control type="text" placeholder="Investor Name" value={formData.investorName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={formData.status} onChange={handleInputChange}>
                <option value="pending">Pending</option>
                <option value="publish">Publish</option>
                <option value="unpublish">Unpublish</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
          <Button variant="primary" onClick={handleUpdatePostDeposit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagePostDeposits;
