import React from "react";
import { X, Trophy, MapPin, Award, User, Shield, Sparkles, CheckCircle2 } from "lucide-react";

export default function FranchiseModal({ franchise, players, onClose, onSelectPlayer }) {
  if (!franchise) return null;

  const teamPlayers = players.filter((p) => p.franchiseId === franchise.id);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content franchise-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          "--team-color": franchise.primaryColor,
          "--team-accent": franchise.accentColor
        }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-hero-header">
          <div className="modal-hero-logo-box">
            <span className="modal-emoji">{franchise.logo}</span>
          </div>

          <div className="modal-hero-titles">
            <div className="modal-hero-badge">{franchise.shortName} • BBL FRANCHISE</div>
            <h2 className="modal-team-name">{franchise.name}</h2>
            <p className="modal-team-anthem">"{franchise.anthem}"</p>
          </div>
        </div>

        <div className="modal-body-scrollable">
          <div className="franchise-overview-box">
            <p className="overview-text">{franchise.overview}</p>
          </div>

          <div className="franchise-highlights-grid">
            <div className="highlight-card">
              <Trophy className="hl-icon hl-trophy" size={20} />
              <div className="hl-content">
                <span className="hl-label">BBL Championships</span>
                <span className="hl-value">{franchise.titles}</span>
                <span className="hl-sub">
                  {franchise.titleYears.length > 0 ? franchise.titleYears.join(", ") : "Chasing Maiden Title"}
                </span>
              </div>
            </div>

            <div className="highlight-card">
              <MapPin className="hl-icon hl-venue" size={20} />
              <div className="hl-content">
                <span className="hl-label">Home Venue</span>
                <span className="hl-value">{franchise.homeVenue}</span>
                <span className="hl-sub">Capacity: {franchise.venueCapacity}</span>
              </div>
            </div>

            <div className="highlight-card">
              <User className="hl-icon hl-coach" size={20} />
              <div className="hl-content">
                <span className="hl-label">Leadership</span>
                <span className="hl-value">Capt: {franchise.captain}</span>
                <span className="hl-sub">Coach: {franchise.headCoach}</span>
              </div>
            </div>

            <div className="highlight-card">
              <Award className="hl-icon hl-record" size={20} />
              <div className="hl-content">
                <span className="hl-label">Franchise Record</span>
                <span className="hl-value">{franchise.wins}W - {franchise.losses}L</span>
                <span className="hl-sub">Win Rate: {franchise.winRate}</span>
              </div>
            </div>
          </div>

          <div className="modal-squad-section">
            <div className="section-head-mini">
              <h3 className="sub-title">Key Squad Members ({teamPlayers.length} Featured Stars)</h3>
              <span className="hint-text">Click any player for detailed statistics</span>
            </div>

            <div className="squad-list-grid">
              {teamPlayers.map((player) => (
                <div 
                  key={player.id} 
                  className="squad-player-chip"
                  onClick={() => onSelectPlayer(player)}
                  title="View detailed player stats"
                >
                  <span className="chip-avatar">{player.avatar}</span>
                  <div className="chip-info">
                    <span className="chip-name">{player.name}</span>
                    <span className="chip-role">{player.role} • {player.nationality}</span>
                  </div>
                  <div className="chip-stat">
                    <span>{player.role.includes("Bowler") ? `${player.wickets} Wkts` : `${player.runs} Runs`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn-modal-close" onClick={onClose}>
            Close Franchise View
          </button>
        </div>
      </div>
    </div>
  );
}
