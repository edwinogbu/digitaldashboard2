import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import './CreateSubscriptionPlan.css'; // Ensure the styling file exists

const CreateSubscriptionPlan = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [formData, setFormData] = useState({
        rate: '',
        duration: '',
        minInvest: '',
        maxInvest: '',
        label: 'basic',
    });

    // Function to fetch all subscriptions from the correct API endpoint
    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
            setSubscriptions(response.data.data); // Access the data array inside the 'data' key
        } catch (error) {
            console.error('Error fetching subscription plans:', error);
            Swal.fire('Error', 'Failed to fetch subscription plans', 'error');
        }
    };

    // Fetch all subscriptions on component mount
    useEffect(() => {
        fetchSubscriptions();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submission for creating a subscription plan
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentPlan) {
                // Update existing plan
                await axios.put(`/api/subscription-plans/${currentPlan.id}`, formData);
                Swal.fire('Success', 'Subscription plan updated!', 'success');
            } else {
                // Create new plan using the provided API endpoint
                await axios.post('http://localhost:3005/api/subscription/createPlan', formData);
                Swal.fire('Success', 'Subscription plan created!', 'success');
            }
            setShowCreateModal(false);
            setShowUpdateModal(false);
            setCurrentPlan(null);
            fetchSubscriptions(); // Refresh the subscription list
        } catch (error) {
            Swal.fire('Error', 'Failed to save subscription plan', 'error');
        }
    };

    // Open the modal for creating a new plan
    const handleCreate = () => {
        setFormData({
            rate: '',
            duration: '',
            minInvest: '',
            maxInvest: '',
            label: 'basic',
        });
        setShowCreateModal(true);
    };

    // Open the modal for updating a subscription plan
    const handleUpdate = (plan) => {
        setCurrentPlan(plan);
        setFormData({
            rate: plan.rate,
            duration: plan.duration,
            minInvest: plan.minInvest,
            maxInvest: plan.maxInvest,
            label: plan.label,
        });
        setShowUpdateModal(true);
    };

    // Delete a subscription plan
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/subscription-plans/${id}`);
            Swal.fire('Success', 'Subscription plan deleted!', 'success');
            fetchSubscriptions(); // Refresh the subscription list
        } catch (error) {
            Swal.fire('Error', 'Failed to delete subscription plan', 'error');
        }
    };

    return (
        <div className="subscription-plan-container">
            <h2>Subscription Plans</h2>
            <Button className="mb-3" onClick={handleCreate}>
                Create Subscription Plan
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Rate (%)</th>
                        <th>Duration</th>
                        <th>Min Investment</th>
                        <th>Max Investment</th>
                        <th>Avg Monthly (%)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((plan) => (
                            <tr key={plan.id}>
                                <td>{plan.label}</td>
                                <td>{plan.rate}</td>
                                <td>{plan.duration}</td>
                                <td>{plan.minInvest}</td>
                                <td>{plan.maxInvest}</td>
                                <td>{plan.avgMonthly}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="mr-2"
                                        onClick={() => handleUpdate(plan)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(plan.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No subscription plans found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Create Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Subscription Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Rate (%)</Form.Label>
                            <Form.Control
                                type="text"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Min Investment</Form.Label>
                            <Form.Control
                                type="number"
                                name="minInvest"
                                value={formData.minInvest}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Investment</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxInvest"
                                value={formData.maxInvest}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Plan Label</Form.Label>
                            <Form.Control
                                as="select"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                required
                            >
                                <option value="basic">Basic</option>
                                <option value="regular">Regular</option>
                                <option value="popular">Popular</option>
                                {/* Add more options as necessary */}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Plan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Subscription Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Form fields are identical to the create modal */}
                        <Form.Group>
                            <Form.Label>Rate (%)</Form.Label>
                            <Form.Control
                                type="text"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Min Investment</Form.Label>
                            <Form.Control
                                type="number"
                                name="minInvest"
                                value={formData.minInvest}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Investment</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxInvest"
                                value={formData.maxInvest}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Plan Label</Form.Label>
                            <Form.Control
                                as="select"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                required
                            >
                                <option value="basic">Basic</option>
                                <option value="regular">Regular</option>
                                <option value="popular">Popular</option>
                                {/* Add more options as necessary */}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Plan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateSubscriptionPlan;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './CreateSubscriptionPlan.css'; // Ensure the styling file exists

// const CreateSubscriptionPlan = () => {
//     const [subscriptions, setSubscriptions] = useState([]);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showUpdateModal, setShowUpdateModal] = useState(false);
//     const [currentPlan, setCurrentPlan] = useState(null);
//     const [formData, setFormData] = useState({
//         rate: '',
//         duration: '',
//         minInvest: '',
//         maxInvest: '',
//         label: 'basic',
//     });

//     // Function to fetch all subscriptions from the correct API endpoint
//     const fetchSubscriptions = async () => {
//         try {
//             const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
//             setSubscriptions(response.data); // Assuming the API returns an array of plans
//         } catch (error) {
//             console.error('Error fetching subscription plans:', error);
//             Swal.fire('Error', 'Failed to fetch subscription plans', 'error');
//         }
//     };

//     // Fetch all subscriptions on component mount
//     useEffect(() => {
//         fetchSubscriptions();
//     }, []);

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle submission for creating a subscription plan
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (currentPlan) {
//                 // Update existing plan
//                 await axios.put(`/api/subscription-plans/${currentPlan.id}`, formData);
//                 Swal.fire('Success', 'Subscription plan updated!', 'success');
//             } else {
//                 // Create new plan using the provided API endpoint
//                 await axios.post('http://localhost:3005/api/subscription/createPlan', formData);
//                 Swal.fire('Success', 'Subscription plan created!', 'success');
//             }
//             setShowCreateModal(false);
//             setShowUpdateModal(false);
//             setCurrentPlan(null);
//             fetchSubscriptions(); // Refresh the subscription list
//         } catch (error) {
//             Swal.fire('Error', 'Failed to save subscription plan', 'error');
//         }
//     };

//     // Open the modal for creating a new plan
//     const handleCreate = () => {
//         setFormData({
//             rate: '',
//             duration: '',
//             minInvest: '',
//             maxInvest: '',
//             label: 'basic',
//         });
//         setShowCreateModal(true);
//     };

//     // Open the modal for updating a subscription plan
//     const handleUpdate = (plan) => {
//         setCurrentPlan(plan);
//         setFormData({
//             rate: plan.rate,
//             duration: plan.duration,
//             minInvest: plan.minInvest,
//             maxInvest: plan.maxInvest,
//             label: plan.label,
//         });
//         setShowUpdateModal(true);
//     };

//     // Delete a subscription plan
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/api/subscription-plans/${id}`);
//             Swal.fire('Success', 'Subscription plan deleted!', 'success');
//             fetchSubscriptions(); // Refresh the subscription list
//         } catch (error) {
//             Swal.fire('Error', 'Failed to delete subscription plan', 'error');
//         }
//     };

