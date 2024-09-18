import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const ManagePayout = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all payouts
  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3005/api/crypto/payouts/allRequested'); // Replace with actual endpoint
      setPayouts(response.data.data);
      console.log('====================================');
      console.log('payouts:', response);
      console.log('====================================');
      setLoading(false);
    } catch (err) {
      setError('Error fetching payouts');
      setLoading(false);
    }
  };

  // Approve payout
  const approvePayout = async (payoutId) => {
    try {
      const response = await axios.put(`/api/payouts/${payoutId}/approve`);
      if (response.data.success) {
        Swal.fire('Success', response.data.message, 'success');
        fetchPayouts(); // Refresh list after approval
      }
    } catch (err) {
      Swal.fire('Error', 'Unable to approve payout', 'error');
    }
  };

  // Reject payout
  const rejectPayout = async (payoutId) => {
    try {
      const response = await axios.put(`/api/payouts/${payoutId}/reject`);
      if (response.data.success) {
        Swal.fire('Success', response.data.message, 'success');
        fetchPayouts(); // Refresh list after rejection
      }
    } catch (err) {
      Swal.fire('Error', 'Unable to reject payout', 'error');
    }
  };

  // Fetch payouts on component mount
  useEffect(() => {
    fetchPayouts();
  }, []);

  // Render loading spinner
  if (loading) {
    return <div>Loading payouts...</div>;
  }

  // Render error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="mb-4 text-danger">Manage Payouts</h2>
      {payouts.length === 0 ? (
        <p style={{border:'2px solid #f0e00f', backgroundColor:'#000033', color:'#fff'}}>No payouts available.</p>
      ) : (
        <table className="table table-bordered table-hover" style={{border:'2px solid #f0e00f', backgroundColor:'#000033', color:'#000033'}}>
          <thead className="thead-dark" style={{border:'2px solid #f0e00f', backgroundColor:'#000033', color:'#fff'}}>
            <tr style={{border:'2px solid #f0e00f', backgroundColor:'#000033', color:'#fff'}}>
              <th>#</th>
              <th>Payout ID</th>
              <th>Amount</th>
              <th>Currency</th> {/* Added Currency */}
              <th>Date</th> {/* Added Date */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, index) => (
              <tr key={payout.id}>
                <td>{index + 1}</td>
                <td>{payout.id}</td>
                <td>{payout.amount.toLocaleString()}</td> {/* Format amount */}
                <td>{payout.currency}</td> {/* Display currency */}
                <td>{dayjs(payout.date).format('MMM DD, YYYY')}</td> {/* Format and display date */}
                <td>{payout.status}</td>
                <td>
                  {payout.status === 'pending' ? (
                    <>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => approvePayout(payout.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectPayout(payout.id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>{payout.status.toUpperCase()}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagePayout;
