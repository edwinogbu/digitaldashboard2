import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://digitalspayout.com/api/auth/users`);
      if (response.data.success && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        setUsers([]); // Set to empty array if the response is not as expected
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]); // Set to empty array on error
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://digitalspayout.com/api/auth/delete/${userId}`);
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
      await axios.put(`https://digitalspayout.com/api/auth/update/${userId}`, updatedData);
      fetchUsers(); // Refresh the user list
      Swal.fire('Updated!', 'User details have been updated.', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire('Error!', 'There was an issue updating the user.', 'error');
    }
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

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

  // Inline styles
  const tableStyle = {
    backgroundColor: '#000033',
    color: '#FFF',
    borderColor: '#FFF',

  };

  const tableHeaderStyle = {
    color: '#FFF',
    backgroundColor: '#000033',
    borderColor: '#FFF',
    border: 2,

  };

  const tableDataStyle = {
    color: '#FFF',
    backgroundColor: '#000033',
    borderColor: '#FFF',
    border: 2,

  };

  const buttonStyle = {
    color: '#FFF',
    borderColor: '#FFF',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: '#000033',

  };

  const buttonHoverStyle = {
    backgroundColor: '#FFF',
    color: '#000033',
    borderColor: '#000033'
  };

  const paginationButtonStyle = {
    ...buttonStyle,
    margin: '0 0.25rem'
  };

  return (
    <>
      <div className="row my-2 g-3 gx-lg-4 pb-3" style={{backgroundColor:'#000033',  color:'#fff'}}>
        <div className="col-xl-11 col-xxl-11">
          <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
            <div>
              <h5 className="mb-0">Users List</h5>
            </div>
            <div className="offset-9">
              <div aria-label="Actions" className="btn-group" role="group">
                <Button
                  style={buttonStyle}
                  onClick={() => handleShowModal(null)}
                >
                  <i className="bi bi-trash" /> Add New User
                </Button>
              </div>
            </div>
            <div className="recent-contact pb-2 pt-3 ">
              <table className="table table-responsive" >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Phone Numbers</th>
                    <th style={tableHeaderStyle}>Role Status</th>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Action</th>
                  </tr>
                </thead>
                <tbody style={{backgroundColor:'#000033', color:'#fff'}}>
                  {Array.isArray(currentUsers) && currentUsers.map((user) => (
                    <tr key={user.id} style={{backgroundColor:'#000033',  color:'#fff'}}>
                      <td style={{backgroundColor:'#000033', color:'#fff'}}>{user.firstName} {user.lastName}</td>
                      <td className="align-items-center" style={{backgroundColor:'#000033', color:'#fff'}}>
                        {/* <img alt="" src="./assets/images/fly-coins.png" /> */}
                        {user.email}
                      </td>
                      <td style={{backgroundColor:'#000033', color:'#fff'}}>{user.phone}</td>
                      <td style={{backgroundColor:'#000033', color:'#fff'}}><span className="green-tag">{user.role}</span></td>
                      <td style={{backgroundColor:'#000033', color:'#fff'}}>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td style={{backgroundColor:'#000033', color:'#fff'}}>
                        <div aria-label="Actions" className="btn-group" role="group">
                          <Button
                            style={buttonStyle}
                            onClick={() => handleDelete(user.id)}
                          >
                            <i className="bi bi-trash" /> Delete
                          </Button>
                          <Button
                            style={buttonStyle}
                            onClick={() => handleShowViewModal(user)}
                          >
                            <i className="bi bi-pencil" /> View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <Button
                  style={buttonStyle}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    style={currentPage === i + 1 ? { ...paginationButtonStyle, ...buttonHoverStyle } : paginationButtonStyle}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  style={buttonStyle}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for User View */}
      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={tableStyle}>
          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Date:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={buttonStyle}
            onClick={handleCloseViewModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for User Update */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Update User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={tableStyle}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedData = {
              firstName: formData.get('firstName'),
              lastName: formData.get('lastName'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              role: formData.get('role'),
              createdAt: formData.get('createdAt'),
            };
            if (selectedUser) {
              handleUpdate(selectedUser.id, updatedData);
            } else {
              // Handle Add New User logic
            }
            handleCloseModal();
          }}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" id="firstName" name="firstName" defaultValue={selectedUser ? selectedUser.firstName : ''} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" id="lastName" name="lastName" defaultValue={selectedUser ? selectedUser.lastName : ''} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" defaultValue={selectedUser ? selectedUser.email : ''} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" id="phone" name="phone" defaultValue={selectedUser ? selectedUser.phone : ''} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <input type="text" id="role" name="role" defaultValue={selectedUser ? selectedUser.role : ''} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="createdAt" className="form-label">Date</label>
              <input type="date" id="createdAt" name="createdAt" defaultValue={selectedUser ? selectedUser.createdAt.slice(0, 10) : ''} className="form-control" />
            </div>
            <Button
              style={buttonStyle}
              type="submit"
            >
              {selectedUser ? 'Update' : 'Add'} User
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={buttonStyle}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
//       const response = await axios.get('http://localhost:3005/api/auth/users');
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
//         await axios.delete(`http://localhost:3005/api/auth/user/delete/${userId}`);
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
//       await axios.put(`http://localhost:3005/api/auth/user/update/${userId}`, updatedData);
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

//   return (
//     <>
//       <div className="row my-2 g-3 gx-lg-4 pb-3">
//         <div className="col-xl-11 col-xxl-11">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//             <div>
//               <h5 className="mb-0">Users List</h5>
//             </div>
//             <div className="offset-9">
//               <div aria-label="Actions" className="btn-group" role="group">
//                 <Button variant="outline-danger" className="btn-sm" onClick={() => handleShowModal(null)}>
//                   <i className="bi bi-trash" /> Add New User
//                 </Button>
//               </div>
//             </div>
//             <div className="recent-contact pb-2 pt-3">
//               <table className="table table-striped" >
//                 <thead  style={{ backgroundColor: '#000033', borderRadius: '5px' }}>
//                   <tr>
//                     <th className="fw-bold">Name</th>
//                     <th className="fw-bold">Email</th>
//                     <th className="fw-bold">Phone Numbers</th>
//                     <th className="fw-bold">Role Status</th>
//                     <th className="fw-bold">Date</th>
//                     <th className="fw-bold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody  style={{ backgroundColor: '#000033', borderRadius: '5px' }}>
//                   {Array.isArray(currentUsers) && currentUsers.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.firstName} {user.lastName}</td>
//                       <td className="d-flex align-items-center gap-2">
//                         <img alt="" src="./assets/img/crypto/bitcoin.png" />
//                         {user.email}
//                       </td>
//                       <td>{user.phone}</td>
//                       <td><span className="green-tag">{user.role}</span></td>
//                       <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         <div aria-label="Actions" className="btn-group" role="group">
//                           <Button variant="outline-danger" className="btn-sm" onClick={() => handleDelete(user.id)}>
//                             <i className="bi bi-trash" /> Delete
//                           </Button>
//                           <Button variant="outline-primary" className="btn-sm" onClick={() => handleShowViewModal(user)}>
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
//                   variant="outline-secondary"
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   Previous
//                 </Button>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
//                     className="mx-1"
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//                 <Button
//                   variant="outline-secondary"
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
//         <Modal.Body>
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
//           <Button variant="secondary" onClick={handleCloseViewModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for User Update */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedUser ? 'Update User' : 'Add New User'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
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
//             <Button variant="primary" type="submit">
//               {selectedUser ? 'Update' : 'Add'} User
//             </Button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
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

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3005/api/auth/users');
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
//         await axios.delete(`http://localhost:3005/api/auth/user/delete/${userId}`);
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
//       await axios.put(`http://localhost:3005/api/auth/user/update/${userId}`, updatedData);
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

//   return (
//     <>
//       <div class="container-fluid main-content px-2 px-lg-4">

//       <div className="row my-2 g-3 gx-lg-4 pb-3">
//         <div className="col-xl-11 col-xxl-11">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//             <div>
//               <h5 className="mb-0">Users List</h5>
//             </div>
//             <div className="offset-9">
//               <div aria-label="Actions" className="btn-group" role="group">
//                 <Button variant="outline-danger" className="btn-sm" onClick={() => handleShowModal(null)}>
//                   <i className="bi bi-trash" /> Add New User
//                 </Button>
//               </div>
//             </div>
//             <div className="recent-contact pb-2 pt-3">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th className="fw-bold">Name</th>
//                     <th className="fw-bold">Email</th>
//                     <th className="fw-bold">Phone Numbers</th>
//                     <th className="fw-bold">Role Status</th>
//                     <th className="fw-bold">Date</th>
//                     <th className="fw-bold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Array.isArray(users) && users.map((user) => (
//                     <tr key={user.id}  className="border-b2">
//                       <td>{user.firstName} {user.lastName}</td>
//                       <td className="d-flex align-items-center gap-2">
//                         <img alt="" src="./assets/img/crypto/bitcoin.png" />
//                         {user.email}
//                       </td>
//                       <td>{user.phone}</td>
//                       <td><span className="green-tag">{user.role}</span></td>
//                       <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         <div aria-label="Actions" className="btn-group" role="group">
//                           <Button variant="outline-danger" className="btn-sm" onClick={() => handleDelete(user.id)}>
//                             <i className="bi bi-trash" /> Delete
//                           </Button>
//                           <Button variant="outline-primary" className="btn-sm" onClick={() => handleShowViewModal(user)}>
//                             <i className="bi bi-pencil" /> View
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

  
//       <Modal show={showViewModal} onHide={handleCloseViewModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
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
//           <Button variant="secondary" onClick={handleCloseViewModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

  
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedUser ? 'Update User' : 'Add New User'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
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
//               <input type="tel" id="phone" name="phone" defaultValue={selectedUser ? selectedUser.phone : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="role" className="form-label">Role</label>
//               <input type="text" id="role" name="role" defaultValue={selectedUser ? selectedUser.role : ''} className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="createdAt" className="form-label">Date</label>
//               <input type="date" id="createdAt" name="createdAt" defaultValue={selectedUser ? selectedUser.createdAt.slice(0, 10) : ''} className="form-control" />
//             </div>
//             <Button variant="primary" type="submit">
//               {selectedUser ? 'Update' : 'Add'} User
//             </Button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       </div>
//     </>
//   );
// }


// import React from 'react'

// export default function UserList() {
//   return (
//     <>
//       <div className="row my-2 g-3 g-lg-4">
//         <div className="col-md-3 col-xl-2 col-xxl-1">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Bitcoin
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $1200.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="../assets/img/crypto/bitcoin.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_2" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 col-xl-2 col-xxl-1">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Ethereum
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $100.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/etherium.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_3" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 col-xl-2 col-xxl-1">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Dogecoin
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $2500.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/dogecoin.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_4" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 col-xl-2 col-xxl-1">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Binance
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $3200.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/binance.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_5" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 col-xl-2 col-xxl-1">
//           <div className="price-box">
//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <p className="text-white mb-0">
//                   Binance
//                 </p>
//                 <h4 className="fw-semibold text-white mb-0">
//                   $3200.00
//                 </h4>
//               </div>
//               <img
//                 alt=""
//                 src="./assets/img/crypto/binance.png"
//               />
//             </div>
//             <div className="chart">
//               <canvas id="chart_5" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-2 g-3 gx-lg-4">
//         <div className="col-xl-7 col-xxl-9">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
//             <div className="row g-3 align-items-center">
//               <div className="col-xl-3 col-xxl-6">
//                 <img
//                   alt="..."
//                   className="img-fluid rounded-start"
//                   src="../assets/img/promo_s_11.png"
//                 />
//               </div>
//               <div className="col-xl-9 col-xxl-6">
//                 <div className="card-body">
//                   <h6 className="card-title">
//                     Welcome--
//                   </h6>
//                   <h5 className="card-title">
//                     Bayo Clems
//                   </h5>
//                   <p className="card-text">
//                     bayo@gmail.com.
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted text-white-50">
//                       Last updated 3 mins ago
//                     </small>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-2 g-3 gx-lg-4 pb-3">
//         <div className="col-xl-11 col-xxl-11">
//           <div className="mainchart px-3 px-md-4 py-3 py-lg-4 ">
//             <div>
//               <h5 className="mb-0">
//                 Users List
//               </h5>
//             </div>
//             <div className="offset-9">
//               <div
//                 aria-label="Actions"
//                 className="btn-group"
//                 role="group"
//               >
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   type="button"
//                 >
//                   <i className="bi bi-trash" />
//                   {' '}Add New user
//                 </button>
//                 <button
//                   className="btn btn-sm btn-outline-primary"
//                   type="button"
//                 >
//                   <i className="bi bi-pencil" />
//                   {' '}Update
//                 </button>
//               </div>
//             </div>
//             <div className="recent-contact pb-2 pt-3">
//               <table>
//                 <thead>
//                   <tr className="border-b2">
//                     <th className="fw-bold">
//                       Name
//                     </th>
//                     <th className="fw-bold">
//                       Email
//                     </th>
//                     <th className="fw-bold">
//                       Phone Numbers
//                     </th>
//                     <th className="fw-bold">
//                       Role Status{' '}
//                     </th>
//                     <th className="fw-bold">
//                       Date
//                     </th>
//                     <th className="fw-bold">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b2">
//                     <td>
//                       Charlse Bryan
//                     </td>
//                     <td className="d-flex align-items-center gap-2">
//                       <img
//                         alt=""
//                         src="./assets/img/crypto/bitcoin.png"
//                       />
//                       charlse@gmail.com
//                     </td>
//                     <td>
//                       07034256754
//                     </td>
//                     <td>
//                       <span className="green-tag">
//                         user
//                       </span>
//                     </td>
//                     <td>
//                       Apr 14, 2023
//                     </td>
//                     <td>
//                       <div
//                         aria-label="Actions"
//                         className="btn-group"
//                         role="group"
//                       >
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           type="button"
//                         >
//                           <i className="bi bi-trash" />
//                           {' '}Delete
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-primary"
//                           type="button"
//                         >
//                           <i className="bi bi-pencil" />
//                           {' '}Update
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
     
//     </>
//   )
// }
