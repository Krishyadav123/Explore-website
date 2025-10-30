import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Calculator, TrendingDown, PieChart as PieChartIcon, BarChart3, DollarSign, Percent, Calendar, Home, CreditCard, Banknote } from 'lucide-react';

const EMICalculatorPage = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(12.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [tenureType, setTenureType] = useState('years');

  // Memoized calculations
  const { results, yearlyData, pieData, emiBreakdown } = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;

    // EMI calculation using the standard formula
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    const calculatedResults = {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principalAmount: Math.round(principal),
    };

    // Generate yearly payment breakdown
    const yearlyBreakdown = [];
    let remainingPrincipal = principal;
    const years = tenureType === 'years' ? loanTenure : Math.ceil(loanTenure / 12);

    for (let year = 1; year <= Math.min(years, 20); year++) {
      const startBalance = remainingPrincipal;
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      const monthsInYear = Math.min(12, totalMonths - (year - 1) * 12);
      
      for (let month = 1; month <= monthsInYear; month++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = emi - interestPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingPrincipal -= principalPayment;
      }

      if (monthsInYear > 0) {
        yearlyBreakdown.push({
          year: `Year ${year}`,
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          balance: Math.round(Math.max(0, remainingPrincipal)),
        });
      }

      if (remainingPrincipal <= 0) break;
    }

    const calculatedPieData = [
      { name: 'Principal Amount', value: calculatedResults.principalAmount, color: '#F59E0B' },
      { name: 'Interest Amount', value: calculatedResults.totalInterest, color: '#1F2937' },
    ];

    // Monthly breakdown for the first few payments
    const monthlyBreakdown = [];
    let balance = principal;
    for (let i = 1; i <= Math.min(12, totalMonths); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      monthlyBreakdown.push({
        month: i,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance)),
      });
    }

    return {
      results: calculatedResults,
      yearlyData: yearlyBreakdown,
      pieData: calculatedPieData,
      emiBreakdown: monthlyBreakdown,
    };
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const COLORS = ['#6366f1', '#1F2937'];

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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl  shadow-md">
                          <Calculator className="w-10 h-10 text-white" />
                        </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              EMI Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate your monthly loan payments and plan your finances better
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          <div className="glass-effect rounded-3xl shadow-md w-full p-5 card-hover mx-auto">
            <div className="flex flex-col items-center gap-3 mb-10">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-sm">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Loan Parameters</h2>
            </div>

            <div className="flex flex-col w-full gap-8">
              {/* Home Loan Amount */}
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 hover:shadow transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-indigo-500" />
                  <label className="text-base font-semibold text-gray-700">Home Loan Amount (Rs)</label>
                </div>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200"
                  min="100000"
                  step="100000"
                />
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full mt-4 accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹1L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 hover:shadow transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Percent className="w-5 h-5 text-green-500" />
                  <label className="text-base font-semibold text-gray-700">Interest Rate (% per annum)</label>
                </div>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200"
                  min="1"
                  max="25"
                  step="0.1"
                />
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full mt-4 accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 hover:shadow transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <label className="text-base font-semibold text-gray-700">Loan Tenure</label>
                </div>
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200"
                  min="1"
                  max={tenureType === 'years' ? "40" : "480"}
                />
                <div className="flex gap-4 mt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="years"
                      checked={tenureType === 'years'}
                      onChange={(e) => setTenureType(e.target.value)}
                      className="accent-purple-500"
                    />
                    <span className="text-sm text-gray-600">Years</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="months"
                      checked={tenureType === 'months'}
                      onChange={(e) => setTenureType(e.target.value)}
                      className="accent-purple-500"
                    />
                    <span className="text-sm text-gray-600">Months</span>
                  </label>
                </div>
                <input
                  type="range"
                  min={tenureType === 'years' ? "1" : "12"}
                  max={tenureType === 'years' ? "40" : "480"}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full mt-4 accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
                  <span>{tenureType === 'years' ? '40 Years' : '480 Months'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500 rounded-2xl shadow-sm">
                <PieChartIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Payment Breakdown</h3>
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
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#6366f1]"></div>
                <span className="text-lg text-gray-600 font-medium">Principal Amount</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#1F2937]"></div>
                <span className="text-lg text-gray-600 font-medium">Interest Amount</span>
              </div>
            </div>

            {/* Results Section */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500 text-sm mb-2">Monthly Payment (EMI)</p>
                <p className="text-3xl font-bold text-amber-600">
                  ₹{results.emi.toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500 text-sm mb-2">Total Interest Payable</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{results.totalInterest.toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-white/90 rounded-2xl shadow-sm border border-gray-100 text-center md:col-span-2">
                <p className="text-gray-500 text-sm mb-2">Total Payment (Principal + Interest)</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{results.totalPayment.toLocaleString()}
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
            <h3 className="text-2xl font-bold text-gray-800">(EMI) Chart</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(value, name) => [
                  `₹${value.toLocaleString()}`,
                  name === 'principal' ? 'Principal' : name === 'interest' ? 'Interest' : 'Balance',
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  fontSize: '16px',
                }}
              />
              <Bar dataKey="principal" stackId="a" fill="#6366f1" radius={[0, 0, 6, 6]} />
              <Bar dataKey="interest" stackId="a" fill="#1F2937" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#6366f1]"></div>
              <span className="text-lg text-gray-600 font-medium">Principal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gray-800"></div>
              <span className="text-lg text-gray-600 font-medium">Interest</span>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded"></div>
              <span className="text-lg text-gray-600 font-medium">Balance</span>
            </div> */}
          </div>
        </div>

        {/* Payment Schedule Table */}
        <div className="glass-effect rounded-3xl p-10 card-hover shadow-md mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Payment Schedule (First 12 Months)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium">Month</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">EMI (A + B)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Principal (A)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Interest (B)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {emiBreakdown.map((payment, index) => (
                  <tr key={payment.month} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm">{payment.month}</td>
                    <td className="px-4 py-3 text-sm font-medium">Rs. {payment.emi.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">Rs. {payment.principal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">Rs. {payment.interest.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">Rs. {payment.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="glass-effect rounded-3xl p-12 card-hover shadow-md">
          <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Understanding EMI Calculations
          </h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Fixed Monthly Payment</h4>
              <p className="text-gray-600 leading-relaxed">
                EMI ensures you pay the same amount every month, making it easier to budget and plan
                your finances effectively.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <TrendingDown className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Decreasing Interest</h4>
              <p className="text-gray-600 leading-relaxed">
                As you pay off the principal, the interest component decreases while the principal
                component increases over time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Banknote className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Total Cost Planning</h4>
              <p className="text-gray-600 leading-relaxed">
                Know exactly how much you'll pay over the loan tenure, helping you make informed
                decisions about loan terms and amounts.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
              *This calculator provides estimates based on the input parameters. Actual EMI may vary
              based on processing fees, insurance, and other charges. Please consult with your bank
              or financial institution for exact calculations.
            </p>
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
                🌟 Ready to Manage Your EMIs?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Understanding your EMIs is the first step towards smart financial planning.
              </p>
              <p className="text-blue-100">
                Our EMI calculator helps you plan your loan repayments effectively.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Calculate wisely, plan meticulously, and manage your finances with ease!
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

export default EMICalculatorPage;