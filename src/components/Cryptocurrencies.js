import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Table, Pagination, Alert } from 'react-bootstrap';

export default function Cryptocurrencies() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cryptocurrenciesPerPage = 10;

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const fetchCryptocurrencies = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/crypto/currencies');
      if (response.data.success && Array.isArray(response.data.cryptocurrencies)) {
        setCryptocurrencies(response.data.cryptocurrencies);
      } else {
        setCryptocurrencies([]);
      }
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      setError('Error fetching cryptocurrencies.');
      setCryptocurrencies([]);
    }
  };

  const handleDelete = async (cryptoId) => {
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
        await axios.delete(`http://localhost:3005/api/crypto/delete/${cryptoId}`);
        fetchCryptocurrencies(); // Refresh the cryptocurrency list
        Swal.fire('Deleted!', 'Cryptocurrency has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting cryptocurrency:', error);
        Swal.fire('Error!', 'There was an issue deleting the cryptocurrency.', 'error');
      }
    }
  };

  const handleAdd = async (newCrypto) => {
    try {
      await axios.post('http://localhost:3005/api/crypto/create', newCrypto);
      fetchCryptocurrencies(); // Refresh the cryptocurrency list
      Swal.fire('Added!', 'Cryptocurrency has been added.', 'success');
      setShowAddModal(false); // Close modal after adding
    } catch (error) {
      console.error('Error adding cryptocurrency:', error);
      Swal.fire('Error!', 'There was an issue adding the cryptocurrency.', 'error');
    }
  };

  const handleUpdate = async (cryptoId, updatedData) => {
    try {
      await axios.put(`http://localhost:3005/api/crypto/update/${cryptoId}`, updatedData);
      fetchCryptocurrencies(); // Refresh the cryptocurrency list
      Swal.fire('Updated!', 'Cryptocurrency details have been updated.', 'success');
      setShowUpdateModal(false); // Close modal after updating
    } catch (error) {
      console.error('Error updating cryptocurrency:', error);
      Swal.fire('Error!', 'There was an issue updating the cryptocurrency.', 'error');
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowUpdateModal = (crypto) => {
    setSelectedCrypto(crypto);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowViewModal = async (cryptoId) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/cryptocurrency/${cryptoId}`);
      setSelectedCrypto(response.data.cryptocurrency);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching cryptocurrency details:', error);
      Swal.fire('Error!', 'There was an issue fetching the cryptocurrency details.', 'error');
    }
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  // Pagination Logic
  const indexOfLastCrypto = currentPage * cryptocurrenciesPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptocurrenciesPerPage;
  const currentCryptos = cryptocurrencies.slice(indexOfFirstCrypto, indexOfLastCrypto);

  const totalPages = Math.ceil(cryptocurrencies.length / cryptocurrenciesPerPage);

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
          <h2 className="text-center my-4" style={{ color: '#f0e00f' }}>Cryptocurrency Management</h2>

          {error && <Alert variant="danger text-danger">{error}</Alert>}

          <div className="text-center my-3">
            <Button variant="primary" onClick={handleShowAddModal}>Add Cryptocurrency</Button>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover responsive="sm" className="table-sm" style={{ backgroundColor: '#fff', color: '#000' }}>
              <thead style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
                <tr style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
                  <th>#</th>
                  <th>Code</th>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(cryptocurrencies) && cryptocurrencies.length > 0 ? (
                  currentCryptos.map((crypto, index) => (
                    <tr key={crypto._id}>
                      <td>{index + 1 + (currentPage - 1) * cryptocurrenciesPerPage}</td>
                      <td>{crypto.code}</td>
                      <td>{crypto.symbol}</td>
                      <td>{crypto.name}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <Button
                            variant="info"
                            size="sm"
                            style={{ backgroundColor: '#00aaff', borderColor: '#00aaff' }}
                            onClick={() => handleShowViewModal(crypto._id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            style={{ backgroundColor: '#ffaa00', borderColor: '#ffaa00' }}
                            onClick={() => handleShowUpdateModal(crypto)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}
                            onClick={() => handleDelete(crypto._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No cryptocurrencies found</td>
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

          {/* Add Cryptocurrency Modal */}
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Cryptocurrency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newCrypto = {
                    code: e.target.code.value,
                    symbol: e.target.symbol.value,
                    name: e.target.name.value,
                  };
                  handleAdd(newCrypto);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="code" className="form-label">Code</label>
                  <input type="text" className="form-control" id="code" name="code" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="symbol" className="form-label">Symbol</label>
                  <input type="text" className="form-control" id="symbol" name="symbol" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <Button variant="primary" type="submit">Add</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
            </Modal.Footer>
          </Modal>

          {/* Update Cryptocurrency Modal */}
          <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Cryptocurrency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCrypto && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedCrypto = {
                      code: e.target.code.value,
                      symbol: e.target.symbol.value,
                      name: e.target.name.value,
                    };
                    handleUpdate(selectedCrypto._id, updatedCrypto);
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      name="code"
                      defaultValue={selectedCrypto.code}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="symbol" className="form-label">Symbol</label>
                    <input
                      type="text"
                      className="form-control"
                      id="symbol"
                      name="symbol"
                      defaultValue={selectedCrypto.symbol}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      defaultValue={selectedCrypto.name}
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

          {/* View Cryptocurrency Modal */}
          <Modal show={showViewModal} onHide={handleCloseViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>View Cryptocurrency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCrypto && (
                <div>
                  <p><strong>Code:</strong> {selectedCrypto.code}</p>
                  <p><strong>Symbol:</strong> {selectedCrypto.symbol}</p>
                  <p><strong>Name:</strong> {selectedCrypto.name}</p>
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
