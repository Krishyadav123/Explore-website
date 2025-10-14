import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmergencyForm = () => {
  const [form, setForm] = useState({
    currentAge: "",
    monthlyExpenses: "",
    inflation: "",
    goalName: "Emergency Fund",
  });

  const [showResults, setShowResults] = useState(false);
  const [calculations, setCalculations] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const isFormComplete =
    form.currentAge && form.monthlyExpenses && form.inflation;

  const calculateGoal = () => {
    const monthlyExpenses = parseFloat(form.monthlyExpenses);
    const inflationRate = parseFloat(form.inflation) / 100;

    // Step 1: 6 months emergency fund in today's value
    const emergencyToday = monthlyExpenses * 6;

    // Step 2: Adjust for 1 year of inflation
    const emergencyFuture = Math.round(
      emergencyToday * Math.pow(1 + inflationRate, 1)
    );

    // Step 3: Monthly SIP required (12 months)
    const monthlySIP = Math.round(emergencyFuture / 12);

    setCalculations({
      emergencyToday,
      emergencyFuture,
      monthlySIP,
      years: 1,
    });

    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (showResults) {
    return (
      <div className="bg-gray-100 min-h-screen py-10 flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Goal Summary</h2>
            <button
              onClick={() => setShowResults(false)}
              className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Emergency Fund Today */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {formatCurrency(calculations.emergencyToday)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">
                    Your Targeted Emergency Fund
                  </div>
                  <div className="text-sm">(in today's value)</div>
                </div>
              </div>
            </div>

            {/* Emergency Fund Future */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {formatCurrency(calculations.emergencyFuture)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">
                    Targeted Emergency Fund (Future)
                  </div>
                  <div className="text-sm">
                    (adjusting for {form.inflation}% inflation)
                  </div>
                </div>
              </div>
            </div>

            {/* Years */}
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

            {/* Monthly SIP */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {formatCurrency(calculations.monthlySIP)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Monthly SIP Investment</div>
                  <div className="text-sm">Required</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center cursor-pointer hover:bg-orange-600 transition">
              <h3 className="font-semibold mb-2">Are you an existing client?</h3>
              <p className="text-sm">
                If yes, please click here and map your existing investments to
                this goal
              </p>
            </div>

            <div className="border-2 border-orange-500 text-orange-600 rounded-lg p-6 text-center cursor-pointer hover:bg-orange-50 transition">
              <h3 className="font-semibold mb-2">
                No, I do not have investments with you
              </h3>
              <p className="text-sm">
                Take me to the plan without mapping any existing investments
              </p>
            </div>

          </div>
          <div className="text-center mt-5">
      <a
        href="/signup"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
      >
        Sign up to start your Emegency Journey 🚀
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
          Emergency
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
            years old now and your average monthly expenses are ₹{" "}
            <input
              type="number"
              name="monthlyExpenses"
              value={form.monthlyExpenses}
              onChange={handleChange}
              placeholder="10000"
              className="border-b-2 border-gray-400 focus:outline-none w-32 text-center mx-2"
            />
            .
          </p>

          {/* Step 2 */}
          <AnimatePresence>
            {form.currentAge && form.monthlyExpenses && (
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
                  % and You would like to name this goal as{" "}
                  <input
                    type="text"
                    name="goalName"
                    value={form.goalName}
                    onChange={handleChange}
                    className="border-b-2 border-gray-400 focus:outline-none w-40 text-center mx-2"
                  />
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
            Build My Emergency Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyForm;
