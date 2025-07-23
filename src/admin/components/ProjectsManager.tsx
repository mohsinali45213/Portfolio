import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Upload, ExternalLink, Github, Eye } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const ProjectsManager = () => {
  const { projects, updateProjects } = usePortfolioStore();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'in-progress'
  });

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      tech: project.tech.join(', ')
    });
  };

  const handleSave = () => {
    const updatedProject = {
      ...formData,
      tech: formData.tech.split(',').map(tech => tech.trim())
    };

    if (editingId) {
      const updatedProjects = projects.map(proj => 
        proj.id === editingId ? { ...proj, ...updatedProject } : proj
      );
      updateProjects(updatedProjects);
      setEditingId(null);
    } else {
      const newProject = {
        ...updatedProject,
        id: Date.now()
      };
      updateProjects([newProject, ...projects]);
      setShowAddForm(false);
    }

    setFormData({
      title: '',
      description: '',
      image: '',
      tech: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      status: 'in-progress'
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      updateProjects(projects.filter(proj => proj.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      tech: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      status: 'in-progress'
    });
  };

  const ProjectForm = ({ isEditing = false }) => (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">
        {isEditing ? 'Edit Project' : 'Add New Project'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Project Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., E-Commerce Platform"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>
        </div>
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
          placeholder="Describe your project..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Project Image URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="https://example.com/image.jpg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <Upload size={16} />
            Upload
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Live URL
          </label>
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="https://project-demo.com"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tech}
          onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          placeholder="e.g., React, Node.js, PostgreSQL, Stripe"
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-white/80">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded"
          />
          Featured Project
        </label>
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
        <h2 className="text-3xl font-bold text-white">Projects Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Project
        </motion.button>
      </div>

      {showAddForm && <ProjectForm />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group"
          >
            {editingId === project.id ? (
              <div className="p-6">
                <ProjectForm isEditing />
              </div>
            ) : (
              <>
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.featured && (
                      <span className="bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-500/90 text-white' :
                      project.status === 'in-progress' ? 'bg-blue-500/90 text-white' :
                      'bg-gray-500/90 text-white'
                    }`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(project)}
                      className="bg-blue-500/90 text-white p-2 rounded-full"
                    >
                      <Edit size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500/90 text-white p-2 rounded-full"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs font-medium border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <motion.a
                      href={project.liveUrl}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={14} />
                      Live
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300"
                    >
                      <Github size={14} />
                      Code
                    </motion.a>
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

export default ProjectsManager;