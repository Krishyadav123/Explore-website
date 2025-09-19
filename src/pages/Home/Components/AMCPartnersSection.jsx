import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Shield, Users, ChevronLeft, ChevronRight } from 'lucide-react';

// Import all your images (you'll need to replace these with your actual imports)
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Partner data with your actual images
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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Duplicate partners for seamless loop (desktop only)
  const duplicatedPartners = [...partners, ...partners];

  // Mobile carousel logic
  const partnersPerSlide = 6; // 2 rows × 3 columns
  const totalSlides = Math.ceil(partners.length / partnersPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlidePartners = () => {
    const startIndex = currentSlide * partnersPerSlide;
    return partners.slice(startIndex, startIndex + partnersPerSlide);
  };

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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">AMC Partners</span> We Work With
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We've partnered with India's leading Asset Management Companies to bring you the best investment opportunities and financial solutions.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mx-auto">
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

        {/* Partners Section */}
        {isMobile ? (
          // Mobile: Carousel with grid layout
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {getCurrentSlidePartners().map((partner, index) => (
                  <div
                    key={`mobile-${currentSlide}-${index}`}
                    className="bg-gray-50 rounded-lg p-2 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-12 object-contain"
                    />
                  </div>
                ))}
              </div>
              
              {/* Mobile Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="w-5 h-5 text-blue-600" />
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop: Infinite scroll carousel
          <div className="relative">
            <div className="overflow-hidden">
              {/* First Row - Left to Right */}
              <div className="flex space-x-8 mb-8 animate-scroll-left">
                {duplicatedPartners.slice(0, duplicatedPartners.length / 2).map((partner, index) => (
                  <div
                    key={`row1-${index}`}
                    className="flex-shrink-0 bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    style={{ minWidth: '200px' }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-16 object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Second Row - Right to Left */}
              <div className="flex space-x-5 md:space-x-8 pb-2 animate-scroll-right">
                {duplicatedPartners.slice(duplicatedPartners.length / 2).map((partner, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex-shrink-0 bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    style={{ minWidth: '200px' }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-16 object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
          </div>
        )}
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
          animation: scroll-left 40s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
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