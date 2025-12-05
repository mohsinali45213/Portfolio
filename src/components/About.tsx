import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart3, Database, Brain, Zap, Heart, Coffee, Lightbulb, Target, FolderGit2, Award } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const About = () => {
  const { personalInfo, projects, skills, certificates } = usePortfolioStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const personalStats = [
    { label: "Projects", value: projects.length.toString(), icon: FolderGit2, color: "text-cyan-400" },
    { label: "Skills", value: skills.length.toString(), icon: Target, color: "text-purple-400" },
    { label: "Certificates", value: certificates.length.toString(), icon: Award, color: "text-green-400" },
    { label: "Cups of Coffee", value: "∞", icon: Coffee, color: "text-yellow-400" },
  ];

  const passions = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Building intelligent systems that learn from data and make accurate predictions to solve real-world problems."
    },
    {
      icon: Lightbulb,
      title: "Data Innovation",
      description: "Discovering hidden patterns in data and transforming raw information into actionable business insights."
    },
    {
      icon: Zap,
      title: "Agentic AI",
      description: "Creating autonomous AI agents that can perceive, reason, and act independently to accomplish complex tasks and goals."
    },
    {
      icon: Database,
      title: "Full Stack Web Dev",
      description: "Building end-to-end web applications with modern frameworks, databases, and cloud infrastructure for scalable solutions."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.bio}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Profile & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                  <div className="w-28 h-28 bg-gray-800 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h3>
                <p className="text-cyan-400 font-medium">{personalInfo.title}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {personalStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center group hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                  >
                    <Icon size={32} className={`${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Passions */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-8">What Drives Me</h3>
            {passions.map((passion, index) => {
              const Icon = passion.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {passion.title}
                      </h4>
                      <p className="text-white/70 leading-relaxed">
                        {passion.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Ready to unlock the power of your data? Let's collaborate and turn your data into actionable insights.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all duration-300"
          >
            Let's Analyze Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;