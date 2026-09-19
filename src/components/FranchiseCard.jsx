import React from "react";
import { Trophy, MapPin, Shield, User, ArrowRight } from "lucide-react";

export default function FranchiseCard({ franchise, onSelect }) {
  const {
    id,
    name,
    shortName,
    city,
    homeVenue,
    venueCapacity,
    titles,
    primaryColor,
    secondaryColor,
    captain,
    headCoach,
    winRate,
    logo
  } = franchise;

  return (
    <div 
      className="franchise-card"
      id={`franchise-${id}`}
      style={{
        "--team-color": primaryColor,
        "--team-bg": secondaryColor
      }}
    >
      <div className="card-accent-bar" />
      
      <div className="card-top-section">
        <div className="team-badge-circle">
          <span className="team-emoji-logo">{logo}</span>
        </div>
        
        <div className="title-count-badge">
          <Trophy size={14} className="trophy-icon" />
          <span>{titles} {titles === 1 ? "Title" : "Titles"}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="team-identity">
          <span className="team-code">{shortName}</span>
          <h3 className="team-title">{name}</h3>
        </div>

        <div className="info-meta-list">
          <div className="meta-item">
            <MapPin size={15} className="meta-icon" />
            <div className="meta-texts">
              <span className="meta-label">Home Fortress</span>
              <span className="meta-val">{homeVenue}</span>
              <span className="meta-sub">Cap: {venueCapacity}</span>
            </div>
          </div>

          <div className="meta-grid-2">
            <div className="meta-mini">
              <span className="meta-label">Captain</span>
              <span className="meta-val-bold">{captain}</span>
            </div>
            <div className="meta-mini">
              <span className="meta-label">Head Coach</span>
              <span className="meta-val-bold">{headCoach}</span>
            </div>
          </div>

          <div className="winrate-bar-container">
            <div className="winrate-labels">
              <span>All-Time Win Rate</span>
              <span className="winrate-pct">{winRate}</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: winRate, backgroundColor: primaryColor }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button 
          className="btn-explore-team"
          onClick={() => onSelect(franchise)}
          id={`btn-explore-${id}`}
        >
          <span>View Squad & Franchise Hub</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
