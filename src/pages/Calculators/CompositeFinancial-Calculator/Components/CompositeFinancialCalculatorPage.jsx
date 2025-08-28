import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Target, GraduationCap, TrendingUp, ShoppingCart, Calculator } from 'lucide-react';

const CompositeFinancialCalculatorPage = () => {
  // Education Goal States
  const [educationAmount, setEducationAmount] = useState(2500000);
  const [educationCurrentAge, setEducationCurrentAge] = useState(5);
  const [educationReadyAge, setEducationReadyAge] = useState(23);
  const [educationSavings, setEducationSavings] = useState(136888);

  // Wealth Goal States  
  const [wealthAmount, setWealthAmount] = useState(10000000);
  const [wealthCurrentAge, setWealthCurrentAge] = useState(35);
  const [wealthReadyAge, setWealthReadyAge] = useState(65);
  const [wealthSavings, setWealthSavings] = useState(277777);

  // Expense Goal States
  const [expenseAmount, setExpenseAmount] = useState(1500000);
  const [expenseCurrentAge, setExpenseCurrentAge] = useState(35);
  const [expenseReadyAge, setExpenseReadyAge] = useState(45);
  const [expenseSavings, setExpenseSavings] = useState(63333);

  // Common parameters
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // Calculations for each goal
  const calculations = useMemo(() => {
    const calculateGoal = (amount, currentAge, readyAge, savings, goalType) => {
      const years = readyAge - currentAge;
      const months = years * 12;
      const inflationAdjusted = amount * Math.pow(1 + inflationRate / 100, years);
      const futureValueSavings = savings * Math.pow(1 + expectedReturn / 100, years);
      const remaining = Math.max(0, inflationAdjusted - futureValueSavings);
      
      const monthlyRate = expectedReturn / 12 / 100;
      let monthlySIP = 0;
      let totalSIPInvestment = 0;
      
      if (remaining > 0 && months > 0) {
        if (monthlyRate > 0) {
          monthlySIP = remaining * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
          totalSIPInvestment = monthlySIP * months;
        } else {
          monthlySIP = remaining / months;
          totalSIPInvestment = remaining;
        }
      }
      
      const sipGrowth = remaining - totalSIPInvestment;
      const savingsGrowth = futureValueSavings - savings;
      const totalGrowth = sipGrowth + savingsGrowth;
      const totalInvested = totalSIPInvestment + savings;
      
      return {
        goalType,
        amount,
        years,
        inflationAdjusted: Math.round(inflationAdjusted),
        monthlySIP: Math.round(monthlySIP),
        totalSIPInvestment: Math.round(totalSIPInvestment),
        totalGrowth: Math.round(totalGrowth),
        totalInvested: Math.round(totalInvested),
        currentSavings: savings,
        futureValueSavings: Math.round(futureValueSavings)
      };
    };

    const education = calculateGoal(educationAmount, educationCurrentAge, educationReadyAge, educationSavings, 'Education');
    const wealth = calculateGoal(wealthAmount, wealthCurrentAge, wealthReadyAge, wealthSavings, 'Wealth');
    const expense = calculateGoal(expenseAmount, expenseCurrentAge, expenseReadyAge, expenseSavings, 'Expense');

    // Combined totals
    const totalMonthlySIP = education.monthlySIP + wealth.monthlySIP + expense.monthlySIP;
    const totalCurrentSavings = education.currentSavings + wealth.currentSavings + expense.currentSavings;
    const totalInflationAdjusted = education.inflationAdjusted + wealth.inflationAdjusted + expense.inflationAdjusted;

    return {
      education,
      wealth, 
      expense,
      totalMonthlySIP,
      totalCurrentSavings,
      totalInflationAdjusted
    };
  }, [
    educationAmount, educationCurrentAge, educationReadyAge, educationSavings,
    wealthAmount, wealthCurrentAge, wealthReadyAge, wealthSavings,
    expenseAmount, expenseCurrentAge, expenseReadyAge, expenseSavings,
    inflationRate, expectedReturn
  ]);

  // Pie chart data
  const pieData = [
    { name: 'Education', value: calculations.education.inflationAdjusted, color: '#3b82f6' },
    { name: 'Wealth', value: calculations.wealth.inflationAdjusted, color: '#10b981' },
    { name: 'Expense', value: calculations.expense.inflationAdjusted, color: '#f59e0b' }
  ];

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
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
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-md">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Composite Goal Planner
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Plan multiple financial goals simultaneously and optimize your investment strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="space-y-8">
            
            {/* Education Goal Section */}
            <div className="glass-effect rounded-3xl shadow-md p-7 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Education Goal</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    What is the amount you would need to fund your child educational need at today's cost (Rs)
                  </label>
                  <input
                    type="number"
                    value={educationAmount}
                    onChange={(e) => setEducationAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    step="50000"
                  />
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="50000"
                    value={educationAmount}
                    onChange={(e) => setEducationAmount(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5L</span>
                    <span>25L</span>
                    <span>50L</span>
                    <span>75L</span>
                    <span>1Cr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">What is your current age? (in years)</label>
                  <input
                    type="number"
                    value={educationCurrentAge}
                    onChange={(e) => setEducationCurrentAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    min="18"
                    max="60"
                  />
                  <input
                    type="range"
                    min="18"
                    max="60"
                    value={educationCurrentAge}
                    onChange={(e) => setEducationCurrentAge(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>18</span>
                    <span>28</span>
                    <span>38</span>
                    <span>48</span>
                    <span>60</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">What age your child would be ready for professional education? (in years)</label>
                  <input
                    type="number"
                    value={educationReadyAge}
                    onChange={(e) => setEducationReadyAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    min={educationCurrentAge + 1}
                    max="30"
                  />
                  <input
                    type="range"
                    min={educationCurrentAge + 1}
                    max="30"
                    value={educationReadyAge}
                    onChange={(e) => setEducationReadyAge(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>18</span>
                    <span>21</span>
                    <span>24</span>
                    <span>27</span>
                    <span>30</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">How much savings you have now? (Rs)</label>
                  <input
                    type="number"
                    value={educationSavings}
                    onChange={(e) => setEducationSavings(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    step="10000"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="10000"
                    value={educationSavings}
                    onChange={(e) => setEducationSavings(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>50K</span>
                    <span>1L</span>
                    <span>1.5L</span>
                    <span>2L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wealth Goal Section */}
            <div className="glass-effect rounded-3xl shadow-md p-7 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Wealth Goal</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    What is the amount you would need to consider yourself wealthy at today's cost (Rs)
                  </label>
                  <input
                    type="number"
                    value={wealthAmount}
                    onChange={(e) => setWealthAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    step="500000"
                  />
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="500000"
                    value={wealthAmount}
                    onChange={(e) => setWealthAmount(Number(e.target.value))}
                    className="w-full mt-3 accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>10L</span>
                    <span>15L</span>
                    <span>2Cr</span>
                    <span>3.5Cr</span>
                    <span>5Cr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">What is your current age? (in years)</label>
                  <input
                    type="number"
                    value={wealthCurrentAge}
                    onChange={(e) => setWealthCurrentAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    min="18"
                    max="65"
                  />
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={wealthCurrentAge}
                    onChange={(e) => setWealthCurrentAge(Number(e.target.value))}
                    className="w-full mt-3 accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>18</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                    <span>65</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">At what age you plan to acquire wealth? (in years)</label>
                  <input
                    type="number"
                    value={wealthReadyAge}
                    onChange={(e) => setWealthReadyAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    min={wealthCurrentAge + 1}
                    max="80"
                  />
                  <input
                    type="range"
                    min={wealthCurrentAge + 1}
                    max="80"
                    value={wealthReadyAge}
                    onChange={(e) => setWealthReadyAge(Number(e.target.value))}
                    className="w-full mt-3 accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>25</span>
                    <span>40</span>
                    <span>55</span>
                    <span>70</span>
                    <span>80</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">How much savings you have now? (Rs)</label>
                  <input
                    type="number"
                    value={wealthSavings}
                    onChange={(e) => setWealthSavings(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    step="50000"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={wealthSavings}
                    onChange={(e) => setWealthSavings(Number(e.target.value))}
                    className="w-full mt-3 accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>1.25L</span>
                    <span>2.5L</span>
                    <span>3.75L</span>
                    <span>5L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Goal Section */}
            <div className="glass-effect rounded-3xl shadow-md p-7 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Expense Goal</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    What is the amount you would need to spend on buying an item you dream - a big car or a foreign holiday or a house (Rs)
                  </label>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    step="50000"
                  />
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(Number(e.target.value))}
                    className="w-full mt-3 accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1L</span>
                    <span>25L</span>
                    <span>50L</span>
                    <span>75L</span>
                    <span>1Cr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">What is your current age? (in years)</label>
                  <input
                    type="number"
                    value={expenseCurrentAge}
                    onChange={(e) => setExpenseCurrentAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    min="18"
                    max="65"
                  />
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={expenseCurrentAge}
                    onChange={(e) => setExpenseCurrentAge(Number(e.target.value))}
                    className="w-full mt-3 accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>18</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                    <span>65</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">At what age would you need the amount to spend on buying an item you dream so?</label>
                  <input
                    type="number"
                    value={expenseReadyAge}
                    onChange={(e) => setExpenseReadyAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    min={expenseCurrentAge + 1}
                    max="70"
                  />
                  <input
                    type="range"
                    min={expenseCurrentAge + 1}
                    max="70"
                    value={expenseReadyAge}
                    onChange={(e) => setExpenseReadyAge(Number(e.target.value))}
                    className="w-full mt-3 accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>25</span>
                    <span>35</span>
                    <span>45</span>
                    <span>55</span>
                    <span>70</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">How much savings you have now? (Rs)</label>
                  <input
                    type="number"
                    value={expenseSavings}
                    onChange={(e) => setExpenseSavings(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    step="10000"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={expenseSavings}
                    onChange={(e) => setExpenseSavings(Number(e.target.value))}
                    className="w-full mt-3 accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>25K</span>
                    <span>50K</span>
                    <span>75K</span>
                    <span>1L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Parameters */}
            <div className="glass-effect rounded-3xl shadow-md p-7 card-hover">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Investment Parameters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    The expected rate of inflation over the years (% per annum)
                  </label>
                  <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    min="1"
                    max="15"
                    step="0.1"
                  />
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full mt-3 accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1%</span>
                    <span>4%</span>
                    <span>8%</span>
                    <span>12%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    What rate of return would you expect your investment (% per annum)
                  </label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    min="5"
                    max="20"
                    step="0.1"
                  />
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full mt-3 accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5%</span>
                    <span>8.75%</span>
                    <span>12.5%</span>
                    <span>16.25%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Composite Goal Planner</h3>
              
              <div className="relative mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), '']}
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
              <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Wealth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Expense</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Monthly SIP Required</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(calculations.totalMonthlySIP)}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Current Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(calculations.totalCurrentSavings)}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Future Goal Value</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(calculations.totalInflationAdjusted)}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Table */}
          
          </div>
        </div>


  <div className="glass-effect rounded-3xl shadow-md p-8 mt-5 card-hover">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Result</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-4 py-3 text-left font-medium">Composite Planner</th>
                      <th className="px-4 py-3 text-center font-medium">Education</th>
                      <th className="px-4 py-3 text-center font-medium">Wealth</th>
                      <th className="px-4 py-3 text-center font-medium">Expense</th>
                      <th className="px-4 py-3 text-center font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Amount at today's prices</td>
                      <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(educationAmount)}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(wealthAmount)}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(expenseAmount)}</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">{formatCurrency(educationAmount + wealthAmount + expenseAmount)}</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Number of years to save the goal</td>
                      <td className="px-4 py-3 text-center text-gray-700">{educationReadyAge - educationCurrentAge} year(s)</td>
                      <td className="px-4 py-3 text-center text-gray-700">{wealthReadyAge - wealthCurrentAge} year(s)</td>
                      <td className="px-4 py-3 text-center text-gray-700">{expenseReadyAge - expenseCurrentAge} year(s)</td>
                      <td className="px-4 py-3 text-center text-gray-500">-</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Expected rate of return from investments (% per annum)</td>
                      <td className="px-4 py-3 text-center text-gray-700">{expectedReturn.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center text-gray-700">{expectedReturn.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center text-gray-700">{expectedReturn.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center text-gray-700">{expectedReturn.toFixed(1)}%</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Inflation rate (% per annum)</td>
                      <td className="px-4 py-3 text-center text-gray-700">{inflationRate.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center text-gray-700">{inflationRate.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center text-gray-700">{inflationRate.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center text-gray-700">{inflationRate.toFixed(1)}%</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Financial goal target (inflation adjusted)</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-semibold">{formatCurrency(calculations.education.inflationAdjusted)}</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">{formatCurrency(calculations.wealth.inflationAdjusted)}</td>
                      <td className="px-4 py-3 text-center text-orange-600 font-semibold">{formatCurrency(calculations.expense.inflationAdjusted)}</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">{formatCurrency(calculations.totalInflationAdjusted)}</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Your current savings amount</td>
                      <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(educationSavings)}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(wealthSavings)}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(expenseSavings)}</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">{formatCurrency(calculations.totalCurrentSavings)}</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 bg-blue-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Monthly savings required</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">{formatCurrency(calculations.education.monthlySIP)}</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">{formatCurrency(calculations.wealth.monthlySIP)}</td>
                      <td className="px-4 py-3 text-center text-orange-600 font-bold">{formatCurrency(calculations.expense.monthlySIP)}</td>
                      <td className="px-4 py-3 text-center font-bold text-purple-600 text-lg">{formatCurrency(calculations.totalMonthlySIP)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Key Insights */}
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Education Goal</h4>
                  <div className="text-sm text-blue-700">
                    <p>Timeline: {educationReadyAge - educationCurrentAge} years</p>
                    <p>Monthly SIP: {formatCurrency(calculations.education.monthlySIP)}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Wealth Goal</h4>
                  <div className="text-sm text-green-700">
                    <p>Timeline: {wealthReadyAge - wealthCurrentAge} years</p>
                    <p>Monthly SIP: {formatCurrency(calculations.wealth.monthlySIP)}</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">Expense Goal</h4>
                  <div className="text-sm text-orange-700">
                    <p>Timeline: {expenseReadyAge - expenseCurrentAge} years</p>
                    <p>Monthly SIP: {formatCurrency(calculations.expense.monthlySIP)}</p>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Your Investment Action Plan
                </h4>
                <div className="space-y-3 text-purple-700">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <strong>Total Monthly Investment Required:</strong> {formatCurrency(calculations.totalMonthlySIP)}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <strong>Expected Annual Return:</strong> {expectedReturn}% to achieve your goals
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <strong>Total Future Wealth:</strong> {formatCurrency(calculations.totalInflationAdjusted)}
                  </p>
                  <p className="text-sm mt-4 text-purple-600 bg-white p-3 rounded border-l-4 border-purple-300">
                    💡 <strong>Pro Tip:</strong> Start investing early to benefit from compound growth. Consider diversifying across equity mutual funds, SIP, and other investment instruments to achieve your expected returns.
                  </p>
                </div>
              </div>
            </div>

      </div>
    </div>
  );
};

export default CompositeFinancialCalculatorPage;