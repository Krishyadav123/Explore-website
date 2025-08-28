import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, Calculator, PieChart as PieChartIcon, DollarSign } from "lucide-react";

const NetworthCalculatorPage = () => {
  const [assets, setAssets] = useState({
    sharesEquityMutualFunds: 500000,
    fixedIncomeAssets: 200000,
    cashBankAccounts: 300000,
    property: 200000,
    goldJewelleries: 200000,
    others: 200000,
  });

  const [liabilities, setLiabilities] = useState({
    homeLoan: 50000,
    personalOtherLoans: 250000,
    incomeTaxOwed: 200000,
    outstandingBills: 500000,
    creditCardDues: 200000,
    otherLiabilities: 20000,
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    networth: 0,
    chartData: [],
  });

  const handleAssetChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAssets({ ...assets, [e.target.name]: value });
  };

  const handleLiabilityChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setLiabilities({ ...liabilities, [e.target.name]: value });
  };

  const calculateNetworth = () => {
    const totalAssets = Object.values(assets).reduce((sum, value) => sum + value, 0);
    const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + value, 0);
    const networth = totalAssets - totalLiabilities;

    // Prepare chart data
    const chartData = [
      {
        name: "Financial Assets",
        value: totalAssets,
        color: "#f59e0b",
      },
      {
        name: "Liabilities",
        value: totalLiabilities,
        color: "#1f2937",
      },
    ];

    setResults({
      totalAssets,
      totalLiabilities,
      networth,
      chartData,
    });
    
    setShowResults(true);
  };

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-blue-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
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

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-md">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Networth Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Calculate your financial networth by evaluating your assets and liabilities
          </p>
        </div>

        {/* Calculator Form */}
        <div className="glass-effect rounded-3xl shadow-md p-8 mb-8 card-hover">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Financial Assets Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-white bg-black px-4 py-2 rounded">Financial Assets</h3>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Shares & Equity Mutual Funds (₹)
                </label>
                <input
                  type="number"
                  name="sharesEquityMutualFunds"
                  value={assets.sharesEquityMutualFunds}
                  onChange={handleAssetChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Fixed Income Assets (₹)
                </label>
                <p className="text-sm text-gray-500 mb-2">(Fixed deposits, Bonds, debt funds, PPF etc.)</p>
                <input
                  type="number"
                  name="fixedIncomeAssets"
                  value={assets.fixedIncomeAssets}
                  onChange={handleAssetChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Cash and Bank Accounts (₹)
                </label>
                <p className="text-sm text-gray-500 mb-2">(Savings accounts, Cash in hand, liquid funds, etc.)</p>
                <input
                  type="number"
                  name="cashBankAccounts"
                  value={assets.cashBankAccounts}
                  onChange={handleAssetChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Property (₹)
                </label>
                <input
                  type="number"
                  name="property"
                  value={assets.property}
                  onChange={handleAssetChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Gold and Jewelleries (₹)
                </label>
                <input
                  type="number"
                  name="goldJewelleries"
                  value={assets.goldJewelleries}
                  onChange={handleAssetChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Others (if any) (₹)
                </label>
                <input
                  type="number"
                  name="others"
                  value={assets.others}
                  onChange={handleAssetChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-100"
                />
              </div>
            </div>

            {/* Liabilities Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-white bg-black px-4 py-2 rounded">Liabilities</h3>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Home Loan (₹)
                </label>
                <input
                  type="number"
                  name="homeLoan"
                  value={liabilities.homeLoan}
                  onChange={handleLiabilityChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Personal & other Loans (₹)
                </label>
                <input
                  type="number"
                  name="personalOtherLoans"
                  value={liabilities.personalOtherLoans}
                  onChange={handleLiabilityChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Income Tax owed (₹)
                </label>
                <input
                  type="number"
                  name="incomeTaxOwed"
                  value={liabilities.incomeTaxOwed}
                  onChange={handleLiabilityChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Outstanding bills / payments (₹)
                </label>
                <input
                  type="number"
                  name="outstandingBills"
                  value={liabilities.outstandingBills}
                  onChange={handleLiabilityChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Credit Card dues (₹)
                </label>
                <input
                  type="number"
                  name="creditCardDues"
                  value={liabilities.creditCardDues}
                  onChange={handleLiabilityChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Other liabilities (if any) (₹)
                </label>
                <input
                  type="number"
                  name="otherLiabilities"
                  value={liabilities.otherLiabilities}
                  onChange={handleLiabilityChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={calculateNetworth}
              className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Chart Section */}
              <div className="glass-effect rounded-3xl shadow-md p-8 card-hover">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Asset vs Liability Distribution</h3>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {results.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: '14px' }}
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary Section */}
              <div className="glass-effect rounded-3xl shadow-md p-8 card-hover">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Networth Summary</h3>
                
                <div className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-800 font-medium mb-1">Total Assets</p>
                        <p className="text-2xl font-bold text-orange-900">{formatCurrency(results.totalAssets)}</p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-800 font-medium mb-1">Total Liabilities</p>
                        <p className="text-2xl font-bold text-red-900">{formatCurrency(results.totalLiabilities)}</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-full">
                        <Calculator className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border-l-4 ${results.networth >= 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium mb-1 ${results.networth >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                          Your Networth
                        </p>
                        <p className={`text-3xl font-bold ${results.networth >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                          {formatCurrency(results.networth)}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${results.networth >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                        <PieChartIcon className={`w-6 h-6 ${results.networth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                    </div>
                    {results.networth < 0 && (
                      <p className="text-sm text-red-600 mt-2">
                        Your liabilities exceed your assets. Consider reducing debt or increasing assets.
                      </p>
                    )}
                  </div>

                  {/* Additional Insights */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Financial Health Insight</h4>
                    <p className="text-sm text-blue-700">
                      {results.networth >= results.totalAssets * 0.5 
                        ? "Excellent! Your networth shows strong financial health."
                        : results.networth >= 0 
                        ? "Good progress! Consider reducing liabilities to improve your networth."
                        : "Focus on debt reduction and asset building to improve your financial position."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NetworthCalculatorPage;