import Navbar from '@/component/Navbar'
import React from 'react'
import HumanValueCalculatorPage from './Components/HumanValueCalculatorPage'
import Footer from '@/component/Footer'

const HumanValueCalculator = () => {
  return (
    <div>
        <Navbar/>
        <HumanValueCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default HumanValueCalculator