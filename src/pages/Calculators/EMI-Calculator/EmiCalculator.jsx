import Navbar from '@/component/Navbar'
import React from 'react'
import EMICalculatorPage from './Components/EmiCalculatorPage'
import Footer from '@/component/Footer'

const EmiCalculator = () => {
  return (
    <div>
        <Navbar/>
        <EMICalculatorPage/>
        <Footer/>
    </div>
  )
}

export default EmiCalculator