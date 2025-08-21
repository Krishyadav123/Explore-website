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
    id: "personalized-goal-planning",
    title: "Personalized Goal Planning",
    description:
      "Every individual has different dreams — owning a house, traveling the world, educating children, or building a retirement corpus. We help you define clear goals, assign realistic timelines, and align mutual funds for each objective.",
    features: [
      "Short, Mid & Long-Term Goals",
      "Timelines & Amounts",
      "Aligned Mutual Funds",
      "Progress Tracking & Reviews",
    ],
    image: "https://ploutia.com/images/services/mutual-fund.png",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    id: "comprehensive-portfolio-analysis",
    title: "Comprehensive Portfolio Analysis",
    description:
      "Your current mutual fund investments may not always match your evolving goals and market conditions. Our portfolio analysis service ensures optimized diversification, better performance, and reduced risk.",
    features: [
      "Review Existing Holdings",
      "Identify Underperforming Schemes",
      "Eliminate Overlaps",
      "Optimize Diversification",
      "Rebalancing Strategies",
    ],
    image: "https://ploutia.com/images/services/wealth-management.png",
    bgColor: "bg-gray-900",
    textColor: "text-white",
  },
  {
    id: "risk-profiling",
    title: "Risk Profiling (As Per SEBI Guidelines)",
    description:
      "Investing without understanding your risk capacity can lead to stress. We follow a structured SEBI-compliant risk profiling process to match the right investments with your profile.",
    features: [
      "Assess Risk Appetite",
      "Evaluate Investment Horizon",
      "Profile Categorization (Conservative/Moderate/Aggressive)",
      "Fund Recommendations by Risk Level",
    ],
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/v1755767516/ChatGPT_Image_Aug_21_2025_02_40_37_PM_eghemy.png",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description:
      "Retirement is not the end — it’s the beginning of a new, independent life. We help you estimate future expenses, plan for inflation, and build a retirement corpus for peace of mind.",
    features: [
      "Estimate Future Expenses",
      "Account for Inflation & Medical Costs",
      "SIP/Hybrid/Index Fund Strategies",
      "Regular Review & Adjustments",
    ],
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/v1755765700/Screenshot_2025-08-21_141122_ecnm8a.png",
    bgColor: "bg-gray-900",
    textColor: "text-white",
  },
  {
    id: "child-education-planning",
    title: "Child Education Planning",
    description:
      "The cost of quality education is rising rapidly. We help you plan for your child’s future with suitable mutual funds, ensuring debt-free education opportunities.",
    features: [
      "Future Education Cost Estimation",
      "Time Horizon Based Fund Selection",
      "Regular Monitoring",
      "Goal Tracking",
    ],
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/v1755766133/Screenshot_2025-08-21_141837_tjtbxb.png",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    id: "child-marriage-planning",
    title: "Child Marriage Planning",
    description:
      "Whether simple or grand, weddings require financial preparation. We help estimate costs, choose funds for growth, and ensure tax-efficient planning.",
    features: [
      "Future Expense Estimation",
      "Steady Growth Funds",
      "Liquidity Planning",
      "Tax-Efficient Withdrawals",
    ],
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/v1755765929/Screenshot_2025-08-21_141516_lec5mq.png",
    bgColor: "bg-gray-900",
    textColor: "text-white",
  },
  {
    id: "wealth-creation",
    title: "Wealth Creation",
    description:
      "Wealth is built with discipline and the power of compounding. Our strategies help you grow step by step with SIPs and diversification.",
    features: [
      "Long-Term Opportunities",
      "SIP-Based Planning",
      "Diversification Strategies",
      "Performance Tracking & Rebalancing",
    ],
    image: "https://res.cloudinary.com/dhf8eyjee/image/upload/v1755766350/Screenshot_2025-08-21_142217_hcwst5.png",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
];


