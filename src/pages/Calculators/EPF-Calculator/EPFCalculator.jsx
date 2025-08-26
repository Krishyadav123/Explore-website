import Navbar from '@/component/Navbar'
import React from 'react'
import EPFCalculatorPage from './Components/EPFCalculatorPage'
import Footer from '@/component/Footer'

const EPFCalculator = () => {
  return (
    <div>
        <Navbar/>
        <EPFCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default EPFCalculator