import Footer from '@/component/Footer'
import Navbar from '@/component/Navbar'
import React from 'react'
import EmergencyForm from './Components/EmergencyForm'

const Emergency = () => {
  return (
    <div>
        <Navbar/>
        <EmergencyForm/>
        <Footer/>
    </div>
  )
}

export default Emergency