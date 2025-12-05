import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, Edit, User, Mail, Phone, MapPin, Globe, Loader, Trash2, CheckCircle, XCircle, X } from 'lucide-react';
import { updatePersonalInfo, createPersonalInfo, getPersonalInfo } from '../../services/personalInfoService';
import { storage, ID } from '../../appwrite/appwriteConfig';
import { PersonalInfo } from '../../types/types';

const PersonalInfoManager = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [localInfo, setLocalInfo] = useState<PersonalInfo>({
    name: 'Mohsin Ali',
    title: 'Data scientist & ML Engineer',
    email: 'mohsinaliabidali320@gmail.com',
    phone: '9327900855',
    website: '',
    location: 'Patan Gujarat, 384265',
    bio: '',
    profile_img: '',
    github: 'http://github.com/mohsinali45213',
    linkedin: 'https://www.linkedin.com/in/mohsinaliaghariya/',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      setIsLoading(true);
      const data = await getPersonalInfo();
      if (data) {
        setPersonalInfo(data);
        setLocalInfo(data);
      }
    } catch (error) {
      console.error('Error loading personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (personalInfo?.$id) {
        // Update existing document
        await updatePersonalInfo(personalInfo.$id, localInfo);
        showToast('Personal information updated successfully!', 'success');
      } else {
        // Create new document
        const newDoc = await createPersonalInfo(localInfo);
        setPersonalInfo(newDoc as unknown as PersonalInfo);
        showToast('Personal information created successfully!', 'success');
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving personal info:', error);
      showToast('Error saving personal information. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setLocalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type, file.size);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB', 'error');
      return;
    }

    // Check if BUCKET_ID is defined
    if (!BUCKET_ID) {
      console.error('BUCKET_ID is not defined in environment variables');
      showToast('Storage configuration error. Please check environment variables.', 'error');
      return;
    }

    console.log('Starting upload to bucket:', BUCKET_ID);
    setIsUploadingImage(true);
    try {
      // Delete old image if exists
      if (localInfo.profile_img) {
        try {
          console.log('Deleting old image:', localInfo.profile_img);
          await storage.deleteFile(BUCKET_ID, localInfo.profile_img);
        } catch (error) {
          console.log('Old image not found or could not be deleted, continuing with upload');
        }
      }

      // Upload new image
      console.log('Uploading new image...');
      const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
      console.log('Upload successful, file ID:', uploadedFile.$id);
      
      // Update local state with new image ID
      setLocalInfo(prev => ({
        ...prev,
        profile_img: uploadedFile.$id
      }));

      showToast('Image uploaded successfully!', 'success');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      showToast(`Error uploading image: ${error.message || 'Please try again.'}`, 'error');
    } finally {
      setIsUploadingImage(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getImageUrl = (fileId: string) => {
    if (!fileId) return null;
    return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
  };

  const handleRemoveImage = async () => {
    if (!localInfo.profile_img) return;

    setShowConfirm(true);
  };

  const confirmRemoveImage = async () => {
    setShowConfirm(false);
    setIsUploadingImage(true);
    try {
      // Delete image from storage
      if (localInfo.profile_img) {
        await storage.deleteFile(BUCKET_ID, localInfo.profile_img);
      }
      
      // Update local state to remove image
      setLocalInfo(prev => ({
        ...prev,
        profile_img: ''
      }));

      showToast('Profile picture removed successfully!', 'success');
    } catch (error) {
      console.error('Error removing image:', error);
      showToast('Error removing image. Please try again.', 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center gap-3 text-white">
          <Loader className="animate-spin" size={24} />
          <span>Loading personal information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Personal Information</h2>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsEditing(false)}
                className="bg-gray-500/20 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </motion.button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <User size={20} />
            Profile Picture
          </h3>
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="relative w-40 h-40 mb-4">
              <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-cyan-400/30 transform hover:scale-105 transition-transform duration-300">
                {localInfo.profile_img ? (
                  <img 
                    src={getImageUrl(localInfo.profile_img) || ''} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white drop-shadow-lg">
                    {localInfo.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                )}
              </div>
              {localInfo.profile_img && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-md"></div>
                </div>
              )}
            </div>
            {isEditing && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex gap-2 justify-center flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-lg"
                  >
                    {isUploadingImage ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    {isUploadingImage ? 'Processing...' : 'Upload'}
                  </motion.button>
                  
                  {localInfo.profile_img && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRemoveImage}
                      disabled={isUploadingImage}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-lg"
                    >
                      <Trash2 size={16} />
                      Remove
                    </motion.button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={localInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide break-all">
                  {localInfo.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Professional Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={localInfo.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide break-all">
                  {localInfo.title}
                </div>
              )}
            </div>

            <div>
              <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={localInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide">
                  <a 
                    href={`mailto:${localInfo.email}`} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {localInfo.email}
                  </a>
                </div>
              )}
            </div>

            <div>
              <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={localInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide break-all">
                  {localInfo.phone}
                </div>
              )}
            </div>

            <div>
              <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={localInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide break-all">
                  {localInfo.location}
                </div>
              )}
            </div>

            <div>
              <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Globe size={16} />
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={localInfo.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide">
                  {localInfo.website ? (
                    <a 
                      href={localInfo.website} 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {localInfo.website}
                    </a>
                  ) : (
                    <span className="text-gray-400">No website</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Bio</h3>
        {isEditing ? (
          <textarea
            value={localInfo.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={6}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
            placeholder="Write your bio..."
          />
        ) : (
          <div className="text-white/80 bg-white/5 rounded-xl px-4 py-3 leading-relaxed overflow-hidden overflow-y-auto scrollbar-hide max-h-32">
            {localInfo.bio || <span className="text-gray-400">No bio available</span>}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2 capitalize">
              GitHub
            </label>
            {isEditing ? (
              <input
                type="url"
                value={localInfo.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Your GitHub URL"
              />
            ) : (
              <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide">
                <a 
                  href={localInfo.github} 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {localInfo.github}
                </a>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2 capitalize">
              LinkedIn
            </label>
            {isEditing ? (
              <input
                type="url"
                value={localInfo.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Your LinkedIn URL"
              />
            ) : (
              <div className="text-white bg-white/5 rounded-xl px-4 py-3 overflow-hidden overflow-x-auto scrollbar-hide">
                <a 
                  href={localInfo.linkedin} 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {localInfo.linkedin}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 right-4 z-50 max-w-sm w-full"
          >
            <div className={`
              backdrop-blur-lg rounded-xl p-4 border shadow-2xl
              ${toast.type === 'success' 
                ? 'bg-green-500/20 border-green-400/30 text-green-100' 
                : 'bg-red-500/20 border-red-400/30 text-red-100'
              }
            `}>
              <div className="flex items-center gap-3">
                {toast.type === 'success' ? (
                  <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-400 flex-shrink-0" />
                )}
                <p className="text-sm font-medium flex-1">{toast.message}</p>
                <button
                  onClick={() => setToast({ show: false, message: '', type: 'success' })}
                  className="text-current/60 hover:text-current transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Remove Profile Picture</h3>
                <p className="text-white/70 mb-6">
                  Are you sure you want to remove your profile picture? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConfirm(false)}
                    className="px-6 py-2 bg-gray-500/20 text-gray-300 rounded-xl hover:bg-gray-500/30 transition-all duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmRemoveImage}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalInfoManager;
