# BCSE203E – Web Programming
## Assignment – 8 (10 Marks)
### Design and Development of a ReactJS-Based BBL Fan Hub

---

## 📋 Student & Course Submission Information

| Field | Submission Details |
| :--- | :--- |
| **Student Name** | *[Enter Your Name Here]* |
| **Registration Number** | *[Enter Your Reg No, e.g. 23BCE0000]* |
| **Course Code & Title** | **BCSE203E – Web Programming** |
| **Assignment Number** | **Assignment – 8 (Module 6: ReactJS)** |
| **Faculty Name** | **Prof. Nihaal Ahmed.K** |
| **Slot** | **L31 + L32 + L51 + L52** |
| **Date of Submission** | September 19, 2026 |
| **Public GitHub Repository** | `https://github.com/[your-username]/bbl-fan-hub` *(Replace with your GitHub repository URL)* |

---

## 1. Assignment Question

> **Design and Development of a ReactJS-Based BBL Fan Hub**
> 
> The Big Bash League (BBL) is a professional T20 cricket league featuring multiple city-based franchises. A digital platform is required to provide cricket fans with a unified interface through which they can explore important information related to the league, including franchises, players, standings, matches, venues, and statistics.
> 
> Design and develop a complete, responsive, and interactive Single Page Application using ReactJS for a BBL Fan Hub. The application shall present relevant BBL information through a professionally designed interface and allow users to explore different sections and dynamically view the corresponding information without navigating to separate HTML webpages.
> 
> The application shall be developed using the ReactJS concepts covered in Module 6, including React Environment Setup, ReactJS Basics, JSX, React Components, React Component API, React Component Life Cycle, Constructors, and React Developer Tools.

---

## 2. Project Architecture & Component Hierarchy

### A. Folder & File Structure
```
bbl-fan-hub/
├── index.html                  # HTML5 entry with Google Fonts (Outfit & Inter) and SEO tags
├── vite.config.js              # Vite configuration
├── package.json                # Project dependencies & build scripts
├── public/
│   └── favicon.svg             # BBL branded vector icon
└── src/
    ├── main.jsx                # React root mount point (createRoot)
    ├── App.jsx                 # App root wrapper
    ├── index.css               # Comprehensive BBL dark-stadium aesthetic & design system
    ├── data/
    │   └── bblData.js          # Normalized static data structures (8 teams, 24 players, standings, matches)
    └── components/
        ├── BblHubApp.jsx       # MASTER CLASS COMPONENT (Constructor, Lifecycle, Component API)
        ├── Navbar.jsx          # Header navigation bar with search & active tab indicator
        ├── LiveTicker.jsx      # Ball-by-ball simulated live score marquee
        ├── FranchiseCard.jsx   # Reusable franchise card with logo, stats, and explore CTA
        ├── FranchiseModal.jsx  # Dynamic modal displaying full squad, stadium, and honors
        ├── StandingsTable.jsx  # Reusable points table with StandingsRow & form guide
        ├── MatchCard.jsx       # Reusable fixture & result card (LIVE/COMPLETED/UPCOMING)
        ├── PlayerCard.jsx      # Reusable player card with role badge and batting/bowling style
        ├── PlayerModal.jsx     # Career stats modal with aggression rating gauge
        ├── FanZone.jsx         # Interactive fan poll voting, live cheer wall & trivia quiz
        └── Footer.jsx          # Academic attribution, faculty details, and DevTools inspection
```

### B. React Developer Tools Component Hierarchy Tree

