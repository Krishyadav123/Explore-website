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
} from "recharts";
import { Calculator } from "lucide-react";

const PPFCalculatorPage = () => {
  const [form, setForm] = useState({
    ppfOption: "Fixed Investment",
    annualInvestment: "",
    variableInvestments: Array(15).fill(""),
    startYear: "",
    years: 15,
    interestRate: 7.1,
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    totalInvestment: 0,
    maturityAmount: 0,
    yearlyBreakdown: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariableChange = (index, value) => {
    const newVars = [...form.variableInvestments];
    newVars[index] = value;
    setForm({ ...form, variableInvestments: newVars });
  };

  const validateForm = () => {
    const errors = [];
    
    if (form.ppfOption === "Fixed Investment") {
      if (!form.annualInvestment || parseFloat(form.annualInvestment) <= 0) {
        errors.push("Annual investment amount is required");
      } else if (parseFloat(form.annualInvestment) < 500) {
        errors.push("Minimum annual investment is ₹500");
      } else if (parseFloat(form.annualInvestment) > 150000) {
        errors.push("Maximum annual investment is ₹1,50,000");
      }
    } else {
      const hasValidInvestment = form.variableInvestments
        .slice(0, form.years)
        .some(val => val && parseFloat(val) > 0);
      
      if (!hasValidInvestment) {
        errors.push("At least one year's investment amount is required");
      }
      
      // Check individual year limits
      for (let i = 0; i < form.years; i++) {
        const investment = parseFloat(form.variableInvestments[i] || 0);
        if (investment > 0 && investment < 500) {
          errors.push(`Year ${i + 1}: Minimum investment is ₹500`);
        }
        if (investment > 150000) {
          errors.push(`Year ${i + 1}: Maximum investment is ₹1,50,000`);
        }
      }
    }
    
    if (!form.startYear) {
      errors.push("Start year is required");
    }
    
    if (!form.years || form.years < 1 || form.years > 15) {
      errors.push("Duration must be between 1 and 15 years");
    }
    
    if (!form.interestRate || form.interestRate <= 0) {
      errors.push("Interest rate is required");
    }
    
    return errors;
  };

  const calculatePPF = () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      alert("Please fix the following errors:\n\n" + validationErrors.join("\n"));
      return;
    }
    
    let balance = 0;
    let totalInvestment = 0;
    const yearlyBreakdown = [];
    const rate = form.interestRate / 100;
    const startYear = parseInt(form.startYear);

    for (let i = 0; i < form.years; i++) {
      const year = startYear + i;
      const yearNumber = i + 1;

      // Investment based on type
      const investment =
        form.ppfOption === "Variable Investment"
          ? parseFloat(form.variableInvestments[i] || 0)
          : parseFloat(form.annualInvestment || 0);

      totalInvestment += investment;

      // Opening balance is previous year's closing balance
      const openingBalance = balance;

      // Interest calculation: on opening balance + investment
      const interest = (openingBalance + investment) * rate;

      const closingBalance = openingBalance + investment + interest;

      // Loan & withdrawal rules (corrected)
      let loanPossible = "--";
      let prematureLimit = "--";

      if (yearNumber >= 3 && yearNumber <= 6) {
        // Loan from 3rd–6th year: 25% of balance at end of 2nd preceding year
        const referenceYearIndex = yearNumber - 3; // For year 3, reference year 1 (index 0)
        if (referenceYearIndex >= 0) {
          loanPossible = Math.round(
            yearlyBreakdown[referenceYearIndex]?.closingBalance * 0.25 || 0
          );
        }
      }
      
      if (yearNumber >= 7) {
        // Withdrawal from 7th year onwards: 50% of balance at end of 4th preceding year
        const referenceYearIndex = yearNumber - 5; // For year 7, reference year 3 (index 2)
        if (referenceYearIndex >= 0) {
          prematureLimit = Math.round(
            yearlyBreakdown[referenceYearIndex]?.closingBalance * 0.5 || 0
          );
        }
      }

      yearlyBreakdown.push({
        year,
        yearNumber,
        openingBalance: Math.round(openingBalance),
        investment,
        interest: Math.round(interest),
        closingBalance: Math.round(closingBalance),
        loanPossible,
        prematureLimit,
      });

      balance = closingBalance;
    }

    setResults({
      totalInvestment: Math.round(totalInvestment),
      maturityAmount: Math.round(balance),
      yearlyBreakdown,
    });
    setShowResults(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-1">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl  shadow-md">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
             PPF Calculator
            </h1>
          </div>
        
        </div>


      {/* Issues Found & Fixed Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Issues Fixed:</strong> Corrected loan calculation (3rd-6th year: 25% of balance from 2nd preceding year), 
              withdrawal calculation (7th year onwards: 50% of balance from 4th preceding year), 
              and added opening balance tracking for better transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Investment Option <span className="text-red-500">*</span>
            </label>
            <select
              name="ppfOption"
              value={form.ppfOption}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Fixed Investment</option>
              <option>Variable Investment</option>
            </select>
          </div>

          {/* Fixed Investment */}
          {form.ppfOption === "Fixed Investment" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Annual Investment (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="annualInvestment"
                value={form.annualInvestment}
                onChange={handleChange}
                placeholder="Min: ₹500, Max: ₹1,50,000"
                required
                min="500"
                max="150000"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Annual limit: ₹500 - ₹1,50,000</p>
            </div>
          )}

          {/* Variable Investment */}
          {form.ppfOption === "Variable Investment" && (
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Year-wise Investments (₹) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {form.variableInvestments.slice(0, form.years).map((val, i) => (
                  <input
                    key={i}
                    type="number"
                    placeholder={`Year ${i + 1}`}
                    value={val}
                    min="0"
                    max="150000"
                    onChange={(e) =>
                      handleVariableChange(i, e.target.value)
                    }
                    className="px-2 py-1 border rounded-lg focus:ring-1 focus:ring-blue-500"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Each year: ₹500 - ₹1,50,000 (or ₹0 to skip)</p>
            </div>
          )}

          {/* Start Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Start Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="startYear"
              value={form.startYear}
              onChange={handleChange}
              placeholder={new Date().getFullYear().toString()}
              required
              min="1990"
              max="2050"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (Years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="years"
              value={form.years}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="15"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum PPF tenure: 15 years</p>
          </div>

          {/* Rate */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Interest Rate (%) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              step="0.1"
              required
              min="1"
              max="20"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Current rate: 7.1% (FY 2024-25)</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculatePPF}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Calculate PPF Returns
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
            <h3 className="text-2xl font-bold mb-4 text-center">PPF Calculation Results</h3>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Total Investment</p>
                <p className="text-xl font-semibold text-green-600">
                  ₹{results.totalInvestment.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Maturity Amount</p>
                <p className="text-xl font-semibold text-blue-600">
                  ₹{results.maturityAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Total Interest Earned</p>
                <p className="text-xl font-semibold text-purple-600">
                  ₹{(results.maturityAmount - results.totalInvestment).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-96 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.yearlyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="closingBalance"
                    stroke="#2563eb"
                    strokeWidth={3}
                    name="Closing Balance"
                  />
                  <Line
                    type="monotone"
                    dataKey="investment"
                    stroke="#16a34a"
                    strokeWidth={2}
                    name="Investment"
                  />
                  <Line
                    type="monotone"
                    dataKey="interest"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Interest Earned"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border text-left">Year</th>
                    <th className="p-3 border text-right">Opening Balance</th>
                    <th className="p-3 border text-right">Investment</th>
                    <th className="p-3 border text-right">Interest Earned</th>
                    <th className="p-3 border text-right">Closing Balance</th>
                    <th className="p-3 border text-right">Loan Available</th>
                    <th className="p-3 border text-right">Withdrawal Available</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 border font-medium">
                        {row.year} (Y{row.yearNumber})
                      </td>
                      <td className="p-3 border text-right">
                        ₹{row.openingBalance.toLocaleString()}
                      </td>
                      <td className="p-3 border text-right text-green-600">
                        ₹{row.investment.toLocaleString()}
                      </td>
                      <td className="p-3 border text-right text-orange-600">
                        ₹{row.interest.toLocaleString()}
                      </td>
                      <td className="p-3 border text-right font-semibold text-blue-600">
                        ₹{row.closingBalance.toLocaleString()}
                      </td>
                      <td className="p-3 border text-right">
                        {row.loanPossible === "--"
                          ? "--"
                          : `₹${row.loanPossible.toLocaleString()}`}
                      </td>
                      <td className="p-3 border text-right">
                        {row.prematureLimit === "--"
                          ? "--"
                          : `₹${row.prematureLimit.toLocaleString()}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PPF Rules Information */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">PPF Rules Summary:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Loan:</strong> Available from 3rd to 6th year - 25% of balance at end of 2nd preceding year</li>
                <li>• <strong>Partial Withdrawal:</strong> From 7th year onwards - 50% of balance at end of 4th preceding year</li>
                <li>• <strong>Investment Limit:</strong> ₹500 to ₹1,50,000 per year</li>
                <li>• <strong>Lock-in Period:</strong> 15 years (extendable in blocks of 5 years)</li>
                <li>• <strong>Tax Benefit:</strong> EEE status (Exempt-Exempt-Exempt)</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PPFCalculatorPage;