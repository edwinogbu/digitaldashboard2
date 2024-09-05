import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const PendingDeposits = () => {
    const [deposits, setDeposits] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);

    useEffect(() => {
        // Fetch pending deposits on component mount
        fetchPendingDeposits();
    }, []);

    const fetchPendingDeposits = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/crypto/all-pending-deposits');
            setDeposits(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to retrieve pending deposits',
                text: error.message,
            });
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:3005/api/crypto/approve-deposit/${id}`);
            Swal.fire('Success!', 'Deposit approved.', 'success');
            fetchPendingDeposits();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to approve deposit',
                text: error.message,
            });
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:3005/api/crypto/reject-deposit/${id}`);
            Swal.fire('Success!', 'Deposit rejected.', 'success');
            fetchPendingDeposits();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to reject deposit',
                text: error.message,
            });
        }
    };

    const handleShowModal = (deposit) => {
        setSelectedDeposit(deposit);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDeposit(null);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Depositor Name</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Subscription Plan</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {deposits.map((deposit) => (
                        <tr key={deposit.id}>
                            <td>{deposit.id}</td>
                            <td>{deposit.depositorName}</td>
                            <td>{deposit.amount}</td>
                            <td>{deposit.currencyName}</td>
                            <td>{deposit.subscriptionPlanLabel}</td>
                            <td>{deposit.status}</td>
                            <td>
                                <Button
                                    variant="success"
                                    onClick={() => handleApprove(deposit.id)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleReject(deposit.id)}
                                >
                                    Reject
                                </Button>
                                <Button
                                    variant="info"
                                    onClick={() => handleShowModal(deposit)}
                                >
                                    Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDeposit && (
                        <Form>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={selectedDeposit.id} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Depositor Name</Form.Label>
                                <Form.Control type="text" value={selectedDeposit.depositorName} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" value={selectedDeposit.amount} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Currency</Form.Label>
                                <Form.Control type="text" value={selectedDeposit.currencyName} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Subscription Plan</Form.Label>
                                <Form.Control type="text" value={selectedDeposit.subscriptionPlanLabel} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" value={selectedDeposit.status} readOnly />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PendingDeposits;
