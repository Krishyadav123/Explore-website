import Navbar from '@/component/Navbar'
import React from 'react'
import WealthCreationForm from './Components/WealthCreationForm'
import Footer from '@/component/Footer'

const WealthCreation = () => {
  return (
    <div>
        <Navbar/>
        <WealthCreationForm/>
        <Footer/>
    </div>
  )
}

export default WealthCreation