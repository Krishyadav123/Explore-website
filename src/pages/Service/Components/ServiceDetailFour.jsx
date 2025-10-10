import React from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

const steps = [
  {
    title: "1. Estimate Future Expenses",
    desc: `In retirement planning, the first step is to calculate how much money you will need after you stop working.`,
    points: [
      "Daily living expenses (food, utilities, travel)",
      "Lifestyle needs (hobbies, vacations)",
      "Major one-time costs (e.g., housing upgrades)",
      "Healthcare and emergency fund",
    ],
    example:
      "👉 This estimate gives you the target retirement corpus you must build with mutual fund investments.",
  },
  {
    title: "2. Hybrid & Index Fund Strategies",
    desc: `During working years: Allocate a higher portion to equity index funds for growth, since retirement is a long-term goal.`,
    example:
      "👉 As you near retirement, gradually shift some allocation to hybrid funds for stability and regular income. This ensures early growth and later protection.",
  },
  {
    title: "3. Account for Inflation and Medical Costs",
    desc: `Inflation will increase your cost of living over 20–30 years of retirement. Medical costs generally rise faster than normal inflation.`,
    example:
      "👉 Invest in funds that beat inflation (equity/index funds) while keeping some portion in debt or liquid funds for medical safety.",
  },
  {
    title: "4. Regular Review and Adjustment",
    desc: `Review your retirement portfolio annually or during major life changes.`,
    points: [
      "If equity grows a lot, move some profits to debt (rebalance).",
      "If expenses rise, adjust your investment contributions.",
    ],
    example:
      "👉 Keeps your retirement plan flexible and realistic so you don’t fall short when you actually need funds.",
  },
];

const allocations = [
  {
    color: "text-green-600",
    title: "🟢 Age 25–35 (Early Career: High Growth Focus)",
    list: [
      "Equity Index / Large-cap Funds → 70%",
      "Mid/Small-cap Funds → 15%",
      "Debt / Liquid Funds → 10%",
      "Hybrid Funds → 5%",
    ],
    goal: "👉 Goal: Maximum compounding. High equity exposure is manageable due to long horizon.",
  },
  {
    color: "text-yellow-600",
    title: "🟡 Age 36–45 (Mid Career: Growth + Stability)",
    list: [
      "Equity Index / Large-cap Funds → 55%",
      "Mid/Small-cap Funds → 10%",
      "Hybrid Funds → 20%",
      "Debt / Liquid Funds → 15%",
    ],
    goal: "👉 Goal: Balance between growth and safety. Add hybrids and debt for stability.",
  },
  {
    color: "text-orange-600",
    title: "🟠 Age 46–55 (Pre-Retirement: Lower Risk)",
    list: [
      "Equity Index / Large-cap Funds → 40%",
      "Hybrid Funds → 30%",
      "Debt / Liquid Funds → 30%",
    ],
    goal: "👉 Goal: Reduce volatility. Shift gradually from equity to hybrid and debt.",
  },
  {
    color: "text-red-600",
    title: "🔴 Age 56–65 (Near Retirement: Income + Safety)",
    list: [
      "Equity Index / Large-cap Funds → 25%",
      "Hybrid Funds → 30%",
      "Debt / Liquid Funds → 45%",
    ],
    goal: "👉 Goal: Protect wealth, generate stable income, and keep limited equity for inflation hedge.",
  },
  {
    color: "text-gray-700",
    title: "⚪ 65+ (Retirement Years: Income Preservation)",
    list: [
      "Equity Index / Large-cap Funds → 15%",
      "Hybrid Conservative Funds → 25%",
      "Debt / Liquid Funds → 60%",
    ],
    goal: "👉 Goal: Steady income, liquidity for medical needs, and limited equity for inflation protection.",
  },
];

const ServiceDetailFour = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            🧓 Retirement Planning with Mutual Funds
          </h1>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-indigo-50 rounded-xl p-5 hover:bg-indigo-100 transition-all duration-200"
              >
                <CheckCircle2 className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
                  {step.points && (
                    <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
                      {step.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-sm text-indigo-700 mt-2 font-medium">
                    {step.example}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-indigo-50 rounded-xl p-6">
            <h3 className="text-indigo-800 font-semibold text-lg">
              ✅ In short:
            </h3>
            <p className="text-gray-700 text-sm mt-2 leading-relaxed">
              • Early years → focus on equity/index funds (growth). <br />
              • Mid-to-late years → shift gradually into hybrid/debt (safety +
              income). <br />
              • Throughout → review, adjust, and plan for inflation & health
              costs.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
              📊 Retirement Mutual Fund Allocation by Age
            </h2>

            <div className="space-y-6">
              {allocations.map((a, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 rounded-xl p-5 hover:bg-indigo-100 transition-all"
                >
                  <h4 className={`font-semibold mb-2 ${a.color}`}>
                    {a.title}
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {a.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-indigo-700 text-sm mt-2">{a.goal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-indigo-800 font-semibold text-lg mb-2">
              ✅ Key Takeaways
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              • Start equity-heavy, shift towards debt/hybrid with age. <br />
              • Always account for inflation & medical costs. <br />
              • Review and rebalance annually.
            </p>
          </div>

          <p className="text-center text-indigo-700 font-medium mt-8">
            💡 Plan early, review regularly, and secure your peaceful retirement!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetailFour;
