import React, { useState } from "react";
import { Flame, CheckCircle, Award, Sparkles, ThumbsUp, Heart } from "lucide-react";

export default function FanZone({ pollData, userVotedOption, onCastVote }) {
  const [cheers, setCheers] = useState({
    "perth-scorchers": 1420,
    "sydney-sixers": 1289,
    "brisbane-heat": 1150,
    "adelaide-strikers": 890,
    "melbourne-stars": 820,
    "hobart-hurricanes": 670,
    "melbourne-renegades": 640,
    "sydney-thunder": 590
  });

  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const [triviaSubmitted, setTriviaSubmitted] = useState(false);

  const triviaQuestion = {
    q: "Which team has won the most Big Bash League titles in tournament history?",
    options: ["Sydney Sixers", "Perth Scorchers", "Brisbane Heat", "Melbourne Renegades"],
    correct: 1, // Perth Scorchers (5 titles)
    explanation: "Perth Scorchers lead the BBL with 5 titles (2013-14, 2014-15, 2016-17, 2021-22, 2022-23)!"
  };

  const totalVotes = pollData.options.reduce((acc, curr) => acc + curr.votes, 0);

  const handleCheer = (teamId) => {
    setCheers((prev) => ({
      ...prev,
      [teamId]: prev[teamId] + 1
    }));
  };

  return (
    <div className="fanzone-section">
      <div className="fanzone-header-banner">
        <div className="fanzone-badge">
          <Flame className="flame-icon pulse" size={18} />
          <span>BBL FAN ARENA</span>
        </div>
        <h2 className="fanzone-title">Voice Your Passion, Vote & Cheer</h2>
        <p className="fanzone-subtitle">
          Join over 50,000 Big Bash fans across Australia and worldwide in the official fan arena.
        </p>
      </div>

      <div className="fanzone-grid">
        {/* Interactive Poll */}
        <div className="fanzone-card poll-card">
          <div className="card-top">
            <span className="card-tag">OFFICIAL FAN POLL</span>
            <span className="votes-count">{totalVotes.toLocaleString()} Total Votes</span>
          </div>

          <h3 className="poll-question">{pollData.question}</h3>

          <div className="poll-options-list">
            {pollData.options.map((opt) => {
              const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              const hasVotedThis = userVotedOption === opt.id;

              return (
                <div
                  key={opt.id}
                  className={`poll-option-row ${hasVotedThis ? "voted" : ""}`}
                  onClick={() => onCastVote(opt.id)}
                  id={`poll-opt-${opt.id}`}
                >
                  <div className="poll-option-content">
                    <div className="opt-title-group">
                      <span className="opt-radio">{hasVotedThis ? "✓" : "○"}</span>
                      <span className="opt-name">{opt.team}</span>
                    </div>
                    <span className="opt-pct">{pct}% ({opt.votes})</span>
                  </div>

                  <div className="poll-progress-bar">
                    <div 
                      className={`poll-bar-fill ${hasVotedThis ? "bar-voted" : ""}`} 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="poll-footer-hint">
            {userVotedOption ? (
              <span className="vote-success-text">
                <CheckCircle size={15} /> Your vote has been recorded in real-time!
              </span>
            ) : (
              <span>Click on any franchise to cast your vote</span>
            )}
          </div>
        </div>

        {/* BBL Trivia Challenge */}
        <div className="fanzone-card trivia-card">
          <div className="card-top">
            <span className="card-tag tag-trivia">BBL TRIVIA CHALLENGE</span>
            <span className="points-tag">+50 Fan PTS</span>
          </div>

          <h3 className="trivia-q">{triviaQuestion.q}</h3>

          <div className="trivia-options-list">
            {triviaQuestion.options.map((optionText, idx) => {
              let btnClass = "trivia-opt-btn";
              if (triviaSubmitted) {
                if (idx === triviaQuestion.correct) btnClass += " correct";
                else if (idx === selectedTrivia) btnClass += " incorrect";
              } else if (selectedTrivia === idx) {
                btnClass += " selected";
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => !triviaSubmitted && setSelectedTrivia(idx)}
                >
                  <span>{optionText}</span>
                </button>
              );
            })}
          </div>

          {!triviaSubmitted ? (
            <button
              className="btn-submit-trivia"
              disabled={selectedTrivia === null}
              onClick={() => setTriviaSubmitted(true)}
            >
              Submit Answer
            </button>
          ) : (
            <div className="trivia-result-box">
              <span className="result-heading">
                {selectedTrivia === triviaQuestion.correct ? "🎉 Spot On!" : "❌ Close one!"}
              </span>
              <p className="result-expl">{triviaQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cheer Wall */}
      <div className="cheer-wall-card">
        <div className="cheer-header">
          <div>
            <h3 className="cheer-title">Live Franchise Cheer Wall</h3>
            <p className="cheer-desc">Tap the cheer heart to send energy to your team's dugout!</p>
          </div>
        </div>

        <div className="cheer-buttons-grid">
          {Object.entries(cheers).map(([teamId, count]) => {
            const teamName = teamId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            return (
              <button
                key={teamId}
                className="cheer-team-btn"
                onClick={() => handleCheer(teamId)}
                title={`Cheer for ${teamName}`}
              >
                <span className="cheer-team-name">{teamName}</span>
                <span className="cheer-count-badge">
                  <Heart size={13} className="heart-icon" /> {count.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
