import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Upload, Award, Calendar, ExternalLink, CheckCircle, X, Shield, FileText, Star, Link as LinkIcon } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { createCertificate, updateCertificate, deleteCertificate } from '../../services/certificatesService';
import { storage, ID } from '../../appwrite/appwriteConfig';

const CertificatesManager = () => {
  const { certificates, loadCertificates } = usePortfolioStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialId: '',
    image: '',
    description: '',
    skills: '',
    verified: false,
    link: ''
  });

  const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  const extractFileIdFromUrl = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/\/files\/([^\/]+)\/view/);
    return match ? match[1] : null;
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl && imageUrl.includes('http')) return imageUrl;
    if (imageUrl && BUCKET_ID) {
      return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageUrl}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
    }
    return null;
  };

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

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

      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      const imageUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
      
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

  const handleEdit = (certificate: any) => {
    setEditingId(certificate.$id);
    setFormData({
      title: certificate.title,
      issuer: certificate.issuer,
      date: certificate.date,
      credentialId: certificate.credentialId,
      image: certificate.image,
      description: certificate.description,
      skills: certificate.skills,
      verified: certificate.verified,
      link: certificate.link
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const certificateData = {
        ...formData,
        skills: formData.skills
      };

      if (editingId) {
        // Update existing certificate
        await updateCertificate(editingId, certificateData);
        setEditingId(null);
      } else {
        // Create new certificate
        await createCertificate(certificateData);
        setShowAddForm(false);
      }

      // Reload certificates from database
      await loadCertificates();

      setFormData({
        title: '',
        issuer: '',
        date: '',
        credentialId: '',
        image: '',
        description: '',
        skills: '',
        verified: false,
        link: ''
      });
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        await loadCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Error deleting certificate. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      issuer: '',
      date: '',
      credentialId: '',
      image: '',
      description: '',
      skills: '',
      verified: false,
      link: ''
    });
  };

  const renderCertificateForm = (isEditing = false) => (
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
                {isEditing ? '✏️ Edit Certificate' : '🏆 Add New Certificate'}
              </h3>
              <p className="text-white/60">
                {isEditing ? 'Update your certification details' : 'Showcase your professional credentials'}
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

          {/* Certificate Image Upload */}
          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Upload size={16} className="text-yellow-400" />
              Certificate Image
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
                  alt="Certificate preview" 
                  className="w-full h-64 object-cover rounded-2xl border-2 border-yellow-400/30 shadow-lg"
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
                className="w-full bg-gradient-to-br from-white/5 to-white/10 border-2 border-dashed border-yellow-400/30 rounded-2xl px-6 py-12 text-white hover:border-yellow-400 hover:from-yellow-500/10 hover:to-orange-500/10 transition-all duration-300 flex flex-col items-center gap-3 disabled:opacity-50 group"
              >
                {isUploadingImage ? (
                  <>
                    <div className="w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg font-medium">Uploading...</span>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Award size={40} />
                    </div>
                    <span className="text-xl font-semibold">Click to upload certificate image</span>
                    <span className="text-sm text-white/60">PNG, JPG, GIF up to 5MB • High quality recommended</span>
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Certificate Title */}
            <div className="md:col-span-2">
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Award size={16} className="text-yellow-400" />
                Certificate Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="e.g., AWS Certified Solutions Architect - Professional"
              />
            </div>

            {/* Issuer */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Shield size={16} className="text-blue-400" />
                Issuing Organization
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => handleInputChange('issuer', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="e.g., Amazon Web Services"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-green-400" />
                Issue Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="e.g., March 2024"
              />
            </div>

            {/* Credential ID */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <FileText size={16} className="text-purple-400" />
                Credential ID
              </label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => handleInputChange('credentialId', e.target.value)}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
                placeholder="e.g., AWS-SAA-2024-001"
              />
            </div>

            {/* Verified Toggle */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Verification Status
              </label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => handleInputChange('verified', e.target.checked)}
                  className="w-6 h-6 rounded-lg accent-green-500 cursor-pointer"
                />
                <span className="text-white text-lg">
                  {formData.verified ? '✅ Verified' : 'Mark as Verified'}
                </span>
              </motion.label>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <FileText size={16} className="text-cyan-400" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-white/40"
              placeholder="Brief description of the certification and what you learned..."
            />
            <div className="flex justify-end mt-2">
              <span className="text-white/50 text-sm">{formData.description.length} characters</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Star size={16} className="text-pink-400" />
              Skills Covered
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
              placeholder="e.g., Cloud Architecture, AWS Services, Security Best Practices"
            />
            <p className="text-white/50 text-sm mt-2">💡 Separate skills with commas</p>
            {formData.skills && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skills.split(',').map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-400/30 text-pink-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill.trim()}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Verification Link */}
          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <LinkIcon size={16} className="text-indigo-400" />
              Verification Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
              placeholder="https://verify.example.com/certificate"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving || !formData.title}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
            >
              {isSaving ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEditing ? 'Update Certificate' : 'Add Certificate'}
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
          <h2 className="text-4xl font-bold text-white mb-2">Certificates Management</h2>
          <p className="text-white/60">Manage and showcase your professional certifications</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          Add Certificate
        </motion.button>
      </div>

      {(showAddForm || editingId) && renderCertificateForm(!!editingId)}

      {certificates.length === 0 && !showAddForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-16 border border-white/10 text-center"
        >
          <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
            <Award size={64} className="text-yellow-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">No Certificates Yet</h3>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Start showcasing your professional credentials by adding your first certification!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
          >
            <Plus className="inline-block mr-2" size={20} />
            Add Your First Certificate
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-2xl hover:border-yellow-400/50 transition-all duration-300"
          >
            {/* Certificate Image */}
            <div className="relative overflow-hidden h-52">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={getImageUrl(certificate.image) || 'https://via.placeholder.com/400x300?text=Certificate'}
                alt={certificate.title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Verified Badge */}
              {certificate.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                >
                  <CheckCircle size={14} fill="white" />
                  Verified
                </motion.div>
              )}
              
              {/* Award Icon */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-gradient-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-sm p-3 rounded-full border border-yellow-400/50">
                  <Award size={24} className="text-yellow-400" />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(certificate)}
                  className="bg-blue-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(certificate.$id!)}
                  className="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-red-500/50 backdrop-blur-sm"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-green-400" />
                <span className="text-green-400 text-sm font-semibold">{certificate.date}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{certificate.title}</h3>
              <p className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <Shield size={16} />
                {certificate.issuer}
              </p>
              <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">{certificate.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {certificate.skills.split(',').slice(0, 3).map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-semibold border border-orange-400/30"
                  >
                    {skill.trim()}
                  </motion.span>
                ))}
                {certificate.skills.split(',').length > 3 && (
                  <span className="bg-white/10 text-white/60 px-3 py-1 rounded-full text-xs font-semibold">
                    +{certificate.skills.split(',').length - 3}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-white/50 font-mono flex items-center gap-2">
                  <FileText size={14} />
                  {certificate.credentialId}
                </div>
                
                {certificate.link && (
                  <motion.a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-2 rounded-full hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
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

export default CertificatesManager;