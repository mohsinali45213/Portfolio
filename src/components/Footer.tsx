import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const Footer = () => {
  const { personalInfo } = usePortfolioStore();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {personalInfo.title} passionate about creating innovative digital experiences 
              that make a difference in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Certificates', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ x: 5 }}
                  className="block text-white/60 hover:text-cyan-400 text-sm transition-colors duration-300"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/60 text-sm flex items-center gap-2"
          >
            © {currentYear} Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-400 fill-current" />
            </motion.span>
            by {personalInfo.name}. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 md:mt-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;