export interface GroupTeam {
  id: string;
  slotNumber: number;
  teamName: string;
  isUserTeam?: boolean;
}

export interface GroupMatch {
  matchNumber: number;
  matchDate: string;
}

export interface PointsTableEntry {
  rank: number | string;
  teamName: string;
  isUserTeam?: boolean;
  matchesPlayed: number;
  placementPoints: number;
  killPoints: number;
  penaltyPoints?: number;
  totalPoints: number;
  qualified?: boolean;
  isDisqualified?: boolean;
  disqualificationReason?: string;
}

export interface GroupData {
  groupId: 'A' | 'B' | 'C' | 'D';
  groupName: string;
  totalTeams: number;
  isUserGroup?: boolean;
  teams: GroupTeam[];
  matches: GroupMatch[]; // 10 matches per group
  pointsTable: PointsTableEntry[];
}

export interface GrandFinaleTeam {
  rank: number;
  teamName: string;
  qualifiedFrom: string;
  matchDate: string;
  isUserTeam?: boolean;
}

export interface WinnerDetails {
  tournamentTitle: string;
  game: string;
  format: string;
  champion: {
    teamName: string;
    logo?: string;
    prizeMoney: string;
    wwcdCount: number;
    totalKills: number;
    totalPoints: number;
    isUserTeam?: boolean;
    roster: {
      igl: string;
      assaulter: string;
      sniper: string;
      support: string;
    };
  };
  runnerUp: {
    teamName: string;
    prizeMoney: string;
    totalPoints: number;
    totalKills: number;
  };
  secondRunnerUp: {
    teamName: string;
    prizeMoney: string;
    totalPoints: number;
    totalKills: number;
  };
  mvp: {
    playerName: string;
    teamName: string;
    kills: number;
    damage: string;
    kdRatio: number;
    prizeMoney: string;
  };
  finaleStandings: {
    rank: number | string;
    teamName: string;
    matchesPlayed: number;
    placementPoints: number;
    killPoints: number;
    penaltyPoints?: number;
    totalPoints: number;
    isDisqualified?: boolean;
    disqualificationReason?: string;
    prize?: string;
  }[];
}

// 48 Teams across 4 groups:
// Group A: 12 teams (Team Alpha is here)
// Group B: 13 teams
// Group C: 12 teams
// Group D: 11 teams
// Matches: 10 matches scheduled for each group

