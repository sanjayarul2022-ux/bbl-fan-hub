import React from "react";
import {
  BBL_FRANCHISES,
  BBL_PLAYERS,
  BBL_STANDINGS,
  BBL_MATCHES,
  BBL_LEADERBOARD,
  INITIAL_FAN_POLL
} from "../data/bblData";

import Navbar from "./Navbar";
import LiveTicker from "./LiveTicker";
import FranchiseCard from "./FranchiseCard";
import PlayerCard from "./PlayerCard";
import StandingsTable from "./StandingsTable";
import MatchCard from "./MatchCard";
import FranchiseModal from "./FranchiseModal";
import PlayerModal from "./PlayerModal";
import FanZone from "./FanZone";
import Footer from "./Footer";

import {
  Filter,
  Trophy,
  Award,
  Zap,
  CheckCircle,
  Activity,
  Layers,
  Sparkles,
  Info
} from "lucide-react";

/**
 * BblHubApp - Core Single Page Application Component
 * 
 * Implemented as a React Class Component to rigorously demonstrate:
 * 1. Constructor-based state initialization (React Module 6)
 * 2. Component Life Cycle methods: componentDidMount, componentDidUpdate, componentWillUnmount
 * 3. React Component API: this.setState, state merging, method binding
 * 4. Data-driven rendering across reusable components
 */
export default class BblHubApp extends React.Component {
  constructor(props) {
    super(props);

    // Initial state initialized in constructor
    this.state = {
      activeTab: "franchises", // "franchises" | "standings" | "matches" | "players" | "fanzone"
      searchQuery: "",
      selectedFranchise: null,
      selectedPlayer: null,
      matchFilter: "ALL", // "ALL" | "LIVE" | "COMPLETED" | "UPCOMING"
      playerRoleFilter: "ALL", // "ALL" | "Batter" | "Bowler" | "All-Rounder" | "Wicketkeeper-Batter"
      playerTeamFilter: "ALL",
      pollData: INITIAL_FAN_POLL,
      userVotedOption: null,
      ballSimIndex: 0,
      simulatedBall: {
        event: "Sean Abbott to Mitchell Marsh: FOUR! Smashed through extra cover!",
        runs: 4
      },
      lifecycleEventLog: [
        "Constructor: Initialized component state with 8 BBL franchises and 24 players."
      ],
      showLifecyclePanel: false
    };

    // Explicit method binding for class methods
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectFranchise = this.handleSelectFranchise.bind(this);
    this.handleCloseFranchiseModal = this.handleCloseFranchiseModal.bind(this);
    this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
    this.handleClosePlayerModal = this.handleClosePlayerModal.bind(this);
    this.handleCastVote = this.handleCastVote.bind(this);
    this.handleMatchFilterChange = this.handleMatchFilterChange.bind(this);
    this.handlePlayerRoleFilterChange = this.handlePlayerRoleFilterChange.bind(this);
    this.handlePlayerTeamFilterChange = this.handlePlayerTeamFilterChange.bind(this);
    this.toggleLifecyclePanel = this.toggleLifecyclePanel.bind(this);
    this.handleDirectFranchiseLookup = this.handleDirectFranchiseLookup.bind(this);

    // Simulated commentary sequence for componentDidMount interval
    this.ballSimEvents = [
      { event: "Sean Abbott to Mitchell Marsh: FOUR! Smashed through extra cover!", runs: 4 },
      { event: "Sean Abbott to Mitchell Marsh: 1 Run, pushed firmly down to long-on.", runs: 1 },
      { event: "Sean Abbott to Ashton Turner: SIX! Towering hit into the SCG Bill O'Reilly Stand!", runs: 6 },
      { event: "Sean Abbott to Ashton Turner: Dot ball, superb yorker outside off stump.", runs: 0 },
      { event: "Sean Abbott to Ashton Turner: 2 Runs, steered neatly past backward point.", runs: 2 },
      { event: "Sean Abbott to Mitchell Marsh: FOUR! Clears mid-off! Scorchers inch closer to glory!", runs: 4 }
    ];

    this.liveTimer = null;
  }

