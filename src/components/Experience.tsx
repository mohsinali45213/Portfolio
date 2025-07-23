import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

const Experience = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      duration: "2022 - Present",
      description: "Led development of scalable web applications using React, Node.js, and cloud technologies. Managed a team of 5 developers and improved system performance by 40%.",
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
      type: "Full-time"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      location: "New York, NY",
      duration: "2020 - 2022",
      description: "Developed and maintained multiple client projects, implemented CI/CD pipelines, and collaborated with cross-functional teams to deliver high-quality solutions.",
      technologies: ["Vue.js", "Python", "MongoDB", "Firebase", "GCP"],
      type: "Full-time"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      duration: "2019 - 2020",
      description: "Built responsive web applications and mobile-first designs. Worked closely with UX/UI designers to implement pixel-perfect interfaces.",
      technologies: ["JavaScript", "React", "SASS", "Webpack", "Jest"],
      type: "Full-time"
    },
    {
      id: 4,
      title: "Junior Web Developer",
      company: "WebSolutions Agency",
      location: "Remote",
      duration: "2018 - 2019",
      description: "Developed custom WordPress themes and plugins, optimized website performance, and provided technical support to clients.",
      technologies: ["PHP", "WordPress", "MySQL", "jQuery", "CSS3"],
      type: "Contract"
    }
  ];

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
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
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
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
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
                    <p className="text-white/80 leading-relaxed mb-6">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;