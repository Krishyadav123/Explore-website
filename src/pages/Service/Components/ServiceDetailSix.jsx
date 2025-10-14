import React from "react";
import { CheckCircle2, Heart, TrendingUp, Target, Calendar, Shield, Coins, Banknote, ArrowLeft } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Link, useNavigate } from "react-router-dom";

const steps = [
  {
    title: "1. Future Expense Estimation",
    desc: `Start by estimating the approximate cost of your child's marriage considering current expenses.`,
    list: [
      "Include venue, gifts, travel, rituals, inflation, and other related costs.",
      "Use an inflation rate (6–8% per year) to estimate the future requirement realistically.",
    ],
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "2. Growth Fund Estimation",
    desc: `Once you know the future cost, calculate how much your investments need to grow annually to reach that goal.`,
    list: [
      "Determine the total corpus required at the time of marriage.",
      "For long-term goals (8–12 years horizon), consider investing in equity mutual funds for growth.",
    ],
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. Fund Selection",
    desc: `Choose the right fund types based on your investment horizon and risk profile.`,
    list: [
      "📘 Equity-oriented funds: Best for long-term horizon (10–15 years) to maximize returns.",
      "📗 Hybrid or Debt funds: Suitable for medium-term horizon (5–10 years) to reduce volatility.",
      "Select funds aligned with your family's financial comfort and time frame.",
    ],
    icon: Shield,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "4. Systematic Investment Plan (SIP) / Regular Investment",
    desc: `Start SIPs in selected mutual funds to maintain investment discipline.`,
    list: [
      "Even small monthly contributions can grow significantly over time due to compounding.",
      "Consistency is key — automate SIPs to ensure regular investment without stress.",
    ],
    icon: Calendar,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "5. Tax Efficiency",
    desc: `Plan your investments to minimize tax impact and maximize returns.`,
    list: [
      "Invest through ELSS or tax-saving mutual funds where applicable.",
      "Be mindful of capital gains tax on withdrawals and plan exit timing smartly.",
    ],
    icon: Coins,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "6. Liquidity Planning",
    desc: `Ensure easy access to funds as the marriage date nears.`,
    list: [
      "Keep a portion of investments in liquid or short-term debt funds for upcoming expenses.",
      "This helps avoid selling long-term equity funds during unfavorable market conditions.",
    ],
    icon: Banknote,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "7. Efficient Withdrawal Strategy",
    desc: `Withdraw funds strategically to avoid unnecessary losses.`,
    list: [
      "Redeem funds in phases as marriage expenses approach.",
      "Avoid withdrawing from equity funds during market downturns.",
      "Plan withdrawals according to payment schedules to ensure smooth cash flow.",
    ],
    icon: Heart,
    gradient: "from-pink-500 to-rose-500",
  },
];


const ServiceDetailSix = () => {
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
                <Heart className="w-4 h-4 mr-2" />
                Marriage Planning
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                💍 Child Marriage Planning
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  through Mutual Funds
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Ensure financial readiness for one of life's most emotional and important goals through strategic planning with mutual funds.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-sm text-blue-200">Key Steps</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">SIP</div>
                  <div className="text-sm text-blue-200">Disciplined</div>
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
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                alt="Child Marriage Planning"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/10"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
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
            Child marriage planning through mutual funds ensures financial readiness for one of life's most emotional and important goals. Estimate future costs, invest systematically through SIPs, choose funds wisely, and plan withdrawals smartly to make the journey stress-free and joyful.
          </p>
        </div>

        {/* Final Summary Section */}
<div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden flex flex-col items-center justify-center text-center space-y-8">
  {/* Background Glow Effects */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div
      className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-2xl">
    <p className="text-2xl md:text-3xl font-medium text-blue-100 leading-relaxed">
      💡 Early and disciplined investing turns dreams into beautiful celebrations.
    </p>
  </div>

  <Link
    to="/goal/child-wedding"
    className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-3 rounded-full shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
  >
    Child Wedding Planner
  </Link>
</div>

          </div>
        </div>
      <Footer />

    </>
  );
};

export default ServiceDetailSix;