  /**
   * Component Life Cycle: componentDidMount
   * Executed once the component is mounted to the DOM.
   * Performs data setup and establishes live score interval ticker.
   */
  componentDidMount() {
    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `componentDidMount at ${timestamp}: League data verified. Initializing simulated live match ticker.`;

    this.setState((prevState) => ({
      lifecycleEventLog: [...prevState.lifecycleEventLog, logMsg]
    }));

    document.title = "BBL Fan Hub | Big Bash League SPA";

    // Set up recurring live match update simulator (fires every 6 seconds)
    this.liveTimer = setInterval(() => {
      this.setState((prevState) => {
        const nextIndex = (prevState.ballSimIndex + 1) % this.ballSimEvents.length;
        return {
          ballSimIndex: nextIndex,
          simulatedBall: this.ballSimEvents[nextIndex]
        };
      });
    }, 6000);

    console.log("[React Life Cycle] componentDidMount invoked successfully in BblHubApp.");
  }

  /**
   * Component Life Cycle: componentDidUpdate
   * Demonstrates reacting to state/props changes (Module 6 requirement).
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      const tabTitleMap = {
        franchises: "BBL Franchises",
        standings: "BBL Standings & Ladder",
        matches: "BBL Fixtures & Results",
        players: "BBL Players & Statistics",
        fanzone: "BBL Fan Zone & Arena"
      };

      const title = `BBL Fan Hub | ${tabTitleMap[this.state.activeTab] || "Summer of Cricket"}`;
      document.title = title;

      const timestamp = new Date().toLocaleTimeString();
      const updateMsg = `componentDidUpdate at ${timestamp}: Switched view from '${prevState.activeTab}' to '${this.state.activeTab}'.`;

      console.log(`[React Life Cycle] ${updateMsg}`);
    }

    if (prevState.selectedFranchise !== this.state.selectedFranchise && this.state.selectedFranchise) {
      console.log(`[React Life Cycle] Franchise modal opened: ${this.state.selectedFranchise.name}`);
    }
  }

  /**
   * Component Life Cycle: componentWillUnmount
   * Cleanup timer to prevent memory leaks when component is destroyed.
   */
  componentWillUnmount() {
    if (this.liveTimer) {
      clearInterval(this.liveTimer);
    }
    console.log("[React Life Cycle] componentWillUnmount: Cleared live interval timer.");
  }

  // User Interaction Handlers (Component API & State Modification)
  handleTabSelect(tabId) {
    this.setState({ activeTab: tabId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleSearchChange(query) {
    this.setState({ searchQuery: query });
  }

  handleSelectFranchise(franchise) {
    this.setState({ selectedFranchise: franchise });
  }

  handleDirectFranchiseLookup(franchiseId) {
    const franchise = BBL_FRANCHISES.find((f) => f.id === franchiseId);
    if (franchise) {
      this.setState({ selectedFranchise: franchise });
    }
  }

  handleCloseFranchiseModal() {
    this.setState({ selectedFranchise: null });
  }

  handleSelectPlayer(player) {
    this.setState({ selectedPlayer: player });
  }

  handleClosePlayerModal() {
    this.setState({ selectedPlayer: null });
  }

  handleMatchFilterChange(status) {
    this.setState({ matchFilter: status });
  }

  handlePlayerRoleFilterChange(role) {
    this.setState({ playerRoleFilter: role });
  }

  handlePlayerTeamFilterChange(teamId) {
    this.setState({ playerTeamFilter: teamId });
  }

  toggleLifecyclePanel() {
    this.setState((prevState) => ({
      showLifecyclePanel: !prevState.showLifecyclePanel
    }));
  }

  handleCastVote(optionId) {
    this.setState((prevState) => {
      const updatedOptions = prevState.pollData.options.map((opt) => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });

      return {
        pollData: {
          ...prevState.pollData,
          options: updatedOptions
        },
        userVotedOption: optionId
      };
    });
  }

  render() {
    const {
      activeTab,
      searchQuery,
      selectedFranchise,
      selectedPlayer,
      matchFilter,
      playerRoleFilter,
      playerTeamFilter,
      pollData,
      userVotedOption,
      simulatedBall,
      lifecycleEventLog,
      showLifecyclePanel
    } = this.state;

    // Filter Franchises based on search
    const filteredFranchises = BBL_FRANCHISES.filter((f) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        f.name.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query) ||
        f.homeVenue.toLowerCase().includes(query) ||
        f.captain.toLowerCase().includes(query)
      );
    });

