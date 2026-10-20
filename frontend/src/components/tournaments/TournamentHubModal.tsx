'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  BR_CLASSIC_GROUPS,
  GRAND_FINALE_TEAMS,
  WINNER_DATA,
  GroupData,
} from './tournamentHubData';

export type HubTab = 'fixtures' | 'points' | 'finale' | 'winner';

interface TournamentHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentTitle: string;
  defaultTab?: HubTab;
}

export default function TournamentHubModal({
  isOpen,
  onClose,
  tournamentTitle,
  defaultTab = 'fixtures',
}: TournamentHubModalProps) {
  const [activeTab, setActiveTab] = useState<HubTab>(defaultTab);
  const [fixturesGroupIdx, setFixturesGroupIdx] = useState(0);
  const [pointsGroupIdx, setPointsGroupIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentFixturesGroup: GroupData = BR_CLASSIC_GROUPS[fixturesGroupIdx];
  const currentPointsGroup: GroupData = BR_CLASSIC_GROUPS[pointsGroupIdx];

  const handleNextFixturesGroup = () => {
    setFixturesGroupIdx((prev) => (prev + 1) % BR_CLASSIC_GROUPS.length);
  };

  const handlePrevFixturesGroup = () => {
    setFixturesGroupIdx((prev) => (prev - 1 + BR_CLASSIC_GROUPS.length) % BR_CLASSIC_GROUPS.length);
  };

  const handleNextPointsGroup = () => {
    setPointsGroupIdx((prev) => (prev + 1) % BR_CLASSIC_GROUPS.length);
  };

  const handlePrevPointsGroup = () => {
    setPointsGroupIdx((prev) => (prev - 1 + BR_CLASSIC_GROUPS.length) % BR_CLASSIC_GROUPS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{tournamentTitle}</h2>
            <p className="text-xs text-gray-500">Battle Royale Classic • 48 Teams</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('fixtures')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'fixtures'
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Fixtures
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('points')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'points'
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Points Table
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('finale')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'finale'
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Grand Finale Fixtures
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('winner')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'winner'
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Winner
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1 min-h-0">
          {/* ================= FIXTURES ================= */}
          {activeTab === 'fixtures' && (
            <div className="space-y-4">
              {/* Group Selector with Left/Right Arrows */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">
                    {currentFixturesGroup.groupName}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({currentFixturesGroup.totalTeams} Teams)
                  </span>
                  {currentFixturesGroup.isUserGroup && (
                    <span className="ml-2 text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                      Your Group
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 mr-2">
                    {BR_CLASSIC_GROUPS.map((grp, idx) => (
                      <button
                        key={grp.groupId}
                        type="button"
                        onClick={() => setFixturesGroupIdx(idx)}
                        className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${
                          fixturesGroupIdx === idx
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Group {grp.groupId}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePrevFixturesGroup}
                    className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    title="Previous Group"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFixturesGroup}
                    className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    title="Next Group"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fixtures Table */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 sm:hidden">
                <span>← Swipe table to see all matches</span>
                <span>→</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-[11px] sm:text-xs font-bold uppercase border-b border-gray-200">
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 w-12 sm:w-14 text-center">Slot</th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 min-w-[130px]">Team Name ({currentFixturesGroup.teams.length} Teams)</th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4">Match Schedule ({currentFixturesGroup.matches.length} Matches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Array.from({
                      length: Math.max(currentFixturesGroup.teams.length, currentFixturesGroup.matches.length),
                    }).map((_, idx) => {
                      const team = currentFixturesGroup.teams[idx];
                      const match = currentFixturesGroup.matches[idx];

                      return (
                        <tr
                          key={team ? team.id : `match-row-${idx}`}
                          className={team?.isUserTeam ? 'bg-green-50/70 font-semibold' : 'hover:bg-gray-50/50'}
                        >
                          <td className="py-3 px-4 text-center text-xs text-gray-500">
                            {team ? `#${team.slotNumber}` : '-'}
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {team ? (
                              <div className="flex items-center gap-2">
                                <span>{team.teamName}</span>
                                {team.isUserTeam && (
                                  <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded font-bold">
                                    You
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-700 text-xs sm:text-sm">
                            {match ? (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900 min-w-[70px]">
                                  Match {match.matchNumber}:
                                </span>
                                <span>{match.matchDate}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= POINTS TABLE ================= */}
          {activeTab === 'points' && (
            <div className="space-y-4">
              {/* Group Selector with Left/Right Arrows */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">
                    {currentPointsGroup.groupName} Standings
                  </span>
                  <span className="text-xs text-gray-500">
                    (Top 4 Advance to Grand Finale)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 mr-2">
                    {BR_CLASSIC_GROUPS.map((grp, idx) => (
                      <button
                        key={grp.groupId}
                        type="button"
                        onClick={() => setPointsGroupIdx(idx)}
                        className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${
                          pointsGroupIdx === idx
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Group {grp.groupId}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePrevPointsGroup}
                    className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    title="Previous Group"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPointsGroup}
                    className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    title="Next Group"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Points Table */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 sm:hidden">
                <span>← Swipe table to see all stats</span>
                <span>→</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full min-w-[580px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-[11px] sm:text-xs font-bold uppercase border-b border-gray-200">
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center w-10 sm:w-12">#</th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 min-w-[130px]">Team Name</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                        <span className="hidden sm:inline">Matches Played</span>
                        <span className="sm:hidden">Matches</span>
                      </th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                        <span className="hidden sm:inline">Placement Point</span>
                        <span className="sm:hidden">Place Pts</span>
                      </th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                        <span className="hidden sm:inline">Kill Point</span>
                        <span className="sm:hidden">Kill Pts</span>
                      </th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap text-red-600">
                        <span className="hidden sm:inline">Penalty</span>
                        <span className="sm:hidden">Pen</span>
                      </th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-black text-gray-900 whitespace-nowrap">
                        <span className="hidden sm:inline">Total Point</span>
                        <span className="sm:hidden">Total Pts</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentPointsGroup.pointsTable.map((team) => {
                      const isDQ = team.isDisqualified;
                      const hasPenalty = Boolean(team.penaltyPoints && team.penaltyPoints > 0);

                      return (
                        <tr
                          key={team.teamName}
                          className={
                            isDQ
                              ? 'bg-red-50/40 text-gray-400'
                              : team.isUserTeam
                              ? 'bg-green-50/70 font-semibold'
                              : 'hover:bg-gray-50/50'
                          }
                        >
                          <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-xs font-bold">
                            {isDQ ? (
                              <span className="px-1.5 py-0.5 text-[10px] font-black rounded bg-red-100 text-red-700 border border-red-200">
                                DQ
                              </span>
                            ) : (
                              <span className="text-gray-700">{team.rank}</span>
                            )}
                          </td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`truncate max-w-[140px] sm:max-w-none ${
                                  isDQ ? 'line-through text-gray-400' : 'text-gray-900'
                                }`}
                              >
                                {team.teamName}
                              </span>
                              {team.isUserTeam && !isDQ && (
                                <span className="text-[9px] sm:text-[10px] bg-green-600 text-white px-1 sm:px-1.5 py-0.5 rounded font-bold shrink-0">
                                  You
                                </span>
                              )}
                              {isDQ && (
                                <span
                                  className="text-[10px] font-medium bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.5 rounded shrink-0"
                                  title={team.disqualificationReason || 'Disqualified'}
                                >
                                  DQ: {team.disqualificationReason || 'Rule Violation'}
                                </span>
                              )}
                              {hasPenalty && !isDQ && (
                                <span className="text-[9px] bg-red-50 text-red-600 border border-red-200 px-1 py-0.5 rounded font-medium shrink-0">
                                  -{team.penaltyPoints} Penalty
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-gray-600">{team.matchesPlayed}</td>
                          <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-gray-600">{team.placementPoints}</td>
                          <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-gray-600">{team.killPoints}</td>
                          <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-semibold text-xs">
                            {hasPenalty ? (
                              <span className="text-red-600">-{team.penaltyPoints}</span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                          <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-bold">
                            {isDQ ? (
                              <span className="text-xs text-red-600">0 (DQ)</span>
                            ) : (
                              <span className="text-green-700">{team.totalPoints}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= GRAND FINALE FIXTURES ================= */}
          {activeTab === 'finale' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Grand Finale Fixtures</h3>
                  <p className="text-xs text-gray-500">16 Qualified Teams (Top 4 from Groups A, B, C, D)</p>
                </div>
              </div>

              {/* Table with 2 columns: Team Name and Date */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 sm:hidden">
                <span>← Swipe table to see schedule</span>
                <span>→</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full min-w-[460px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-[11px] sm:text-xs font-bold uppercase border-b border-gray-200">
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 w-12 text-center">#</th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 min-w-[140px]">Team Name</th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {GRAND_FINALE_TEAMS.map((team, idx) => (
                      <tr
                        key={team.teamName}
                        className={team.isUserTeam ? 'bg-green-50/70 font-semibold' : 'hover:bg-gray-50/50'}
                      >
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-center text-xs text-gray-500">{idx + 1}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-gray-900">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{team.teamName}</span>
                            <span className="text-[10px] text-gray-400 font-normal">
                              ({team.qualifiedFrom})
                            </span>
                            {team.isUserTeam && (
                              <span className="text-[9px] sm:text-[10px] bg-green-600 text-white px-1 sm:px-1.5 py-0.5 rounded font-bold shrink-0">
                                You
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal">
                          {team.matchDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= WINNER ================= */}
          {activeTab === 'winner' && (
            <div className="space-y-5">
              {/* Champion Card */}
              <div className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    Tournament Champion
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                    {WINNER_DATA.champion.teamName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Prize: <strong className="text-gray-900">{WINNER_DATA.champion.prizeMoney}</strong> • Points: <strong>{WINNER_DATA.champion.totalPoints}</strong> • Kills: <strong>{WINNER_DATA.champion.totalKills}</strong>
                  </p>
                </div>

                <div className="text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200 shrink-0">
                  <span className="font-bold text-gray-800 block mb-1">Squad Roster:</span>
                  <div>IGL: {WINNER_DATA.champion.roster.igl}</div>
                  <div>Assaulter: {WINNER_DATA.champion.roster.assaulter}</div>
                  <div>Sniper: {WINNER_DATA.champion.roster.sniper}</div>
                  <div>Support: {WINNER_DATA.champion.roster.support}</div>
                </div>
              </div>

              {/* Runners and MVP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 sm:p-4 bg-white border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">2nd Place (Runner-Up)</span>
                  <div className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">{WINNER_DATA.runnerUp.teamName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Prize: {WINNER_DATA.runnerUp.prizeMoney}</div>
                </div>

                <div className="p-3.5 sm:p-4 bg-white border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">3rd Place (2nd Runner-Up)</span>
                  <div className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">{WINNER_DATA.secondRunnerUp.teamName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Prize: {WINNER_DATA.secondRunnerUp.prizeMoney}</div>
                </div>

                <div className="p-3.5 sm:p-4 bg-white border border-gray-200 rounded-xl">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Tournament MVP</span>
                  <div className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">{WINNER_DATA.mvp.playerName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{WINNER_DATA.mvp.kills} Kills • {WINNER_DATA.mvp.prizeMoney}</div>
                </div>
              </div>

              {/* Final Leaderboard */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Grand Finale Standings</h4>
                <div className="flex items-center justify-between text-[11px] text-gray-400 sm:hidden mb-1">
                  <span>← Swipe table to see full standings</span>
                  <span>→</span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                  <table className="w-full min-w-[580px] text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-[11px] sm:text-xs font-bold uppercase border-b border-gray-200">
                        <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center w-10 sm:w-12">#</th>
                        <th className="py-2.5 sm:py-3 px-3 sm:px-4 min-w-[130px]">Team Name</th>
                        <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                          <span className="hidden sm:inline">Matches Played</span>
                          <span className="sm:hidden">Matches</span>
                        </th>
                        <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                          <span className="hidden sm:inline">Placement Point</span>
                          <span className="sm:hidden">Place Pts</span>
                        </th>
                        <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                          <span className="hidden sm:inline">Kill Point</span>
                          <span className="sm:hidden">Kill Pts</span>
                        </th>
                        <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center whitespace-nowrap text-red-600">
                          <span className="hidden sm:inline">Penalty</span>
                          <span className="sm:hidden">Pen</span>
                        </th>
                        <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-black text-gray-900 whitespace-nowrap">
                          <span className="hidden sm:inline">Total Point</span>
                          <span className="sm:hidden">Total Pts</span>
                        </th>
                        <th className="py-2.5 sm:py-3 px-3 text-right whitespace-nowrap">Prize</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {WINNER_DATA.finaleStandings.map((st) => {
                        const isDQ = st.isDisqualified;
                        const hasPenalty = Boolean(st.penaltyPoints && st.penaltyPoints > 0);

                        return (
                          <tr
                            key={st.teamName}
                            className={
                              isDQ
                                ? 'bg-red-50/40 text-gray-400'
                                : st.rank === 1
                                ? 'bg-green-50/70 font-semibold'
                                : 'hover:bg-gray-50/50'
                            }
                          >
                            <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-xs font-bold">
                              {isDQ ? (
                                <span className="px-1.5 py-0.5 text-[10px] font-black rounded bg-red-100 text-red-700 border border-red-200">
                                  DQ
                                </span>
                              ) : (
                                <span className="text-gray-700">{st.rank}</span>
                              )}
                            </td>
                            <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={`truncate max-w-[140px] sm:max-w-none ${
                                    isDQ ? 'line-through text-gray-400' : 'text-gray-900'
                                  }`}
                                >
                                  {st.teamName}
                                </span>
                                {st.rank === 1 && !isDQ && (
                                  <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded font-bold shrink-0">
                                    Champion
                                  </span>
                                )}
                                {isDQ && (
                                  <span
                                    className="text-[10px] font-medium bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.5 rounded shrink-0"
                                    title={st.disqualificationReason || 'Disqualified'}
                                  >
                                    DQ: {st.disqualificationReason || 'Rule Violation'}
                                  </span>
                                )}
                                {hasPenalty && !isDQ && (
                                  <span className="text-[9px] bg-red-50 text-red-600 border border-red-200 px-1 py-0.5 rounded font-medium shrink-0">
                                    -{st.penaltyPoints} Penalty
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-gray-600">{st.matchesPlayed}</td>
                            <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-gray-600">{st.placementPoints}</td>
                            <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center text-gray-600">{st.killPoints}</td>
                            <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-semibold text-xs">
                              {hasPenalty ? (
                                <span className="text-red-600">-{st.penaltyPoints}</span>
                              ) : (
                                <span className="text-gray-300">-</span>
                              )}
                            </td>
                            <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-bold">
                              {isDQ ? (
                                <span className="text-xs text-red-600">0 (DQ)</span>
                              ) : (
                                <span className="text-green-700">{st.totalPoints}</span>
                              )}
                            </td>
                            <td className="py-2.5 sm:py-3 px-3 text-right font-bold text-gray-900 whitespace-nowrap">
                              {isDQ ? '-' : st.prize || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
