import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Upload, Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const CertificatesManager = () => {
  const { certificates, updateCertificates } = usePortfolioStore();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleEdit = (certificate: any) => {
    setEditingId(certificate.id);
    setFormData({
      ...certificate,
      skills: certificate.skills.join(', ')
    });
  };

  const handleSave = () => {
    const updatedCertificate = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    if (editingId) {
      const updatedCertificates = certificates.map(cert => 
        cert.id === editingId ? { ...cert, ...updatedCertificate } : cert
      );
      updateCertificates(updatedCertificates);
      setEditingId(null);
    } else {
      const newCertificate = {
        ...updatedCertificate,
        id: Date.now()
      };
      updateCertificates([newCertificate, ...certificates]);
      setShowAddForm(false);
    }

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

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      updateCertificates(certificates.filter(cert => cert.id !== id));
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

  const CertificateForm = ({ isEditing = false }) => (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">
        {isEditing ? 'Edit Certificate' : 'Add New Certificate'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Certificate Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., AWS Certified Solutions Architect"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Issuing Organization
          </label>
          <input
            type="text"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., Amazon Web Services"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Issue Date
          </label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., 2023 or March 2023"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Credential ID
          </label>
          <input
            type="text"
            value={formData.credentialId}
            onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="e.g., AWS-SAA-2023-001"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Certificate Image URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            placeholder="https://example.com/certificate.jpg"
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

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
          placeholder="Brief description of the certification..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Skills Covered (comma-separated)
        </label>
        <input
          type="text"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          placeholder="e.g., Cloud Architecture, AWS Services, Security"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">
          Verification Link
        </label>
        <input
          type="url"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          placeholder="https://verify.example.com/certificate"
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-white/80">
          <input
            type="checkbox"
            checked={formData.verified}
            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
            className="rounded"
          />
          Verified Certificate
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
        <h2 className="text-3xl font-bold text-white">Certificates Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Certificate
        </motion.button>
      </div>

      {showAddForm && <CertificateForm />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group"
          >
            {editingId === certificate.id ? (
              <div className="p-6">
                <CertificateForm isEditing />
              </div>
            ) : (
              <>
                <div className="relative">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {certificate.verified && (
                      <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle size={14} />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-yellow-400/20 backdrop-blur-sm p-3 rounded-full">
                      <Award size={24} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(certificate)}
                      className="bg-blue-500/90 text-white p-2 rounded-full"
                    >
                      <Edit size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(certificate.id)}
                      className="bg-red-500/90 text-white p-2 rounded-full"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-white/60" />
                    <span className="text-white/60 text-sm">{certificate.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{certificate.title}</h3>
                  <p className="text-purple-400 font-semibold mb-3">{certificate.issuer}</p>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">{certificate.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs font-medium border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/50 font-mono">
                      ID: {certificate.credentialId}
                    </div>
                    
                    <motion.a
                      href={certificate.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-2 rounded-full hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Certificates Summary */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Certificates Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{certificates.length}</div>
            <div className="text-white/70 text-sm">Total Certificates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {certificates.filter(c => c.verified).length}
            </div>
            <div className="text-white/70 text-sm">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {new Set(certificates.map(c => c.issuer)).size}
            </div>
            <div className="text-white/70 text-sm">Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {certificates.filter(c => c.date === '2023').length}
            </div>
            <div className="text-white/70 text-sm">This Year</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesManager;