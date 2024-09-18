import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ManageTestimonial.css';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  // State for form fields including the image
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: '',
    imagePath: null, // Use File object
    status: 'draft',
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch all testimonials with pagination and filtering
  const fetchTestimonials = async (page = 1, search = '') => {
    try {
      const response = await axios.get('http://localhost:3005/api/testimonial/viewAll', {
        params: { page, search }
      });
      setTestimonials(response.data.testimonials);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.page);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch testimonials');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({ ...prevState, imagePath: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleShowCreateModal = () => {
    setFormData({
      name: '',
      amount: '',
      message: '',
      imagePath: null,
      status: 'draft',
    });
    setImagePreview(null);
    setShowCreateModal(true);
  };

  const handleShowUpdateModal = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      amount: testimonial.amount,
      message: testimonial.message,
      status: testimonial.status,
      imagePath: null,
    });
    setImagePreview(testimonial.imagePath ? `http://localhost:3005/${testimonial.imagePath}` : null);
    setShowUpdateModal(true);
  };

  const handleCreateTestimonial = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('status', formData.status);
      if (formData.imagePath) {
        formDataToSend.append('imagePath', formData.imagePath);
      }
      await axios.post('http://localhost:3005/api/testimonial/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      Swal.fire('Success', 'Testimonial created successfully!', 'success');
      handleCloseCreateModal();
      fetchTestimonials(currentPage, searchTerm);
    } catch (error) {
      Swal.fire('Error', 'Failed to create testimonial', 'error');
    }
  };

  const handleUpdateTestimonial = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('status', formData.status);
      if (formData.imagePath) {
        formDataToSend.append('imagePath', formData.imagePath);
      }
      await axios.put(`http://localhost:3005/api/testimonial/update/${currentTestimonial.id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      Swal.fire('Success', 'Testimonial updated successfully!', 'success');
      handleCloseUpdateModal();
      fetchTestimonials(currentPage, searchTerm);
    } catch (error) {
      Swal.fire('Error', 'Failed to update testimonial', 'error');
    }
  };

  const deleteTestimonial = async (id) => {
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
        await axios.delete(`http://localhost:3005/api/testimonial/delete/${id}`);
        Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
        fetchTestimonials(currentPage, searchTerm);
      } catch (error) {
        Swal.fire('Error', 'Failed to delete testimonial', 'error');
      }
    }
  };

  const changeStatus = async (id) => {
    const { value: status } = await Swal.fire({
      title: 'Change Status',
      input: 'select',
      inputOptions: {
        draft: 'Draft',
        published: 'Published'
      },
      inputPlaceholder: 'Select status',
      showCancelButton: true,
    });

    if (status) {
      try {
        await axios.patch(`http://localhost:3005/api/testimonial/changeStatus/${id}`, { status });
        Swal.fire('Success', 'Status updated successfully!', 'success');
        fetchTestimonials(currentPage, searchTerm);
      } catch (error) {
        Swal.fire('Error', 'Failed to change status', 'error');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const truncateMessage = (message, maxLength) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  const handleShowMessageModal = (message) => {
    Swal.fire({
      title: 'Message',
      text: message,
      confirmButtonText: 'Close'
    });
  };

  const renderImage = (imagePath) => {
    return imagePath ? <img src={`http://localhost:3005/${imagePath}`} alt="testimonial" width="50" /> : 'No Image';
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container-fluid">
      <div className="button-container col-sm-4">
        <Button onClick={handleShowCreateModal} className="mb-3 btn-custom btn-sm">Create New Testimonial</Button>
      </div>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Table striped bordered hover responsive className="table-custom">
        <thead style={{ border: '2px solid #f0e00f', backgroundColor: '#000033', color: '#FFF' }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Message</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id}>
              <td>{testimonial.id}</td>
              <td>{testimonial.name}</td>
              <td>{testimonial.amount}</td>
              <td>
                {truncateMessage(testimonial.message, 20)}
                <Button
                  variant="link"
                  onClick={() => handleShowMessageModal(testimonial.message)}
                  style={{ marginLeft: '10px' }}
                >
                  Read More
                </Button>
              </td>
              <td>{testimonial.status}</td>
              <td>{renderImage(testimonial.imagePath)}</td>
              <td className="actions-cell">
              <div className="btn-group btn-group-xs">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleShowUpdateModal(testimonial)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="me-2"
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => changeStatus(testimonial.id)}
                >
                  Change Status
                </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Create Testimonial Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="amount" className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="imagePath" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" width="100" />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTestimonial}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Testimonial Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="amount" className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="imagePath" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" width="100" />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTestimonial}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTestimonials;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Alert, Spinner, Modal, Form, Pagination } from 'react-bootstrap';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import './ManageTestimonial.css'

// const ManageTestimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // State for modals
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(null);

//   // State for form fields including the image
//   const [formData, setFormData] = useState({
//     name: '',
//     amount: '',
//     message: '',
//     imagePath: null, // Use File object
//     status: 'draft',
//   });

//   // State for image preview
//   const [imagePreview, setImagePreview] = useState(null);

//   // Fetch all testimonials with pagination and filtering
//   const fetchTestimonials = async (page = 1, search = '') => {
//     try {
//       const response = await axios.get('http://localhost:3005/api/testimonial/viewAll', {
//         params: { page, search }
//       });
//       setTestimonials(response.data.data);
//       setTotalPages(response.data.totalPages);
//       setCurrentPage(response.data.page);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch testimonials');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials(currentPage, searchTerm);
//   }, [currentPage, searchTerm]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [id]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData(prevState => ({ ...prevState, imagePath: file }));
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleShowCreateModal = () => {
//     setFormData({
//       name: '',
//       amount: '',
//       message: '',
//       imagePath: null,
//       status: 'draft',
//     });
//     setImagePreview(null);
//     setShowCreateModal(true);
//   };

//   const handleShowUpdateModal = (testimonial) => {
//     setCurrentTestimonial(testimonial);
//     setFormData({
//       name: testimonial.name,
//       amount: testimonial.amount,
//       message: testimonial.message,
//       imagePath: null,
//       status: testimonial.status,
//     });
//     setImagePreview(testimonial.imagePath ? `http://localhost:3005/${testimonial.imagePath}` : null);
//     setShowUpdateModal(true);
//   };

// //   const handleCreateTestimonial = async () => {
// //     try {
// //       const formDataToSend = new FormData();
// //       formDataToSend.append('name', formData.name);
// //       formDataToSend.append('amount', formData.amount);
// //       formDataToSend.append('message', formData.message);
// //       formDataToSend.append('status', formData.status);
// //       if (formData.imagePath) {
// //         formDataToSend.append('imagePath', formData.imagePath);
// //       }
// //       await axios.post('http://localhost:3005/api/testimonial/create', formDataToSend, {
// //         headers: { 'Content-Type': 'multipart/form-data' }
// //       });
// //       Swal.fire('Success', 'Testimonial created successfully!', 'success');
// //       handleCloseCreateModal();
// //       fetchTestimonials(currentPage, searchTerm);
// //     } catch (error) {
// //       Swal.fire('Error', 'Failed to create testimonial', 'error');
// //     }
// //   };

// const handleCreateTestimonial = async () => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('amount', formData.amount);
//       formDataToSend.append('message', formData.message);
//       formDataToSend.append('status', formData.status);
//       if (formData.imagePath) {
//         formDataToSend.append('imagePath', formData.imagePath); // Ensure 'imagePath' matches your backend's expected field name
//       }
//       await axios.post('http://localhost:3005/api/testimonial/create', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       Swal.fire('Success', 'Testimonial created successfully!', 'success');
//       handleCloseCreateModal();
//       fetchTestimonials(currentPage, searchTerm);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to create testimonial', 'error');
//     }
//   };
  

//   const handleUpdateTestimonial = async () => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('amount', formData.amount);
//       formDataToSend.append('message', formData.message);
//       formDataToSend.append('status', formData.status);
//       if (formData.imagePath) {
//         formDataToSend.append('imagePath', formData.imagePath);
//       }
//       await axios.put(`http://localhost:3005/api/testimonial/update/${currentTestimonial.id}`, formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       Swal.fire('Success', 'Testimonial updated successfully!', 'success');
//       handleCloseUpdateModal();
//       fetchTestimonials(currentPage, searchTerm);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update testimonial', 'error');
//     }
//   };

//   const deleteTestimonial = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:3005/api/testimonial/delete/${id}`);
//         Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
//         fetchTestimonials(currentPage, searchTerm);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to delete testimonial', 'error');
//       }
//     }
//   };

//   const changeStatus = async (id) => {
//     const { value: status } = await Swal.fire({
//       title: 'Change Status',
//       input: 'select',
//       inputOptions: {
//         draft: 'Draft',
//         published: 'Published'
//       },
//       inputPlaceholder: 'Select status',
//       showCancelButton: true,
//       customClass: {
//         popup: 'swal-custom',  // Custom class for the Swal popup
//         title: 'swal-title',    // Custom class for the Swal title
//         input: 'swal-input',    // Custom class for the Swal input
//         confirmButton: 'swal-confirm',  // Custom class for the confirm button
//         cancelButton: 'swal-cancel'     // Custom class for the cancel button
//       },
      
//     });

//     if (status) {
//       try {
//         await axios.patch(`http://localhost:3005/api/testimonial/changeStatus/${id}`, { status });
//         Swal.fire('Success', 'Status updated successfully!', 'success');
//         fetchTestimonials(currentPage, searchTerm);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to change status', 'error');
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleCloseCreateModal = () => setShowCreateModal(false);
//   const handleCloseUpdateModal = () => setShowUpdateModal(false);

//   const truncateContent = (content, maxLength) => {
//     return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
//   };

//   const handleShowContentModal = (content) => {
//     Swal.fire({
//       title: 'Content',
//       text: content,
//       confirmButtonText: 'Close'
//     });
//   };

//   const renderImage = (imagePath) => {
//     return imagePath ? <img src={`http://localhost:3005/${imagePath}`} alt="testimonial" width="50" /> : 'No Image';
//   };

//   if (loading) {
//     return <Spinner animation="border" variant="primary" />;
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   return (
//     <div className="container-fluid">
//       <div className="button-container col-sm-4">
//         <Button onClick={handleShowCreateModal} className="mb-3 btn-custom btn-sm">Create New Testimonial</Button>
//       </div>
//       <div className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <Table striped bordered hover responsive className="table-custom">
//         <thead style={{ border: '2px solid #f0e00f', backgroundColor: '#000033', color: '#000033' }}>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Amount</th>
//             <th>Message</th>
//             <th>Status</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {testimonials.map((testimonial) => (
//             <tr key={testimonial.id}>
//               <td>{testimonial.id}</td>
//               <td>{testimonial.name}</td>
//               <td>{testimonial.amount}</td>
//               <td>
//                 {truncateContent(testimonial.message, 20)}
//                 <Button
//                   variant="link"
//                   onClick={() => handleShowContentModal(testimonial.message)}
//                   style={{ marginLeft: '10px' }}
//                 >
//                   Read More
//                 </Button>
//               </td>
//               <td>{testimonial.status}</td>
//               <td>{renderImage(testimonial.imagePath)}</td>
//               <td>
//                 <div className="btn-group">
//                   <Button
//                     variant="warning"
//                     className="btn-sm btn-border"
//                     style={{ border: '1px solid' }}
//                     onClick={() => handleShowUpdateModal(testimonial)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     className="btn-sm btn-border"
//                     style={{ border: '1px solid', marginLeft: '2px' }}
//                     onClick={() => deleteTestimonial(testimonial.id)}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     variant="info"
//                     className="btn-sm btn-border"
//                     style={{ border: '1px solid', marginLeft: '2px' }}
//                     onClick={() => changeStatus(testimonial.id)}
//                   >
//                     Change Status
//                   </Button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <Pagination className="justify-content-center">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>

//       {/* Create Testimonial Modal */}
//       <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Testimonial</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" value={formData.name} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="amount">
//             <Form.Label>Amount</Form.Label>
//             <Form.Control type="text" value={formData.amount} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="message">
//             <Form.Label>Message</Form.Label>
//             <Form.Control as="textarea" rows={3} value={formData.message} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="imagePath">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
//             {imagePreview && (
//               <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ width: '50%' }} />
//             )}
//           </Form.Group>
//           <Form.Group controlId="status">
//             <Form.Label>Status</Form.Label>
//             <Form.Control as="select" value={formData.status} onChange={handleInputChange}>
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </Form.Control>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseCreateModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCreateTestimonial}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Update Testimonial Modal */}
//       <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Testimonial</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" value={formData.name} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="amount">
//             <Form.Label>Amount</Form.Label>
//             <Form.Control type="text" value={formData.amount} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="message">
//             <Form.Label>Message</Form.Label>
//             <Form.Control as="textarea" rows={3} value={formData.message} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="imagePath">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
//             {imagePreview && (
//               <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ width: '50%' }} />
//             )}
//           </Form.Group>
//           <Form.Group controlId="status">
//             <Form.Label>Status</Form.Label>
//             <Form.Control as="select" value={formData.status} onChange={handleInputChange}>
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </Form.Control>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseUpdateModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleUpdateTestimonial}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ManageTestimonials;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Alert, Spinner, Modal, Form, Pagination } from 'react-bootstrap';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const ManageTestimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // State for modals
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(null);

