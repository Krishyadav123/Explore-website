import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator, Target, Calendar, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';

const CompoundCalculatorPage = () => {
  const [principalAmount, setPrincipalAmount] = useState(2500000); // 25 lakh default
  const [interestRate, setInterestRate] = useState(12.5);
  const [period, setPeriod] = useState(20);
  const [compoundInterval, setCompoundInterval] = useState('Yearly');

  // Compound interval mapping
  const intervalMap = {
    'Yearly': 1,
    'Half-Yearly': 2,
    'Quarterly': 4,
    'Monthly': 12
  };

  // Memoized calculations
  const calculations = useMemo(() => {
    const principal = principalAmount;
    const rate = interestRate / 100;
    const time = period;
    const n = intervalMap[compoundInterval];
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = principal * Math.pow(1 + rate / n, n * time);
    const interestEarned = maturityAmount - principal;
    
    return {
      principalAmount: Math.round(principal),
      interestAmount: Math.round(interestEarned),
      maturityAmount: Math.round(maturityAmount),
      interestRate,
      period,
      compoundInterval
    };
  }, [principalAmount, interestRate, period, compoundInterval]);

  // Pie chart data - matching the exact colors from the reference image
  const pieData = [
    { name: 'Principal Amount', value: calculations.principalAmount, color: '#10B981' }, // Orange color
    { name: 'Interest Amount', value: calculations.interestAmount, color: '#6366f1' } // Black color
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
              <PiggyBank className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              Compounding Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate the power of compounding and see how your money grows over time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Principal Amount */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Principal Amount (Rs)
              </label>
              <input
                type="number"
                value={principalAmount}
                onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                step="10000"
              />
              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={principalAmount}
                onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>25 Crore</span>
                <span>50 Crore</span>
                <span>75 Crore</span>
                <span>100 Crore</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">Interest Rate (% per annum)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                min="1"
                max="30"
                step="0.1"
              />
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
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

            {/* Period */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">Period (in years)</label>
              <input
                type="number"
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                min="1"
                max="50"
              />
              <input
                type="range"
                min="1"
                max="50"
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
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

            {/* Compound Interval */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">Compound interval</label>
              <select
                value={compoundInterval}
                onChange={(e) => setCompoundInterval(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
              >
                <option value="Yearly">Yearly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
              </select>
              
              {/* Custom interval slider representation */}
              <div className="w-full mt-3 relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-500 rounded-full relative"
                    style={{ 
                      width: `${(Object.keys(intervalMap).indexOf(compoundInterval) + 1) * 25}%` 
                    }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Yearly</span>
                <span>Half-Yearly</span>
                <span>Quarterly</span>
                <span>Monthly</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-8 card-hover shadow-md">
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
                  <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                  <span className="text-sm text-gray-600">Principal Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#6366f1] rounded-full"></div>
                  <span className="text-sm text-gray-600">Interest Amount</span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Principal Amount</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(calculations.principalAmount)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Interest Rate (% per annum)</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {calculations.interestRate}%
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Period</p>
                    <p className="text-2xl font-bold text-green-600">
                      {calculations.period} Years
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Maturity Amount</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {formatCurrency(calculations.maturityAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-center">
                  <p className="text-sm text-purple-700 mb-1">Compound Interval</p>
                  <p className="font-semibold text-purple-800">{compoundInterval}</p>
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
                🌟 Ready to Harness the Power of Compounding?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Compounding is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.
              </p>
              <p className="text-blue-100">
                Our calculator demonstrates how your money can grow exponentially over time.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Start early, invest regularly, and let compounding work its magic for your financial dreams!
              </p>
              <div className="mt-8">
                <a
                  href="https://login.exploremfs.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Sign Up for Goal Planning
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundCalculatorPage;