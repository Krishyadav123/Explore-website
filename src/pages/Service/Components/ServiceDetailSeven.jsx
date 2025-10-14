import React from "react";
import { CheckCircle2, TrendingUp, Target, Calendar, BarChart3, ArrowLeft } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Link, useNavigate } from "react-router-dom";

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
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "2. Diversification Strategies",
    desc: "Spread your investments wisely to balance risk and optimize returns.",
    list: [
      "Asset Class Diversification: Mix equities, debt, and hybrid funds to manage risk and returns.",
      "Sector & Geography Diversification: Invest across multiple sectors or international funds to reduce concentration risk.",
      "Fund Style Diversification: Mix large-cap, mid-cap, and small-cap funds for balanced growth potential."
    ],
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. SIP-Based Planning",
    desc: "Systematic Investment Plans (SIPs) enable disciplined, regular investing irrespective of market conditions.",
    list: [
      "Rupee Cost Averaging: SIPs reduce the impact of market volatility by averaging purchase cost over time.",
      "Goal-Based Approach: Align SIPs with goals like retirement, child's education, or wealth creation."
    ],
    icon: Calendar,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "4. Performance Tracking and Rebalancing",
    desc: "Regular monitoring and rebalancing keep your portfolio aligned with goals.",
    list: [
      "Track fund performance against benchmarks and your financial goals.",
      "Rebalance portfolio periodically to maintain asset allocation, reduce risk, and capture gains.",
      "Identify underperforming funds and replace or review them to optimize returns."
    ],
    icon: BarChart3,
    gradient: "from-orange-500 to-red-500",
  },
];


const ServiceDetailSeven = () => {
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
                <TrendingUp className="w-4 h-4 mr-2" />
                Wealth Creation
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                💰 Wealth Creation
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  through Mutual Funds
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Build substantial wealth through disciplined investing, strategic diversification, and long-term planning with mutual funds.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-sm text-blue-200">Key Strategies</div>
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
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
                alt="Wealth Creation"
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
            Wealth creation through mutual funds combines disciplined investing, diversification, and long-term planning. By investing systematically, monitoring performance, and rebalancing periodically, you can steadily grow your financial resources.
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

  {/* Text Content */}
  <div className="relative z-10 max-w-3xl">
    <p className="text-2xl md:text-3xl font-medium text-blue-100 leading-relaxed">
      💡 Patience, consistency, and smart fund selection turn investments into substantial wealth over time.
    </p>
  </div>

  {/* Button */}
  <Link
    to="/goal/wealth-creation"
    className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-3 rounded-full shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
  >
    Wealth Creation Planner
  </Link>
</div>

      </div>
    </div>

      <Footer />
    
    </>
  );
};

export default ServiceDetailSeven;