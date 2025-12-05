import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Briefcase, Calendar, MapPin, Loader2, AlertTriangle } from 'lucide-react';
import { Experience } from '../../types/types';
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} from '../../services/experienceService';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletePopup, setDeletePopup] = useState<{ isOpen: boolean; experience: Experience | null }>({
    isOpen: false,
    experience: null
  });
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    duration: '',
    description: '',
    technologies: '',
    type: 'Full-time'
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  // Close delete popup on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && deletePopup.isOpen) {
        closeDeletePopup();
      }
    };

    if (deletePopup.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [deletePopup.isOpen]);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await getAllExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = useCallback((experience: Experience) => {
    setEditingId(experience.$id || '');
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      duration: experience.duration,
      description: experience.description,
      technologies: experience.technologies,
      type: experience.type
    });
  }, []);

  const handleSave = useCallback(async () => {
    // Validate all required fields
    if (!formData.title.trim()) {
      alert('Job Title is required');
      return;
    }
    if (!formData.company.trim()) {
      alert('Company is required');
      return;
    }
    if (!formData.location.trim()) {
      alert('Location is required');
      return;
    }
    if (!formData.duration.trim()) {
      alert('Duration is required');
      return;
    }
    if (!formData.description.trim()) {
      alert('Description is required');
      return;
    }
    if (!formData.technologies.trim()) {
      alert('Technologies is required');
      return;
    }

    try {
      setSaving(true);
      const experienceData = { ...formData };

      if (editingId) {
        await updateExperience(editingId, experienceData);
        setEditingId(null);
      } else {
        await createExperience(experienceData);
        setShowAddForm(false);
      }

      await loadExperiences();

      setFormData({
        title: '',
        company: '',
        location: '',
        duration: '',
        description: '',
        technologies: '',
        type: 'Full-time'
      });
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience. Please try again.');
    } finally {
      setSaving(false);
    }
  }, [formData, editingId]);

  const handleCancel = useCallback(() => {
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
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const experience = experiences.find(exp => exp.$id === id);
    if (experience) {
      setDeletePopup({ isOpen: true, experience });
    }
  }, [experiences]);

  const confirmDelete = async () => {
    if (deletePopup.experience) {
      try {
        await deleteExperience(deletePopup.experience.$id!);
        await loadExperiences();
        setDeletePopup({ isOpen: false, experience: null });
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Error deleting experience. Please try again.');
      }
    }
  };

  const closeDeletePopup = () => {
    setDeletePopup({ isOpen: false, experience: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Experience Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAddForm(true)}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={16} /> Add Experience
        </motion.button>
      </div>

      {(showAddForm || editingId) && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h3>

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/15"
                  placeholder="e.g., Senior Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/15"
                  placeholder="e.g., TechCorp Solutions"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/15"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/15"
                  placeholder="e.g., 2022 - Present"
                />
              </div>
            </div>

          <div className="mb-4">
            <label className="block text-white/80 text-sm font-medium mb-2">Job Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Full-time" className="bg-slate-800 text-white">Full-time</option>
              <option value="Part-time" className="bg-slate-800 text-white">Part-time</option>
              <option value="Contract" className="bg-slate-800 text-white">Contract</option>
              <option value="Freelance" className="bg-slate-800 text-white">Freelance</option>
              <option value="Internship" className="bg-slate-800 text-white">Internship</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white/80 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:border-cyan-400 focus:bg-white/15"
              placeholder="Describe your role and achievements..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/15"
              placeholder="e.g., React, Node.js, AWS, PostgreSQL"
            />
          </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving...' : 'Save'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="bg-gray-500/20 text-gray-400 px-6 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </div>
      )}      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
          <span className="ml-3 text-white">Loading experiences...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
              <Briefcase size={64} className="mx-auto text-white/40 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">No Experience Added</h3>
              <p className="text-white/60 text-lg mb-6">
                Start building your professional timeline by clicking the "Add Experience" button above.
              </p>
              <p className="text-white/40 text-sm">
                Add your work experience to showcase your career journey.
              </p>
            </div>
          ) : (
            experiences.map((experience) => (
              <motion.div
                key={experience.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
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
                      {experience.technologies.split(',').map((tech, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/20"
                        >
                          {tech.trim()}
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
                      onClick={() => handleDelete(experience.$id!)}
                      className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deletePopup.isOpen && deletePopup.experience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDeletePopup}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-md w-full shadow-2xl"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={32} className="text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Delete Experience</h3>
                <p className="text-white/70">This action cannot be undone.</p>
              </div>

              {/* Experience Preview */}
              <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-1">{deletePopup.experience.title}</h4>
                <p className="text-purple-400 font-medium mb-2">{deletePopup.experience.company}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{deletePopup.experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{deletePopup.experience.location}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeDeletePopup}
                  className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ... rest of your render logic for displaying experiences ... */}
    </div>
  );
};

export default ExperienceManager;