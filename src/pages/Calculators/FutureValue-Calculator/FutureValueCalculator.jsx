import Navbar from '@/component/Navbar'
import React from 'react'
import FutureValueCalculatorPage from './Components/FutureValueCalculatorPage'
import Footer from '@/component/Footer'

const FutureValueCalculator = () => {
  return (
    <div>
        <Navbar/>
        <FutureValueCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default FutureValueCalculator