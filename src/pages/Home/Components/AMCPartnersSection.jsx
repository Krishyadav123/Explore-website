import React from 'react';
import { Award, TrendingUp, Shield, Users } from 'lucide-react';

const AMCPartnersSection = () => {
  // Partner data with placeholder images
  const partners = [
    { id: 1, name: 'Aditya Birla Sun Life', logo: 'https://ploutia.com/images/home/amc-company/taurus.png' },
    { id: 2, name: 'Axis Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/taurus.png' },
    { id: 3, name: 'Bajaj Finserv', logo: 'https://ploutia.com/images/home/amc-company/tata.png' },
    { id: 4, name: 'Bandhan Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/motilal-oswal.png' },
    { id: 5, name: 'Bank of India Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/sriram.png' },
    { id: 6, name: 'BNP Paribas', logo: 'https://ploutia.com/images/home/amc-company/quantum.png' },
    { id: 7, name: 'Canara Robeco', logo: 'https://ploutia.com/images/home/amc-company/motilal-oswal.png' },
    { id: 8, name: 'DSP Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/tata.png' },
    { id: 9, name: 'Franklin Templeton', logo: 'https://ploutia.com/images/home/amc-company/nj-mf.png' },
    { id: 10, name: 'HDFC Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/motilal-oswal.png' },
    { id: 11, name: 'ICICI Prudential', logo: 'https://ploutia.com/images/home/amc-company/sriram.png' },
    { id: 12, name: 'Kotak Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/tata.png' },
    { id: 13, name: 'L&T Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/motilal-oswal.png' },
    { id: 14, name: 'Mirae Asset', logo: 'https://ploutia.com/images/home/amc-company/quantum.png' },
    { id: 15, name: 'Nippon India', logo: 'https://ploutia.com/images/home/amc-company/nj-mf.png' },
    { id: 16, name: 'SBI Mutual Fund', logo: 'https://ploutia.com/images/home/amc-company/sriram.png' }
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      number: '50+',
      label: 'Trusted Partners',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: '₹1000Cr+',
      label: 'Assets Under Management',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      number: '15+',
      label: 'Years of Excellence',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: '25K+',
      label: 'Happy Investors',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">AMC Partners</span> We Work With
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We've partnered with India's leading Asset Management Companies to bring you the best investment opportunities and financial solutions.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 gap-4 flex shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-md flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
               <div>
                 <div className="text-xl text-start font-bold text-gray-900 ">{stat.number}</div>
                <div className="text-sm text-start text-gray-600">{stat.label}</div>
               </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            {/* First Row - Left to Right */}
            <div className="flex space-x-8 mb-8 animate-scroll-left">
              {duplicatedPartners.slice(0, duplicatedPartners.length / 2).map((partner, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  style={{ minWidth: '200px' }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-16 object-contain  transition-all duration-300"
                  />
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - Right to Left */}
            <div className="flex space-x-8 pb-2 animate-scroll-right">
              {duplicatedPartners.slice(duplicatedPartners.length / 2).map((partner, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  style={{ minWidth: '200px' }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-16 object-contain transition-all duration-300"
                  />
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              With our trusted AMC partners, you get access to a wide range of mutual funds and investment options tailored to your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Explore Funds
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
                Contact Advisor
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AMCPartnersSection;