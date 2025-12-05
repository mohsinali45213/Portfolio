import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { usePortfolioStore } from '../store/portfolioStore';

const Projects = () => {
  const { projects } = usePortfolioStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Helper to get image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300?text=Project+Image';
    // If it's already a full URL, return it
    if (imageUrl.includes('http')) return imageUrl;
    // If it's a file ID (for backward compatibility), construct URL
    const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
    if (BUCKET_ID) {
      return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageUrl}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
    }
    return 'https://via.placeholder.com/400x300?text=Project+Image';
  };

  // Helper to parse tech string to array
  const parseTech = (tech: string): string[] => {
    if (Array.isArray(tech)) return tech;
    try {
      return JSON.parse(tech);
    } catch {
      return tech.split(',').map(t => t.trim());
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover some of my recent work where creativity meets functionality
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
                <Github size={64} className="mx-auto text-white/40 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
                <p className="text-white/60 text-lg mb-6">
                  Project information will appear here once it's added through the admin panel.
                </p>
                <div className="text-white/40 text-sm">
                  Add your projects via the admin dashboard to showcase your portfolio work.
                </div>
              </div>
            </div>
          ) : (
            projects.map((project, index) => (
            <motion.div key={project.$id || index} variants={itemVariants}>
              <Tilt options={{ max: 15, scale: 1.05, speed: 300 }}>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl group hover:shadow-cyan-500/20 transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          <Eye size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          <Github size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {parseTech(project.tech).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <motion.a
                        href={project.liveUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300 border border-white/20"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;