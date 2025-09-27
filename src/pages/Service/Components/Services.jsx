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
  PiggyBank,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';


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
  const [selectedService, setSelectedService] = useState(null);


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
      
      {/* Main Services Section */}
      <motion.section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`rounded-3xl overflow-hidden ${service.bgColor} shadow-lg border border-gray-200`}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-5 lg:p-10 flex flex-col justify-center">
                  <h2
                    className={`text-xl lg:text-2xl font-bold mb-2 ${service.textColor}`}
                  >
                    {service.title}
                  </h2>

                  <p className={`text-base mb-8 leading-relaxed ${service.textColor}`} >
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={`font-medium text-sm ${service.textColor}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More opens popup */}
                  <motion.button
                    onClick={() => setSelectedService(service)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-base bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Image Side */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="h-80 lg:h-full w-full object-cover"
                    whileHover={{ scale: 1.02 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Popup Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-auto max-w-2xl w-full p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
        <div className="space-y-6 text-gray-700">
  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
    💰 Steps in Personal Financial Goal Planning
  </h2>

  <ol className="list-decimal pl-6 space-y-4 text-base leading-relaxed">
    <li>
      <span className="font-semibold">Identify Your Financial Needs</span>  
      <p className="text-gray-600">
        Think about what you want: saving, buying a house, child’s education, retirement, etc.
      </p>
    </li>

    <li>
      <span className="font-semibold">Set Clear Goals</span>  
      <p className="text-gray-600">
        Write them clearly (short-term, medium-term, long-term).
      </p>
    </li>

    <li>
      <span className="font-semibold">Make Them SMART</span>  
      <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
        <li>Specific (e.g., buy a car worth ₹6 lakh)</li>
        <li>Measurable (how much money needed)</li>
        <li>Achievable (realistic with your income)</li>
        <li>Relevant (important for you)</li>
        <li>Time-bound (set deadline, e.g., 3 years)</li>
      </ul>
    </li>

    <li>
      <span className="font-semibold">Prioritize Your Goals</span>  
      <p className="text-gray-600">Decide which goal is most urgent or important.</p>
    </li>

    <li>
      <span className="font-semibold">Check Your Current Financial Position</span>  
      <p className="text-gray-600">
        Income, expenses, savings, existing loans, and assets.
      </p>
    </li>

    <li>
      <span className="font-semibold">Estimate How Much You Need</span>  
      <p className="text-gray-600">Calculate the future cost of each goal (consider inflation).</p>
    </li>

    <li>
      <span className="font-semibold">Create an Action Plan</span>  
      <p className="text-gray-600">
        Decide how much to save or invest regularly (monthly SIPs, deposits, etc.).
      </p>
    </li>

    <li>
      <span className="font-semibold">Choose the Right Investment Options</span>  
      <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
        <li>Short-term goals → safer investments (FD, RD, liquid funds)</li>
        <li>Long-term goals → growth investments (mutual funds, stocks, retirement plans)</li>
      </ul>
    </li>

    <li>
      <span className="font-semibold">Implement and Automate</span>  
      <p className="text-gray-600">
        Start saving/investing regularly, automate if possible.
      </p>
    </li>

    <li>
      <span className="font-semibold">Review and Adjust</span>  
      <p className="text-gray-600">
        Check progress yearly. Adjust plan if income, expenses, or goals change.
      </p>
    </li>

    <li>
      <span className="font-semibold">Celebrate Milestones</span>  
      <p className="text-gray-600">Acknowledge achievements and stay motivated.</p>
    </li>
  </ol>
</div>

          </motion.div>
        </div>
      )}
    

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
    {/* <div className="text-center mt-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        Explore All Services
      </motion.button>
    </div> */}
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
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
        Why Choose Us
      </h2>
      <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
        Your trusted partner for transparent, SEBI-compliant financial planning
        and long-term wealth creation
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-5 md:gap-8">
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


     
    </div>
  );
}

export default Services;