import Navbar from '@/component/Navbar'
import React from 'react'
import RetirementCalculatorPage from './Components/RetirementCalculatorPage'
import Footer from '@/component/Footer'

const RetirementCalculator = () => {
  return (
    <div>
        <Navbar/>
        <RetirementCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default RetirementCalculator