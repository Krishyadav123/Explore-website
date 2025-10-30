import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, Calendar, TrendingDown, DollarSign, Minus, Calculator } from 'lucide-react';

const SpendingLessCalculator = () => {
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(60);
  const [savingsRate, setSavingsRate] = useState(12);
  const [incomeTaxRate, setIncomeTaxRate] = useState(7);
  const [inflationRate, setInflationRate] = useState(5);
  
  // Spending reduction inputs
  const [houseDefer, setHouseDefer] = useState(500000);
  const [homeLoanEMI, setHomeLoanEMI] = useState(30000);
  const [newCar, setNewCar] = useState(300000);
  const [familyEating, setFamilyEating] = useState(25000);
  const [lifestyleSpending, setLifestyleSpending] = useState(25000);
  const [fewerHolidays, setFewerHolidays] = useState(10000);
  const [publicTransport, setPublicTransport] = useState(10000);
  const [creditCardInterest, setCreditCardInterest] = useState(30000);
  const [personalLoan, setPersonalLoan] = useState(20000);
  const [lessShopping, setLessShopping] = useState(10000);

  // Memoized calculations
  const calculations = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate total annual savings from spending reductions
    // House defer, new car are one-time, others are monthly
    const totalAnnualSavings = houseDefer + (homeLoanEMI * 12) + newCar + (familyEating * 12) + 
                              (lifestyleSpending * 12) + (fewerHolidays * 12) + (publicTransport * 12) + 
                              (creditCardInterest * 12) + (personalLoan * 12) + (lessShopping * 12);
    
    const monthlySavings = totalAnnualSavings / 12;
    
    // Calculate real rate of return after tax and inflation
    const postTaxReturn = savingsRate * (1 - incomeTaxRate / 100);
    const realReturn = postTaxReturn - inflationRate;
    const annualRate = realReturn / 100;
    
    // Calculate future value using compound interest formula
    let futureValue = 0;
    let totalInvested = 0;
    
    if (annualRate > 0) {
      // FV = P * [((1 + r)^n - 1) / r]
      // Where P = annual savings, r = annual rate, n = years
      futureValue = totalAnnualSavings * (Math.pow(1 + annualRate, yearsToRetirement) - 1) / annualRate;
      totalInvested = totalAnnualSavings * yearsToRetirement;
    } else if (annualRate === 0) {
      // If real return is zero, just sum up the contributions
      totalInvested = totalAnnualSavings * yearsToRetirement;
      futureValue = totalInvested;
    } else {
      // If real return is negative, calculate depreciation
      totalInvested = totalAnnualSavings * yearsToRetirement;
      futureValue = totalAnnualSavings * (1 - Math.pow(1 + annualRate, yearsToRetirement)) / (-annualRate);
    }
    
    const totalGrowth = Math.max(0, futureValue - totalInvested);
    
    return {
      totalAnnualSavings: Math.round(totalAnnualSavings),
      monthlySavings: Math.round(monthlySavings),
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalGrowth: Math.round(totalGrowth),
      yearsToRetirement,
      effectiveRate: Math.round(realReturn * 100) / 100
    };
  }, [currentAge, retirementAge, savingsRate, incomeTaxRate, inflationRate, 
      houseDefer, homeLoanEMI, newCar, familyEating, lifestyleSpending, 
      fewerHolidays, publicTransport, creditCardInterest, personalLoan, lessShopping]);

  // Pie chart data
  const pieData = [
    { name: 'Amount Invested', value: calculations.totalInvested, color: '#f59e0b' },
    { name: 'Total Growth', value: calculations.totalGrowth, color: '#1f2937' }
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
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              Spending Less Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Discover how reducing your spending can accelerate your wealth building journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Personal Details Section */}
            <div className="mb-8 p-4 bg-white text-black rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              
              {/* Current Age */}
              <div className="mb-6">
                <label className="block text-black font-medium mb-3">Your Current age (in years)</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none text-black"
                  min="18"
                  max="65"
                />
              </div>

              {/* Retirement Age */}
              <div className="mb-6">
                <label className="block text-black font-medium mb-3">Age at which you want to retire (in years)</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                  min="40"
                  max="75"
                />
              </div>

              {/* Savings Rate */}
              <div className="mb-6">
                <label className="block text-black font-medium mb-3">Savings or interest rate of your current investments (% per annum)</label>
                <input
                  type="number"
                  value={savingsRate}
                  onChange={(e) => setSavingsRate(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
                  min="5"
                  max="20"
                  step="0.1"
                />
              </div>

              {/* Income Tax Rate */}
              <div className="mb-6">
                <label className="block text-black font-medium mb-3">Income Tax rate (% per annum)</label>
                <input
                  type="number"
                  value={incomeTaxRate}
                  onChange={(e) => setIncomeTaxRate(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                  min="0"
                  max="30"
                  step="0.1"
                />
              </div>

              {/* Inflation Rate */}
              <div className="mb-6">
                <label className="block text-black font-medium mb-3">Current Inflation rate (% per annum)</label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none text-black"
                  min="2"
                  max="12"
                  step="0.1"
                />
              </div>
            </div>

            {/* Spending Details Section */}
            <div className="mb-8 p-4 bg-white text-black rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Spending Details</h3>
              
              {/* House Deferral */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Deferring purchase of a house / flat (Rs.)</label>
                <input
                  type="number"
                  value={houseDefer}
                  onChange={(e) => setHouseDefer(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none text-black"
                  step="50000"
                />
              </div>

              {/* Home Loan EMI */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Reducing the Home Loan EMI (Rs.)</label>
                <input
                  type="number"
                  value={homeLoanEMI}
                  onChange={(e) => setHomeLoanEMI(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                  step="5000"
                />
              </div>

              {/* New Car */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Waiting to buy a new car (Rs.)</label>
                <input
                  type="number"
                  value={newCar}
                  onChange={(e) => setNewCar(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
                  step="50000"
                />
              </div>

              {/* Family Eating */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Eating out less with family (Rs.)</label>
                <input
                  type="number"
                  value={familyEating}
                  onChange={(e) => setFamilyEating(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                  step="1000"
                />
              </div>

              {/* Lifestyle Spending */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Reduce lifestyle spending (Rs.)</label>
                <input
                  type="number"
                  value={lifestyleSpending}
                  onChange={(e) => setLifestyleSpending(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none text-black"
                  step="1000"
                />
              </div>

              {/* Fewer Holidays */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Taking fewer holidays (Rs.)</label>
                <input
                  type="number"
                  value={fewerHolidays}
                  onChange={(e) => setFewerHolidays(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black"
                  step="5000"
                />
              </div>

              {/* Public Transport */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Taking public transport (Rs.)</label>
                <input
                  type="number"
                  value={publicTransport}
                  onChange={(e) => setPublicTransport(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:outline-none text-black"
                  step="1000"
                />
              </div>

              {/* Credit Card Interest */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Reducing the credit card interest (Rs.)</label>
                <input
                  type="number"
                  value={creditCardInterest}
                  onChange={(e) => setCreditCardInterest(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none text-black"
                  step="5000"
                />
              </div>

              {/* Personal Loan */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Closing the personal loan (Rs.)</label>
                <input
                  type="number"
                  value={personalLoan}
                  onChange={(e) => setPersonalLoan(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none text-black"
                  step="5000"
                />
              </div>

              {/* Less Shopping */}
              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Doing less shopping (Rs.)</label>
                <input
                  type="number"
                  value={lessShopping}
                  onChange={(e) => setLessShopping(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
                  step="1000"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Submit
              </button>
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
                  <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
                  <span className="text-sm text-gray-600">Amount Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1f2937] rounded-full"></div>
                  <span className="text-sm text-gray-600">Total Earnings</span>
                </div>
              </div>

              {/* Key Results */}
              <div className="text-center mb-6">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-2">By reducing your spending you will save this amount each year</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(calculations.totalAnnualSavings)}
                  </p>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">Number of Years</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {calculations.yearsToRetirement} Years
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-2">If you invest this amount, you will accumulate this amount by the time you retire</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(calculations.futureValue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details Card */}
            <div className="glass-effect rounded-3xl p-8 card-hover shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-orange-500" />
                Investment Breakdown
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Monthly Savings</span>
                  <span className="text-lg font-bold text-orange-600">
                    {formatCurrency(calculations.monthlySavings)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Amount Invested</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(calculations.totalInvested)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Growth</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(calculations.totalGrowth)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Investment Rate</span>
                  <span className="text-lg font-bold text-purple-600">
                    {savingsRate}% p.a.
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Time Horizon</span>
                  <span className="text-lg font-bold text-gray-600">
                    {calculations.yearsToRetirement} Years
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                🌟 Ready to Save More & Grow Wealth?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Small changes in spending habits can lead to significant wealth accumulation over time.
              </p>
              <p className="text-blue-100">
                Our calculator helps you visualize the long-term impact of reducing unnecessary expenses.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Spend wisely, save consistently, and build your financial future!
              </p>
              <div className="mt-8">
                <a
                  href="https://login.exploremfs.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  Start Saving Smart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingLessCalculator;