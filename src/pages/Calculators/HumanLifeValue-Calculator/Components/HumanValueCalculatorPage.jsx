import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Heart, TrendingUp, Calendar, DollarSign, Target, Calculator } from 'lucide-react';

const HumanValueCalculatorPage = () => {
  const [currentAnnualIncome, setCurrentAnnualIncome] = useState(2500000); // 25 lakh default
  const [expectedIncomeIncrease, setExpectedIncomeIncrease] = useState(10);
  const [outstandingLoanAmount, setOutstandingLoanAmount] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(10);

  // Memoized calculations
  const calculations = useMemo(() => {
    // Calculate cumulative income over the years with growth
    let totalIncome = 0;
    let currentIncome = currentAnnualIncome;
    
    for (let year = 0; year < numberOfYears; year++) {
      totalIncome += currentIncome;
      currentIncome = currentIncome * (1 + expectedIncomeIncrease / 100);
    }
    
    // Human Life Value = Total Future Income - Outstanding Loans
    const humanLifeValue = totalIncome - outstandingLoanAmount;
    const futureIncomeValue = totalIncome;
    
    return {
      currentAnnualIncome: Math.round(currentAnnualIncome),
      expectedIncomeIncrease,
      outstandingLoanAmount: Math.round(outstandingLoanAmount),
      numberOfYears,
      futureIncomeValue: Math.round(futureIncomeValue),
      humanLifeValue: Math.round(humanLifeValue),
      idealLifeCover: Math.round(humanLifeValue) // Same as human life value
    };
  }, [currentAnnualIncome, expectedIncomeIncrease, outstandingLoanAmount, numberOfYears]);

  // Pie chart data - showing income vs loans
  const pieData = [
    { name: 'Future Income Value', value: calculations.futureIncomeValue, color: '#10b981' },
    { name: 'Outstanding Loans', value: calculations.outstandingLoanAmount || 1, color: '#ef4444' }
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
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl shadow-md">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              Human Life Value Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate the financial value of your life for insurance planning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Current Annual Income */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Your Current Annual Income (Rs)
              </label>
              <input
                type="number"
                value={currentAnnualIncome}
                onChange={(e) => setCurrentAnnualIncome(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                step="50000"
              />
              <input
                type="range"
                min="0"
                max="50000000"
                step="250000"
                value={currentAnnualIncome}
                onChange={(e) => setCurrentAnnualIncome(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>75 Lakh</span>
                <span>2 Crore</span>
                <span>3.5 Crore</span>
                <span>5 Crore</span>
              </div>
            </div>

            {/* Expected Income Increase */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Expected increase in income (% per annum)
              </label>
              <input
                type="number"
                value={expectedIncomeIncrease}
                onChange={(e) => setExpectedIncomeIncrease(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="0"
                max="40"
                step="0.1"
              />
              <input
                type="range"
                min="0"
                max="40"
                step="0.1"
                value={expectedIncomeIncrease}
                onChange={(e) => setExpectedIncomeIncrease(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            {/* Outstanding Loan Amount */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Outstanding loan amount (Rs)
              </label>
              <input
                type="number"
                value={outstandingLoanAmount}
                onChange={(e) => setOutstandingLoanAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                step="50000"
              />
              <input
                type="range"
                min="0"
                max="50000000"
                step="250000"
                value={outstandingLoanAmount}
                onChange={(e) => setOutstandingLoanAmount(Number(e.target.value))}
                className="w-full mt-3 accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>75 Lakh</span>
                <span>2 Crore</span>
                <span>3.5 Crore</span>
                <span>5 Crore</span>
              </div>
            </div>

            {/* Number of Years */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Number of Years
              </label>
              <input
                type="number"
                value={numberOfYears}
                onChange={(e) => setNumberOfYears(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                min="1"
                max="40"
              />
              <input
                type="range"
                min="0"
                max="40"
                value={numberOfYears}
                onChange={(e) => setNumberOfYears(Number(e.target.value))}
                className="w-full mt-3 accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
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
                  <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                  <span className="text-sm text-gray-600">Future Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#ef4444] rounded-full"></div>
                  <span className="text-sm text-gray-600">Outstanding Loans</span>
                </div>
              </div>

              {/* Results matching reference layout */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Your Current Annual Income</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {formatCurrency(calculations.currentAnnualIncome)}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Expected increase in income (% per annum)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {calculations.expectedIncomeIncrease} %
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Outstanding loan amount</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(calculations.outstandingLoanAmount)}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Cumulative income that you will have to take care in next {calculations.numberOfYears} years</p>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(calculations.futureIncomeValue)}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Your ideal life cover</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {formatCurrency(calculations.idealLifeCover)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Card */}
            <div className="glass-effect rounded-3xl p-8 card-hover shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-orange-500" />
                Human Life Value Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Current Annual Income</span>
                  <span className="text-lg font-bold text-orange-600">
                    {formatCurrency(calculations.currentAnnualIncome)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Future Income ({calculations.numberOfYears} Years)</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(calculations.futureIncomeValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Outstanding Loan Amount</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(calculations.outstandingLoanAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Human Life Value</span>
                  <span className="text-lg font-bold text-purple-600">
                    {formatCurrency(calculations.humanLifeValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Annual Income Growth Rate</span>
                  <span className="text-lg font-bold text-blue-600">
                    {calculations.expectedIncomeIncrease}%
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Planning Period</span>
                  <span className="text-lg font-bold text-indigo-600">
                    {calculations.numberOfYears} Years
                  </span>
                </div>

                {/* Income Multiplier */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Life Cover Multiplier</span>
                  <span className="text-lg font-bold text-gray-600">
                    {(calculations.idealLifeCover / calculations.currentAnnualIncome).toFixed(2)}x
                  </span>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">What is Human Life Value?</h4>
                <p className="text-sm text-blue-700">
                  Human Life Value represents the economic value of your future earnings. It helps determine the ideal life insurance coverage needed to protect your family's financial future in case of an unfortunate event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanValueCalculatorPage;