import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Calendar, DollarSign, Target, Calculator } from 'lucide-react';

const FutureValueCalculatorPage = () => {
  const [currentCost, setCurrentCost] = useState(2500000); // 25 lakh default
  const [inflationRate, setInflationRate] = useState(6);
  const [numberOfYears, setNumberOfYears] = useState(10);

  // Memoized calculations
  const calculations = useMemo(() => {
    // Future Value = Present Value × (1 + inflation rate)^years
    const futureValue = currentCost * Math.pow(1 + inflationRate / 100, numberOfYears);
    const inflationImpact = futureValue - currentCost;
    
    return {
      currentCost: Math.round(currentCost),
      futureValue: Math.round(futureValue),
      inflationImpact: Math.round(inflationImpact),
      numberOfYears,
      inflationRate
    };
  }, [currentCost, inflationRate, numberOfYears]);

  // Pie chart data
  const pieData = [
    { name: 'Current Cost', value: calculations.currentCost, color: '#10b981' }, // Orange color
    { name: 'Future Cost', value: calculations.inflationImpact, color: '#6366F1' } // Dark gray/black color
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
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              Future Value Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate how inflation affects the future cost of your purchases
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Current Cost */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Current Cost (Rs)
              </label>
              <input
                type="number"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                step="50000"
              />
              <input
                type="range"
                min="0"
                max="100000000"
                step="250000"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>2.5 Crore</span>
                <span>5 Crore</span>
                <span>7.5 Crore</span>
                <span>10 Crore</span>
              </div>
            </div>

            {/* Inflation Rate */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Inflation (% per annum)
              </label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="0"
                max="20"
                step="0.1"
              />
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
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
                  <span className="text-sm text-gray-600">Current Cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#6366F1] rounded-full"></div>
                  <span className="text-sm text-gray-600">Future Cost</span>
                </div>
              </div>

              {/* Results matching reference layout */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Current Cost</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {formatCurrency(calculations.currentCost)}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Inflation (% per annum)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {calculations.inflationRate} %
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Number of Years</p>
                    <p className="text-2xl font-bold text-green-600">
                      {calculations.numberOfYears} Years
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Future Cost</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {formatCurrency(calculations.futureValue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Card */}
            <div className="glass-effect rounded-3xl p-8 card-hover shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-orange-500" />
                Inflation Impact Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Today's Cost</span>
                  <span className="text-lg font-bold text-orange-600">
                    {formatCurrency(calculations.currentCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Cost After {calculations.numberOfYears} Years</span>
                  <span className="text-lg font-bold text-purple-600">
                    {formatCurrency(calculations.futureValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Additional Cost Due to Inflation</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(calculations.inflationImpact)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Annual Inflation Rate</span>
                  <span className="text-lg font-bold text-blue-600">
                    {calculations.inflationRate}%
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Time Period</span>
                  <span className="text-lg font-bold text-green-600">
                    {calculations.numberOfYears} Years
                  </span>
                </div>

                {/* Cost Multiplier */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Cost Multiplier</span>
                  <span className="text-lg font-bold text-gray-600">
                    {(calculations.futureValue / calculations.currentCost).toFixed(2)}x
                  </span>
                </div>
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
                🌟 Ready to Plan for Your Future Costs?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Understanding the future value of your money is crucial for effective financial planning.
              </p>
              <p className="text-blue-100">
                Our calculator helps you foresee the impact of inflation on your future expenses.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Anticipate future costs, plan your savings, and secure your financial future!
              </p>
              <div className="mt-8">
                <a
                  href="https://login.exploremfs.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Plan Your Future Finances
                </a>
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
                🌟 Ready to Plan for Your Future Costs?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Understanding the future value of your money is crucial for effective financial planning.
              </p>
              <p className="text-blue-100">
                Our calculator helps you foresee the impact of inflation on your future expenses.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Anticipate future costs, plan your savings, and secure your financial future!
              </p>
              <div className="mt-8">
                <a
                  href="https://login.exploremfs.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Plan Your Future Finances
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureValueCalculatorPage;