import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WealthCreationForm = () => {
  const [form, setForm] = useState({
    currentAge: "",
    targetAmount: "",
    timeHorizon: "",
    inflation: "",
    expectedReturn: "",
    risk: "Conservative",
  });

  const [showResults, setShowResults] = useState(false);
  const [calculations, setCalculations] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const isFormComplete =
    form.currentAge && form.targetAmount && form.timeHorizon && form.inflation && form.expectedReturn;

  // Risk-based expected returns (can be overridden by user input)
  const riskReturns = {
    Conservative: 6, // 6% annual return
    Moderate: 8,     // 8% annual return
    Aggressive: 10   // 10% annual return
  };

  const calculateGoal = () => {
    const currentAge = parseFloat(form.currentAge);
    const targetAmount = parseFloat(form.targetAmount);
    const timeHorizon = parseFloat(form.timeHorizon);
    const inflationRate = parseFloat(form.inflation) / 100;
    const annualReturn = parseFloat(form.expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = timeHorizon * 12;

    // Calculate future value with inflation
    const futureValue = targetAmount * Math.pow(1 + inflationRate, timeHorizon);

    // Calculate required monthly SIP using PMT formula
    // PMT = FV × r / ((1 + r)^n - 1)
    const monthlySIP = (futureValue * monthlyReturn) / (Math.pow(1 + monthlyReturn, totalMonths) - 1);

    setCalculations({
      currentAge: currentAge,
      targetAmount: targetAmount,
      futureValue: futureValue,
      timeHorizon: timeHorizon,
      monthlySIP: monthlySIP,
      inflationRate: form.inflation,
      expectedReturn: form.expectedReturn
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
<div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
  <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
    {/* Header */}
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800">Goal Summary</h2>
      <button
        onClick={() => setShowResults(false)}
        className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition duration-300 shadow-md"
      >
        ← Back
      </button>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      {/* Target Amount */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          ₹ {formatNumber(calculations.targetAmount)}
        </div>
        <div className="bg-black text-white py-3 px-4 rounded">
          <div className="font-semibold">Your Targeted Amount</div>
          <div className="text-sm">(in today's value)</div>
        </div>
      </div>

      {/* Future Value */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          ₹ {formatNumber(calculations.futureValue)}
        </div>
        <div className="bg-black text-white py-3 px-4 rounded">
          <div className="font-semibold">Future Value of Your Wealth Creation</div>
          <div className="text-sm">(adjusting for {form.inflation}% inflation)</div>
        </div>
      </div>

      {/* Number of Years */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          {calculations.timeHorizon}
        </div>
        <div className="bg-black text-white py-3 px-4 rounded">
          <div className="font-semibold">Number of Years</div>
          <div className="text-sm">You Need To Save</div>
        </div>
      </div>

      {/* Monthly SIP */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          ₹ {formatNumber(calculations.monthlySIP)}
        </div>
        <div className="bg-black text-white py-3 px-4 rounded">
          <div className="font-semibold">Monthly SIP Investment</div>
          <div className="text-sm">Required</div>
        </div>
      </div>
    </div>

    {/* Calculation Details */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Details:</h3>
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Current Age:</strong> {calculations.currentAge} years</p>
        <p><strong>Risk Profile:</strong> {form.risk}</p>
        <p><strong>Expected Annual Return:</strong> {calculations.expectedReturn}%</p>
        <p><strong>Inflation Rate:</strong> {form.inflation}%</p>
        <p><strong>Investment Period:</strong> {calculations.timeHorizon} years</p>
      </div>
    </div>

    {/* Action Options */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="bg-orange-500 text-white rounded-lg p-6 text-center cursor-pointer hover:bg-orange-600 transition duration-300 shadow-md">
        <h3 className="font-semibold mb-2 text-lg">Are you an existing client?</h3>
        <p className="text-sm opacity-90">
          If yes, please click here and map your existing investments to this goal.
        </p>
      </div>

      <div className="border-2 border-orange-500 text-orange-600 rounded-lg p-6 text-center cursor-pointer hover:bg-orange-50 transition duration-300">
        <h3 className="font-semibold mb-2 text-lg">
          No, I do not have investments with you
        </h3>
        <p className="text-sm opacity-90">
          Take me to the plan without mapping any existing investments.
        </p>
      </div>
    </div>

    {/* Final CTA */}
    <div className="text-center">
      <a
        href="https://login.exploremfs.com/signup"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
      >
        Sign up to start your Wealth Creation Journey 🚀
      </a>
    </div>
  </div>
</div>

    );
  }

  return (
    <div className="bg-gray-100 py-40 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          Wealth Creation
        </h2>

        <div className="space-y-8 text-center text-gray-700">
          {/* Step 1 */}
          <p className="text-lg">
            You are{" "}
            <input
              type="number"
              name="currentAge"
              value={form.currentAge}
              onChange={handleChange}
              placeholder="20"
              className="border-b-2 border-gray-400 focus:outline-none w-20 text-center mx-2"
            />{" "}
            years old now you require Rs{" "}
            <input
              type="number"
              name="targetAmount"
              value={form.targetAmount}
              onChange={handleChange}
              placeholder="1000000"
              className="border-b-2 border-gray-400 focus:outline-none w-32 text-center mx-2"
            />{" "}
            at today's value after{" "}
            <input
              type="number"
              name="timeHorizon"
              value={form.timeHorizon}
              onChange={handleChange}
              placeholder="10"
              className="border-b-2 border-gray-400 focus:outline-none w-20 text-center mx-2"
            />{" "}
            years for becoming wealthy.
          </p>

          {/* Step 2 */}
          <AnimatePresence>
            {form.currentAge && form.targetAmount && form.timeHorizon && (
              <motion.div
                key="step2"
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
                    className="border-b-2 border-gray-400 focus:outline-none w-20 text-center mx-2"
                  />{" "}
                  % and expect{" "}
                  <input
                    type="number"
                    name="expectedReturn"
                    value={form.expectedReturn}
                    onChange={handleChange}
                    placeholder="6"
                    className="border-b-2 border-gray-400 focus:outline-none w-20 text-center mx-2"
                  />{" "}
                  % return on your investments.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 */}
          <AnimatePresence>
            {form.inflation && form.expectedReturn && (
              <motion.div
                key="step3"
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
            Build My Wealth Creation Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WealthCreationForm;