import React from "react";
import { Calendar, MapPin, Award, Zap, Clock } from "lucide-react";

export default function MatchCard({ match, onSelectFranchise }) {
  const {
    id,
    status,
    matchNumber,
    title,
    date,
    venue,
    homeTeam,
    awayTeam,
    liveInfo,
    resultSummary,
    playerOfMatch,
    preview
  } = match;

  const isLive = status === "LIVE";
  const isCompleted = status === "COMPLETED";

  return (
    <div className={`match-card status-${status.toLowerCase()}`} id={`match-${id}`}>
      <div className="match-card-top">
        <div className="match-meta-pill">
          <span className="match-num">{matchNumber}</span>
          <span className="match-title-divider">•</span>
          <span className="match-stage">{title}</span>
        </div>

        {isLive && (
          <span className="live-status-badge">
            <span className="live-pulse-dot" /> LIVE
          </span>
        )}

        {isCompleted && (
          <span className="completed-badge">Result</span>
        )}

        {!isLive && !isCompleted && (
          <span className="upcoming-badge">
            <Clock size={12} /> Scheduled
          </span>
        )}
      </div>

      <div className="match-scoreboard">
        <div 
          className="team-row clickable-team"
          onClick={() => onSelectFranchise(homeTeam.id)}
          title={`View ${homeTeam.name}`}
        >
          <div className="team-branding">
            <span className="match-team-logo">{homeTeam.logo}</span>
            <span className="match-team-name">{homeTeam.name}</span>
          </div>
          <div className="team-scores">
            <span className="score-primary">{homeTeam.score}</span>
            {homeTeam.overs !== "-" && (
              <span className="score-overs">({homeTeam.overs})</span>
            )}
          </div>
        </div>

        <div className="vs-separator">
          <span className="vs-badge">VS</span>
        </div>

        <div 
          className="team-row clickable-team"
          onClick={() => onSelectFranchise(awayTeam.id)}
          title={`View ${awayTeam.name}`}
        >
          <div className="team-branding">
            <span className="match-team-logo">{awayTeam.logo}</span>
            <span className="match-team-name">{awayTeam.name}</span>
          </div>
          <div className="team-scores">
            <span className="score-primary">{awayTeam.score}</span>
            {awayTeam.overs !== "-" && (
              <span className="score-overs">({awayTeam.overs})</span>
            )}
          </div>
        </div>
      </div>

      {/* Conditional Info Based on Status */}
      {isLive && liveInfo && (
        <div className="live-game-panel">
          <div className="live-equation">
            <Zap size={14} className="zap-gold" />
            <span>{liveInfo.requirement}</span>
          </div>
          <div className="live-batsmen-mini">
            {liveInfo.currentBatsmen.map((bat, idx) => (
              <span key={idx} className="bat-stat">
                {bat.name}{bat.isStriker ? "*" : ""} <strong>{bat.runs}</strong> ({bat.balls})
              </span>
            ))}
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="result-panel">
          <p className="result-text">{resultSummary}</p>
          {playerOfMatch && (
            <div className="pom-strip">
              <Award size={13} className="pom-icon" />
              <span>Player of the Match: <strong>{playerOfMatch}</strong></span>
            </div>
          )}
        </div>
      )}

      {!isLive && !isCompleted && preview && (
        <div className="preview-panel">
          <p className="preview-text">{preview}</p>
        </div>
      )}

      <div className="match-card-footer">
        <div className="venue-meta">
          <MapPin size={13} />
          <span>{venue}</span>
        </div>
        <div className="date-meta">
          <Calendar size={13} />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
