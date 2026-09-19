import React from "react";
import { X, Award, Zap, Target, TrendingUp, ShieldCheck } from "lucide-react";

export default function PlayerModal({ player, onClose, onSelectFranchise }) {
  if (!player) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content player-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="player-modal-header">
          <div className="player-avatar-large">
            <span>{player.avatar}</span>
          </div>

          <div className="player-modal-details">
            <span className="player-role-tag">{player.role}</span>
            <h2 className="modal-player-title">{player.name}</h2>
            
            <button 
              className="player-team-pill"
              onClick={() => onSelectFranchise(player.franchiseId)}
            >
              {player.franchiseName}
            </button>
            <span className="player-country-tag">Representing {player.nationality}</span>
          </div>
        </div>

        <div className="modal-body-scrollable">
          <div className="player-styles-card">
            <div className="style-field">
              <span className="style-label">Batting Style</span>
              <span className="style-val">{player.battingStyle}</span>
            </div>
            <div className="style-field">
              <span className="style-label">Bowling Style</span>
              <span className="style-val">{player.bowlingStyle || "N/A"}</span>
            </div>
            <div className="style-field">
              <span className="style-label">Tournament Status</span>
              <span className="style-val">{player.isStar ? "🌟 Marquee Player" : "Squad Member"}</span>
            </div>
          </div>

          <h3 className="sub-title">Big Bash League Career Statistics</h3>
          <div className="stats-showcase-grid">
            <div className="stat-card-tile">
              <span className="tile-title">Matches</span>
              <span className="tile-number">{player.matches}</span>
              <span className="tile-sub">Appearances</span>
            </div>

            <div className="stat-card-tile">
              <span className="tile-title">Total Runs</span>
              <span className="tile-number highlight-runs">{player.runs}</span>
              <span className="tile-sub">High Score: {player.highScore}</span>
            </div>

            <div className="stat-card-tile">
              <span className="tile-title">Batting Average</span>
              <span className="tile-number">{player.average}</span>
              <span className="tile-sub">100s: {player.centuries} | 50s: {player.fifties}</span>
            </div>

            <div className="stat-card-tile">
              <span className="tile-title">Strike Rate</span>
              <span className="tile-number">{player.strikeRate}</span>
              <span className="tile-sub">Runs / 100 Balls</span>
            </div>

            <div className="stat-card-tile">
              <span className="tile-title">Total Wickets</span>
              <span className="tile-number highlight-wickets">{player.wickets}</span>
              <span className="tile-sub">Best: {player.bestBowling}</span>
            </div>

            <div className="stat-card-tile">
              <span className="tile-title">Economy Rate</span>
              <span className="tile-number">{player.economy > 0 ? player.economy : "-"}</span>
              <span className="tile-sub">Runs Per Over</span>
            </div>
          </div>

          <div className="strike-rate-gauge-box">
            <div className="gauge-header">
              <span>T20 Aggression Rating</span>
              <span className="gauge-val">{player.strikeRate > 140 ? "High Impact Explosive" : "Anchor / Steady"}</span>
            </div>
            <div className="gauge-track">
              <div 
                className="gauge-fill"
                style={{ width: `${Math.min(100, (player.strikeRate / 170) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn-modal-close" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
