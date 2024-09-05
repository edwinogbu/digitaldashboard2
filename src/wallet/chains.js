const Ethereum = {
    hex:'0x1',
    name:'Ethereum',
    rpcUrl:'https://go.getblock.io/90a49e327fe241fa89d239bdaeeedc3a',
    ticker:'ETH'
};

const MumbaiTestnet = {
    hex:'0x13881',
    name:'Mumbai Testnet',
    rpcUrl:'https://go.getblock.io/347e7627eb974f01991296887b9f2509',
    ticker:'MATIC'
};

export const CHAINS_CONFIG = {
    "0x1":Ethereum,
    "0x13881":MumbaiTestnet,
}