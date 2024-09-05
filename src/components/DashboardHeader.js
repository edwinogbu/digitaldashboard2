import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';

const DashboardHeader = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Copied to clipboard!');
    }).catch((err) => {
      message.error('Failed to copy!');
    });
  };

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="row mb-4">
        <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <h1 className="h3 mb-3 mb-md-0 text-gray-800">Dashboard</h1>
          <div className="d-flex flex-column flex-md-row align-items-center">
          <div className="row  align-items-center">
            <div className="mb-3 mb-md-0">
              <h4 className="btn btn-primary btn-sm shadow-sm p-3 mb-0">
                Kindly Use Our Payment Gateway To Make Deposit To Your Wallet:
              </h4>
            </div>
            <br>
            </br>
            <div className="d-flex align-items-center">
              <span className="d-inline-block btn btn-light text-primary shadow-sm p-2 me-2">
                {/* <i className="fas fa-download fa-sm text-primary"></i> uhxc3c6cc9b7bebef2ed88a9febc8c7fe29 */}
              </span>
              <button 
                onClick={() => copyToClipboard("Payment Gateway:uhxc3c6cc9b7bebef2ed88a9febc8c7fe29")} 
                className="btn btn-outline-primary btn-sm shadow-sm"
              >
                <CopyOutlined /> Copy to Clipboard : uhxc3c6cc9b7bebef2ed88a9febc8c7fe29
              </button><CopyOutlined />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;


// import React from 'react';
// import { CopyOutlined } from '@ant-design/icons';
// import { message } from 'antd';

// const DashboardHeader = () => {
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       message.success('Copied to clipboard!');
//     }).catch((err) => {
//       message.error('Failed to copy!');
//     });
//   };

//   return (
//     <div className="container-fluid">
//       {/* Page Heading */}
//       <div className="d-sm-flex align-items-center justify-content-between mb-4">
//         <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
//         <div className="d-flex flex-column flex-sm-row align-items-center">
//           <div className="mb-3 mb-sm-0">
//             <h4 className="btn btn-primary btn-sm shadow-sm p-3 mb-0">
//               Kindly Use Our Payment Gateway To Make Deposit To Your Wallet:
//             </h4>
//           </div>
//           <div className="d-flex align-items-center">
//             <span className="d-inline-block btn btn-light text-primary shadow-sm p-2 me-2">
//               <i className="fas fa-download fa-sm text-primary"></i> uhxc3c6cc9b7bebef2ed88a9febc8c7fe29
//             </span>
//             <button 
//               onClick={() => copyToClipboard("Payment Gateway:uhxc3c6cc9b7bebef2ed88a9febc8c7fe29")} 
//               className="btn btn-outline-primary btn-sm shadow-sm"
//             >
//               <CopyOutlined /> Copy
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;



// import React from 'react';
// import { CopyOutlined } from '@ant-design/icons';
// import { message } from 'antd';

// const DashboardHeader = () => {
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       message.success('Copied to clipboard!');
//     }).catch((err) => {
//       message.error('Failed to copy!');
//     });
//   };

//   return (
//     <div>
//       {/* Page Heading */}
//       <div className="d-sm-flex align-items-center justify-content-between mb-4">
//         <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
//         <div>

//           <h3 className="btn btn-sm btn-primary shadow-sm p-3">
//            Kindly Use Our Payment Gateway To Make Deposit To Your Wallet:
//           </h3>
//           <br>
//           </br>
//           <span className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//             <i className="fas fa-download fa-sm text-white-50"></i> uhxc3c6cc9b7bebef2ed88a9febc8c7fe29
//           </span>
//           <button 
//             onClick={() => copyToClipboard("Payment Gateway:uhxc3c6cc9b7bebef2ed88a9febc8c7fe29")} 
//             className="btn btn-sm btn-secondary shadow-sm ms-2"
//           >
//             <CopyOutlined /> Copy to Clipboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;
