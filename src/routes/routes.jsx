import About from '@/pages/About/About'
import Carousel from '@/pages/Carousel'
import Contact from '@/pages/Contact/Contact'
import Home from '@/pages/Home/Home'
import TanStackTableExample from '@/pages/Mutual Funds/Components/TanStackTableExample'
import MutualFund from '@/pages/Mutual Funds/MutualFund'
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
        {/* <Route path="/demo" element={<Carousel />} /> */}
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
    </Routes>
  )
}

export default AllRoutes