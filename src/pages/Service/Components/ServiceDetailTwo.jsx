import React from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

const steps = [
  {
    title: "1. Review Existing Holdings",
    desc: `This means checking your current mutual fund portfolio from time to time. You look at how much is invested in equity, debt, hybrid, etc. Whether the funds are performing as expected, and if your portfolio still matches your goals, risk profile, and time horizon.`,
    example:
      "✅ Example: If you planned for long-term wealth creation but most of your money is in short-term debt funds, you need to realign.",
  },
  {
    title: "2. Eliminate Overlapping",
    desc: `Many investors unknowingly buy multiple funds with the same type of stocks or sectors. This creates “duplication” instead of real diversification.`,
    example:
      "✅ Example: If you own 3 large-cap funds, chances are they all invest in Reliance, HDFC Bank, Infosys, etc. → You’re not diversified. Eliminating overlapping reduces duplication and improves efficiency.",
  },
  {
    title: "3. Rebalancing Strategies",
    desc: `Rebalancing means adjusting your portfolio back to your planned asset allocation (equity vs debt, large cap vs small cap, etc.). Markets keep changing, so equity may grow faster than debt, making your portfolio riskier than intended.`,
    example:
      "✅ Example: If you started with 70% equity + 30% debt, but after 2 years it’s 80% equity + 20% debt, sell some equity and add to debt to restore 70:30. This keeps risk under control.",
  },
  {
    title: "4. Identify Underperforming Schemes",
    desc: `Some funds may consistently perform worse than their benchmark index or category peers due to wrong strategy, poor fund manager, high expense ratio, or market changes.`,
    example:
      "✅ Example: If your mid-cap fund gave 6% returns in 3 years while the Nifty Midcap Index gave 12%, that’s underperformance. Replace such funds with better options.",
  },
  {
    title: "5. Optimise Diversification",
    desc: `Diversification means spreading investments across asset classes (equity, debt, gold, international, etc.) and categories (large-cap, mid-cap, hybrid). Optimising diversification means having enough variety to reduce risk, but not too many funds to manage.`,
    example:
      "✅ Example: Having 5–6 well-chosen funds across categories is better than holding 15–20 similar funds.",
  },
];

const ServiceDetailTwo = () => {
  return (
    <>
    <Navbar/>
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          📊 Mutual Fund Portfolio Review Steps
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
                <p className="text-sm text-indigo-700 mt-2 font-medium">
                  {step.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-indigo-800 font-semibold">
            📌 In short:
          </h3>
          <p className="text-gray-700 text-sm mt-2 leading-relaxed">
            1️⃣ Review = Check regularly. <br />
            2️⃣ Eliminate Overlap = Avoid duplication. <br />
            3️⃣ Rebalance = Adjust to target allocation. <br />
            4️⃣ Identify Underperformance = Cut weak funds. <br />
            5️⃣ Optimise Diversification = Spread risk smartly.
          </p>
        </div>

        <p className="text-center text-indigo-700 font-medium mt-8">
          💡 Regular portfolio review keeps your investments aligned and healthy!
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ServiceDetailTwo;
