import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Briefcase, Calendar, MapPin } from 'lucide-react';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([
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
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    duration: '',
    description: '',
    technologies: '',
    type: 'Full-time'
  });

  const handleEdit = (experience: any) => {
    setEditingId(experience.id);
    setFormData({
      ...experience,
      technologies: experience.technologies.join(', ')
    });
  };

  const handleSave = () => {
    const updatedExperience = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    };

    if (editingId) {
      setExperiences(prev => prev.map(exp => 
        exp.id === editingId ? { ...exp, ...updatedExperience } : exp
      ));
      setEditingId(null);
    } else {
      const newExperience = {
        ...updatedExperience,
        id: Date.now()
      };
      setExperiences(prev => [newExperience, ...prev]);
      setShowAddForm(false);
    }

    setFormData({
      title: '',
      company: '',
      location: '',
      duration: '',
      description: '',
      technologies: '',
      type: 'Full-time'
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      company: '',
      location: '',
      duration: '',
      description: '',
      technologies: '',
      type: 'Full-time'
    });
  };

  const ExperienceForm = ({ isEditing = false }) => (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">
        {isEditing ? 'Edit Experience' : 'Add New Experience'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., Senior Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., TechCorp Solutions"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Duration
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., 2022 - Present"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Job Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
          placeholder="Describe your role and achievements..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          placeholder="e.g., React, Node.js, AWS, PostgreSQL"
        />
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleSave}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Save size={16} />
          Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleCancel}
          className="bg-gray-500/20 text-gray-400 px-6 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300"
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Experience Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Experience
        </motion.button>
      </div>

      {showAddForm && <ExperienceForm />}

      <div className="space-y-4">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
          >
            {editingId === experience.id ? (
              <ExperienceForm isEditing />
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Briefcase size={20} />
                        <span className="text-sm font-medium bg-cyan-400/20 px-3 py-1 rounded-full">
                          {experience.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar size={16} />
                        <span className="text-sm">{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin size={16} />
                        <span className="text-sm">{experience.location}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                    <h4 className="text-lg text-purple-400 font-semibold mb-4">{experience.company}</h4>
                    <p className="text-white/80 leading-relaxed mb-4">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(experience)}
                      className="bg-blue-500/20 text-blue-400 p-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(experience.id)}
                      className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;