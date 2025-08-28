import Navbar from '@/component/Navbar'
import React from 'react'
import CompoundCalculatorPage from './Components/CompoundingCalculatorPage'
import Footer from '@/component/Footer'

const CompoundingCalculator = () => {
  return (
    <div>
        <Navbar/>
        <CompoundCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default CompoundingCalculator