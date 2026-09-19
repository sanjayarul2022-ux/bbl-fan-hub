import React from "react";
import { Award, Zap, Target, Activity } from "lucide-react";

export default function PlayerCard({ player, onSelectPlayer, onSelectFranchise }) {
  const {
    id,
    name,
    franchiseId,
    franchiseName,
    role,
    battingStyle,
    bowlingStyle,
    nationality,
    matches,
    runs,
    average,
    strikeRate,
    wickets,
    bestBowling,
    avatar,
    isStar
  } = player;

  const getRoleBadgeClass = (r) => {
    switch (r.toLowerCase()) {
      case "batter":
        return "role-batter";
      case "bowler":
        return "role-bowler";
      case "all-rounder":
        return "role-allrounder";
      case "wicketkeeper-batter":
        return "role-keeper";
      default:
        return "role-default";
    }
  };

  return (
    <div className="player-card" id={`player-${id}`}>
      <div className="player-card-header">
        <div className="avatar-wrapper">
          <span className="player-avatar-emoji">{avatar}</span>
          {isStar && (
            <span className="star-player-pill" title="Marquee BBL Star">
              <Zap size={12} fill="#FFD700" color="#FFD700" /> Star
            </span>
          )}
        </div>

        <div className="player-meta-top">
          <span className={`role-badge ${getRoleBadgeClass(role)}`}>{role}</span>
          <span className="player-country">{nationality}</span>
        </div>
      </div>

      <div className="player-info-main">
        <h4 className="player-name">{name}</h4>
        <button 
          className="player-franchise-tag"
          onClick={(e) => {
            e.stopPropagation();
            onSelectFranchise(franchiseId);
          }}
          title="Filter by franchise"
        >
          {franchiseName}
        </button>

        <div className="player-styles">
          <span className="style-text">{battingStyle}</span>
          {bowlingStyle && bowlingStyle !== "None" && (
            <span className="style-text">• {bowlingStyle}</span>
          )}
        </div>
      </div>

      <div className="player-stats-matrix">
        <div className="stat-box">
          <span className="stat-title">Matches</span>
          <span className="stat-number">{matches}</span>
        </div>

        <div className="stat-box">
          <span className="stat-title">Runs</span>
          <span className="stat-number highlight-runs">{runs}</span>
        </div>

        <div className="stat-box">
          <span className="stat-title">Strike Rate</span>
          <span className="stat-number">{strikeRate}</span>
        </div>

        <div className="stat-box">
          <span className="stat-title">Wickets</span>
          <span className="stat-number highlight-wickets">{wickets}</span>
        </div>
      </div>

      <div className="player-card-footer">
        <button 
          className="btn-view-profile"
          onClick={() => onSelectPlayer(player)}
          id={`btn-player-${id}`}
        >
          <span>Full Statistics & Profile</span>
        </button>
      </div>
    </div>
  );
}