//   // State for form fields including the image
//   const [formData, setFormData] = useState({
//     name: '',
//     amount: '',
//     message: '',
//     imagePath: null, // Use File object
//     status: 'draft',
//   });

//   // State for image preview
//   const [imagePreview, setImagePreview] = useState(null);

//   // Fetch all testimonials with pagination and filtering
//   const fetchTestimonials = async (page = 1, search = '') => {
//     try {
//       const response = await axios.get('http://localhost:3005/api/testimonial/viewAll', {
//         params: { page, search }
//       });
//       setTestimonials(response.data.data);
//       setTotalPages(response.data.totalPages);
//       setCurrentPage(response.data.page);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch testimonials');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials(currentPage, searchTerm);
//   }, [currentPage, searchTerm]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [id]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData(prevState => ({ ...prevState, imagePath: file }));
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleShowCreateModal = () => {
//     setFormData({
//       name: '',
//       amount: '',
//       message: '',
//       imagePath: null,
//       status: 'draft',
//     });
//     setImagePreview(null);
//     setShowCreateModal(true);
//   };

//   const handleShowUpdateModal = (testimonial) => {
//     setCurrentTestimonial(testimonial);
//     setFormData({
//       name: testimonial.name,
//       amount: testimonial.amount,
//       message: testimonial.message,
//       imagePath: null,
//       status: testimonial.status,
//     });
//     setImagePreview(testimonial.imagePath ? `http://localhost:3005/${testimonial.imagePath}` : null);
//     setShowUpdateModal(true);
//   };

//   const handleCreateTestimonial = async () => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('amount', formData.amount);
//       formDataToSend.append('message', formData.message);
//       formDataToSend.append('status', formData.status);
//       if (formData.imagePath) {
//         formDataToSend.append('imagePath', formData.imagePath);
//       }
//       await axios.post('http://localhost:3005/api/testimonial/create', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       Swal.fire('Success', 'Testimonial created successfully!', 'success');
//       handleCloseCreateModal();
//       fetchTestimonials(currentPage, searchTerm);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to create testimonial', 'error');
//     }
//   };

//   const handleUpdateTestimonial = async () => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('amount', formData.amount);
//       formDataToSend.append('message', formData.message);
//       formDataToSend.append('status', formData.status);
//       if (formData.imagePath) {
//         formDataToSend.append('imagePath', formData.imagePath);
//       }
//       await axios.put(`http://localhost:3005/api/testimonial/update/${currentTestimonial.id}`, formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       Swal.fire('Success', 'Testimonial updated successfully!', 'success');
//       handleCloseUpdateModal();
//       fetchTestimonials(currentPage, searchTerm);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update testimonial', 'error');
//     }
//   };

//   const deleteTestimonial = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:3005/api/testimonial/delete/${id}`);
//         Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
//         fetchTestimonials(currentPage, searchTerm);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to delete testimonial', 'error');
//       }
//     }
//   };

//   const changeStatus = async (id) => {
//     const { value: status } = await Swal.fire({
//       title: 'Change Status',
//       input: 'select',
//       inputOptions: {
//         draft: 'Draft',
//         published: 'Published'
//       },
//       inputPlaceholder: 'Select status',
//       showCancelButton: true,
//     });

//     if (status) {
//       try {
//         await axios.patch(`http://localhost:3005/api/testimonial/changeStatus/${id}`, { status });
//         Swal.fire('Success', 'Status updated successfully!', 'success');
//         fetchTestimonials(currentPage, searchTerm);
//       } catch (error) {
//         Swal.fire('Error', 'Failed to change status', 'error');
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleCloseCreateModal = () => setShowCreateModal(false);
//   const handleCloseUpdateModal = () => setShowUpdateModal(false);

//   const truncateMessage = (message, maxLength) => {
//     return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
//   };

//   const handleShowMessageModal = (message) => {
//     Swal.fire({
//       title: 'Message',
//       text: message,
//       confirmButtonText: 'Close'
//     });
//   };

//   const renderImage = (imagePath) => {
//     return imagePath ? <img src={`http://localhost:3005/${imagePath}`} alt="testimonial" width="50" /> : 'No Image';
//   };

//   if (loading) {
//     return <Spinner animation="border" variant="primary" />;
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   return (
//     <div className="container-fluid">
//       <div className="button-container col-sm-4">
//         <Button onClick={handleShowCreateModal} className="mb-3 btn-custom btn-sm">Create New Testimonial</Button>
//       </div>
//       <div className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <Table striped bordered hover responsive className="table-custom">
//         <thead style={{ border: '2px solid #f0e00f', backgroundColor: '#000033', color: '#000033' }}>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Amount</th>
//             <th>Message</th>
//             <th>Status</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {testimonials.map((testimonial) => (
//             <tr key={testimonial.id}>
//               <td>{testimonial.id}</td>
//               <td>{testimonial.name}</td>
//               <td>{testimonial.amount}</td>
//               <td>
//                 {truncateMessage(testimonial.message, 20)}
//                 <Button
//                   variant="link"
//                   onClick={() => handleShowMessageModal(testimonial.message)}
//                   style={{ marginLeft: '10px' }}
//                 >
//                   Read More
//                 </Button>
//               </td>
//               <td>{testimonial.status}</td>
//               <td>{renderImage(testimonial.imagePath)}</td>
//               <td>
//                 <div className="btn-group">
//                   <Button
//                     variant="warning"
//                     className="btn-sm btn-border"
//                     style={{ border: '1px solid' }}
//                     onClick={() => handleShowUpdateModal(testimonial)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     className="btn-sm btn-border"
//                     style={{ border: '1px solid', marginLeft: '2px' }}
//                     onClick={() => deleteTestimonial(testimonial.id)}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     variant="info"
//                     className="btn-sm btn-border"
//                     style={{ border: '1px solid', marginLeft: '2px' }}
//                     onClick={() => changeStatus(testimonial.id)}
//                   >
//                     Change Status
//                   </Button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <Pagination className="justify-content-center">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>

//       {/* Create Testimonial Modal */}
//       <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Testimonial</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" value={formData.name} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="amount">
//             <Form.Label>Amount</Form.Label>
//             <Form.Control type="text" value={formData.amount} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="message">
//             <Form.Label>Message</Form.Label>
//             <Form.Control as="textarea" rows={3} value={formData.message} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="imagePath">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
//             {imagePreview && (
//               <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ width: '50%' }} />
//             )}
//           </Form.Group>
//           <Form.Group controlId="status">
//             <Form.Label>Status</Form.Label>
//             <Form.Control as="select" value={formData.status} onChange={handleInputChange}>
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </Form.Control>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseCreateModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCreateTestimonial}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Update Testimonial Modal */}
//       <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Testimonial</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" value={formData.name} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="amount">
//             <Form.Label>Amount</Form.Label>
//             <Form.Control type="text" value={formData.amount} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="message">
//             <Form.Label>Message</Form.Label>
//             <Form.Control as="textarea" rows={3} value={formData.message} onChange={handleInputChange} />
//           </Form.Group>
//           <Form.Group controlId="imagePath">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
//             {imagePreview && (
//               <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ width: '50%' }} />
//             )}
//           </Form.Group>
//           <Form.Group controlId="status">
//             <Form.Label>Status</Form.Label>
//             <Form.Control as="select" value={formData.status} onChange={handleInputChange}>
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </Form.Control>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseUpdateModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleUpdateTestimonial}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ManageTestimonials;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Table, Button, Modal, Form } from 'react-bootstrap';
// // import Swal from 'sweetalert2';

