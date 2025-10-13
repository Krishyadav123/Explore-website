import React from "react";
import { CheckCircle2, TrendingUp, BarChart3, Target, RefreshCw, Sparkles } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const steps = [
  {
    title: "1. Review Existing Holdings",
    desc: `This means checking your current mutual fund portfolio from time to time. You look at how much is invested in equity, debt, hybrid, etc. Whether the funds are performing as expected, and if your portfolio still matches your goals, risk profile, and time horizon.`,
    example:
      "✅ Example: If you planned for long-term wealth creation but most of your money is in short-term debt funds, you need to realign.",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "2. Eliminate Overlapping",
    desc: `Many investors unknowingly buy multiple funds with the same type of stocks or sectors. This creates "duplication" instead of real diversification.`,
    example:
      "✅ Example: If you own 3 large-cap funds, chances are they all invest in Reliance, HDFC Bank, Infosys, etc. → You're not diversified. Eliminating overlapping reduces duplication and improves efficiency.",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. Rebalancing Strategies",
    desc: `Rebalancing means adjusting your portfolio back to your planned asset allocation (equity vs debt, large cap vs small cap, etc.). Markets keep changing, so equity may grow faster than debt, making your portfolio riskier than intended.`,
    example:
      "✅ Example: If you started with 70% equity + 30% debt, but after 2 years it's 80% equity + 20% debt, sell some equity and add to debt to restore 70:30. This keeps risk under control.",
    icon: RefreshCw,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "4. Identify Underperforming Schemes",
    desc: `Some funds may consistently perform worse than their benchmark index or category peers due to wrong strategy, poor fund manager, high expense ratio, or market changes.`,
    example:
      "✅ Example: If your mid-cap fund gave 6% returns in 3 years while the Nifty Midcap Index gave 12%, that's underperformance. Replace such funds with better options.",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "5. Optimise Diversification",
    desc: `Diversification means spreading investments across asset classes (equity, debt, gold, international, etc.) and categories (large-cap, mid-cap, hybrid). Optimising diversification means having enough variety to reduce risk, but not too many funds to manage.`,
    example:
      "✅ Example: Having 5–6 well-chosen funds across categories is better than holding 15–20 similar funds.",
    icon: Sparkles,
    gradient: "from-green-500 to-emerald-500",
  },
];

const ServiceDetailTwo = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium mb-4">
                <BarChart3 className="w-4 h-4 mr-2" />
                Portfolio Management
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                📊 Mutual Fund
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Portfolio Review Steps
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                A comprehensive guide to keeping your investments aligned, healthy, and optimized for maximum returns.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-sm text-blue-200">Key Steps</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-blue-200">Actionable</div>
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
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
                alt="Portfolio Review"
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
                    <p className="text-sm text-indigo-700 font-medium">
                      {step.example}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
                📌 In short:
              </h3>
            </div>

            <div className="text-center space-y-2 text-base md:text-lg">
              <p>1️⃣ Review = Check regularly.</p>
              <p>2️⃣ Eliminate Overlap = Avoid duplication.</p>
              <p>3️⃣ Rebalance = Adjust to target allocation.</p>
              <p>4️⃣ Identify Underperformance = Cut weak funds.</p>
              <p>5️⃣ Optimise Diversification = Spread risk smartly.</p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                💡 Regular portfolio review keeps your investments aligned and healthy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    </>
  );
};

export default ServiceDetailTwo;