import About from '@/pages/About/About'
import Home from '@/pages/Home/Home'
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
        {/* Add more routes as needed */}
    </Routes>
  )
}

export default AllRoutes