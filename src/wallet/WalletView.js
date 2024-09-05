import React, { useState, useEffect } from 'react';
import { Card, Button, Tooltip, Divider, Tabs, List, Avatar, Spin, Input, message } from 'antd';
import { ethers, JsonRpcProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, CopyOutlined } from '@ant-design/icons';
import axios from 'axios';
import { CHAINS_CONFIG } from './chains';
import './walletView.css';
import '../CryptoConverter.css';

function WalletView({ wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain }) {
    const navigate = useNavigate();

    const [tokens, setTokens] = useState(null);
    const [nfts, setNfts] = useState(null);
    const [balance, setBalance] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [amountToSend, setAmountToSend] = useState(null);
    const [sendToAddress, setSendToAddress] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [hash, setHash] = useState(null);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('Copied to clipboard!');
        }).catch((err) => {
            message.error('Failed to copy!');
        });
    };

    const items = [
        {
            key: "3",
            label: "Tokens",
            children: (
                <>
                    {tokens ? (
                        <List
                            bordered
                            itemLayout="horizontal"
                            dataSource={tokens}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.logo || ''} />}
                                        title={item.symbol}
                                        description={item.name}
                                    />
                                    <div>
                                        {(Number(item.balance) / 10 ** Number(item.decimals)).toFixed(2)} Tokens
                                    </div>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <span>You seem not to have any tokens</span>
                    )}
                </>
            ),
        },
        {
            key: "2",
            label: "NFTs",
            children: (
                <>
                    {nfts ? (
                        nfts.map((e, i) => (
                            <img
                                key={i}
                                className="nftImage"
                                alt="nftImage"
                                src={e}
                            />
                        ))
                    ) : null}
                </>
            ),
        },
        {   
            
            key: "1",
            label: "Transfer",
            children: (
                <>
                    <h3>Native Balance</h3>
                    <h1>{balance.toFixed(2)} {CHAINS_CONFIG[selectedChain]?.ticker}</h1>
                    <div className="sendRow">
                        <p style={{ width: "90px", textAlign: "left" }}>To: </p>
                        <Input
                            value={sendToAddress}
                            onChange={(e) => setSendToAddress(e.target.value)}
                            placeholder="0x..."
                        />
                    </div>
                    <div className="sendRow">
                        <p style={{ width: "90px", textAlign: "left" }}>Amount: </p>
                        <Input
                            value={amountToSend}
                            onChange={(e) => setAmountToSend(e.target.value)}
                            placeholder="Native tokens you wish to send..."
                        />
                    </div>
                    <Button
                        style={{ width: "100%", marginTop: "20px" }}
                        type="primary"
                        onClick={() => sendTransaction(sendToAddress, amountToSend)}
                    >
                        Send Tokens
                    </Button>
                    {processing && (
                        <>
                            <Spin />
                            {hash && (
                                <Tooltip title={hash}>
                                    <p>Hover for Tx Hash</p>
                                </Tooltip>
                            )}
                        </>
                    )}
                </>
            ),
        },
    ];

    async function sendTransaction(to, amount) {
        if (!to || !amount) {
            console.error("Recipient address or amount is null or undefined");
            return;
        }

        const chains = CHAINS_CONFIG[selectedChain];
        const provider = new JsonRpcProvider(chains.rpcUrl);
        const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;
        const wallet = new ethers.Wallet(privateKey, provider);

        const tx = {
            to: to,
            value: ethers.parseUnits(amount.toString(), "ether"),
        };

        setProcessing(true);
        try {
            const transaction = await wallet.sendTransaction(tx);
            setHash(transaction.hash);
            const receipt = await transaction.wait();

            setHash(null);
            setProcessing(false);
            setAmountToSend(null);
            setSendToAddress(null);

            if (receipt.status === 1) {
                getAccountTokens();
            } else {
                console.log('Transaction failed');
            }
        } catch (error) {
            console.error("Error sending transaction:", error);
            setHash(null);
            setProcessing(false);
            setAmountToSend(null);
            setSendToAddress(null);
        }
    }

    async function getAccountTokens() {
        setFetching(true);
        // const baseURL: 'https://digitalspayout.com/api/auth',

        const res = await axios.get(`https://digitalspayout.com/api/auth/getTokens`, {
            params: {
                userAddress: wallet,
                chain: selectedChain,
            },
        });
        const response = res.data;

        if (response.tokens.length > 0) {
            setTokens(response.tokens);
        }

        if (response.nfts.length > 0) {
            setNfts(response.nfts);
        }

        setBalance(response.balance);
        setFetching(false);
    }

    function handleLogout() {
        setWallet(null);
        setSeedPhrase(null);
        setNfts(null);
        setTokens(null);
        setBalance(0);
        navigate('/dashboard/home');
    }

    useEffect(() => {
        if (!wallet || !selectedChain) return;
        setNfts(null);
        setTokens(null);
        setBalance(0);
        getAccountTokens();
    }, []);

    useEffect(() => {
        if (!wallet) return;
        setNfts(null);
        setTokens(null);
        setBalance(0);
        getAccountTokens();
    }, [selectedChain]);

    return (
         <div className="container-fluid main-content px-2 px-lg-1 col-10 pt-1 mt-5" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>
         <div className="market-data px-2 px-lg-4 col-12" style={{backgroundColor:'#000033', borderRadius:10, padding:1, color:'#fff'}}>

             {/* <h2 className='text-white text-center'>Wallet</h2> */}
             <div className="table-container text-white">
             <div className="content" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
                <div className="col-sm-8 container text-white" style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}>
                    <div className="wallet-view col-sm-12 container ">
                        <div className="row  ">
                            <div className="wallet-view col-sm-12 " style={{ backgroundColor: '#f0f0f0', color: '#fff', textAlign: 'center' }}>
                                <div className="logoutButton" onClick={handleLogout}>
                                    <LogoutOutlined />
                                </div>
                                <div className='walletName text-white'>wallet</div>
                                <div className="walletAddress">
                                <div className="sendRow" style={{ display: "flex", textAlign: "center",  padding:10, marginRight:20,  color:'#000033' }}>
                                <p style={{ width: "90px", textAlign: "left",  fontWeight: "bold", color:'#000033'  }}>Address: </p>
                                
                                    <Tooltip title={wallet}>
                                        <div>{wallet.slice(0, 24)}...{wallet.slice(-4)}</div>
                                    </Tooltip>
                                    <CopyOutlined
                                        className="copyIcon"
                                        onClick={() => copyToClipboard(wallet)}
                                    />
                            </div>
                                </div>
                                <Divider />
                                {fetching ? (
                                    <Spin />
                                ) : (
                                    <Tabs defaultActiveKey='1' items={items} className='walletView'  style={{ backgroundColor: '#000033', color: '#fff', textAlign: 'center' }}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             </div>
           
         </div>
     </div>
    );
}

