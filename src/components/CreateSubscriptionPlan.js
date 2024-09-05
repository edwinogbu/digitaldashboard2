import React, { useState } from 'react';
import axios from 'axios';
import './CreateSubscriptionPlan.css'; // Ensure this CSS file exists for styling

const CreateSubscriptionPlan = () => {
    const [formData, setFormData] = useState({
        rate: '',
        duration: '',
        minInvest: '',
        maxInvest: '',
        avgMonthly: '',
        label: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/api/subscription/createPlan', formData);
            setSuccess('Subscription plan created successfully!');
            setError('');
            setFormData({
                rate: '',
                duration: '',
                minInvest: '',
                maxInvest: '',
                avgMonthly: '',
                label: ''
            });
        } catch (error) {
            setError('Failed to create subscription plan.');
            setSuccess('');
        }
    };

    return (
        <div className="create-subscription-plan-container">
            <h2>Create Subscription Plan</h2>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Rate:
                    <input
                        type="text"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Duration (months):
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Minimum Investment:
                    <input
                        type="number"
                        name="minInvest"
                        value={formData.minInvest}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Maximum Investment:
                    <input
                        type="number"
                        name="maxInvest"
                        value={formData.maxInvest}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Average Monthly Return:
                    <input
                        type="text"
                        name="avgMonthly"
                        value={formData.avgMonthly}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Label:
                    <input
                        type="text"
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Create Plan</button>
            </form>
        </div>
    );
};

export default CreateSubscriptionPlan;
