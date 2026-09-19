import React from "react";
import { Terminal, Shield, Code2, Award, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bbl-footer">
      <div className="bbl-container footer-content">
        <div className="footer-top-grid">
          <div className="footer-col-main">
            <div className="footer-logo">
              <span className="logo-box">BBL</span>
              <span className="footer-title">Big Bash League Fan Hub</span>
            </div>
            <p className="footer-desc">
              A responsive, interactive Single Page Application (SPA) showcasing modern component-based React architecture, dynamic data rendering, lifecycle management, and BBL cricket branding.
            </p>
            <div className="devtools-banner">
              <Cpu size={16} className="text-neon" />
              <span>React Developer Tools Ready: Inspect component hierarchy & state.</span>
            </div>
          </div>

          <div className="footer-col-academic">
            <h4 className="footer-heading">Academic Submission Details</h4>
            <ul className="academic-meta-list">
              <li><strong>Course:</strong> BCSE203E – Web Programming</li>
              <li><strong>Assignment:</strong> Assignment – 8 (10 Marks)</li>
              <li><strong>Faculty:</strong> Prof. Nihaal Ahmed.K</li>
              <li><strong>Slot:</strong> L31 + L32 + L51 + L52</li>
              <li><strong>Module:</strong> Module 6 – ReactJS (Components, Lifecycle, JSX)</li>
            </ul>
          </div>

          <div className="footer-col-tech">
            <h4 className="footer-heading">ReactJS Architecture</h4>
            <div className="tech-tags-flex">
              <span className="tech-badge">Class Constructor</span>
              <span className="tech-badge">componentDidMount</span>
              <span className="tech-badge">componentDidUpdate</span>
              <span className="tech-badge">componentWillUnmount</span>
              <span className="tech-badge">Reusable Cards</span>
              <span className="tech-badge">JSX Data Rendering</span>
              <span className="tech-badge">Dynamic SPA State</span>
              <span className="tech-badge">React DevTools</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} BBL Fan Hub SPA • Single Page Application Built with ReactJS</p>
          <p className="academic-disclaimer">Academic Project Demonstration for Web Programming Coursework.</p>
        </div>
      </div>
    </footer>
  );
}