export default WalletView;


// import React, { useState, useEffect } from 'react';
// import { Card, Button, Tooltip, Divider, Tabs, List, Avatar, Spin, Input } from 'antd';
// import { ethers, JsonRpcProvider } from 'ethers';
// import { useNavigate } from 'react-router-dom';
// import { LogoutOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { CHAINS_CONFIG } from './chains';
// import './walletView.css';
// import '../CryptoConverter.css';

// function WalletView({ wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain }) {
//     const navigate = useNavigate();

//     const [tokens, setTokens] = useState(null);
//     const [nfts, setNfts] = useState(null);
//     const [balance, setBalance] = useState(0);
//     const [fetching, setFetching] = useState(true);
//     const [amountToSend, setAmountToSend] = useState(null);
//     const [sendToAddress, setSendToAddress] = useState(null);
//     const [processing, setProcessing] = useState(false);
//     const [hash, setHash] = useState(null);

   

//     const items = [
//         {
//             key: "3",
//             label: "Tokens",
//             children: (
//                 <>
//                     {tokens ? (
//                         <List
//                             bordered
//                             itemLayout="horizontal"
//                             dataSource={tokens}
//                             renderItem={(item) => (
//                                 <List.Item>
//                                     <List.Item.Meta
//                                         avatar={<Avatar src={item.logo || ''} />}
//                                         title={item.symbol}
//                                         description={item.name}
//                                     />
//                                     <div>
//                                         {(Number(item.balance) / 10 ** Number(item.decimals)).toFixed(2)} Tokens
//                                     </div>
//                                 </List.Item>
//                             )}
//                         />
//                     ) : (
//                         <span>You seem not to have any tokens</span>
//                     )}
//                 </>
//             ),
//         },
//         {
//             key: "2",
//             label: "NFTs",
//             children: (
//                 <>
//                     {nfts ? (
//                         nfts.map((e, i) => (
//                             <img
//                                 key={i}
//                                 className="nftImage"
//                                 alt="nftImage"
//                                 src={e}
//                             />
//                         ))
//                     ) : null}
//                 </>
//             ),
//         },
//         {
//             key: "1",
//             label: "Transfer",
//             children: (
//                 <>
//                     <h3>Native Balance</h3>
//                     <h1>{balance.toFixed(2)} {CHAINS_CONFIG[selectedChain]?.ticker}</h1>
//                     <div className="sendRow">
//                         <p style={{ width: "90px", textAlign: "left" }}>To: </p>
//                         <Input
//                             value={sendToAddress}
//                             onChange={(e) => setSendToAddress(e.target.value)}
//                             placeholder="0x..."
//                         />
//                     </div>
//                     <div className="sendRow">
//                         <p style={{ width: "90px", textAlign: "left" }}>Amount: </p>
//                         <Input
//                             value={amountToSend}
//                             onChange={(e) => setAmountToSend(e.target.value)}
//                             placeholder="Native tokens you wish to send..."
//                         />
//                     </div>
//                     <Button
//                         style={{ width: "100%", marginTop: "20px" }}
//                         type="primary"
//                         onClick={() => sendTransaction(sendToAddress, amountToSend)}
//                     >
//                         Send Tokens
//                     </Button>
//                     {processing && (
//                         <>
//                             <Spin />
//                             {hash && (
//                                 <Tooltip title={hash}>
//                                     <p>Hover for Tx Hash</p>
//                                 </Tooltip>
//                             )}
//                         </>
//                     )}
//                 </>
//             ),
//         },
//     ];

