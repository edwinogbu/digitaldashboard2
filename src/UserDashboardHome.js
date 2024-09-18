import React from 'react'
import WalletCard from './components/WalletCard'
import SubscriptionPlans from './components/SubscriptionPlans'
import Transactions from './Transactions'

export default function UserDashboardHome() {
  return (
    <>
      <SubscriptionPlans />
      <Transactions />
      {/* <WalletCard /> */}
    </>
  )
}
