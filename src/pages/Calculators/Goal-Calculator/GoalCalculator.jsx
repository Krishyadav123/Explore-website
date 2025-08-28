import Navbar from '@/component/Navbar'
import React from 'react'
import GoalCalculatorPage from './Components/GoalCalculatorPage'
import Footer from '@/component/Footer'

const GoalCalculator = () => {
  return (
    <div>
        <Navbar/>
        <GoalCalculatorPage/>
        <Footer/>
    </div>
  )
}

export default GoalCalculator