import React from "react";
import { CheckCircle2, Shield, TrendingUp, Clock, Target, Award, ArrowLeft } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "1. Assess Risk Capital (Ability to Take Risk)",
    desc: `This step identifies how much financial risk you can afford. Factors include income level, savings, liabilities (like loans), emergency fund, and dependents.`,
    example:
      "✅ Example: A young salaried professional with no loans and a stable income has higher risk capital compared to someone near retirement with limited savings.",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
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
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. Evaluate Investment Horizon (Time Factor)",
    desc: `Time horizon means how long you can stay invested. A longer horizon allows taking more risk since short-term volatility evens out over time.`,
    example:
      "✅ Example: Retirement in 20 years → Can go for equity-heavy funds. Saving for child's college in 3 years → Safer debt or hybrid funds.",
    icon: Clock,
    gradient: "from-indigo-500 to-blue-500",
  },
];


const ServiceDetailThree = () => {
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
                Risk Assessment
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                🧩 Risk Profiling &
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Fund Recommendation
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Discover your ideal investment strategy through comprehensive risk assessment and personalized fund recommendations.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-blue-200">Key Steps</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-blue-200">Personalized</div>
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
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Risk Profiling"
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
                      <ul className="list-disc list-inside text-gray-600 text-sm mb-3 space-y-1">
                        {step.list.map((item, i) => (
                          <li key={i}>{item}</li>
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

        {/* Fund Recommendation Table */}
        <div className="mt-16 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              📊 Fund Recommendation by Risk Level
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="py-4 px-4 text-left text-sm font-semibold rounded-tl-xl">
                    Risk Profile
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold">
                    Investment Horizon
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-semibold rounded-tr-xl">
                    Recommended Funds
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="border-b border-indigo-100 hover:bg-indigo-50 transition-colors">
                  <td className="py-4 px-4 font-medium">
                    Conservative
                  </td>
                  <td className="py-4 px-4">
                    Short-term (1–3 yrs)
                  </td>
                  <td className="py-4 px-4">
                    Liquid funds, Ultra-short duration funds, Short-term debt funds
                  </td>
                </tr>
                <tr className="border-b border-indigo-100 hover:bg-indigo-50 transition-colors">
                  <td className="py-4 px-4 font-medium">
                    Moderate
                  </td>
                  <td className="py-4 px-4">
                    Medium-term (3–5 yrs)
                  </td>
                  <td className="py-4 px-4">
                    Hybrid funds, Balanced Advantage funds, Large-cap equity funds
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50 transition-colors">
                  <td className="py-4 px-4 font-medium">
                    Aggressive
                  </td>
                  <td className="py-4 px-4">
                    Long-term (5+ yrs)
                  </td>
                  <td className="py-4 px-4">
                    Equity funds (Multi-cap, Mid-cap, Small-cap), Sectoral/Thematic funds
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                📌 In summary:
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Risk profiling = <span className="font-bold text-white">Ability (Risk Capital)</span> + <span className="font-bold text-white">Willingness (Risk Appetite)</span> + <span className="font-bold text-white">Time (Investment Horizon)</span>
              </p>
              <p className="text-blue-100">
                Once we know these, we can recommend funds suited to the investor's comfort and goals.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                💡 The right risk profile ensures a perfect balance between safety and growth.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
      <a href="https://login.exploremfs.com/signup" className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg">
        Click here to do Risk Profiling
      </a>
    </div>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default ServiceDetailThree;