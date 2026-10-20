# Complete Tournament System Roadmap: BR Classic Esports
**Automatic Sequential Group Assignment, Partner Control Panel, Penalty & Disqualification Engine**

---

## 1. Executive Summary & Core Rules

This roadmap outlines the complete architecture for managing Battle Royale (BR) Classic tournaments from registration to the Grand Finale, including point reductions for penalties and disqualifications.

### Key Business Rules
1. **Automatic Sequential Group Assignment (FIFO - First In, First Out)**:
   - When teams register and pay, they are **automatically** placed into groups without manual partner intervention.
   - Rule example: 48 total teams, 12 teams per group, 4 groups (A, B, C, D):
     - Teams 1–12 ➔ **Group A** (Slots #1 to #12)
     - Teams 13–24 ➔ **Group B** (Slots #1 to #12)
     - Teams 25–36 ➔ **Group C** (Slots #1 to #12)
     - Teams 37–48 ➔ **Group D** (Slots #1 to #12)
2. **Automatic Registration Lock**:
   - When Team 48 registers, `remainingSlots = 0`.
   - The button instantly locks from **"Register Now"** to **"Registration Closed (Max Slots Reached)"**.
3. **Partner Control Panel (Full A-to-Z Control)**:
   - Partner defines tournament limits: Total Teams, Group Count, Teams per Group, **Matches per Group (e.g. 6, 8, 10, or custom)**, and Qualifiers to Grand Finale.
   - Partner schedules fixtures **one by one** up to the configured match limit (with custom Date, Time, and Map).
   - Partner inputs match scores (Placement points & Kill points). Points table recalculates automatically.
   - Partner clicks **"Promote Top 4 to Grand Finale"** with 1 click.
   - Partner declares **Winner, Runners-up & MVP**.
4. **Point Penalty Deduction Engine**:
   - Partner can penalize teams with point reductions for rule violations (late room join, banned weapon use, toxic chat, unofficial substitutes).
   - Formula: $\text{Total Points} = \max(0, \text{Placement Points} + \text{Kill Points} - \text{Penalty Points})$.
   - Points Table and Grand Finale standings display a dedicated **"Penalty"** column (`-X` in red).
5. **Disqualification (DQ) & Auto-Cascade Promotion Rule**:
   - Severe violations (emulators in mobile scrims, hacks/ESP, account ringing, no-shows) trigger a partner **Disqualification (DQ)**.
   - Disqualified teams receive rank `DQ`, points wiped to `0 (DQ)`, and their name is struck through with the DQ reason.
   - **Automated Promotion Cascade**: Disqualified teams are immediately excluded from qualification. If a top 4 team gets disqualified (e.g. Rank 2), the system **automatically cascades the qualification down**, promoting the next eligible non-disqualified team (Rank 5 steps up to the 4th qualifying slot!).

---

## 2. Player Experience & Automated Registration Flow

```
[ Player Visits Tournament Page ]
          │
          ▼
   Slots Available?
   ├── NO  ➔ Button says: "REGISTRATION CLOSED (48/48 Slots Full)"
   └── YES ➔ Button says: "REGISTER NOW (X Slots Left)"
          │
          ▼
[ Player Fills Roster & Pays Entry Fee ]
          │
          ▼
[ System Auto-Assigns Group & Slot ]
  • e.g. Registration #7  ➔ Assigned to Group A, Slot #7
  • e.g. Registration #15 ➔ Assigned to Group B, Slot #3
          │
          ▼
[ Success Screen & Button State Change ]
  • Button changes to: "REGISTERED"
  • Clicking "Registered" shows popup:
    "You have already registered: Team Alpha (Group A, Slot #7)"
  • Section below button reveals 4 Tournament Hub buttons:
    [ Fixtures ] [ Points Table ] [ Grand Finale ] [ Winner ]
```

---

## 3. Partner Control Panel UI (Screen-by-Screen)

### Screen 1: Tournament Setup & Rules Engine
Partner sets the foundation before registration opens:
| Setting Field | Example Input | Purpose |
| :--- | :--- | :--- |
| **Tournament Name** | Weekly Scrims S1 | Public title |
| **Game & Format** | Free Fire / Battle Royale Classic | Format type |
| **Total Slots** | `48` | Maximum teams allowed |
| **Number of Groups** | `4` | Auto-creates Groups A, B, C, D |
| **Teams per Group** | `12` | Fill threshold before moving to next group |
| **Matches per Group** | `10` *(or custom: e.g. 6, 8, 12)* | **Decided by Partner**: Exact number of matches each group will play |
| **Grand Finale Matches** | `5` *(or custom: e.g. 4, 6)* | **Decided by Partner**: Exact number of championship matches |
| **Top Qualifiers per Group** | `4` | Top 4 teams from each group move to Grand Finale (16 total) |
| **Entry Fee** | `₹150` per team | Entry fee |

---

### Screen 2: Real-Time Group Roster Monitor (Read-Only Live Feed)
Because group assignment is **fully automated**, the partner doesn't need to drag and drop teams. Instead, they get a live progress monitor:

- **Group A (12/12) - FULL**:
  - Slot 1: Team Alpha *(Registered at 10:02 AM)*
  - Slot 2: GodLike Esports *(10:05 AM)*
  - ... up to Slot 12
- **Group B (12/12) - FULL**:
  - Slot 1: Team XSpark *(10:45 AM)*
  - ... up to Slot 12
- **Group C (8/12) - FILLING...**:
  - Shows live slots filling up.
- **Group D (0/12) - WAITING**:
  - Will start filling automatically after Group C reaches 12 teams.

*(Emergency Admin Action: A partner can "Disqualify / Remove" a fake team, which automatically frees up that slot for the next registering team).*

---

### Screen 3: Fixture Scheduler (One-by-One Match Creation)
Partner schedules matches for each group individually, up to the configured **Matches per Group**:

1. **Select Group**: `[ Group A ]`
2. **Match Creator Form**:
   - **Match #**: Auto-fills `Match 1`, `Match 2`, etc., up to the partner's configured limit (e.g. 10 matches).
   - **Date & Time Picker**: `16 Nov 2026, 04:00 PM`
   - **Map Selector**: `Bermuda` | `Purgatory` | `Kalahari` | `Alpine`
   - Button: **`[+ Schedule Match]`**
3. **Fixtures Table**:
   - Shows all scheduled matches for Group A (bounded by the partner-defined match limit).
   - Partner can edit dates or delete matches anytime.
4. **Grand Finale Tab**:
   - Same interface to schedule the partner-defined number of Grand Finale championship matches (e.g. 5 matches).

---

### Screen 4: Scorekeeper & Live Points Table
When custom room matches finish, the partner inputs results match by match:

1. Select: **Group A ➔ Match 1**.
2. A clean entry table lists all 12 teams in Group A. **You directly input Placement Points and Kill Points** (no need to select ranks from dropdowns):

| Slot | Team Name | Placement Points (Input) | Kill Points (Input) | Penalty Pts (Optional) | Penalty Reason | Net Match Total |
| :---: | :--- | :---: | :---: | :---: | :--- | :---: |
| #1 | Team Alpha | `[ 12 ]` | `[ 8 ]` | `0` | - | **20** |
| #2 | GodLike Esports | `[ 9 ]` | `[ 5 ]` | `0` | - | **14** |
| #5 | Hydra Official | `[ 4 ]` | `[ 6 ]` | `[ 2 ]` | *Late room entry (-2)* | **8** *(10 - 2)* |
| #12 | Blind Esports | `[ 1 ]` | `[ 2 ]` | `0` | **[DQ Action]** | **0 (DQ)** |

> **Why Direct Placement Points?**
> Different tournaments use different point systems (e.g. Free Fire gives 12 pts for Booyah, BGMI gives 15 pts for WWCD, while scrims can use custom matrices). Entering placement points directly gives you 100% control without being locked into a fixed rank system.

3. Click **[Save Match Results]**.
4. **Automated Standings Recalculation**:
   - $\text{Total} = \max(0, \text{Placement} + \text{Kill} - \text{Penalties})$.
   - Top 4 non-disqualified teams in each group receive a green highlight: **"Qualifying for Grand Finale"**.
   - Disqualified teams receive a red **"DQ"** badge and are pushed to the bottom of the board.
   - Partner can toggle **`[Publish to Player View: ON/OFF]`**.

---

### Screen 4B: Partner Disciplinary Control (Penalties & DQ Modal)
Partners have instant disciplinary control over any team during the tournament:

1. **Issue Point Penalty**:
   - Partner clicks `[ - Penalty ]` on any team row.
   - Modal inputs:
     - **Team**: `Hydra Official`
     - **Match**: `Match 3` (or Tournament Global Penalty)
     - **Points to Deduct**: `2`
     - **Reason Tag**: `Late Lobby Join` | `Banned Weapon Use` | `Abusive In-Game Chat` | `Custom Reason`
   - Real-time impact: Leaderboard table instantly updates with `-2` under Penalty column and recalculates standings.

2. **Issue Disqualification (DQ)**:
   - Partner clicks `[ Disqualify Team ]`.
   - Confirmation Alert:
     - **Team**: `Blind Esports`
     - **Violation**: `Emulator detected in mobile scrims`
     - **Cascade Action**: "Points wiped to 0. Slot #4 in Group A will automatically cascade to Rank 5 (Hydra Official)."
   - Partner clicks **[Confirm Disqualification]**.

---

### Screen 5: 1-Click Grand Finale Promotion (with DQ Cascade)
When all group stage matches (e.g. 10 matches per group) are scored:
1. A banner prompts: **"Group Stage Completed. 16 Top Finalists Determined."**
2. **Auto-Cascade Logic**:
   - The query explicitly runs:
     ```sql
     SELECT * FROM group_standings 
     WHERE group_id = :groupId AND is_disqualified = FALSE 
     ORDER BY total_points DESC 
     LIMIT 4;
     ```
   - If a top-ranked team was disqualified, they are automatically bypassed, and the next eligible team takes the slot.
3. Partner clicks **`[Promote Top 4 Teams to Grand Finale]`**.
4. The system automatically populates the 16-team Grand Finale lobby and ties them to the Grand Finale fixtures!

---

### Screen 6: Winner & MVP Declaration Screen
After scoring the 5 Grand Finale matches:
1. The Grand Finale leaderboard ranks all 16 teams from 1st to 16th.
2. Partner fills the podium cards:
   - **Champion (1st Place)**: Selected Team (e.g. `Team Alpha`) | Prize: `₹5,000`
   - **Runner-Up (2nd Place)**: Selected Team (e.g. `GodLike Esports`) | Prize: `₹3,000`
   - **3rd Place (2nd Runner-Up)**: Selected Team (e.g. `Team XSpark`) | Prize: `₹1,500`
   - **Tournament MVP**: Select Player IGN (e.g. `Alpha_Sniper`) | Total Kills: `22` | Prize: `₹500`
3. Click **`[Publish Tournament Results & Hall of Fame]`**.
4. The player-facing website immediately unlocks the official Winner details!

---

## 4. Automatic Sequential Assignment Algorithm (Backend Logic)

### How the Registration Controller Assigns Groups:
```typescript
async function handleTeamRegistration(tournamentId: string, teamData: RegisterDto) {
  // 1. Run inside a database transaction to prevent race conditions
  return await db.$transaction(async (tx) => {
    // Count currently approved teams
    const currentCount = await tx.team.count({
      where: { tournamentId, paymentStatus: 'PAID' }
    });

    const tournament = await tx.tournament.findUnique({ where: { id: tournamentId } });

    // Check if tournament is completely full
    if (currentCount >= tournament.totalSlots) {
      throw new Error("Registration Closed: All tournament slots are full!");
    }

    // 2. Calculate Group and Slot automatically
    const teamsPerGroup = tournament.teamsPerGroup; // 12
    const groupIndex = Math.floor(currentCount / teamsPerGroup); // 0 = A, 1 = B, 2 = C, 3 = D
    const slotNumber = (currentCount % teamsPerGroup) + 1; // 1 to 12

    const groupNames = ['A', 'B', 'C', 'D'];
    const assignedGroupName = groupNames[groupIndex];

    const group = await tx.group.findFirst({
      where: { tournamentId, name: assignedGroupName }
    });

    // 3. Save Team with assigned Group & Slot
    const newTeam = await tx.team.create({
      data: {
        tournamentId,
        groupId: group.id,
        slotNumber,
        teamName: teamData.teamName,
        paymentStatus: 'PAID',
      }
    });

    // 4. Update Remaining Slots
    await tx.tournament.update({
      where: { id: tournamentId },
      data: { remainingSlots: tournament.totalSlots - (currentCount + 1) }
    });

    return {
      success: true,
      assignedGroup: assignedGroupName,
      assignedSlot: slotNumber,
    };
  });
}
```

---

## 5. Penalties & Disqualification Architecture & Cascade Engine

### A. Penalty Matrix (Standard Esports Rulebook)
| Severity Level | Infraction Type | Standard Penalty | System Behavior |
| :--- | :--- | :---: | :--- |
| **Minor** | Late lobby join (1–3 min after room timer) | `-1` to `-2` Points | Deducted from match total; displayed in red in Penalty column |
| **Minor** | Incorrect room slot occupancy | `-2` Points | Deducted from match total |
| **Medium** | Using banned weapons, attachments, or characters | `-3` to `-5` Points | Deducted from match total; warning logged |
| **Medium** | Toxic / abusive language in custom room chat | `-2` to `-5` Points | Deducted from team's overall score |
| **Critical** | Teaming up with another squad / passive collusion | **Disqualification (DQ)** | Total points wiped to 0; team forfeited |
| **Critical** | Emulator use in mobile-only tournaments | **Disqualification (DQ)** | Instant ban from event; slot cascaded |
| **Critical** | Third-party hacks (aimbot, ESP, wallhack, speed) | **Disqualification (DQ)** | Instant DQ + permanent player blacklist |
| **Critical** | Unregistered player ringing / account sharing | **Disqualification (DQ)** | Forfeiture of all matches played |
| **Critical** | Match no-show / forfeit without prior notice | **Disqualification (DQ)** | Removed from tournament standings |

---

### B. The Disqualification Cascade Algorithm
What happens when a top-performing team gets disqualified?
```
Group Stage Final Standings (Before DQ):
Rank 1: Team Alpha (126 pts) ➔ QUALIFIED
Rank 2: Blind Esports (116 pts) ➔ Caught using Emulator (DQ Issued)
Rank 3: Soul Army (104 pts) ➔ QUALIFIED
Rank 4: Entity Gaming (96 pts) ➔ QUALIFIED
------------------------------------------------------- (Cutoff Line)
Rank 5: Hydra Official (82 pts) ➔ ELIMINATED (Originally)

          ▼ [ Partner clicks "Disqualify Blind Esports" ]

Automated Cascade Reaction:
1. Blind Esports status updated to `is_disqualified = TRUE`.
2. Blind Esports points reset to `0 (DQ)`.
3. Standings query re-orders:
   Rank 1: Team Alpha (126 pts) ➔ QUALIFIED
   Rank 2: Soul Army (104 pts)  ➔ QUALIFIED (Moved up)
   Rank 3: Entity Gaming (96 pts) ➔ QUALIFIED (Moved up)
   Rank 4: Hydra Official (82 pts) ➔ QUALIFIED (AUTOMATICALLY PROMOTED!)
   ...
   Rank 12: Blind Esports (DQ - Emulators Prohibited)
```
**No manual recalculation is needed by the partner**: The database query selects `WHERE is_disqualified = FALSE ORDER BY total_points DESC LIMIT 4`. Hydra Official is automatically awarded the 4th ticket to the Grand Finale!

---

## 6. PostgreSQL Database Schema Overview

```sql
-- Tournaments Table
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  total_slots INT DEFAULT 48,
  remaining_slots INT DEFAULT 48,
  teams_per_group INT DEFAULT 12,
  matches_per_group INT DEFAULT 10, -- Decided by Partner (e.g. 6, 8, 10, 12)
  finale_matches INT DEFAULT 5,    -- Decided by Partner (e.g. 4, 5, 6)
  qualifiers_per_group INT DEFAULT 4,
  status VARCHAR(50) DEFAULT 'OPEN' -- 'OPEN', 'CLOSED', 'COMPLETED'
);

-- Groups Table (A, B, C, D)
CREATE TABLE tournament_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  group_name VARCHAR(10) NOT NULL -- 'Group A', 'Group B', etc.
);

-- Registered Teams Table (with Disqualification Flags)
CREATE TABLE tournament_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  group_id UUID REFERENCES tournament_groups(id),
  slot_number INT,
  team_name VARCHAR(255) NOT NULL,
  is_finalist BOOLEAN DEFAULT FALSE,
  is_disqualified BOOLEAN DEFAULT FALSE,
  disqualification_reason VARCHAR(255) DEFAULT NULL,
  disqualified_at TIMESTAMP DEFAULT NULL
);

-- Fixtures Table (Created one-by-one by Partner)
CREATE TABLE fixtures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  group_id UUID REFERENCES tournament_groups(id), -- NULL for Grand Finale
  stage VARCHAR(50) NOT NULL, -- 'GROUP' or 'GRAND_FINALE'
  match_number INT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  map_name VARCHAR(100) NOT NULL
);

-- Match Results Table (Direct Placement Points & Points Deductions per Match)
CREATE TABLE match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id UUID REFERENCES fixtures(id) ON DELETE CASCADE,
  team_id UUID REFERENCES tournament_teams(id) ON DELETE CASCADE,
  placement_points INT NOT NULL, -- Direct partner numeric input (e.g. 12, 9, 8...)
  kill_points INT NOT NULL,      -- Direct partner numeric input
  penalty_points INT DEFAULT 0,  -- Direct partner penalty input
  penalty_reason VARCHAR(255) DEFAULT NULL,
  placement_rank INT DEFAULT NULL, -- Optional/Auto-derived
  total_points INT GENERATED ALWAYS AS (GREATEST(0, placement_points + kill_points - penalty_points)) STORED
);

-- Disciplinary / Penalties Audit Log
CREATE TABLE tournament_penalties_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  team_id UUID REFERENCES tournament_teams(id) ON DELETE CASCADE,
  fixture_id UUID REFERENCES fixtures(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL, -- 'POINT_DEDUCTION' or 'DISQUALIFICATION'
  points_deducted INT DEFAULT 0,
  reason VARCHAR(255) NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Final Tournament Winners Table
CREATE TABLE tournament_winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id) UNIQUE,
  champion_team_id UUID REFERENCES tournament_teams(id),
  runner_up_team_id UUID REFERENCES tournament_teams(id),
  third_place_team_id UUID REFERENCES tournament_teams(id),
  mvp_player_name VARCHAR(255),
  mvp_kills INT,
  champion_prize VARCHAR(100),
  runner_up_prize VARCHAR(100)
);
```

---

## 7. Dynamic Standings & Finalist Selection Query (SQL)

```sql
-- 1. Compute Live Standings with Penalty Subtraction and DQ Handling
SELECT 
  tt.id AS team_id,
  tt.team_name,
  tt.slot_number,
  tt.is_disqualified,
  tt.disqualification_reason,
  COUNT(mr.id) AS matches_played,
  COALESCE(SUM(mr.placement_points), 0) AS placement_points,
  COALESCE(SUM(mr.kill_points), 0) AS kill_points,
  COALESCE(SUM(mr.penalty_points), 0) AS penalty_points,
  CASE 
    WHEN tt.is_disqualified THEN 0
    ELSE GREATEST(0, COALESCE(SUM(mr.placement_points), 0) + COALESCE(SUM(mr.kill_points), 0) - COALESCE(SUM(mr.penalty_points), 0))
  END AS total_points
FROM tournament_teams tt
LEFT JOIN match_results mr ON tt.id = mr.team_id
WHERE tt.group_id = :groupId
GROUP BY tt.id
ORDER BY tt.is_disqualified ASC, total_points DESC;

-- 2. Select Top Qualifiers (Skips Disqualified Teams Automatically)
SELECT tt.id, tt.team_name, SUM(mr.total_points) AS final_points
FROM tournament_teams tt
JOIN match_results mr ON tt.id = mr.team_id
WHERE tt.group_id = :groupId 
  AND tt.is_disqualified = FALSE
GROUP BY tt.id
ORDER BY final_points DESC
LIMIT 4;
```

---

## 8. Implementation Checklist for Future Development

- [ ] **Step 1: Database Setup**
  - Initialize PostgreSQL database.
  - Setup Prisma schema with the tables above including `is_disqualified`, `penalty_points`, and `tournament_penalties_log`.
  - Run database migrations (`npx prisma migrate dev`).

- [ ] **Step 2: Auto-Assignment Registration Endpoint**
  - Implement sequential FIFO slot allocation in `POST /api/tournaments/:id/register`.
  - Add lock checking: When slots reach 0, throw error "Registration Closed".

- [ ] **Step 3: Partner Fixtures Management**
  - `POST /api/partner/fixtures` (Add match one-by-one with Date & Map).
  - `GET /api/tournaments/:id/fixtures` (List group & grand finale matches).

- [ ] **Step 4: Partner Scoring & Penalty Engine**
  - `POST /api/partner/matches/:matchId/score` (Submit scores for 12 teams with optional penalty points & reason).
  - `POST /api/partner/tournaments/:id/penalties` (Directly deduct penalty points with reason).
  - Automated query: `GREATEST(0, Placement + Kill - Penalties)`.

- [ ] **Step 5: Disqualification & Auto-Cascade Handler**
  - `POST /api/partner/tournaments/:id/disqualify` (Flag team as `is_disqualified = TRUE`, wipe points to 0, log reason).
  - Standings engine automatically excludes disqualified teams from the top 4 qualification cutoff.

- [ ] **Step 6: Automated Grand Finale Promotion**
  - `POST /api/partner/tournaments/:id/promote-finalists` (Auto-flags top 4 non-disqualified teams in each group as `is_finalist = true`).

- [ ] **Step 7: Winner Declaration**
  - `POST /api/partner/tournaments/:id/declare-winner` (Saves champion, prizes, and MVP).
  - Connects to player-facing Winner popup modal with full standings table.