//     return (
//         <div className="subscription-plan-container">
//             <h2>Subscription Plans</h2>
//             <Button className="mb-3" onClick={handleCreate}>
//                 Create Subscription Plan
//             </Button>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Label</th>
//                         <th>Rate (%)</th>
//                         <th>Duration</th>
//                         <th>Min Investment</th>
//                         <th>Max Investment</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {subscriptions.length > 0 ? (
//                         subscriptions.map((plan) => (
//                             <tr key={plan.id}>
//                                 <td>{plan.label}</td>
//                                 <td>{plan.rate}</td>
//                                 <td>{plan.duration}</td>
//                                 <td>{plan.minInvest}</td>
//                                 <td>{plan.maxInvest}</td>
//                                 <td>
//                                     <Button
//                                         variant="warning"
//                                         className="mr-2"
//                                         onClick={() => handleUpdate(plan)}
//                                     >
//                                         Update
//                                     </Button>
//                                     <Button
//                                         variant="danger"
//                                         onClick={() => handleDelete(plan.id)}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6" className="text-center">
//                                 No subscription plans found.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>

//             {/* Create Modal */}
//             <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create Subscription Plan</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group>
//                             <Form.Label>Rate (%)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="rate"
//                                 value={formData.rate}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Duration</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="duration"
//                                 value={formData.duration}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Min Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="minInvest"
//                                 value={formData.minInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Max Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="maxInvest"
//                                 value={formData.maxInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Plan Label</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="label"
//                                 value={formData.label}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="basic">Basic</option>
//                                 <option value="regular">Regular</option>
//                                 <option value="popular">Popular</option>
//                                 {/* Add more options as necessary */}
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Create Plan
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             {/* Update Modal */}
//             <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update Subscription Plan</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         {/* Form fields are identical to the create modal */}
//                         <Form.Group>
//                             <Form.Label>Rate (%)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="rate"
//                                 value={formData.rate}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Duration</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="duration"
//                                 value={formData.duration}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Min Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="minInvest"
//                                 value={formData.minInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Max Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="maxInvest"
//                                 value={formData.maxInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Plan Label</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="label"
//                                 value={formData.label}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="basic">Basic</option>
//                                 <option value="regular">Regular</option>
//                                 <option value="popular">Popular</option>
//                                 {/* Add more options as necessary */}
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Update Plan
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default CreateSubscriptionPlan;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './CreateSubscriptionPlan.css'; // Ensure the styling file exists

