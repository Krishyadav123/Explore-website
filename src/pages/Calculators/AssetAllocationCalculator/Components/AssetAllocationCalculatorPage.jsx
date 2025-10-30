import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, Target, Calendar, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

const AssetAllocationCalculatorPage = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [riskTolerance, setRiskTolerance] = useState(50); // 0-100 scale
  const [investmentHorizon, setInvestmentHorizon] = useState(5);
  const [knowledgeLevel, setKnowledgeLevel] = useState(50); // 0-100 scale
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(1000000);
  const [prefersBigCompanies, setPrefersBigCompanies] = useState(50); // 0-100 scale

  // Asset allocation calculation logic
  const calculations = useMemo(() => {
    // Base allocations based on age (Rule of 100 - Age = Equity %)
    let equityBase = Math.max(20, Math.min(80, 100 - currentAge));
    
    // Adjust based on risk tolerance
    const riskAdjustment = (riskTolerance - 50) * 0.6; // -30 to +30
    equityBase += riskAdjustment;
    
    // Adjust based on investment horizon
    if (investmentHorizon >= 10) {
      equityBase += 10;
    } else if (investmentHorizon >= 7) {
      equityBase += 5;
    } else if (investmentHorizon <= 2) {
      equityBase -= 15;
    }
    
    // Adjust based on knowledge level
    const knowledgeAdjustment = (knowledgeLevel - 50) * 0.2; // -10 to +10
    equityBase += knowledgeAdjustment;
    
    // Ensure equity stays within reasonable bounds
    const totalEquity = Math.max(10, Math.min(85, equityBase));
    
    // Split equity based on company preference
    const largeCapEquity = totalEquity * (prefersBigCompanies / 100);
    const midSmallCapEquity = totalEquity - largeCapEquity;
    
    // Remaining allocation
    const remainingAllocation = 100 - totalEquity;
    
    // Split remaining between debt and other categories
    const debt = Math.max(10, remainingAllocation * 0.6);
    const fixedIncome = Math.max(5, remainingAllocation * 0.25);
    const cashEquivalent = Math.max(2, remainingAllocation * 0.1);
    const fmpsDebt = Math.max(3, remainingAllocation * 0.05);
    
    // Normalize to ensure total = 100%
    const total = largeCapEquity + midSmallCapEquity + debt + fixedIncome + cashEquivalent + fmpsDebt;
    
    const allocations = {
      largeCap: Math.round((largeCapEquity / total) * 100),
      midSmallCap: Math.round((midSmallCapEquity / total) * 100),
      debt: Math.round((debt / total) * 100),
      fixedIncome: Math.round((fixedIncome / total) * 100),
      cashEquivalent: Math.round((cashEquivalent / total) * 100),
      fmpsDebt: Math.round((fmpsDebt / total) * 100)
    };
    
    // Calculate investment amounts
    const investments = {
      largeCap: Math.round((allocations.largeCap / 100) * totalInvestmentAmount),
      midSmallCap: Math.round((allocations.midSmallCap / 100) * totalInvestmentAmount),
      debt: Math.round((allocations.debt / 100) * totalInvestmentAmount),
      fixedIncome: Math.round((allocations.fixedIncome / 100) * totalInvestmentAmount),
      cashEquivalent: Math.round((allocations.cashEquivalent / 100) * totalInvestmentAmount),
      fmpsDebt: Math.round((allocations.fmpsDebt / 100) * totalInvestmentAmount)
    };
    
    const totalEquityPercentage = allocations.largeCap + allocations.midSmallCap;
    const totalDebtPercentage = allocations.debt + allocations.fixedIncome + allocations.cashEquivalent + allocations.fmpsDebt;
    
    return {
      allocations,
      investments,
      totalEquityPercentage,
      totalDebtPercentage,
      riskLevel: riskTolerance >= 70 ? 'High' : riskTolerance >= 40 ? 'Medium' : 'Low'
    };
  }, [currentAge, riskTolerance, investmentHorizon, knowledgeLevel, totalInvestmentAmount, prefersBigCompanies]);

  // Pie chart data with colors matching the reference
  const pieData = [
    { name: 'Large Caps', value: calculations.allocations.largeCap, color: '#f97316' }, // Orange
    { name: 'Mid-Cap/Small-Cap', value: calculations.allocations.midSmallCap, color: '#22c55e' }, // Green
    { name: 'Debt', value: calculations.allocations.debt, color: '#1f2937' }, // Black
    { name: 'Long Term Fixed Income', value: calculations.allocations.fixedIncome, color: '#eab308' }, // Yellow
    { name: 'Cash/Bank FD/Liquid', value: calculations.allocations.cashEquivalent, color: '#06b6d4' }, // Cyan
    { name: 'FMPs and Debt Funds', value: calculations.allocations.fmpsDebt, color: '#3b82f6' } // Blue
  ].filter(item => item.value > 0);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const getRiskLevel = (value) => {
    if (value <= 20) return 'Very Low';
    if (value <= 40) return 'Low';
    if (value <= 60) return 'Medium';
    if (value <= 80) return 'High';
    return 'Very High';
  };

  const getKnowledgeLevel = (value) => {
    if (value <= 25) return 'Beginner';
    if (value <= 50) return 'Intermediate';
    if (value <= 75) return 'Advanced';
    return 'Expert';
  };

  const getCompanyPreference = (value) => {
    if (value <= 25) return 'Prefer Small Companies';
    if (value <= 50) return 'Balanced Approach';
    if (value <= 75) return 'Prefer Big Companies';
    return 'Only Big Companies';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-6">
      <style>{`
        .glass-effect { 
          backdrop-filter: blur(6px);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .card-hover { transition: all 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-md">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Asset Allocation Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Optimize your investment portfolio based on your risk profile and financial goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Current Age */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Your current Age (Years)
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="18"
                max="80"
              />
              <input
                type="range"
                min="18"
                max="80"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>21-30 yrs</span>
                <span>31-45 yrs</span>
                <span>46-60 yrs</span>
                <span>&gt; 60 yrs</span>
              </div>
            </div>

            {/* Risk Tolerance */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                How much risk you can take?
              </label>
              <div className="text-center mb-2">
                <span className="text-lg font-semibold text-gray-800">{getRiskLevel(riskTolerance)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Very Low</span>
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>

            {/* Investment Horizon */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Your investment Horizon (Years)
              </label>
              <input
                type="number"
                value={investmentHorizon}
                onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                min="1"
                max="30"
                step="0.5"
              />
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={investmentHorizon}
                onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                className="w-full mt-3 accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>&lt; 2 yrs</span>
                <span>2-5 yrs</span>
                <span>5-10 yrs</span>
                <span>&gt; 10 yrs</span>
              </div>
            </div>

            {/* Company Size Preference */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Do you know that mid and small caps generate better return in long term
              </label>
              <div className="text-center mb-2">
                <span className="text-lg font-semibold text-gray-800">{getCompanyPreference(prefersBigCompanies)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={prefersBigCompanies}
                onChange={(e) => setPrefersBigCompanies(Number(e.target.value))}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Yes</span>
                <span>No, I prefer big companies</span>
                <span>Not sure</span>
              </div>
            </div>

            {/* Investment Knowledge */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Your investment knowledge level
              </label>
              <div className="text-center mb-2">
                <span className="text-lg font-semibold text-gray-800">{getKnowledgeLevel(knowledgeLevel)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={knowledgeLevel}
                onChange={(e) => setKnowledgeLevel(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Expert</span>
              </div>
            </div>

            {/* Total Investment Amount */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Total Investment Amount (Rs)
              </label>
              <input
                type="number"
                value={totalInvestmentAmount}
                onChange={(e) => setTotalInvestmentAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
                step="100000"
              />
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={totalInvestmentAmount}
                onChange={(e) => setTotalInvestmentAmount(Number(e.target.value))}
                className="w-full mt-3 accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1L</span>
                <span>10L</span>
                <span>25L</span>
                <span>1Cr</span>
                <span>5Cr</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Recommended Asset Allocation</h3>
               
              </div>
              
              <div className="relative mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, '']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mb-8 text-sm">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Allocation Details */}
              <div className="space-y-3">
                {pieData.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: item.color}}></div>
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-800">{item.value}%</div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(calculations.investments[item.name === 'Large Caps' ? 'largeCap' : 
                            item.name === 'Mid-Cap/Small-Cap' ? 'midSmallCap' :
                            item.name === 'Debt' ? 'debt' :
                            item.name === 'Long Term Fixed Income' ? 'fixedIncome' :
                            item.name === 'Cash/Bank FD/Liquid' ? 'cashEquivalent' : 'fmpsDebt'])}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Risk Profile</p>
                  <p className="text-xl font-bold text-blue-600">{calculations.riskLevel} Risk</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Equity: {calculations.totalEquityPercentage}% | Debt: {calculations.totalDebtPercentage}%
                  </p>
                </div>
              </div>
               <div className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-lg text-sm font-semibold">
                  Based on your profile it is suggested to invest {calculations.totalDebtPercentage}% in Debt and {calculations.totalEquityPercentage}% in Equity
                </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                🌟 Ready to Optimize Your Portfolio?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Effective asset allocation is key to managing risk and maximizing returns.
              </p>
              <p className="text-blue-100">
                Our calculator helps you build a diversified portfolio aligned with your goals.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Allocate wisely, diversify effectively, and achieve your financial goals!
              </p>
              <div className="mt-8">
                <a
                  href="https://login.exploremfs.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Get Your Allocation Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocationCalculatorPage;