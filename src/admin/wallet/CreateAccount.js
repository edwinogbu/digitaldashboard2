import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import './createaccount.css';

export default function CreateAccount({ setWallet, setSeedPhrase }) {

    const [newSeedPhrase, setNewSeedPhrase] = useState(null);
    const navigate = useNavigate();

    function generateWallet() {
        const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
        setNewSeedPhrase(mnemonic);

        Swal.fire({
            title: 'Seed Phrase Generated',
            text: `Your seed phrase is: ${mnemonic}`,
            icon: 'info',
            confirmButtonText: 'Got It'
        });
    }

    function setWalletAndMnemonic() {
        if (!newSeedPhrase) {
            Swal.fire({
                title: 'Error',
                text: 'Please generate a seed phrase first.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            setSeedPhrase(newSeedPhrase);
            setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
            Swal.fire({
                title: 'Wallet Created',
                text: 'Your wallet has been created successfully!',
                icon: 'success',
                confirmButtonText: 'Proceed'
            }).then(() => {
                navigate('/dashboard/yourwallet');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while creating the wallet. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        backgroundColor: isHovered ? '#218838' : '#000033',
        borderColor: isHovered ? '#218838' : '#fff',
        color: '#fff',
        transition: 'background-color 0.3s, border-color 0.3s',
    };

    return (
        <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
            <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
                <h2 className='text-white'>Create Account</h2>
                <div className="table-container text-white">
                    <div className="content" style={{ backgroundColor: '#c0cccc', color: '#fff', textAlign: 'center' }}>
                        <div className="mnemonic d-flex flex-column align-items-center" style={{ backgroundColor: '#000033', color: '#fff', border:'#FFF' }}>
                            <ExclamationCircleOutlined style={{ fontSize: '2rem', color: '#ffcc00', border: '2px solid #ffcc00', padding: '0.5rem', borderRadius: '50%' }} />
                            <div>
                                Generate a new seed phrase for your wallet
                            </div>
                            <Button
                                className="generateSeedPhraseButton"
                                type="primary"
                                onClick={generateWallet}
                            >
                                Generate Seed Phrase
                            </Button>
                            <Card className="seedPhraseContainer" style={{ backgroundColor: '#f1f1fc', borderColor: '#000033', border: '3px solid teal' }}>
                                {newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap', border: '3px solid #fff' }}>{newSeedPhrase}</pre>}
                            </Card>
                            <Button
                                className=" "
                                type="default"
                                onClick={setWalletAndMnemonic}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={buttonStyle}
                            >
                                Open Your New Wallet
                            </Button>
                            <p className="navigateHomeButton" onClick={() => navigate('/dashboard/home')}>Go Home</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



// import React, { useState } from 'react';
// import { Button, Card } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { ethers } from 'ethers';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// import './createaccount.css'

// export default function CreateAccount({setWallet, setSeedPhrase}) {

//     const [newSeedPhrase, setNewSeedPhrase] = useState(null);
//     const navigate = useNavigate();

//     function generateWallet() {
//         const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
//         setNewSeedPhrase(mnemonic);
//     }

//     function setWalletAndMnemonic() {
//       setSeedPhrase(newSeedPhrase);
//       setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
//     }


//     const [isHovered, setIsHovered] = useState(false);

//   const buttonStyle = {
//     backgroundColor: isHovered ? '#218838' : '#000033',
//     borderColor: isHovered ? '#218838' : '#fff',
//     color: '#fff',
//     transition: 'background-color 0.3s, border-color 0.3s',
//   };
    
//     return (
//         // <div className="container py-4" style={{ backgroundColor: '#000033', color: '#fff' }}>
//         //     <div className="row justify-content-center">
//         //         <div className="col-12 text-center">
//         //         <>
//         //     <div className="row justify-content-center d-flex flex-column align-items-center" >
//         //         <div className="mnemonic d-flex flex-column align-items-center" style={{ backgroundColor: '#000033', color: '#fff', border:'#FFF' }}>
//         //             <ExclamationCircleOutlined style={{ fontSize: '2rem', color: '#ffcc00', border: '2px solid #ffcc00', padding: '0.5rem', borderRadius: '50%' }} />

//         //             <div>
//         //                 Type your seed phrase in the field below to recover your wallet
//         //                 (it should include 12 words separated with space)
//         //             </div>
//         //             <Button
//         //                 className="generateSeedPhraseButton"
//         //                 type="primary"
//         //                 onClick={generateWallet}
//         //             >
//         //                 Generate Seed Phrase
//         //             </Button>

//         //             <Card className="seedPhraseContainer" style={{ backgroundColor: '#f1f1fc', borderColor: '#000033', border: '3px solid teal' }}>
//         //                 {newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap', border: '3px solid #fff' }}>{newSeedPhrase}</pre>}
//         //             </Card>
//         //             <Button
//         //                 className=" "
//         //                 type="default"
//         //                 onClick={() => setWalletAndMnemonic()}
//         //                 onMouseEnter={() => setIsHovered(true)}
//         //                 onMouseLeave={() => setIsHovered(false)}
//         //                 style={buttonStyle}
//         //             >
//         //                 Open Your New Wallet
//         //             </Button>
//         //             <p className="navigateHomeButton" onClick={() => navigate('/dashboard/home')}>Go Home</p>
//         //         </div>
//         //     </div>
//         // </>
                   
//         //         </div>
//         //     </div>
//         // </div>

//         <>
//           <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
//             <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

//                 <h2 className='text-white'>Market Data</h2>
//                 <div className="table-container text-white">
//                 <div className="content" style={{ backgroundColor: '#c0cccc', color: '#fff', textAlign: 'center' }}>

//                 <div className="mnemonic d-flex flex-column align-items-center" style={{ backgroundColor: '#000033', color: '#fff', border:'#FFF' }}>
//                     <ExclamationCircleOutlined style={{ fontSize: '2rem', color: '#ffcc00', border: '2px solid #ffcc00', padding: '0.5rem', borderRadius: '50%' }} />

//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                     <Button
//                         className="generateSeedPhraseButton"
//                         type="primary"
//                         onClick={generateWallet}
//                     >
//                         Generate Seed Phrase
//                     </Button>

//                     <Card className="seedPhraseContainer" style={{ backgroundColor: '#f1f1fc', borderColor: '#000033', border: '3px solid teal' }}>
//                         {newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap', border: '3px solid #fff' }}>{newSeedPhrase}</pre>}
//                     </Card>
//                     <Button
//                         className=" "
//                         type="default"
//                         onClick={() => setWalletAndMnemonic()}
//                         onMouseEnter={() => setIsHovered(true)}
//                         onMouseLeave={() => setIsHovered(false)}
//                         style={buttonStyle}
//                     >
//                         Open Your New Wallet
//                     </Button>
//                     <p className="navigateHomeButton" onClick={() => navigate('/dashboard/home')}>Go Home</p>
//                 </div>
//                 </div>
//                 </div>
              
//             </div>
//         </div>
//         </>
//     );
// }




// import React, { useState } from 'react';
// import { Button, Card } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { ethers } from 'ethers';
// import { useNavigate } from 'react-router-dom';
// import './createaccount.css'


// function CreateAccount({setWallet, setSeedPhrase}) {
//     const [newSeedPhrase, setNewSeedPhrase] = useState(null);
//     const navigate = useNavigate();

//     function generateWallet() {
//         const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
//         setNewSeedPhrase(mnemonic);
//     }

//     function setWalletAndMnemonic() {
//       setSeedPhrase(newSeedPhrase);
//       setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
//     }

//     return (
//         <>
//             <div className="content">
//                 <div className="mnemonic">
//                     <ExclamationCircleOutlined style={{ fontSize: '20px' }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                     <Button
//                         className="generateSeedPhraseButton"
//                         type="primary"
//                         onClick={generateWallet}
//                     >
//                         Generate Seed Phrase
//                     </Button>

//                     <Card className="seedPhraseContainer">
//                         {newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap' }}>{newSeedPhrase}</pre>}
//                     </Card>
//                     <Button
//                         className="openWalletButton"
//                         type="default"
//                         onClick={() => setWalletAndMnemonic()}
//                     >
//                         Open Your New Wallet
//                     </Button>
//                     <p className="navigateHomeButton" onClick={() => navigate('/')}>Go Home</p>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CreateAccount;









// import React, { useState } from 'react';
// import { Button, Card } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { ethers } from 'ethers';
// import { useNavigate } from 'react-router-dom';
// import './creataccount.css'


// function creatAccount({setWallet, setSeedPhrase}) {
//     const [newSeedPhrase, setNewSeedPhrase] = useState(null);
//     const navigate = useNavigate();

//     function generateWallet() {
//         const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
//         setNewSeedPhrase(mnemonic);
//     }

//     function setWalletAndMnemonic() {
//       setSeedPhrase(newSeedPhrase);
//       setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
//     }

//     return (
//         <>
//             <div className="content">
//                 <div className="mnemonic">
//                     <ExclamationCircleOutlined style={{ fontSize: '20px' }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                     <Button
//                         className="generateSeedPhraseButton"
//                         type="primary"
//                         onClick={generateWallet}
//                     >
//                         Generate Seed Phrase
//                     </Button>

//                     <Card className="seedPhraseContainer">
//                         {newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap' }}>{newSeedPhrase}</pre>}
//                     </Card>
//                     <Button
//                         className="openWalletButton"
//                         type="default"
//                         onClick={() => setWalletAndMnemonic()}
//                     >
//                         Open Your New Wallet
//                     </Button>
//                     <p className="navigateHomeButton" onClick={() => navigate('/')}>Go Home</p>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default creatAccount;



// import React, { useState } from 'react';
// import { Button, Card } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { ethers } from 'ethers';
// import { useNavigate } from 'react-router-dom';
// import './createAccount.css'


// function CreateAccount() {
//     const [newSeedPhrase, setNewSeedPhrase] = useState(null);
//     const navigate = useNavigate();

//     function generateWallet() {
//         const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
//         setNewSeedPhrase(mnemonic);
//     }

//     return (
//         <>
//             <div className="content">
//                 <div className="mnemonic">
//                     <ExclamationCircleOutlined style={{ fontSize: '20px' }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                     <Button
//                         className="generateSeedPhraseButton"
//                         type="primary"
//                         onClick={generateWallet}
//                     >
//                         Generate Seed Phrase
//                     </Button>

//                     <Card className="seedPhraseContainer">
//                         {newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap' }}>{newSeedPhrase}</pre>}
//                     </Card>
//                     <Button
//                         className="openWalletButton"
//                         type="default"
//                         // onClick={() => setWalletAndMnemonic()}
//                     >
//                         Open Your New Wallet
//                     </Button>
//                     <p className="navigateHomeButton" onClick={() => navigate('/')}>Go Home</p>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CreateAccount;
