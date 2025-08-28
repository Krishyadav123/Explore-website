import Navbar from '@/component/Navbar'
import React from 'react'
import EducationPlannerPage from './Components/ChildrenEducationPage'
import Footer from '@/component/Footer'
import ChildrenEducationPage from './Components/ChildrenEducationPage'

const ChildrenEducationCalculator = () => {
  return (
    <div>
        <Navbar/>
        <ChildrenEducationPage/>
        {/* <EducationPlannerPage/> */}
        <Footer/>
    </div>
  )
}

export default ChildrenEducationCalculator