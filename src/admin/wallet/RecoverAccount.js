import React, { useState } from 'react';
import { ethers } from 'ethers';
import { BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import Swal from 'sweetalert2';

import "./recoveraccount.css"; 

const { TextArea } = Input;

export default function RecoverAccount({ setWallet, setSeedPhrase }) {
    const navigate = useNavigate();
    const [typedSeed, setTypedSeed] = useState("");
    const [nonValid, setNonValid] = useState(false);

    function seedAdjust(e) {
        setNonValid(false);
        setTypedSeed(e.target.value);
    }

    async function recoverWallet() {
        let recoveredWallet;
        try {
            recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
        } catch (error) {
            setNonValid(true);
            Swal.fire({
                title: 'Error',
                text: 'Invalid seed phrase. Please make sure it contains 12 words separated by spaces.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            return;
        }

        setSeedPhrase(typedSeed);
        setWallet(recoveredWallet.address);

        await Swal.fire({
            title: 'Success',
            text: 'Wallet recovered successfully!',
            icon: 'success',
            confirmButtonText: 'Proceed'
        });

        navigate('/dashboard/yourwallet');
    }

    return (
        <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
            <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
                <h2 className='text-white'  style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>Recover Account</h2>
                <div className="table-container text-white"  style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
                    <div className="content" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
                        <div className="mnemonic">
                            <BulbOutlined style={{ fontSize: "20px", backgroundColor: '#000033', color: '#fff', textAlign: 'center'  }} />
                            <div>
                                Type your seed phrase in the field below to recover your wallet
                                (it should include 12 words separated with space)
                            </div>
                            <TextArea
                                value={typedSeed}
                                onChange={seedAdjust}
                                rows={4}
                                className="seedPhraseContainer"
                                placeholder="Type your seed phrase here..."
                            />
                            <Button
                                disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "}
                                className="generateSeedPhraseButton"
                                type="primary"
                                onClick={recoverWallet}
                            >
                                Recover Wallet
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
// import { ethers } from 'ethers';
// import { BulbOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { Button, Input } from 'antd';
// import Swal from 'sweetalert2';

// import "./recoveraccount.css"; 

// const { TextArea } = Input;


// export default function RecoverAccount({ setWallet, setSeedPhrase }) {
//     const navigate = useNavigate();
//     const [typedSeed, setTypedSeed] = useState("");
//     const [nonValid, setNonValid] = useState(false);

//     function seedAdjust(e) {
//         setNonValid(false);
//         setTypedSeed(e.target.value);
//     }

//     function recoverWallet() {
//         let recoveredWallet;
//         try {
//             recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
//         } catch (error) {
//             setNonValid(true);
//             return;
//         }

//         setSeedPhrase(typedSeed);
//         setWallet(recoveredWallet.address);
//         navigate('/dashboard/yourwallet');
//     }

//     return (
   
        
//               <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
//                 <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

//                     <h2 className='text-white'>Recover Account</h2>
//                     <div className="table-container text-white">
//                         <>
//                         <div className="content" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
//                 <div className="mnemonic">
//                     <BulbOutlined style={{ fontSize: "20px" }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                 <TextArea
//                     value={typedSeed}
//                     onChange={seedAdjust}
//                     rows={4}
//                     className="seedPhraseContainer"
//                     placeholder="Type your seed phrase here..."
//                 />
//                 <Button
//                     disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "}
//                     className="generateSeedPhraseButton"
//                     type="primary"
//                     onClick={recoverWallet}
//                 >
//                     Recover Wallet
//                 </Button>
//                 <p className="navigateHomeButton" onClick={() => navigate('/dashboard/home')}>Go Home</p>
//             {/* </div> */}
//             </div>
//                         </div>
//         </>
//                     </div>
//                 </div>
//              </div>
          
//     );
// }



// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { BulbOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { Button, Input } from 'antd';
// import "./recoveraccount.css"; // Import CSS file here

// const { TextArea } = Input;

// function RecoverAccount({ setWallet, setSeedPhrase }) {
//     const navigate = useNavigate();
//     const [typedSeed, setTypedSeed] = useState("");
//     const [nonValid, setNonValid] = useState(false);

//     function seedAdjust(e) {
//         setNonValid(false);
//         setTypedSeed(e.target.value);
//     }

//     function recoverWallet() {
//         let recoveredWallet;
//         try {
//             recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
//         } catch (error) {
//             setNonValid(true);
//             return;
//         }

//         setSeedPhrase(typedSeed);
//         setWallet(recoveredWallet.address);
//         navigate('/yourwallet');
//     }

//     return (
//         <>
//             <div className="content">
//                 <div className="mnemonic">
//                     <BulbOutlined style={{ fontSize: "20px" }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                 {/* </div> */}
//                 <TextArea
//                     value={typedSeed}
//                     onChange={seedAdjust}
//                     rows={4}
//                     className="seedPhraseContainer"
//                     placeholder="Type your seed phrase here..."
//                 />
//                 <Button
//                     disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "}
//                     className="generateSeedPhraseButton"
//                     type="primary"
//                     onClick={recoverWallet}
//                 >
//                     Recover Wallet
//                 </Button>
//                 <p className="navigateHomeButton" onClick={() => navigate('/')}>Go Home</p>
//             </div>
//             </div>
//         </>
//     );
// }

// export default RecoverAccount;


// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { BulbOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { Button, Input } from 'antd';
// import "./recoveraccount.css"
// const { TextArea } = Input;

// function RecoverAccount({ setWallet, setSeedPhrase }) {
//     const navigate = useNavigate();
//     const [typedSeed, setTypedSeed] = useState("");
//    const [nonValid, setNonValid] = useState(false);

//     function seedAdjust(e) {
//       setNonValid(false);
//         setTypedSeed(e.target.value);
//     }

//     function recoverWallet() {
//       let recoveredWallet;
//         try {
//             const recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
            
//         } catch (error) {
//             // console.error("Invalid seed phrase", error);
//             setNonValid(true);
//             return;
//         }

//         setSeedPhrase(typedSeed);
//         setWallet(recoveredWallet.address);
//         navigate('/yourwallet');
//     }

//     return (
//         <>
//             <div className="content">
//                 <div className="mnemonic">
//                     <BulbOutlined style={{ fontSize: "20px" }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                 </div>
//                 <TextArea
//                     value={typedSeed}
//                     onChange={seedAdjust}
//                     rows={4}
//                     className="seedPhraseContainer"
//                     placeholder="Type your seed phrase here..."
//                 />
//                 <Button
//                     disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "}
//                     className="generateSeedPhraseButton"
//                     type="primary"
//                     onClick={recoverWallet}
//                 >
//                     Recover Wallet
//                 </Button>
//                 <p className="navigateHomeButton" onClick={() => navigate('/')}>Go Home</p>
//             </div>
//         </>
//     );
// }

// export default RecoverAccount;


// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { BulbOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { Button, Input } from 'antd';
// import './recoverAccount.css'

// const { TextArea } = Input;

// function RecoverAccount({ setWallet, setSeedPhrase }) {
//     const navigate = useNavigate();
//     const [typedSeed, setTypedSeed] = useState("");

//     function seedAdjust(e) {
//         setTypedSeed(e.target.value);
//     }

//     function recoverWallet() {
//         try {
//             const wallet = ethers.Wallet.fromMnemonic(typedSeed.trim());
//             setWallet(wallet);
//             setSeedPhrase(typedSeed);
//             navigate('/your-wallet-path');  // replace with the correct path
//         } catch (error) {
//             console.error("Invalid seed phrase", error);
//         }
//     }

//     return (
//         <>
//             <div className="content">
//                 <div className="mnemonic">
//                     <BulbOutlined style={{ fontSize: "20px" }} />
//                     <div>
//                         Type your seed phrase in the field below to recover your wallet
//                         (it should include 12 words separated with space)
//                     </div>
//                 </div>
//                 <TextArea
//                     value={typedSeed}
//                     onChange={seedAdjust}
//                     rows={4}
//                     className="seedPhraseContainer"
//                     placeholder="Type your seed phrase here..."
//                 />
//                 <Button
//                     disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "}
//                     className="generateSeedPhraseButton"
//                     type="primary"
//                     onClick={recoverWallet}
//                 >
//                     Recover Wallet
//                 </Button>
//                 <p className="navigateHomeButton" onClick={() => navigate('/')}>Go Home</p>
//             </div>
//         </>
//     );
// }

// export default RecoverAccount;


// import React,{useState} from 'react';
// import { ethers } from "ethers";
// import {BulbOutlined} from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import {Button, Input} from "antd";

// const {TextArea} = Input;

// function RecoverAccount(setWallet, setSeedPhrase) {

//     const navigate = useNavigate();
//     const [typedSeed, setTypedSeed] = useState("");

//     function seedAdjust(e){
//         setTypedSeed(e.target.value);
//     }


//   return (
//     <>
//     <div className="content">
//     <div className="mnemonic">
//       <BulbOutlined style={{fontSize:"20px"}} />
//       <div>
//           Type your seed phrass in the field below to recover your wallet 
//           (it should include 12 words seperated with space)
//       </div>
//     </div>
//     <TextArea 
//       value ={typedSeed}
//       onChange ={seedAdjust}
//       rows={4}
//       className = "seedPhraseContainer"
//       placeholder="Type your seed phrass here....."
//     />
//     <Button
//     disabled={
//       typedSeed.split(" ").length !==12 || typedSeed.slice(-1) ===""

//     } 
//       className = "generateseedPhraseButton"
//       type="primary"
//     //   onClick = {()=>recoverWallet()}
//     />
//    <p className="generateseedPhraseButton" onClick= {() => navigate('/')}></p>

//     </div>
//   </>
//   )
// }

// export default RecoverAccount
