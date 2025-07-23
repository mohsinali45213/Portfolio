import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, Loader2, X, Code, Building } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Experience as ExperienceType } from '../types/types';

const Experience = () => {
  const { experiences, loadExperiences } = usePortfolioStore();
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Load experiences when component mounts
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        await loadExperiences();
        console.log('Loaded experiences:', experiences); // Debug log
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, [loadExperiences]);

  // Handle popup open/close
  const openExperiencePopup = (experience: ExperienceType) => {
    setSelectedExperience(experience);
    setIsPopupOpen(true);
  };

  const closeExperiencePopup = () => {
    setSelectedExperience(null);
    setIsPopupOpen(false);
  };

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPopupOpen) {
        closeExperiencePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={48} className="animate-spin text-cyan-400" />
              <span className="ml-4 text-white/70 text-xl">Loading experiences...</span>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
                <Briefcase size={64} className="mx-auto text-white/40 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">No Experience Data</h3>
                <p className="text-white/60 text-lg mb-6">
                  Experience information will appear here once it's added through the admin panel.
                </p>
                <div className="text-white/40 text-sm">
                  Add your professional experience via the admin dashboard to showcase your career journey.
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.$id}
                    variants={itemVariants}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full border-4 border-black shadow-lg z-10"></div>

                    {/* Content card */}
                    <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => openExperiencePopup(exp)}
                        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 cursor-pointer"
                      >
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-cyan-400">
                            <Briefcase size={20} />
                            <span className="text-sm font-medium bg-cyan-400/20 px-3 py-1 rounded-full">
                              {exp.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <Calendar size={16} />
                            <span className="text-sm">{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <MapPin size={16} />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <h4 className="text-lg text-purple-400 font-semibold mb-4">{exp.company}</h4>
                        <p className="text-white/80 leading-relaxed mb-6 line-clamp-3">{exp.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies && exp.technologies.split(',').slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors duration-300"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                          {exp.technologies && exp.technologies.split(',').length > 4 && (
                            <span className="text-cyan-400 text-sm font-medium px-3 py-1">
                              +{exp.technologies.split(',').length - 4} more
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modern Experience Detail Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExperiencePopup}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] shadow-2xl overflow-hidden mx-2"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 255, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Custom Scrollbar Container */}
              <div 
                className="overflow-y-auto max-h-[90vh] md:max-h-[85vh]"
                style={{
                  scrollbarWidth: 'none', /* Firefox */
                  msOverflowStyle: 'none', /* Internet Explorer 10+ */
                }}
              >
                <style>{`
                  .overflow-y-auto::-webkit-scrollbar {
                    display: none; /* Safari and Chrome */
                  }
                `}</style>

                {/* Header with gradient background */}
                <div className="relative bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 md:p-8 border-b border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
                  <div className="relative flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 text-cyan-400">
                          <div className="p-2 md:p-3 bg-cyan-400/20 rounded-lg md:rounded-xl">
                            <Briefcase size={20} className="md:hidden" />
                            <Briefcase size={24} className="hidden md:block" />
                          </div>
                          <span className="text-sm md:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent px-3 md:px-4 py-1 md:py-2 rounded-full border border-cyan-400/30">
                            {selectedExperience.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
                          <div className="flex items-center gap-1 sm:gap-2 text-white/70">
                            <Calendar size={16} className="sm:hidden" />
                            <Calendar size={20} className="hidden sm:block" />
                            <span className="font-medium">{selectedExperience.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-white/70">
                            <MapPin size={16} className="sm:hidden" />
                            <MapPin size={20} className="hidden sm:block" />
                            <span className="font-medium">{selectedExperience.location}</span>
                          </div>
                        </div>
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight">
                        {selectedExperience.title}
                      </h1>
                      <div className="flex items-center gap-2 md:gap-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                        <Building size={20} className="text-purple-400 sm:hidden" />
                        <Building size={24} className="text-purple-400 hidden sm:block md:hidden" />
                        <Building size={28} className="text-purple-400 hidden md:block" />
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent break-words">
                          {selectedExperience.company}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={closeExperiencePopup}
                      className="self-start md:ml-6 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white/70 hover:text-white group"
                    >
                      <X size={20} className="md:hidden group-hover:rotate-90 transition-transform duration-300" />
                      <X size={24} className="hidden md:block group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-8 space-y-6 md:space-y-8">
                  {/* Description Section */}
                  <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 md:w-2 h-5 md:h-6 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                      Role Overview
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base lg:text-lg">{selectedExperience.description}</p>
                  </div>

                  {/* Technologies Section */}
                  {selectedExperience.technologies && (
                    <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-md md:rounded-lg">
                          <Code size={16} className="text-cyan-400 md:hidden" />
                          <Code size={20} className="text-cyan-400 hidden md:block" />
                        </div>
                        Technologies & Skills
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
                        {selectedExperience.technologies.split(',').map((tech, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-medium border border-white/20 hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 text-center backdrop-blur-sm"
                          >
                            {tech.trim()}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-transparent rounded-xl md:rounded-2xl p-4 md:p-6 border border-cyan-500/20">
                      <h4 className="text-base md:text-lg font-semibold text-cyan-400 mb-3">Employment Details</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div>
                          <span className="text-white/60 text-xs md:text-sm block">Type</span>
                          <span className="text-white font-medium text-sm md:text-base lg:text-lg">{selectedExperience.type}</span>
                        </div>
                        <div>
                          <span className="text-white/60 text-xs md:text-sm block">Duration</span>
                          <span className="text-white font-medium text-sm md:text-base lg:text-lg break-words">{selectedExperience.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-500/20">
                      <h4 className="text-base md:text-lg font-semibold text-purple-400 mb-3">Company Details</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div>
                          <span className="text-white/60 text-xs md:text-sm block">Company</span>
                          <span className="text-white font-medium text-sm md:text-base lg:text-lg break-words">{selectedExperience.company}</span>
                        </div>
                        <div>
                          <span className="text-white/60 text-xs md:text-sm block">Location</span>
                          <span className="text-white font-medium text-sm md:text-base lg:text-lg break-words">{selectedExperience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-8 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-black/50">
                  <div className="flex justify-center">
                    <button
                      onClick={closeExperiencePopup}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;