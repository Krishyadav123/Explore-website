import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Target, Calendar, TrendingUp, DollarSign, Star, Zap } from 'lucide-react';

const GoalSettingCalculator = () => {
  const [goalAmount, setGoalAmount] = useState(10000000); // 1 crore default
  const [timeHorizon, setTimeHorizon] = useState(30); // 30 years default
  const [inflationRate, setInflationRate] = useState(8);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(0);

  // Memoized calculations with corrected formulas
  const calculations = useMemo(() => {
    const years = timeHorizon;
    const months = years * 12;
    
    // Adjust goal amount for inflation (Future Value of today's goal)
    const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, years);
    
    // Future value of current savings at expected return rate
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, years);
    
    // Remaining amount needed after accounting for current savings growth
    const remainingAmount = Math.max(0, inflationAdjustedGoal - futureValueCurrentSavings);
    
    // Monthly SIP calculation using correct PMT formula
    const monthlyRate = expectedReturn / 12 / 100;
    let monthlySIP = 0;
    let futureValueSIP = 0;
    let totalSIPInvestment = 0;
    
    if (remainingAmount > 0 && months > 0) {
      if (monthlyRate > 0) {
        // Correct PMT formula: PMT = FV * r / ((1+r)^n - 1)
        // This calculates monthly payment needed to reach future value
        monthlySIP = remainingAmount * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
        
        // Future value of SIP annuity
        futureValueSIP = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        
        // Total principal invested through SIP
        totalSIPInvestment = monthlySIP * months;
      } else {
        // If no return expected, simple division
        monthlySIP = remainingAmount / months;
        futureValueSIP = remainingAmount;
        totalSIPInvestment = remainingAmount;
      }
    }
    
    // Growth from SIP investments
    const sipGrowth = futureValueSIP - totalSIPInvestment;
    
    // Growth from current savings
    const savingsGrowth = futureValueCurrentSavings - currentSavings;
    
    // Total growth from all sources
    const totalGrowth = sipGrowth + savingsGrowth;
    
    // Total amount invested (principal only)
    const totalInvested = totalSIPInvestment + currentSavings;
    
    // Total corpus at maturity
    const totalCorpus = futureValueSIP + futureValueCurrentSavings;
    
    return {
      monthlySIP: Math.round(monthlySIP),
      inflationAdjustedGoal: Math.round(inflationAdjustedGoal),
      totalSIPInvestment: Math.round(totalSIPInvestment),
      sipGrowth: Math.round(sipGrowth),
      futureValueCurrentSavings: Math.round(futureValueCurrentSavings),
      savingsGrowth: Math.round(savingsGrowth),
      totalGrowth: Math.round(totalGrowth),
      totalInvested: Math.round(totalInvested),
      remainingAmount: Math.round(remainingAmount),
      totalCorpus: Math.round(totalCorpus),
      years: years
    };
  }, [goalAmount, timeHorizon, inflationRate, expectedReturn, currentSavings]);

  // Pie chart data - matching colors from your retirement calculator
  const pieData = [
    { name: 'Amount Invested', value: calculations.totalInvested, color: '#6366F1' }, // Orange color
    { name: 'Total Growth', value: calculations.totalGrowth, color: '#10b981' } // Dark gray/black color
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
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent py-2">
              Goal Setting Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Plan your financial goals with systematic investment and achieve your dreams
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
            {/* Goal Amount */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                What is the amount that you would like to spend on buying an item you dream - a big car or a foreign holiday or a house (Rs)
              </label>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                step="100000"
              />
              <input
                type="range"
                min="0"
                max="100000000"
                step="500000"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="w-full mt-3 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>25 Cr</span>
                <span>50 Cr</span>
                <span>75 Cr</span>
                <span>100 Cr</span>
              </div>
            </div>

            {/* Time Horizon */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">After how many years away would you need this amount?</label>
              <input
                type="number"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="1"
                max="50"
              />
              <input
                type="range"
                min="1"
                max="50"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>13</span>
                <span>25</span>
                <span>38</span>
                <span>50</span>
              </div>
            </div>

            {/* Inflation Rate */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                The expected rate of inflation over the years (% per annum)
              </label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                min="1"
                max="15"
                step="0.1"
              />
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full mt-3 accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1%</span>
                <span>4%</span>
                <span>8%</span>
                <span>12%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                What rate of return would you expect from your investment (% per annum)
              </label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                min="5"
                max="20"
                step="0.1"
              />
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full mt-3 accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5%</span>
                <span>8.75%</span>
                <span>12.5%</span>
                <span>16.25%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Current Savings */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">How much savings you have now? (Rs)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
                step="10000"
              />
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full mt-3 accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>25L</span>
                <span>50L</span>
                <span>75L</span>
                <span>1Cr</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Break-up of Total Payment</h3>
              
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
                  <div className="w-3 h-3 bg-[#6366F1] rounded-full"></div>
                  <span className="text-sm text-gray-600">Amount Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                  <span className="text-sm text-gray-600">Total Growth</span>
                </div>
              </div> 

              {/* Results */}
              <div className="space-y-4 text-center">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Monthly SIP Amount</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatCurrency(calculations.monthlySIP)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Amount Invested through SIP in {calculations.years} years</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.totalSIPInvestment)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Growth Amount</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.totalGrowth)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Your targeted Dream Amount</p>
                  <p className="text-sm text-gray-500">(Inflation adjusted)</p>
                  <p className="text-lg font-semibold text-blue-800">
                    {formatCurrency(calculations.inflationAdjustedGoal)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Growth of your Savings Amount</p>
                  <p className="text-sm text-gray-500">({expectedReturn}% per annum)</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(calculations.futureValueCurrentSavings)}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Final Targeted Amount</p>
                  <p className="text-sm text-gray-500">(Minus growth of your savings)</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(calculations.inflationAdjustedGoal)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Number of years to achieve your goal</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {calculations.years} Years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSettingCalculator;

//  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-6">
//       <style>{`
//         .glass-effect { 
//           backdrop-filter: blur(6px);
//           background: rgba(255, 255, 255, 0.85);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }
//         .card-hover { transition: all 0.2s ease; }
//         .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06); }
//       `}</style>

//       <div className="max-w-7xl mx-auto">
//         {/* Title */}
//         <div className="text-center mb-16">
//           <div className="flex items-center justify-center gap-4 mb-8">
//             <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl shadow-md">
//               <Target className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Goal Setting Calculator
//             </h1>
//           </div>
//           <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
//             Plan your financial goals with systematic investment and achieve your dreams
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Left Panel - Inputs */}
//           <div className="glass-effect rounded-3xl shadow-md w-full p-7 card-hover mx-auto">
            
//             {/* Goal Amount */}
//             <div className="mb-8">
//               <label className="block text-gray-700 font-medium mb-3">
//                 What is the amount that you would like to spend on buying an item you dream - a big car or a foreign holiday or a house (Rs)
//               </label>
//               <input
//                 type="number"
//                 value={goalAmount}
//                 onChange={(e) => setGoalAmount(Number(e.target.value))}
//                 className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 step="100000"
//               />
//               <input
//                 type="range"
//                 min="0"
//                 max="100000000"
//                 step="500000"
//                 value={goalAmount}
//                 onChange={(e) => setGoalAmount(Number(e.target.value))}
//                 className="w-full mt-3 accent-orange-500"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-1">
//                 <span>0</span>
//                 <span>25 Crore</span>
//                 <span>50 Crore</span>
//                 <span>75 Crore</span>
//                 <span>100 Crore</span>
//               </div>
//             </div>

//             {/* Time Horizon */}
//             <div className="mb-8">
//               <label className="block text-gray-700 font-medium mb-3">After how many years away would you need this amount?</label>
//               <input
//                 type="number"
//                 value={timeHorizon}
//                 onChange={(e) => setTimeHorizon(Number(e.target.value))}
//                 className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 min="1"
//                 max="50"
//               />
//               <input
//                 type="range"
//                 min="1"
//                 max="50"
//                 value={timeHorizon}
//                 onChange={(e) => setTimeHorizon(Number(e.target.value))}
//                 className="w-full mt-3 accent-blue-500"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-1">
//                 <span>1</span>
//                 <span>25</span>
//                 <span>35</span>
//                 <span>75</span>
//                 <span>100</span>
//               </div>
//             </div>

//             {/* Inflation Rate */}
//             <div className="mb-8">
//               <label className="block text-gray-700 font-medium mb-3">
//                 The expected rate of inflation over the years (% per annum)
//               </label>
//               <input
//                 type="number"
//                 value={inflationRate}
//                 onChange={(e) => setInflationRate(Number(e.target.value))}
//                 className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 min="1"
//                 max="15"
//                 step="0.1"
//               />
//               <input
//                 type="range"
//                 min="1"
//                 max="15"
//                 step="0.1"
//                 value={inflationRate}
//                 onChange={(e) => setInflationRate(Number(e.target.value))}
//                 className="w-full mt-3 accent-green-500"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-1">
//                 <span>1</span>
//                 <span>3.5</span>
//                 <span>10</span>
//                 <span>12.5</span>
//                 <span>15</span>
//               </div>
//             </div>

//             {/* Expected Return */}
//             <div className="mb-8">
//               <label className="block text-gray-700 font-medium mb-3">
//                 What rate of return would you expect from your investment (% per annum)
//               </label>
//               <input
//                 type="number"
//                 value={expectedReturn}
//                 onChange={(e) => setExpectedReturn(Number(e.target.value))}
//                 className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                 min="5"
//                 max="20"
//                 step="0.1"
//               />
//               <input
//                 type="range"
//                 min="5"
//                 max="20"
//                 step="0.1"
//                 value={expectedReturn}
//                 onChange={(e) => setExpectedReturn(Number(e.target.value))}
//                 className="w-full mt-3 accent-purple-500"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-1">
//                 <span>5</span>
//                 <span>7.5</span>
//                 <span>10</span>
//                 <span>12.5</span>
//                 <span>15</span>
//                 <span>17.5</span>
//                 <span>20</span>
//               </div>
//             </div>

//             {/* Current Savings */}
//             <div className="mb-8">
//               <label className="block text-gray-700 font-medium mb-3">How much savings you have now? (Rs)</label>
//               <input
//                 type="number"
//                 value={currentSavings}
//                 onChange={(e) => setCurrentSavings(Number(e.target.value))}
//                 className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
//                 step="10000"
//               />
//               <input
//                 type="range"
//                 min="0"
//                 max="50000000"
//                 step="100000"
//                 value={currentSavings}
//                 onChange={(e) => setCurrentSavings(Number(e.target.value))}
//                 className="w-full mt-3 accent-pink-500"
//               />
//               <div className="flex justify-between text-xs text-gray-400 mt-1">
//                 <span>0</span>
//                 <span>25 Lakhs</span>
//                 <span>2 Crore</span>
//                 <span>3.5 Crore</span>
//                 <span>5 Crore</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Results */}
//           <div className="space-y-6">
//             {/* Pie Chart */}
//             <div className="glass-effect rounded-3xl p-10 card-hover shadow-md">
//               <h3 className="text-lg font-semibold text-gray-800 mb-6">Break-up of Total Payment</h3>
              
//               <div className="relative mb-6">
//                 <ResponsiveContainer width="100%" height={350}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={80}
//                       outerRadius={140}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       formatter={(value) => [formatCurrency(value), '']}
//                       contentStyle={{
//                         backgroundColor: 'white',
//                         border: '1px solid #e5e7eb',
//                         borderRadius: '8px',
//                         boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//                       }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Legend */}
//               <div className="flex justify-center gap-6 mb-8">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                   <span className="text-sm text-gray-600">Amount Invested</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
//                   <span className="text-sm text-gray-600">Total Growth</span>
//                 </div>
//               </div> 

//               {/* Results */}
//               <div className="space-y-4 text-center">
//                 <div className="bg-orange-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Monthly SIP Amount</p>
//                   <p className="text-xl font-bold text-orange-600">
//                     {formatCurrency(calculations.monthlySIP)}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Total Amount Invested through SIP in {calculations.years} years</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formatCurrency(calculations.totalSIPInvestment)}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Total Growth Amount</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formatCurrency(calculations.totalGrowth)}
//                   </p>
//                 </div>

//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Your targeted Dream Amount</p>
//                   <p className="text-sm text-gray-500">(Inflation adjusted)</p>
//                   <p className="text-lg font-semibold text-blue-800">
//                     {formatCurrency(calculations.inflationAdjustedGoal)}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Growth of your Savings Amount</p>
//                   <p className="text-sm text-gray-500">({expectedReturn}% per annum)</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formatCurrency(calculations.futureValueCurrentSavings)}
//                   </p>
//                 </div>

//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Final Targeted Amount</p>
//                   <p className="text-sm text-gray-500">(Minus growth of your savings)</p>
//                   <p className="text-xl font-bold text-green-600">
//                     {formatCurrency(calculations.inflationAdjustedGoal)}
//                   </p>
//                 </div>

//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Number of years to achieve your goal</p>
//                   <p className="text-lg font-semibold text-blue-600">
//                     {calculations.years} Years
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>