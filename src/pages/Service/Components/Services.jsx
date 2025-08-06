import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Star,
  PieChart,
  Calculator,
  DollarSign,
  BarChart3,
  Briefcase,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      let startTime;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 'mutual-funds',
      title: 'Mutual Fund Distribution',
      description: 'We specialize in mutual fund distribution, offering a wide array of funds to match diverse investment objectives and risk profiles. Whether you are a conservative investor seeking stability or an aggressive investor looking for high returns, we have the right mutual fund options for you.',
      features: [
        'Equity Funds',
        'Debt Funds', 
        'Hybrid Funds',
        'Tax Saving Funds',
        'SIP Planning',
        'Portfolio Review'
      ],
      image: 'https://ploutia.com/images/services/mutual-fund.png',
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      id: 'wealth-management',
      title: 'Wealth Management',
      description: 'Our wealth management services are designed to provide comprehensive financial planning and investment management. We work closely with our clients to develop long-term strategies that encompass asset allocation, risk management, tax planning, and retirement planning.',
      features: [
        'Portfolio Management',
        'Risk Assessment',
        'Asset Allocation',
        'Financial Planning',
        'Tax Optimization',
        'Retirement Planning'
      ],
      image: 'https://ploutia.com/images/services/wealth-management.png',
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      id: 'personal-finance',
      title: 'Personal Finance Coaching',
      description: 'Financial literacy is a cornerstone of financial success. Our personal finance coaching services are aimed at educating our clients about money management, budgeting, and investment principles. We believe that informed clients are empowered clients, capable of making sound financial decisions.',
      features: [
        'Budget Planning',
        'Debt Management',
        'Investment Education',
        'Goal Setting',
        'Financial Analysis',
        'Regular Monitoring'
      ],
      image: 'https://ploutia.com/images/services/personal-finance-coaching.png',
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    }
  ];

  const additionalServices = [
    {
      icon: Calculator,
      title: 'Financial Calculators',
      description: 'Advanced tools to calculate SIP returns, loan EMIs, and investment projections.'
    },
    {
      icon: Shield,
      title: 'Insurance Planning',
      description: 'Comprehensive insurance solutions including life, health, and property insurance.'
    },
    {
      icon: Award,
      title: 'Tax Planning',
      description: 'Strategic tax planning to maximize savings and ensure compliance with regulations.'
    },
    {
      icon: Target,
      title: 'Goal-Based Investing',
      description: 'Customized investment strategies aligned with your specific financial goals.'
    }
  ];

  const stats = [
    { number: 5000, suffix: '+', label: 'Happy Clients' },
    { number: 15, suffix: '+', label: 'Years Experience' },
    { number: 500, suffix: 'Cr+', label: 'AUM Managed' },
    { number: 98, suffix: '%', label: 'Client Satisfaction' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative overflow-hidden px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            SERVICES
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive financial solutions tailored to help you achieve your investment goals 
            and secure your financial future with expert guidance and proven strategies.
          </motion.p>
        </div>
      </motion.section> */}

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-6 bg-white border-y border-gray-200"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <AnimatedCounter end={stat.number} />
                  <span className="text-blue-600">{stat.suffix}</span>
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredService(index)}
              onHoverEnd={() => setHoveredService(null)}
              className={`rounded-3xl overflow-hidden ${service.bgColor} ${
                index === 1 ? 'shadow-2xl' : 'shadow-lg border border-gray-200'
              }`}
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content Side */}
                <div className={`p-12 lg:p-16 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <motion.h2
                    className={`text-3xl lg:text-4xl font-bold mb-6 ${service.textColor}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {service.title}
                  </motion.h2>
                  
                  <motion.p
                    className={`text-lg mb-8 leading-relaxed ${
                      service.textColor === 'text-white' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {service.description}
                  </motion.p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className={`w-5 h-5 ${
                          service.textColor === 'text-white' ? 'text-green-400' : 'text-green-500'
                        }`} />
                        <span className={`font-medium ${
                          service.textColor === 'text-white' ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      service.textColor === 'text-white'
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } shadow-lg hover:shadow-xl`}
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
                
                {/* Image Side */}
                <div className={`relative overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <motion.div
                    className="h-80 lg:h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Placeholder for financial imagery */}
                    <motion.div
                      animate={hoveredService === index ? { 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1] 
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      {index === 0 && <img src="https://ploutia.com/images/services/mutual-fund.png" alt="" /> }
                      {index === 1 && <BarChart3 className="w-24 h-24 text-white mb-4" />}
                      {index === 2 && <Users className="w-24 h-24 text-white mb-4" />}
                      
                      <div className="text-white font-semibold text-lg opacity-90">
                        {service.title}
                      </div>
                    </motion.div>
                    
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white border-dashed rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Additional Services */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions to support every aspect of your financial journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 mx-auto"
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted expertise and personalized approach to help you achieve financial success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Award, 
                title: 'Certified Professionals', 
                desc: 'AMFI registered mutual fund distributors with extensive market knowledge and experience' 
              },
              { 
                icon: Clock, 
                title: 'Personalized Service', 
                desc: 'Dedicated relationship managers providing customized solutions for your unique financial needs' 
              },
              { 
                icon: TrendingUp, 
                title: 'Proven Track Record', 
                desc: 'Consistent performance with transparent reporting and regular portfolio reviews' 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="text-center p-8"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 mx-auto"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      {/* <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Investment Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Get personalized financial advice and investment solutions from our certified professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Schedule Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Use Calculators
              </motion.button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12 text-blue-100">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>contact@ploutia.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+91-9876543210</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section> */}
    </div>
  );
}

export default Services;