import React, { useState, useEffect } from 'react';
import "./index.css";
import Header from './components/Header';
import FloatingMenu from './components/FloatingMenu';
import ContentSections from './components/ContentSections';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');

  // 스크롤 위치에 따른 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'gallery', 'testimonials', 'pricing', 'faq'];
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
  }, []);

  // 섹션으로 스크롤 이동
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
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <FloatingMenu 
        onSectionClick={handleSectionClick} 
        activeSection={activeSection}
      />
      <ContentSections activeTab={activeTab} />
    </div>
  );
}

export default App;
