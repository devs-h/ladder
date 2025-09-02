import React from 'react';
import './ContentSections.css';

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

      <section id="pricing" className="pricing-section">
        <h2>가격 정보</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>기본</h3>
            <div className="price">₩29,000<span>/월</span></div>
            <ul>
              <li>기본 기능</li>
              <li>이메일 지원</li>
              <li>5GB 저장공간</li>
            </ul>
            <button className="pricing-button">선택하기</button>
          </div>
          <div className="pricing-card featured">
            <h3>프로</h3>
            <div className="price">₩59,000<span>/월</span></div>
            <ul>
              <li>모든 기능</li>
              <li>우선 지원</li>
              <li>50GB 저장공간</li>
            </ul>
            <button className="pricing-button">선택하기</button>
          </div>
          <div className="pricing-card">
            <h3>엔터프라이즈</h3>
            <div className="price">₩99,000<span>/월</span></div>
            <ul>
              <li>무제한 기능</li>
              <li>전담 지원</li>
              <li>무제한 저장공간</li>
            </ul>
            <button className="pricing-button">선택하기</button>
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
        <h1>회사 소개</h1>
        <p>Ladder는 혁신적인 기술 솔루션을 제공하는 회사입니다.</p>
        <div className="about-grid">
          <div className="about-card">
            <h3>미션</h3>
            <p>고객의 성공을 위한 최고의 기술 솔루션을 제공합니다.</p>
          </div>
          <div className="about-card">
            <h3>비전</h3>
            <p>기술 혁신을 통해 더 나은 미래를 만들어갑니다.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderServicesContent = () => (
    <div className="content-section">
      <section className="services-section">
        <h1>서비스</h1>
        <div className="services-grid">
          <div className="service-card">
            <h3>웹 개발</h3>
            <p>현대적이고 반응형 웹사이트를 개발합니다.</p>
          </div>
          <div className="service-card">
            <h3>모바일 앱</h3>
            <p>iOS와 Android 앱을 개발합니다.</p>
          </div>
          <div className="service-card">
            <h3>클라우드 솔루션</h3>
            <p>확장 가능한 클라우드 인프라를 구축합니다.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPortfolioContent = () => (
    <div className="content-section">
      <section className="portfolio-section">
        <h1>포트폴리오</h1>
        <div className="portfolio-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="portfolio-item">
              <div className="portfolio-placeholder">
                <span>프로젝트 {i}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderContactContent = () => (
    <div className="content-section">
      <section className="contact-section">
        <h1>연락처</h1>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>연락처 정보</h3>
            <p>📧 contact@ladder.com</p>
            <p>📞 02-1234-5678</p>
            <p>📍 서울시 강남구 테헤란로 123</p>
          </div>
          <div className="contact-form">
            <h3>문의하기</h3>
            <form>
              <input type="text" placeholder="이름" />
              <input type="email" placeholder="이메일" />
              <textarea placeholder="메시지"></textarea>
              <button type="submit">전송</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'about':
        return renderAboutContent();
      case 'services':
        return renderServicesContent();
      case 'portfolio':
        return renderPortfolioContent();
      case 'contact':
        return renderContactContent();
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
