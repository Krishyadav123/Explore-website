import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

const services = [
  { icon: TrendingUp, name: 'AI-Driven Risk Assessment', active: activeService === 0 },
  { icon: Shield, name: 'Goal-Based Wealth Planning', active: activeService === 1 },
  { icon: Target, name: 'Global Mutual Fund Access', active: activeService === 2 },
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
                <span className="text-sm font-medium text-gray-700">
                  13+ Years of Trusted Financial Guidance
                </span>
              </div>

              {/* Main Heading */}
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
  Expert Financial Guidance
  <span className="block mt-2">
    Backed by <span className="text-orange-500">13+ Years of Trust</span>
  </span>
</h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
  We help individuals and NRIs make informed investment decisions through
  AI-driven insights, personalized wealth strategies, and global mutual fund
  solutions. From retirement planning to funding your children’s education,
  our approach ensures every step is aligned with your unique goals.
</p>

              {/* CTA Button */}
              <div className="pt-4">
                <Link to="/contact">
                <button className="group inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Start Your Journey
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button></Link>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dhf8eyjee/image/upload/f_auto,q_auto,w_1200/v1755162126/creative-monitor-tech-digitally-generated-desk_u0zr9h.jpg"
                  alt="Explore Investments"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute right-0 -top-6 md:-right-6 w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-xl rotate-12 hover:rotate-0 transition-transform duration-500">
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
     {/* Services Section */}
<div className="bg-white py-20">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div
      className={`text-center mb-16 transition-all duration-1000 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        What We Offer
      </h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
        From AI-backed risk profiling to global investment solutions, Explore
        offers a client-first approach to help you plan, grow, and protect your
        wealth with confidence.
      </p>
    </div>

    {/* Services Grid */}
    <div
      className={`transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex items-center px-6 py-4 rounded-xl transition-all duration-500 cursor-pointer ${
              service.active
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        <Link to="/services">
        <button className="group inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Services
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button></Link>
      </div>
    </div>
  </div>
</div>


      {/* Bottom Decoration */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
    </div>
  );
};

export default ExploreHero;