export const BR_CLASSIC_GROUPS: GroupData[] = [
  {
    groupId: 'A',
    groupName: 'Group A',
    totalTeams: 12,
    isUserGroup: true,
    teams: [
      { id: 'ga-1', slotNumber: 1, teamName: 'Team Alpha', isUserTeam: true },
      { id: 'ga-2', slotNumber: 2, teamName: 'GodLike Esports' },
      { id: 'ga-3', slotNumber: 3, teamName: 'Soul Army' },
      { id: 'ga-4', slotNumber: 4, teamName: 'Entity Gaming' },
      { id: 'ga-5', slotNumber: 5, teamName: 'Hydra Official' },
      { id: 'ga-6', slotNumber: 6, teamName: 'Reckoning Esports' },
      { id: 'ga-7', slotNumber: 7, teamName: 'Revenant X' },
      { id: 'ga-8', slotNumber: 8, teamName: 'Marcos Gaming' },
      { id: 'ga-9', slotNumber: 9, teamName: 'Enigma Forever' },
      { id: 'ga-10', slotNumber: 10, teamName: 'Team Insane' },
      { id: 'ga-11', slotNumber: 11, teamName: '8Bit Warriors' },
      { id: 'ga-12', slotNumber: 12, teamName: 'Blind Esports' },
    ],
    matches: [
      { matchNumber: 1, matchDate: '16 Nov 2026, 04:00 PM' },
      { matchNumber: 2, matchDate: '16 Nov 2026, 04:45 PM' },
      { matchNumber: 3, matchDate: '16 Nov 2026, 05:30 PM' },
      { matchNumber: 4, matchDate: '16 Nov 2026, 06:15 PM' },
      { matchNumber: 5, matchDate: '17 Nov 2026, 04:00 PM' },
      { matchNumber: 6, matchDate: '17 Nov 2026, 04:45 PM' },
      { matchNumber: 7, matchDate: '17 Nov 2026, 05:30 PM' },
      { matchNumber: 8, matchDate: '18 Nov 2026, 04:00 PM' },
      { matchNumber: 9, matchDate: '18 Nov 2026, 04:45 PM' },
      { matchNumber: 10, matchDate: '18 Nov 2026, 05:30 PM' },
    ],
    pointsTable: [
      { rank: 1, teamName: 'Team Alpha', isUserTeam: true, matchesPlayed: 10, placementPoints: 72, killPoints: 54, totalPoints: 126, qualified: true },
      { rank: 2, teamName: 'GodLike Esports', matchesPlayed: 10, placementPoints: 68, killPoints: 48, totalPoints: 116, qualified: true },
      { rank: 3, teamName: 'Soul Army', matchesPlayed: 10, placementPoints: 60, killPoints: 44, totalPoints: 104, qualified: true },
      { rank: 4, teamName: 'Entity Gaming', matchesPlayed: 10, placementPoints: 54, killPoints: 42, totalPoints: 96, qualified: true },
      { rank: 5, teamName: 'Hydra Official', matchesPlayed: 10, placementPoints: 48, killPoints: 36, penaltyPoints: 2, totalPoints: 82, qualified: false },
      { rank: 6, teamName: 'Reckoning Esports', matchesPlayed: 10, placementPoints: 42, killPoints: 32, totalPoints: 74, qualified: false },
      { rank: 7, teamName: 'Revenant X', matchesPlayed: 10, placementPoints: 36, killPoints: 28, totalPoints: 64, qualified: false },
      { rank: 8, teamName: 'Marcos Gaming', matchesPlayed: 10, placementPoints: 30, killPoints: 24, totalPoints: 54, qualified: false },
      { rank: 9, teamName: 'Enigma Forever', matchesPlayed: 10, placementPoints: 24, killPoints: 22, totalPoints: 46, qualified: false },
      { rank: 10, teamName: 'Team Insane', matchesPlayed: 10, placementPoints: 20, killPoints: 20, totalPoints: 40, qualified: false },
      { rank: 11, teamName: '8Bit Warriors', matchesPlayed: 10, placementPoints: 16, killPoints: 16, totalPoints: 32, qualified: false },
      { rank: 'DQ', teamName: 'Blind Esports', matchesPlayed: 10, placementPoints: 10, killPoints: 12, penaltyPoints: 0, totalPoints: 0, qualified: false, isDisqualified: true, disqualificationReason: 'Emulators prohibited' },
    ],
  },
  {
    groupId: 'B',
    groupName: 'Group B',
    totalTeams: 13,
    isUserGroup: false,
    teams: [
      { id: 'gb-1', slotNumber: 1, teamName: 'Team XSpark' },
      { id: 'gb-2', slotNumber: 2, teamName: 'Orangutan' },
      { id: 'gb-3', slotNumber: 3, teamName: 'Global Esports' },
      { id: 'gb-4', slotNumber: 4, teamName: 'Chemin Esports' },
      { id: 'gb-5', slotNumber: 5, teamName: 'Team Tamilas' },
      { id: 'gb-6', slotNumber: 6, teamName: 'Gladiator Esports' },
      { id: 'gb-7', slotNumber: 7, teamName: 'Medal Esports' },
      { id: 'gb-8', slotNumber: 8, teamName: 'Gujarat Tigers' },
      { id: 'gb-9', slotNumber: 9, teamName: 'Big Brother Esports' },
      { id: 'gb-10', slotNumber: 10, teamName: 'Autobotz Esports' },
      { id: 'gb-11', slotNumber: 11, teamName: 'WSB Gaming' },
      { id: 'gb-12', slotNumber: 12, teamName: 'Midwave Esports' },
      { id: 'gb-13', slotNumber: 13, teamName: 'Team Forever' },
    ],
    matches: [
      { matchNumber: 1, matchDate: '16 Nov 2026, 04:30 PM' },
      { matchNumber: 2, matchDate: '16 Nov 2026, 05:15 PM' },
      { matchNumber: 3, matchDate: '16 Nov 2026, 06:00 PM' },
      { matchNumber: 4, matchDate: '16 Nov 2026, 06:45 PM' },
      { matchNumber: 5, matchDate: '17 Nov 2026, 04:30 PM' },
      { matchNumber: 6, matchDate: '17 Nov 2026, 05:15 PM' },
      { matchNumber: 7, matchDate: '17 Nov 2026, 06:00 PM' },
      { matchNumber: 8, matchDate: '18 Nov 2026, 04:30 PM' },
      { matchNumber: 9, matchDate: '18 Nov 2026, 05:15 PM' },
      { matchNumber: 10, matchDate: '18 Nov 2026, 06:00 PM' },
    ],
    pointsTable: [
      { rank: 1, teamName: 'Team XSpark', matchesPlayed: 10, placementPoints: 74, killPoints: 50, totalPoints: 124, qualified: true },
      { rank: 2, teamName: 'Orangutan', matchesPlayed: 10, placementPoints: 66, killPoints: 46, totalPoints: 112, qualified: true },
      { rank: 3, teamName: 'Global Esports', matchesPlayed: 10, placementPoints: 58, killPoints: 44, totalPoints: 102, qualified: true },
      { rank: 4, teamName: 'Chemin Esports', matchesPlayed: 10, placementPoints: 52, killPoints: 40, totalPoints: 92, qualified: true },
      { rank: 5, teamName: 'Team Tamilas', matchesPlayed: 10, placementPoints: 46, killPoints: 34, totalPoints: 80, qualified: false },
      { rank: 6, teamName: 'Gladiator Esports', matchesPlayed: 10, placementPoints: 40, killPoints: 30, totalPoints: 70, qualified: false },
      { rank: 7, teamName: 'Medal Esports', matchesPlayed: 10, placementPoints: 34, killPoints: 26, totalPoints: 60, qualified: false },
      { rank: 8, teamName: 'Gujarat Tigers', matchesPlayed: 10, placementPoints: 28, killPoints: 24, totalPoints: 52, qualified: false },
      { rank: 9, teamName: 'Big Brother Esports', matchesPlayed: 10, placementPoints: 22, killPoints: 22, totalPoints: 44, qualified: false },
      { rank: 10, teamName: 'Autobotz Esports', matchesPlayed: 10, placementPoints: 18, killPoints: 18, totalPoints: 36, qualified: false },
      { rank: 11, teamName: 'WSB Gaming', matchesPlayed: 10, placementPoints: 14, killPoints: 16, totalPoints: 30, qualified: false },
      { rank: 12, teamName: 'Midwave Esports', matchesPlayed: 10, placementPoints: 10, killPoints: 14, totalPoints: 24, qualified: false },
      { rank: 13, teamName: 'Team Forever', matchesPlayed: 10, placementPoints: 6, killPoints: 10, totalPoints: 16, qualified: false },
    ],
  },
  {
    groupId: 'C',
    groupName: 'Group C',
    totalTeams: 12,
    isUserGroup: false,
    teams: [
      { id: 'gc-1', slotNumber: 1, teamName: 'FS Esports' },
      { id: 'gc-2', slotNumber: 2, teamName: 'God\'s Reign' },
      { id: 'gc-3', slotNumber: 3, teamName: 'Nigma Galaxy' },
      { id: 'gc-4', slotNumber: 4, teamName: 'Velocity Gaming' },
      { id: 'gc-5', slotNumber: 5, teamName: 'Team Mayhem' },
      { id: 'gc-6', slotNumber: 6, teamName: 'Rivalry Esports' },
      { id: 'gc-7', slotNumber: 7, teamName: 'Dynamic 5' },
      { id: 'gc-8', slotNumber: 8, teamName: 'Team Zero' },
      { id: 'gc-9', slotNumber: 9, teamName: 'Team Psyche' },
      { id: 'gc-10', slotNumber: 10, teamName: 'Team VST' },
      { id: 'gc-11', slotNumber: 11, teamName: 'Apex Hunters' },
      { id: 'gc-12', slotNumber: 12, teamName: 'Shadow Strikers' },
    ],
    matches: [
      { matchNumber: 1, matchDate: '16 Nov 2026, 05:00 PM' },
      { matchNumber: 2, matchDate: '16 Nov 2026, 05:45 PM' },
      { matchNumber: 3, matchDate: '16 Nov 2026, 06:30 PM' },
      { matchNumber: 4, matchDate: '16 Nov 2026, 07:15 PM' },
      { matchNumber: 5, matchDate: '17 Nov 2026, 05:00 PM' },
      { matchNumber: 6, matchDate: '17 Nov 2026, 05:45 PM' },
      { matchNumber: 7, matchDate: '17 Nov 2026, 06:30 PM' },
      { matchNumber: 8, matchDate: '18 Nov 2026, 05:00 PM' },
      { matchNumber: 9, matchDate: '18 Nov 2026, 05:45 PM' },
      { matchNumber: 10, matchDate: '18 Nov 2026, 06:30 PM' },
    ],
    pointsTable: [
      { rank: 1, teamName: 'FS Esports', matchesPlayed: 10, placementPoints: 70, killPoints: 52, totalPoints: 122, qualified: true },
      { rank: 2, teamName: 'God\'s Reign', matchesPlayed: 10, placementPoints: 64, killPoints: 46, totalPoints: 110, qualified: true },
      { rank: 3, teamName: 'Nigma Galaxy', matchesPlayed: 10, placementPoints: 58, killPoints: 42, totalPoints: 100, qualified: true },
      { rank: 4, teamName: 'Velocity Gaming', matchesPlayed: 10, placementPoints: 50, killPoints: 38, totalPoints: 88, qualified: true },
      { rank: 5, teamName: 'Team Mayhem', matchesPlayed: 10, placementPoints: 44, killPoints: 32, totalPoints: 76, qualified: false },
      { rank: 6, teamName: 'Rivalry Esports', matchesPlayed: 10, placementPoints: 38, killPoints: 28, totalPoints: 66, qualified: false },
      { rank: 7, teamName: 'Dynamic 5', matchesPlayed: 10, placementPoints: 32, killPoints: 26, totalPoints: 58, qualified: false },
      { rank: 8, teamName: 'Team Zero', matchesPlayed: 10, placementPoints: 26, killPoints: 24, totalPoints: 50, qualified: false },
      { rank: 9, teamName: 'Team Psyche', matchesPlayed: 10, placementPoints: 20, killPoints: 20, totalPoints: 40, qualified: false },
      { rank: 10, teamName: 'Team VST', matchesPlayed: 10, placementPoints: 16, killPoints: 18, totalPoints: 34, qualified: false },
      { rank: 11, teamName: 'Apex Hunters', matchesPlayed: 10, placementPoints: 12, killPoints: 14, totalPoints: 26, qualified: false },
      { rank: 12, teamName: 'Shadow Strikers', matchesPlayed: 10, placementPoints: 8, killPoints: 10, totalPoints: 18, qualified: false },
    ],
  },
  {
    groupId: 'D',
    groupName: 'Group D',
    totalTeams: 11,
    isUserGroup: false,
    teams: [
      { id: 'gd-1', slotNumber: 1, teamName: 'Team Havoc' },
      { id: 'gd-2', slotNumber: 2, teamName: 'Falcon X' },
      { id: 'gd-3', slotNumber: 3, teamName: 'Phoenix Force' },
      { id: 'gd-4', slotNumber: 4, teamName: 'Inferno Squad' },
      { id: 'gd-5', slotNumber: 5, teamName: 'Cyber Wolves' },
      { id: 'gd-6', slotNumber: 6, teamName: 'Nexus Gaming' },
      { id: 'gd-7', slotNumber: 7, teamName: 'Thunderbolts' },
      { id: 'gd-8', slotNumber: 8, teamName: 'Phantom Troopers' },
      { id: 'gd-9', slotNumber: 9, teamName: 'Vanguard Elite' },
      { id: 'gd-10', slotNumber: 10, teamName: 'Zenith Esports' },
      { id: 'gd-11', slotNumber: 11, teamName: 'Titan Legion' },
    ],
    matches: [
      { matchNumber: 1, matchDate: '16 Nov 2026, 05:30 PM' },
      { matchNumber: 2, matchDate: '16 Nov 2026, 06:15 PM' },
      { matchNumber: 3, matchDate: '16 Nov 2026, 07:00 PM' },
      { matchNumber: 4, matchDate: '16 Nov 2026, 07:45 PM' },
      { matchNumber: 5, matchDate: '17 Nov 2026, 05:30 PM' },
      { matchNumber: 6, matchDate: '17 Nov 2026, 06:15 PM' },
      { matchNumber: 7, matchDate: '17 Nov 2026, 07:00 PM' },
      { matchNumber: 8, matchDate: '18 Nov 2026, 05:30 PM' },
      { matchNumber: 9, matchDate: '18 Nov 2026, 06:15 PM' },
      { matchNumber: 10, matchDate: '18 Nov 2026, 07:00 PM' },
    ],
    pointsTable: [
      { rank: 1, teamName: 'Team Havoc', matchesPlayed: 10, placementPoints: 72, killPoints: 50, totalPoints: 122, qualified: true },
      { rank: 2, teamName: 'Falcon X', matchesPlayed: 10, placementPoints: 66, killPoints: 46, totalPoints: 112, qualified: true },
      { rank: 3, teamName: 'Phoenix Force', matchesPlayed: 10, placementPoints: 60, killPoints: 42, totalPoints: 102, qualified: true },
      { rank: 4, teamName: 'Inferno Squad', matchesPlayed: 10, placementPoints: 54, killPoints: 36, totalPoints: 90, qualified: true },
      { rank: 5, teamName: 'Cyber Wolves', matchesPlayed: 10, placementPoints: 46, killPoints: 32, totalPoints: 78, qualified: false },
      { rank: 6, teamName: 'Nexus Gaming', matchesPlayed: 10, placementPoints: 40, killPoints: 28, totalPoints: 68, qualified: false },
      { rank: 7, teamName: 'Thunderbolts', matchesPlayed: 10, placementPoints: 32, killPoints: 26, totalPoints: 58, qualified: false },
      { rank: 8, teamName: 'Phantom Troopers', matchesPlayed: 10, placementPoints: 26, killPoints: 22, totalPoints: 48, qualified: false },
      { rank: 9, teamName: 'Vanguard Elite', matchesPlayed: 10, placementPoints: 20, killPoints: 20, totalPoints: 40, qualified: false },
      { rank: 10, teamName: 'Zenith Esports', matchesPlayed: 10, placementPoints: 14, killPoints: 16, totalPoints: 30, qualified: false },
      { rank: 11, teamName: 'Titan Legion', matchesPlayed: 10, placementPoints: 8, killPoints: 12, totalPoints: 20, qualified: false },
    ],
  },
];

