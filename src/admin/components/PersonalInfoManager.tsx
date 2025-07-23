import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Edit, User, Mail, Phone, MapPin, Globe } from 'lucide-react';

const PersonalInfoManager = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Mohsin Ali',
    title: 'Full Stack Developer & Creative Technologist',
    email: 'mohsin.ali@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://mohsinali.dev',
    bio: "I'm a passionate data scientist who loves uncovering insights from complex datasets and building intelligent systems that drive business value. When I'm not analyzing data, you'll find me exploring new ML algorithms or contributing to data science communities.",
    avatar: null,
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    // Show success message
  };

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

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
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
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
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <div className="w-28 h-28 bg-gray-800 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
                MA
              </div>
            </div>
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Upload size={16} />
                Upload New
              </motion.button>
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
                  value={personalInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {personalInfo.name}
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
                  value={personalInfo.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {personalInfo.title}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {personalInfo.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {personalInfo.phone}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {personalInfo.location}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Globe size={16} />
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={personalInfo.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {personalInfo.website}
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
            value={personalInfo.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={6}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
            placeholder="Write your bio..."
          />
        ) : (
          <div className="text-white/80 bg-white/5 rounded-xl px-4 py-3 leading-relaxed">
            {personalInfo.bio}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(personalInfo.socialLinks).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-white/80 text-sm font-medium mb-2 capitalize">
                {platform}
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  placeholder={`Your ${platform} URL`}
                />
              ) : (
                <div className="text-white bg-white/5 rounded-xl px-4 py-3">
                  {url}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoManager;