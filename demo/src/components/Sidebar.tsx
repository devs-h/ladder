import React, { useState, useEffect } from 'react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSectionClick: (sectionId: string) => void;
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  onSectionClick, 
  activeSection 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'about', label: '소개', icon: '📖' },
    { id: 'services', label: '데모', icon: '🚀' },
  ];

  const homeSections = [
    { id: 'hero', label: '메인', icon: '⭐' },
    { id: 'features', label: '기능', icon: '⚡' },
    { id: 'gallery', label: '갤러리', icon: '🖼️' },
    { id: 'testimonials', label: '후기', icon: '💬' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
  ];

  const aboutSections = [
    { id: 'npm-install', label: 'NPM 설치', icon: '📦' },
    { id: 'react-usage', label: 'React 사용', icon: '⚛️' },
    { id: 'yarn-install', label: 'Yarn 설치', icon: '🧶' },
    { id: 'bun-install', label: 'Bun 설치', icon: '🍞' },
    { id: 'cdn-usage', label: 'CDN 사용', icon: '🌐' },
    { id: 'typescript', label: 'TypeScript', icon: '📘' },
    { id: 'styling', label: '스타일링', icon: '🎨' },
    { id: 'configuration', label: '설정', icon: '⚙️' },
    { id: 'resources', label: '리소스', icon: '📚' },
  ];

  // 모바일에서 사이드바 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      const hamburger = document.querySelector('.hamburger');
      
      if (isOpen && sidebar && !sidebar.contains(event.target as Node) && 
          hamburger && !hamburger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ESC 키로 사이드바 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false); // 모바일에서 탭 클릭 시 사이드바 닫기
  };

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsOpen(false); // 모바일에서 섹션 클릭 시 사이드바 닫기
  };

  return (
    <>
      {/* 햄버거 버튼 (모바일에서만 표시) */}
      <button 
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴 열기/닫기"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* 오버레이 (모바일에서만 표시) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* 사이드바 */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Ladder</h2>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3>페이지</h3>
            <ul className="nav-list">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {activeTab === 'home' && (
            <div className="nav-section">
              <h3>섹션</h3>
              <ul className="nav-list">
                {homeSections.map(section => (
                  <li key={section.id}>
                    <button
                      className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <span className="nav-icon">{section.icon}</span>
                      <span className="nav-label">{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="nav-section">
              <h3>가이드</h3>
              <ul className="nav-list">
                {aboutSections.map(section => (
                  <li key={section.id}>
                    <button
                      className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <span className="nav-icon">{section.icon}</span>
                      <span className="nav-label">{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
