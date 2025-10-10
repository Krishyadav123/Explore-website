import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const steps = [
  {
    title: "1. Future Expense Estimation",
    desc: `Start by estimating the approximate cost of your child’s marriage considering current expenses.`,
    list: [
      "Include venue, gifts, travel, rituals, inflation, and other related costs.",
      "Use an inflation rate (6–8% per year) to estimate the future requirement realistically.",
    ],
  },
  {
    title: "2. Growth Fund Estimation",
    desc: `Once you know the future cost, calculate how much your investments need to grow annually to reach that goal.`,
    list: [
      "Determine the total corpus required at the time of marriage.",
      "For long-term goals (8–12 years horizon), consider investing in equity mutual funds for growth.",
    ],
  },
  {
    title: "3. Fund Selection",
    desc: `Choose the right fund types based on your investment horizon and risk profile.`,
    list: [
      "📘 Equity-oriented funds: Best for long-term horizon (10–15 years) to maximize returns.",
      "📗 Hybrid or Debt funds: Suitable for medium-term horizon (5–10 years) to reduce volatility.",
      "Select funds aligned with your family’s financial comfort and time frame.",
    ],
  },
  {
    title: "4. Systematic Investment Plan (SIP) / Regular Investment",
    desc: `Start SIPs in selected mutual funds to maintain investment discipline.`,
    list: [
      "Even small monthly contributions can grow significantly over time due to compounding.",
      "Consistency is key — automate SIPs to ensure regular investment without stress.",
    ],
  },
  {
    title: "5. Tax Efficiency",
    desc: `Plan your investments to minimize tax impact and maximize returns.`,
    list: [
      "Invest through ELSS or tax-saving mutual funds where applicable.",
      "Be mindful of capital gains tax on withdrawals and plan exit timing smartly.",
    ],
  },
  {
    title: "6. Liquidity Planning",
    desc: `Ensure easy access to funds as the marriage date nears.`,
    list: [
      "Keep a portion of investments in liquid or short-term debt funds for upcoming expenses.",
      "This helps avoid selling long-term equity funds during unfavorable market conditions.",
    ],
  },
  {
    title: "7. Efficient Withdrawal Strategy",
    desc: `Withdraw funds strategically to avoid unnecessary losses.`,
    list: [
      "Redeem funds in phases as marriage expenses approach.",
      "Avoid withdrawing from equity funds during market downturns.",
      "Plan withdrawals according to payment schedules to ensure smooth cash flow.",
    ],
  },
];

const ServiceDetailSix = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            💍 Child Marriage Planning through Mutual Funds
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
              Child marriage planning through mutual funds ensures financial
              readiness for one of life’s most emotional and important goals.
              Estimate future costs, invest systematically through SIPs, choose
              funds wisely, and plan withdrawals smartly to make the journey
              stress-free and joyful.
            </p>
          </div>

          <p className="text-center text-indigo-700 font-medium mt-8">
            💡 Early and disciplined investing turns dreams into beautiful
            celebrations.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetailSix;