// const CreateSubscriptionPlan = () => {
//     const [subscriptions, setSubscriptions] = useState([]);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showUpdateModal, setShowUpdateModal] = useState(false);
//     const [currentPlan, setCurrentPlan] = useState(null);
//     const [formData, setFormData] = useState({
//         rate: '',
//         duration: '',
//         minInvest: '',
//         maxInvest: '',
//         label: 'basic',
//     });

//     // Function to fetch all subscriptions
//     const fetchSubscriptions = async () => {
//         try {
//             const response = await axios.get('http://localhost:3005/api/subscription/allPlans');
//             setSubscriptions(response.data);
//         } catch (error) {
//             console.error('Error fetching subscription plans:', error);
//         }
//     };

//     // Fetch all subscriptions on component mount
//     useEffect(() => {
//         fetchSubscriptions();
//     }, []);

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle submission for creating or updating a plan
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (currentPlan) {
//                 // Update existing plan
//                 await axios.put(`http://localhost:3005/api/subscription/update/${currentPlan.id}`, formData);
//                 Swal.fire('Success', 'Subscription plan updated!', 'success');
//             } else {
//                 // Create new plan
//                 await axios.post('http://localhost:3005/api/subscription/createPlan', formData);
//                 Swal.fire('Success', 'Subscription plan created!', 'success');
//             }
//             setShowCreateModal(false);
//             setShowUpdateModal(false);
//             setCurrentPlan(null);
//             fetchSubscriptions(); // Refresh the subscription list
//         } catch (error) {
//             Swal.fire('Error', 'Failed to save subscription plan', 'error');
//         }
//     };

//     // Open the modal for creating a new plan
//     const handleCreate = () => {
//         setFormData({
//             rate: '',
//             duration: '',
//             minInvest: '',
//             maxInvest: '',
//             label: 'basic',
//         });
//         setShowCreateModal(true);
//     };

//     // Open the modal for updating a subscription plan
//     const handleUpdate = (plan) => {
//         setCurrentPlan(plan);
//         setFormData({
//             rate: plan.rate,
//             duration: plan.duration,
//             minInvest: plan.minInvest,
//             maxInvest: plan.maxInvest,
//             label: plan.label,
//         });
//         setShowUpdateModal(true);
//     };

//     // Delete a subscription plan
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/api/subscription-plans/${id}`);
//             Swal.fire('Success', 'Subscription plan deleted!', 'success');
//             fetchSubscriptions(); // Refresh the subscription list
//         } catch (error) {
//             Swal.fire('Error', 'Failed to delete subscription plan', 'error');
//         }
//     };

//     return (
//         <div className="subscription-plan-container">
//             <h2>Subscription Plans</h2>
//             <Button className="mb-3" onClick={handleCreate}>
//                 Create Subscription Plan
//             </Button>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Label</th>
//                         <th>Rate (%)</th>
//                         <th>Duration</th>
//                         <th>Min Investment</th>
//                         <th>Max Investment</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {subscriptions.map((plan) => (
//                         <tr key={plan.id}>
//                             <td>{plan.label}</td>
//                             <td>{plan.rate}</td>
//                             <td>{plan.duration}</td>
//                             <td>{plan.minInvest}</td>
//                             <td>{plan.maxInvest}</td>
//                             <td>
//                                 <Button
//                                     variant="warning"
//                                     className="mr-2"
//                                     onClick={() => handleUpdate(plan)}
//                                 >
//                                     Update
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     onClick={() => handleDelete(plan.id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Create Modal */}
//             <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create Subscription Plan</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group>
//                             <Form.Label>Rate (%)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="rate"
//                                 value={formData.rate}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Duration</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="duration"
//                                 value={formData.duration}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Min Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="minInvest"
//                                 value={formData.minInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Max Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="maxInvest"
//                                 value={formData.maxInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Plan Label</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="label"
//                                 value={formData.label}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="basic">Basic</option>
//                                 <option value="regular">Regular</option>
//                                 <option value="popular">Popular</option>
//                                 {/* Add more options as necessary */}
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Create Plan
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             {/* Update Modal */}
//             <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update Subscription Plan</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         {/* Form fields are identical to the create modal */}
//                         <Form.Group>
//                             <Form.Label>Rate (%)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="rate"
//                                 value={formData.rate}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Duration</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="duration"
//                                 value={formData.duration}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Min Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="minInvest"
//                                 value={formData.minInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Max Investment</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="maxInvest"
//                                 value={formData.maxInvest}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Plan Label</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="label"
//                                 value={formData.label}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="basic">Basic</option>
//                                 <option value="regular">Regular</option>
//                                 <option value="popular">Popular</option>
//                                 {/* Add more options as necessary */}
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Update Plan
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default CreateSubscriptionPlan;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateSubscriptionPlan.css'; // Ensure this CSS file exists for styling

// const CreateSubscriptionPlan = () => {
//     const [formData, setFormData] = useState({
//         rate: '',
//         duration: '',
//         minInvest: '',
//         maxInvest: '',
//         label: 'basic'
//     });
//     const [message, setMessage] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);

//     // Handle input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send form data to backend for avgMonthly calculation
//             const response = await axios.post('/api/subscription-plans', formData);
//             setMessage(response.data.message);
//             setIsSuccess(true);
//         } catch (error) {
//             setMessage('Failed to create subscription plan: ' + error.response.data.message);
//             setIsSuccess(false);
//         }
//     };

//     return (
//         // <div className="create-plan-container">
//         <div className="create-subscription-plan-container">
//             <h2>Create Subscription Plan</h2>
//             {message && (
//                 <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
//                     {message}
//                 </div>
//             )}
//             <form onSubmit={handleSubmit} className="subscription-form">
//                 <div className="form-group">
//                     <label htmlFor="rate">Rate (%):</label>
//                     <input
//                         type="text"
//                         id="rate"
//                         name="rate"
//                         value={formData.rate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="duration">Duration (e.g., "6 months", "90 days"):</label>
//                     <input
//                         type="text"
//                         id="duration"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="minInvest">Minimum Investment:</label>
//                     <input
//                         type="number"
//                         id="minInvest"
//                         name="minInvest"
//                         value={formData.minInvest}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="maxInvest">Maximum Investment:</label>
//                     <input
//                         type="number"
//                         id="maxInvest"
//                         name="maxInvest"
//                         value={formData.maxInvest}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="label">Plan Label:</label>
//                     <select
//                         id="label"
//                         name="label"
//                         value={formData.label}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="basic">Basic</option>
//                         <option value="regular">Regular</option>
//                         <option value="popular">Popular</option>
//                         <option value="bronze">Bronze</option>
//                         <option value="silver">Silver</option>
//                         <option value="gold">Gold</option>
//                         <option value="platinum">Platinum</option>
//                         <option value="diamond">Diamond</option>
//                         <option value="premium">Premium</option>
//                         <option value="elite">Elite</option>
//                         <option value="ultimate">Ultimate</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Create Plan
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateSubscriptionPlan;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateSubscriptionPlan.css'; // Ensure this CSS file exists for styling

// const CreateSubscriptionPlan = () => {
//     const [formData, setFormData] = useState({
//         rate: '',
//         duration: '',
//         minInvest: '',
//         maxInvest: '',
//         label: 'basic'
//     });
//     const [message, setMessage] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);

//     // Handle input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send form data to backend for avgMonthly calculation
//             const response = await axios.post('http://localhost:3005/api/subscription/createPlan', formData);
//             setMessage(response.data.message);
//             setIsSuccess(true);
//         } catch (error) {
//             setMessage('Failed to create subscription plan: ' + error.response.data.message);
//             setIsSuccess(false);
//         }
//     };

//     return (
//         <div className="create-plan-container">
//             <h2>Create Subscription Plan</h2>
//             {message && (
//                 <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
//                     {message}
//                 </div>
//             )}
//             <form onSubmit={handleSubmit} className="subscription-form">
//                 <div className="form-group">
//                     <label htmlFor="rate">Rate (%):</label>
//                     <input
//                         type="text"
//                         id="rate"
//                         name="rate"
//                         value={formData.rate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="duration">Duration (e.g., "6 months", "90 days"):</label>
//                     <input
//                         type="text"
//                         id="duration"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="minInvest">Minimum Investment:</label>
//                     <input
//                         type="number"
//                         id="minInvest"
//                         name="minInvest"
//                         value={formData.minInvest}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="maxInvest">Maximum Investment:</label>
//                     <input
//                         type="number"
//                         id="maxInvest"
//                         name="maxInvest"
//                         value={formData.maxInvest}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="label">Plan Label:</label>
//                     <select
//                         id="label"
//                         name="label"
//                         value={formData.label}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="basic">Basic</option>
//                         <option value="regular">Regular</option>
//                         <option value="popular">Popular</option>
//                         <option value="bronze">Bronze</option>
//                         <option value="silver">Silver</option>
//                         <option value="gold">Gold</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Create Plan
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateSubscriptionPlan;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateSubscriptionPlan.css'; // Ensure this CSS file exists for styling

// const CreateSubscriptionPlan = () => {
//     const [formData, setFormData] = useState({
//         rate: '',
//         duration: '',
//         minInvest: '',
//         maxInvest: '',
//         avgMonthly: '',
//         label: ''
//     });

//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3005/api/subscription/createPlan', formData);
//             setSuccess('Subscription plan created successfully!');
//             setError('');
//             setFormData({
//                 rate: '',
//                 duration: '',
//                 minInvest: '',
//                 maxInvest: '',
//                 avgMonthly: '',
//                 label: ''
//             });
//         } catch (error) {
//             setError('Failed to create subscription plan.');
//             setSuccess('');
//         }
//     };

//     return (
//         <div className="create-subscription-plan-container">
//             <h2>Create Subscription Plan</h2>
//             {success && <p className="success-message">{success}</p>}
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Rate:
//                     <input
//                         type="text"
//                         name="rate"
//                         value={formData.rate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Duration (months):
//                     <input
//                         type="text"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Minimum Investment:
//                     <input
//                         type="number"
//                         name="minInvest"
//                         value={formData.minInvest}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Maximum Investment:
//                     <input
//                         type="number"
//                         name="maxInvest"
//                         value={formData.maxInvest}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Average Monthly Return:
//                     <input
//                         type="text"
//                         name="avgMonthly"
//                         value={formData.avgMonthly}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Label:
//                     <input
//                         type="text"
//                         name="label"
//                         value={formData.label}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Create Plan</button>
//             </form>
//         </div>
//     );
// };

// export default CreateSubscriptionPlan;
