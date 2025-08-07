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
  MapPin,
  Home,
  PiggyBank
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
    icon: Shield,
    title: "Insurance Planning",
    description: "Protect your assets and loved ones with comprehensive insurance strategies tailored to your needs.",
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50"
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Maximize your returns with expert investment guidance and portfolio optimization.",
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Calculator,
    title: "Tax Planning",
    description: "Minimize your tax burden through strategic planning and optimization strategies.",
    gradient: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Home,
    title: "Real Estate Finance",
    description: "Navigate property investments and mortgages with confidence and expertise.",
    gradient: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description: "Secure your future with comprehensive retirement savings and investment strategies.",
    gradient: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Briefcase,
    title: "Business Finance",
    description: "Grow your business with tailored financing solutions and strategic financial planning.",
    gradient: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50"
  },
  {
    icon: Users,
    title: "Estate Planning",
    description: "Protect your legacy with sophisticated estate planning and wealth transfer strategies.",
    gradient: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50"
  },
  {
    icon: Award,
    title: "Wealth Management",
    description: "Preserve and grow your wealth with personalized management and advisory services.",
    gradient: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-50"
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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.03,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const iconContainerVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
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
      {/* <motion.section
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
      </motion.section> */}

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
                <div className={`p-12 lg:p-10 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <motion.h2
                    className={`text-3xl lg:text-2xl font-bold mb-2 ${service.textColor}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {service.title}
                  </motion.h2>
                  
                  <motion.p
                    className={`text-base mb-8 leading-relaxed ${
                      service.textColor === 'text-white' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {service.description}
                  </motion.p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className={`w-4 h-4 ${
                          service.textColor === 'text-white' ? 'text-green-400' : 'text-green-500'
                        }`} />
                        <span className={`font-medium text-sm ${
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
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-base transition-all duration-300 ${
                      service.textColor === 'text-white'
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } shadow-lg hover:shadow-xl`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                
                {/* Image Side */}
                <div className={`relative overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <motion.div
                    className="h-80 lg:h-full w-full  flex items-center justify-center relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Placeholder for financial imagery */}
                    <div
                     
                      className="text-center w-full h-full"
                    >
                      {index === 0 && <img src="https://ploutia.com/images/services/mutual-fund.png" className='h-full w-full object-cover' alt="" /> }
                      {index === 1 && <img src="https://ploutia.com/images/services/wealth-management.png " className='h-full w-full object-cover' alt="" />}
                      {index === 2 && <img src="https://ploutia.com/images/services/personal-finance-coaching.png" className='h-full w-full object-cover' alt="" />}
                      
                      <div className="text-white font-semibold text-lg opacity-90">
                        {service.title}
                      </div>
                    </div>
                    
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
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative py-10 px-6 overflow-hidden bg-black"
      // style={{
      //   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      // }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 bg-opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300 bg-opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white bg-opacity-30 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          variants={itemVariants} 
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm mb-6"
          >
            <Briefcase className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Additional Services
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto mb-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p 
            className="text-base text-white text-opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Comprehensive financial solutions designed to support every aspect of your financial journey with expertise and innovation
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="relative group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative p-5 rounded-xl bg-white bg-opacity-95 backdrop-blur-lg border border-white border-opacity-20 shadow-2xl overflow-hidden text-center h-full"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent) border-box`,
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'exclude'
                  }}
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                      'linear-gradient(145deg, transparent, rgba(255,255,255,0.1), transparent)',
                      'linear-gradient(245deg, transparent, rgba(255,255,255,0.1), transparent)',
                      'linear-gradient(345deg, transparent, rgba(255,255,255,0.1), transparent)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <motion.div
                  variants={iconContainerVariants}
                  className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 mx-auto shadow-lg`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                  
                  {/* Icon Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-20"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                {/* Hover Shine Effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16"
          // initial={{ opacity: 0, y: 40 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm text-white font-semibold rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 shadow-lg"
          >
            Explore All Services
          </motion.button>
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