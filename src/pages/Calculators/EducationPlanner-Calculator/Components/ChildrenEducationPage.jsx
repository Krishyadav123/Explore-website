import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { GraduationCap, Users, Calculator, Download } from "lucide-react";

const ChildrenEducationPage = () => {
  const [form, setForm] = useState({
    firstChildName: "Raju",
    secondChildName: "Rani", 
    firstChildCurrentAge: 10,
    secondChildCurrentAge: 5,
    firstChildEducationAge: 20,
    secondChildEducationAge: 20,
    firstChildCost: 500000,
    secondChildCost: 500000,
    inflationRate: 5,
    expectedReturn: 8,
    currentSavings: 10000,
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    firstChild: {},
    secondChild: {},
    totalCost: 0,
    totalMonthlySIP: 0,
    yearlyBreakdown: [],
  });

  const handleChange = (e) => {
    const value = e.target.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const validateForm = () => {
    const errors = [];
    
    if (!form.firstChildName.trim()) {
      errors.push("First child name is required");
    }
    
    if (form.firstChildCurrentAge <= 0 || form.firstChildCurrentAge > 18) {
      errors.push("First child current age must be between 1-18 years");
    }
    
    if (form.firstChildEducationAge <= form.firstChildCurrentAge) {
      errors.push("First child education age must be greater than current age");
    }
    
    if (form.firstChildCost <= 0) {
      errors.push("First child education cost must be greater than 0");
    }

    // Second child validations (optional)
    if (form.secondChildName.trim()) {
      if (form.secondChildCurrentAge <= 0 || form.secondChildCurrentAge > 18) {
        errors.push("Second child current age must be between 1-18 years");
      }
      
      if (form.secondChildEducationAge <= form.secondChildCurrentAge) {
        errors.push("Second child education age must be greater than current age");
      }
      
      if (form.secondChildCost <= 0) {
        errors.push("Second child education cost must be greater than 0");
      }
    }
    
    if (form.inflationRate <= 0 || form.inflationRate > 20) {
      errors.push("Inflation rate must be between 1-20%");
    }
    
    if (form.expectedReturn <= 0 || form.expectedReturn > 30) {
      errors.push("Expected return must be between 1-30%");
    }
    
    if (form.currentSavings < 0) {
      errors.push("Current savings cannot be negative");
    }
    
    return errors;
  };

  const calculateChildEducation = (childData) => {
    const yearsToEducation = childData.educationAge - childData.currentAge;
    const inflationAdjustedCost = childData.cost * Math.pow(1 + form.inflationRate / 100, yearsToEducation);
    const futureValueOfSavings = (form.currentSavings / 2) * Math.pow(1 + form.expectedReturn / 100, yearsToEducation);
    const remainingAmount = Math.max(0, inflationAdjustedCost - futureValueOfSavings);
    
    const months = yearsToEducation * 12;
    const monthlyRate = form.expectedReturn / 12 / 100;
    
    let monthlySIP = 0;
    if (remainingAmount > 0 && months > 0) {
      if (monthlyRate > 0) {
        monthlySIP = remainingAmount * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        monthlySIP = remainingAmount / months;
      }
    }

    return {
      yearsToEducation,
      inflationAdjustedCost: Math.round(inflationAdjustedCost),
      futureValueOfSavings: Math.round(futureValueOfSavings),
      remainingAmount: Math.round(remainingAmount),
      monthlySIP: Math.round(monthlySIP),
    };
  };

  const calculateEducationPlan = () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      alert("Please fix the following errors:\n\n" + validationErrors.join("\n"));
      return;
    }
    
    const firstChildData = {
      name: form.firstChildName,
      currentAge: form.firstChildCurrentAge,
      educationAge: form.firstChildEducationAge,
      cost: form.firstChildCost,
    };
    
    const firstChildResults = calculateChildEducation(firstChildData);
    
    let secondChildResults = null;
    let totalMonthlySIP = firstChildResults.monthlySIP;
    let totalInflationAdjustedCost = firstChildResults.inflationAdjustedCost;
    
    if (form.secondChildName.trim()) {
      const secondChildData = {
        name: form.secondChildName,
        currentAge: form.secondChildCurrentAge,
        educationAge: form.secondChildEducationAge,
        cost: form.secondChildCost,
      };
      
      secondChildResults = calculateChildEducation(secondChildData);
      totalMonthlySIP += secondChildResults.monthlySIP;
      totalInflationAdjustedCost += secondChildResults.inflationAdjustedCost;
    }

    // Create yearly breakdown for visualization
    const maxYears = Math.max(
      firstChildResults.yearsToEducation,
      secondChildResults ? secondChildResults.yearsToEducation : 0
    );
    
    const yearlyBreakdown = [];
    for (let year = 1; year <= maxYears; year++) {
      const currentYear = new Date().getFullYear() + year;
      let yearlyInvestment = totalMonthlySIP * 12;
      let cumulativeAmount = 0;
      
      // Calculate cumulative investment with returns
      for (let i = 1; i <= year; i++) {
        cumulativeAmount = (cumulativeAmount + yearlyInvestment) * (1 + form.expectedReturn / 100);
      }
      
      yearlyBreakdown.push({
        year: currentYear,
        yearNumber: year,
        yearlyInvestment: Math.round(yearlyInvestment),
        cumulativeAmount: Math.round(cumulativeAmount),
        firstChildAge: form.firstChildCurrentAge + year,
        secondChildAge: form.secondChildCurrentAge + year,
      });
    }

    setResults({
      firstChild: { ...firstChildData, ...firstChildResults },
      secondChild: secondChildResults ? { ...{
        name: form.secondChildName,
        currentAge: form.secondChildCurrentAge,
        educationAge: form.secondChildEducationAge,
        cost: form.secondChildCost,
      }, ...secondChildResults } : null,
      totalCost: totalInflationAdjustedCost,
      totalMonthlySIP,
      yearlyBreakdown,
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
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Children Education Planner
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Plan and secure your children's educational future with smart investment strategies
          </p>
        </div>

        {/* Form */}
        <div className="glass-effect rounded-3xl shadow-md p-8 mb-8 card-hover">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* First Child Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">First Child Details</h3>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter your first child name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstChildName"
                  value={form.firstChildName}
                  onChange={handleChange}
                  placeholder="Enter child name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter your first child current age (in years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="firstChildCurrentAge"
                  value={form.firstChildCurrentAge}
                  onChange={handleChange}
                  min="1"
                  max="18"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter the age at which your first child would be ready for professional education (in years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="firstChildEducationAge"
                  value={form.firstChildEducationAge}
                  onChange={handleChange}
                  min={form.firstChildCurrentAge + 1}
                  max="30"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter the amount you would need at today's cost to fulfill your first child educational needs (Rs) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="firstChildCost"
                  value={form.firstChildCost}
                  onChange={handleChange}
                  min="10000"
                  step="10000"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Second Child Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Second Child Details (Optional)</h3>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter your second child name
                </label>
                <input
                  type="text"
                  name="secondChildName"
                  value={form.secondChildName}
                  onChange={handleChange}
                  placeholder="Enter child name (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter your second child current age (in years)
                </label>
                <input
                  type="number"
                  name="secondChildCurrentAge"
                  value={form.secondChildCurrentAge}
                  onChange={handleChange}
                  min="1"
                  max="18"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter the age at which your second child would be ready for professional education (in years)
                </label>
                <input
                  type="number"
                  name="secondChildEducationAge"
                  value={form.secondChildEducationAge}
                  onChange={handleChange}
                  min={form.secondChildCurrentAge + 1}
                  max="30"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter the amount you would need at today's cost to fulfill your second child educational needs (Rs)
                </label>
                <input
                  type="number"
                  name="secondChildCost"
                  value={form.secondChildCost}
                  onChange={handleChange}
                  min="10000"
                  step="10000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Investment Parameters */}
            <div className="col-span-2 mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calculator className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Investment Parameters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    The expected rate of inflation over the years (% per annum) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="inflationRate"
                    value={form.inflationRate}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    step="0.1"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    What rate of return would you expect your investment? (% per annum) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="expectedReturn"
                    value={form.expectedReturn}
                    onChange={handleChange}
                    min="1"
                    max="30"
                    step="0.1"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    How much savings you have now? (Rs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="currentSavings"
                    value={form.currentSavings}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={calculateEducationPlan}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
            {/* {showResults && (
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            )} */}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="space-y-8"
            >
              {/* Results Table */}
              <div className="glass-effect rounded-3xl shadow-md p-8 card-hover">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Result</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="px-4 py-3 text-left font-medium">Education Planner</th>
                        <th className="px-4 py-3 text-center font-medium">Cost of {results.firstChild.name}'s education</th>
                        {results.secondChild && (
                          <th className="px-4 py-3 text-center font-medium">Cost of {results.secondChild.name}'s education</th>
                        )}
                        <th className="px-4 py-3 text-center font-medium">Total cost for {results.secondChild ? 'both' : 'education'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Amount at today's prices</td>
                        <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(results.firstChild.cost)}</td>
                        {results.secondChild && (
                          <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(results.secondChild.cost)}</td>
                        )}
                        <td className="px-4 py-3 text-center font-semibold text-gray-900">
                          {formatCurrency(results.firstChild.cost + (results.secondChild ? results.secondChild.cost : 0))}
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Your child will take up professional education in</td>
                        <td className="px-4 py-3 text-center text-gray-700">{results.firstChild.yearsToEducation} year(s)</td>
                        {results.secondChild && (
                          <td className="px-4 py-3 text-center text-gray-700">{results.secondChild.yearsToEducation} year(s)</td>
                        )}
                        <td className="px-4 py-3 text-center text-gray-500">-</td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Expected rate of return from investments (% per annum)</td>
                        <td className="px-4 py-3 text-center text-gray-700">{form.expectedReturn}%</td>
                        {results.secondChild && (
                          <td className="px-4 py-3 text-center text-gray-700">{form.expectedReturn}%</td>
                        )}
                        <td className="px-4 py-3 text-center text-gray-500">-</td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Future cost of education (inflation adjusted)</td>
                        <td className="px-4 py-3 text-center text-blue-600 font-semibold">{formatCurrency(results.firstChild.inflationAdjustedCost)}</td>
                        {results.secondChild && (
                          <td className="px-4 py-3 text-center text-green-600 font-semibold">{formatCurrency(results.secondChild.inflationAdjustedCost)}</td>
                        )}
                        <td className="px-4 py-3 text-center font-semibold text-gray-900">{formatCurrency(results.totalCost)}</td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Your current savings amount</td>
                        <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(form.currentSavings / (results.secondChild ? 2 : 1))}</td>
                        {results.secondChild && (
                          <td className="px-4 py-3 text-center text-gray-700">{formatCurrency(form.currentSavings / 2)}</td>
                        )}
                        <td className="px-4 py-3 text-center font-semibold text-gray-900">{formatCurrency(form.currentSavings)}</td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50 bg-blue-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Monthly Savings required</td>
                        <td className="px-4 py-3 text-center text-blue-600 font-bold">{formatCurrency(results.firstChild.monthlySIP)}</td>
                        {results.secondChild && (
                          <td className="px-4 py-3 text-center text-green-600 font-bold">{formatCurrency(results.secondChild.monthlySIP)}</td>
                        )}
                        <td className="px-4 py-3 text-center font-bold text-purple-600 text-lg">{formatCurrency(results.totalMonthlySIP)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">{results.firstChild.name}'s Education</h4>
                    <div className="text-sm text-blue-700">
                      <p>Timeline: {results.firstChild.yearsToEducation} years</p>
                      <p>Monthly SIP: {formatCurrency(results.firstChild.monthlySIP)}</p>
                      <p>Future Cost: {formatCurrency(results.firstChild.inflationAdjustedCost)}</p>
                    </div>
                  </div>
                  
                  {results.secondChild && (
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">{results.secondChild.name}'s Education</h4>
                      <div className="text-sm text-green-700">
                        <p>Timeline: {results.secondChild.yearsToEducation} years</p>
                        <p>Monthly SIP: {formatCurrency(results.secondChild.monthlySIP)}</p>
                        <p>Future Cost: {formatCurrency(results.secondChild.inflationAdjustedCost)}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-800 mb-2">Total Investment Plan</h4>
                    <div className="text-sm text-purple-700">
                      <p>Monthly SIP: {formatCurrency(results.totalMonthlySIP)}</p>
                      <p>Total Future Cost: {formatCurrency(results.totalCost)}</p>
                      <p>Current Savings: {formatCurrency(form.currentSavings)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              {/* <div className="glass-effect rounded-3xl shadow-md p-8 card-hover">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Investment Growth Projection</h3>
                
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.yearlyBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(value), name]}
                        labelFormatter={(label) => `Year: ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cumulativeAmount"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Cumulative Investment Value"
                      />
                      <Line
                        type="monotone"
                        dataKey="yearlyInvestment"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Annual Investment"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChildrenEducationPage;