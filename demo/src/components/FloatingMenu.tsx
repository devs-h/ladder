import React, { useState } from 'react';
import '../styles/FloatingMenu.css';

interface FloatingMenuProps {
  onSectionClick: (sectionId: string) => void;
  activeSection: string;
  activeTab: string;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ onSectionClick, activeSection, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const aboutSections = [
    { id: 'npm-install', label: 'NPM 설치', icon: '📦' },
    { id: 'react-usage', label: 'React 사용', icon: '⚛️' },
    { id: 'yarn-install', label: 'Yarn 설치', icon: '🧶' },
    { id: 'typescript', label: 'TypeScript', icon: '📘' },
    { id: 'kits', label: '킷', icon: '🛠️' },
    { id: 'resources', label: '리소스', icon: '📚' },
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsOpen(false);
  };

  if (activeTab !== 'about') {
    return null;
  }

  return (
    <div className={`floating-menu ${isOpen ? 'open' : ''}`}>
      <button 
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴 토글"
      >
        <span className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      
      <div className="menu-items">
        {aboutSections.map(section => (
          <button
            key={section.id}
            className={`menu-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => handleSectionClick(section.id)}
            title={section.label}
          >
            <span className="menu-icon">{section.icon}</span>
            <span className="menu-label">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingMenu;
