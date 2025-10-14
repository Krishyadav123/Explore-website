import React from "react";
import { CheckCircle2, TrendingUp, Shield, Calendar, Activity, DollarSign, ArrowLeft } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Link, useNavigate } from "react-router-dom";

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
    icon: DollarSign,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "2. Hybrid & Index Fund Strategies",
    desc: `During working years: Allocate a higher portion to equity index funds for growth, since retirement is a long-term goal.`,
    example:
      "👉 As you near retirement, gradually shift some allocation to hybrid funds for stability and regular income. This ensures early growth and later protection.",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. Account for Inflation and Medical Costs",
    desc: `Inflation will increase your cost of living over 20–30 years of retirement. Medical costs generally rise faster than normal inflation.`,
    example:
      "👉 Invest in funds that beat inflation (equity/index funds) while keeping some portion in debt or liquid funds for medical safety.",
    icon: Activity,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "4. Regular Review and Adjustment",
    desc: `Review your retirement portfolio annually or during major life changes.`,
    points: [
      "If equity grows a lot, move some profits to debt (rebalance).",
      "If expenses rise, adjust your investment contributions.",
    ],
    example:
      "👉 Keeps your retirement plan flexible and realistic so you don't fall short when you actually need funds.",
    icon: Calendar,
    gradient: "from-orange-500 to-red-500",
  },
];

const allocations = [
  {
    color: "text-green-600",
    bgColor: "from-green-500 to-emerald-500",
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
    bgColor: "from-yellow-500 to-orange-500",
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
    bgColor: "from-orange-500 to-red-500",
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
    bgColor: "from-red-500 to-pink-500",
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
    bgColor: "from-gray-500 to-slate-500",
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
  const navigate = useNavigate();
  return (

    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-8 left-6 flex items-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-white space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium mb-4">
                  <Shield className="w-4 h-4 mr-2" />
                  Retirement Planning
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  🧓 Retirement Planning
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    with Mutual Funds
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                  Build a secure financial future with strategic retirement planning through mutual funds at every stage of your career.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-sm text-blue-200">Key Steps</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                    <div className="text-2xl font-bold text-white">5</div>
                    <div className="text-sm text-blue-200">Age Groups</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                    <div className="text-2xl font-bold text-white">✓</div>
                    <div className="text-sm text-blue-200">Expert Guide</div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80"
                  alt="Retirement Planning"
                  className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {step.desc}
                      </p>
                      {step.points && (
                        <ul className="list-disc list-inside text-gray-600 text-sm mb-3 space-y-1">
                          {step.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      )}
                      <p className="text-sm text-indigo-700 font-medium">
                        {step.example}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
            <h3 className="text-indigo-800 font-semibold text-lg mb-3">
              ✅ In short:
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              • Early years → focus on equity/index funds (growth). <br />
              • Mid-to-late years → shift gradually into hybrid/debt (safety + income). <br />
              • Throughout → review, adjust, and plan for inflation & health costs.
            </p>
          </div>

          {/* Allocation by Age Section */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                📊 Retirement Mutual Fund Allocation by Age
              </h2>
              <p className="text-gray-600">Strategic asset allocation across different life stages</p>
            </div>

            <div className="space-y-6">
              {allocations.map((allocation, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${allocation.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h4 className={`font-semibold text-lg mb-3 ${allocation.color}`}>
                        {allocation.title}
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-3">
                        {allocation.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      <p className="text-indigo-700 text-sm font-medium">{allocation.goal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
            <h3 className="text-indigo-800 font-semibold text-lg mb-3 text-center">
              ✅ Key Takeaways
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              • Start equity-heavy, shift towards debt/hybrid with age. <br />
              • Always account for inflation & medical costs. <br />
              • Review and rebalance annually.
            </p>
          </div>

          {/* Final Summary Section */}
          <div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Animated Glow Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-xl md:text-2xl font-medium text-blue-100 leading-relaxed max-w-2xl">
                💡 Plan early, review regularly, and secure your peaceful retirement!
              </p>

              <Link
                to="/goal/retirement"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
              >
                Calculate Your Retirement Corpus
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />

    </>
  );
};

export default ServiceDetailFour;