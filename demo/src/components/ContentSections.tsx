import React from 'react';
import { LadderReact } from "@ladder/dom";
import '../styles/ContentSections.css';

interface ContentSectionsProps {
  activeTab: string;
}

const ContentSections: React.FC<ContentSectionsProps> = ({ activeTab }) => {
  const renderHomeContent = () => (
    <div className="content-section">
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>Ladder에 오신 것을 환영합니다</h1>
          <p>혁신적인 솔루션으로 여러분의 비즈니스를 한 단계 더 발전시키세요</p>
          <button className="cta-button">시작하기</button>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>주요 기능</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>빠른 성능</h3>
            <p>최적화된 코드로 빠르고 효율적인 성능을 제공합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>보안</h3>
            <p>엔터프라이즈급 보안으로 데이터를 안전하게 보호합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>반응형</h3>
            <p>모든 디바이스에서 완벽하게 작동하는 반응형 디자인입니다.</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <h2>갤러리</h2>
        <div className="gallery-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="gallery-item">
              <div className="gallery-placeholder">
                <span>이미지 {i}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <h2>고객 후기</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"정말 놀라운 서비스입니다. 비즈니스가 크게 발전했어요!"</p>
            <div className="testimonial-author">
              <strong>김철수</strong>
              <span>ABC 회사 대표</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"사용하기 쉽고 직관적인 인터페이스가 마음에 듭니다."</p>
            <div className="testimonial-author">
              <strong>이영희</strong>
              <span>XYZ 스타트업</span>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <h2>자주 묻는 질문</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>서비스는 어떻게 시작하나요?</h3>
            <p>간단한 가입 절차를 통해 몇 분 안에 서비스를 시작할 수 있습니다.</p>
          </div>
          <div className="faq-item">
            <h3>데이터는 안전한가요?</h3>
            <p>네, 엔터프라이즈급 보안으로 모든 데이터를 안전하게 보호합니다.</p>
          </div>
          <div className="faq-item">
            <h3>환불 정책이 있나요?</h3>
            <p>30일 무조건 환불 보장 정책을 제공합니다.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAboutContent = () => (
    <div className="content-section">
      <section className="about-section">
        <h1>Getting started</h1>
        {/* <p>Ladder는 혁신적인 기술 솔루션을 제공하는 회사입니다.</p> */}
      </section>
      
        <section className="swiper-guide-section">
          <h2>Installation</h2>
          <div id="npm-install" className="guide-section">
            <h3>📦 NPM 설치 방법</h3>
            <div className="code-block">
              <pre><code>npm install ladder-play</code></pre>
            </div>
            <p>React 프로젝트에서 Ladder 라이브러리를 설치합니다:</p>
            <div className="code-block">
              <pre><code>{`import { LadderCore } from '@ladder-play/core';
import { LadderReact } from '@ladder-play/react';
import { LadderVue } from '@ladder-play/vue';`}</code></pre>
            </div>
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
              <pre><code>yarn add @ladder/dom @ladder/core @ladder/canvas @ladder/types</code></pre>
            </div>
          </div>

          <div id="cdn-usage" className="guide-section">
            <h3>🌐 CDN 사용 방법</h3>
            <p>CDN을 통해 직접 사용하려면:</p>
            <div className="code-block">
              <pre><code>{`<!-- HTML에서 직접 사용 -->
<script src="https://unpkg.com/@ladder/dom/dist/index.js"></script>
<script src="https://unpkg.com/@ladder/core/dist/index.js"></script>`}</code></pre>
            </div>
            <p>ES 모듈을 사용하는 경우:</p>
            <div className="code-block">
              <pre><code>{`<script type="module">
  import { LadderReact } from 'https://unpkg.com/@ladder/dom/dist/index.mjs';
  
  // Ladder 사용
</script>`}</code></pre>
            </div>
          </div>

          <div id="typescript" className="guide-section">
            <h3>🏗️ TypeScript 사용</h3>
            <p>TypeScript 프로젝트에서 타입 정의 사용:</p>
            <div className="code-block">
              <pre><code>{`import { LadderReact } from '@ladder/dom';
import type { LadderConfig, LadderOptions } from '@ladder/types';

const config: LadderConfig = {
  // 설정 옵션
};

function MyComponent() {
  return <LadderReact config={config} />;
}`}</code></pre>
            </div>
          </div>


          <div id="configuration" className="guide-section">
            <h3>⚙️ 설정 및 초기화</h3>
            <div className="code-block">
              <pre><code>{`import { LadderReact } from '@ladder/dom';

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
        <LadderReact />
      </section>
    </div>
  );

  // const renderPortfolioContent = () => (
  //   <div className="content-section">
  //     <section className="portfolio-section">
  //       <h1>포트폴리오</h1>
  //       <div className="portfolio-grid">
  //         {[1, 2, 3, 4, 5, 6].map(i => (
  //           <div key={i} className="portfolio-item">
  //             <div className="portfolio-placeholder">
  //               <span>프로젝트 {i}</span>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //   </div>
  // );

  // const renderContactContent = () => (
  //   <div className="content-section">
  //     <section className="contact-section">
  //       <h1>연락처</h1>
  //       <div className="contact-grid">
  //         <div className="contact-info">
  //           <h3>연락처 정보</h3>
  //           <p>📧 contact@ladder.com</p>
  //           <p>📞 02-1234-5678</p>
  //           <p>📍 서울시 강남구 테헤란로 123</p>
  //         </div>
  //         <div className="contact-form">
  //           <h3>문의하기</h3>
  //           <form>
  //             <input type="text" placeholder="이름" />
  //             <input type="email" placeholder="이메일" />
  //             <textarea placeholder="메시지"></textarea>
  //             <button type="submit">전송</button>
  //           </form>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'about':
        return renderAboutContent();
      case 'services':
        return renderServicesContent();
      // case 'portfolio':
      //   return renderPortfolioContent();
      // case 'contact':
      //   return renderContactContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};

export default ContentSections;