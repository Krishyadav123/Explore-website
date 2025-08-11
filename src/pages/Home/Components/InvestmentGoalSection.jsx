import React, { useState, useEffect } from 'react';
import { 
  Home, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Heart, 
  Shield,
  Calculator,
  ArrowRight,
  DollarSign,
  PiggyBank,
  Landmark,
  Coins,
  Award
} from 'lucide-react';

const InvestmentGoalsSection = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});

  // Investment comparison data
  const investments = [
    {
      type: 'Bank',
      icon: <Landmark className="w-6 h-6" />,
      amount: '₹ 58,13L',
      return: '3% Return',
      color: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-100'
    },
    {
      type: 'Fixed Deposit',
      icon: <PiggyBank className="w-6 h-6" />,
      amount: '₹ 90,54L',
      return: '6% Return',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'Gold',
      icon: <Coins className="w-6 h-6" />,
      amount: '₹ 1,47Cr',
      return: '9% Return',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      type: 'Sensex',
      icon: <TrendingUp className="w-6 h-6" />,
      amount: '₹ 2,07Cr',
      return: '11% Return',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'Mutual Funds',
      icon: <Award className="w-6 h-6" />,
      amount: '₹ 4,27Cr',
      return: '15% Return',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Goals data
  const goals = [
    {
      id: 1,
      title: 'Dream Home',
      icon: <Home className="w-8 h-8" />,
      description: 'Plan and save for your perfect home with smart investment strategies.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Wealth Creation',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Build long-term wealth through diversified investment portfolios.',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Retirement',
      icon: <Users className="w-8 h-8" />,
      description: 'Secure your golden years with comprehensive retirement planning.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: "Child's Education",
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Invest in your child\'s future education with dedicated savings plans.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: "Child's Wedding",
      icon: <Heart className="w-8 h-8" />,
      description: 'Plan ahead for your child\'s special day with systematic savings.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 6,
      title: 'Emergency Fund',
      icon: <Shield className="w-8 h-8" />,
      description: 'Build a safety net for unexpected expenses and financial security.',
      color: 'from-red-500 to-red-600'
    }
  ];

  // Animate values on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = {};
      investments.forEach((inv, index) => {
        animated[index] = true;
      });
      setAnimatedValues(animated);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Investment Comparison Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How <span className="text-blue-600">Smart Investing</span> Works in your Best Interest
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how different investment options can grow your wealth over time. Compare returns and make informed decisions.
            </p>
          </div>

          {/* Investment Input */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 bg-white rounded-lg px-6 py-4 shadow-lg">
              <span className="text-gray-700 font-medium">Monthly Investment</span>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                ₹ 15,000
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative mb-8">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <span className="text-sm text-gray-600">AFTER 25 YEARS, IT WOULD HAVE ACCUMULATED TO</span>
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-purple-500 mt-4 rounded-full"></div>
          </div>

          {/* Investment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {investments.map((investment, index) => (
              <div
                key={index}
                className={`${investment.bgColor} rounded-xl p-6 text-center transform transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-xl ${
                  animatedValues[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                // style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${investment.color} rounded-lg flex items-center justify-center mx-auto mb-4 text-white`}>
                  {investment.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{investment.type}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">{investment.amount}</div>
                <div className={`text-sm font-medium ${
                  investment.type === 'Bank' ? 'text-gray-600' : 
                  investment.type === 'Fixed Deposit' ? 'text-blue-600' :
                  investment.type === 'Gold' ? 'text-yellow-600' :
                  investment.type === 'Sensex' ? 'text-green-600' : 'text-purple-600'
                }`}>
                  {investment.return}
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              *Fixed Cap Category average returns for the last 10 year period (As on 08/06/2023)
            </p>
          </div>
        </div>

        {/* Goals Planning Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Let's Start Creating Your <span className="text-blue-600">Financial Goals</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every step of life has a specific monetary goal attached to it. You have to maneuver the steering wheel at the right time to reach them in time. We will help you plan to get you where you want to be.
            </p>

            {/* Goals Grid */}
            <div className="grid grid-cols-3 gap-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`bg-white rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl border-2 ${
                    selectedGoal === goal.id ? 'border-blue-500 shadow-lg' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                    {goal.icon}
                  </div>
                  <h3 className="font-semibold text-center text-gray-900 mb-2">{goal.title}</h3>
                  {/* {selectedGoal === goal.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      <button className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-700">
                        Start Planning
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  )} */}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center space-x-2 group">
                <Calculator className="w-5 h-5" />
                <span>Calculate Your Goals</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-10 h-10" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Your Financial Growth</h3>
                <p className="text-center text-blue-100 mb-6">
                  Watch your investments grow with smart planning and consistent efforts.
                </p>
                
                {/* Mock Chart */}
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-end justify-between h-32 space-x-2">
                    {[30, 45, 60, 80, 95, 75, 90, 100].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-300 to-white rounded-t-lg flex-1 transition-all duration-1000"
                        style={{ 
                          height: `${height}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGoalsSection;