import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  // State for form fields including the image
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    status: 'draft',
    imageUrl: null, // Use File object
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch all blogs with pagination and filtering
  const fetchBlogs = async (page = 1, search = '') => {
    try {
      const response = await axios.get('http://localhost:3005/api/blogs/viewAll', {
        params: { page, search }
      });
      setBlogs(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.page);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({ ...prevState, imageUrl: file }));
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
      title: '',
      content: '',
      author: '',
      status: 'draft',
      imageUrl: null,
    });
    setImagePreview(null);
    setShowCreateModal(true);
  };

  const handleShowUpdateModal = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      status: blog.status,
      imageUrl: null,
    });
    setImagePreview(blog.imageUrl ? `http://localhost:3005/${blog.imageUrl}` : null);
    setShowUpdateModal(true);
  };

  const handleCreateBlog = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('status', formData.status);
      if (formData.imageUrl) {
        formDataToSend.append('imageUrl', formData.imageUrl);
      }
      await axios.post('http://localhost:3005/api/blogs/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      Swal.fire('Success', 'Blog created successfully!', 'success');
      handleCloseCreateModal();
      fetchBlogs(currentPage, searchTerm);
    } catch (error) {
      Swal.fire('Error', 'Failed to create blog', 'error');
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('status', formData.status);
      if (formData.imageUrl) {
        formDataToSend.append('imageUrl', formData.imageUrl);
      }
      await axios.put(`http://localhost:3005/api/blogs/update/${currentBlog.id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      Swal.fire('Success', 'Blog updated successfully!', 'success');
      handleCloseUpdateModal();
      fetchBlogs(currentPage, searchTerm);
    } catch (error) {
      Swal.fire('Error', 'Failed to update blog', 'error');
    }
  };

  const deleteBlog = async (id) => {
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
        await axios.delete(`http://localhost:3005/api/blogs/delete/${id}`);
        Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
        fetchBlogs(currentPage, searchTerm);
      } catch (error) {
        Swal.fire('Error', 'Failed to delete blog', 'error');
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
        await axios.patch(`http://localhost:3005/api/blogs/changeStatus/${id}`, { status });
        Swal.fire('Success', 'Status updated successfully!', 'success');
        fetchBlogs(currentPage, searchTerm);
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

  const truncateContent = (content, maxLength) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const handleShowContentModal = (content) => {
    Swal.fire({
      title: 'Content',
      text: content,
      confirmButtonText: 'Close'
    });
  };

  const renderImage = (imageUrl) => {
    return imageUrl ? <img src={`http://localhost:3005/${imageUrl}`} alt="blog" width="50" /> : 'No Image';
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
        <Button onClick={handleShowCreateModal} className="mb-3 btn-custom btn-sm">Create New Blog</Button>
      </div>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Table striped bordered hover responsive className="table-custom">
        <thead style={{ border: '2px solid #f0e00f', backgroundColor: '#000033', color: '#000033' }}>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>
                {truncateContent(blog.content, 20)}
                <Button
                  variant="link"
                  onClick={() => handleShowContentModal(blog.content)}
                  style={{ marginLeft: '10px' }}
                >
                  Read More
                </Button>
              </td>
              <td>{blog.author}</td>
              <td>{blog.status}</td>
              <td>{renderImage(blog.imageUrl)}</td>
              <td>
                <div className="btn-group">
                  <Button
                    variant="warning"
                    className="btn-sm btn-border"
                    style={{ border: '1px solid' }}
                    onClick={() => handleShowUpdateModal(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm btn-border"
                    style={{ border: '1px solid', marginLeft: '2px' }}
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    className="btn-sm btn-border"
                    style={{ border: '1px solid', marginLeft: '2px' }}
                    onClick={() => changeStatus(blog.id)}
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
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Create Blog Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                id="content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                id="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateBlog}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Blog Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                id="content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                id="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateBlog}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageBlog;

