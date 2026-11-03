import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SparringScorecard, RoundStats } from '../types';
import {
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Shield,
  Swords,
  Timer,
  Save,
  RotateCcw,
  Scale,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export const SparringScorecardView: React.FC = () => {
  const { scorecards, saveScorecard, deleteScorecard, profile, showToast } = useApp();

  const [opponentName, setOpponentName] = useState('Sparring Partner');
  const [weightClass, setWeightClass] = useState(profile.weightClass || 'Lightweight (155 lbs)');
  const [totalRounds, setTotalRounds] = useState<3 | 5>(3);
  const [activeRoundTab, setActiveRoundTab] = useState(1);
  const [scorecardNotes, setScorecardNotes] = useState('');

  // 3 or 5 Round Stats
  const [roundStatsList, setRoundStatsList] = useState<RoundStats[]>([
    {
      round: 1,
      redScore: 10,
      blueScore: 9,
      redSigStrikes: 22,
      blueSigStrikes: 15,
      redTakedowns: 1,
      blueTakedowns: 0,
      redControlSeconds: 65,
      blueControlSeconds: 10,
      redKnockdowns: 0,
      blueKnockdowns: 0
    },
    {
      round: 2,
      redScore: 10,
      blueScore: 9,
      redSigStrikes: 18,
      blueSigStrikes: 19,
      redTakedowns: 0,
      blueTakedowns: 0,
      redControlSeconds: 20,
      blueControlSeconds: 15,
      redKnockdowns: 0,
      blueKnockdowns: 0
    },
    {
      round: 3,
      redScore: 10,
      blueScore: 9,
      redSigStrikes: 28,
      blueSigStrikes: 14,
      redTakedowns: 2,
      blueTakedowns: 0,
      redControlSeconds: 120,
      blueControlSeconds: 0,
      redKnockdowns: 1,
      blueKnockdowns: 0
    }
  ]);

  const currentRoundStat = roundStatsList.find((r) => r.round === activeRoundTab) || roundStatsList[0];

  const updateCurrentRound = (updates: Partial<RoundStats>) => {
    setRoundStatsList((prev) =>
      prev.map((r) => (r.round === activeRoundTab ? { ...r, ...updates } : r))
    );
  };

  // Change total rounds (3 vs 5)
  const handleChangeTotalRounds = (count: 3 | 5) => {
    setTotalRounds(count);
    if (count === 5 && roundStatsList.length < 5) {
      setRoundStatsList([
        ...roundStatsList,
        {
          round: 4,
          redScore: 10,
          blueScore: 9,
          redSigStrikes: 20,
          blueSigStrikes: 15,
          redTakedowns: 0,
          blueTakedowns: 0,
          redControlSeconds: 40,
          blueControlSeconds: 10,
          redKnockdowns: 0,
          blueKnockdowns: 0
        },
        {
          round: 5,
          redScore: 10,
          blueScore: 9,
          redSigStrikes: 25,
          blueSigStrikes: 18,
          redTakedowns: 1,
          blueTakedowns: 0,
          redControlSeconds: 75,
          blueControlSeconds: 10,
          redKnockdowns: 0,
          blueKnockdowns: 0
        }
      ]);
    } else if (count === 3 && roundStatsList.length > 3) {
      setRoundStatsList(roundStatsList.slice(0, 3));
      if (activeRoundTab > 3) setActiveRoundTab(3);
    }
  };

  // Compute Totals
  const redTotalScore = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.redScore, 0);
  const blueTotalScore = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.blueScore, 0);

  const totalRedSigStrikes = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.redSigStrikes, 0);
  const totalBlueSigStrikes = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.blueSigStrikes, 0);

  const totalRedTakedowns = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.redTakedowns, 0);
  const totalBlueTakedowns = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.blueTakedowns, 0);

  const totalRedControlSec = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.redControlSeconds, 0);
  const totalBlueControlSec = roundStatsList.slice(0, totalRounds).reduce((acc, r) => acc + r.blueControlSeconds, 0);

  // Determine official result
  const calculateDecision = () => {
    if (redTotalScore > blueTotalScore) {
      return `Unanimous Decision (${redTotalScore}-${blueTotalScore}) for ${profile.username || 'Fighter'} (Red Corner)`;
    } else if (blueTotalScore > redTotalScore) {
      return `Decision (${blueTotalScore}-${redTotalScore}) for ${opponentName} (Blue Corner)`;
    } else {
      return `Majority Draw (${redTotalScore}-${blueTotalScore})`;
    }
  };

  const handleSaveCurrentScorecard = () => {
    const newScorecard: SparringScorecard = {
      id: `sc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      opponentName,
      weightClass,
      rounds: roundStatsList.slice(0, totalRounds),
      finalDecision: calculateDecision(),
      notes: scorecardNotes || `Scored ${totalRounds}-round sparring bout.`
    };
    saveScorecard(newScorecard);
    setScorecardNotes('');
    showToast('Scorecard recorded into your permanent Fight History!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#10131d] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest">
          <Scale className="w-4 h-4" />
          <span>Unified Rules of MMA   10-Point Must Scoring</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-wide mt-1">
          Official Sparring & Fight Scorecard
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Score sparring rounds with certified commission accuracy. Track significant strikes, takedowns, control time, and knockdowns across Red and Blue corners.
        </p>
      </div>

      {/* Fight Setup Header */}
      <div className="p-5 bg-[#12151f] border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Opponent / Partner Name</label>
          <input
            type="text"
            value={opponentName}
            onChange={(e) => setOpponentName(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white font-semibold"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Weight Division</label>
          <input
            type="text"
            value={weightClass}
            onChange={(e) => setWeightClass(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0b0e] border border-slate-800 rounded-lg text-xs text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Scheduled Distance</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChangeTotalRounds(3)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                totalRounds === 3 ? 'bg-rose-600 text-white' : 'bg-[#181c28] text-slate-400 border border-slate-800'
              }`}
            >
              3 Rounds (Standard)
            </button>
            <button
              onClick={() => handleChangeTotalRounds(5)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                totalRounds === 5 ? 'bg-rose-600 text-white' : 'bg-[#181c28] text-slate-400 border border-slate-800'
              }`}
            >
              5 Rounds (Championship)
            </button>
          </div>
        </div>
      </div>

      {/* Big Score Summary Banner */}
      <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center text-center gap-6">
          {/* Red Corner */}
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Red Corner (You)
            </div>
            <div className="text-xl sm:text-2xl font-black font-heading text-white truncate">
              {profile.username || 'Fighter'}
            </div>
            <div className="text-4xl sm:text-6xl font-black font-mono text-rose-500 tabular-nums">
              {redTotalScore}
            </div>
          </div>

          {/* Versus & Decision */}
          <div className="space-y-2 px-2">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Judges Total Score
            </div>
            <div className="p-3 bg-black/60 border border-slate-800 rounded-xl text-xs font-bold text-white leading-tight">
              {calculateDecision()}
            </div>
            <div className="text-[11px] text-slate-400">
              Unified MMA 10-Point Must System
            </div>
          </div>

          {/* Blue Corner */}
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Blue Corner (Opponent)
            </div>
            <div className="text-xl sm:text-2xl font-black font-heading text-white truncate">
              {opponentName}
            </div>
            <div className="text-4xl sm:text-6xl font-black font-mono text-cyan-400 tabular-nums">
              {blueTotalScore}
            </div>
          </div>
        </div>

        {/* Round Tab Selector */}
        <div className="flex items-center justify-center gap-2 border-t border-slate-800 pt-6">
          {Array.from({ length: totalRounds }).map((_, idx) => {
            const rNum = idx + 1;
            const rData = roundStatsList.find((r) => r.round === rNum);
            return (
              <button
                key={rNum}
                onClick={() => setActiveRoundTab(rNum)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeRoundTab === rNum
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-[#181c28] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>Round {rNum}</span>
                {rData && (
                  <span className="font-mono text-[11px] opacity-80">
                    ({rData.redScore}-{rData.blueScore})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Round Scoring Panel */}
        <div className="p-6 bg-[#141824] border border-slate-800 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="font-heading font-extrabold text-lg uppercase text-white">
              Round {activeRoundTab} Scoring & Stat Sheet
            </div>

            {/* 10-Point Must Pickers */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="text-rose-400">Red:</span>
                <select
                  value={currentRoundStat.redScore}
                  onChange={(e) => updateCurrentRound({ redScore: Number(e.target.value) })}
                  className="px-2.5 py-1 bg-black border border-rose-900/60 rounded text-rose-300 font-mono"
                >
                  <option value={10}>10</option>
                  <option value={9}>9</option>
                  <option value={8}>8</option>
                  <option value={7}>7</option>
                </select>
              </div>

              <span className="text-slate-600">-</span>

              <div className="flex items-center gap-2">
                <span className="text-cyan-400">Blue:</span>
                <select
                  value={currentRoundStat.blueScore}
                  onChange={(e) => updateCurrentRound({ blueScore: Number(e.target.value) })}
                  className="px-2.5 py-1 bg-black border border-cyan-900/60 rounded text-cyan-300 font-mono"
                >
                  <option value={10}>10</option>
                  <option value={9}>9</option>
                  <option value={8}>8</option>
                  <option value={7}>7</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metric Comparison Rows */}
          <div className="space-y-4">
            {/* Significant Strikes */}
            <div className="p-4 bg-black/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="text-rose-400">Red: {currentRoundStat.redSigStrikes}</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5" /> Significant Strikes Landed
                </span>
                <span className="text-cyan-400">Blue: {currentRoundStat.blueSigStrikes}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateCurrentRound({ redSigStrikes: Math.max(0, currentRoundStat.redSigStrikes - 1) })}
                    className="px-2.5 py-1 bg-slate-800 text-white rounded text-xs"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ redSigStrikes: currentRoundStat.redSigStrikes + 1 })}
                    className="flex-1 py-1.5 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded text-xs font-bold"
                  >
                    +1 Strike (Red)
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ redSigStrikes: currentRoundStat.redSigStrikes + 5 })}
                    className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded text-xs font-bold"
                  >
                    +5
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateCurrentRound({ blueSigStrikes: Math.max(0, currentRoundStat.blueSigStrikes - 1) })}
                    className="px-2.5 py-1 bg-slate-800 text-white rounded text-xs"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ blueSigStrikes: currentRoundStat.blueSigStrikes + 1 })}
                    className="flex-1 py-1.5 bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white rounded text-xs font-bold"
                  >
                    +1 Strike (Blue)
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ blueSigStrikes: currentRoundStat.blueSigStrikes + 5 })}
                    className="px-2.5 py-1 bg-cyan-950 text-cyan-300 rounded text-xs font-bold"
                  >
                    +5
                  </button>
                </div>
              </div>
            </div>

            {/* Takedowns Landed */}
            <div className="p-4 bg-black/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="text-rose-400">Red: {currentRoundStat.redTakedowns}</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Takedowns Completed
                </span>
                <span className="text-cyan-400">Blue: {currentRoundStat.blueTakedowns}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCurrentRound({ redTakedowns: Math.max(0, currentRoundStat.redTakedowns - 1) })}
                    className="px-2.5 py-1 bg-slate-800 text-white rounded text-xs"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ redTakedowns: currentRoundStat.redTakedowns + 1 })}
                    className="flex-1 py-1.5 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded text-xs font-bold"
                  >
                    +1 Takedown
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCurrentRound({ blueTakedowns: Math.max(0, currentRoundStat.blueTakedowns - 1) })}
                    className="px-2.5 py-1 bg-slate-800 text-white rounded text-xs"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ blueTakedowns: currentRoundStat.blueTakedowns + 1 })}
                    className="flex-1 py-1.5 bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white rounded text-xs font-bold"
                  >
                    +1 Takedown
                  </button>
                </div>
              </div>
            </div>

            {/* Control Time */}
            <div className="p-4 bg-black/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="text-rose-400">
                  Red: {Math.floor(currentRoundStat.redControlSeconds / 60)}m {currentRoundStat.redControlSeconds % 60}s
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5" /> Cage / Mat Control Time
                </span>
                <span className="text-cyan-400">
                  Blue: {Math.floor(currentRoundStat.blueControlSeconds / 60)}m {currentRoundStat.blueControlSeconds % 60}s
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCurrentRound({ redControlSeconds: currentRoundStat.redControlSeconds + 15 })}
                    className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold"
                  >
                    +15s
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ redControlSeconds: currentRoundStat.redControlSeconds + 30 })}
                    className="flex-1 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded text-xs font-bold"
                  >
                    +30s
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCurrentRound({ blueControlSeconds: currentRoundStat.blueControlSeconds + 15 })}
                    className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold"
                  >
                    +15s
                  </button>
                  <button
                    onClick={() => updateCurrentRound({ blueControlSeconds: currentRoundStat.blueControlSeconds + 30 })}
                    className="flex-1 py-1 bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white rounded text-xs font-bold"
                  >
                    +30s
                  </button>
                </div>
              </div>
            </div>

            {/* Knockdowns */}
            <div className="p-4 bg-black/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="text-rose-400">Red: {currentRoundStat.redKnockdowns}</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Knockdowns Scored
                </span>
                <span className="text-cyan-400">Blue: {currentRoundStat.blueKnockdowns}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateCurrentRound({ redKnockdowns: currentRoundStat.redKnockdowns + 1 })}
                  className="py-1.5 bg-rose-600/40 hover:bg-rose-600 text-white rounded text-xs font-bold"
                >
                  +1 Knockdown (Red)
                </button>
                <button
                  onClick={() => updateCurrentRound({ blueKnockdowns: currentRoundStat.blueKnockdowns + 1 })}
                  className="py-1.5 bg-cyan-600/40 hover:bg-cyan-600 text-white rounded text-xs font-bold"
                >
                  +1 Knockdown (Blue)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Bout Section */}
        <div className="space-y-3 pt-2">
          <input
            type="text"
            value={scorecardNotes}
            onChange={(e) => setScorecardNotes(e.target.value)}
            placeholder="Add judge or coaching notes (e.g. Round 2 lost on cage stalling; won round 3 with heavy check hook)..."
            className="w-full px-4 py-2.5 bg-[#0a0b0e] border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleSaveCurrentScorecard}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-rose-950/40"
            >
              <Save className="w-4 h-4" />
              <span>Save Official Scorecard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official MMA Judging Hierarchy Guide */}
      <div className="bg-[#12151f] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <HelpCircle className="w-4 h-4 text-rose-500" />
          <span>Unified Rules of MMA Official Judging Hierarchy</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-[#161a26] border border-slate-800 rounded-xl space-y-1">
            <div className="text-xs font-bold text-rose-400 uppercase">Tier 1: Effective Striking / Grappling</div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Primary criteria. Legal strikes that have immediate or cumulative impact to contribute to a potential stoppage, plus legal takedowns, reversals, and submission attempts.
            </p>
          </div>
          <div className="p-3.5 bg-[#161a26] border border-slate-800 rounded-xl space-y-1">
            <div className="text-xs font-bold text-slate-300 uppercase">Tier 2: Effective Aggressiveness</div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Evaluated only if Tier 1 is 100% equal. Making a proactive effort to finish the fight by chasing exchanges and threatening finishes.
            </p>
          </div>
          <div className="p-3.5 bg-[#161a26] border border-slate-800 rounded-xl space-y-1">
            <div className="text-xs font-bold text-slate-300 uppercase">Tier 3: Fighting Area Control</div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Evaluated only if Tiers 1 and 2 are dead even. Dictating pace, location, and octagon positioning (e.g. keeping opponent pinned against the fence).
            </p>
          </div>
        </div>
      </div>

      {/* Scored Fights History Feed */}
      {scorecards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-heading uppercase text-white tracking-wide">
            Past Scored Fights ({scorecards.length})
          </h3>
          <div className="space-y-3">
            {scorecards.map((sc) => (
              <div
                key={sc.id}
                className="p-5 bg-[#12151f] border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-base text-white">
                      vs {sc.opponentName}
                    </div>
                    <div className="text-xs text-slate-400">
                      {sc.date}   {sc.weightClass}   {sc.rounds.length} Rounds
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-black/60 border border-slate-800 rounded text-xs font-bold text-rose-400">
                      {sc.finalDecision}
                    </span>
                    <button
                      onClick={() => deleteScorecard(sc.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                      title="Delete scorecard"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {sc.notes && (
                  <p className="text-xs text-slate-300 italic">
                    "{sc.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
