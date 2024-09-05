import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Image, Modal, Form } from 'react-bootstrap';


const DepositAndWithdrawal = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleShowDeposit = () => setShowDepositModal(true);
  const handleCloseDeposit = () => setShowDepositModal(false);

  const handleShowWithdraw = () => setShowWithdrawModal(true);
  const handleCloseWithdraw = () => setShowWithdrawModal(false);

  return (
    <Container fluid className="main-content px-2 px-lg-4">
      <Row className="my-2 g-3 g-lg-4">
        <Col md={6} lg={5} xxl={4}>
          <div className="wallet-balance">
            <div className="left-wrapper">
              <div className="left">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Image src="./assets/img/crypto/bitcoin.png" alt="" />
                  <span className="font-weight-bold">Bitcoin</span>
                </div>
                <span>Total Balance</span>
                <h2 className="text-white mt-2">0.3475948</h2>
                <span className="text-primary">11,032.24 USD</span>
                <div className="d-flex gap-3 pt-4">
                  <Button variant="primary" size="lg" onClick={handleShowWithdraw}>Withdraw</Button>
                  <Button variant="outline-primary" size="lg" onClick={handleShowDeposit}>Deposit</Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={7} xxl={7}>
          <div className="right">
            <div className="py-3">
              <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex flex-column">
                  <span>Exchange Balance</span>
                  <span className="font-weight-bold text-white h4 my-1">0.397466349</span>
                  <span className="text-primary">4,897.94 USD</span>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <Image src="./assets/img/chart_green_3.png" alt="" />
                  <span className="font-weight-bold small text-white mt-2">+3.89%</span>
                </div>
              </div>
              <div className="green-bar mt-2">
                <div className="inner"></div>
              </div>
            </div>
            <div className="py-3">
              <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex flex-column">
                  <span>Exchange Balance</span>
                  <span className="font-weight-bold text-white h4 my-1">0.397466349</span>
                  <span className="text-primary">4,897.94 USD</span>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <Image src="./assets/img/chart_red_3.png" alt="" />
                  <span className="font-weight-bold small text-white mt-2">+3.89%</span>
                </div>
              </div>
              <div className="red-bar mt-2">
                <div className="inner"></div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="my-2 g-3 gx-lg-4 pb-3">
        <Col xs={12}>
          <div className="mainchart px-3 px-md-4 py-3 py-lg-4">
            <div className="d-flex justify-content-between flex-wrap gap-4">
              <h5 className="mb-0">Today's Cryptocurrency Prices</h5>
            </div>
            <div className="pb-2 pt-3 price-table">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th className="font-weight-bold">Asset</th>
                    <th className="font-weight-bold">On Orders</th>
                    <th className="font-weight-bold">Available Balance</th>
                    <th className="font-weight-bold">Total Balances</th>
                    <th className="font-weight-bold">24H Market</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/bitcoin.png" alt="" />
                      Bitcoin (BTC)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/binance.png" alt="" />
                      Binance (BNB)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/dash.png" alt="" />
                      Dashcoin (DTC)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-secondary">-0.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/digibyte.png" alt="" />
                      Digibyte (DGB)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/dogecoin.png" alt="" />
                      Dogecoin (DOGE)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/ellaism.png" alt="" />
                      Ellasiam (ELLA)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-secondary">-1.53%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/etherium.png" alt="" />
                      Ethereum (ETH)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-secondary">-0.45%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/monero.png" alt="" />
                      Monero (MNR)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/tron.png" alt="" />
                      Troncoin (TRN)
                    </td>
                    <td>$377,600</td>
                    <td>$303,780</td>
                    <td>$112,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                  <tr>
                    <td className="d-flex align-items-center gap-2">
                      <Image src="./assets/img/crypto/tether.png" alt="" />
                      Tether (USDT)
                    </td>
                    <td>$326,600</td>
                    <td>$303,800</td>
                    <td>$880,423</td>
                    <td className="text-primary">+2.33%</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      {/* Deposit Modal */}
      <Modal show={showDepositModal} onHide={handleCloseDeposit}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Funds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Form.Group controlId="formCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control as="select">
                <option>Bitcoin (BTC)</option>
                <option>Ethereum (ETH)</option>
                <option>Litecoin (LTC)</option>
                <option>Dogecoin (DOGE)</option>
                {/* Add more currencies as needed */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formInvestmentPlan">
              <Form.Label>Investment Plan</Form.Label>
              <Form.Control as="select">
                <option>Short-Term</option>
                <option>Medium-Term</option>
                <option>Long-Term</option>
                {/* Add more plans as needed */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProofOfPayment">
              <Form.Label>Proof of Payment</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeposit}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>

      {/* Withdraw Modal */}
      <Modal show={showWithdrawModal} onHide={handleCloseWithdraw}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw Funds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmountWithdraw">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Form.Group controlId="formCurrencyWithdraw">
              <Form.Label>Currency</Form.Label>
              <Form.Control as="select">
                <option>Bitcoin (BTC)</option>
                <option>Ethereum (ETH)</option>
                <option>Litecoin (LTC)</option>
                <option>Dogecoin (DOGE)</option>
                {/* Add more currencies as needed */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formWithdrawalAddress">
              <Form.Label>Withdrawal Address</Form.Label>
              <Form.Control type="text" placeholder="Enter withdrawal address" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWithdraw}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DepositAndWithdrawal;
