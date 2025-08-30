import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, Target, Calendar, TrendingUp, DollarSign, PiggyBank, Crown } from 'lucide-react';

const CrorepatiCalculatorPage = () => {
  const [targetAmount, setTargetAmount] = useState(50000000); // 5 Crores default
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(60);
  const [inflationRate, setInflationRate] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(2500000); // 25 Lakh default

  // Memoized calculations
  const calculations = useMemo(() => {
    const yearsToInvest = targetAge - currentAge;
    const monthsToInvest = yearsToInvest * 12;
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const annualInflationRate = inflationRate / 100;
    
    // Adjust target amount for inflation
    const inflationAdjustedTarget = targetAmount * Math.pow(1 + annualInflationRate, yearsToInvest);
    
    // Future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToInvest);
    
    // Required future value from SIP investments
    const requiredFromSIP = inflationAdjustedTarget - futureValueOfCurrentSavings;
    
    // Calculate required monthly SIP using future value of annuity formula
    // FV = PMT × [((1+r)^n - 1) / r]
    const requiredMonthlySIP = requiredFromSIP / (((Math.pow(1 + monthlyReturnRate, monthsToInvest) - 1) / monthlyReturnRate));
    
    // Total amount invested through SIP
    const totalSIPInvestment = requiredMonthlySIP * monthsToInvest;
    
    // Total growth from SIP
    const sipGrowth = requiredFromSIP;
    
    // Growth from current savings
    const currentSavingsGrowth = futureValueOfCurrentSavings - currentSavings;
    
    return {
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      totalSIPInvestment: Math.round(totalSIPInvestment),
      sipGrowth: Math.round(sipGrowth),
      totalGrowth: Math.round(sipGrowth + currentSavingsGrowth),
      inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
      currentSavingsGrowth: Math.round(currentSavingsGrowth),
      futureValueOfCurrentSavings: Math.round(futureValueOfCurrentSavings),
      finalAmount: Math.round(inflationAdjustedTarget),
      yearsToInvest
    };
  }, [targetAmount, currentAge, targetAge, inflationRate, expectedReturn, currentSavings]);

  // Pie chart data
  const pieData = [
    { name: 'Amount Invested', value: calculations.totalSIPInvestment + currentSavings, color: '#F59E0B' }, // Orange
    { name: 'Total Growth', value: calculations.totalGrowth, color: '#1F2937' } // Dark gray/black
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
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              Crorepati Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Plan your journey to become a crorepati with systematic investment planning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Target Wealth Amount */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                How many Crores (at current value) you would need to consider yourself wealthy (Rs)
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                step="1000000"
              />
              <input
                type="range"
                min="10000000"
                max="1000000000"
                step="10000000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 Crore</span>
                <span>25 Crores</span>
                <span>50 Crores</span>
                <span>75 Crores</span>
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
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                min="18"
                max="80"
                step="1"
              />
              <input
                type="range"
                min="18"
                max="80"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>18</span>
                <span>35</span>
                <span>50</span>
                <span>65</span>
                <span>80</span>
              </div>
            </div>

            {/* Target Age */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">The age when you want to become a Crorepati (in years)</label>
              <input
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                min={currentAge + 1}
                max="100"
                step="1"
              />
              <input
                type="range"
                min={currentAge + 1}
                max="100"
                step="1"
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full mt-3 accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>18</span>
                <span>35</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            {/* Inflation Rate */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">The expected rate of inflation over the years (% per annum)</label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                min="0"
                max="15"
                step="0.1"
              />
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full mt-3 accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>2.5</span>
                <span>5.0</span>
                <span>7.5</span>
                <span>10</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">What rate of return would you expect your SIP investment to generate (% per annum)</label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                min="5"
                max="25"
                step="0.1"
              />
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full mt-3 accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5</span>
                <span>7.5</span>
                <span>10</span>
                <span>12.5</span>
                <span>15</span>
                <span>17.5</span>
                <span>20</span>
              </div>
            </div>

            {/* Current Savings */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">How much savings you have now (Rs)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
                step="100000"
              />
              <input
                type="range"
                min="0"
                max="50000000"
                step="100000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full mt-3 accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>75L</span>
                <span>2 Crore</span>
                <span>3.5 Crore</span>
                <span>5 Crore</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-8 card-hover shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Break-up of Total Payment</h3>
              <div className="relative mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
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
                  <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                  <span className="text-sm text-gray-600">Amount Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1F2937] rounded-full"></div>
                  <span className="text-sm text-gray-600">Total Growth</span>
                </div>
              </div>

              {/* Results Cards */}
              <div className="space-y-4">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Monthly SIP Amount</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{calculations.requiredMonthlySIP.toLocaleString()} ({calculations.yearsToInvest} years you need to save)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Amount Invested through SIP in {calculations.yearsToInvest} years</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(calculations.totalSIPInvestment)}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Growth Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculations.totalGrowth)}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Your targeted Wealth Amount (Inflation adjusted)</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(calculations.inflationAdjustedTarget)}
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Growth of your Savings Amount ({expectedReturn}% per annum)</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatCurrency(calculations.currentSavingsGrowth)}
                    </p>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Final Targeted Amount (Minus growth of your savings)</p>
                    <p className="text-2xl font-bold text-pink-600">
                      {formatCurrency(calculations.finalAmount - calculations.futureValueOfCurrentSavings)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Number of years you need to save</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {calculations.yearsToInvest} years
                    </p>
                  </div>
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