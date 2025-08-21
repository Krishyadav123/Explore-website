import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DreamHomeForm = () => {
  const [form, setForm] = useState({
    years: "",
    cost: "",
    inflation: "",
    goalName: "",
    risk: "Conservative",
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    futureCost: 0,
    monthlyInvestment: 0,
    totalInvestment: 0,
    expectedReturn: 0
  });

  // Risk profile to expected return mapping
  const riskProfiles = {
    Conservative: { return: 8, description: 'Low risk, steady returns through debt funds, FDs' },
    Moderate: { return: 12, description: 'Balanced mix of equity and debt investments' },
    Aggressive: { return: 15, description: 'High growth potential through equity investments' }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Calculate the financial plan
  const calculateGoal = () => {
    const { years, cost, inflation, risk } = form;
    const expectedReturn = riskProfiles[risk].return;
    
    // Step 1: Calculate future cost due to inflation
    const futureCost = parseFloat(cost) * Math.pow(1 + parseFloat(inflation)/100, parseFloat(years));
    
    // Step 2: Calculate monthly SIP required
    const monthlyReturn = expectedReturn / (12 * 100);
    const months = parseFloat(years) * 12;
    
    // SIP formula: FV = PMT × [((1 + r)^n - 1) / r]
    // Solving for PMT: PMT = FV / [((1 + r)^n - 1) / r]
    const factor = (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
    const monthlyInvestment = futureCost / factor;
    
    // Total investment over the period
    const totalInvestment = monthlyInvestment * months;

    setResults({
      futureCost: Math.round(futureCost),
      monthlyInvestment: Math.round(monthlyInvestment),
      totalInvestment: Math.round(totalInvestment),
      expectedReturn
    });
    
    setShowResults(true);
  };

  // Check if all fields are filled
  const isFormComplete = form.years && form.cost && form.inflation && form.goalName;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (showResults) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Goal Summary</h2>
            <p className="text-lg text-gray-600">Your "{form.goalName}" Financial Plan</p>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Current Target */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-sm opacity-90 mb-2">Your Targeted Amount</div>
              <div className="text-3xl font-bold">{formatCurrency(parseFloat(form.cost))}</div>
              <div className="text-sm opacity-90">(in today's value)</div>
            </div>

            {/* Future Value */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-sm opacity-90 mb-2">Future value of your Dream Home</div>
              <div className="text-3xl font-bold">{formatCurrency(results.futureCost)}</div>
              <div className="text-sm opacity-90">(adjusting for {form.inflation}% inflation)</div>
            </div>

            {/* Time Period */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-sm opacity-90 mb-2">Number of Years</div>
              <div className="text-3xl font-bold">{form.years}</div>
              <div className="text-sm opacity-90">You Need To Save</div>
            </div>

            {/* Monthly SIP */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-sm opacity-90 mb-2">Monthly SIP Investment</div>
              <div className="text-3xl font-bold">{formatCurrency(results.monthlyInvestment)}</div>
              <div className="text-sm opacity-90">Required at {results.expectedReturn}% returns</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Investment:</span>
                  <span className="font-medium">{formatCurrency(results.totalInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Growth:</span>
                  <span className="font-medium text-green-600">{formatCurrency(results.futureCost - results.totalInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Profile:</span>
                  <span className="font-medium">{form.risk}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">How We Calculated</h3>
              <div className="space-y-2 text-sm text-blue-600">
                <div>
                  <strong>Step 1:</strong> Adjusted for {form.inflation}% inflation over {form.years} years
                </div>
                <div>
                  <strong>Step 2:</strong> Used SIP formula with {results.expectedReturn}% expected returns
                </div>
                <div>
                  <strong>Step 3:</strong> {riskProfiles[form.risk].description}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowResults(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Modify Goal
            </button>
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Start Investing
            </button>
          </div>

          {/* Formula Explanation */}
          <div className="mt-8 bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h4 className="font-semibold text-yellow-800 mb-2">Financial Formulas Used:</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Future Value:</strong> FV = PV × (1 + inflation_rate)^years</p>
              <p><strong>Monthly SIP:</strong> PMT = FV / [((1 + r)^n - 1) / r]</p>
              <p>Where: r = monthly return rate, n = number of months</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-40 flex items-center justify-center min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Dream Home Planning
        </h2>

        <div className="space-y-8 text-center text-gray-700">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg">
              You are planning to buy your Dream House{" "}
              <input
                type="number"
                name="years"
                value={form.years}
                onChange={handleChange}
                placeholder="5"
                className="border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 w-20 text-center mx-2 text-blue-600 font-semibold"
              />{" "}
              years from now.
            </p>
          </motion.div>

          {/* Step 2 */}
          <AnimatePresence>
            {form.years && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  The cost of this House would be around ₹{" "}
                  <input
                    type="number"
                    name="cost"
                    value={form.cost}
                    onChange={handleChange}
                    placeholder="3,00,000"
                    className="border-b-2 border-green-400 focus:outline-none focus:border-green-600 w-32 text-center mx-2 text-green-600 font-semibold"
                  />{" "}
                  in today's value.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 */}
          <AnimatePresence>
            {form.cost && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  You assume the inflation to be{" "}
                  <input
                    type="number"
                    name="inflation"
                    value={form.inflation}
                    onChange={handleChange}
                    placeholder="5"
                    className="border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 w-16 text-center mx-2 text-purple-600 font-semibold"
                  />{" "}
                  % and You would like to name this goal as{" "}
                  <input
                    type="text"
                    name="goalName"
                    value={form.goalName}
                    onChange={handleChange}
                    placeholder="My Dream Home"
                    className="border-b-2 border-orange-400 focus:outline-none focus:border-orange-600 w-36 text-center mx-2 text-orange-600 font-semibold"
                  />
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4 */}
          <AnimatePresence>
            {form.inflation && form.goalName && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg">
                  You can take{" "}
                  <select
                    name="risk"
                    value={form.risk}
                    onChange={handleChange}
                    className="border-b-2 border-red-400 focus:outline-none focus:border-red-600 mx-2 px-2 text-red-600 font-semibold bg-transparent"
                  >
                    <option value="Conservative">Conservative (8% returns)</option>
                    <option value="Moderate">Moderate (12% returns)</option>
                    <option value="Aggressive">Aggressive (15% returns)</option>
                  </select>{" "}
                  risk with your investments.
                </p>
                
                {/* Risk Profile Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 p-4 bg-red-50 rounded-lg"
                >
                  <p className="text-sm text-red-600">
                    <strong>{form.risk} Profile:</strong> {riskProfiles[form.risk].description}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Button */}
        <motion.div 
          className="pt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={calculateGoal}
            disabled={!isFormComplete}
            className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all transform ${
              isFormComplete
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isFormComplete ? "Build My Dream Home Goal 🏠" : "Complete All Fields Above"}
          </button>
          
          {isFormComplete && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mt-2"
            >
              Click to see your personalized investment plan
            </motion.p>
          )}
        </motion.div>
        </motion.div>
      </div>
  );
};

export default DreamHomeForm;