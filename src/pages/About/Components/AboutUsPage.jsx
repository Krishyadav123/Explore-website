import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Target, 
  Award, 
  BookOpen, 
  Headphones, 
  Lightbulb,
  CheckCircle,
  Star,
  ArrowRight,
  BarChart3,
  Play,
  Quote,
  Zap,
  Clock,
  Globe,
  ChevronDown
} from 'lucide-react';

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const approaches = [
    {
      icon: Users,
      title: "Personalized Solutions",
      description: "Every client is unique, and so are their financial needs and goals. Our personalized approach ensures that our investment strategies are tailored to meet the specific requirements of our clients.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Expert Guidance",
      description: "Our team's extensive experience in the financial industry helps us with the approach to navigate the complexities of mutual fund investments, keeping our clients informed.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Headphones,
      title: "Ongoing Support",
      description: "We believe in building long-term relationships with our clients. Our commitment is to provide financial guidance that evolves with changing needs and market conditions.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const whyChooseUs = [
    {
      title: "Experience and Expertise",
      description: "With years of experience in wealth management and investments, our team brings value-added expertise to the table.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      stats: "15+ Years",
      icon: Award
    },
    {
      title: "Licensed Professionals",
      description: "We hold all the necessary licenses for Mutual Fund Distribution, ensuring compliance at every step.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      stats: "100% Certified",
      icon: Shield
    },
    {
      title: "Client-Centric Approach",
      description: "Your financial goals and risk tolerance are our top priorities. We tailor our services to meet your specific needs.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
      stats: "500+ Clients",
      icon: Users
    },
    {
      title: "Comprehensive Services",
      description: "From mutual fund distribution to wealth management and personal financial coaching, we offer a holistic approach to financial planning.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      stats: "Full Service",
      icon: Globe
    }
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "Senior Financial Advisor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      experience: "15+ Years",
      specialization: "Wealth Management",
      certifications: ["CFA", "CFP"]
    },
    {
      name: "Sarah Johnson",
      role: "Portfolio Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      experience: "12+ Years",
      specialization: "Risk Analysis",
      certifications: ["CFA", "FRM"]
    },
    {
      name: "Michael Chen",
      role: "Investment Analyst",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      experience: "8+ Years",
      specialization: "Market Research",
      certifications: ["CFA", "CAIA"]
    }
  ];

  const philosophyTabs = [
    {
      title: "Our Mission",
      content: "To empower individuals and families to achieve financial independence through innovative investment strategies and personalized financial planning.",
      icon: Target
    },
    {
      title: "Our Vision",
      content: "To be the most trusted financial partner, transforming lives through exceptional wealth management services and sustainable growth strategies.",
      icon: Lightbulb
    },
    {
      title: "Our Values",
      content: "Integrity, transparency, and client success form the foundation of everything we do. We believe in building lasting relationships based on trust and mutual respect.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      {/* <motion.section 
        className="relative h-96 flex items-center justify-center text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                delay: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              Trusted by 500+ Investors
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-extralight leading-none bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              About
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Empowering your financial future through expertise, dedication, and 
              <span className="text-blue-300 font-medium"> personalized solutions</span>
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-8 pt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { value: "₹100Cr+", label: "Assets Under Management", color: "text-blue-300" },
                { value: "15+", label: "Years Experience", color: "text-purple-300" },
                { value: "500+", label: "Happy Clients", color: "text-pink-300" }
              ].map((stat, index) => (
                <motion.div key={index} className="text-center" variants={itemVariants}>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm opacity-75">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section> */}

      {/* Enhanced Company Overview */}
      <motion.section 
        className="py-24 px-4 bg-gradient-to-br from-slate-50 to-blue-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Financial Excellence
                </motion.div>
                <h2 className="text-5xl font-extralight text-gray-900 leading-tight">
                  Explore Financial 
                  <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-medium">
                    Opportunities with Ploutia
                  </span>
                </h2>
              </div>
              
              <div className="prose prose-lg text-gray-600">
                <p className="leading-relaxed">
                  Welcome to our firm, where your financial aspirations meet seasoned expertise and 
                  personalized guidance. We are a dedicated team of professionals with extensive 
                  experience in the financial industry, and our primary mission is to empower individuals 
                  and families to achieve their financial goals through prudent and personalized investment strategies.
                </p>
              </div>

              <motion.div 
                className="grid grid-cols-2 gap-6"
                variants={containerVariants}
              >
                {[
                  { label: "Client Retention", value: "98%", icon: Users },
                  { label: "Average Return", value: "12.5%", icon: TrendingUp },
                  { label: "Response Time", value: "< 2hrs", icon: Clock },
                  { label: "Success Rate", value: "95%", icon: Target }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                      variants={scaleVariants}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="flex items-center gap-6">
                <motion.button 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-medium flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                <motion.button 
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                  Watch Our Story
                </motion.button>
              </div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="relative">
                <motion.div 
                  className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=700&h=500&fit=crop"
                  alt="Financial Planning"
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-sm"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Industry Recognition</h4>
                      <p className="text-sm text-gray-600">Top Financial Advisor 2024</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Philosophy Section with Tabs */}
      <motion.section 
        className="py-24 px-4 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-6">Our Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At the core of our philosophy is a commitment to understanding and prioritizing the 
              unique financial goals and risk appetites of our clients.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {philosophyTabs.map((tab, index) => {
              const IconComponent = tab.icon;
              return (
                <motion.div 
                  key={index}
                  className={`p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
                    activeTab === index 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}
                  variants={scaleVariants}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    activeTab === index ? 'bg-white/20' : 'bg-white shadow-lg'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      activeTab === index ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{tab.title}</h3>
                  <p className={`leading-relaxed ${
                    activeTab === index ? 'opacity-90' : 'opacity-70'
                  }`}>
                    {tab.content}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-24 px-4 bg-gradient-to-br from-gray-50 to-slate-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4 mr-2" />
              Meet Our Experts
            </motion.div>
            <h2 className="text-5xl font-extralight text-gray-900 mb-6">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team is composed of highly skilled and licensed professionals who bring a 
              wealth of knowledge and experience to the table.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                variants={scaleVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div className="relative mb-6">
                  <div className="relative">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-blue-100"
                    />
                    <motion.div 
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center ring-4 ring-white"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-sm text-gray-500">{member.experience}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-3">{member.specialization}</p>
                    <div className="flex justify-center gap-2">
                      {member.certifications.map((cert, certIndex) => (
                        <motion.span 
                          key={certIndex}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium"
                          whileHover={{ scale: 1.1 }}
                        >
                          {cert}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Approach Section */}
      <motion.section 
        className="py-24 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{
              duration: 8,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-5xl font-extralight mb-6">Our Approach</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We believe in a comprehensive, personalized approach to wealth management
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {approaches.map((approach, index) => {
              const IconComponent = approach.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                  variants={scaleVariants}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${approach.gradient} rounded-2xl flex items-center justify-center mb-6`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">{approach.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{approach.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        className="py-24 px-4 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-6">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in the world of financial services
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100"
                  variants={scaleVariants}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    <motion.div 
                      className="absolute top-4 right-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-4 left-4"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-gray-900">{item.stats}</span>
                      </div>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
      {/* Testimonials Section */}
      {/* <motion.section
        className="py-24 px-4 bg-gradient-to-br from-gray-50 to-slate-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">

          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-5xl font-extralight text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those who have experienced our commitment to excellence firsthand
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                quote: "Ploutia has transformed my financial future. Their personalized approach and expert guidance have been invaluable.",
                name: "Alice Johnson",
                role: "Entrepreneur",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
              },
              {
                quote: "The team at Ploutia is exceptional. They truly care about their clients and go above and beyond to ensure success.",
                name: "David Smith",
                role: "Software Engineer",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop"
              },
              {
                quote: "I highly recommend Ploutia for anyone looking to grow their wealth. Their expertise is unmatched.",
                name: "Emily Davis",
                role: "Marketing Manager",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                variants={scaleVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section> */}
    </div>
  );
  
}
                 
export default AboutUsPage;