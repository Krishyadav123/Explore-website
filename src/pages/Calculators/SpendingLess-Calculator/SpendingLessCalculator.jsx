import Navbar from '@/component/Navbar'
import React from 'react'
import SpendingLessCalculatorPage from './Components/SpendingLessCalculatorPage'
import Footer from '@/component/Footer'

const SpendingLessCalculator = () => {
  return (
    <div>
        <Navbar/>
        <SpendingLessCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default SpendingLessCalculator