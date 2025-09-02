import React, { useState } from 'react';
import './FloatingMenu.css';

interface FloatingMenuProps {
  onSectionClick: (sectionId: string) => void;
  activeSection: string;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ onSectionClick, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'hero', label: '메인', icon: '🏠' },
    { id: 'features', label: '기능', icon: '⚡' },
    { id: 'gallery', label: '갤러리', icon: '🖼️' },
    { id: 'testimonials', label: '후기', icon: '💬' },
    { id: 'pricing', label: '가격', icon: '💰' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsOpen(false);
  };

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
        {sections.map(section => (
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
