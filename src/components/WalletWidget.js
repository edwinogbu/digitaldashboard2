import React from 'react';
import { FaWallet, FaLock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const WalletWidget = ({ lockedFunds, recentDeposits, recentWithdrawals, withdrawalDueDate }) => {
  return (
    <div className="wallet-widget p-3 bg-light rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-primary">Wallet Overview</h5>
        <FaWallet size={24} className="text-primary" />
      </div>

      {lockedFunds > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="text-muted">Locked Funds</div>
          <div className="text-muted d-flex align-items-center">
            <FaLock className="me-2" />
            <strong>${lockedFunds.toFixed(2)}</strong>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="text-muted">Recent Deposits</div>
        <div className="text-muted d-flex align-items-center">
          <FaArrowDown className="me-2 text-success" />
          <strong>${recentDeposits.toFixed(2)}</strong>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted">Recent Withdrawals</div>
        <div className="text-muted d-flex align-items-center">
          <FaArrowUp className="me-2 text-danger" />
          <strong>${recentWithdrawals.toFixed(2)}</strong>
        </div>
      </div>

      <Button variant="primary" size="sm" className="w-100">
        Withdrawal Due Date Left: {withdrawalDueDate} Days to maturity 
      </Button>
    </div>
  );
};

export default WalletWidget;


// import React from 'react';
// import { FaWallet, FaLock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
// import { Button } from 'react-bootstrap';

// const WalletWidget = () => {
//   return (
//     <div className="wallet-widget p-3 bg-light rounded shadow-sm">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0 text-primary">Wallet Overview</h5>
//         <FaWallet size={24} className="text-primary" />
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <div className="text-muted">Locked Funds</div>
//         <div className="text-muted d-flex align-items-center">
//           <FaLock className="me-2" />
//           <strong>$1,250.00</strong>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <div className="text-muted">Recent Deposits</div>
//         <div className="text-muted d-flex align-items-center">
//           <FaArrowDown className="me-2 text-success" />
//           <strong>$500.00</strong>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="text-muted">Recent Withdrawals</div>
//         <div className="text-muted d-flex align-items-center">
//           <FaArrowUp className="me-2 text-danger" />
//           <strong>$200.00</strong>
//         </div>
//       </div>

//       <Button variant="primary" size="sm" className="w-100">
//         Withdrawal Due Date Left: 7 Days to maturity 
//       </Button>
//     </div>
//   );
// };

// export default WalletWidget;
