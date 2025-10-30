import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Target, Calendar, TrendingUp, DollarSign } from "lucide-react";

const SIPCalculatorPage = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [duration, setDuration] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // SIP calculations using Groww's exact formula
  const { results, pieData } = useMemo(() => {
    const annualRate = expectedReturn / 100;
    // Monthly Return = {(1 + Annual Return)^1/12} – 1
    const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
    const totalMonths = duration * 12;

    // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const futureValue = totalMonths === 0 ? 0 : 
      monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalInvested = monthlyAmount * totalMonths;
    const totalReturns = futureValue - totalInvested;

    const calculatedResults = {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalReturns: Math.round(totalReturns),
    };

    const calculatedPieData = [
      { name: 'Total Invested', value: calculatedResults.totalInvested, color: '#6366F1' },
      { name: 'Total Returns', value: calculatedResults.totalReturns, color: '#10B981' },
    ];

    return {
      results: calculatedResults,
      pieData: calculatedPieData,
    };
  }, [monthlyAmount, duration, expectedReturn]);

  const COLORS = ['#6366F1', '#10B981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            SIP Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calculate your systematic investment plan returns using Groww's formula
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Investment Parameters</h2>
            </div>

            <div className="space-y-6">
              {/* Monthly Investment */}
              <div className="p-5 bg-gray-50 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-indigo-500" />
                  <label className="text-sm font-semibold text-gray-700">Monthly Investment (₹)</label>
                </div>
                <input
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg font-bold text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  min="100"
                  step="500"
                />
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full mt-3 accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹500</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Investment Duration */}
              <div className="p-5 bg-gray-50 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <label className="text-sm font-semibold text-gray-700">Duration (Years)</label>
                </div>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg font-bold text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
                  min="1"
                  max="40"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full mt-3 accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="p-5 bg-gray-50 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <label className="text-sm font-semibold text-gray-700">Expected Return (% p.a.)</label>
                </div>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg font-bold text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  min="1"
                  max="30"
                  step="0.5"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full mt-3 accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Invested:</span>
                  <span className="font-bold text-indigo-600">₹{results.totalInvested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Returns:</span>
                  <span className="font-bold text-green-600">₹{results.totalReturns.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-800 font-semibold">Total Value:</span>
                  <span className="font-bold text-purple-600 text-lg">₹{results.futureValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Investment Breakdown</h3>
            </div>

            <div className="relative">
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center bg-white rounded-full p-4 shadow-sm">
                  <p className="text-2xl font-bold text-gray-800">{duration}</p>
                  <p className="text-sm text-gray-500">Years</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-sm text-gray-600">Amount Invested</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Returns Generated</span>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg text-center">
                <p className="text-sm text-indigo-600 font-medium">Total Invested</p>
                <p className="text-xl font-bold text-indigo-700">₹{results.totalInvested.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg text-center">
                <p className="text-sm text-green-600 font-medium">Est. Returns</p>
                <p className="text-xl font-bold text-green-700">₹{results.totalReturns.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg text-center">
                <p className="text-sm text-purple-600 font-medium">Total Value</p>
                <p className="text-2xl font-bold text-purple-700">₹{results.futureValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">How SIP Calculation Works</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Formula Used:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                M = P × (&#123;[1 + i]^n – 1&#125; / i) × (1 + i)
              </div>
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p><strong>M:</strong> Maturity Amount</p>
                <p><strong>P:</strong> Monthly Investment (₹{monthlyAmount.toLocaleString()})</p>
                <p><strong>n:</strong> Number of Payments ({duration * 12} months)</p>
                <p><strong>i:</strong> Monthly Rate ({((Math.pow(1 + expectedReturn/100, 1/12) - 1) * 100).toFixed(3)}%)</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Monthly Rate Calculation:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Monthly Rate = (1 + {expectedReturn/100})^(1/12) - 1<br/>
                = {((Math.pow(1 + expectedReturn/100, 1/12) - 1) * 100).toFixed(3)}%
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This compound interest method ensures that compounding 0.949% monthly gives exactly 12% annually, avoiding inflation of results.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">Power of Compounding</h4>
            <p className="text-gray-600 text-sm">
              Your returns generate more returns, creating exponential wealth growth over time.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">Rupee Cost Averaging</h4>
            <p className="text-gray-600 text-sm">
              Reduce market volatility impact by investing fixed amounts regularly.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">Disciplined Investing</h4>
            <p className="text-gray-600 text-sm">
              Build wealth systematically with automated monthly investments.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-3xl mx-auto">
            *This calculator provides estimates based on assumed rates of return. Actual returns may vary depending on market conditions. 
            Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
          </p>
        </div>

        <div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                🌟 Ready to Start Your SIP Journey?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Systematic Investment Plans (SIPs) are a powerful tool for wealth creation.
              </p>
              <p className="text-blue-100">
                Start your SIP journey today and achieve your financial goals with disciplined investing.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Invest smart, stay consistent, and achieve your financial dreams with SIP!
              </p>
              <div className="mt-8">
                <a
                  href="https://login.exploremfs.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Start Your SIP Journey
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculatorPage;