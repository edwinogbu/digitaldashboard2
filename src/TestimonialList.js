import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Table, Pagination, Alert } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 10;

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/testimonial/testimonials');
      if (response.data.success && Array.isArray(response.data.testimonials)) {
        setTestimonials(response.data.testimonials);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Error fetching testimonials.');
      setTestimonials([]);
    }
  };

  const handleDelete = async (testimonialId) => {
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
        await axios.delete(`http://localhost:3005/api/testimonial/delete/${testimonialId}`);
        fetchTestimonials(); // Refresh the testimonial list
        Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        Swal.fire('Error!', 'There was an issue deleting the testimonial.', 'error');
      }
    }
  };

  const handleAdd = async (newTestimonial) => {
    try {
      await axios.post('http://localhost:3005/api/testimonial/create', newTestimonial);
      fetchTestimonials(); // Refresh the testimonial list
      Swal.fire('Added!', 'Testimonial has been added.', 'success');
      setShowAddModal(false); // Close modal after adding
    } catch (error) {
      console.error('Error adding testimonial:', error);
      Swal.fire('Error!', 'There was an issue adding the testimonial.', 'error');
    }
  };

  const handleUpdate = async (testimonialId, updatedData) => {
    try {
      await axios.put(`http://localhost:3005/api/testimonial/update/${testimonialId}`, updatedData);
      fetchTestimonials(); // Refresh the testimonial list
      Swal.fire('Updated!', 'Testimonial details have been updated.', 'success');
      setShowUpdateModal(false); // Close modal after updating
    } catch (error) {
      console.error('Error updating testimonial:', error);
      Swal.fire('Error!', 'There was an issue updating the testimonial.', 'error');
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowUpdateModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowViewModal = async (testimonialId) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/testimonial/testimonial/${testimonialId}`);
      setSelectedTestimonial(response.data.testimonial);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching testimonial details:', error);
      Swal.fire('Error!', 'There was an issue fetching the testimonial details.', 'error');
    }
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  // Pagination Logic
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
      <div className="row align-items-center justify-content-center" style={{ height: '100%', backgroundColor: '#000033' }}>
        <div className="container-fluid">
          <h2 className="text-center my-4" style={{ color: '#f0e00f' }}>Testimonial Management</h2>

          {error && <Alert variant="danger text-danger">{error}</Alert>}

          <div className="text-center my-3">
            <Button variant="primary" onClick={handleShowAddModal}>Add Testimonial</Button>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover responsive="sm" className="table-sm" style={{ backgroundColor: '#fff', color: '#000' }}>
              <thead style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
                <tr style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Message</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(testimonials) && testimonials.length > 0 ? (
                  currentTestimonials.map((testimonial, index) => (
                    <tr key={testimonial._id}>
                      <td>{index + 1 + (currentPage - 1) * testimonialsPerPage}</td>
                      <td>{testimonial.name}</td>
                      <td>{testimonial.amount}</td>
                      <td>{testimonial.message}</td>
                      <td><img src={testimonial.imagePath} alt="testimonial" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <Button
                            variant="info"
                            size="sm"
                            style={{ backgroundColor: '#00aaff', borderColor: '#00aaff' }}
                            onClick={() => handleShowViewModal(testimonial._id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            style={{ backgroundColor: '#ffaa00', borderColor: '#ffaa00' }}
                            onClick={() => handleShowUpdateModal(testimonial)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}
                            onClick={() => handleDelete(testimonial._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No testimonials found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination with Next and Previous Buttons */}
          {totalPages > 1 && (
            <Pagination>
              {currentPage > 1 && (
                <Pagination.Prev onClick={handlePrevPage}>Previous</Pagination.Prev>
              )}
              
              {currentPage < totalPages && (
                <Pagination.Next onClick={handleNextPage}>Next</Pagination.Next>
              )}
            </Pagination>
          )}

          {/* Add Testimonial Modal */}
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            {/* <Modal.Header closeButton>
              <Modal.Title>Add Testimonial</Modal.Title>
            </Modal.Header> */}
            <Modal.Header style={{backgroundColor:'#000033', color:'#fff', textAlign:'center'}} >
                    <Modal.Title style={{ color:'#f0e00c', textAlign:'center'}} className='d-flex justify-content-between align-items-center mb-3'>Create New Testimonials</Modal.Title>
                    
                    <Button  className='btn btn-xs col-2' onClick={handleCloseAddModal}  style={{backgroundColor:'#000033', color:'#fff', textAlign:'center'}}>
                        <FaTimes onClick={handleCloseAddModal} style={{ color: '#fff' }}>
                        </FaTimes>
                        
                    </Button>
                </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newTestimonial = {
                    name: e.target.name.value,
                    amount: e.target.amount.value,
                    message: e.target.message.value,
                    imagePath: e.target.imagePath.value,
                  };
                  handleAdd(newTestimonial);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <input type="number" className="form-control" id="amount" name="amount" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" name="message" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="imagePath"  className="form-label">Image URL</label>
                  <input  type="file" className="form-control" id="imagePath" name="imagePath" required />
                </div>
                <Button variant="primary" type="submit">Add</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
            </Modal.Footer>
          </Modal>

          {/* Update Testimonial Modal */}
          <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Testimonial</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTestimonial && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedTestimonial = {
                      name: e.target.name.value,
                      amount: e.target.amount.value,
                      message: e.target.message.value,
                      imagePath: e.target.imagePath.value,
                    };
                    handleUpdate(selectedTestimonial._id, updatedTestimonial);
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      defaultValue={selectedTestimonial.name}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      defaultValue={selectedTestimonial.amount}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="3"
                      defaultValue={selectedTestimonial.message}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imagePath" className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="imagePath"
                      name="imagePath"
                      defaultValue={selectedTestimonial.imagePath}
                      required
                    />
                  </div>
                  <Button variant="primary" type="submit">Update</Button>
                </form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
            </Modal.Footer>
          </Modal>

          {/* View Testimonial Modal */}
          <Modal show={showViewModal} onHide={handleCloseViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>View Testimonial</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTestimonial && (
                <div>
                  <p><strong>Name:</strong> {selectedTestimonial.name}</p>
                  <p><strong>Amount:</strong> {selectedTestimonial.amount}</p>
                  <p><strong>Message:</strong> {selectedTestimonial.message}</p>
                  <p><strong>Image:</strong> <img src={selectedTestimonial.imagePath} alt="testimonial" style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const TestimonialList = ({ initialTestimonials }) => {
//   const [testimonials, setTestimonials] = useState(initialTestimonials);
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [action, setAction] = useState('');

//   const handleShowModal = (testimonial, action) => {
//     setSelectedTestimonial(testimonial);
//     setAction(action);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTestimonial(null);
//     setShowModal(false);
//   };

//   const handleApprove = () => {
//     updateTestimonialStatus(selectedTestimonial.id, 'Approved');
//     handleCloseModal();
//   };

//   const handleReject = () => {
//     updateTestimonialStatus(selectedTestimonial.id, 'Rejected');
//     handleCloseModal();
//   };

//   const handleDelete = (id) => {
//     setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
//   };

//   const updateTestimonialStatus = (id, newStatus) => {
//     setTestimonials(prevTestimonials =>
//       prevTestimonials.map(testimonial =>
//         testimonial.id === id
//           ? { ...testimonial, status: newStatus }
//           : testimonial
//       )
//     );
//   };

//   return (
//     <div className={`col-xl-11 col-md-11 d-flex align-items-center justify-content-center" style="height: 100vh;" `} >
//     <div className={`card-holder card shadow-sm p-4 mb-5 rounded bg-primary`}>
//      {/* <div className="wallet-widget p-3 bg-light rounded shadow-sm"> */}

//     <div className="testimonial-list-admin p-4 bg-white rounded shadow-sm">
//       <h4 className="mb-4">Testimonials</h4>

//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Author</th>
//               <th>Message</th>
//               <th>Amount</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {testimonials.length > 0 ? (
//               testimonials.map((testimonial) => (
//                 <tr key={testimonial.id}>
//                   <td>{testimonial.id}</td>
//                   <td>{testimonial.author}</td>
//                   <td>{testimonial.message}</td>
//                   <td>${testimonial.amount}</td>
//                   <td>{new Date(testimonial.date).toLocaleDateString()}</td>
//                   <td>
//                     {testimonial.status === 'Pending' ? (
//                       <span className="text-warning">Pending</span>
//                     ) : testimonial.status === 'Approved' ? (
//                       <span className="text-success">Approved</span>
//                     ) : (
//                       <span className="text-danger">Rejected</span>
//                     )}
//                   </td>
//                   <td>
//                     {testimonial.status === 'Pending' ? (
//                       <>
//                         <Button
//                           variant="success"
//                           size="sm"
//                           onClick={() => handleShowModal(testimonial, 'Approve')}
//                           className="me-2"
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleShowModal(testimonial, 'Reject')}
//                           className="me-2"
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     ) : (
//                       <Button variant="secondary" size="sm" disabled>
//                         Action Taken
//                       </Button>
//                     )}
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDelete(testimonial.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center text-muted">
//                   No testimonials found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {/* Modal for Approval/Rejection Confirmation */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{action === 'Approve' ? 'Approve' : 'Reject'} Testimonial</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Are you sure you want to <strong>{action}</strong> this testimonial?
//           </p>
//           <Form.Group>
//             <Form.Label>ID:</Form.Label>
//             <p>{selectedTestimonial?.id}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Author:</Form.Label>
//             <p>{selectedTestimonial?.author}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Message:</Form.Label>
//             <p>{selectedTestimonial?.message}</p>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Amount:</Form.Label>
//             <p>${selectedTestimonial?.amount}</p>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           {action === 'Approve' ? (
//             <Button variant="success" onClick={handleApprove}>
//               Approve
//             </Button>
//           ) : (
//             <Button variant="danger" onClick={handleReject}>
//               Reject
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </div>
//     </div>
//     </div>
//     // </div>
//   );
// };

// export default TestimonialList;
