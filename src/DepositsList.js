import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DepositsList = ({ deposits }) => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [newDeposit, setNewDeposit] = useState({
    name: '',
    date: '',
    amount: '',
    currency: '',
  });

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setNewDeposit({
      name: '',
      date: '',
      amount: '',
      currency: '',
    });
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDeposit({
      ...newDeposit,
      [name]: value,
    });
  };

  const handleAddDeposit = () => {
    if (editMode) {
      // Logic to update an existing deposit
      console.log('Deposit Updated:', newDeposit);
    } else {
      // Logic to add a new deposit
      console.log('New Deposit Added:', newDeposit);
    }
    setShow(false);
  };

  const handleEdit = (deposit) => {
    setEditMode(true);
    setSelectedDeposit(deposit.id);
    setNewDeposit({
      name: deposit.name,
      date: deposit.date,
      amount: deposit.amount,
      currency: deposit.currency,
    });
    setShow(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deposit with ID ${id} deleted.`);
        Swal.fire('Deleted!', 'The deposit has been deleted.', 'success');
        // Logic to delete the deposit
      }
    });
  };

  const handleApprove = (id) => {
    console.log(`Deposit with ID ${id} approved.`);
    // Logic to mark deposit as approved
  };

  const handleReject = (id) => {
    console.log(`Deposit with ID ${id} rejected.`);
    // Logic to mark deposit as rejected
  };

  return (
    <div className="deposits-list p-4 bg-white rounded shadow-sm">
      <h4 className="mb-4">Deposits</h4>

      <Button variant="primary" onClick={handleShow} className="mb-4">
        Add Deposit
      </Button>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.length > 0 ? (
              deposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td>{deposit.id}</td>
                  <td>{deposit.name}</td>
                  <td>{deposit.date}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.currency}</td>
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
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(deposit)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(deposit.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No deposits found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Update Deposit' : 'Add New Deposit'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newDeposit.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newDeposit.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newDeposit.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={newDeposit.currency}
                onChange={handleChange}
              >
                <option value="">Select Currency</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="USD">USD</option>
                <option value="Ripple">Ripple</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDeposit}>
            {editMode ? 'Update Deposit' : 'Add Deposit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepositsList;
