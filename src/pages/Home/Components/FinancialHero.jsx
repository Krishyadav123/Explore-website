import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Shield, Target } from 'lucide-react';

const FinancialHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate services
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: TrendingUp, name: 'Mutual Fund Distribution', active: activeService === 0 },
    { icon: Shield, name: 'Wealth Management', active: activeService === 1 },
    { icon: Target, name: 'Personal Finance Coaching', active: activeService === 2 },
  ];

  const stats = [
    { value: '10+', label: 'Investors', subtext: 'Trust our expertise' },
    { value: '5+', label: 'Families', subtext: 'Financial success stories' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="mx-auto px-5 md:px-32 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Financial Excellence Since 2020</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-5xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  Explore the Financial
                  <span className="block mt-2">
                    Opportunities with
                    <span className="text-orange-500"> Ploutia</span>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Welcome to our firm, where your financial aspirations meet seasoned expertise and 
                personalized guidance. We are a dedicated team of professionals with extensive experience 
                in wealth management, investments, and personal finance coaching. Our mission is to 
                empower individuals and families to achieve their financial goals through prudent and 
                personalized investment strategies.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="group inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Know More
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              {/* <div className="flex gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-500">{stat.subtext}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            
            {/* Main Image Container */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden shadow-2xl">
                {/* Simulated professional meeting image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center relative">

                    <img src="https://ploutia.com/images/home/home-about.png" alt="" />
                  {/* <Users className="w-24 h-24 text-white opacity-50" /> */}
                  
                  {/* Overlay stats */}
                  {/* <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                      <div className="text-2xl font-bold text-gray-900">10+</div>
                      <div className="text-sm text-gray-600">Investors</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                      <div className="text-2xl font-bold text-gray-900">5+</div>
                      <div className="text-sm text-gray-600">Families</div>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-xl rotate-12 hover:rotate-0 transition-transform duration-500">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Services we provide to our customers
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We specialize in bespoke mutual fund distribution, holistic wealth management, and transformative 
              personal finance coaching to elevate your financial journey.
            </p>
          </div>

          {/* Services Grid */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`flex items-center px-6 py-4 rounded-xl transition-all duration-500 cursor-pointer ${
                    service.active 
                      ? 'bg-orange-500 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <service.icon className="w-6 h-6 mr-3" />
                  <span className="font-semibold">{service.name}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="group inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                View Our Services
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
    </div>
  );
};

export default FinancialHero;