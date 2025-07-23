import React from 'react';
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
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={
          <div className="bg-black text-white overflow-x-hidden">
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