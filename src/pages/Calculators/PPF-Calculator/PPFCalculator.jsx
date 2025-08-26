import Navbar from '@/component/Navbar'
import React from 'react'
import PPFCalculatorPage from './Components/PPFCalculatorPage'
import Footer from '@/component/Footer'

const PPFCalculator = () => {
  return (
    <div>
        <Navbar/>
        <PPFCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default PPFCalculator