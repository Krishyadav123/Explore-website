import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const steps = [
  {
    title: "1. Future Education Cost Estimation",
    desc: `The first step is to calculate the expected cost of your child’s higher education — whether in India or abroad.`,
    list: [
      "Include tuition fees, accommodation, books, travel, and other living expenses.",
      "Adjust the estimate with education inflation (8–10% annually) so that your target corpus is realistic.",
    ],
  },
  {
    title: "2. Time Horizon Based Fund Selection",
    desc: `Choose mutual funds based on the time horizon of your child’s education goal.`,
    list: [
      "📘 Long horizon (10–15 years or more) → Higher allocation to Equity / Index Funds to create wealth and beat inflation.",
      "📗 Medium horizon (5–10 years) → Balanced allocation in Hybrid Funds (equity + debt) to reduce volatility.",
      "📙 Short horizon (less than 5 years) → Focus on Debt / Liquid Funds for safety and capital protection.",
    ],
  },
  {
    title: "3. Regular Monitoring",
    desc: `Review your mutual fund portfolio every 6–12 months.`,
    list: [
      "Identify underperforming schemes and switch if needed.",
      "Rebalance asset allocation (equity vs debt) as your child gets closer to education age.",
    ],
  },
  {
    title: "4. Goal Tracking",
    desc: `Track whether your investments are growing in line with the estimated education cost.`,
    list: [
      "Use SIP calculators or goal-planning tools to check progress.",
      "If there’s a shortfall, increase SIP amount or adjust fund allocation accordingly.",
    ],
  },
];

const ServiceDetailFive = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            🎓 Child Education Planning through Mutual Funds
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
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">
                    {step.desc}
                  </p>
                  {step.list && (
                    <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                      {step.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-indigo-800 font-semibold">✅ Summary:</h3>
            <p className="text-gray-700 text-sm mt-2 leading-relaxed">
              Child education planning with mutual funds involves estimating
              future education costs, selecting funds based on time horizon,
              monitoring investments regularly, and tracking progress toward the
              goal. <br />
              This ensures that when your child needs the funds, the required
              corpus is ready without financial stress.
            </p>
          </div>

          <p className="text-center text-indigo-700 font-medium mt-8">
            💡 Smart education planning secures your child’s dreams with peace
            of mind.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetailFive;
