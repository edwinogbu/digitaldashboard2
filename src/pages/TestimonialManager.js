import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:5000/api/testimonials';

function TestimonialManager() {
    const [testimonials, setTestimonials] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        message: '',
        imagePath: ''
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(API_URL);
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddTestimonial = async () => {
        try {
            await axios.post(API_URL, formData);
            fetchTestimonials();
            setShowAddModal(false);
            setFormData({
                name: '',
                amount: '',
                message: '',
                imagePath: ''
            });
            Swal.fire('Success', 'Testimonial added successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to add testimonial', 'error');
        }
    };

    const handleUpdateTestimonial = async () => {
        try {
            await axios.put(`${API_URL}/${selectedTestimonial.id}`, formData);
            fetchTestimonials();
            setShowUpdateModal(false);
            setSelectedTestimonial(null);
            setFormData({
                name: '',
                amount: '',
                message: '',
                imagePath: ''
            });
            Swal.fire('Success', 'Testimonial updated successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update testimonial', 'error');
        }
    };

    const handleDeleteTestimonial = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTestimonials();
            Swal.fire('Success', 'Testimonial deleted successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to delete testimonial', 'error');
        }
    };

    const openUpdateModal = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setFormData({
            name: testimonial.name,
            amount: testimonial.amount,
            message: testimonial.message,
            imagePath: testimonial.imagePath
        });
        setShowUpdateModal(true);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Testimonial</Button>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Message</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial) => (
                        <tr key={testimonial.id}>
                            <td>{testimonial.name}</td>
                            <td>{testimonial.amount}</td>
                            <td>{testimonial.message}</td>
                            <td><img src={testimonial.imagePath} alt="testimonial" style={{ width: '100px' }} /></td>
                            <td>
                                <Button variant="warning" onClick={() => openUpdateModal(testimonial)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteTestimonial(testimonial.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Testimonial Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formImagePath">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="imagePath" value={formData.imagePath} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddTestimonial}>Add Testimonial</Button>
                </Modal.Footer>
            </Modal>

            {/* Update Testimonial Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formImagePath">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="imagePath" value={formData.imagePath} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateTestimonial}>Update Testimonial</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TestimonialManager;
