import React from 'react';
import { Award, TrendingUp, Shield, Users } from 'lucide-react';
import img1 from '@/assets/Partners/img1.png';
import img2 from '@/assets/Partners/img2.png';
import img3 from '@/assets/Partners/img3.png';
import img4 from '@/assets/Partners/img4.png';
import img5 from '@/assets/Partners/img5.png';
import img6 from '@/assets/Partners/img6.png';
import img7 from '@/assets/Partners/img7.png';
import img9 from '@/assets/Partners/img9.png';
import img10 from '@/assets/Partners/img10.png';
import img11 from '@/assets/Partners/img11.png';
import img12 from '@/assets/Partners/img12.png';
import img13 from '@/assets/Partners/img13.png';
import img14 from '@/assets/Partners/img14.png';
import img15 from '@/assets/Partners/img15.png';
import img16 from '@/assets/Partners/img16.png';  
import img17 from '@/assets/Partners/img17.png';
import img18 from '@/assets/Partners/img18.png';
import img19 from '@/assets/Partners/img19.png';
import img20 from '@/assets/Partners/img20.png';
import img21 from '@/assets/Partners/img21.png';
import img22 from '@/assets/Partners/img22.png';
import img23 from '@/assets/Partners/img23.png';
import img24 from '@/assets/Partners/img24.png';
import img25 from '@/assets/Partners/img25.png';
import img26 from '@/assets/Partners/img26.png';
import img27 from '@/assets/Partners/img27.png';
import img28 from '@/assets/Partners/img28.png';
import img29 from '@/assets/Partners/img29.png';
import img30 from '@/assets/Partners/img30.png';
import img31 from '@/assets/Partners/img31.png';
import img32 from '@/assets/Partners/img32.png';
import img33 from '@/assets/Partners/img33.png';
import img34 from '@/assets/Partners/img34.png';
import img35 from '@/assets/Partners/img35.png';
import img36 from '@/assets/Partners/img36.png';
import img37 from '@/assets/Partners/img37.png';
import img38 from '@/assets/Partners/img38.png';
import img39 from '@/assets/Partners/img39.png';
import img40 from '@/assets/Partners/img40.png';
import img41 from '@/assets/Partners/img41.png';
import img42 from '@/assets/Partners/img42.png';
import img43 from '@/assets/Partners/img43.png';


const AMCPartnersSection = () => {
  // Partner data with placeholder images
  const partners = [
  { id: 1, name: 'Aditya Birla Sun Life', logo: img1 },
  { id: 2, name: 'Axis Mutual Fund', logo: img2 },
  { id: 3, name: 'Bajaj Finserv', logo: img3 },
  { id: 4, name: 'Bandhan Mutual Fund', logo: img4 },
  { id: 5, name: 'Bank of India Mutual Fund', logo: img5 },
  { id: 6, name: 'BNP Paribas', logo: img6 },
  { id: 7, name: 'Canara Robeco', logo: img7 },
  { id: 8, name: 'DSP Mutual Fund', logo: img9 },
  { id: 9, name: 'Franklin Templeton', logo: img10 },
  { id: 10, name: 'HDFC Mutual Fund', logo: img11 },
  { id: 11, name: 'ICICI Prudential', logo: img12 },
  { id: 12, name: 'Kotak Mutual Fund', logo: img13 },
  { id: 13, name: 'L&T Mutual Fund', logo: img14 },
  { id: 14, name: 'Mirae Asset', logo: img15 },
  { id: 15, name: 'Nippon India', logo: img16 },
  { id: 16, name: 'SBI Mutual Fund', logo: img17 },
  { id: 17, name: 'Tata Mutual Fund', logo: img18 },
  { id: 18, name: 'Motilal Oswal', logo: img19 },
  { id: 19, name: 'Union Mutual Fund', logo: img20 },
  { id: 20, name: 'PGIM India', logo: img21 },
  { id: 21, name: 'HSBC Mutual Fund', logo: img22 },
  { id: 22, name: 'LIC Mutual Fund', logo: img23 },
  { id: 23, name: 'IDFC Mutual Fund', logo: img24 },
  { id: 24, name: 'JM Financial', logo: img25 },
  { id: 25, name: 'Quantum Mutual Fund', logo: img26 },
  { id: 26, name: 'Shriram Mutual Fund', logo: img27 },
  { id: 27, name: 'NJ Mutual Fund', logo: img28 },
  { id: 28, name: 'Indiabulls Mutual Fund', logo: img29 },
  { id: 29, name: 'Sundaram Mutual Fund', logo: img30 },
  { id: 30, name: 'UTI Mutual Fund', logo: img31 },
  { id: 31, name: 'IIFL Mutual Fund', logo: img32 },
  { id: 32, name: 'Mahindra Manulife', logo: img33 },
  { id: 33, name: 'Invesco Mutual Fund', logo: img34 },
  { id: 34, name: 'Baroda BNP Paribas', logo: img35 },
  { id: 35, name: 'Quant Mutual Fund', logo: img36 },
  { id: 36, name: 'Taurus Mutual Fund', logo: img37 },
  { id: 37, name: 'WhiteOak Capital', logo: img38 },
  { id: 38, name: '360 ONE Mutual Fund', logo: img39 },
  { id: 39, name: 'Trust Mutual Fund', logo: img40 },
  { id: 40, name: 'Groww Mutual Fund', logo: img41 },
  { id: 41, name: 'Samco Mutual Fund', logo: img42 },
  { id: 42, name: 'Zerodha Mutual Fund', logo: img43 },
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
                  {/* <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </p>
                  </div> */}
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
                  {/* <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </p>
                  </div> */}
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