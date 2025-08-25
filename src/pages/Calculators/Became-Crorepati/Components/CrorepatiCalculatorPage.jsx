import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, Target, Calendar, TrendingUp, DollarSign, Download, Star } from 'lucide-react';

const CrorepatiCalculatorPage = () => {
  const [targetAmount, setTargetAmount] = useState(10000000); // 1 crore default
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(40);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(2500000);

  // Memoized calculations
  const calculations = useMemo(() => {
    const yearsToInvest = targetAge - currentAge;
    const monthsToInvest = yearsToInvest * 12;
    
    // Adjust target amount for inflation
    const inflationAdjustedTarget = targetAmount * Math.pow(1 + inflationRate / 100, yearsToInvest);
    
    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToInvest);
    
    // Remaining amount needed
    const remainingAmount = Math.max(0, inflationAdjustedTarget - futureValueCurrentSavings);
    
    // Monthly SIP calculation
    const monthlyRate = expectedReturn / 12 / 100;
    let monthlySIP = 0;
    
    if (remainingAmount > 0 && monthsToInvest > 0) {
      monthlySIP = remainingAmount * monthlyRate / ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) * (1 + monthlyRate));
    }
    
    // Total amount to be invested through SIP
    const totalSIPInvestment = monthlySIP * monthsToInvest;
    
    // Growth from SIP
    const sipGrowth = remainingAmount - totalSIPInvestment;
    
    // Growth from current savings
    const savingsGrowth = futureValueCurrentSavings - currentSavings;
    
    return {
      monthlySIP: Math.round(monthlySIP),
      yearsToInvest,
      inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
      totalSIPInvestment: Math.round(totalSIPInvestment),
      sipGrowth: Math.round(sipGrowth),
      futureValueCurrentSavings: Math.round(futureValueCurrentSavings),
      savingsGrowth: Math.round(savingsGrowth),
      totalGrowth: Math.round(sipGrowth + savingsGrowth),
      finalAmount: Math.round(inflationAdjustedTarget)
    };
  }, [targetAmount, currentAge, targetAge, inflationRate, expectedReturn, currentSavings]);

  // Pie chart data - matching the exact colors from the reference image
  const pieData = [
    { name: 'Amount Invested', value: calculations.totalSIPInvestment, color: '#6366F1' }, // Orange color like in image
    { name: 'Total Growth', value: calculations.totalGrowth, color: '#10B981' } // Black color like in image
  ];

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-6">
      {/* Main Content */}
 <style>{`
        .glass-effect { 
          backdrop-filter: blur(6px); /* lighter blur */
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
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl  shadow-md">
                      <Calculator className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                     Crorepati Calculator
                    </h1>
                  </div>
                  <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
                    Calculate your wealth growth with systematic investment planning
                  </p>
                </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            {/* Target Amount */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                How many Crores (at current value) you would need to consider yourself wealthy (Rs)
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                step="1000000"
              />
              <input
                type="range"
                min="5000000"
                max="100000000"
                step="1000000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5 Crore</span>
                <span>10 Crores</span>
                <span>50 Crores</span>
                <span>100 Crores</span>
              </div>
            </div>

            {/* Current Age */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">Your current age (in years)</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                min="18"
                max="65"
              />
              <input
                type="range"
                min="18"
                max="65"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>18</span>
                <span>25</span>
                <span>35</span>
                <span>45</span>
                <span>65</span>
              </div>
            </div>

            {/* Target Age */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                The age when you want to become a Crorepati (in years)
              </label>
              <input
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                min={currentAge + 1}
                max="80"
              />
              <input
                type="range"
                min={currentAge + 1}
                max="80"
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full mt-3 accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>30</span>
                <span>40</span>
                <span>50</span>
                <span>60</span>
                <span>80</span>
              </div>
            </div>

            {/* Inflation Rate */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                The expected rate of inflation over the years (% per annum)
              </label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                min="1"
                max="15"
                step="0.5"
              />
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full mt-3 accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>3.5</span>
                <span>6</span>
                <span>10</span>
                <span>15</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                What rate of return would you expect your SIP investment to generate (% per annum)
              </label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                min="5"
                max="25"
                step="0.5"
              />
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full mt-3 accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5</span>
                <span>8</span>
                <span>12</span>
                <span>18</span>
                <span>25</span>
              </div>
            </div>

            {/* Current Savings */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">How much savings you have now (Rs)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                step="100000"
              />
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full mt-3 accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0L</span>
                <span>25L</span>
                <span>50L</span>
                <span>1Cr</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Download Button */}
         

            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Break-up of Total Payment</h3>
              
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
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#6366F1'}}></div>
                  <span className="text-sm text-gray-600">Amount Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                  <span className="text-sm text-gray-600">Total Growth</span>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4 text-center">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Monthly SIP Amount</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatCurrency(calculations.monthlySIP)} ({calculations.yearsToInvest} years you need to save )
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Amount Invested through SIP in {calculations.yearsToInvest} years</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.totalSIPInvestment)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Growth Amount</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.totalGrowth)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Your targeted Wealth Amount (inflation adjusted)</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.inflationAdjustedTarget)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Growth of your Savings Amount ({expectedReturn}% per annum)</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.futureValueCurrentSavings)}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Final Targeted Amount (Minus growth of your savings)</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(calculations.finalAmount)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Number of years you need to save</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {calculations.yearsToInvest} years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrorepatiCalculatorPage;