import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, 
  Database, 
  BarChart3, 
  Brain, 
  Cloud, 
  GitBranch,
  TrendingUp,
  Zap,
  Target,
  Activity
} from 'lucide-react';

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillsData = [
    // Programming Languages
    { name: "Python", level: 95, icon: Code2, color: "from-blue-400 to-blue-600", category: "Programming" },
    { name: "JavaScript", level: 88, icon: Code2, color: "from-yellow-400 to-yellow-600", category: "Programming" },
    { name: "R", level: 85, icon: Code2, color: "from-blue-500 to-indigo-600", category: "Programming" },
    { name: "SQL", level: 92, icon: Database, color: "from-green-400 to-green-600", category: "Programming" },
    { name: "Java", level: 80, icon: Code2, color: "from-red-400 to-red-600", category: "Programming" },
    { name: "C++", level: 75, icon: Code2, color: "from-purple-400 to-purple-600", category: "Programming" },

    // Data Science Libraries
    { name: "NumPy", level: 95, icon: BarChart3, color: "from-cyan-400 to-cyan-600", category: "Data Science" },
    { name: "Pandas", level: 95, icon: Database, color: "from-indigo-400 to-indigo-600", category: "Data Science" },
    { name: "Matplotlib", level: 90, icon: TrendingUp, color: "from-orange-400 to-orange-600", category: "Data Science" },
    { name: "Seaborn", level: 88, icon: Activity, color: "from-teal-400 to-teal-600", category: "Data Science" },
    { name: "Scikit-learn", level: 92, icon: Brain, color: "from-pink-400 to-pink-600", category: "Data Science" },
    { name: "TensorFlow", level: 88, icon: Brain, color: "from-amber-400 to-amber-600", category: "Data Science" },

    // Machine Learning
    { name: "Machine Learning", level: 90, icon: Brain, color: "from-purple-500 to-pink-500", category: "ML/AI" },
    { name: "Deep Learning", level: 85, icon: Zap, color: "from-violet-400 to-violet-600", category: "ML/AI" },
    { name: "NLP", level: 82, icon: Target, color: "from-emerald-400 to-emerald-600", category: "ML/AI" },
    { name: "Computer Vision", level: 80, icon: Target, color: "from-rose-400 to-rose-600", category: "ML/AI" },

    // Big Data & Cloud
    { name: "Apache Spark", level: 85, icon: Zap, color: "from-orange-500 to-red-500", category: "Big Data" },
    { name: "Hadoop", level: 78, icon: Database, color: "from-yellow-500 to-orange-500", category: "Big Data" },
    { name: "AWS", level: 88, icon: Cloud, color: "from-blue-500 to-cyan-500", category: "Cloud" },
    { name: "GCP", level: 82, icon: Cloud, color: "from-green-500 to-blue-500", category: "Cloud" },
    { name: "Docker", level: 85, icon: GitBranch, color: "from-blue-400 to-blue-500", category: "DevOps" },
    { name: "Kubernetes", level: 80, icon: GitBranch, color: "from-indigo-400 to-purple-500", category: "DevOps" },
  ];

  const categories = ["Programming", "Data Science", "ML/AI", "Big Data", "Cloud", "DevOps"];

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const getSkillsByCategory = (category: string) => {
    return skillsData.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Data science tools and technologies I use to extract insights and build intelligent systems
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {category}
                  </span>
                </h3>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                >
                  {categorySkills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ 
                          y: -10, 
                          scale: 1.05,
                          rotateY: 10,
                        }}
                        className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group cursor-pointer"
                      >
                        <div className="text-center">
                          <div className={`p-4 rounded-xl bg-gradient-to-br ${skill.color} mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon size={28} className="text-white" />
                          </div>
                          
                          <h4 className="text-white font-bold text-sm mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                            {skill.name}
                          </h4>
                          
                          <div className="relative">
                            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${skill.level}%` } : {}}
                                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                                className={`h-2 bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                              >
                                <motion.div
                                  animate={{ x: [-100, 100] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 bg-white/30 w-8 skew-x-12"
                                />
                              </motion.div>
                            </div>
                            <span className="text-cyan-400 text-xs font-bold">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Programming Languages", value: "6", color: "text-blue-400" },
            { label: "Data Science Tools", value: "12+", color: "text-cyan-400" },
            { label: "ML Frameworks", value: "8+", color: "text-purple-400" },
            { label: "Cloud Platforms", value: "5+", color: "text-green-400" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;