// // const ManageTestimonial = () => {
// //   const [testimonials, setTestimonials] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingTestimonial, setEditingTestimonial] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     amount: '',
// //     message: '',
// //     imagePath: '',
// //     status: 'draft',
// //   });

// //   // Fetch testimonials
// //   useEffect(() => {
// //     fetchTestimonials();
// //   }, []);

// //   const fetchTestimonials = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3005/api/testimonial/viewAll');
// //       setTestimonials(response.data);
// //     } catch (error) {
// //       console.error('Error fetching testimonials:', error);
// //     }
// //   };

// //   // Handle form input change
// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   // Handle creating or updating a testimonial
// //   const handleSaveTestimonial = async () => {
// //     try {
// //       if (editingTestimonial) {
// //         // Update testimonial
// //         await axios.put(`http://localhost:3005/api/testimonial/update/${editingTestimonial.id}`, formData);
// //         Swal.fire('Updated!', 'Testimonial has been updated successfully.', 'success');
// //       } else {
// //         // Create new testimonial
// //         await axios.post('http://localhost:3005/api/testimonial/create', formData);
// //         Swal.fire('Created!', 'Testimonial has been created successfully.', 'success');
// //       }
// //       fetchTestimonials(); // Refresh testimonials list
// //       setShowModal(false);
// //       setEditingTestimonial(null);
// //       setFormData({ name: '', amount: '', message: '', imagePath: '', status: 'draft' });
// //     } catch (error) {
// //       console.error('Error saving testimonial:', error);
// //       Swal.fire('Error!', 'There was an error saving the testimonial.', 'error');
// //     }
// //   };

