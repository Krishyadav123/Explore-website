import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const MutualFundCalculatorPage = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [investmentPeriod, setInvestmentPeriod] = useState(120); // in months
  const [expectedReturn, setExpectedReturn] = useState(12.5);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);

  // Memoized calculations
  const calculations = useMemo(() => {
    const monthlyAmount = monthlyInvestment;
    const months = investmentPeriod;
    const annualReturn = expectedReturn / 100;
    const monthlyReturn = annualReturn / 12;
    const yearlyStepUp = stepUpPercentage / 100;

    // Without Step Up (standard SIP formula)
    const totalInvestedWithoutStepUp = monthlyAmount * months;
    const withoutStepUpAmount =
      monthlyAmount *
      ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) *
      (1 + monthlyReturn);
    const growthWithoutStepUp =
      withoutStepUpAmount - totalInvestedWithoutStepUp;

    // With Step Up (corrected loop)
    let totalInvestedWithStepUp = 0;
    let futureValueWithStepUp = 0;
    let currentSIPAmount = monthlyAmount;

    for (let month = 1; month <= months; month++) {
      const remainingMonths = months - month;
      const futureValueOfThisInvestment =
        currentSIPAmount * Math.pow(1 + monthlyReturn, remainingMonths);
      futureValueWithStepUp += futureValueOfThisInvestment;
      totalInvestedWithStepUp += currentSIPAmount;

      // Increase SIP after every 12 months
      if (month % 12 === 0) {
        currentSIPAmount = currentSIPAmount * (1 + yearlyStepUp);
      }
    }

    const growthWithStepUp =
      futureValueWithStepUp - totalInvestedWithStepUp;

    return {
      // Without Step Up
      totalInvestedWithoutStepUp: Math.round(totalInvestedWithoutStepUp),
      growthWithoutStepUp: Math.round(growthWithoutStepUp),
      futureValueWithoutStepUp: Math.round(withoutStepUpAmount),

      // With Step Up
      totalInvestedWithStepUp: Math.round(totalInvestedWithStepUp),
      growthWithStepUp: Math.round(growthWithStepUp),
      futureValueWithStepUp: Math.round(futureValueWithStepUp),

      // Yearly breakdown for summary table
      yearlyBreakdown: generateYearlyBreakdown(
        monthlyAmount,
        months,
        yearlyStepUp
      ),
    };
  }, [monthlyInvestment, investmentPeriod, expectedReturn, stepUpPercentage]);

  // Generate yearly breakdown
  function generateYearlyBreakdown(monthlyAmount, totalMonths, yearlyStepUp) {
    const breakdown = [];
    let currentSIPAmount = monthlyAmount;
    let cumulativeInvestment = 0;

    for (let year = 1; year <= Math.ceil(totalMonths / 12); year++) {
      const monthsInYear = Math.min(
        12,
        totalMonths - (year - 1) * 12
      );
      const yearlyInvestment = currentSIPAmount * monthsInYear;
      cumulativeInvestment += yearlyInvestment;

      breakdown.push({
        year: `Year ${year}`,
        sipAmount: Math.round(currentSIPAmount),
        yearlyInvestment: Math.round(yearlyInvestment),
        totalInvestment: Math.round(cumulativeInvestment),
      });

      currentSIPAmount = currentSIPAmount * (1 + yearlyStepUp);
    }

    return breakdown;
  }

  // Pie chart data for without step up
  const pieDataWithoutStepUp = [
    {
      name: 'Total SIP Amount Invested',
      value: calculations.totalInvestedWithoutStepUp,
      color: '#F59E0B',
    },
    {
      name: 'Total Growth',
      value: calculations.growthWithoutStepUp,
      color: '#1F2937',
    },
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

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
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
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              SIP Step Up Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate your SIP returns with annual step-up investments and maximize your wealth creation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Monthly Investment */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                How much you can invest through monthly SIP (Rs)
              </label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                step="1000"
              />
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>25 Lacs</span>
                <span>2 Cr</span>
                <span>3 Cr</span>
                <span>5 Cr</span>
              </div>
            </div>

            {/* Investment Period */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">How many months will you continue the SIP?</label>
              <input
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                min="12"
                max="600"
                step="1"
              />
              <input
                type="range"
                min="12"
                max="600"
                step="12"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>20y</span>
                <span>30y</span>
                <span>40y</span>
                <span>50y</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">What rate of return do you expect? (% per annum)</label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                min="1"
                max="30"
                step="0.1"
              />
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full mt-3 accent-green-500"
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

            {/* Step Up Percentage */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">How much percentage step up monthly SIP? (% per annum)</label>
              <input
                type="number"
                value={stepUpPercentage}
                onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                min="0"
                max="50"
                step="1"
              />
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={stepUpPercentage}
                onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                className="w-full mt-3 accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>1y</span>
                <span>2y</span>
                <span>4y</span>
                <span>5y</span>
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
                      data={pieDataWithoutStepUp}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieDataWithoutStepUp.map((entry, index) => (
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
                  <span className="text-sm text-gray-600">Total SIP Amount Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1F2937] rounded-full"></div>
                  <span className="text-sm text-gray-600">Total Growth</span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total SIP Amount Invested without step up</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(calculations.totalInvestedWithoutStepUp)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Growth without step up</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(calculations.growthWithoutStepUp)}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Future Value (Your SIP Investment Amount + Growth) without step up</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {formatCurrency(calculations.futureValueWithoutStepUp)}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total SIP Amount Invested with step up</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculations.totalInvestedWithStepUp)}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Growth with step up</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(calculations.growthWithStepUp)}
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Future Value (Your SIP Investment Amount + Growth) with step up</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {formatCurrency(calculations.futureValueWithStepUp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Table */}
            <div className="glass-effect rounded-3xl p-8 card-hover shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">SIP Calculator Step Up Amount Invested Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="p-3 text-left font-medium">Year</th>
                      <th className="p-3 text-left font-medium">SIP Amount / Month</th>
                      <th className="p-3 text-left font-medium">Invested Amount / Year</th>
                      <th className="p-3 text-left font-medium">Total Invested Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.yearlyBreakdown.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="p-3 border-b border-gray-200 font-medium">{row.year}</td>
                        <td className="p-3 border-b border-gray-200">{formatNumber(row.sipAmount)}</td>
                        <td className="p-3 border-b border-gray-200">{formatNumber(row.yearlyInvestment)}</td>
                        <td className="p-3 border-b border-gray-200 font-semibold">{formatNumber(row.totalInvestment)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundCalculatorPage;