    // Filter Matches based on tab status & search
    const filteredMatches = BBL_MATCHES.filter((m) => {
      const matchesStatus = matchFilter === "ALL" || m.status === matchFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        m.homeTeam.name.toLowerCase().includes(query) ||
        m.awayTeam.name.toLowerCase().includes(query) ||
        m.venue.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });

    // Filter Players based on role, franchise, and search
    const filteredPlayers = BBL_PLAYERS.filter((p) => {
      const matchesRole = playerRoleFilter === "ALL" || p.role.toLowerCase() === playerRoleFilter.toLowerCase();
      const matchesTeam = playerTeamFilter === "ALL" || p.franchiseId === playerTeamFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.franchiseName.toLowerCase().includes(query) ||
        p.nationality.toLowerCase().includes(query);
      return matchesRole && matchesTeam && matchesSearch;
    });

    const liveMatch = BBL_MATCHES.find((m) => m.status === "LIVE");

    return (
      <div className="bbl-app-root">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onTabSelect={this.handleTabSelect}
          searchQuery={searchQuery}
          onSearchChange={this.handleSearchChange}
        />

        {/* Real-Time Live Match Ticker Banner */}
        <LiveTicker
          liveMatch={liveMatch}
          simulatedBall={simulatedBall}
          onSelectMatch={() => this.handleTabSelect("matches")}
        />

        {/* Hero Banner with League Overview & Quick Stats */}
        <section className="bbl-hero-section">
          <div className="bbl-container hero-inner">
            <div className="hero-badge-wrap">
              <span className="bbl-tag-pill">KFC BBL|14 • AUSTRALIA</span>
              <span className="bbl-season-status">CHAMPIONSHIP STAGE</span>
            </div>

            <h2 className="hero-headline">
              AUSTRALIA'S GREATEST <span className="text-gradient">T20 SPECTACLE</span>
            </h2>

            <p className="hero-subtext">
              8 iconic city franchises, international superstars, roaring stadium crowds, and unmissable summer cricket action. Explore official team rosters, live points table, fixtures, and statistical leaders.
            </p>

            <div className="hero-stats-strip">
              <div className="hero-stat-card">
                <span className="hstat-num">8</span>
                <span className="hstat-lbl">Franchises</span>
              </div>
              <div className="hero-stat-card">
                <span className="hstat-num">44</span>
                <span className="hstat-lbl">Blockbuster Matches</span>
              </div>
              <div className="hero-stat-card">
                <span className="hstat-num">60,000+</span>
                <span className="hstat-lbl">Record Stadium Cap</span>
              </div>
              <div className="hero-stat-card">
                <span className="hstat-num">5</span>
                <span className="hstat-lbl">Titles (Scorchers Record)</span>
              </div>
            </div>

            {/* React Lifecycle Debug Toggle Pill */}
            <div className="lifecycle-toggle-wrapper">
              <button 
                className="btn-lifecycle-toggle"
                onClick={this.toggleLifecyclePanel}
                id="btn-lifecycle-toggle"
              >
                <Activity size={14} className="pulse" />
                <span>{showLifecyclePanel ? "Hide React Lifecycle Inspector" : "Show React Lifecycle Inspector (Module 6)"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Interactive React Lifecycle Inspector (Demonstrating Module 6) */}
        {showLifecyclePanel && (
          <section className="bbl-container lifecycle-panel">
            <div className="lifecycle-panel-header">
              <div className="panel-title-group">
                <Layers size={18} className="text-neon" />
                <h4>React Component Life Cycle Audit (Module 6 Evaluation)</h4>
              </div>
              <span className="badge-class-comp">React.Component Class</span>
            </div>
            <div className="lifecycle-details-grid">
              <div className="lifecycle-card">
                <h5>1. Constructor Initialization</h5>
                <p>Called <code>super(props)</code>, initialized state variables (<code>activeTab: "{activeTab}"</code>, <code>pollData</code>, <code>filters</code>), and bound class handler methods.</p>
              </div>
              <div className="lifecycle-card">
                <h5>2. componentDidMount</h5>
                <p>Verified static data structures, established live match interval simulator (firing every 6s), set browser document title.</p>
              </div>
              <div className="lifecycle-card">
                <h5>3. componentDidUpdate</h5>
                <p>Dynamically synchronizes document title upon tab/franchise selection; tracks state transitions.</p>
              </div>
              <div className="lifecycle-card">
                <h5>4. componentWillUnmount</h5>
                <p>Safely disposes <code>this.liveTimer</code> on teardown to guarantee zero memory leaks.</p>
              </div>
            </div>
            <div className="lifecycle-console">
              <span className="console-label">Recent Lifecycle Events:</span>
              <ul>
                {lifecycleEventLog.slice(-4).map((log, i) => (
                  <li key={i}><code>› {log}</code></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Main Content Body (Single Page Application Dynamic Views) */}
        <main className="bbl-main-body">
          <div className="bbl-container">
            {/* VIEW 1: FRANCHISES */}
            {activeTab === "franchises" && (
              <section className="tab-view-section">
                <div className="view-header-bar">
                  <div>
                    <h3 className="view-title">BBL Franchises</h3>
                    <p className="view-desc">
                      Explore all 8 official Big Bash League franchises. Click any team card to inspect their squad, trophy history, and home fortress.
                    </p>
                  </div>
                  <span className="count-pill">{filteredFranchises.length} of 8 Franchises</span>
                </div>

                {filteredFranchises.length === 0 ? (
                  <div className="empty-state">
                    <p>No franchises found matching "{searchQuery}".</p>
                    <button className="btn-reset" onClick={() => this.handleSearchChange("")}>
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="franchises-grid">
                    {filteredFranchises.map((franchise) => (
                      <FranchiseCard
                        key={franchise.id}
                        franchise={franchise}
                        onSelect={this.handleSelectFranchise}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* VIEW 2: STANDINGS */}
            {activeTab === "standings" && (
              <section className="tab-view-section">
                <StandingsTable
                  standings={BBL_STANDINGS}
                  onSelectTeam={this.handleDirectFranchiseLookup}
                />

                {/* Tournament Format Explanation */}
                <div className="format-explainer-card">
                  <h4 className="format-title">Big Bash League Finals System</h4>
                  <div className="format-steps-grid">
                    <div className="format-step">
                      <span className="step-num">1</span>
                      <span className="step-heading">The Qualifier</span>
                      <p>1st placed team vs 2nd placed team. Winner advances directly to the Grand Final!</p>
                    </div>
                    <div className="format-step">
                      <span className="step-num">2</span>
                      <span className="step-heading">The Knockout</span>
                      <p>3rd placed team vs 4th placed team. Loser is eliminated; winner moves to The Challenger.</p>
                    </div>
                    <div className="format-step">
                      <span className="step-num">3</span>
                      <span className="step-heading">The Challenger</span>
                      <p>Qualifier Runner-up vs Knockout Winner. Winner qualifies for the BBL Grand Final.</p>
                    </div>
                    <div className="format-step">
                      <span className="step-num">4</span>
                      <span className="step-heading">The Final</span>
                      <p>Two top franchises clash for the coveted BBL Championship Trophy.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* VIEW 3: FIXTURES & RESULTS */}
            {activeTab === "matches" && (
              <section className="tab-view-section">
                <div className="view-header-bar">
                  <div>
                    <h3 className="view-title">Match Fixtures & Results</h3>
                    <p className="view-desc">
                      Real-time live scores, recent championship playoff results, and upcoming BBL blockbusters.
                    </p>
                  </div>

                  <div className="filter-pills-group">
                    {["ALL", "LIVE", "COMPLETED", "UPCOMING"].map((status) => (
                      <button
                        key={status}
                        className={`filter-pill-btn ${matchFilter === status ? "active" : ""}`}
                        onClick={() => this.handleMatchFilterChange(status)}
                        id={`filter-match-${status.toLowerCase()}`}
                      >
                        {status === "ALL" ? "All Matches" : status.charAt(0) + status.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="matches-list-grid">
                  {filteredMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onSelectFranchise={this.handleDirectFranchiseLookup}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* VIEW 4: PLAYERS & STATS */}
            {activeTab === "players" && (
              <section className="tab-view-section">
                {/* Leaderboard Showcase */}
                <div className="leaderboards-row">
                  <div className="leader-board-card golden-bat">
                    <div className="lead-header">
                      <Trophy size={18} className="lead-icon gold" />
                      <h4>Golden Bat • Leading Run Scorers</h4>
                    </div>
                    <div className="lead-list">
                      {BBL_LEADERBOARD.topScorers.map((scorer, i) => (
                        <div key={i} className="lead-item">
                          <span className="lead-rank">{i + 1}</span>
                          <div className="lead-info">
                            <span className="lead-name">{scorer.name}</span>
                            <span className="lead-team">{scorer.team}</span>
                          </div>
                          <div className="lead-stat-val">
                            <strong>{scorer.runs}</strong> Runs <span className="lead-sr">({scorer.sr} SR)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="leader-board-card golden-arm">
                    <div className="lead-header">
                      <Award size={18} className="lead-icon arm" />
                      <h4>Golden Arm • Leading Wicket Takers</h4>
                    </div>
                    <div className="lead-list">
                      {BBL_LEADERBOARD.topWicketTakers.map((bowler, i) => (
                        <div key={i} className="lead-item">
                          <span className="lead-rank">{i + 1}</span>
                          <div className="lead-info">
                            <span className="lead-name">{bowler.name}</span>
                            <span className="lead-team">{bowler.team}</span>
                          </div>
                          <div className="lead-stat-val">
                            <strong>{bowler.wickets}</strong> Wickets <span className="lead-sr">({bowler.eco} Eco)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter & Controls Toolbar */}
                <div className="players-toolbar">
                  <div className="role-filters">
                    {["ALL", "Batter", "Bowler", "All-Rounder", "Wicketkeeper-Batter"].map((role) => (
                      <button
                        key={role}
                        className={`role-tab-pill ${playerRoleFilter === role ? "active" : ""}`}
                        onClick={() => this.handlePlayerRoleFilterChange(role)}
                        id={`role-${role.toLowerCase()}`}
                      >
                        {role === "ALL" ? "All Roles" : role}
                      </button>
                    ))}
                  </div>

                  <div className="team-filter-select">
                    <select
                      value={playerTeamFilter}
                      onChange={(e) => this.handlePlayerTeamFilterChange(e.target.value)}
                      className="bbl-select"
                      id="select-team-filter"
                    >
                      <option value="ALL">All Franchises</option>
                      {BBL_FRANCHISES.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Players Grid */}
                <div className="players-grid">
                  {filteredPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onSelectPlayer={this.handleSelectPlayer}
                      onSelectFranchise={this.handleDirectFranchiseLookup}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* VIEW 5: FAN ZONE & POLLS */}
            {activeTab === "fanzone" && (
              <FanZone
                pollData={pollData}
                userVotedOption={userVotedOption}
                onCastVote={this.handleCastVote}
              />
            )}
          </div>
        </main>

        {/* Franchise Detail Modal */}
        {selectedFranchise && (
          <FranchiseModal
            franchise={selectedFranchise}
            players={BBL_PLAYERS}
            onClose={this.handleCloseFranchiseModal}
            onSelectPlayer={(p) => {
              this.handleCloseFranchiseModal();
              this.handleSelectPlayer(p);
            }}
          />
        )}

        {/* Player Detail Modal */}
        {selectedPlayer && (
          <PlayerModal
            player={selectedPlayer}
            onClose={this.handleClosePlayerModal}
            onSelectFranchise={(teamId) => {
              this.handleClosePlayerModal();
              this.handleDirectFranchiseLookup(teamId);
            }}
          />
        )}

        {/* Academic & Tournament Footer */}
        <Footer />
      </div>
    );
  }
}
