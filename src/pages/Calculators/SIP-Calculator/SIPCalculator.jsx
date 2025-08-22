import Navbar from '@/component/Navbar'
import React from 'react'
import SIPCalculatorPage from './Components/SIPCalculatorPage'
import Footer from '@/component/Footer'

const SIPCalculator = () => {
  return (
    <div>
        <Navbar/>
        <SIPCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default SIPCalculator