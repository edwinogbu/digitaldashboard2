import React, { useState, useEffect } from "react";
import { Table, Button, Tab, Nav, Container, Row, Col } from "react-bootstrap";
import "./InvestorPayoutHistory.css"; // For custom styling

const InvestorPayoutHistory = () => {
  // State for each section
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [walletInfo, setWalletInfo] = useState({});
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    // Fetch data for each section (dummy data for now)
    setPayoutRequests([
      // Dummy payout request data
      { id: 1, investorName: "John Doe", amount: 500, status: "pending" },
    ]);
    setPayoutHistory([
      // Dummy payout history data
      { id: 1, investorName: "Jane Doe", amount: 200, status: "approved" },
    ]);
    setWalletInfo({ balance: 1500, currency: "USD" }); // Dummy wallet data
    setSubscriptionPlans([
      { planName: "Premium", startDate: "2023-01-01", endDate: "2024-01-01" },
    ]);
    setTransactionHistory([
      { id: 1, amount: 100, type: "credit", date: "2023-07-01" },
    ]);
  }, []);

  // Handle approve/reject payout
  const handlePayoutAction = (id, action) => {
    // Implement payout approval/rejection logic here
    console.log(`Payout ${id} ${action}`);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h1>Investor Payout Management</h1>
        </Col>
      </Row>
      <Tab.Container defaultActiveKey="payoutRequests">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="payoutRequests">Request Payout</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="payoutHistory">Payout History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="approveReject">Approve/Reject Payout</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="walletInfo">Wallet Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="subscriptionPlans">Subscription Plans</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="transactionHistory">Transaction History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {/* Request Payout Section */}
              <Tab.Pane eventKey="payoutRequests">
                <h3>Request Payout</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Investor Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{index + 1}</td>
                        <td>{request.investorName}</td>
                        <td>{request.amount}</td>
                        <td>{request.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* Payout History Section */}
              <Tab.Pane eventKey="payoutHistory">
                <h3>Payout History</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Investor Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutHistory.map((history, index) => (
                      <tr key={history.id}>
                        <td>{index + 1}</td>
                        <td>{history.investorName}</td>
                        <td>{history.amount}</td>
                        <td>{history.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* Approve/Reject Payout Section */}
              <Tab.Pane eventKey="approveReject">
                <h3>Approve/Reject Payout</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Investor Name</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{index + 1}</td>
                        <td>{request.investorName}</td>
                        <td>{request.amount}</td>
                        <td>{request.status}</td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => handlePayoutAction(request.id, "approve")}
                          >
                            Approve
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => handlePayoutAction(request.id, "reject")}
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* Wallet Information Section */}
              <Tab.Pane eventKey="walletInfo">
                <h3>Wallet Information</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Balance</th>
                      <th>Currency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{walletInfo.balance}</td>
                      <td>{walletInfo.currency}</td>
                    </tr>
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* Subscription Plans Section */}
              <Tab.Pane eventKey="subscriptionPlans">
                <h3>Subscription Plans</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Plan Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionPlans.map((plan, index) => (
                      <tr key={index}>
                        <td>{plan.planName}</td>
                        <td>{plan.startDate}</td>
                        <td>{plan.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* Transaction History Section */}
              <Tab.Pane eventKey="transactionHistory">
                <h3>Transaction History</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction, index) => (
                      <tr key={transaction.id}>
                        <td>{index + 1}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default InvestorPayoutHistory;
