import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, 
  Database, 
  Brain, 
  Cloud, 
  GitBranch,
  TrendingUp,
  Zap,
  Target,
  Activity,
  LineChart,
  Cpu
} from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const Skills = () => {
  const { skills, loading } = usePortfolioStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Add icons to skills data
  const skillsData = skills.map(skill => ({
    ...skill,
    icon: getIconForCategory(skill.category)
  }));

  function getIconForCategory(category: string) {
    switch (category) {
      case 'Programming': return Code2;
      case 'Frontend': return TrendingUp;
      case 'Backend': return Zap;
      case 'Database': return Database;
      case 'Data Science': return LineChart;
      case 'ML/AI': return Cpu;
      case 'Agentic AI': return Brain;
      case 'Cloud': return Cloud;
      case 'DevOps': return GitBranch;
      case 'Mobile': return Target;
      case 'Design': return Activity;
      default: return Code2;
    }
  }

  // Get unique categories dynamically from skills
  const categories = [...new Set(skills.map(skill => skill.category))].sort();

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

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

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
        {skillsData.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
            <Code2 size={64} className="mx-auto text-white/40 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No Skills Yet</h3>
            <p className="text-white/60 text-lg mb-6">
              Skills information will appear here once it's added through the admin panel.
            </p>
            <div className="text-white/40 text-sm">
              Add your technical skills via the admin dashboard to showcase your expertise.
            </div>
          </div>
        ) : (
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
                  {categorySkills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.$id || skill.name}
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
                            <span className="text-cyan-400 text-xs font-bold">
                              {skill.proficiency}
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
        )}
      </div>
    </section>
  );
};

export default Skills;