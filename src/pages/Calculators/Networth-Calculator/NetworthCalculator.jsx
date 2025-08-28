import Navbar from '@/component/Navbar'
import React from 'react'
import NetworthCalculatorPage from './Components/NetworthCalculatorPage'
import Footer from '@/component/Footer'

const NetworthCalculator = () => {
  return (
    <div>
      <Navbar/>
      <NetworthCalculatorPage/>
      <Footer/>
    </div>
  )
}

export default NetworthCalculator