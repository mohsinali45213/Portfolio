import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone,
  Monitor,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const stats = [
    { label: 'Total Visitors', value: '12,543', change: '+12.5%', icon: Users, color: 'text-blue-400' },
    { label: 'Page Views', value: '45,231', change: '+8.2%', icon: Eye, color: 'text-green-400' },
    { label: 'Avg. Session', value: '3m 24s', change: '+5.1%', icon: Clock, color: 'text-purple-400' },
    { label: 'Bounce Rate', value: '32.1%', change: '-2.3%', icon: TrendingUp, color: 'text-cyan-400' },
  ];

  const topPages = [
    { page: '/', views: 8543, percentage: 35 },
    { page: '/projects', views: 6234, percentage: 28 },
    { page: '/about', views: 4321, percentage: 18 },
    { page: '/contact', views: 3456, percentage: 14 },
    { page: '/skills', views: 2876, percentage: 12 },
  ];

  const deviceStats = [
    { device: 'Desktop', percentage: 65, icon: Monitor },
    { device: 'Mobile', percentage: 28, icon: Smartphone },
    { device: 'Tablet', percentage: 7, icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex gap-3">
          <select className="bg-slate-800 text-white border border-white/20 rounded-lg px-4 py-2">
            <option className="bg-slate-800 text-white">Last 7 days</option>
            <option className="bg-slate-800 text-white">Last 30 days</option>
            <option className="bg-slate-800 text-white">Last 90 days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Activity size={16} />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} className={stat.color} />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Top Pages</h3>
          </div>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white font-medium">{page.page}</div>
                  <div className="text-white/60 text-sm">{page.views.toLocaleString()} views</div>
                </div>
                <div className="w-24 bg-white/10 rounded-full h-2 ml-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${page.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                  />
                </div>
                <span className="text-white/80 text-sm ml-3 w-12 text-right">
                  {page.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Stats */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <PieChart size={24} className="text-purple-400" />
            <h3 className="text-xl font-bold text-white">Device Breakdown</h3>
          </div>
          <div className="space-y-6">
            {deviceStats.map((device, index) => {
              const Icon = device.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-xl">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{device.device}</span>
                      <span className="text-white/80">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New visitor from San Francisco', time: '2 minutes ago', type: 'visitor' },
            { action: 'Contact form submitted', time: '15 minutes ago', type: 'contact' },
            { action: 'Project page viewed', time: '23 minutes ago', type: 'view' },
            { action: 'Resume downloaded', time: '1 hour ago', type: 'download' },
            { action: 'New visitor from London', time: '2 hours ago', type: 'visitor' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'visitor' ? 'bg-blue-400' :
                activity.type === 'contact' ? 'bg-green-400' :
                activity.type === 'view' ? 'bg-purple-400' : 'bg-cyan-400'
              }`} />
              <div className="flex-1">
                <div className="text-white">{activity.action}</div>
                <div className="text-white/60 text-sm">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;