export const GRAND_FINALE_TEAMS: GrandFinaleTeam[] = [
  { rank: 1, teamName: 'Team Alpha', qualifiedFrom: 'Group A (Seed 1)', matchDate: '20 Nov 2026, 06:00 PM - Match 1 (Bermuda)', isUserTeam: true },
  { rank: 2, teamName: 'GodLike Esports', qualifiedFrom: 'Group A (Seed 2)', matchDate: '20 Nov 2026, 06:00 PM - Match 1 (Bermuda)' },
  { rank: 3, teamName: 'Soul Army', qualifiedFrom: 'Group A (Seed 3)', matchDate: '20 Nov 2026, 06:45 PM - Match 2 (Purgatory)' },
  { rank: 4, teamName: 'Entity Gaming', qualifiedFrom: 'Group A (Seed 4)', matchDate: '20 Nov 2026, 06:45 PM - Match 2 (Purgatory)' },
  { rank: 5, teamName: 'Team XSpark', qualifiedFrom: 'Group B (Seed 1)', matchDate: '20 Nov 2026, 07:30 PM - Match 3 (Kalahari)' },
  { rank: 6, teamName: 'Orangutan', qualifiedFrom: 'Group B (Seed 2)', matchDate: '20 Nov 2026, 07:30 PM - Match 3 (Kalahari)' },
  { rank: 7, teamName: 'Global Esports', qualifiedFrom: 'Group B (Seed 3)', matchDate: '20 Nov 2026, 08:15 PM - Match 4 (Alpine)' },
  { rank: 8, teamName: 'Chemin Esports', qualifiedFrom: 'Group B (Seed 4)', matchDate: '20 Nov 2026, 08:15 PM - Match 4 (Alpine)' },
  { rank: 9, teamName: 'FS Esports', qualifiedFrom: 'Group C (Seed 1)', matchDate: '20 Nov 2026, 09:00 PM - Match 5 (Bermuda Decider)' },
  { rank: 10, teamName: 'God\'s Reign', qualifiedFrom: 'Group C (Seed 2)', matchDate: '20 Nov 2026, 09:00 PM - Match 5 (Bermuda Decider)' },
  { rank: 11, teamName: 'Nigma Galaxy', qualifiedFrom: 'Group C (Seed 3)', matchDate: '20 Nov 2026, 06:00 PM - Match 1 (Bermuda)' },
  { rank: 12, teamName: 'Velocity Gaming', qualifiedFrom: 'Group C (Seed 4)', matchDate: '20 Nov 2026, 06:45 PM - Match 2 (Purgatory)' },
  { rank: 13, teamName: 'Team Havoc', qualifiedFrom: 'Group D (Seed 1)', matchDate: '20 Nov 2026, 07:30 PM - Match 3 (Kalahari)' },
  { rank: 14, teamName: 'Falcon X', qualifiedFrom: 'Group D (Seed 2)', matchDate: '20 Nov 2026, 08:15 PM - Match 4 (Alpine)' },
  { rank: 15, teamName: 'Phoenix Force', qualifiedFrom: 'Group D (Seed 3)', matchDate: '20 Nov 2026, 09:00 PM - Match 5 (Bermuda Decider)' },
  { rank: 16, teamName: 'Inferno Squad', qualifiedFrom: 'Group D (Seed 4)', matchDate: '20 Nov 2026, 09:00 PM - Match 5 (Bermuda Decider)' },
];

