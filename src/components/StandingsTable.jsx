import React from "react";

export function StandingsRow({ standing, onSelectTeam }) {
  const { rank, franchiseId, name, played, won, lost, noResult, points, nrr, form, logo, primaryColor } = standing;

  return (
    <tr 
      className={`standings-row rank-${rank}`}
      onClick={() => onSelectTeam(franchiseId)}
      title="Click to view franchise profile"
      id={`standings-row-${franchiseId}`}
    >
      <td className="col-rank">
        <span className={`rank-pill rank-badge-${rank <= 4 ? "top4" : "normal"}`}>
          {rank}
        </span>
      </td>

      <td className="col-team">
        <div className="team-cell-flex">
          <span className="team-cell-logo">{logo}</span>
          <span className="team-cell-name" style={{ color: primaryColor }}>{name}</span>
          {rank <= 4 && <span className="playoff-q" title="Playoff Qualification Zone">Q</span>}
        </div>
      </td>

      <td className="col-stat">{played}</td>
      <td className="col-stat text-win">{won}</td>
      <td className="col-stat text-loss">{lost}</td>
      <td className="col-stat">{noResult}</td>
      <td className="col-stat font-bold pts-cell">{points}</td>
      <td className="col-stat nrr-cell">{nrr}</td>

      <td className="col-form">
        <div className="form-guide-flex">
          {form.map((res, i) => (
            <span 
              key={i} 
              className={`form-badge form-${res.toLowerCase()}`}
              title={`Match: ${res}`}
            >
              {res}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}

export default function StandingsTable({ standings, onSelectTeam }) {
  return (
    <div className="standings-table-card">
      <div className="standings-header-bar">
        <div>
          <h3 className="section-title">BBL | 13 Official Points Table</h3>
          <p className="section-desc">Top 4 franchises qualify for the Big Bash Finals Series (Qualifier, Knockout, Challenger & Final)</p>
        </div>

        <div className="legend-strip">
          <span className="legend-item"><span className="legend-dot playoff-dot" /> Finals Bound (1-4)</span>
          <span className="legend-item"><span className="legend-dot elim-dot" /> Elimination Zone</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="bbl-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Franchise</th>
              <th>P</th>
              <th>W</th>
              <th>L</th>
              <th>NR</th>
              <th>PTS</th>
              <th>NRR</th>
              <th>Form (L5)</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((item) => (
              <StandingsRow 
                key={item.franchiseId} 
                standing={item} 
                onSelectTeam={onSelectTeam} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