// //   // Open modal for editing a testimonial
// //   const handleEditTestimonial = (testimonial) => {
// //     setEditingTestimonial(testimonial);
// //     setFormData({
// //       name: testimonial.name,
// //       amount: testimonial.amount,
// //       message: testimonial.message,
// //       imagePath: testimonial.imagePath,
// //       status: testimonial.status,
// //     });
// //     setShowModal(true);
// //   };

// //   // Delete testimonial
// //   const handleDeleteTestimonial = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:3005/api/testimonial/delete/${id}`);
// //       Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
// //       fetchTestimonials();
// //     } catch (error) {
// //       console.error('Error deleting testimonial:', error);
// //       Swal.fire('Error!', 'There was an error deleting the testimonial.', 'error');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Manage Testimonials</h2>
// //       <Button variant="primary" onClick={() => setShowModal(true)}>
// //         Add Testimonial
// //       </Button>

// //       <Table striped bordered hover className="mt-4">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Amount</th>
// //             <th>Message</th>
// //             <th>Image</th>
// //             <th>Status</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {testimonials.map((testimonial) => (
// //             <tr key={testimonial.id}>
// //               <td>{testimonial.id}</td>
// //               <td>{testimonial.name}</td>
// //               <td>{testimonial.amount}</td>
// //               <td>{testimonial.message}</td>
// //               <td><img src={testimonial.imagePath} alt={testimonial.name} width="100" /></td>
// //               <td>{testimonial.status}</td>
// //               <td>
// //                 <Button variant="warning" onClick={() => handleEditTestimonial(testimonial)}>
// //                   Edit
// //                 </Button>
// //                 <Button variant="danger" onClick={() => handleDeleteTestimonial(testimonial.id)}>
// //                   Delete
// //                 </Button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>

