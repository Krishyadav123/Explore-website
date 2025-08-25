import Navbar from '@/component/Navbar'
import React from 'react'
import AssetAllocationCalculatorPage from './Components/AssetAllocationCalculatorPage'
import Footer from '@/component/Footer'

const AssetAllocationCalculator = () => {
  return (
    <div>
        <Navbar/>
        <AssetAllocationCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default AssetAllocationCalculator