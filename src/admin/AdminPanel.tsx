import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  BarChart3, 
  User, 
  Briefcase, 
  FolderOpen, 
  Award, 
  Mail, 
  Eye,
  Edit,
  Save,
  Upload,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Globe,
  Zap
} from 'lucide-react';
import PersonalInfoManager from './components/PersonalInfoManager';
import ExperienceManager from './components/ExperienceManager';
import ProjectsManager from './components/ProjectsManager';
import SkillsManager from './components/SkillsManager';
import CertificatesManager from './components/CertificatesManager';
import ContactManager from './components/ContactManager';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SEOOptimizer from './components/SEOOptimizer';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'seo', label: 'SEO', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, use proper authentication
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-white/70">Sign in to manage your portfolio</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Enter password"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-xl transition-all duration-300"
            >
              Sign In
            </motion.button>
          </form>
          
          <div className="mt-6 text-center text-sm text-white/60">
            Demo credentials: admin / admin123
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Portfolio Admin
              </h1>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Live
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Eye size={16} />
                Preview Site
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: 5 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <AnalyticsDashboard />}
            {activeTab === 'personal' && <PersonalInfoManager />}
            {activeTab === 'experience' && <ExperienceManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'certificates' && <CertificatesManager />}
            {activeTab === 'contact' && <ContactManager />}
            {activeTab === 'seo' && <SEOOptimizer />}
            {activeTab === 'settings' && <SettingsPanel />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Site Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Site Title
              </label>
              <input
                type="text"
                defaultValue="Mohsin Ali - Full Stack Developer"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Meta Description
              </label>
              <textarea
                defaultValue="Full Stack Developer & Creative Technologist"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white h-24 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Enable Lazy Loading</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Optimize Images</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Enable Caching</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;