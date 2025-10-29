import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'about', label: '소개' },
    { id: 'demo', label: '데모' },
  ];

  return (
    <header className="header">
      <div className="logo-section">
        <h1>Ladder</h1>
      </div>
      
      <nav className="navigation-section">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
