import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const steps = [
  {
    title: "1. Long-Term Opportunities",
    desc: "Mutual funds offer potential for long-term wealth creation through disciplined investing.",
    list: [
      "📈 Equity Mutual Funds: Invest in high-growth companies, best suited for 8–15 years horizon.",
      "🏥 Sector/Thematic Funds: Target emerging sectors like technology, healthcare, or green energy for growth.",
      "📊 Index Funds/ETFs: Low-cost, passively managed funds tracking market indices for consistent growth.",
      "Compounding Effect: Staying invested long-term can significantly increase wealth."
    ],
  },
  {
    title: "2. Diversification Strategies",
    desc: "Spread your investments wisely to balance risk and optimize returns.",
    list: [
      "Asset Class Diversification: Mix equities, debt, and hybrid funds to manage risk and returns.",
      "Sector & Geography Diversification: Invest across multiple sectors or international funds to reduce concentration risk.",
      "Fund Style Diversification: Mix large-cap, mid-cap, and small-cap funds for balanced growth potential."
    ],
  },
  {
    title: "3. SIP-Based Planning",
    desc: "Systematic Investment Plans (SIPs) enable disciplined, regular investing irrespective of market conditions.",
    list: [
      "Rupee Cost Averaging: SIPs reduce the impact of market volatility by averaging purchase cost over time.",
      "Goal-Based Approach: Align SIPs with goals like retirement, child’s education, or wealth creation."
    ],
  },
  {
    title: "4. Performance Tracking and Rebalancing",
    desc: "Regular monitoring and rebalancing keep your portfolio aligned with goals.",
    list: [
      "Track fund performance against benchmarks and your financial goals.",
      "Rebalance portfolio periodically to maintain asset allocation, reduce risk, and capture gains.",
      "Identify underperforming funds and replace or review them to optimize returns."
    ],
  },
];

const ServiceDetailSeven = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            💰 Wealth Creation through Mutual Funds
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
              Wealth creation through mutual funds combines disciplined investing, diversification, and long-term planning. 
              By investing systematically, monitoring performance, and rebalancing periodically, you can steadily grow your financial resources.
            </p>
          </div>

          <p className="text-center text-indigo-700 font-medium mt-8">
            💡 Patience, consistency, and smart fund selection turn investments into substantial wealth over time.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetailSeven;
