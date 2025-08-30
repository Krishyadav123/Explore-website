import Navbar from '@/component/Navbar'
import React from 'react'
import MutualFundCalculatorPage from './Components/MutualFundCalculatorPage'
import Footer from '@/component/Footer'

const MutualFundCalculator = () => {
  return (
    <div>
        <Navbar/>
        <MutualFundCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default MutualFundCalculator