const additionalServices = [
  {
    icon: Target,
    title: "Personalized Goal Planning",
    description:
      "Define your short, mid, and long-term financial goals, assign timelines, and align mutual funds to track progress regularly.",
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: TrendingUp,
    title: "Comprehensive Portfolio Analysis",
    description:
      "Review your existing holdings, identify underperforming funds, eliminate overlaps, and optimize diversification with rebalancing strategies.",
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Risk Profiling (SEBI Guidelines)",
    description:
      "Assess your risk appetite, horizon, and financial situation to recommend funds that suit your profile — Conservative, Moderate, or Aggressive.",
    gradient: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description:
      "Plan for a comfortable retirement by estimating expenses, accounting for inflation, and building a strong corpus with SIPs and hybrid funds.",
    gradient: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Users,
    title: "Child Education Planning",
    description:
      "Plan for rising education costs by projecting future expenses and investing in mutual funds aligned with your child’s future needs.",
    gradient: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: Home,
    title: "Child Marriage Planning",
    description:
      "Prepare financially for wedding expenses with steady-growth, liquid, and tax-efficient investment strategies.",
    gradient: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Award,
    title: "Wealth Creation",
    description:
      "Grow wealth step by step using SIP-led strategies, diversification across equity/hybrid funds, and disciplined rebalancing.",
    gradient: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
  },
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

                <img src={service.image} className='h-full w-full object-cover' alt="" />

                      {/* {index === 0 && <img src="https://ploutia.com/images/services/mutual-fund.png" className='h-full w-full object-cover' alt="" /> }
                      {index === 1 && <img src="https://ploutia.com/images/services/wealth-management.png " className='h-full w-full object-cover' alt="" />}
                      {index === 2 && <img src="https://ploutia.com/images/services/personal-finance-coaching.png" className='h-full w-full object-cover' alt="" />}
                      {index === 3 && <img src="https://ploutia.com/images/services/personal-finance-coaching.png" className='h-full w-full object-cover' alt="" />}
                      {index === 4 && <img src="https://ploutia.com/images/services/personal-finance-coaching.png" className='h-full w-full object-cover' alt="" />}
                      {index === 5 && <img src="https://ploutia.com/images/services/personal-finance-coaching.png" className='h-full w-full object-cover' alt="" />}
                      {index === 6 && <img src="https://ploutia.com/images/services/personal-finance-coaching.png" className='h-full w-full object-cover' alt="" />} */}
                      
                      {/* <div className="text-white font-semibold text-lg opacity-90">
                        {service.title}
                      </div> */}
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
  className="relative py-16 px-6 bg-black overflow-hidden"
>
  {/* Subtle Background Gradient (instead of multiple blurred blobs) */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90" />

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Section Header */}
    <motion.div variants={itemVariants} className="text-center mb-16">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6"
      >
        <Briefcase className="w-8 h-8 text-white" />
      </motion.div>

      <h2 className="text-4xl font-bold text-white mb-4">
        Additional Services
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto mb-4 rounded-full" />
      <p className="text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
        Comprehensive financial solutions to support every step of your wealth journey.
      </p>
    </motion.div>

    {/* Service Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {additionalServices.map((service, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -6 }}
          className="relative group p-6 rounded-xl bg-white/95 backdrop-blur-md shadow-lg text-center transition-all"
        >
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-6`}
          >
            <service.icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center mt-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
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
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Why Choose Us
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Your trusted partner for transparent, SEBI-compliant financial planning
        and long-term wealth creation
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: Award,
          title: "SEBI-Registered & AMFI-Certified",
          desc: "Work with certified professionals who follow strict SEBI guidelines, ensuring compliance and reliability.",
        },
        {
          icon: Shield,
          title: "Transparent & Unbiased Advice",
          desc: "No hidden agendas — just honest, unbiased recommendations tailored to your unique goals.",
        },
        {
          icon: TrendingUp,
          title: "Regular Portfolio Reviews",
          desc: "We continuously track, review, and rebalance your investments so you stay aligned with your goals.",
        },
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
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {feature.title}
          </h3>
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