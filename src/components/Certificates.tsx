import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const Certificates = () => {
  const { certificates } = usePortfolioStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Helper to get image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300?text=Certificate';
    // If it's already a full URL, return it
    if (imageUrl.includes('http')) return imageUrl;
    // If it's a file ID (for backward compatibility), construct URL
    const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
    if (BUCKET_ID) {
      return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageUrl}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
    }
    return 'https://via.placeholder.com/400x300?text=Certificate';
  };

  // Helper to parse skills string to array
  const parseSkills = (skills: string): string[] => {
    if (Array.isArray(skills)) return skills;
    try {
      return JSON.parse(skills);
    } catch {
      return skills.split(',').map(s => s.trim());
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="certificates" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
                <Award size={64} className="mx-auto text-white/40 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">No Certifications Yet</h3>
                <p className="text-white/60 text-lg mb-6">
                  Certification information will appear here once it's added through the admin panel.
                </p>
                <div className="text-white/40 text-sm">
                  Add your certifications and achievements via the admin dashboard to showcase your credentials.
                </div>
              </div>
            </div>
          ) : (
            certificates.map((cert, index) => (
            <motion.div
              key={cert.$id || index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={getImageUrl(cert.image)}
                  alt={cert.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Verified badge */}
                {cert.verified && (
                  <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={14} />
                    Verified
                  </div>
                )}

                {/* Award icon */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-yellow-400/20 backdrop-blur-sm p-3 rounded-full">
                    <Award size={24} className="text-yellow-400" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-white/60" />
                  <span className="text-white/60 text-sm">{cert.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-purple-400 font-semibold mb-3">{cert.issuer}</p>
                
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {parseSkills(cert.skills).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs font-medium border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/50 font-mono">
                    ID: {cert.credentialId}
                  </div>
                  
                  <motion.a
                    href={cert.link}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-2 rounded-full hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;