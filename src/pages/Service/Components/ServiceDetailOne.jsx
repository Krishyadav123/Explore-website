import React from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

const steps = [
  {
    title: "Identify Your Financial Needs",
    desc: "Think about what you want: saving, buying a house, child’s education, retirement, etc.",
  },
  {
    title: "Set Clear Goals",
    desc: "Write them clearly (short-term, medium-term, long-term).",
  },
  {
    title: "Make Them SMART",
    desc: "Specific (e.g., buy a car worth ₹6 lakh) · Measurable (how much money needed) · Achievable (realistic with your income) · Relevant (important for you) · Time-bound (set deadline, e.g., 3 years).",
  },
  {
    title: "Prioritize Your Goals",
    desc: "Decide which goal is most urgent or important.",
  },
  {
    title: "Check Your Current Financial Position",
    desc: "Review income, expenses, savings, existing loans, and assets.",
  },
  {
    title: "Estimate How Much You Need",
    desc: "Calculate the future cost of each goal (consider inflation).",
  },
  {
    title: "Create an Action Plan",
    desc: "Decide how much to save or invest regularly (monthly SIPs, deposits, etc.).",
  },
  {
    title: "Choose the Right Investment Options",
    desc: "Short-term → safer investments (FD, RD, liquid funds). Long-term → growth options (mutual funds, stocks, retirement plans).",
  },
  {
    title: "Implement and Automate",
    desc: "Start saving/investing regularly. Automate if possible.",
  },
  {
    title: "Review and Adjust",
    desc: "Check progress yearly and adjust if income, expenses, or goals change.",
  },
  {
    title: "Celebrate Milestones",
    desc: "Acknowledge achievements and stay motivated.",
  },
];

const ServiceDetailOne = () => {
  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-indigo-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          💰 Steps in Personal Financial Goal Planning
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
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-indigo-700 font-medium mt-10">
          🌟 Plan smart, stay consistent, and achieve your financial dreams!
        </p>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default ServiceDetailOne;
