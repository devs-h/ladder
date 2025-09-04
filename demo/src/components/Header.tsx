import React from 'react';
import './Header.css';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '소개' },
    { id: 'services', label: '데모' },
    // { id: 'portfolio', label: '포트폴리오' },
    // { id: 'contact', label: '연락처' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Ladder</h1>
        </div>
        <nav className="nav-tabs">
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
      </div>
    </header>
  );
};

export default Header;
