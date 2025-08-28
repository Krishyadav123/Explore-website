import About from '@/pages/About/About'
import Admin from '@/pages/Admin/Admin'
import Blog from '@/pages/Blog/Blog'
import AssetAllocationCalculator from '@/pages/Calculators/AssetAllocationCalculator/AssetAllocationCalculator'
import CrorepatiCalculator from '@/pages/Calculators/Became-Crorepati/CrorepatiCalculator'
import CompositeFinancialCalculator from '@/pages/Calculators/CompositeFinancial-Calculator/CompositeFinancialCalculator'
import CompoundingCalculator from '@/pages/Calculators/Compounding-Calculator/CompoundingCalculator'
import ChildrenEducationCalculator from '@/pages/Calculators/EducationPlanner-Calculator/ChildrenEducationCalculator'
import EmiCalculator from '@/pages/Calculators/EMI-Calculator/EmiCalculator'
import EPFCalculator from '@/pages/Calculators/EPF-Calculator/EPFCalculator'
import GoalCalculator from '@/pages/Calculators/Goal-Calculator/GoalCalculator'
import NetworthCalculator from '@/pages/Calculators/Networth-Calculator/NetworthCalculator'
import PPFCalculator from '@/pages/Calculators/PPF-Calculator/PPFCalculator'
import RetirementCalculator from '@/pages/Calculators/Retirement-Calculator/RetirementCalculator'
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
        <Route path="/calculator/become-a-crorepati" element={<CrorepatiCalculator />} />
        <Route path="/calculator/retirement-planning-calculator" element={<RetirementCalculator />} />
        <Route path="/calculator/asset-allocation-calculator" element={<AssetAllocationCalculator />} />
        <Route path="/calculator/emi-calculator" element={<EmiCalculator />} />
        <Route path="/calculator/ppf-calculator" element={<PPFCalculator />} />
        <Route path="/calculator/epf-calculator" element={<EPFCalculator />} />
        <Route path="/calculator/goal-setting-calculator" element={<GoalCalculator />} />
        <Route path="/calculator/composite-financial-goal-planner-calculator" element={<CompositeFinancialCalculator />} />
        <Route path="/calculator/children-education-planner-calculator" element={<ChildrenEducationCalculator />} />
        <Route path="/calculator/networth-calculator" element={<NetworthCalculator />} />
        <Route path="/calculator/compounding-calculator" element={<CompoundingCalculator />} />
        {/* <Route path="/demo" element={<Carousel />} /> */}
        <Route path="/contact" element={<Contact />} />


        <Route path="/admin" element={<Admin />} />
        {/* Add more routes as needed */}
    </Routes>
  )
}

export default AllRoutes