import Navbar from '@/component/Navbar'
import React from 'react'
import ContactForm from './Components/ContactForm'
import Footer from '@/component/Footer'
import Map from './Components/Map'

const Contact = () => {
  return (
    <div>
        <Navbar/>
        <ContactForm/>
        {/* <Map/> */}
        <Footer/>
    </div>
  )
}

export default Contact