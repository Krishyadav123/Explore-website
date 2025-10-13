import React from "react";
import { CheckCircle2, Target, TrendingUp, PiggyBank, Calendar, Calculator, Sparkles } from "lucide-react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const steps = [
  {
    title: "Identify Your Financial Needs",
    desc: "Think about what you want: saving, buying a house, child's education, retirement, etc.",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Set Clear Goals",
    desc: "Write them clearly (short-term, medium-term, long-term).",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Make Them SMART",
    desc: "Specific (e.g., buy a car worth ₹6 lakh) · Measurable (how much money needed) · Achievable (realistic with your income) · Relevant (important for you) · Time-bound (set deadline, e.g., 3 years).",
    icon: Sparkles,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Prioritize Your Goals",
    desc: "Decide which goal is most urgent or important.",
    icon: CheckCircle2,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Check Your Current Financial Position",
    desc: "Review income, expenses, savings, existing loans, and assets.",
    icon: Calculator,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Estimate How Much You Need",
    desc: "Calculate the future cost of each goal (consider inflation).",
    icon: Calculator,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Create an Action Plan",
    desc: "Decide how much to save or invest regularly (monthly SIPs, deposits, etc.).",
    icon: Calendar,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Choose the Right Investment Options",
    desc: "Short-term → safer investments (FD, RD, liquid funds). Long-term → growth options (mutual funds, stocks, retirement plans).",
    icon: PiggyBank,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    title: "Implement and Automate",
    desc: "Start saving/investing regularly. Automate if possible.",
    icon: TrendingUp,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Review and Adjust",
    desc: "Check progress yearly and adjust if income, expenses, or goals change.",
    icon: Target,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "Celebrate Milestones",
    desc: "Acknowledge achievements and stay motivated.",
    icon: Sparkles,
    gradient: "from-yellow-500 to-orange-500",
  },
];

const ServiceDetailOne = () => {
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
                <Target className="w-4 h-4 mr-2" />
                Financial Planning
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                💰 Personal Financial
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Goal Planning Steps
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                A comprehensive roadmap to achieve your financial dreams through systematic planning and smart decision-making.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">11</div>
                  <div className="text-sm text-blue-200">Key Steps</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-blue-200">Practical</div>
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
                alt="Financial Goal Planning"
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
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.desc}
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
                🌟 Ready to Begin?
              </h3>
            </div>

            <div className="text-center space-y-3 text-base md:text-lg">
              <p className="text-blue-100">
                Financial goal planning is the foundation of wealth creation and financial security.
              </p>
              <p className="text-blue-100">
                By following these systematic steps, you can turn your dreams into achievable milestones.
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg md:text-xl font-medium text-blue-100">
                🌟 Plan smart, stay consistent, and achieve your financial dreams!
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

export default ServiceDetailOne;