import Navbar from '@/component/Navbar'
import React from 'react'
import CompositeFinancialCalculatorPage from './Components/CompositeFinancialCalculatorPage'
import Footer from '@/component/Footer'

const CompositeFinancialCalculator = () => {
  return (
    <div>
        <Navbar/>
        <CompositeFinancialCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default CompositeFinancialCalculator