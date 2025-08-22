import About from '@/pages/About/About'
import Admin from '@/pages/Admin/Admin'
import Blog from '@/pages/Blog/Blog'
import SIPCalculator from '@/pages/Calculators/SIP-Calculator/SIPCalculator'
import Carousel from '@/pages/Carousel'
import Contact from '@/pages/Contact/Contact'
import DreamHome from '@/pages/GoalPlanners/DreamHome/DreamHome'
import Home from '@/pages/Home/Home'
import TanStackTableExample from '@/pages/Mutual Funds/Components/TanStackTableExample'
import MutualFund from '@/pages/Mutual Funds/MutualFund'
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy'
import Service from '@/pages/Service/Service'
// import { Route } from 'lucide-react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/mutual-funds" element={<MutualFund />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/goal/home" element={<DreamHome />} />
        <Route path="/calculator/sip-calculator" element={<SIPCalculator />} />
        {/* <Route path="/demo" element={<Carousel />} /> */}
        <Route path="/contact" element={<Contact />} />


        <Route path="/admin" element={<Admin />} />
        {/* Add more routes as needed */}
    </Routes>
  )
}

export default AllRoutes