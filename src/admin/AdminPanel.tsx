import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Settings, User, Briefcase, FolderOpen, Award, TrendingUp, Zap, LogOut } from 'lucide-react';
import PersonalInfoManager from '../admin/components/PersonalInfoManager';
import ExperienceManager from '../admin/components/ExperienceManager';
import ProjectsManager from '../admin/components/ProjectsManager';
import SkillsManager from '../admin/components/SkillsManager';
import CertificatesManager from '../admin/components/CertificatesManager';
import SEOOptimizer from '../admin/components/SEOOptimizer';
import { login, logout, getCurrentUser } from '../services/authService';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'seo', label: 'SEO', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        // 401 error is expected when user is not logged in
        console.log('No active session found');
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      setIsAuthenticated(true);
      setLoginForm({ email: '', password: '' });
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
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
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/70">Sign in to manage your portfolio</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-xl font-medium"
            >
              Sign In
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open('/', '_blank')}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 flex items-center gap-2"
            >
              <Eye size={16} /> Preview Site
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-screen">
          <nav className="p-4 space-y-2">
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
                  <Icon size={20} /> {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'personal' && <PersonalInfoManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'certificates' && <CertificatesManager />}
          {activeTab === 'seo' && <SEOOptimizer />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
};

const SettingsPanel = () => (
  <div className="text-white text-xl font-semibold">Site settings go here.</div>
);

export default AdminPanel;