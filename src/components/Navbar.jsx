import React from "react";
import { Trophy, Activity, Users, Calendar, BarChart3, Flame } from "lucide-react";

export default function Navbar({ activeTab, onTabSelect, searchQuery, onSearchChange }) {
  const tabs = [
    { id: "franchises", label: "Franchises", icon: Trophy },
    { id: "standings", label: "Standings", icon: BarChart3 },
    { id: "matches", label: "Fixtures & Results", icon: Calendar },
    { id: "players", label: "Players & Stats", icon: Users },
    { id: "fanzone", label: "Fan Zone & Polls", icon: Flame },
  ];

  return (
    <header className="bbl-header">
      <div className="bbl-container header-inner">
        <div className="brand-group" onClick={() => onTabSelect("franchises")}>
          <div className="bbl-logo-badge">
            <span className="bbl-logo-text">BBL</span>
            <span className="bbl-sparkle">★</span>
          </div>
          <div>
            <h1 className="league-title">BIG BASH LEAGUE</h1>
            <span className="league-subtitle">Official Fan Hub • Summer of Cricket</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search teams, players, venues..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
              id="bbl-global-search"
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => onSearchChange("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="live-pill" onClick={() => onTabSelect("matches")}>
            <span className="live-dot pulse"></span>
            <span className="live-text">MATCH 38 LIVE</span>
          </div>
        </div>
      </div>

      <nav className="bbl-nav-bar">
        <div className="bbl-container nav-container">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                className={`nav-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => onTabSelect(tab.id)}
              >
                <Icon size={18} className="tab-icon" />
                <span>{tab.label}</span>
                {isActive && <span className="active-indicator" />}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
