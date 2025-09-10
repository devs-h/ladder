import React, { useState, useEffect } from 'react';
import "./index.css";
import Header from './components/Header';
import FloatingMenu from './components/FloatingMenu';
import ContentSections from './components/ContentSections';
import { LadderKit } from "@ladder/kit";

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (activeTab !== 'about') {
      return;
    }

    const sections = ['npm-install', 'react-usage', 'yarn-install', 'typescript', 'kits', 'resources'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleSection = '';

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  useEffect(() => {
    document.body.classList.remove('home-mode');
    if (activeTab === 'about') {
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
      {activeTab !== 'home' && (
        <Header 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      )}
      <FloatingMenu 
        onSectionClick={handleSectionClick} 
        activeSection={activeSection}
        activeTab={activeTab}
      />
      <ContentSections activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;