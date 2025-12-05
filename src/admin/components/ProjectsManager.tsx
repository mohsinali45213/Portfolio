import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, ExternalLink, Github, Eye, FolderGit2, Upload, X, Link, Code, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { storage, ID } from '../../appwrite/appwriteConfig';
import { createProject, updateProject, deleteProject } from '../../services/projectsService';

const ProjectsManager = () => {
  const { projects, loadProjects } = usePortfolioStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleEdit = (project: any) => {
    setEditingId(project.$id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured,
      status: project.status
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        tech: formData.tech, // Keep as string (comma-separated)
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured,
        status: formData.status
      };

      if (editingId) {
        // Update existing project
        await updateProject(editingId, projectData);
        setEditingId(null);
      } else {
        // Create new project
        await createProject(projectData);
        setShowAddForm(false);
      }

      // Reload projects from database
      await loadProjects();

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
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const extractFileIdFromUrl = (url: string): string | null => {
    if (!url) return null;
    // Extract file ID from URL pattern: .../files/{fileId}/view...
    const match = url.match(/\/files\/([^\/]+)\/view/);
    return match ? match[1] : null;
  };

  const parseTech = (tech: string | string[]): string[] => {
    // If already an array, return it
    if (Array.isArray(tech)) return tech;
    // If string, split by comma and trim
    if (typeof tech === 'string') {
      return tech.split(',').map(t => t.trim()).filter(t => t.length > 0);
    }
    return [];
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    if (!BUCKET_ID) {
      alert('Storage configuration error. Please check environment variables.');
      return;
    }

    setIsUploadingImage(true);
    try {
      // Delete old image if exists
      if (formData.image) {
        try {
          const oldFileId = extractFileIdFromUrl(formData.image);
          if (oldFileId) {
            await storage.deleteFile(BUCKET_ID, oldFileId);
          }
        } catch (error) {
          console.log('Old image not found, continuing with upload');
        }
      }

      // Upload new image
      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      
      // Create full image URL
      const imageUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
      
      // Update form data with full image URL
      handleInputChange('image', imageUrl);
      
      alert('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message || 'Please try again.'}`);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!formData.image) return;
    
    if (confirm('Are you sure you want to remove this image?')) {
      try {
        if (BUCKET_ID) {
          const fileId = extractFileIdFromUrl(formData.image);
          if (fileId) {
            await storage.deleteFile(BUCKET_ID, fileId);
          }
        }
        handleInputChange('image', '');
      } catch (error) {
        console.error('Error removing image:', error);
      }
    }
  };

  const getImageUrl = (imageUrl: string) => {
    // If it's already a full URL, return it
    if (imageUrl && imageUrl.includes('http')) return imageUrl;
    // If it's a file ID (for backward compatibility), construct URL
    if (imageUrl && BUCKET_ID) {
      return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageUrl}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
    }
    return null;
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

  const renderProjectForm = (isEditing = false) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {isEditing ? '✏️ Edit Project' : '✨ Add New Project'}
              </h3>
              <p className="text-white/60">
                {isEditing ? 'Update your project details' : 'Showcase your amazing work'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCancel}
              className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Project Image Upload */}
          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Upload size={16} className="text-cyan-400" />
              Project Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {formData.image ? (
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="relative group"
              >
                <img 
                  src={getImageUrl(formData.image) || ''} 
                  alt="Project preview" 
                  className="w-full h-64 object-cover rounded-2xl border-2 border-white/20 shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
                  >
                    <Upload size={18} />
                    Change
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="w-full bg-gradient-to-br from-white/5 to-white/10 border-2 border-dashed border-white/30 rounded-2xl px-6 py-12 text-white hover:border-cyan-400 hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300 flex flex-col items-center gap-3 disabled:opacity-50 group"
              >
                {isUploadingImage ? (
                  <>
                    <div className="w-12 h-12 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg font-medium">Uploading...</span>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-cyan-500 to-purple-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Upload size={40} />
                    </div>
                    <span className="text-xl font-semibold">Click to upload project image</span>
                    <span className="text-sm text-white/60">PNG, JPG, GIF up to 5MB • High quality recommended</span>
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Project Title */}
            <div className="md:col-span-2">
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="e.g., AI-Powered E-Commerce Platform"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Clock size={16} className="text-purple-400" />
                Project Status
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-purple-400 appearance-none cursor-pointer transition-all duration-300"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '3rem'
                  }}
                >
                  <option value="completed" className="bg-slate-800 text-white">✅ Completed</option>
                  <option value="in-progress" className="bg-slate-800 text-white">🚀 In Progress</option>
                  <option value="planned" className="bg-slate-800 text-white">📋 Planned</option>
                </select>
              </div>
            </div>

            {/* Featured Toggle */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                Featured Project
              </label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="w-6 h-6 rounded-lg accent-yellow-500 cursor-pointer"
                />
                <span className="text-white text-lg">
                  {formData.featured ? '⭐ Featured' : 'Mark as Featured'}
                </span>
              </motion.label>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Eye size={16} className="text-green-400" />
              Project Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={5}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-white/40"
              placeholder="Describe your project, its features, and what makes it unique..."
            />
            <div className="flex justify-end mt-2">
              <span className="text-white/50 text-sm">{formData.description.length} characters</span>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Code size={16} className="text-blue-400" />
              Technologies Used
            </label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => handleInputChange('tech', e.target.value)}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
              placeholder="e.g., React, TypeScript, Node.js, PostgreSQL, AWS"
            />
            <p className="text-white/50 text-sm mt-2">💡 Separate technologies with commas</p>
            {formData.tech && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tech.split(',').map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech.trim()}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Live URL */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <ExternalLink size={16} className="text-pink-400" />
                Live Demo URL
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="https://project-demo.com"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Github size={16} className="text-indigo-400" />
                GitHub Repository
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving || !formData.title}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              {isSaving ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEditing ? 'Update Project' : 'Create Project'}
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              disabled={isSaving}
              className="bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Projects Management</h2>
          <p className="text-white/60">Manage and showcase your amazing projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          Add New Project
        </motion.button>
      </div>

      {(showAddForm || editingId) && renderProjectForm(!!editingId)}

      {projects.length === 0 && !showAddForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-16 border border-white/10 text-center"
        >
          <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
            <FolderGit2 size={64} className="text-white/60" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">No Projects Yet</h3>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Start building your portfolio by adding your first project. Showcase your work and achievements!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <Plus className="inline-block mr-2" size={20} />
            Add Your First Project
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-2xl hover:border-cyan-400/50 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden h-52">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={getImageUrl(project.image) || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {project.featured && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                  >
                    <Star size={12} fill="white" />
                    Featured
                  </motion.span>
                )}
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg ${
                    project.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                    project.status === 'in-progress' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                    'bg-gradient-to-r from-gray-400 to-slate-500 text-white'
                  }`}>
                  {project.status === 'completed' && <CheckCircle size={12} />}
                  {project.status === 'in-progress' && <Clock size={12} />}
                  {project.status === 'planned' && <AlertCircle size={12} />}
                  {project.status === 'completed' ? 'Completed' :
                   project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </motion.span>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(project)}
                  className="bg-blue-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(project.$id!)}
                  className="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-red-500/50 backdrop-blur-sm"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">{project.title}</h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {parseTech(project.tech).slice(0, 4).map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30"
                  >
                    {tech}
                  </motion.span>
                ))}
                {parseTech(project.tech).length > 4 && (
                  <span className="bg-white/10 text-white/60 px-3 py-1 rounded-full text-xs font-semibold">
                    +{parseTech(project.tech).length - 4}
                  </span>
                )}
              </div>

              {/* Action Links */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-white/10 text-white py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;