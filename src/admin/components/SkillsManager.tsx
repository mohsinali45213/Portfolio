import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Code2, Database, Brain, Cloud, GitBranch, Loader2, TrendingUp,Target, Bot } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { createSkill, updateSkill, deleteSkill } from '../../services/skillsService';
import { Skill } from '../../types/types';

const SkillsManager = () => {
  const { skills, loadSkills } = usePortfolioStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    proficiency: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced',
    category: 'Programming',
    color: 'from-blue-400 to-blue-600'
  });

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-adjust level when proficiency changes
      if (field === 'proficiency') {
        if (value === 'Beginner') {
          newData.level = 30;
        } else if (value === 'Intermediate') {
          newData.level = 60;
        } else if (value === 'Advanced') {
          newData.level = 90;
        }
      }
      
      // Auto-adjust proficiency when level changes
      if (field === 'level') {
        if (value <= 40) {
          newData.proficiency = 'Beginner';
        } else if (value <= 75) {
          newData.proficiency = 'Intermediate';
        } else {
          newData.proficiency = 'Advanced';
        }
      }
      
      return newData;
    });
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const categories = [
    'Programming',
    'Web Development',
    'Database',
    'Cloud',
    'DevOps',
    'Data Science & AI/ML',
    "Agentic AI",
    'Mobile',
  ];

  const colorOptions = [
    { name: 'Blue', value: 'from-blue-400 to-blue-600' },
    { name: 'Green', value: 'from-green-400 to-green-600' },
    { name: 'Purple', value: 'from-purple-400 to-purple-600' },
    { name: 'Cyan', value: 'from-cyan-400 to-cyan-600' },
    { name: 'Yellow', value: 'from-yellow-400 to-yellow-600' },
    { name: 'Pink', value: 'from-pink-400 to-pink-600' },
    { name: 'Orange', value: 'from-orange-400 to-orange-600' },
    { name: 'Red', value: 'from-red-400 to-red-600' },
    { name: 'Indigo', value: 'from-indigo-400 to-indigo-600' },
    { name: 'Teal', value: 'from-teal-400 to-teal-600' },
  ];

  const getIconForCategory = (category: string) => {
    switch (category) {
     case 'Programming': return Code2;
          case 'Database': return Database;
          case 'Data Science & AI/ML': return Brain;
          case 'Cloud': return Cloud;
          case 'DevOps': return GitBranch;
          case 'Web Development': return TrendingUp;
          case 'Mobile': return Target;
          case "Agentic AI": return  Bot;

      default: return Code2;
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.$id || null);
    setFormData({
      name: skill.name,
      level: skill.level,
      proficiency: skill.proficiency,
      category: skill.category,
      color: skill.color
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Saving skill with data:', formData);
      console.log('Editing ID:', editingId);

      if (editingId) {
        // Update existing skill
        const result = await updateSkill(editingId, formData);
        console.log('Update result:', result);
        setEditingId(null);
      } else {
        // Create new skill
        await createSkill(formData);
        setShowAddForm(false);
      }

      // Reload skills from database
      await loadSkills();

      setFormData({
        name: '',
        level: 50,
        proficiency: 'Intermediate',
        category: 'Programming',
        color: 'from-blue-400 to-blue-600'
      });
    } catch (err) {
      console.error('Error saving skill:', err);
      setError('Failed to save skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        setLoading(true);
        setError(null);
        await deleteSkill(id);
        await loadSkills();
      } catch (err) {
        console.error('Error deleting skill:', err);
        setError('Failed to delete skill. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      level: 50,
      proficiency: 'Intermediate',
      category: 'Programming',
      color: 'from-blue-400 to-blue-600'
    });
  };

  const renderSkillForm = (isEditing = false) => (
    <div key={editingId || 'new'} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">
        {isEditing ? 'Edit Skill' : 'Add New Skill'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Skill Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., Python, React, AWS"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-slate-800 text-white">{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Proficiency Level
          </label>
          <select
            value={formData.proficiency}
            onChange={(e) => handleInputChange('proficiency', e.target.value)}
            className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="Beginner" className="bg-slate-800 text-white">Beginner</option>
            <option value="Intermediate" className="bg-slate-800 text-white">Intermediate</option>
            <option value="Advanced" className="bg-slate-800 text-white">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Skill Level: {formData.level}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.level}
            onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider mt-8"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Color Theme
        </label>
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map(color => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleInputChange('color', color.value)}
              className={`h-10 rounded-lg bg-gradient-to-r ${color.value} border-2 ${
                formData.color === color.value ? 'border-white' : 'border-transparent'
              } transition-all duration-300`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleSave}
          disabled={loading || !formData.name.trim()}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save
            </>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-500/20 text-gray-400 px-6 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Skills Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAddForm(true)}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Add Skill
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showAddForm && renderSkillForm()}

      {skills.length === 0 && !showAddForm ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
          <Code2 size={64} className="mx-auto text-white/40 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">No Skills Added</h3>
          <p className="text-white/60 text-lg mb-6">
            Start building your skills portfolio by clicking the "Add Skill" button above.
          </p>
          <p className="text-white/40 text-sm">
            Add your technical skills to showcase your expertise on the portfolio.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {React.createElement(getIconForCategory(category), { size: 24, className: "text-cyan-400" })}
              {category}
              <span className="text-sm font-normal text-white/60 bg-white/10 px-3 py-1 rounded-full">
                {categorySkills.length} skills
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <motion.div
                  key={skill.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-all duration-300"
                >
                  {editingId === skill.$id ? (
                    renderSkillForm(true)
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold">{skill.name}</h4>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleEdit(skill)}
                            className="bg-blue-500/20 text-blue-400 p-1 rounded hover:bg-blue-500/30 transition-all duration-300"
                          >
                            <Edit size={14} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => skill.$id && handleDelete(skill.$id)}
                            disabled={loading}
                            className="bg-red-500/20 text-red-400 p-1 rounded hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-white/70">Level</span>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold">{skill.proficiency}</span>
                            <span className="text-white/50">•</span>
                            <span className="text-cyan-400 font-bold">{skill.level}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default SkillsManager;