import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const PageName = ({name}) => {

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


  return (
    <div>
        <motion.section 
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
                      Trusted by 1300+ Investors
                    </motion.div>
                    
                    <motion.h1 
                      className="text-4xl md:text-5xl font-extralight leading-none bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                    >
                     {name}
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
                        { value: "₹55Cr+", label: "Assets Under Management", color: "text-blue-300" },
                        { value: "16+", label: "Years Experience", color: "text-purple-300" },
                        { value: "1300+", label: "Happy Clients", color: "text-pink-300" }
                      ].map((stat, index) => (
                        <motion.div key={index} className="text-center" variants={itemVariants}>
                          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-sm opacity-75">{stat.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.section>
    </div>
  )
}

export default PageName