// //       {/* Modal for creating/editing testimonial */}
// //       <Modal show={showModal} onHide={() => setShowModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group controlId="formName">
// //               <Form.Label>Name</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleInputChange}
// //                 placeholder="Enter name"
// //               />
// //             </Form.Group>
// //             <Form.Group controlId="formAmount">
// //               <Form.Label>Amount</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 name="amount"
// //                 value={formData.amount}
// //                 onChange={handleInputChange}
// //                 placeholder="Enter amount"
// //               />
// //             </Form.Group>
// //             <Form.Group controlId="formMessage">
// //               <Form.Label>Message</Form.Label>
// //               <Form.Control
// //                 as="textarea"
// //                 name="message"
// //                 value={formData.message}
// //                 onChange={handleInputChange}
// //                 rows={3}
// //                 placeholder="Enter message"
// //               />
// //             </Form.Group>
// //             <Form.Group controlId="formImagePath">
// //               <Form.Label>Image Path</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 name="imagePath"
// //                 value={formData.imagePath}
// //                 onChange={handleInputChange}
// //                 placeholder="Enter image path"
// //               />
// //             </Form.Group>
// //             <Form.Group controlId="formStatus">
// //               <Form.Label>Status</Form.Label>
// //               <Form.Control
// //                 as="select"
// //                 name="status"
// //                 value={formData.status}
// //                 onChange={handleInputChange}
// //               >
// //                 <option value="draft">Draft</option>
// //                 <option value="published">Published</option>
// //                 <option value="archived">Archived</option>
// //               </Form.Control>
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowModal(false)}>
// //             Close
// //           </Button>
// //           <Button variant="primary" onClick={handleSaveTestimonial}>
// //             {editingTestimonial ? 'Update' : 'Save'}
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ManageTestimonial;
