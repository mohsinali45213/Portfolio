import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './admin/AdminPanel';
import { usePortfolioStore } from './store/portfolioStore';
import './index.css';

function App() {
  const { loadAllData, loading } = usePortfolioStore();

  useEffect(() => {
    // Load all data from Appwrite when app mounts
    loadAllData();
  }, [loadAllData]);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={
          <div className="bg-black text-white overflow-x-hidden">
            {loading && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white/70">Loading portfolio...</p>
                </div>
              </div>
            )}
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Certificates />
              <Contact />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;