//     async function sendTransaction(to, amount) {
//         if (!to || !amount) {
//             console.error("Recipient address or amount is null or undefined");
//             return;
//         }

//         const chains = CHAINS_CONFIG[selectedChain];
//         const provider = new JsonRpcProvider(chains.rpcUrl);
//         const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;
//         const wallet = new ethers.Wallet(privateKey, provider);

//         const tx = {
//             to: to,
//             value: ethers.parseUnits(amount.toString(), "ether"),
//         };

//         setProcessing(true);
//         try {
//             const transaction = await wallet.sendTransaction(tx);
//             setHash(transaction.hash);
//             const receipt = await transaction.wait();

//             setHash(null);
//             setProcessing(false);
//             setAmountToSend(null);
//             setSendToAddress(null);

//             if (receipt.status === 1) {
//                 getAccountTokens();
//             } else {
//                 console.log('Transaction failed');
//             }
//         } catch (error) {
//             console.error("Error sending transaction:", error);
//             setHash(null);
//             setProcessing(false);
//             setAmountToSend(null);
//             setSendToAddress(null);
//         }
//     }

//     async function getAccountTokens() {
//         setFetching(true);

//         const res = await axios.get(`http://localhost:3005/getTokens`, {
//             params: {
//                 userAddress: wallet,
//                 chain: selectedChain,
//             },
//         });
//         const response = res.data;

//         if (response.tokens.length > 0) {
//             setTokens(response.tokens);
//         }

//         if (response.nfts.length > 0) {
//             setNfts(response.nfts);
//         }

//         setBalance(response.balance);
//         setFetching(false);
//     }

//     function handleLogout() {
//         setWallet(null);
//         setSeedPhrase(null);
//         setNfts(null);
//         setTokens(null);
//         setBalance(0);
//         navigate('/dashboard/home');
//     }

//     useEffect(() => {
//         if (!wallet || !selectedChain) return;
//         setNfts(null);
//         setTokens(null);
//         setBalance(0);
//         getAccountTokens();
//     }, []);

//     useEffect(() => {
//         if (!wallet) return;
//         setNfts(null);
//         setTokens(null);
//         setBalance(0);
//         getAccountTokens();
//     }, [selectedChain]);

//     return (
//         <div className="col-sm-8 container ">
//          <div className="wallet-view col-sm-12 container ">
//             <div className="row  ">
//                 <div className="wallet-view col-sm-12 ">
//                 <div className="logoutButton" onClick={handleLogout}>
//                     <LogoutOutlined />
//                 </div>
//                 <div className='walletName'>wallet</div>
//                 <Tooltip title={wallet}>
//                     <div>{wallet.slice(0, 6)}...{wallet.slice(-4)}</div>
//                 </Tooltip>
//                 <Divider />
//                 {fetching ? (
//                     <Spin />
//                 ) : (
//                     <Tabs defaultActiveKey='1' items={items} className='walletView' />
//                 )}
//                 </div>
//             </div>
//           </div>
//         </div>
//     );
// }

// export default WalletView;


// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'antd';
// import { ethers, JsonRpcProvider } from 'ethers';
// import { useNavigate } from 'react-router-dom';

// function WalletView({ wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain }) {
//     const [balance, setBalance] = useState(null);
//     const navigate = useNavigate();

//     const ntfs = [
//         "https://ntfs-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xd774557b647330c91bf44cfeab205095f7e6c367/0xfb76"
//     ];

//     useEffect(() => {
//         async function fetchBalance() {
//             if (wallet && selectedChain) {
//                 const provider = new JsonRpcProvider(selectedChain.rpcUrl);
//                 const balance = await provider.getBalance(wallet.address);
//                 setBalance(ethers.formatEther(balance));
//             }
//         }
//         fetchBalance();
//     }, [wallet, selectedChain]);

