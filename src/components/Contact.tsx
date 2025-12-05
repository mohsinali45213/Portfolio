import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const Contact = () => {
  const { personalInfo } = usePortfolioStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialLinks = [
    { 
      icon: Github, 
      href: personalInfo.github || "https://github.com", 
      color: "hover:text-gray-400",
      hoverShadow: "hover:shadow-gray-500/20"
    },
    { 
      icon: Linkedin, 
      href: personalInfo.linkedin || "https://linkedin.com", 
      color: "hover:text-blue-400",
      hoverShadow: "hover:shadow-blue-500/20"
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com", 
      color: "hover:text-sky-400",
      hoverShadow: "hover:shadow-sky-500/20"
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\D/g, '')}`
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: "#"
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
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
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Feel free to reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white/60 text-sm">{item.label}</p>
                        <p className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300 break-words break-all sm:break-normal">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        y: -5
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-4 bg-white/5 rounded-2xl border border-white/20 text-white/70 ${social.color} ${social.hoverShadow} transition-all duration-300 shadow-lg`}
                    >
                      <Icon size={24} />
                    </motion.a>
                  );
                })}
              </div>
              <p className="text-white/60 text-center mt-6 text-sm px-4">
                Let's connect and build something incredible together!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;