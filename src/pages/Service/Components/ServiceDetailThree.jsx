import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const steps = [
  {
    title: "1. Assess Risk Capital (Ability to Take Risk)",
    desc: `This step identifies how much financial risk you can afford. Factors include income level, savings, liabilities (like loans), emergency fund, and dependents.`,
    example:
      "✅ Example: A young salaried professional with no loans and a stable income has higher risk capital compared to someone near retirement with limited savings.",
  },
  {
    title: "2. Profile Categorization (Risk Appetite / Willingness)",
    desc: `After assessing your ability, the next step is to check your willingness to take risk — known as risk appetite. Investors are usually categorized as:`,
    list: [
      "Conservative → prefer safety, low risk, stable returns.",
      "Moderate → willing to take some risk for better returns.",
      "Aggressive → ready to take high risk for potentially high long-term returns.",
    ],
    example:
      "✅ Example: Even if a person has high income, if they panic during market falls, they belong in the conservative/moderate profile.",
  },
  {
    title: "3. Evaluate Investment Horizon (Time Factor)",
    desc: `Time horizon means how long you can stay invested. A longer horizon allows taking more risk since short-term volatility evens out over time.`,
    example:
      "✅ Example: Retirement in 20 years → Can go for equity-heavy funds. Saving for child’s college in 3 years → Safer debt or hybrid funds.",
  },
];

const ServiceDetailThree = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          🧩 Risk Profiling & Fund Recommendation
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
                <p className="text-sm text-indigo-700 mt-2 font-medium">
                  {step.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🧭 Fund Recommendation Table */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
            📊 Fund Recommendation by Risk Level
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-indigo-200 rounded-lg">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b border-indigo-200">
                    Risk Profile
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b border-indigo-200">
                    Investment Horizon
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold border-b border-indigo-200">
                    Recommended Funds
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="hover:bg-indigo-50">
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Conservative
                  </td>
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Short-term (1–3 yrs)
                  </td>
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Liquid funds, Ultra-short duration funds, Short-term debt funds
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Moderate
                  </td>
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Medium-term (3–5 yrs)
                  </td>
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Hybrid funds, Balanced Advantage funds, Large-cap equity funds
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Aggressive
                  </td>
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Long-term (5+ yrs)
                  </td>
                  <td className="py-3 px-4 border-b border-indigo-100">
                    Equity funds (Multi-cap, Mid-cap, Small-cap), Sectoral/Thematic funds
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-indigo-800 font-semibold">
            📌 In summary:
          </h3>
          <p className="text-gray-700 text-sm mt-2 leading-relaxed">
            Risk profiling = <b>Ability (Risk Capital)</b> +{" "}
            <b>Willingness (Risk Appetite)</b> +{" "}
            <b>Time (Investment Horizon)</b> <br />
            Once we know these, we can recommend funds suited to the investor’s comfort and goals.
          </p>
        </div>

        <p className="text-center text-indigo-700 font-medium mt-8">
          💡 The right risk profile ensures a perfect balance between safety and growth.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ServiceDetailThree;
