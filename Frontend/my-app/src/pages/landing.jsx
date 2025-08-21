import React, { useEffect, useRef } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// Updated CSS styles with enhanced hero section
const styles = `
.privcom-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1f2937;
}

.privcom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  z-index: 100;
}

.privcom-logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3730a3;
}

.privcom-nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: #4b5563;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #4f46e5;
}

.login-button {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
}

.login-button:hover {
  background-color: #4338ca;
}

.privcom-tagline {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 1rem;
}

/* Enhanced Hero Section */
.hero-section {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
  min-height: 90vh;
}

/* Animated gradient background */
.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(-45deg, #f0f4ff, #e0e7ff, #ede9fe, #dbeafe);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  z-index: 1;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.6;
  z-index: 2;
}

/* Floating elements */
.hero-floating-element {
  position: absolute;
  border-radius: 50%;
  z-index: 3;
  filter: blur(15px);
  opacity: 0.5;
}

.float-1 {
  background: rgba(79, 70, 229, 0.4);
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation: floatAnimation 20s ease-in-out infinite;
}

.float-2 {
  background: rgba(16, 185, 129, 0.3);
  width: 150px;
  height: 150px;
  bottom: 10%;
  right: 10%;
  animation: floatAnimation 15s ease-in-out infinite 2s;
}

.float-3 {
  background: rgba(59, 130, 246, 0.25);
  width: 100px;
  height: 100px;
  top: 30%;
  right: 20%;
  animation: floatAnimation 18s ease-in-out infinite 1s;
}

@keyframes floatAnimation {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -20px) rotate(10deg); }
  66% { transform: translate(-20px, 20px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

.hero-content {
  max-width: 600px;
  margin-top: 2rem;
  position: relative;
  z-index: 10;
  opacity: 0;
  animation: fadeIn 1s forwards 0.5s;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #3730a3, #4f46e5, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(79, 70, 229, 0.15);
  letter-spacing: -0.03em;
}

.highlight {
  position: relative;
  display: inline-block;
  color: #4f46e5;
  z-index: 1;
  -webkit-text-fill-color: #4f46e5;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: -5px;
  width: calc(100% + 10px);
  height: 40%;
  background-color: rgba(79, 70, 229, 0.15);
  z-index: -1;
  transform: rotate(-1deg);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.highlight:hover::after {
  height: 45%;
  background-color: rgba(79, 70, 229, 0.25);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}



.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeIn 1s forwards 1.5s;
}

.cta-button {
  display: inline-block;
  width: 400px;
  padding: 1rem 2.25rem;
  background: linear-gradient(to right, #4f46e5, #6366f1);
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s;
  z-index: -1;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

.cta-button:hover::before {
  left: 100%;
}

.cta-secondary {
  background: transparent;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.cta-secondary:hover {
  background-color: rgba(79, 70, 229, 0.05);
}

.image-container {
  position: relative;
  margin-bottom: 2rem;
  z-index: 20;
  width: 100%;
  max-width: 550px;
  opacity: 0;
  animation: slideUpFade 1s forwards;
}

.image-bg {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0) 70%);
  border-radius: 50%;
  filter: blur(3rem);
  z-index: -1;
  animation: pulse 6s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.1); opacity: 0.7; }
}

.feature-image {
  position: relative;
  z-index: 10;
  max-width: 100%;
  height: auto;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(0, 0, 0, 0.15);
  transform: perspective(1000px) rotateY(-8deg) rotateX(5deg);
  transition: all 0.7s ease;
  border: 4px solid rgba(255, 255, 255, 0.7);
}

.feature-image:hover {
  transform: perspective(1000px) rotateY(0) rotateX(0) scale(1.02);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 12px 36px -10px rgba(0, 0, 0, 0.2);
}

.floating-badges {
  position: absolute;
  z-index: 30;
  width: 100%;
  height: 100%;
}

.badge {
  position: absolute;
  background-color: white;
  color: #4f46e5;
  padding: 0.65rem 1.25rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.badge svg {
  width: 16px;
  height: 16px;
}

.badge-secure {
  top: -15px;
  right: 10%;
  animation: float 4s ease-in-out infinite;
  background: linear-gradient(to right, #4f46e5, #6366f1);
  color: white;
}

.badge-encrypted {
  bottom: 5%;
  left: -25px;
  animation: float 4s ease-in-out infinite 1s;
  background: linear-gradient(to right, #10b981, #059669);
  color: white;
}

.badge-private {
  top: 20%;
  right: -25px;
  animation: float 5s ease-in-out infinite 0.5s;
  background: linear-gradient(to right, #f59e0b, #d97706);
  color: white;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}


/* About Section */

.about-section {
  padding: 4rem 1.5rem;
  background-color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}/* About Section */
.about-section {
  padding: 4rem 1.5rem;
  background-color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}


.security-block {
  margin-top: 3rem;
  background: linear-gradient(135deg, #eff6ff, #eef2ff);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.security-title {
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.security-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.security-item {
  background: white;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.security-icon {
  background: #f0f9ff;
  color: #0284c7;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.security-content h5 {
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.security-content p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Core Features Section */
.core-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto 0;
}

.core-feature {
  background-color: #eff6ff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.core-feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: #eff6ff;
  color: #4f46e5;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #6b7280;
  line-height: 1.5;
  flex-grow: 1;
}

.feature-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.feature-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.detail-bullet {
  color: #4f46e5;
  font-size: 0.75rem;
}

/* CTA Section */
.cta-section {
  padding: 4rem 1.5rem;
  background: linear-gradient(to right, #3730a3, #4f46e5);
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.cta-text {
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  font-size: 1.125rem;
  opacity: 0.9;
}

.cta-button-white {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: white;
  color: #4f46e5;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-button-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.privcom-footer {
  padding: 2rem 1.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  background-color: #f8fafc;
  border-top: 1px solid #e5e7eb;
}


/* Media Queries for Responsive Design */
@media (min-width: 768px) {
  .privcom-nav {
    padding: 1rem 3rem;
  }
  
  .hero-section {
    flex-direction: row;
    padding: 4rem 3rem;
    min-height: 85vh;
  }
  
  .hero-content {
    width: 50%;
    margin-top: 0;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .image-container {
    width: 45%;
    margin-bottom: 0;
  }
  
  .core-features {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .architecture-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .security-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

export default function LandingPage() {
  const router = useNavigate();
  const heroRef = useRef(null);
  
  // Parallax effect for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const heroRect = heroRef.current.getBoundingClientRect();
      const mouseX = e.clientX - heroRect.left;
      const mouseY = e.clientY - heroRect.top;
      
      const moveX = (mouseX - heroRect.width / 2) / 25;
      const moveY = (mouseY - heroRect.height / 2) / 25;
      
      const image = heroRef.current.querySelector('.feature-image');
      if (image) {
        image.style.transform = `perspective(1000px) rotateY(${-moveX * 0.5}deg) rotateX(${moveY * 0.5}deg) translateZ(10px)`;
      }
    };
    
    const heroSection = heroRef.current;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <>
      <style>{styles}</style>
      <div className="privcom-container">
        {/* Navigation */}
        <nav className="privcom-nav">
          <div>
            <h2 className="privcom-logo">PrivCom</h2>
          </div>
          
          <div className="privcom-nav-links">
            <p 
              className="nav-link"
              onClick={() => router("/aljk23guest")}
            >
              Join as guest
            </p>
            
            <p 
              className="nav-link"
              onClick={() => router("/auth")}
            >
              Register
            </p>
            
            <div role="button">
              <button 
                className="login-button"
                onClick={() => router("/auth")}
              >
                Login
              </button>
            </div>
          </div>
        </nav>
        
        {/* Tagline */}
        <p className="privcom-tagline"> <h1>Enterprise-Grade Security. Complete Data Sovereignty. </h1></p>
        
        {/* Enhanced Hero Section */}
        <div className="hero-section" ref={heroRef}>
          {/* Animated Background */}
          <div className="hero-gradient"></div>
          
          {/* Background Pattern */}
          <div className="hero-pattern"></div>
          
          {/* Floating Elements */}
          <div className="hero-floating-element float-1"></div>
          <div className="hero-floating-element float-2"></div>
          <div className="hero-floating-element float-3"></div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="highlight">Self-Hosted</span> Enterprise
              <br />Communication Suite
            </h1>
            
            <p className="hero-subtitle">
              The all-in-one platform combining private video conferencing, end-to-end encrypted file transfer, and real-time collaboration tools—all within your secure infrastructure.
            </p>
            
           
            
            {/* CTA Button */}
            <div className="cta-buttons">
              <Link 
                to="/auth"
                className="cta-button "
              >
                <p style={{textAlign:"center", fontSize:"25px"}}>Access Workspace</p>
              </Link>
              {/* <Link 
                to="/demo"
                className="cta-button cta-secondary"
              >
                Watch Demo
              </Link> */}
            </div>
          </div>
          
          {/* Image Section with Floating Badges */}
          <div className="image-container">
            <div className="image-bg"></div>
            <div className="floating-badges">
              <div className="badge badge-secure">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                100% Secure
              </div>
              <div className="badge badge-encrypted">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                End-to-End Encrypted
              </div>
              <div className="badge badge-private">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Data Sovereignty
              </div>
            </div>
            <img 
              src="/com.png" 
              alt="Secure Enterprise Communication" 
              className="feature-image"
            />
          </div>
        </div>
        
       {/* About Section */}
       <section className="about-section">
          <div className="section-header">
            <h2 className="section-title">Enterprise Communication Reimagined</h2>
            <p className="section-subtitle">
              In today's digitally driven enterprise environments, organizations face growing security risks from third-party communication tools. PrivCom addresses these challenges by offering a comprehensive, self-hosted platform that ensures complete data sovereignty while enabling seamless collaboration.
            </p>
          </div>
          
          <div className="core-features">
            <div className="core-feature">
              <div className="feature-icon">🎥</div>
              <h3 className="feature-title">Secure Video Conferencing</h3>
              <p className="feature-description">
                Crystal-clear video meetings with complete privacy through peer-to-peer WebRTC architecture, eliminating the need for third-party servers and reducing points of failure.
              </p>
              <div className="feature-details">
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>No cloud intermediaries</span>
                </div>
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>Low-latency performance</span>
                </div>
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>Enterprise-grade scalability</span>
                </div>
              </div>
            </div>
            
            <div className="core-feature">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">SafeFile Transfer</h3>
              <p className="feature-description">
                Securely share files across platforms using TLS-encrypted HTTP/HTTPS protocols with multipart/stream support for reliable transfers even over unstable networks.
              </p>
              <div className="feature-details">
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>Cross-platform compatibility</span>
                </div>
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>Cookie-based session management</span>
                </div>
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>OS-level file access security</span>
                </div>
              </div>
            </div>
            
            <div className="core-feature">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">Real-Time Collaboration</h3>
              <p className="feature-description">
                Enhance productivity with integrated chat, screen sharing, and AI-driven speech-to-text transcription—enabling immediate collaboration and accessible record-keeping.
              </p>
              <div className="feature-details">
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>Instant messaging integration</span>
                </div>
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>Live screen sharing</span>
                </div>
                <div className="feature-detail">
                  <span className="detail-bullet">•</span>
                  <span>AI transcription engine</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        
        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Transform Your Enterprise Communication?</h2>
          <p className="cta-text">
            Experience the security, efficiency, and control of a fully integrated, self-hosted communication platform designed for modern enterprises.
          </p>
          <Link to="/auth" className="cta-button-white">
            Get Started Today
          </Link>
        </section>
        
        {/* Footer */}
        <footer className="privcom-footer">
          <p>© 2025 PrivCom. Secure enterprise communication within your control.</p>
        </footer>
      </div>
    </>
  );
}