export const WINNER_DATA: WinnerDetails = {
  tournamentTitle: 'Weekly Scrims S1 (BR Classic)',
  game: 'Free Fire / BGMI Classic',
  format: 'Battle Royale Classic Squads',
  champion: {
    teamName: 'Team Alpha',
    prizeMoney: '₹5,000 + Champion Trophy',
    wwcdCount: 3,
    totalKills: 48,
    totalPoints: 96,
    isUserTeam: true,
    roster: {
      igl: 'Alpha_Leader (Captain)',
      assaulter: 'Alpha_Rager',
      sniper: 'Alpha_Sniper (You)',
      support: 'Alpha_Doc',
    },
  },
  runnerUp: {
    teamName: 'GodLike Esports',
    prizeMoney: '₹3,000',
    totalPoints: 84,
    totalKills: 41,
  },
  secondRunnerUp: {
    teamName: 'Team XSpark',
    prizeMoney: '₹1,500',
    totalPoints: 76,
    totalKills: 36,
  },
  mvp: {
    playerName: 'Alpha_Sniper',
    teamName: 'Team Alpha',
    kills: 22,
    damage: '4,680 DMG',
    kdRatio: 5.5,
    prizeMoney: '₹500 + MVP Award',
  },
  finaleStandings: [
    { rank: 1, teamName: 'Team Alpha (CHAMPION)', matchesPlayed: 5, placementPoints: 48, killPoints: 48, totalPoints: 96, prize: '₹5,000' },
    { rank: 2, teamName: 'GodLike Esports', matchesPlayed: 5, placementPoints: 43, killPoints: 41, totalPoints: 84, prize: '₹3,000' },
    { rank: 3, teamName: 'Team XSpark', matchesPlayed: 5, placementPoints: 40, killPoints: 36, totalPoints: 76, prize: '₹1,500' },
    { rank: 4, teamName: 'Orangutan', matchesPlayed: 5, placementPoints: 35, killPoints: 32, totalPoints: 67, prize: '₹500' },
    { rank: 5, teamName: 'Soul Army', matchesPlayed: 5, placementPoints: 31, killPoints: 29, penaltyPoints: 2, totalPoints: 58 },
    { rank: 6, teamName: 'Team Havoc', matchesPlayed: 5, placementPoints: 28, killPoints: 27, totalPoints: 55 },
    { rank: 7, teamName: 'FS Esports', matchesPlayed: 5, placementPoints: 25, killPoints: 25, totalPoints: 50 },
    { rank: 8, teamName: 'Entity Gaming', matchesPlayed: 5, placementPoints: 22, killPoints: 23, totalPoints: 45 },
    { rank: 9, teamName: 'Falcon X', matchesPlayed: 5, placementPoints: 20, killPoints: 22, totalPoints: 42 },
    { rank: 10, teamName: 'Global Esports', matchesPlayed: 5, placementPoints: 18, killPoints: 20, totalPoints: 38 },
    { rank: 11, teamName: 'God\'s Reign', matchesPlayed: 5, placementPoints: 16, killPoints: 18, totalPoints: 34 },
    { rank: 12, teamName: 'Chemin Esports', matchesPlayed: 5, placementPoints: 14, killPoints: 16, totalPoints: 30 },
    { rank: 13, teamName: 'Phoenix Force', matchesPlayed: 5, placementPoints: 12, killPoints: 15, totalPoints: 27 },
    { rank: 14, teamName: 'Nigma Galaxy', matchesPlayed: 5, placementPoints: 10, killPoints: 14, totalPoints: 24 },
    { rank: 15, teamName: 'Inferno Squad', matchesPlayed: 5, placementPoints: 8, killPoints: 12, totalPoints: 20 },
    { rank: 'DQ', teamName: 'Velocity Gaming', matchesPlayed: 5, placementPoints: 6, killPoints: 10, penaltyPoints: 0, totalPoints: 0, isDisqualified: true, disqualificationReason: 'Unauthorized player substitution' },
  ],
};
