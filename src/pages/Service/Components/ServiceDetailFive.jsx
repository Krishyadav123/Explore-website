import React from "react";
import { CheckCircle2, GraduationCap, TrendingUp, Target, BookOpen, ArrowLeft } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Link, useNavigate } from "react-router-dom";

const steps = [
  {
    title: "1. Future Education Cost Estimation",
    desc: `The first step is to calculate the expected cost of your child's higher education — whether in India or abroad.`,
    list: [
      "Include tuition fees, accommodation, books, travel, and other living expenses.",
      "Adjust the estimate with education inflation (8–10% annually) so that your target corpus is realistic.",
    ],
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "2. Time Horizon Based Fund Selection",
    desc: `Choose mutual funds based on the time horizon of your child's education goal.`,
    list: [
      "📘 Long horizon (10–15 years or more) → Higher allocation to Equity / Index Funds to create wealth and beat inflation.",
      "📗 Medium horizon (5–10 years) → Balanced allocation in Hybrid Funds (equity + debt) to reduce volatility.",
      "📙 Short horizon (less than 5 years) → Focus on Debt / Liquid Funds for safety and capital protection.",
    ],
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. Regular Monitoring",
    desc: `Review your mutual fund portfolio every 6–12 months.`,
    list: [
      "Identify underperforming schemes and switch if needed.",
      "Rebalance asset allocation (equity vs debt) as your child gets closer to education age.",
    ],
    icon: BookOpen,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "4. Goal Tracking",
    desc: `Track whether your investments are growing in line with the estimated education cost.`,
    list: [
      "Use SIP calculators or goal-planning tools to check progress.",
      "If there's a shortfall, increase SIP amount or adjust fund allocation accordingly.",
    ],
    icon: GraduationCap,
    gradient: "from-orange-500 to-red-500",
  },
];


const ServiceDetailFive = () => {
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
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education Planning
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  🎓 Child Education Planning
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    through Mutual Funds
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                  Secure your child's future with strategic education planning through mutual funds at every stage of their growth.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-sm text-blue-200">Key Steps</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-sm text-blue-200">Time Horizons</div>
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
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80"
                  alt="Child Education Planning"
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
                      {step.list && (
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          {step.list.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
            <h3 className="text-indigo-800 font-semibold text-lg mb-3 text-center">
              ✅ Summary:
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              Child education planning with mutual funds involves estimating future education costs, selecting funds based on time horizon, monitoring investments regularly, and tracking progress toward the goal. <br />
              This ensures that when your child needs the funds, the required corpus is ready without financial stress.
            </p>
          </div>

          {/* Final Summary Section */}
<div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
  {/* Glowing Background Effects */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div
      className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
      style={{ animationDelay: '1s' }}
    ></div>
  </div>

  {/* Centered Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
    <p className="text-xl md:text-2xl font-medium text-blue-100 max-w-2xl leading-relaxed">
      💡 Smart education planning secures your child's dreams with peace of mind.
    </p>

    <Link
      to="/goal/child-education"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
    >
      🎓 Child Education Planner
    </Link>
  </div>
</div>

        </div>
      </div>

      <Footer />

    </>
  );
};

export default ServiceDetailFive;