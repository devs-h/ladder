import React, { useState, useEffect } from 'react';
import "./index.css";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FloatingMenu from './components/FloatingMenu';
import ContentSections from './components/ContentSections';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let sections: string[] = [];
      
      if (activeTab === 'home') {
        sections = ['hero', 'features', 'gallery', 'testimonials', 'faq'];
      } else if (activeTab === 'about') {
        sections = ['npm-install', 'react-usage', 'yarn-install', 'bun-install', 'cdn-usage', 'typescript', 'configuration', 'resources'];
      }
      
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  // 탭이 변경될 때 activeSection 초기화
  useEffect(() => {
    if (activeTab === 'home') {
      setActiveSection('hero');
    } else if (activeTab === 'about') {
      setActiveSection('npm-install');
    } else {
      setActiveSection('');
    }
  }, [activeTab]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
      />
      <FloatingMenu 
        onSectionClick={handleSectionClick} 
        activeSection={activeSection}
      />
      <ContentSections activeTab={activeTab} />
    </div>
  );
}

export default App;
