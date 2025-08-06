import React from 'react'
import AboutUsPage from './Components/AboutUsPage'
import Navbar from '@/component/Navbar'
import Footer from '@/component/Footer'
import PageName from '@/component/PageName'

const About = () => {
  return (
    <div>
      <Navbar/>
      <PageName name="About Us" />
        <AboutUsPage/>
        <Footer/>
    </div>
  )
}

export default About