```
<App>
 └── <BblHubApp> (Class Component: Constructor, Lifecycle Methods, this.state)
      ├── <Navbar>
      │    ├── #bbl-global-search (Interactive input)
      │    └── #tab-franchises | #tab-standings | #tab-matches | #tab-players | #tab-fanzone
      ├── <LiveTicker> (Simulated ball-by-ball commentary via componentDidMount timer)
      ├── <section className="bbl-hero-section">
      │    └── <button id="btn-lifecycle-toggle"> (React Life Cycle Inspector)
      ├── <main className="bbl-main-body">
      │    ├── [View 1: Franchises]
      │    │    └── <FranchiseCard> (x8 Reusable Cards: Perth Scorchers, Sydney Sixers, etc.)
      │    ├── [View 2: Standings]
      │    │    └── <StandingsTable>
      │    │         └── <StandingsRow> (x8 Reusable Rows with Form Guide & Playoff Q Badges)
      │    ├── [View 3: Fixtures & Results]
      │    │    └── <MatchCard> (x6 Reusable Cards with Status Filtering: LIVE, COMPLETED, UPCOMING)
      │    ├── [View 4: Players & Statistics]
      │    │    ├── <LeaderboardCard> (Golden Bat & Golden Arm Leading Scorers/Bowlers)
      │    │    └── <PlayerCard> (x24 Reusable Player Cards with Role Filtering)
      │    └── [View 5: Fan Zone & Polls]
      │         └── <FanZone> (Interactive Fan Poll, Cheer Wall, Trivia Quiz)
      ├── <FranchiseModal> (Conditional Overlay upon franchise selection)
      ├── <PlayerModal> (Conditional Overlay upon player selection)
      └── <Footer> (Academic & Technical Submission details)
```

---

## 3. Implementation of Module 6 ReactJS Concepts

### 1. React Environment Setup & JSX
- Configured using **Vite 6** + **React 18** providing zero-overhead ES module bundling and fast Hot Module Replacement (HMR).
- Standard declarative JSX syntax used throughout for rendering dynamic cricket data, mapping arrays into keys, and expressing stateful conditional logic.

### 2. Constructor-Based Initialization (`BblHubApp.jsx`)
As required by the assignment guidelines, the core hub is implemented as a React Class Component utilizing a formal constructor:
```javascript
constructor(props) {
  super(props);
  this.state = {
    activeTab: "franchises",
    searchQuery: "",
    selectedFranchise: null,
    selectedPlayer: null,
    matchFilter: "ALL",
    playerRoleFilter: "ALL",
    playerTeamFilter: "ALL",
    pollData: INITIAL_FAN_POLL,
    userVotedOption: null,
    ballSimIndex: 0,
    simulatedBall: { ... },
    lifecycleEventLog: [...]
  };

  // Explicit method binding for class event handlers
  this.handleTabSelect = this.handleTabSelect.bind(this);
  this.handleSearchChange = this.handleSearchChange.bind(this);
  this.handleSelectFranchise = this.handleSelectFranchise.bind(this);
  this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
  this.handleCastVote = this.handleCastVote.bind(this);
  // ...
}
```

### 3. Component Life Cycle Methods
The application rigorously implements three key React component life cycle methods:

1. **`componentDidMount()` (Mounting Phase)**:
   - Sets up initial document titles.
   - Verifies loaded static data.
   - Demonstrates asynchronous timer initialization: runs a simulated live ball-by-ball match feed interval that updates scores and commentary every 6 seconds without blocking the UI.
   - Logs lifecycle milestones to both the browser console and the interactive on-screen Lifecycle Inspector panel.

2. **`componentDidUpdate(prevProps, prevState)` (Updating Phase)**:
   - Detects active tab transitions (`prevState.activeTab !== this.state.activeTab`) and dynamically synchronizes `document.title` (e.g. `BBL Fan Hub | BBL Standings & Ladder`).
   - Tracks modal state changes when users drill into specific franchise rosters.

3. **`componentWillUnmount()` (Unmounting / Cleanup Phase)**:
   - Invokes `clearInterval(this.liveTimer)` to safely destroy the recurring interval, preventing memory leaks and orphaned callbacks.

### 4. Component API & State Management
- Utilizes `this.setState((prevState) => ({ ... }))` ensuring deterministic functional state updates.
- Centralized state management in `BblHubApp` allows seamless bi-directional interactions: clicking a franchise tag on a `PlayerCard` or clicking a team row in `StandingsTable` automatically routes the user to that franchise's detail view.

