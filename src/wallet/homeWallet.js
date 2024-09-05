import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './homewallet.css'; 

export default function HomeWallet() {

        const navigate = useNavigate();
    
    return (
        
        // <div className="content">
        //     <div className="row">
        //         <div className="col-sm-12 mb-5" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center', }}>
        //         <>
        //             <div className="content" style={{ backgroundColor: '#300033', color: '#fff', textAlign: 'center' }}>
        //                 <div className="mnemonic">
        //                     <img src='../assets/images/golden-coin.jpg' alt='wallet Home'
        //                      style={{ width: "400px",  textAlign: "center",  fontWeight: "bold"  }}
        //                     />
        //                     <div>
        //                         <h2>
        //                         Welcome To Digital PayOut Wallet Login
        //                         </h2>
        //                     </div>
        //                     <Button
        //                         className="generateSeedPhraseButton"
        //                         type="primary"
        //                         onClick={() => navigate("/dashboard/yourwallet")}
        //                     >
        //                         Create A Wallet
        //                     </Button>

                        
        //                     <Button
        //                         className="openWalletButton"
        //                         type="default"
        //                         onClick={() => navigate("/dashboard/recover")}
        //                     >
        //                     Sign In With Seed Phrase
        //                     </Button>
        //                     {/* <p className="navigateHomeButton" onClick={() => navigate('/dashboard/home')}>
        //                         Find Alt Coin Gems:{" "}
        //                         <a href="https://moralismoney.com/" target="_blank" rel="noopener noreferrer">
        //                         moralis money
        //                         </a>
        //                     </p> */}
        //                 </div>
        //             </div>
        //         </>
                   
        //         </div>
        //     </div>
        // </div>

        <>
           <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
            <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

                <h2 className='text-white text-center' style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}> Welcome To Digital PayOut Wallet Login</h2>
                <div className="table-container text-white">
                <div className="content" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
                        <div className="mnemonic">
                            <img src='../assets/images/golden-coin.jpg' alt='wallet Home'
                             style={{ width: "400px",  textAlign: "center",  fontWeight: "bold"  }}
                            />
                            <div>
                                <h2 style={{backgroundColor:'#f0f0ff', borderRadius:10, padding:1, color:'#000033'}}>
                                       Wallet Login
                                </h2>
                            </div>
                            <Button
                                className="generateSeedPhraseButton"
                                type="primary"
                                onClick={() => navigate("/dashboard/yourwallet")}
                            >
                                Create A Wallet
                            </Button>

                        
                            <Button
                                className="openWalletButton"
                                type="default"
                                onClick={() => navigate("/dashboard/recover")}
                            >
                            Sign In With Seed Phrase
                            </Button>
                            {/* <p className="navigateHomeButton" onClick={() => navigate('/dashboard/home')}>
                                Find Alt Coin Gems:{" "}
                                <a href="https://moralismoney.com/" target="_blank" rel="noopener noreferrer">
                                moralis money
                                </a>
                            </p> */}
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
        </>
    );
}



// import React from 'react';
// import { Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import './homewallet.css'; 

// export default function HomeWallet() {
//     const currentYear = new Date().getFullYear();
//         const navigate = useNavigate();
    
//     return (
    
//         <div className="container wrapper" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
//             <div className="row justify-content-center">
//                 <div className="col-12">
//                     <img src="../assets/images/golden-coin.jpg" alt="wallet Home"
//                         style={{ width: "400px", marginBottom: "20px" }}
//                     />
//                     <h2>Welcome To Digital PayOut Wallet Login</h2>
//                     <button
//                         className="btn btn-success m-2"
//                         onClick={() => navigate("/dashboard/yourwallet")}
//                     >
//                         Create A Wallet
//                     </button>
                    
//                     <button
//                         className="btn btn-secondary m-2"
//                         onClick={() => navigate("/dashboard/recover")}
//                     >
//                         Sign In With Seed Phrase
//                     </button>
//                     {/* <p className="mt-3">
//                         Find Alt Coin Gems:{" "}
//                         <a href="https://moralismoney.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
//                             moralis money
//                         </a>
//                     </p> */}
//                 </div>
//             </div>
//         </div>


//     );
// }




