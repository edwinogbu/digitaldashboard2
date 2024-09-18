import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Table, Pagination, Alert } from 'react-bootstrap';
// import './UserList.css'; // Ensure you have the appropriate CSS for styling

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://digitalspayout.com/api/auth/users');
      if (response.data.success && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        setUsers([]); // Set to empty array if the response is not as expected
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching user data.');
      setUsers([]); // Set to empty array on error
    }
  };

  const handleDelete = async (userId) => {
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
        await axios.delete(`https://digitalspayout.com/api/auth/user/delete/${userId}`);
        fetchUsers(); // Refresh the user list
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire('Error!', 'There was an issue deleting the user.', 'error');
      }
    }
  };

  const handleUpdate = async (userId, updatedData) => {
    try {
      await axios.put(`https://digitalspayout.com/api/auth/user/update/${userId}`, updatedData);
      fetchUsers(); // Refresh the user list
      Swal.fire('Updated!', 'User details have been updated.', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire('Error!', 'There was an issue updating the user.', 'error');
    }
  };

  const handleShowUpdateModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          <h2 className="text-center my-4" style={{ color: '#f0e00f' }}>User Management</h2>

          {error && <Alert variant="danger text-danger">{error}</Alert>}

          <div className="table-responsive">
            <Table striped bordered hover responsive="sm" className="table-sm" style={{ backgroundColor: '#fff', color: '#000' }}>
              <thead style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
                <tr style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <Button
                            variant="info"
                            size="sm"
                            style={{ backgroundColor: '#00aaff', borderColor: '#00aaff' }}
                            onClick={() => handleShowViewModal(user)}
                          >
                            View
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            style={{ backgroundColor: '#ffaa00', borderColor: '#ffaa00' }}
                            onClick={() => handleShowUpdateModal(user)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination with Next and Previous Buttons */}
          {/* <Pagination>
            <Pagination.Prev
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Pagination.Prev>

            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Pagination.Next>
          </Pagination> */}

          {/* Pagination with Next and Previous Buttons */}
          <Pagination>
            <Pagination.Prev
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Pagination.Prev>

            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Pagination.Next>
          </Pagination>

          {/* View User Modal */}
          <Modal show={showViewModal} onHide={handleCloseViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>View User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <div>
                  <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                  <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p><strong>role:</strong> {selectedUser.role}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
            </Modal.Footer>
          </Modal>

          {/* Update User Modal */}
          <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedData = {
                      firstName: e.target.firstName.value,
                      lastName: e.target.lastName.value,
                      email: e.target.email.value,
                      phone: e.target.phone.value,
                      role: e.target.role.value,
                    };
                    handleUpdate(selectedUser.id, updatedData);
                    handleCloseUpdateModal(); // Close modal after update
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      defaultValue={selectedUser.firstName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      defaultValue={selectedUser.lastName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      defaultValue={selectedUser.email}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      defaultValue={selectedUser.phone}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      defaultValue={selectedUser.role}
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
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Table, Pagination, Alert } from 'react-bootstrap';
// // import './UserList.css'; // Ensure you have the appropriate CSS for styling

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://digitalspayout.com/api/auth/users');
//       if (response.data.success && Array.isArray(response.data.users)) {
//         setUsers(response.data.users);
//       } else {
//         setUsers([]); // Set to empty array if the response is not as expected
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Error fetching user data.');
//       setUsers([]); // Set to empty array on error
//     }
//   };

//   const handleDelete = async (userId) => {
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
//         await axios.delete(`https://digitalspayout.com/api/auth/user/delete/${userId}`);
//         fetchUsers(); // Refresh the user list
//         Swal.fire('Deleted!', 'User has been deleted.', 'success');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         Swal.fire('Error!', 'There was an issue deleting the user.', 'error');
//       }
//     }
//   };

//   const handleUpdate = async (userId, updatedData) => {
//     try {
//       await axios.put(`https://digitalspayout.com/api/auth/user/update/${userId}`, updatedData);
//       fetchUsers(); // Refresh the user list
//       Swal.fire('Updated!', 'User details have been updated.', 'success');
//     } catch (error) {
//       console.error('Error updating user:', error);
//       Swal.fire('Error!', 'There was an issue updating the user.', 'error');
//     }
//   };

//   const handleShowUpdateModal = (user) => {
//     setSelectedUser(user);
//     setShowUpdateModal(true);
//   };

//   const handleCloseUpdateModal = () => setShowUpdateModal(false);

//   const handleShowViewModal = (user) => {
//     setSelectedUser(user);
//     setShowViewModal(true);
//   };

//   const handleCloseViewModal = () => setShowViewModal(false);

//   // Pagination Logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="container align-items-center justify-content-center" style={{ height: '100%' }}>
//       <div className="row align-items-center justify-content-center" style={{ height: '100%', backgroundColor: '#000033' }}>
//         <div className="container-fluid">
//           <h2 className="text-center my-4" style={{ color: '#f0e00f' }}>User Management</h2>

//           {error && <Alert variant="danger text-danger">{error}</Alert>}

//           <div className="table-responsive">
//             <Table striped bordered hover responsive="sm" className="table-sm" style={{ backgroundColor: '#000033', color: '#fff' }}>
//               <thead style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
//                 <tr style={{ color: '#000033', border: '2px solid green', borderRadius: 10 }}>
//                   <th>#</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Role</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(users) && users.length > 0 ? (
//                   currentUsers.map((user, index) => (
//                     <tr key={user.id}>
//                       <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
//                       <td>{user.firstName}</td>
//                       <td>{user.lastName}</td>
//                       <td>{user.email}</td>
//                       <td>{user.phone}</td>
//                       <td>{user.role}</td>
//                       <td>
//                         <div style={{ display: 'flex', gap: '10px' }}>
//                           <Button
//                             variant="info"
//                             size="sm"
//                             style={{ backgroundColor: '#00aaff', borderColor: '#00aaff' }}
//                             onClick={() => handleShowViewModal(user)}
//                           >
//                             View
//                           </Button>
//                           <Button
//                             variant="warning"
//                             size="sm"
//                             style={{ backgroundColor: '#ffaa00', borderColor: '#ffaa00' }}
//                             onClick={() => handleShowUpdateModal(user)}
//                           >
//                             Update
//                           </Button>
//                           <Button
//                             variant="danger"
//                             size="sm"
//                             style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}
//                             onClick={() => handleDelete(user.id)}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center">No users found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>

//           {/* Pagination */}
//           <Pagination>
//             {[...Array(totalPages).keys()].map((number) => (
//               <Pagination.Item
//                 key={number + 1}
//                 active={number + 1 === currentPage}
//                 onClick={() => handlePageChange(number + 1)}
//               >
//                 {number + 1}
//               </Pagination.Item>
//             ))}
//           </Pagination>

//           {/* View User Modal */}
//           <Modal show={showViewModal} onHide={handleCloseViewModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>View User</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {selectedUser && (
//                 <div>
//                   <p><strong>First Name:</strong> {selectedUser.firstName}</p>
//                   <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
//                   <p><strong>Email:</strong> {selectedUser.email}</p>
//                   <p><strong>Phone:</strong> {selectedUser.phone}</p>
//                   <p><strong>role:</strong> {selectedUser.role}</p>
//                 </div>
//               )}
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Update User Modal */}
//           <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Update User</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {selectedUser && (
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     const updatedData = {
//                       firstName: e.target.firstName.value,
//                       lastName: e.target.lastName.value,
//                       email: e.target.email.value,
//                       phone: e.target.phone.value,
//                       role: e.target.role.value,
//                     };
//                     handleUpdate(selectedUser.id, updatedData);
//                     handleCloseUpdateModal(); // Close modal after update
//                   }}
//                 >
//                   <div className="mb-3">
//                     <label htmlFor="firstName" className="form-label">First Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="firstName"
//                       defaultValue={selectedUser.firstName}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="lastName" className="form-label">Last Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="lastName"
//                       defaultValue={selectedUser.lastName}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       defaultValue={selectedUser.email}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="phone" className="form-label">Phone</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="phone"
//                       defaultValue={selectedUser.phone}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="role" className="form-label">role</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="role"
//                       defaultValue={selectedUser.role}
//                       required
//                     />
//                   </div>
//                   <Button variant="primary" type="submit">Update</Button>
//                 </form>
//               )}
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`https://digitalspayout.com/api/auth/users`);
//       if (response.data.success && Array.isArray(response.data.users)) {
//         setUsers(response.data.users);
//       } else {
//         setUsers([]); // Set to empty array if the response is not as expected
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setUsers([]); // Set to empty array on error
//     }
//   };

//   const handleDelete = async (userId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`https://digitalspayout.com/api/auth/delete/${userId}`);
//         fetchUsers(); // Refresh the user list
//         Swal.fire('Deleted!', 'User has been deleted.', 'success');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         Swal.fire('Error!', 'There was an issue deleting the user.', 'error');
//       }
//     }
//   };

//   const handleUpdate = async (userId, updatedData) => {
//     try {
//       await axios.put(`https://digitalspayout.com/api/auth/update/${userId}`, updatedData);
//       fetchUsers(); // Refresh the user list
//       Swal.fire('Updated!', 'User details have been updated.', 'success');
//     } catch (error) {
//       console.error('Error updating user:', error);
//       Swal.fire('Error!', 'There was an issue updating the user.', 'error');
//     }
//   };

//   const handleShowModal = (user) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);

//   const handleShowViewModal = (user) => {
//     setSelectedUser(user);
//     setShowViewModal(true);
//   };

//   const handleCloseViewModal = () => setShowViewModal(false);

//   // Pagination Logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Inline styles
//   const tableStyle = {
//     backgroundColor: '#000033',
//     color: '#FFF',
//     borderColor: '#FFF',

//   };

//   const tableHeaderStyle = {
//     color: '#FFF',
//     backgroundColor: '#000033',
//     borderColor: '#FFF',
//     border: 2,

//   };

//   const tableDataStyle = {
//     color: '#FFF',
//     backgroundColor: '#000033',
//     borderColor: '#FFF',
//     border: 2,

//   };

//   const buttonStyle = {
//     color: '#FFF',
//     borderColor: '#FFF',
//     marginRight: '0.5rem',
//     marginBottom: '0.5rem',
//     backgroundColor: '#000033',

//   };

//   const buttonHoverStyle = {
//     backgroundColor: '#FFF',
//     color: '#000033',
//     borderColor: '#000033'
//   };

//   const paginationButtonStyle = {
//     ...buttonStyle,
//     margin: '0 0.25rem'
//   };

//   return (
//     <>
//       <div className="row my-2 g-3 gx-lg-4 pb-3" style={{backgroundColor:'#000033',  color:'#fff'}}>
//         <div className="col-xl-11 col-xxl-11">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//             <div>
//               <h5 className="mb-0">Users List</h5>
//             </div>
//             <div className="offset-9">
//               <div aria-label="Actions" className="btn-group" role="group">
//                 <Button
//                   style={buttonStyle}
//                   onClick={() => handleShowModal(null)}
//                 >
//                   <i className="bi bi-trash" /> Add New User
//                 </Button>
//               </div>
//             </div>
//             <div className="recent-contact pb-2 pt-3 ">
//               <table className="table table-responsive" >
//                 <thead>
//                   <tr>
//                     <th style={tableHeaderStyle}>Name</th>
//                     <th style={tableHeaderStyle}>Email</th>
//                     <th style={tableHeaderStyle}>Phone Numbers</th>
//                     <th style={tableHeaderStyle}>Role role</th>
//                     <th style={tableHeaderStyle}>Date</th>
//                     <th style={tableHeaderStyle}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody style={{backgroundColor:'#000033', color:'#fff'}}>
//                   {Array.isArray(currentUsers) && currentUsers.map((user) => (
//                     <tr key={user.id} style={{backgroundColor:'#000033',  color:'#fff'}}>
//                       <td style={{backgroundColor:'#000033', color:'#fff'}}>{user.firstName} {user.lastName}</td>
//                       <td className="align-items-center" style={{backgroundColor:'#000033', color:'#fff'}}>
//                         {/* <img alt="" src="./assets/images/fly-coins.png" /> */}
//                         {user.email}
//                       </td>
//                       <td style={{backgroundColor:'#000033', color:'#fff'}}>{user.phone}</td>
//                       <td style={{backgroundColor:'#000033', color:'#fff'}}><span className="green-tag">{user.role}</span></td>
//                       <td style={{backgroundColor:'#000033', color:'#fff'}}>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td style={{backgroundColor:'#000033', color:'#fff'}}>
//                         <div aria-label="Actions" className="btn-group" role="group">
//                           <Button
//                             style={buttonStyle}
//                             onClick={() => handleDelete(user.id)}
//                           >
//                             <i className="bi bi-trash" /> Delete
//                           </Button>
//                           <Button
//                             style={buttonStyle}
//                             onClick={() => handleShowViewModal(user)}
//                           >
//                             <i className="bi bi-pencil" /> View
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="pagination">
//                 <Button
//                   style={buttonStyle}
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   Previous
//                 </Button>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     style={currentPage === i + 1 ? { ...paginationButtonStyle, ...buttonHoverStyle } : paginationButtonStyle}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//                 <Button
//                   style={buttonStyle}
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal for User View */}
//       <Modal show={showViewModal} onHide={handleCloseViewModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={tableStyle}>
//           {selectedUser && (
//             <>
//               <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Phone:</strong> {selectedUser.phone}</p>
//               <p><strong>Role:</strong> {selectedUser.role}</p>
//               <p><strong>Date:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             style={buttonStyle}
//             onClick={handleCloseViewModal}
//           >
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for User Update */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedUser ? 'Update User' : 'Add New User'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={tableStyle}>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const updatedData = {
//               firstName: formData.get('firstName'),
//               lastName: formData.get('lastName'),
//               email: formData.get('email'),
//               phone: formData.get('phone'),
//               role: formData.get('role'),
//               createdAt: formData.get('createdAt'),
//             };
//             if (selectedUser) {
//               handleUpdate(selectedUser.id, updatedData);
//             } else {
//               // Handle Add New User logic
//             }
//             handleCloseModal();
//           }}>
//             <div className="mb-3">
//               <label htmlFor="firstName" className="form-label">First Name</label>
//               <input type="text" id="firstName" name="firstName" defaultValue={selectedUser ? selectedUser.firstName : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="lastName" className="form-label">Last Name</label>
//               <input type="text" id="lastName" name="lastName" defaultValue={selectedUser ? selectedUser.lastName : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input type="email" id="email" name="email" defaultValue={selectedUser ? selectedUser.email : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label">Phone</label>
//               <input type="text" id="phone" name="phone" defaultValue={selectedUser ? selectedUser.phone : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="role" className="form-label">Role</label>
//               <input type="text" id="role" name="role" defaultValue={selectedUser ? selectedUser.role : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="createdAt" className="form-label">Date</label>
//               <input type="date" id="createdAt" name="createdAt" defaultValue={selectedUser ? selectedUser.createdAt.slice(0, 10) : ''} className="form-control" />
//             </div>
//             <Button
//               style={buttonStyle}
//               type="submit"
//             >
//               {selectedUser ? 'Update' : 'Add'} User
//             </Button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             style={buttonStyle}
//             onClick={handleCloseModal}
//           >
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
