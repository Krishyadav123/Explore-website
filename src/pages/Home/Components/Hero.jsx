import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Global Investment Solutions for Indians and NRIs",
    description:
      "Serving clients across India and overseas, we combine market insight, innovation, and integrity to help you build a secure and prosperous future — wherever life takes you.",
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/f_auto,q_auto,w_1200/v1755160727/dynamic-data-visualization-3d_jpemgp.jpg",
    primaryButton: "Explore Solutions",
    secondaryButton: "Contact Us",
  },
  {
    title: "Where Intelligent Investing Meets Personalized Strategy",
    description:
      "With 13+ years of expertise and SEBI registration, Explore helps you turn your financial goals into reality. From buying your dream home to building long-term wealth, we design strategies tailored just for you.",
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/v1755161109/imgi_1_home-about_fwt1au.png",
    primaryButton: "Start Your Journey",
    secondaryButton: "Contact Us",
  },
  {
    title: "Plan. Invest. Grow — With Clarity and Confidence",
    description:
      "Every financial journey is unique. Our AI-backed risk profiling and goal-based planning ensure your investments match your vision — whether it’s retirement, education, or wealth creation.",
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/f_auto,q_auto,w_1200/v1755161588/green-arrow-is-going-up-stacks-coins-arranged-bar-graph_ti6ltr.jpg",
    primaryButton: "Get Risk Profile",
    secondaryButton: "Contact Us",
  },
];


const imageVariants = {
  enter: { opacity: 0, scale: 0.95 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-4xl font-bold leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services"><button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                {slides[currentSlide].primaryButton}
              </button></Link>
              <Link to="/contact">
              <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                {slides[currentSlide].secondaryButton}
              </button></Link>
            </div>

            {/* Feature Icons */}
            <div className="flex space-x-8 pt-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Smart Investing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure Planning</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Expert Guidance</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[currentSlide].image}
                src={slides[currentSlide].image}
                alt="Slide Image"
                className="w-full h-96 lg:h-[400px] object-cover rounded-2xl"
                initial="enter"
                animate="center"
                exit="exit"
                variants={imageVariants}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center space-x-4 mt-12">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <span className="text-sm">Scroll Down</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
