import React, { useState } from "react";

const RetirementForm = () => {
  const [form, setForm] = useState({
    currentAge: "",
    retirementAge: "",
    lifeExpectancy: "",
    currentExpenses: "",
    inflationRate: "",
    expectedReturn: "",
    currentSavings: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [calculations, setCalculations] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check if all required fields are filled
  const isFormComplete =
    form.currentAge && 
    form.retirementAge && 
    form.lifeExpectancy && 
    form.currentExpenses && 
    form.inflationRate && 
    form.expectedReturn;

  const calculateRetirement = () => {
    const currentAge = parseFloat(form.currentAge);
    const retirementAge = parseFloat(form.retirementAge);
    const lifeExpectancy = parseFloat(form.lifeExpectancy);
    const currentExpenses = parseFloat(form.currentExpenses);
    const inflationRate = parseFloat(form.inflationRate) / 100;
    const expectedReturn = parseFloat(form.expectedReturn) / 100;
    const currentSavings = parseFloat(form.currentSavings) || 0;

    // Core calculations based on the methodology document
    
    // 1. Years until retirement
    const yearsToRetire = retirementAge - currentAge;
    
    // 2. Years after retirement (income needed)
    const retirementDuration = lifeExpectancy - retirementAge;
    
    // 3. Future monthly expenses at retirement
    const futureMonthlyExpenses = currentExpenses * Math.pow(1 + inflationRate, yearsToRetire);
    
    // 4. Total retirement corpus needed using Present Value of Annuity formula
    // Corpus = Future Expenses × [1 - (1 + r)^(-n)] / r
    const monthlyReturnRate = expectedReturn / 12;
    const totalRetirementMonths = retirementDuration * 12;
    
    let pvFactor;
    if (monthlyReturnRate === 0) {
      // If no return during retirement, need full amount
      pvFactor = totalRetirementMonths;
    } else {
      pvFactor = (1 - Math.pow(1 + monthlyReturnRate, -totalRetirementMonths)) / monthlyReturnRate;
    }
    
    const totalCorpusNeeded = futureMonthlyExpenses * pvFactor;
    
    // 5. Future value of current investments (if any)
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn, yearsToRetire);
    
    // 6. Additional corpus required
    const additionalCorpusRequired = Math.max(0, totalCorpusNeeded - futureValueCurrentSavings);
    
    // 7. Monthly SIP needed using Future Value formula
    // FV = PMT × [(1 + r)^n - 1] / r
    const monthlyInvestmentReturn = expectedReturn / 12;
    const totalInvestmentMonths = yearsToRetire * 12;
    
    let monthlySIP = 0;
    if (additionalCorpusRequired > 0) {
      if (monthlyInvestmentReturn === 0) {
        monthlySIP = additionalCorpusRequired / totalInvestmentMonths;
      } else {
        const fvFactor = (Math.pow(1 + monthlyInvestmentReturn, totalInvestmentMonths) - 1) / monthlyInvestmentReturn;
        monthlySIP = additionalCorpusRequired / fvFactor;
      }
    }

    setCalculations({
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentExpenses,
      futureMonthlyExpenses,
      yearsToRetire,
      retirementDuration,
      totalCorpusNeeded,
      futureValueCurrentSavings,
      additionalCorpusRequired,
      monthlySIP,
      inflationRate: form.inflationRate,
      expectedReturn: form.expectedReturn,
      currentSavings
    });

    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  if (showResults) {
    return (
      <div className="bg-gray-100 min-h-screen py-10 flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Retirement Plan Summary</h2>
            <button 
              onClick={() => setShowResults(false)}
              className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Current Monthly Expenses */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  ₹ {formatNumber(calculations.currentExpenses)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Current Monthly Expenses</div>
                  <div className="text-sm">(today's value)</div>
                </div>
              </div>
            </div>

            {/* Future Monthly Expenses */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  ₹ {formatNumber(calculations.futureMonthlyExpenses)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Future Monthly Expenses</div>
                  <div className="text-sm">(at retirement, adjusted for {form.inflationRate}% inflation)</div>
                </div>
              </div>
            </div>

            {/* Total Corpus Needed */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {formatCurrency(calculations.totalCorpusNeeded)}
                </div>
                <div className="bg-black text-white py-3 px-4 rounded">
                  <div className="font-semibold">Total Retirement Corpus Needed</div>
                  <div className="text-sm">at age {calculations.retirementAge}</div>
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
                  <div className="font-semibold">Monthly SIP Required</div>
                  <div className="text-sm">for next {calculations.yearsToRetire} years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {calculations.currentSavings > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-4">
                    {formatCurrency(calculations.currentSavings)}
                  </div>
                  <div className="bg-black text-white py-3 px-4 rounded">
                    <div className="font-semibold">Current Savings</div>
                    <div className="text-sm">(today's value)</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-4">
                    {formatCurrency(calculations.futureValueCurrentSavings)}
                  </div>
                  <div className="bg-black text-white py-3 px-4 rounded">
                    <div className="font-semibold">Future Value of Current Savings</div>
                    <div className="text-sm">at {form.expectedReturn}% return</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calculation Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p><strong>Current Age:</strong> {calculations.currentAge} years</p>
                <p><strong>Retirement Age:</strong> {calculations.retirementAge} years</p>
                <p><strong>Life Expectancy:</strong> {calculations.lifeExpectancy} years</p>
                <p><strong>Years to Retirement:</strong> {calculations.yearsToRetire} years</p>
              </div>
              <div>
                <p><strong>Retirement Duration:</strong> {calculations.retirementDuration} years</p>
                <p><strong>Expected Annual Return:</strong> {calculations.expectedReturn}%</p>
                <p><strong>Inflation Rate:</strong> {form.inflationRate}%</p>
                <p><strong>Methodology:</strong> Present Value of Annuity</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black text-white rounded-lg p-6 text-center cursor-pointer hover:bg-orange-600 transition">
              <h3 className="font-semibold mb-2">Start Your Retirement Planning</h3>
              <p className="text-sm">Begin investing ₹{formatNumber(calculations.monthlySIP)} monthly to secure your retirement</p>
            </div>
            
            <div className="border-2 border-orange-500 text-orange-600 rounded-lg p-6 text-center cursor-pointer hover:bg-orange-50 transition">
              <h3 className="font-semibold mb-2">Adjust Your Plan</h3>
              <p className="text-sm">Modify assumptions to see different scenarios</p>
            </div>
          </div>

          <div className="text-center mt-5">
      <a
        href="/signup"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
      >
        Sign up to start your Retirement Journey 🚀
      </a>
    </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-20 flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full mx-auto p-10 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          🏦 Retirement Planning Calculator
        </h2>

        <div className="space-y-8 text-center text-gray-700">
          {/* Step 1 - Basic Info */}
          <p className="text-lg">
            You are{" "}
            <input
              type="number"
              name="currentAge"
              value={form.currentAge}
              onChange={handleChange}
              placeholder="25"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-20 text-center mx-2 font-semibold"
            />{" "}
            years old and plan to retire at{" "}
            <input
              type="number"
              name="retirementAge"
              value={form.retirementAge}
              onChange={handleChange}
              placeholder="60"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-20 text-center mx-2 font-semibold"
            />{" "}
            with a life expectancy of{" "}
            <input
              type="number"
              name="lifeExpectancy"
              value={form.lifeExpectancy}
              onChange={handleChange}
              placeholder="80"
              className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-20 text-center mx-2 font-semibold"
            />{" "}
            years.
          </p>

          {/* Step 2 - Expenses */}
          {form.currentAge && form.retirementAge && form.lifeExpectancy && (
            <div className="animate-fadeIn">
              <p className="text-lg">
                Your current monthly expenses are Rs{" "}
                <input
                  type="number"
                  name="currentExpenses"
                  value={form.currentExpenses}
                  onChange={handleChange}
                  placeholder="50000"
                  className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-32 text-center mx-2 font-semibold"
                />{" "}
                and you expect inflation to be{" "}
                <input
                  type="number"
                  name="inflationRate"
                  value={form.inflationRate}
                  onChange={handleChange}
                  placeholder="6"
                  className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-20 text-center mx-2 font-semibold"
                />{" "}
                % annually.
              </p>
            </div>
          )}

          {/* Step 3 - Returns */}
          {form.currentExpenses && form.inflationRate && (
            <div className="animate-fadeIn">
              <p className="text-lg">
                You expect{" "}
                <input
                  type="number"
                  name="expectedReturn"
                  value={form.expectedReturn}
                  onChange={handleChange}
                  placeholder="12"
                  className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-20 text-center mx-2 font-semibold"
                />{" "}
                % annual returns on your investments.
              </p>
            </div>
          )}

          {/* Step 4 - Current Savings (Optional) */}
          {form.expectedReturn && (
            <div className="animate-fadeIn">
              <p className="text-lg">
                You currently have Rs{" "}
                <input
                  type="number"
                  name="currentSavings"
                  value={form.currentSavings}
                  onChange={handleChange}
                  placeholder="0"
                  className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-32 text-center mx-2 font-semibold"
                />{" "}
                already saved for retirement <span className="text-sm text-gray-500">(optional)</span>.
              </p>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <div className="pt-10 text-center">
          <button
            disabled={!isFormComplete}
            onClick={calculateRetirement}
            className={`px-8 py-3 rounded-lg text-lg font-semibold transition ${
              isFormComplete
                ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            📊 Calculate My Retirement Plan
          </button>
        </div>

        {/* Formula Note */}
        {isFormComplete && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📝 Calculation Method:</strong> This calculator uses the Present Value of Annuity formula 
              to determine the exact corpus needed, accounting for continued investment growth during retirement.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RetirementForm;