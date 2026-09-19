import React from "react";
import { Radio, ChevronRight, Zap } from "lucide-react";

export default function LiveTicker({ liveMatch, simulatedBall, onSelectMatch }) {
  if (!liveMatch) return null;

  return (
    <div className="live-ticker-banner" onClick={() => onSelectMatch(liveMatch.id)}>
      <div className="bbl-container ticker-flex">
        <div className="ticker-badge">
          <Radio size={14} className="ticker-icon pulse" />
          <span className="ticker-label">LIVE BBL ACTION</span>
        </div>

        <div className="ticker-match-preview">
          <div className="team-score">
            <span className="team-flag">{liveMatch.homeTeam.logo}</span>
            <span className="team-name">{liveMatch.homeTeam.shortName}</span>
            <span className="team-runs">{liveMatch.homeTeam.score}</span>
            <span className="team-overs">({liveMatch.homeTeam.overs})</span>
          </div>

          <span className="ticker-vs">vs</span>

          <div className="team-score active-batting">
            <span className="team-flag">{liveMatch.awayTeam.logo}</span>
            <span className="team-name">{liveMatch.awayTeam.shortName}</span>
            <span className="team-runs highlight">{liveMatch.awayTeam.score}</span>
            <span className="team-overs">({liveMatch.awayTeam.overs})</span>
          </div>
        </div>

        <div className="ticker-commentary">
          <Zap size={14} className="zap-icon" />
          <span className="ball-event">{simulatedBall.event}</span>
          <span className="equation-text">• {liveMatch.liveInfo.requirement}</span>
        </div>

        <div className="ticker-cta">
          <span>Match Center</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}
