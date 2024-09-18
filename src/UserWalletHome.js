import React from 'react'
import WalletCard from './components/WalletCard'
import Transactions from './Transactions'

export default function UserWalletHome() {
  return (
    <>
      <WalletCard />
        {/* Transaction history */}
          <Transactions />

    </>
  )
}
