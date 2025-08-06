import React from 'react'
import HeroCarousel from './Components/Hero'
import FinancialHero from './Components/FinancialHero'
import InvestmentGoalsSection from './Components/InvestmentGoalSection'
import CallbackSection from './Components/CallbackSection'
import AMCPartnersSection from './Components/AMCPartnersSection'
import Footer from '@/component/Footer'
import About from '../About/About'
import Navbar from '@/component/Navbar'


function Home() {
  return (
    <div>
      <Navbar/>
      <HeroCarousel/>
      <FinancialHero/>
      <InvestmentGoalsSection/>
      <CallbackSection/>
      <AMCPartnersSection/>

      {/* <About/> */}
      <Footer/>
    </div>
  )
}

export default Home