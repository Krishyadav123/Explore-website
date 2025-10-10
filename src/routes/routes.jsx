import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/component/ScrollToTop';

// Pages
import Home from '@/pages/Home/Home';
import About from '@/pages/About/About';
import Service from '@/pages/Service/Service';

import Contact from '@/pages/Contact/Contact';
import Blog from '@/pages/Blog/Blog';
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy';
import Admin from '@/pages/Admin/Admin';

// Goal Planners
import DreamHome from '@/pages/GoalPlanners/DreamHome/DreamHome';
import WealthCreation from '@/pages/GoalPlanners/WealthCreation/WealthCreation';
import Retirement from '@/pages/GoalPlanners/Retirement/Retirement';
import ChildEducation from '@/pages/GoalPlanners/ChildEducation/ChildEducation';
import ChildWedding from '@/pages/GoalPlanners/ChildWedding/ChildWedding';
import Emergency from '@/pages/GoalPlanners/Emergency/Emergency';

// Calculators
import SIPCalculator from '@/pages/Calculators/SIP-Calculator/SIPCalculator';
import CrorepatiCalculator from '@/pages/Calculators/Became-Crorepati/CrorepatiCalculator';
import RetirementCalculator from '@/pages/Calculators/Retirement-Calculator/RetirementCalculator';
import AssetAllocationCalculator from '@/pages/Calculators/AssetAllocationCalculator/AssetAllocationCalculator';
import EmiCalculator from '@/pages/Calculators/EMI-Calculator/EmiCalculator';
import PPFCalculator from '@/pages/Calculators/PPF-Calculator/PPFCalculator';
import EPFCalculator from '@/pages/Calculators/EPF-Calculator/EPFCalculator';
import GoalCalculator from '@/pages/Calculators/Goal-Calculator/GoalCalculator';
import CompositeFinancialCalculator from '@/pages/Calculators/CompositeFinancial-Calculator/CompositeFinancialCalculator';
import ChildrenEducationCalculator from '@/pages/Calculators/EducationPlanner-Calculator/ChildrenEducationCalculator';
import NetworthCalculator from '@/pages/Calculators/Networth-Calculator/NetworthCalculator';
import CompoundingCalculator from '@/pages/Calculators/Compounding-Calculator/CompoundingCalculator';
import SpendingLessCalculator from '@/pages/Calculators/SpendingLess-Calculator/SpendingLessCalculator';
import FutureValueCalculator from '@/pages/Calculators/FutureValue-Calculator/FutureValueCalculator';
import HumanValueCalculator from '@/pages/Calculators/HumanLifeValue-Calculator/HumanValueCalculator';
import MutualFundCalculator from '@/pages/Calculators/MutualFund-Calculator/MutualFundCalculator';

// Mutual Fund Pages
import MutualFund from '@/pages/Mutual Funds/MutualFund';
import TopPerformance from '@/pages/Mutual Funds/TopPerformance/TopPerformance';
import AnnualIncrease from '@/pages/Mutual Funds/AnnualIncrease/AnnualIncrease';
import BenchmarkReturns from '@/pages/Mutual Funds/BenchmarkReturns/BenchmarkReturns';
import SipReturnCalculator from '@/pages/Mutual Funds/SipReturnCalculator/SipReturnCalculator';
import TopSwpReturns from '@/pages/Mutual Funds/TopSwpReturns/TopSwpReturns';
import MfVolatilityRanking from '@/pages/Mutual Funds/MfVolatilityRanking/MfVolatilityRanking';
import MfTrailingReturns from '@/pages/Mutual Funds/MfTrailingReturns/MfTrailingReturns';
import MfCategoryReturns from '@/pages/Mutual Funds/MfCaregoryReturns/MfCaregoryReturns';
import MfCategoryMonitor from '@/pages/Mutual Funds/MfCaregoryMonitor/MfCaregoryMonitor';
import MfSipReturns from '@/pages/Mutual Funds/MfSipReturns/MfSipReturns';
import ServiceDetailOne from '@/pages/Service/Components/ServiceDetailOne';
import ServiceDetailTwo from '@/pages/Service/Components/ServiceDetailTwo';
import ServiceDetailThree from '@/pages/Service/Components/ServiceDetailThree';
import ServiceDetailFour from '@/pages/Service/Components/ServiceDetailFour';
import ServiceDetailFive from '@/pages/Service/Components/ServiceDetailFive';
import ServiceDetailSix from '@/pages/Service/Components/ServiceDetailSix';
import ServiceDetailSeven from '@/pages/Service/Components/ServiceDetailSeven';
// import ServiceDetail from '@/pages/Service/ServiceDetail/ServiceDetail';

const AllRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        {/* <Route path="/services/detail" element={<ServiceDetail/>}/> */}
        <Route path="/service/1" element={<ServiceDetailOne/>}/>
        <Route path="/service/2" element={<ServiceDetailTwo/>}/>
        <Route path="/service/3" element={<ServiceDetailThree/>}/>
        <Route path="/service/4" element={<ServiceDetailFour/>}/>
        <Route path="/service/5" element={<ServiceDetailFive/>}/>
        <Route path="/service/6" element={<ServiceDetailSix/>}/>
        <Route path="/service/7" element={<ServiceDetailSeven/>}/>

        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<Admin />} />

        {/* Goal Planners */}
        <Route path="/goal/home" element={<DreamHome />} />
        <Route path="/goal/wealth-creation" element={<WealthCreation />} />
        <Route path="/goal/retirement" element={<Retirement />} />
        <Route path="/goal/child-education" element={<ChildEducation />} />
        <Route path="/goal/child-wedding" element={<ChildWedding />} />
        <Route path="/goal/emergency" element={<Emergency />} />

        {/* Calculators */}
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
        <Route path="/calculator/save-more-by-spending-less-calculator" element={<SpendingLessCalculator />} />
        <Route path="/calculator/future-value-calculator" element={<FutureValueCalculator />} />
        <Route path="/calculator/human-life-value-calculator" element={<HumanValueCalculator />} />
        <Route path="/calculator/mutual-fund-sip-calculator-step-up" element={<MutualFundCalculator />} />

        {/* Mutual Fund Routes */}
        <Route path="/mutual-funds" element={<MutualFund />} />
        <Route path="/mf/top-performers" element={<TopPerformance />} />
        <Route path="/mf/annual-increase" element={<AnnualIncrease />} />
        <Route path="/mf/benchmark-return" element={<BenchmarkReturns />} />
        <Route path="/mf/sip-return-calculator" element={<SipReturnCalculator />} />
        <Route path="/mf/top-swp-returns" element={<TopSwpReturns />} />
        <Route path="/mf/mf-volatility-ranking" element={<MfVolatilityRanking />} />
        <Route path='/mf/mf-trailing-returns' element={<MfTrailingReturns />} />
        <Route path="/mf/category-returns" element={<MfCategoryReturns />} />
        <Route path="/mf/category-monitor" element={<MfCategoryMonitor />} />
        <Route path="/mf/mf-sip-returns" element={<MfSipReturns />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