//     function handleLogout() {
//         setWallet(null);
//         setSeedPhrase(null);
//         navigate('/');
//     }

//     return (
//         <div className="wallet-view">
//             <Card className="wallet-card">
//                 <h2>Wallet Address</h2>
//                 <p>{wallet?.address}</p>
//                 <h2>Seed Phrase</h2>
//                 <p>{seedPhrase}</p>
//                 <h2>Balance</h2>
//                 <p>{balance !== null ? `${balance} ETH` : 'Loading...'}</p>
//                 <h2>NFTs</h2>
//                 <div className="nft-container">
//                     {ntfs && ntfs.length > 0 ? (
//                         ntfs.map((url, index) => (
//                             <img key={index} src={url} alt={`NFT ${index + 1}`} className="nft-image" />
//                         ))
//                     ) : (
//                         <p>No NFTs available</p>
//                     )}
//                 </div>
//                 <Button type="primary" onClick={handleLogout} className="logout-button">
//                     Log Out
//                 </Button>
//             </Card>
//         </div>
//     );
// }

// export default WalletView;



// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'antd';
// import { ethers, JsonRpcProvider } from 'ethers';
// import { useNavigate } from 'react-router-dom';

// function WalletView({ wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain }) {
//     const [balance, setBalance] = useState(null);
//     const navigate = useNavigate();

//     const ntfs = [
//         "https://ntfs-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xd774557b647330c91bf44cfeab205095f7e6c367/0xfb76"
//     ];

//     useEffect(() => {
//         async function fetchBalance() {
//             if (wallet && selectedChain) {
//                 const provider = new JsonRpcProvider(selectedChain.rpcUrl);
//                 const balance = await provider.getBalance(wallet.address);
//                 setBalance(ethers.formatEther(balance));
//             }
//         }
//         fetchBalance();
//     }, [wallet, selectedChain]);

//     function handleLogout() {
//         setWallet(null);
//         setSeedPhrase(null);
//         navigate('/');
//     }

//     return (
//         <div className="wallet-view">
//             <Card className="wallet-card">
//                 <h2>Wallet Address</h2>
//                 <p>{wallet?.address}</p>
//                 <h2>Seed Phrase</h2>
//                 <p>{seedPhrase}</p>
//                 <h2>Balance</h2>
//                 <p>{balance !== null ? `${balance} ETH` : 'Loading...'}</p>
//                 <h2>NFTs</h2>
//                 <div className="nft-container">
//                     {ntfs.map((url, index) => (
//                         <img key={index} src={url} alt={`NFT ${index + 1}`} className="nft-image" />
//                     ))}
//                 </div>
//                 <Button type="primary" onClick={handleLogout} className="logout-button">
//                     Log Out
//                 </Button>
//             </Card>
//         </div>
//     );
// }

// export default WalletView;



// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'antd';
// import { ethers } from 'ethers';
// import { useNavigate } from 'react-router-dom';

// function WalletView({ wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain }) {
//     const [balance, setBalance] = useState(null);
//     const navigate = useNavigate();

//     const ntfs = [
//         "https://ntfs-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xd774557b647330c91bf44cfeab205095f7e6c367/0xfb76"
//     ];

//     useEffect(() => {
//         async function fetchBalance() {
//             if (wallet && selectedChain) {
//                 const provider = new ethers.providers.JsonRpcProvider(selectedChain.rpcUrl);
//                 const balance = await provider.getBalance(wallet.address);
//                 setBalance(ethers.utils.formatEther(balance));
//             }
//         }
//         fetchBalance();
//     }, [wallet, selectedChain]);

//     function handleLogout() {
//         setWallet(null);
//         setSeedPhrase(null);
//         navigate('/');
//     }

//     return (
//         <div className="wallet-view">
//             <Card className="wallet-card">
//                 <h2>Wallet Address</h2>
//                 <p>{wallet?.address}</p>
//                 <h2>Seed Phrase</h2>
//                 <p>{seedPhrase}</p>
//                 <h2>Balance</h2>
//                 <p>{balance !== null ? `${balance} ETH` : 'Loading...'}</p>
//                 <h2>NFTs</h2>
//                 <div className="nft-container">
//                     {ntfs.map((url, index) => (
//                         <img key={index} src={url} alt={`NFT ${index + 1}`} className="nft-image" />
//                     ))}
//                 </div>
//                 <Button type="primary" onClick={handleLogout} className="logout-button">
//                     Log Out
//                 </Button>
//             </Card>
//         </div>
//     );
// }

// export default WalletView;