### 5. Reusable Presentation Components
- **`FranchiseCard`**: Renders team badge, trophy cabinet, stadium capacity, captain/coach, and win-rate progress bar across all 8 franchises.
- **`StandingsRow`**: Standardized tabular row rendering ranking, points, net run rate, and last-5 form indicators (W/L/NR).
- **`MatchCard`**: Multi-state card displaying live scorecards, completed match summaries with Player of the Match, or upcoming match countdowns.
- **`PlayerCard`**: Standardized profile card with role badges (Batter, Bowler, All-Rounder, Wicketkeeper), country of origin, and 4-metric statistics matrix.

---

## 4. Higher-Order Thinking Skills (HOTS) Analysis & Design Justification

### Prompt:
> *Suppose the BBL Fan Hub is expanded from a single-season application to support multiple BBL seasons, additional franchises, players, matches, historical standings, and statistics. Analyze how your component design would affect code reusability, duplication, scalability, and maintainability.*
> 
> *Identify two important component-design decisions made in your application and justify how they would remain useful as the application grows.*

### Comprehensive Analysis

#### 1. Impact on Code Reusability and Duplication
In our architecture, presentational components (`StandingsTable`, `StandingsRow`, `MatchCard`, `PlayerCard`, `FranchiseCard`) are completely **decoupled from static hardcoded data**. They operate as pure functions of the props passed to them.
- When expanding to multiple seasons (e.g., BBL|10 through BBL|14), **zero new card or table components need to be authored**.
- A season selector dropdown in the navbar can simply pass the filtered season slice (`seasonStandings`, `seasonMatches`, `seasonRosters`) into the exact same components.
- This adheres strictly to the DRY (Don't Repeat Yourself) principle, eliminating visual and functional duplication across seasons.

#### 2. Scalability and Maintainability
- **Data Normalization**: Data is indexed by unique IDs (`perth-scorchers`, `p1`, `m-comp-01`). When historical archives with hundreds of matches and dozens of historical franchises (e.g., past iterations or international teams) are introduced, the normalized structure allows $O(1)$ lookups.
- **Single Source of State**: The top-level class component acts as the orchestrator. If the data source transitions from static JS arrays to an external REST/GraphQL API with pagination or infinite scrolling, **only the data-fetching layer in `componentDidMount()` changes**. All child components remain 100% untouched.

#### 3. Two Critical Component-Design Decisions & Justification

##### Decision 1: Normalized Schema-Driven Component Contracts (Generic Card & Table Schemas)
- **Design Choice**: Rather than embedding team-specific or season-specific markup, components like `MatchCard` accept a standardized schema:
  `{ id, status, homeTeam, awayTeam, venue, date, resultSummary, liveInfo }`.
- **Justification for Growth**: When new franchises join the league or tournament formats evolve (e.g., introduction of additional playoff stages or a 10-team expansion), the presentation layer does not require modification. The component dynamically adjusts based on the `status` flag (`LIVE`, `COMPLETED`, `UPCOMING`). As the application scales across 10+ historical seasons, this decision prevents technical debt and ensures backward compatibility with archived tournament formats.

##### Decision 2: Centralized Container/Presenter Architecture with Lifecycle-Controlled Interval Services
- **Design Choice**: We isolated all state mutations, method bindings, and lifecycle hooks inside the container component `BblHubApp`, while rendering leaf nodes as lightweight presentation components. The live ticker interval is managed strictly through lifecycle hooks (`componentDidMount` and `componentWillUnmount`).
- **Justification for Growth**: In a multi-season enterprise application, live simulation intervals must be suspended when viewing archived seasons (e.g., reviewing BBL|08 matches from 2018), and re-activated only when viewing the current live season. Because the lifecycle timer is cleanly encapsulated with teardown logic in `componentWillUnmount()`, expanding the application to multi-tab multi-season routing guarantees that memory leaks, background interval conflicts, and redundant CPU overhead are completely avoided.

---

## 5. Application Views & Interaction Walkthrough (Screenshots Guide)

*Note: Run `npm run dev` at `http://localhost:5173/` and take screenshots of each of the following sections to include in your final PDF:*

### View 1: Franchises Exploration Hub
- Displays all 8 official BBL teams (Perth Scorchers, Sydney Sixers, Brisbane Heat, Adelaide Strikers, Melbourne Stars, Melbourne Renegades, Hobart Hurricanes, Sydney Thunder).
- Each card shows team colors, championship count, captain, coach, home stadium capacity, and all-time win rate.
- Interactive search bar filters teams in real-time.

### View 2: Interactive Franchise Modal (Drill-down)
- Clicking "View Squad & Franchise Hub" on any card opens an interactive modal with full franchise history, anthem, stadium specifications, and key squad members.
- Clicking any squad member inside the modal seamlessly cross-navigates to their career statistics.

### View 3: Official BBL Standings & Ladder
- Complete points table with Positions (1 to 8), P, W, L, NR, Points, and Net Run Rate (NRR).
- Visual qualification indicators (Top 4 marked for Finals series).
- Form guide displaying last 5 matches (`W`, `L`, `NR`) in color-coded pills.
- BBL Finals system explainer card outlining the Qualifier, Knockout, Challenger, and Grand Final rules.

### View 4: Match Fixtures & Results
- Filter tabs: **All Matches**, **LIVE**, **Completed**, and **Upcoming**.
- Live match card featuring live over-by-over score, runs required, required run rate, and current batsmen.
- Completed match cards showing Player of the Match and victory margins.

### View 5: Players Roster & Statistical Leaderboards
- Golden Bat (Leading Run Scorers) and Golden Arm (Leading Wicket Takers) top-tier cards.
- Filter players by Role: All, Batter, Bowler, All-Rounder, Wicketkeeper-Batter.
- Filter by Franchise dropdown.
- Clicking any player card launches the **Player Career Modal** featuring career matches, runs, average, strike rate, wickets, and an aggression rating gauge.

### View 6: Fan Zone & Interactive Arena
- **Official Fan Poll**: Real-time vote casting with immediate percentage calculation and progress animation.
- **BBL Trivia Challenge**: Interactive question with instant feedback and correct answer explanations.
- **Franchise Cheer Wall**: Live click-to-cheer buttons that increment crowd support counters.

### View 7: React Life Cycle Inspector (Evaluation Panel)
- Toggled via the "Show React Lifecycle Inspector" button in the hero banner.
- Demonstrates `constructor` initialization, `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` with live event log timestamps.

---

## 6. Verification and How to Run Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Steps to Run
```bash
# 1. Navigate to the project directory
cd c:\Users\LENOVO\.gemini\antigravity-ide\scratch\bbl-fan-hub

# 2. Install dependencies
npm install

# 3. Launch the development server
npm run dev
```
Open your browser at: **`http://localhost:5173/`**

### Building for Production
```bash
npm run build
```
*(Build output is compiled into `/dist` with zero errors.)*

---

## 7. GitHub Repository Submission Instructions

As stated in the assignment guidelines:
> *"Source code shall not be included in the PDF. The complete ReactJS project and source code must be uploaded to a Public GitHub Repository."*

Follow these quick commands to publish the code to your GitHub account:

```bash
# 1. Open terminal inside the project directory
cd c:\Users\LENOVO\.gemini\antigravity-ide\scratch\bbl-fan-hub

# 2. Add your GitHub repository remote
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/bbl-fan-hub.git

# 3. Rename branch to main (if needed)
git branch -M main

# 4. Push code to your public GitHub repository
git push -u origin main
```
*Verify the repository link in an incognito/private browser window to ensure it is public before submitting the PDF.*
