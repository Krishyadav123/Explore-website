import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DreamHomeCalculator = () => {
  const [form, setForm] = useState({
    years: "",
    cost: "",
    inflation: "",
    goalName: "",
    risk: "Conservative",
  });

  const [showResults, setShowResults] = useState(false);
  const [calculations, setCalculations] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const isFormComplete =
    form.years && form.cost && form.inflation && form.goalName;

  // Risk-based expected returns
  const riskReturns = {
    Conservative: 8, // 8% annual return
    Moderate: 10,    // 10% annual return
    Aggressive: 12   // 12% annual return
  };

  const calculateGoal = () => {
    const years = parseFloat(form.years);
    const currentCost = parseFloat(form.cost);
    const inflationRate = parseFloat(form.inflation) / 100;
    const annualReturn = riskReturns[form.risk] / 100;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = years * 12;

    // Calculate future value with inflation
    const futureValue = currentCost * Math.pow(1 + inflationRate, years);

    // Calculate required monthly SIP using PMT formula
    // PMT = FV × r / ((1 + r)^n - 1)
    const monthlySIP = (futureValue * monthlyReturn) / (Math.pow(1 + monthlyReturn, totalMonths) - 1);

    setCalculations({
      currentCost: currentCost,
      futureValue: futureValue,
      years: years,
      monthlySIP: monthlySIP,
      inflationRate: form.inflation,
      expectedReturn: riskReturns[form.risk]
    });

    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  if (showResults) {
    return (
      <div className="bg-gray-100 min-h-screen py-10 flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Goal Summary</h2>
            <button 
              onClick={() => setShowResults(false)}
              className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Current Target Amount */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  ₹ {formatNumber(calculations.currentCost)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Your Targeted Amount</div>
                  <div className="text-sm">(in today's value)</div>
                </div>
              </div>
            </div>

            {/* Future Value */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  ₹ {formatNumber(calculations.futureValue)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Future value of your {form.goalName}</div>
                  <div className="text-sm">(adjusting for {form.inflation}% inflation)</div>
                </div>
              </div>
            </div>

            {/* Number of Years */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {calculations.years}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Number of Years</div>
                  <div className="text-sm">You Need To Save</div>
                </div>
              </div>
            </div>

            {/* Monthly SIP Required */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  ₹ {formatNumber(calculations.monthlySIP)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Monthly SIP Investment</div>
                  <div className="text-sm">Required</div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Details:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Risk Profile:</strong> {form.risk}</p>
              <p><strong>Expected Annual Return:</strong> {calculations.expectedReturn}%</p>
              <p><strong>Inflation Rate:</strong> {form.inflation}%</p>
              <p><strong>Investment Period:</strong> {calculations.years} years</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center cursor-pointer hover:bg-orange-600 transition">
              <h3 className="font-semibold mb-2">Are you an existing client?</h3>
              <p className="text-sm">If yes, please click here and map your existing investments to this goal</p>
            </div>
            
            <div className="border-2 border-orange-500 text-orange-600 rounded-lg p-6 text-center cursor-pointer hover:bg-orange-50 transition">
              <h3 className="font-semibold mb-2">No, I do not have investments with you</h3>
              <p className="text-sm">Take me to the plan without mapping any existing investments</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-40 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Dream Home
        </h2>

        <div className="space-y-8 text-center text-gray-700">
          {/* Step 1 */}
          <p className="text-lg">
            You are planning to buy your Dream House{" "}
            <input
              type="number"
              name="years"
              value={form.years}
              onChange={handleChange}
              placeholder="20"
              className="border-b-2 border-gray-400 focus:outline-none w-28 text-center mx-2"
            />{" "}
            years.
          </p>

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
                    placeholder="10000000"
                    className="border-b-2 border-gray-400 focus:outline-none w-32 text-center mx-2"
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
                    className="border-b-2 border-gray-400 focus:outline-none w-24 text-center mx-2"
                  />{" "}
                  % and You would like to name this goal as{" "}
                  <input
                    type="text"
                    name="goalName"
                    value={form.goalName}
                    onChange={handleChange}
                    placeholder="dream"
                    className="border-b-2 border-gray-400 focus:outline-none w-32 text-center mx-2"
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
                    className="border-b-2 border-gray-400 focus:outline-none mx-2 px-5"
                  >
                    <option value="Conservative">Conservative</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Aggressive">Aggressive</option>
                  </select>{" "}
                  risk with your investments.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Button */}
        <div className="pt-10 text-center">
          <button
            disabled={!isFormComplete}
            onClick={calculateGoal}
            className={`px-6 py-2 rounded-lg transition ${
              isFormComplete
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Build My Dream Home Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamHomeCalculator;