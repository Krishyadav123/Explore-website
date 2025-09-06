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
import { Calculator, PiggyBank } from "lucide-react";

const EPFCalculatorPage = () => {
  const [form, setForm] = useState({
    currentAge: "",
    retirementAge: "",
    currentEPFBalance: "",
    employeeContribution: "",
    employerContribution: "",
    growthRate: "",
    interestRate: "",
    currentPensionBalance: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    totalEPFBalance: 0,
    totalPensionBalance: 0,
    yearlyBreakdown: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];
    
    if (!form.currentAge || parseFloat(form.currentAge) <= 0) {
      errors.push("Current age is required and must be greater than 0");
    }
    
    if (!form.retirementAge || parseFloat(form.retirementAge) <= 0) {
      errors.push("Retirement age is required and must be greater than 0");
    }
    
    if (parseFloat(form.currentAge) >= parseFloat(form.retirementAge)) {
      errors.push("Retirement age must be greater than current age");
    }
    
    if (!form.currentEPFBalance || parseFloat(form.currentEPFBalance) < 0) {
      errors.push("Current EPF balance is required and cannot be negative");
    }
    
    if (!form.employeeContribution || parseFloat(form.employeeContribution) <= 0) {
      errors.push("Employee contribution per month is required");
    }
    
    if (!form.employerContribution || parseFloat(form.employerContribution) <= 0) {
      errors.push("Employer contribution per month is required");
    }
    
    if (!form.growthRate || parseFloat(form.growthRate) < 0) {
      errors.push("Growth rate in EPF contribution is required");
    }
    
    if (!form.interestRate || parseFloat(form.interestRate) <= 0) {
      errors.push("Rate of interest is required");
    }
    
    if (!form.currentPensionBalance || parseFloat(form.currentPensionBalance) < 0) {
      errors.push("Current pension fund balance is required and cannot be negative");
    }
    
    return errors;
  };

  const calculateEPF = () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      alert("Please fix the following errors:\n\n" + validationErrors.join("\n"));
      return;
    }

    const currentAge = parseFloat(form.currentAge);
    const retirementAge = parseFloat(form.retirementAge);
    const totalYears = retirementAge - currentAge;
    
    let epfBalance = parseFloat(form.currentEPFBalance);
    let pensionBalance = parseFloat(form.currentPensionBalance);
    
    const initialEmployeeContribution = parseFloat(form.employeeContribution);
    const initialEmployerContribution = parseFloat(form.employerContribution);
    const growthRate = parseFloat(form.growthRate) / 100;
    const interestRate = parseFloat(form.interestRate) / 100;
    
    const yearlyBreakdown = [];
    
    for (let i = 0; i < totalYears; i++) {
      const age = currentAge + i;
      
      // Calculate contributions with growth
      const monthlyEmployeeContribution = initialEmployeeContribution * Math.pow(1 + growthRate, i);
      const monthlyEmployerContribution = initialEmployerContribution * Math.pow(1 + growthRate, i);
      
      // EPF Calculation
      const openingEPFBalance = epfBalance;
      const openingPensionBalance = pensionBalance;
      
      // Employee contribution goes entirely to EPF
      const annualEmployeeContribution = monthlyEmployeeContribution * 12;
      
      // Employer contribution split: 3.67% to EPF, 8.33% to Pension
      const employerToEPF = monthlyEmployerContribution * 12 * (3.67/12);
      const employerToPension = monthlyEmployerContribution * (8.33/12) * 12;
      
      // Total EPF contribution for the year
      const totalEPFContribution = annualEmployeeContribution + employerToEPF;
      
      // Interest on opening balance + contributions (simple annual calculation)
      const epfInterest = (openingEPFBalance + totalEPFContribution) * interestRate;
      const closingEPFBalance = openingEPFBalance + totalEPFContribution + epfInterest;
      
      // Pension Fund Calculation
      const pensionInterest = (openingPensionBalance + employerToPension) * interestRate;
      const closingPensionBalance = openingPensionBalance + employerToPension + pensionInterest;
      
      yearlyBreakdown.push({
        age: Math.round(age),
        openingEPFBalance: Math.round(openingEPFBalance),
        employeeContribution: Math.round(annualEmployeeContribution),
        employerContribution: Math.round(monthlyEmployerContribution * 12),
        epfContribution: Math.round(totalEPFContribution),
        closingEPFBalance: Math.round(closingEPFBalance),
        divertedToPension: Math.round(employerToPension),
        openingPensionBalance: Math.round(openingPensionBalance),
        closingPensionBalance: Math.round(closingPensionBalance),
        totalBalance: Math.round(closingEPFBalance + closingPensionBalance),
      });
      
      epfBalance = closingEPFBalance;
      pensionBalance = closingPensionBalance;
    }

    setResults({
      totalEPFBalance: Math.round(epfBalance),
      totalPensionBalance: Math.round(pensionBalance),
      totalAmount: Math.round(epfBalance + pensionBalance),
      yearlyBreakdown,
    });
    setShowResults(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-md">
            <PiggyBank className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            EPF Calculator
          </h1>
        </div>
        <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
          Calculate your Employees Provident Fund growth and retirement corpus
        </p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Age */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Current Age (in years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="currentAge"
              value={form.currentAge}
              onChange={handleChange}
              placeholder="Enter the current age"
              required
              min="18"
              max="65"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Retirement Age */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Retirement Age (in years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="retirementAge"
              value={form.retirementAge}
              onChange={handleChange}
              placeholder="Enter the retirement age"
              required
              min="50"
              max="70"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Current EPF Balance */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Current EPF Balance (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="currentEPFBalance"
              value={form.currentEPFBalance}
              onChange={handleChange}
              placeholder="Enter the amount"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Employee Contribution */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Employee Contribution per month (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="employeeContribution"
              value={form.employeeContribution}
              onChange={handleChange}
              placeholder="Enter the amount"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Usually 12% of basic salary</p>
          </div>

          {/* Employer Contribution */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Employer Contribution per month (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="employerContribution"
              value={form.employerContribution}
              onChange={handleChange}
              placeholder="Enter the amount"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Usually 12% of basic salary</p>
          </div>

          {/* Growth Rate */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Growth Rate in EPF Contribution (% per annum) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="growthRate"
              value={form.growthRate}
              onChange={handleChange}
              placeholder="Enter the growth rate"
              required
              min="0"
              max="20"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Annual salary increment rate</p>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Rate of Interest (% per annum) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              placeholder="Enter the rate of interest"
              required
              min="1"
              max="15"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Current EPF rate: 8.25% (FY 2024-25)</p>
          </div>

          {/* Current Pension Balance */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Current Pension Fund Balance (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="currentPensionBalance"
              value={form.currentPensionBalance}
              onChange={handleChange}
              placeholder="Enter the amount"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">EPS (Employee Pension Scheme) balance</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculateEPF}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          <Calculator className="inline-block w-5 h-5 mr-2" />
          Calculate EPF Returns
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">EPF Calculation Results</h3>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-gray-600 text-sm font-medium mb-2">Total EPF Balance</h4>
                <p className="text-2xl font-bold text-green-600">
                  ₹{results.totalEPFBalance?.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-gray-600 text-sm font-medium mb-2">Total Pension Balance</h4>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{results.totalPensionBalance?.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-gray-600 text-sm font-medium mb-2">Total Retirement Corpus</h4>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{results.totalAmount?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* EPF Growth Chart */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">EPF Growth Chart</h4>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.yearlyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Bar
                      dataKey="closingEPFBalance"
                      fill="#22c55e"
                      name="Closing EPF Balance"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Combined Line Chart */}
          

            {/* Detailed Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border text-left">Age</th>
                    <th className="p-3 border text-right">Opening EPF Balance</th>
                    <th className="p-3 border text-right">Employee Contribution (p.m.)</th>
                    <th className="p-3 border text-right">Employer Contribution (p.m.)</th>
                    <th className="p-3 border text-right">Closing EPF Balance</th>
                    <th className="p-3 border text-right">Diverted to Pension Fund (₹, 8.33 p.m.)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 border font-medium">{row.age}</td>
                      <td className="p-3 border text-right">
                        ₹{row.openingEPFBalance.toLocaleString()}
                      </td>
                      <td className="p-3 border text-right">
                        ₹{Math.round(row.employeeContribution / 12).toLocaleString()}
                      </td>
                      <td className="p-3 border text-right text-blue-600">
                        ₹{Math.round(row.employerContribution / 12).toLocaleString()}
                      </td>
                      <td className="p-3 border text-right font-semibold text-green-700">
                        ₹{row.closingEPFBalance.toLocaleString()}
                      </td>
                      <td className="p-3 border text-right text-orange-600">
                        ₹{Math.round(row.divertedToPension / 12).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EPF Rules Information */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">EPF Rules Summary:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Employee Contribution:</strong> 12% of basic salary (mandatory)</li>
                <li>• <strong>Employer Contribution:</strong> 12% of basic salary (3.67% to EPF + 8.33% to Pension Fund)</li>
                <li>• <strong>Interest Rate:</strong> Currently 8.25% per annum (tax-free)</li>
                <li>• <strong>Tax Benefits:</strong> EEE status - contributions, interest, and withdrawals are tax-free</li>
                <li>• <strong>Withdrawal:</strong> Full withdrawal allowed after 5 years (tax implications apply)</li>
                <li>• <strong>Pension Fund:</strong> 8.33% of employer contribution goes to EPS for pension benefits</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EPFCalculatorPage;