import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const TestimonialList = ({ initialTestimonials }) => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');

  const handleShowModal = (testimonial, action) => {
    setSelectedTestimonial(testimonial);
    setAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTestimonial(null);
    setShowModal(false);
  };

  const handleApprove = () => {
    updateTestimonialStatus(selectedTestimonial.id, 'Approved');
    handleCloseModal();
  };

  const handleReject = () => {
    updateTestimonialStatus(selectedTestimonial.id, 'Rejected');
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
  };

  const updateTestimonialStatus = (id, newStatus) => {
    setTestimonials(prevTestimonials =>
      prevTestimonials.map(testimonial =>
        testimonial.id === id
          ? { ...testimonial, status: newStatus }
          : testimonial
      )
    );
  };

  return (
    <div className={`col-xl-11 col-md-11 d-flex align-items-center justify-content-center" style="height: 100vh;" `} >
    <div className={`card-holder card shadow-sm p-4 mb-5 rounded bg-primary`}>
     {/* <div className="wallet-widget p-3 bg-light rounded shadow-sm"> */}

    <div className="testimonial-list-admin p-4 bg-white rounded shadow-sm">
      <h4 className="mb-4">Testimonials</h4>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Author</th>
              <th>Message</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td>{testimonial.id}</td>
                  <td>{testimonial.author}</td>
                  <td>{testimonial.message}</td>
                  <td>${testimonial.amount}</td>
                  <td>{new Date(testimonial.date).toLocaleDateString()}</td>
                  <td>
                    {testimonial.status === 'Pending' ? (
                      <span className="text-warning">Pending</span>
                    ) : testimonial.status === 'Approved' ? (
                      <span className="text-success">Approved</span>
                    ) : (
                      <span className="text-danger">Rejected</span>
                    )}
                  </td>
                  <td>
                    {testimonial.status === 'Pending' ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleShowModal(testimonial, 'Approve')}
                          className="me-2"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleShowModal(testimonial, 'Reject')}
                          className="me-2"
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button variant="secondary" size="sm" disabled>
                        Action Taken
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No testimonials found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal for Approval/Rejection Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{action === 'Approve' ? 'Approve' : 'Reject'} Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to <strong>{action}</strong> this testimonial?
          </p>
          <Form.Group>
            <Form.Label>ID:</Form.Label>
            <p>{selectedTestimonial?.id}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Author:</Form.Label>
            <p>{selectedTestimonial?.author}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Message:</Form.Label>
            <p>{selectedTestimonial?.message}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <p>${selectedTestimonial?.amount}</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {action === 'Approve' ? (
            <Button variant="success" onClick={handleApprove}>
              Approve
            </Button>
          ) : (
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
    // </div>
  );
};

export default TestimonialList;
