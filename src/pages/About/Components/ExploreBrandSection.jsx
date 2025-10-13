import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Search,
  Briefcase,
  Droplet,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";

const ExploreBrandSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const explorePrinciples = [
    {
      letter: "E",
      title: "Expertise",
      description:
        "Professional management is a foundation of mutual funds, where experienced fund managers make investment decisions and navigate market complexities to optimize returns for investors.",
      icon: Award,
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      letter: "X",
      title: "eXamination",
      description:
        "Thorough examination and analysis are crucial in mutual funds, involving deep research of assets, fund performance, and market trends to select suitable investment opportunities.",
      icon: Search,
      gradient: "from-purple-600 via-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      accentColor: "bg-purple-600",
      textColor: "text-purple-600",
    },
    {
      letter: "P",
      title: "Portfolio",
      description:
        "Portfolio diversification is a major benefit of mutual fund investing, reducing risk for investors by spreading assets across various stocks, bonds, and other securities.",
      icon: Briefcase,
      gradient: "from-indigo-600 via-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      accentColor: "bg-indigo-600",
      textColor: "text-indigo-600",
    },
    {
      letter: "L",
      title: "Liquidity",
      description:
        "Liquidity ensures mutual fund investors can easily buy or redeem their shares, offering flexibility to enter or exit investments at calculated Net Asset Value (NAV).",
      icon: Droplet,
      gradient: "from-cyan-600 via-cyan-500 to-teal-500",
      bgGradient: "from-cyan-50 to-teal-50",
      accentColor: "bg-cyan-600",
      textColor: "text-cyan-600",
    },
    {
      letter: "O",
      title: "Ownership",
      description:
        "Mutual fund investment gives partial ownership in the fund's diversified holdings, with every share representing a proportional interest in the fund's assets.",
      icon: Users,
      gradient: "from-green-600 via-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      accentColor: "bg-green-600",
      textColor: "text-green-600",
    },
    {
      letter: "R",
      title: "Returns",
      description:
        "Returns in mutual funds come through capital gains, interest, or dividends, driven by the fund's underlying portfolio and professional management.",
      icon: TrendingUp,
      gradient: "from-orange-600 via-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      accentColor: "bg-orange-600",
      textColor: "text-orange-600",
    },
    {
      letter: "E",
      title: "Efficiency",
      description:
        "Mutual funds offer investment efficiency through economies of scale, low minimum investments, and optimized expense ratios, maximizing the value and return for shareholders.",
      icon: Zap,
      gradient: "from-violet-600 via-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50",
      accentColor: "bg-violet-600",
      textColor: "text-violet-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 mr-2" />
            What Makes Us Different
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            The Meaning Behind
            <span className="block mt-2 text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
              EXPLORE
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Each letter represents a core principle that drives our commitment
            to your financial success
          </p>
        </motion.div>

        {/* Main Content - Letter Cards */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {explorePrinciples.map((principle, index) => {
            const IconComponent = principle.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.div
                  className={`relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 ${
                    isHovered ? "shadow-2xl shadow-blue-500/20" : ""
                  }`}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${principle.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Letter Badge */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <div
                        className={`w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${principle.gradient} rounded-3xl flex items-center justify-center shadow-2xl`}
                      >
                        <span className="text-4xl md:text-6xl font-bold text-white">
                          {principle.letter}
                        </span>
                      </div>

                      {/* Rotating Ring Effect */}
                      {/* <motion.div
                        className={`absolute inset-0 rounded-3xl border-4 border-white/30`}
                        animate={{
                          rotate: isHovered ? 180 : 0,
                          scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      /> */}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-br ${principle.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                          whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {principle.title}
                          </h3>
                          <motion.div
                            className={`h-1 bg-gradient-to-r ${principle.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      <p className="text-base md:text-lg text-blue-100 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>

                    {/* Index Number */}
                    <motion.div
                      className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <span className="text-sm font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://login.exploremfs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/30"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Exploring Today
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreBrandSection;