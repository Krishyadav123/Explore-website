import Navbar from '@/component/Navbar'
import React from 'react'
import Services from './Components/Services'
import Footer from '@/component/Footer'
import PageName from '@/component/PageName'
import CallbackSection from '../Home/Components/CallbackSection'

const Service = () => {
  return (
    <div>
        <Navbar/>
        <PageName name="Our Services" />
        <Services/>
        <CallbackSection/>
        <Footer/>
    </div>
  )
}

export default Service