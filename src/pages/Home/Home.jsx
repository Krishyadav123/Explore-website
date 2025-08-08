import React from 'react'
import HeroCarousel from './Components/Hero'
import FinancialHero from './Components/FinancialHero'
import InvestmentGoalsSection from './Components/InvestmentGoalSection'
import CallbackSection from './Components/CallbackSection'
import AMCPartnersSection from './Components/AMCPartnersSection'
import Footer from '@/component/Footer'
import About from '../About/About'
import Navbar from '@/component/Navbar'
import TanStackTableExample from './Components/TanStackTableExample'


function Home() {
  return (
    <div>
      <Navbar/>
      <HeroCarousel/>
      <FinancialHero/>
      <InvestmentGoalsSection/>
      <CallbackSection/>
      <AMCPartnersSection/>
      <TanStackTableExample/>

      {/* <About/> */}
      <Footer/>
    </div>
  )
}

export default Home