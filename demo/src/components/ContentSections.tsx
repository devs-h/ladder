import React from 'react';
import { LadderKit } from "@ladder/kit";
import '../styles/ContentSections.css';

interface ContentSectionsProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}
//test

const ContentSections: React.FC<ContentSectionsProps> = ({ activeTab, onTabChange }) => {
  const renderHomeContent = () => (
    <div className="content-section home-section">
      <section id="hero" className="hero-section">
        <div className="aurora-bg">
          <div className="aurora-layer aurora-layer-1"></div>
          <div className="aurora-layer aurora-layer-2"></div>
          <div className="aurora-layer aurora-layer-3"></div>
        </div>
        <div className="hero-content">
          <h1>Ladder-play 오신것을 환영합니다</h1>
          <button 
            className="cta-button"
            onClick={() => onTabChange && onTabChange('about')}
          >
            시작하기
          </button>
        </div>
      </section>
    </div>
  );

  const renderAboutContent = () => (
    <div className="content-section">
      <section className="about-section">
        <h1>Getting started</h1>
      </section>
      
        <section className="swiper-guide-section">
          <h2>Installation</h2>
          <div id="npm-install" className="guide-section">
            <h3>📦 NPM 설치</h3>
            <div className="code-block">
              <pre><code>npm install ladder-play</code></pre>
            </div>
            {/* <p>React 프로젝트에서 Ladder 라이브러리를 설치합니다:</p>
            <div className="code-block">
              <pre><code>{`import { LadderCore } from '@ladder-play/core';
import { LadderReact } from '@ladder-play/react';
import { LadderVue } from '@ladder-play/vue';`}</code></pre>
            </div> */}
          </div>

          <div id="react-usage" className="guide-section">
            <h3>🔧 React에서 사용하기</h3>
            <p>React 컴포넌트에서 Ladder를 사용하는 방법:</p>
            <div className="code-block">
              <pre><code>{`import { LadderReact } from '@ladder-play/react;`}</code></pre>
            </div>
            <div className="code-block">
              <pre><code>{`function MyComponent() {
  return (
    <div>
      <h1>My Ladder App</h1>
      <LadderReact />
    </div>
  );
}

export default MyComponent;`}</code></pre>
            </div>
          </div>

          <div id="yarn-install" className="guide-section">
            <h3>📦 Yarn 설치 방법</h3>
            <p>Yarn을 사용하는 경우:</p>
            <div className="code-block">
              <pre><code>yarn add @ladder/kit @ladder/core @ladder/canvas @ladder/types</code></pre>
            </div>
          </div>

          <div id="typescript" className="guide-section">
            <h3>🏗️ TypeScript 사용</h3>
            <p>TypeScript 프로젝트에서 타입 정의 사용:</p>
            <div className="code-block">
              <pre><code>{`import { LadderReact } from '@ladder/kit';
import type { LadderConfig, LadderOptions } from '@ladder/types';

const config: LadderConfig = {
  // 설정 옵션
};

function MyComponent() {
  return <LadderReact config={config} />;
}`}</code></pre>
            </div>
          </div>


          <div id="kits" className="guide-section">
            <h3>⚙️ 설정 및 초기화</h3>
            <div className="code-block">
              <pre><code>{`import { LadderReact } from '@ladder/kit';

const ladderConfig = {
  // 기본 설정
  theme: 'light | dark', // 테마 색상  
  maxPlayers: 10, // 최대 플레이어 갯수
  draggable: true, // 드래그 가능 유무
  

  blindPlayers: true | false, // 플레이어 블라인드 유무
  blindResults: true | false, // 결과 블라인드 유무
  together: true | false, // 함께 진행 유무

  on: {
    ready: (inst: LadderDom) => { // 준비 완료 시
      console.log(inst);
    },

    start: () => { // 시작 시
      console.log('start');
    },

    end: () => { // 끝내기 시
      console.log('end');
    },

    input: (input: string) => { // 인풋 시
      console.log(input);
    },

    output: (output: string) => { // 아웃풋 시
      console.log(output);
    },
  }

  
  // 커스텀 옵션
  customOptions: {
    // 추가 설정
  }
};

function App() {
  return (
    <div className="app">
      <LadderReact config={ladderConfig} />
    </div>
  );
}`}</code></pre>
            </div>
          </div>

          <div id="resources" className="guide-section">
            <h3>📚 추가 리소스</h3>
            <ul className="resource-list">
              <li><a href="https://github.com/ladder-org/ladder" target="_blank" rel="noopener noreferrer">GitHub 저장소</a></li>
              <li><a href="https://ladder.dev/docs" target="_blank" rel="noopener noreferrer">공식 문서</a></li>
              <li><a href="https://ladder.dev/examples" target="_blank" rel="noopener noreferrer">예제 모음</a></li>
              <li><a href="https://ladder.dev/api" target="_blank" rel="noopener noreferrer">API 레퍼런스</a></li>
            </ul>
        </div>
      </section>
    </div>
  );

  const renderServicesContent = () => (
    <div className="content-section">
      <section className="services-section">
        <h1>데모</h1>
        <LadderKit />
      </section>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return renderAboutContent();
      case 'demo':
        return renderServicesContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <main className={`main-content`}>
      {renderContent()}
    </main>
  );
};

export default ContentSections;