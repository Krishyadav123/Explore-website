import Footer from '@/component/Footer'
import Navbar from '@/component/Navbar'
import React from 'react'
import DreamHomeForm from './Components/DreamHomeForm'

const DreamHome = () => {
  return (
    <div>
        <Navbar/>
        <DreamHomeForm/>
        <Footer/>
    </div>
  )
}

export default DreamHome