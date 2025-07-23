import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Target, 
  BarChart3, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Eye,
  Clock,
  Users
} from 'lucide-react';

const SEOOptimizer = () => {
  const [seoData, setSeoData] = useState({
    title: 'Mohsin Ali - Full Stack Developer',
    description: 'Full Stack Developer & Creative Technologist. Specializing in React, Node.js, and modern web technologies.',
    keywords: 'full stack developer, react developer, node.js, web development, javascript',
    ogImage: 'https://example.com/og-image.jpg',
    canonicalUrl: 'https://mohsinali.dev',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemap: 'https://mohsinali.dev/sitemap.xml'
  });

  const [seoScore, setSeoScore] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const seoChecks = [
    { name: 'Title Tag Length', status: 'good', score: 100, description: 'Title is within optimal length (50-60 characters)' },
    { name: 'Meta Description', status: 'good', score: 95, description: 'Meta description is compelling and within limits' },
    { name: 'Heading Structure', status: 'warning', score: 80, description: 'Consider adding more H2 and H3 tags for better structure' },
    { name: 'Image Alt Tags', status: 'good', score: 90, description: 'Most images have descriptive alt tags' },
    { name: 'Page Speed', status: 'good', score: 88, description: 'Page loads quickly on both desktop and mobile' },
    { name: 'Mobile Friendly', status: 'good', score: 100, description: 'Site is fully responsive and mobile-optimized' },
    { name: 'SSL Certificate', status: 'good', score: 100, description: 'Site is secured with HTTPS' },
    { name: 'Internal Linking', status: 'warning', score: 75, description: 'Could benefit from more internal links between sections' }
  ];

  const keywords = [
    { keyword: 'full stack developer', position: 3, volume: 12000, difficulty: 65 },
    { keyword: 'react developer', position: 8, volume: 8500, difficulty: 70 },
    { keyword: 'node.js developer', position: 12, volume: 6200, difficulty: 68 },
    { keyword: 'web developer portfolio', position: 5, volume: 4800, difficulty: 45 },
    { keyword: 'javascript developer', position: 15, volume: 15000, difficulty: 75 }
  ];

  const analytics = {
    organicTraffic: 2847,
    organicGrowth: 12.5,
    avgPosition: 8.2,
    clickThroughRate: 3.4,
    impressions: 45230,
    clicks: 1540
  };

  const handleAnalyzeSEO = async () => {
    setIsAnalyzing(true);
    // Simulate SEO analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    // Update score based on analysis
    setSeoScore(Math.floor(Math.random() * 20) + 80);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return CheckCircle;
      case 'warning':
      case 'error':
        return AlertCircle;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">SEO Optimization</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleAnalyzeSEO}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search size={16} />
          )}
          {isAnalyzing ? 'Analyzing...' : 'Analyze SEO'}
        </motion.button>
      </div>

      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${seoScore * 2.51} 251`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{seoScore}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">SEO Score</h3>
          <p className="text-white/60 text-sm">Overall optimization score</p>
        </div>

        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">+{analytics.organicGrowth}%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analytics.organicTraffic.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Organic Traffic</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Target size={20} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Avg Position</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analytics.avgPosition}</div>
            <div className="text-white/60 text-sm">Search Results</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Eye size={20} className="text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">{analytics.clickThroughRate}%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analytics.clicks.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Clicks</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Settings */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe size={20} />
            SEO Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={seoData.title}
                onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="text-xs text-white/60 mt-1">
                {seoData.title.length}/60 characters
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Meta Description
              </label>
              <textarea
                value={seoData.description}
                onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
              <div className="text-xs text-white/60 mt-1">
                {seoData.description.length}/160 characters
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={seoData.keywords}
                onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                placeholder="Separate keywords with commas"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Open Graph Image
              </label>
              <input
                type="url"
                value={seoData.ogImage}
                onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                placeholder="https://example.com/og-image.jpg"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-xl font-medium"
            >
              Update SEO Settings
            </motion.button>
          </div>
        </div>

        {/* SEO Health Check */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            SEO Health Check
          </h3>
          
          <div className="space-y-4">
            {seoChecks.map((check, index) => {
              const Icon = getStatusIcon(check.status);
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Icon size={20} className={getStatusColor(check.status)} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium">{check.name}</h4>
                      <span className="text-sm font-bold text-white">{check.score}%</span>
                    </div>
                    <p className="text-white/70 text-sm">{check.description}</p>
                    <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                      <div
                        className={`h-1 rounded-full bg-gradient-to-r ${
                          check.status === 'good' ? 'from-green-400 to-green-600' :
                          check.status === 'warning' ? 'from-yellow-400 to-yellow-600' :
                          'from-red-400 to-red-600'
                        }`}
                        style={{ width: `${check.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyword Rankings */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target size={20} />
          Keyword Rankings
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/80 font-medium py-3">Keyword</th>
                <th className="text-left text-white/80 font-medium py-3">Position</th>
                <th className="text-left text-white/80 font-medium py-3">Volume</th>
                <th className="text-left text-white/80 font-medium py-3">Difficulty</th>
                <th className="text-left text-white/80 font-medium py-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-3 text-white">{keyword.keyword}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      keyword.position <= 3 ? 'bg-green-500/20 text-green-400' :
                      keyword.position <= 10 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      #{keyword.position}
                    </span>
                  </td>
                  <td className="py-3 text-white/80">{keyword.volume.toLocaleString()}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-white/10 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                          style={{ width: `${keyword.difficulty}%` }}
                        />
                      </div>
                      <span className="text-white/60 text-sm">{keyword.difficulty}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <TrendingUp size={16} className="text-green-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SEOOptimizer;