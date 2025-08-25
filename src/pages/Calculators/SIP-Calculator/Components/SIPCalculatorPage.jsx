import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Calculator, TrendingUp, PieChart as PieChartIcon, BarChart3, DollarSign, Target, Calendar } from 'lucide-react';

const SIPCalculatorPage = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [duration, setDuration] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // Memoized calculations
  const { results, yearlyData, pieData } = useMemo(() => {
    const monthlyRate = expectedReturn / 12 / 100;
    const totalMonths = duration * 12;

    const futureValue =
      monthlyAmount *
      (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvested = monthlyAmount * totalMonths;
    const totalReturns = futureValue - totalInvested;

    const calculatedResults = {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalReturns: Math.round(totalReturns),
    };

    // Generate yearly growth data
    const yearlyGrowth = [];
    for (let year = 1; year <= duration; year++) {
      const months = year * 12;
      const yearlyFV =
        monthlyAmount *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      const yearlyInvested = monthlyAmount * months;
      const yearlyReturns = yearlyFV - yearlyInvested;

      yearlyGrowth.push({
        year: `Y${year}`,
        invested: Math.round(yearlyInvested),
        returns: Math.round(yearlyReturns),
        total: Math.round(yearlyFV),
      });
    }

    const calculatedPieData = [
      { name: 'Total Invested', value: calculatedResults.totalInvested, color: '#6366F1' },
      { name: 'Total Returns', value: calculatedResults.totalReturns, color: '#10B981' },
    ];

    return {
      results: calculatedResults,
      yearlyData: yearlyGrowth,
      pieData: calculatedPieData,
    };
  }, [monthlyAmount, duration, expectedReturn]);

  const COLORS = ['#6366F1', '#10B981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-6">
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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl  shadow-md">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              SIP Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate your wealth growth with systematic investment planning
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          <div className="glass-effect rounded-3xl shadow-md w-full p-5 card-hover mx-auto">
            <div className="flex flex-col items-center gap-3 mb-10">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Investment Parameters</h2>
            </div>

            <div className="flex flex-col w-full gap-8">
              {/* Monthly Investment */}
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 hover:shadow transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-indigo-500" />
                  <label className="text-base font-semibold text-gray-700">Monthly Investment</label>
                </div>
                <input
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200"
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
                  className="w-full mt-4 accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹500</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Investment Duration */}
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 hover:shadow transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <label className="text-base font-semibold text-gray-700">Duration (Years)</label>
                </div>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200"
                  min="1"
                  max="40"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full mt-4 accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 hover:shadow transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <label className="text-base font-semibold text-gray-700">Return (% p.a.)</label>
                </div>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200"
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
                  className="w-full mt-4 accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>`1`
          </div>

          {/* Pie Chart */}
          {/* Pie Chart */}
<div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
  <div className="flex items-center gap-4 mb-8">
    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-sm">
      <PieChartIcon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-800">Investment Breakdown</h3>
  </div>

  <div className="relative">
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, '']}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            fontSize: '16px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center bg-white rounded-full p-6 shadow-sm">
        <p className="text-3xl font-bold text-gray-800">{duration}</p>
        <p className="text-lg text-gray-500">Years</p>
      </div>
    </div>
  </div>

  {/* Legend */}
  <div className="flex justify-center gap-8 mt-8">
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
      <span className="text-lg text-gray-600 font-medium">Amount Invested</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
      <span className="text-lg text-gray-600 font-medium">Returns Generated</span>
    </div>
  </div>

  {/* Totals Section */}
  <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
    <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-gray-500 text-sm">Total Invested</p>
      <p className="text-2xl font-bold text-indigo-600">
        ₹{results.totalInvested.toLocaleString()}
      </p>
    </div>
    <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-gray-500 text-sm">Total Growth</p>
      <p className="text-2xl font-bold text-green-600">
        ₹{results.totalReturns.toLocaleString()}
      </p>
    </div>
    <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-gray-500 text-sm">Future Value</p>
      <p className="text-2xl font-bold text-purple-600">
        ₹{results.futureValue.toLocaleString()}
      </p>
    </div>
  </div>
</div>

        </div>

        {/* Growth Chart */}
        <div className="glass-effect rounded-3xl p-10 card-hover shadow-md mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Growth Over Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(value, name) => [
                  `₹${value.toLocaleString()}`,
                  name === 'invested' ? 'Amount Invested' : 'Returns Generated',
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  fontSize: '16px',
                }}
              />
              <Bar dataKey="invested" stackId="a" fill="#6366F1" radius={[0, 0, 6, 6]} />
              <Bar dataKey="returns" stackId="a" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Info Section */}
        <div className="glass-effect rounded-3xl p-12 card-hover shadow-md">
          <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Why Choose SIP Investment?
          </h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Power of Compounding</h4>
              <p className="text-gray-600 leading-relaxed">
                Your returns generate more returns, creating exponential wealth growth over time
                through the magic of compound interest.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Rupee Cost Averaging</h4>
              <p className="text-gray-600 leading-relaxed">
                Reduce the impact of market volatility by investing fixed amounts regularly, buying
                more units when prices are low.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Disciplined Approach</h4>
              <p className="text-gray-600 leading-relaxed">
                Build wealth systematically with automated monthly investments, removing emotions
                from investment decisions.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
              *This calculator provides estimates based on assumed rates of return. Actual returns
              may vary depending on market conditions. Mutual fund investments are subject to market
              risks. Please read all scheme related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculatorPage;
